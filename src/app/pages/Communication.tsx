import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Search, Plus, Users, Send, Paperclip, MoreVertical, ArrowLeft, Hash, Loader2, X, Trash2, Pin, Archive, BellOff, Bell, LogOut, UserPlus, UserMinus, Edit3, Reply, Check, Smile, Phone, Video, Image as ImageIcon, Sticker } from 'lucide-react';
import { useNavigate } from 'react-router';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { db, storage, getCurrentTenantId } from '../core/firebase';
import { collection, doc, addDoc, updateDoc, getDocs, getDoc, setDoc, query, where, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ChatSidebar, MessageBubble, StatusDot } from '../components/ChatComponents';
import {
    ChatUser, Message, Conversation, GS_API_URL,
    updatePresence, sendTypingIndicator, clearTypingIndicator,
    toggleReaction, editMessage, deleteMessageForMe, deleteMessageForEveryone,
    pinMessage, markAsRead, addMemberToGroup, removeMemberFromGroup,
    leaveGroup, renameGroup, toggleMuteConversation, togglePinConversation,
    archiveConversation
} from '../core/chat-helpers';

export default function Communication() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [tenantId, setTenantId] = useState<string | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [allUsers, setAllUsers] = useState<ChatUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [groupName, setGroupName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [showActionsMenu, setShowActionsMenu] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState<Record<string, string>>({});
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const [replyTo, setReplyTo] = useState<Message | null>(null);
    const [editingMsg, setEditingMsg] = useState<Message | null>(null);
    const [showMembersPanel, setShowMembersPanel] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
    const [mentionSuggestions, setMentionSuggestions] = useState<ChatUser[]>([]);
    const [messageSearch, setMessageSearch] = useState('');
    const [showMessageSearch, setShowMessageSearch] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [activeEmojiTab, setActiveEmojiTab] = useState<'emoji' | 'stickers'>('emoji');
    const [currentStatus, setCurrentStatus] = useState<string>('online');

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const typingTimeoutRef = useRef<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // --- 1. Auth & Init ---
    useEffect(() => {
        const savedUser = localStorage.getItem('alphery_user');
        if (!savedUser) { navigate('/'); return; }
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        const tId = getCurrentTenantId();
        setTenantId(tId);
        if (tId) {
            loadInitialData(tId, user);
            updatePresence(user.username, tId, 'online');
        }
    }, [navigate]);

    // --- 2. Load Data ---
    const loadInitialData = async (tId: string, user: any) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('action', 'getUsers');
            params.append('sheetName', user.company || tId);
            const gsResponse = await fetch(GS_API_URL, { method: 'POST', body: params, redirect: 'follow' });
            const gsData = await gsResponse.json();
            if (gsData.success) setAllUsers(gsData.user);

            // Fetch conversation memberships for this user
            const membersQ = query(collection(db, 'conversation_members'), where('user_id', '==', user.username));
            const memberSnap = await getDocs(membersQ);
            const memberOf = memberSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];

            if (memberOf.length > 0) {
                const convIds = memberOf.map(m => m.conversation_id);

                // Fetch conversations (Firebase 'in' query supports max 30 items)
                const convChunks = [];
                for (let i = 0; i < convIds.length; i += 30) {
                    convChunks.push(convIds.slice(i, i + 30));
                }

                let allConvs: any[] = [];
                for (const chunk of convChunks) {
                    const convsQ = query(collection(db, 'conversations'), where('__name__', 'in', chunk));
                    const convsSnap = await getDocs(convsQ);
                    const convs = convsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
                    allConvs = [...allConvs, ...convs];
                }

                // Fetch all members for these conversations
                const allMembersQ = query(collection(db, 'conversation_members'), where('conversation_id', 'in', convIds.slice(0, 30)));
                const allMembersSnap = await getDocs(allMembersQ);
                const allMembers = allMembersSnap.docs.map(d => d.data());

                const processed = allConvs
                    .filter(c => c.tenant_id === tId)
                    .sort((a: any, b: any) => (b.created_at || '').localeCompare(a.created_at || ''))
                    .map(c => {
                        const convMembers = allMembers.filter(m => m.conversation_id === c.id);
                        const myMeta = memberOf.find(m => m.conversation_id === c.id);
                        return {
                            ...c,
                            members: convMembers.map(m => m.user_id),
                            member_roles: Object.fromEntries(convMembers.map(m => [m.user_id, m.role || 'member'])),
                            last_cleared_at: convMembers.find(m => m.user_id === user.username)?.last_cleared_at,
                            last_read_at: myMeta?.last_read_at,
                            is_muted: myMeta?.is_muted || false,
                            is_pinned: myMeta?.is_pinned || false,
                        };
                    });
                setConversations(processed);

                // Calculate unread counts
                const counts: Record<string, number> = {};
                for (const c of processed) {
                    try {
                        const msgsQ = query(
                            collection(db, 'messages'),
                            where('conversation_id', '==', c.id),
                            orderBy('created_at', 'desc'),
                            limit(50)
                        );
                        const msgsSnap = await getDocs(msgsQ);
                        const unread = msgsSnap.docs.filter(d => {
                            const msg = d.data();
                            return msg.sender_id !== user.username &&
                                msg.created_at > (c.last_read_at || '1970-01-01Z');
                        }).length;
                        counts[c.id] = unread;
                    } catch { counts[c.id] = 0; }
                }
                setUnreadCounts(counts);
            }
            // Fetch online users
            try {
                const presQ = query(collection(db, 'user_presence'), where('tenant_id', '==', tId));
                const presSnap = await getDocs(presQ);
                const statusMap: Record<string, string> = {};
                presSnap.docs.forEach(d => {
                    const p = d.data();
                    statusMap[p.user_id] = p.status;
                });
                setOnlineUsers(statusMap);
            } catch { /* collection may not exist */ }
        } catch (err) { console.error('Error loading chat data:', err); }
        finally { setLoading(false); }
    };

    // --- 3. Realtime Subscriptions (Firebase onSnapshot) ---
    useEffect(() => {
        if (!activeConversation || !currentUser) return;
        markAsRead(activeConversation.id, currentUser.username);
        setUnreadCounts(prev => ({ ...prev, [activeConversation.id]: 0 }));

        // Realtime messages listener
        const msgsQ = query(
            collection(db, 'messages'),
            where('conversation_id', '==', activeConversation.id),
            orderBy('created_at', 'asc')
        );
        const unsubMsgs = onSnapshot(msgsQ, (snapshot) => {
            snapshot.docChanges().forEach(change => {
                const data = { id: change.doc.id, ...change.doc.data() } as Message;
                const clearedAt = activeConversation.last_cleared_at ? new Date(activeConversation.last_cleared_at) : new Date(0);
                if (change.type === 'added') {
                    if (new Date(data.created_at) > clearedAt) {
                        const sender = allUsers.find(u => u.username === data.sender_id);
                        setMessages(prev => {
                            if (prev.find(m => m.id === data.id)) return prev;
                            return [...prev, { ...data, sender_name: sender?.name || data.sender_id }];
                        });
                        scrollToBottom();
                        markAsRead(activeConversation.id, currentUser.username);
                    }
                } else if (change.type === 'modified') {
                    setMessages(prev => prev.map(m => m.id === data.id ? { ...m, ...data } : m));
                } else if (change.type === 'removed') {
                    setMessages(prev => prev.filter(m => m.id !== data.id));
                }
            });
        });

        // Typing indicators listener
        const typingQ = query(collection(db, 'typing_indicators'), where('conversation_id', '==', activeConversation.id));
        const unsubTyping = onSnapshot(typingQ, (snapshot) => {
            snapshot.docChanges().forEach(change => {
                const data = change.doc.data();
                if (change.type === 'added' || change.type === 'modified') {
                    if (data.user_id !== currentUser.username) setTypingUsers(prev => [...new Set([...prev, data.user_id])]);
                } else if (change.type === 'removed') {
                    setTypingUsers(prev => prev.filter(id => id !== data.user_id));
                }
            });
        });

        return () => { unsubMsgs(); unsubTyping(); };
    }, [activeConversation, allUsers, currentUser]);

    // --- 3.1 Global Presence Subscription ---
    useEffect(() => {
        if (!tenantId || !currentUser) return;

        const presQ = query(collection(db, 'user_presence'), where('tenant_id', '==', tenantId));
        const unsubPresence = onSnapshot(presQ, (snapshot) => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added' || change.type === 'modified') {
                    const p = change.doc.data();
                    setOnlineUsers(prev => ({ ...prev, [p.user_id]: p.status }));
                }
            });
        });

        updatePresence(currentUser.username, tenantId, currentStatus as any);
        const interval = setInterval(() => {
            updatePresence(currentUser.username, tenantId, currentStatus as any);
        }, 30000);

        const handleUnload = () => updatePresence(currentUser.username, tenantId, 'offline');
        window.addEventListener('beforeunload', handleUnload);

        return () => {
            unsubPresence();
            clearInterval(interval);
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [tenantId, currentUser, currentStatus]);

    // --- 4. Fetch Messages ---
    useEffect(() => { if (activeConversation) fetchMessages(activeConversation.id); }, [activeConversation]);

    const fetchMessages = async (convId: string) => {
        setMessagesLoading(true);
        try {
            const msgsQ = query(
                collection(db, 'messages'),
                where('conversation_id', '==', convId),
                orderBy('created_at', 'asc'),
                limit(100)
            );
            const msgsSnap = await getDocs(msgsQ);
            const clearedAt = activeConversation?.last_cleared_at || '1970-01-01Z';
            const data = msgsSnap.docs
                .map(d => ({ id: d.id, ...d.data() } as any))
                .filter((m: any) => m.created_at > clearedAt);

            const enriched = await Promise.all(data.map(async (m: any) => {
                const sender = allUsers.find(u => u.username === m.sender_id);
                let reply_message = null;
                if (m.reply_to) {
                    try {
                        const rmDoc = await getDoc(doc(db, 'messages', m.reply_to));
                        if (rmDoc.exists()) {
                            const rm = { id: rmDoc.id, ...rmDoc.data() } as any;
                            const rs = allUsers.find(u => u.username === rm.sender_id);
                            reply_message = { ...rm, sender_name: rs?.name || rm.sender_id };
                        }
                    } catch { /* reply doc missing */ }
                }
                return { ...m, sender_name: sender?.name || m.sender_id, reply_message };
            }));
            setMessages(enriched);
            setTimeout(scrollToBottom, 100);
        } catch (err) { console.error('Error fetching messages:', err); }
        finally { setMessagesLoading(false); }
    };

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    // --- 5. Send Message ---
    const handleSendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!newMessage.trim() || !activeConversation || !currentUser) return;

        if (editingMsg) {
            await editMessage(editingMsg.id, newMessage.trim());
            setEditingMsg(null); setNewMessage(''); return;
        }

        const content = newMessage.trim();
        const mentions = (content.match(/@(\w+)/g) || []).map(m => m.slice(1));
        setNewMessage(''); setReplyTo(null);
        clearTypingIndicator(activeConversation.id, currentUser.username);

        try {
            await addDoc(collection(db, 'messages'), {
                conversation_id: activeConversation.id, sender_id: currentUser.username,
                content, tenant_id: tenantId, type: replyTo ? 'reply' : 'text',
                reply_to: replyTo?.id || null, mentions,
                is_edited: false, is_deleted: false, deleted_for: [], is_pinned: false,
                reactions: {}, created_at: new Date().toISOString()
            });
        } catch (err) { console.error('Error sending message:', err); }
    };

    // --- Typing handler ---
    const handleTyping = () => {
        if (!activeConversation || !currentUser) return;
        sendTypingIndicator(activeConversation.id, currentUser.username);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => clearTypingIndicator(activeConversation.id, currentUser.username), 3000);
    };

    // --- Mention detection ---
    const handleInputChange = (val: string) => {
        setNewMessage(val);
        handleTyping();
        const match = val.match(/@(\w*)$/);
        if (match) {
            const q = match[1].toLowerCase();
            setMentionSuggestions(allUsers.filter(u => u.username !== currentUser?.username && (u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q))).slice(0, 5));
        } else { setMentionSuggestions([]); }
    };

    const insertMention = (user: ChatUser) => {
        setNewMessage(prev => prev.replace(/@\w*$/, `@${user.username} `));
        setMentionSuggestions([]);
        inputRef.current?.focus();
    };

    // --- Direct Chat ---
    const handleStartDirectChat = async (targetUser: ChatUser) => {
        if (!currentUser || !tenantId) return;
        try {
            // Check if a direct conversation already exists between these two users
            const myMembersQ = query(collection(db, 'conversation_members'), where('user_id', '==', currentUser.username));
            const theirMembersQ = query(collection(db, 'conversation_members'), where('user_id', '==', targetUser.username));
            const [mySnap, theirSnap] = await Promise.all([getDocs(myMembersQ), getDocs(theirMembersQ)]);
            const myConvIds = mySnap.docs.map(d => d.data().conversation_id);
            const theirConvIds = theirSnap.docs.map(d => d.data().conversation_id);
            const common = myConvIds.filter(id => theirConvIds.includes(id));

            let existingConv = null;
            for (const cid of common) {
                const convDoc = await getDoc(doc(db, 'conversations', cid));
                if (convDoc.exists()) {
                    const convData = convDoc.data();
                    if (convData.type === 'direct' && convData.tenant_id === tenantId) {
                        existingConv = { id: convDoc.id, ...convData, members: [currentUser.username, targetUser.username] };
                        break;
                    }
                }
            }

            if (existingConv) { setActiveConversation(existingConv as any); }
            else {
                const newConvRef = await addDoc(collection(db, 'conversations'), {
                    tenant_id: tenantId, type: 'direct', created_by: currentUser.username,
                    is_archived: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
                });
                const convId = newConvRef.id;
                await setDoc(doc(db, 'conversation_members', `${convId}_${currentUser.username}`), { conversation_id: convId, user_id: currentUser.username, role: 'admin', is_muted: false, is_pinned: false, last_cleared_at: '1970-01-01', last_read_at: '1970-01-01' });
                await setDoc(doc(db, 'conversation_members', `${convId}_${targetUser.username}`), { conversation_id: convId, user_id: targetUser.username, role: 'member', is_muted: false, is_pinned: false, last_cleared_at: '1970-01-01', last_read_at: '1970-01-01' });
                const full = { id: convId, tenant_id: tenantId, type: 'direct' as const, created_by: currentUser.username, is_archived: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), members: [currentUser.username, targetUser.username] };
                setConversations([full, ...conversations]);
                setActiveConversation(full);
            }
            setShowNewChatModal(false);
        } catch (err) { console.error('Error starting chat:', err); toast.error("Failed to start chat."); }
    };

    // --- Create Group ---
    const handleCreateGroup = async () => {
        if (!currentUser || !tenantId) { toast.error("Session error. Re-login."); return; }
        if (!groupName.trim()) { toast.error("Group name required."); return; }
        if (selectedUsers.length === 0) { toast.error("Select at least one member."); return; }
        setIsCreating(true);
        try {
            const newConvRef = await addDoc(collection(db, 'conversations'), {
                tenant_id: tenantId, type: 'group', name: groupName.trim(), created_by: currentUser.username,
                is_archived: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
            });
            const convId = newConvRef.id;
            // Add creator as admin
            await setDoc(doc(db, 'conversation_members', `${convId}_${currentUser.username}`), { conversation_id: convId, user_id: currentUser.username, role: 'admin', is_muted: false, is_pinned: false, last_cleared_at: '1970-01-01', last_read_at: '1970-01-01' });
            // Add selected members
            for (const u of selectedUsers) {
                await setDoc(doc(db, 'conversation_members', `${convId}_${u}`), { conversation_id: convId, user_id: u, role: 'member', is_muted: false, is_pinned: false, last_cleared_at: '1970-01-01', last_read_at: '1970-01-01' });
            }
            await addDoc(collection(db, 'messages'), { conversation_id: convId, sender_id: 'system', content: `${currentUser.name || currentUser.username} created group "${groupName.trim()}"`, tenant_id: tenantId, type: 'system', is_edited: false, is_deleted: false, deleted_for: [], is_pinned: false, reactions: {}, mentions: [], created_at: new Date().toISOString() });
            const full = { id: convId, tenant_id: tenantId, type: 'group' as const, name: groupName.trim(), created_by: currentUser.username, is_archived: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), members: [currentUser.username, ...selectedUsers], member_roles: { [currentUser.username]: 'admin' } };
            setConversations([full, ...conversations]);
            setActiveConversation(full);
            setShowCreateGroupModal(false); setGroupName(''); setSelectedUsers([]);
            toast.success("Group created!");
        } catch (err: any) { toast.error(err.message || "Failed to create group."); }
        finally { setIsCreating(false); }
    };

    // --- Actions ---
    const handleDelete = async () => {
        if (!activeConversation) return;
        if (!window.confirm('Delete this conversation? All data will be lost.')) return;
        try {
            await updateDoc(doc(db, 'conversations', activeConversation.id), { deleted_at: new Date().toISOString() });
            setConversations(prev => prev.filter(c => c.id !== activeConversation.id));
            setActiveConversation(null); setShowActionsMenu(false);
            toast.success("Conversation deleted.");
        } catch (err: any) { toast.error(err.message || "Delete failed."); }
    };

    const handleClearChat = async () => {
        if (!activeConversation || !currentUser) return;
        if (!window.confirm('Clear chat for yourself?')) return;
        const now = new Date().toISOString();
        try {
            await updateDoc(doc(db, 'conversation_members', `${activeConversation.id}_${currentUser.username}`), { last_cleared_at: now });
            setMessages([]); setShowActionsMenu(false);
            setConversations(prev => prev.map(c => c.id === activeConversation.id ? { ...c, last_cleared_at: now } : c));
            setActiveConversation(prev => prev ? { ...prev, last_cleared_at: now } : null);
            toast.success("Chat cleared.");
        } catch (err: any) { toast.error(err.message || "Clear failed."); }
    };

    const handleLeaveGroup = async () => {
        if (!activeConversation || !currentUser || !tenantId) return;
        if (!window.confirm('Leave this group?')) return;
        try {
            await leaveGroup(activeConversation.id, currentUser.username, tenantId);
            setConversations(prev => prev.filter(c => c.id !== activeConversation.id));
            setActiveConversation(null); setShowActionsMenu(false);
            toast.success("Left group.");
        } catch (err: any) { toast.error(err.message || "Failed to leave."); }
    };

    const handleToggleMute = async () => {
        if (!activeConversation || !currentUser) return;
        const muted = !activeConversation.is_muted;
        await toggleMuteConversation(activeConversation.id, currentUser.username, muted);
        setActiveConversation(prev => prev ? { ...prev, is_muted: muted } : null);
        setConversations(prev => prev.map(c => c.id === activeConversation.id ? { ...c, is_muted: muted } : c));
        setShowActionsMenu(false);
        toast.success(muted ? "Notifications muted." : "Notifications enabled.");
    };

    const handleTogglePin = async () => {
        if (!activeConversation || !currentUser) return;
        const pinned = !activeConversation.is_pinned;
        await togglePinConversation(activeConversation.id, currentUser.username, pinned);
        setActiveConversation(prev => prev ? { ...prev, is_pinned: pinned } : null);
        setConversations(prev => prev.map(c => c.id === activeConversation.id ? { ...c, is_pinned: pinned } : c));
        setShowActionsMenu(false);
        toast.success(pinned ? "Conversation pinned." : "Conversation unpinned.");
    };

    const handleArchive = async () => {
        if (!activeConversation) return;
        await archiveConversation(activeConversation.id, true);
        setConversations(prev => prev.map(c => c.id === activeConversation.id ? { ...c, is_archived: true } : c));
        setActiveConversation(null); setShowActionsMenu(false);
        toast.success("Conversation archived.");
    };

    const handleAddMember = async (userId: string) => {
        if (!activeConversation || !tenantId) return;
        await addMemberToGroup(activeConversation.id, userId);
        await addDoc(collection(db, 'messages'), { conversation_id: activeConversation.id, sender_id: 'system', content: `${currentUser?.name} added ${allUsers.find(u => u.username === userId)?.name || userId}`, tenant_id: tenantId, type: 'system', is_edited: false, is_deleted: false, deleted_for: [], is_pinned: false, reactions: {}, mentions: [], created_at: new Date().toISOString() });
        setActiveConversation(prev => prev ? { ...prev, members: [...(prev.members || []), userId] } : null);
        setShowAddMemberModal(false);
        toast.success("Member added.");
    };

    const handleRemoveMember = async (userId: string) => {
        if (!activeConversation || !tenantId) return;
        if (!window.confirm(`Remove ${allUsers.find(u => u.username === userId)?.name || userId}?`)) return;
        await removeMemberFromGroup(activeConversation.id, userId);
        await addDoc(collection(db, 'messages'), { conversation_id: activeConversation.id, sender_id: 'system', content: `${currentUser?.name} removed ${allUsers.find(u => u.username === userId)?.name || userId}`, tenant_id: tenantId, type: 'system', is_edited: false, is_deleted: false, deleted_for: [], is_pinned: false, reactions: {}, mentions: [], created_at: new Date().toISOString() });
        setActiveConversation(prev => prev ? { ...prev, members: prev.members?.filter(m => m !== userId) } : null);
        toast.success("Member removed.");
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !activeConversation || !tenantId) return;
        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) { toast.error("File too large (max 10MB)."); return; }
        try {
            const filePath = `chat-attachments/${tenantId}/${activeConversation.id}/${Date.now()}_${file.name}`;
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, file);
            const publicUrl = await getDownloadURL(storageRef);
            const fileType = file.type.startsWith('image/') ? 'image' : 'file';
            await addDoc(collection(db, 'messages'), {
                conversation_id: activeConversation.id, sender_id: currentUser.username,
                content: file.name, file_url: publicUrl, file_name: file.name, file_type: file.type,
                type: fileType, tenant_id: tenantId, is_edited: false, is_deleted: false,
                deleted_for: [], is_pinned: false, reactions: {}, mentions: [],
                created_at: new Date().toISOString()
            });
        } catch (err: any) { toast.error("Upload failed: " + err.message); }
    };

    const handleReactToMsg = async (msgId: string, emoji: string) => {
        const msg = messages.find(m => m.id === msgId);
        if (!msg || !currentUser) return;
        const updated = await toggleReaction(msgId, emoji, currentUser.username, msg.reactions || {});
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, reactions: updated } : m));
    };

    const getTypingText = () => {
        const names = typingUsers.map(id => allUsers.find(u => u.username === id)?.name || id);
        if (names.length === 0) return '';
        if (names.length === 1) return `${names[0]} is typing...`;
        return `${names.join(', ')} are typing...`;
    };

    const filteredMessages = showMessageSearch && messageSearch
        ? messages.filter(m => m.content.toLowerCase().includes(messageSearch.toLowerCase()))
        : messages;

    const getName = (conv: Conversation) => {
        if (conv.name) return conv.name;
        if (conv.type === 'direct' && currentUser && conv.members) {
            const otherId = conv.members.find(id => id !== currentUser.username);
            return allUsers.find(u => u.username === otherId)?.name || otherId || 'Direct Message';
        }
        return 'Unnamed';
    };
    const getAvatar = (conv: Conversation) => {
        if (conv.type === 'group') return <Hash className="w-5 h-5" />;
        if (conv.type === 'direct' && currentUser && conv.members) {
            const otherId = conv.members.find(id => id !== currentUser.username);
            const other = allUsers.find(u => u.username === otherId);
            const status = onlineUsers[otherId!] || 'offline';
            return (
                <div className="relative">
                    {other?.name?.[0] || 'D'}
                    <div className="absolute -bottom-1 -right-1">
                        <StatusDot status={status} size="sm" />
                    </div>
                </div>
            );
        }
        return 'D';
    };

    const handleBack = () => {
        if (activeConversation) {
            setActiveConversation(null);
            return;
        }
        navigate('/workspace');
    };

    // --- RENDER ---
    return (
        <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans text-gray-900 border-t border-white/5">
            <ChatSidebar
                conversations={conversations}
                activeConversation={activeConversation}
                setActiveConversation={setActiveConversation}
                loading={loading}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setShowNewChatModal={setShowNewChatModal}
                setShowCreateGroupModal={setShowCreateGroupModal}
                currentUser={currentUser}
                allUsers={allUsers}
                navigate={handleBack}
                onlineUsers={onlineUsers}
                unreadCounts={unreadCounts}
                currentStatus={currentStatus}
                onStatusChange={(status: any) => {
                    setCurrentStatus(status);
                    updatePresence(currentUser.username, tenantId!, status);
                }}
            />

            <main className="flex-1 flex flex-col bg-white overflow-hidden">
                {activeConversation ? (
                    <>
                        {/* HEADER */}
                        <header className="h-16 px-8 border-b border-gray-50 flex items-center justify-between bg-white/80 backdrop-blur-md shrink-0">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs ${activeConversation.type === 'group' ? 'bg-indigo-500' : 'bg-[#7C1CE2]'}`}>{getAvatar(activeConversation)}</div>
                                <div>
                                    <h2 className="font-black text-gray-900 tracking-tighter text-sm uppercase">{getName(activeConversation)}</h2>
                                    <div className="flex items-center gap-1.5">
                                        {typingUsers.length > 0 ? (
                                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">{getTypingText()}</span>
                                        ) : (
                                            <><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{activeConversation.members?.length || 0} members</span></>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 relative">
                                <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100 mr-2">
                                    <button onClick={() => toast.info("Voice call feature coming soon!")} className="p-2.5 hover:bg-white hover:text-emerald-600 text-gray-400 rounded-xl transition-all shadow-sm hover:shadow-md" title="Voice Call"><Phone className="w-4.5 h-4.5" /></button>
                                    <button onClick={() => toast.info("Video call feature coming soon!")} className="p-2.5 hover:bg-white hover:text-blue-600 text-gray-400 rounded-xl transition-all shadow-sm hover:shadow-md" title="Video Call"><Video className="w-4.5 h-4.5" /></button>
                                </div>
                                <button onClick={() => setShowMessageSearch(!showMessageSearch)} className={`p-2.5 rounded-xl transition-all ${showMessageSearch ? 'bg-purple-50 text-[#7C1CE2]' : 'hover:bg-gray-50 text-gray-400'}`} title="Search Messages"><Search className="w-4 h-4" /></button>
                                {activeConversation.type === 'group' && <button onClick={() => setShowMembersPanel(!showMembersPanel)} className="p-2.5 hover:bg-gray-50 text-gray-400 rounded-xl transition-all" title="Members"><Users className="w-4 h-4" /></button>}
                                <button onClick={() => setShowActionsMenu(!showActionsMenu)} className={`p-2.5 rounded-xl transition-all ${showActionsMenu ? 'bg-purple-50 text-[#7C1CE2]' : 'hover:bg-gray-50 text-gray-400'}`}><MoreVertical className="w-4 h-4" /></button>
                                <AnimatePresence>
                                    {showActionsMenu && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setShowActionsMenu(false)} />
                                            <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-50 py-2 z-50">
                                                <button onClick={handleTogglePin} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 text-gray-600 transition-colors text-[10px] font-black uppercase tracking-widest"><Pin className="w-4 h-4" />{activeConversation.is_pinned ? 'Unpin' : 'Pin'} Chat</button>
                                                <button onClick={handleToggleMute} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 text-gray-600 transition-colors text-[10px] font-black uppercase tracking-widest">{activeConversation.is_muted ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}{activeConversation.is_muted ? 'Unmute' : 'Mute'}</button>
                                                <button onClick={handleArchive} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 text-gray-600 transition-colors text-[10px] font-black uppercase tracking-widest"><Archive className="w-4 h-4" />Archive</button>
                                                <button onClick={handleClearChat} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 text-gray-600 transition-colors text-[10px] font-black uppercase tracking-widest"><X className="w-4 h-4" />Clear Chat</button>
                                                {activeConversation.type === 'group' && <button onClick={handleLeaveGroup} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-orange-50 text-orange-500 transition-colors text-[10px] font-black uppercase tracking-widest"><LogOut className="w-4 h-4" />Leave Group</button>}
                                                <div className="border-t border-gray-50 my-1" />
                                                <button onClick={handleDelete} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 text-red-500 transition-colors text-[10px] font-black uppercase tracking-widest"><Trash2 className="w-4 h-4" />Delete</button>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        </header>

                        {/* Message Search Bar */}
                        {showMessageSearch && (
                            <div className="px-8 py-2 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                                <Search className="w-4 h-4 text-gray-400" />
                                <input type="text" value={messageSearch} onChange={e => setMessageSearch(e.target.value)} placeholder="Search in messages..." className="flex-1 bg-transparent text-xs font-bold outline-none" autoFocus />
                                <button onClick={() => { setShowMessageSearch(false); setMessageSearch(''); }} className="p-1 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                            </div>
                        )}

                        {/* MESSAGES */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 CustomScroll bg-[#F8F9FA]/30">
                            {messagesLoading ? (
                                <div className="flex flex-col items-center justify-center h-full gap-4"><Loader2 className="w-6 h-6 text-purple-600 animate-spin" /><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loading messages...</p></div>
                            ) : filteredMessages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full opacity-5"><MessageSquare className="w-20 h-20 mb-4" /><p className="text-2xl font-black uppercase tracking-[0.5em] italic">Start chatting</p></div>
                            ) : (
                                filteredMessages.map(msg => (
                                    <MessageBubble key={msg.id} msg={msg} isMe={msg.sender_id === currentUser?.username} currentUser={currentUser} allUsers={allUsers}
                                        onReply={(m: Message) => { setReplyTo(m); inputRef.current?.focus(); }}
                                        onEdit={(m: Message) => { setEditingMsg(m); setNewMessage(m.content); inputRef.current?.focus(); }}
                                        onDeleteForMe={(id: string) => { deleteMessageForMe(id, currentUser.username, messages.find(m => m.id === id)?.deleted_for || []); setMessages(prev => prev.filter(m => m.id !== id)); }}
                                        onDeleteForAll={(id: string) => deleteMessageForEveryone(id)}
                                        onPin={(id: string, p: boolean) => pinMessage(id, p)}
                                        onReact={handleReactToMsg}
                                    />
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* FOOTER */}
                        <footer className="p-6 bg-white border-t border-gray-50">
                            {replyTo && (
                                <div className="flex items-center gap-2 mb-2 px-2 py-1.5 bg-purple-50 rounded-xl text-xs">
                                    <Reply className="w-3.5 h-3.5 text-purple-500" />
                                    <span className="font-bold text-purple-700 truncate flex-1">Replying to {replyTo.sender_name}: {replyTo.content?.substring(0, 50)}</span>
                                    <button onClick={() => setReplyTo(null)} className="text-purple-400 hover:text-purple-600"><X className="w-3.5 h-3.5" /></button>
                                </div>
                            )}
                            {editingMsg && (
                                <div className="flex items-center gap-2 mb-2 px-2 py-1.5 bg-amber-50 rounded-xl text-xs">
                                    <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                                    <span className="font-bold text-amber-700 flex-1">Editing message</span>
                                    <button onClick={() => { setEditingMsg(null); setNewMessage(''); }} className="text-amber-400 hover:text-amber-600"><X className="w-3.5 h-3.5" /></button>
                                </div>
                            )}
                            <AnimatePresence>
                                {mentionSuggestions.length > 0 && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="bg-white border border-gray-100 rounded-xl shadow-xl mb-2 overflow-hidden">
                                        {mentionSuggestions.map(u => (
                                            <button key={u.username} onClick={() => insertMention(u)} className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 text-left">
                                                <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#7C1CE2] flex items-center justify-center font-black text-[10px]">{u.name[0]}</div>
                                                <div><p className="text-xs font-bold">{u.name}</p><p className="text-[9px] text-gray-400">@{u.username}</p></div>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {showEmojiPicker && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowEmojiPicker(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute bottom-20 right-6 z-50 shadow-2xl rounded-2xl overflow-hidden border border-gray-100 bg-white flex flex-col"
                                        >
                                            <div className="flex bg-gray-50 border-b border-gray-100">
                                                <button onClick={() => setActiveEmojiTab('emoji')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeEmojiTab === 'emoji' ? 'bg-white text-[#7C1CE2] border-b-2 border-[#7C1CE2]' : 'text-gray-400 hover:text-gray-600'}`}>Emojis</button>
                                                <button onClick={() => setActiveEmojiTab('stickers')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeEmojiTab === 'stickers' ? 'bg-white text-[#7C1CE2] border-b-2 border-[#7C1CE2]' : 'text-gray-400 hover:text-gray-600'}`}>Stickers</button>
                                            </div>
                                            {activeEmojiTab === 'emoji' ? (
                                                <EmojiPicker
                                                    onEmojiClick={(emojiData) => {
                                                        setNewMessage(prev => prev + emojiData.emoji);
                                                        setShowEmojiPicker(false);
                                                        inputRef.current?.focus();
                                                    }}
                                                    theme={Theme.LIGHT}
                                                    width={350}
                                                    height={400}
                                                    lazyLoadEmojis={true}
                                                    searchPlaceholder="Search emojis..."
                                                    previewConfig={{ showPreview: false }}
                                                    skinTonesDisabled={true}
                                                />
                                            ) : (
                                                <div className="w-[350px] h-[400px] p-6 overflow-y-auto CustomScroll bg-white grid grid-cols-2 gap-4">
                                                    {[
                                                        { label: 'Victory', emoji: '🏆', text: 'BIG WIN!' },
                                                        { label: 'Work', emoji: '💼', text: 'On it!' },
                                                        { label: 'Coffee', emoji: '☕', text: 'Coffee Break' },
                                                        { label: 'Rocket', emoji: '🚀', text: 'LFG!' },
                                                        { label: 'Party', emoji: '🎉', text: 'GG!' },
                                                        { label: 'Alert', emoji: '🚨', text: 'URGENT' },
                                                        { label: 'Thanks', emoji: '🙏', text: 'Much Appreciated' },
                                                        { label: 'Nice', emoji: '✨', text: 'Perfect!' }
                                                    ].map(s => (
                                                        <button key={s.label} onClick={() => { setNewMessage(`${s.emoji} ${s.text}`); setShowEmojiPicker(false); setTimeout(() => handleSendMessage(), 50); }} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-purple-50 group transition-all">
                                                            <span className="text-4xl group-hover:scale-110 transition-transform">{s.emoji}</span>
                                                            <span className="text-[9px] font-black text-gray-400 uppercase mt-2 group-hover:text-[#7C1CE2]">{s.text}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                            <form onSubmit={handleSendMessage} className="bg-gray-50 border border-gray-100 rounded-[1.5rem] p-2 flex items-center gap-1 focus-within:bg-white focus-within:ring-4 focus-within:ring-purple-50 transition-all">
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2.5 text-gray-400 hover:text-[#7C1CE2] rounded-xl hover:bg-purple-50 transition-all" title="Attach File"><Paperclip className="w-4 h-4" /></button>
                                <button type="button" onClick={() => { fileInputRef.current?.setAttribute('accept', 'image/*'); fileInputRef.current?.click(); }} className="p-2.5 text-gray-400 hover:text-emerald-500 rounded-xl hover:bg-emerald-50 transition-all" title="Send Image"><ImageIcon className="w-4 h-4" /></button>
                                <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => { handleFileUpload(e); fileInputRef.current?.removeAttribute('accept'); }} />
                                <input ref={inputRef} type="text" value={newMessage} onChange={e => handleInputChange(e.target.value)} placeholder="Type a message... @mention users" className="flex-1 bg-transparent border-none focus:ring-0 text-xs font-bold text-gray-800 py-3 outline-none" />
                                <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`p-2.5 rounded-xl transition-all ${showEmojiPicker ? 'bg-amber-50 text-amber-500' : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'}`} title="Emoji & Stickers"><Smile className="w-4 h-4" /></button>
                                <button type="submit" disabled={!newMessage.trim()} className="bg-[#7C1CE2] text-white p-2.5 rounded-full shadow-lg shadow-purple-100 hover:scale-105 transition-all disabled:opacity-50"><Send className="w-4 h-4" /></button>
                            </form>
                        </footer>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 bg-gray-50/20">
                        <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-amber-500 shadow-2xl mb-8 border border-gray-50 rotate-6"><MessageSquare className="w-8 h-8" /></div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase mb-4">Select a Conversation</h2>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-center max-w-xs leading-relaxed">Choose a chat from the sidebar or start a new conversation</p>
                    </div>
                )}
            </main>

            {/* MEMBERS PANEL */}
            <AnimatePresence>
                {showMembersPanel && activeConversation?.type === 'group' && (
                    <motion.aside initial={{ width: 0, opacity: 0 }} animate={{ width: 280, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="bg-white border-l border-gray-100 overflow-hidden shrink-0">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">Members ({activeConversation.members?.length})</h3>
                                <button onClick={() => setShowMembersPanel(false)} className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400"><X className="w-4 h-4" /></button>
                            </div>
                            {activeConversation.member_roles?.[currentUser?.username] === 'admin' && (
                                <button onClick={() => setShowAddMemberModal(true)} className="w-full mb-4 py-2.5 bg-purple-50 text-[#7C1CE2] rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-purple-100 transition-all"><UserPlus className="w-3.5 h-3.5" /> Add Member</button>
                            )}
                            <div className="space-y-2">
                                {activeConversation.members?.map(userId => {
                                    const user = allUsers.find(u => u.username === userId);
                                    const isAdmin = activeConversation.member_roles?.[userId] === 'admin';
                                    const isOnline = !!onlineUsers[userId];
                                    return (
                                        <div key={userId} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 group">
                                            <div className="relative">
                                                <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#7C1CE2] flex items-center justify-center font-black text-[10px]">{user?.name?.[0] || '?'}</div>
                                                <div className="absolute -bottom-0.5 -right-0.5">
                                                    <StatusDot status={onlineUsers[userId] || 'offline'} size="sm" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-black uppercase truncate">{user?.name || userId}</p>
                                                {isAdmin && <span className="text-[8px] font-black text-purple-500 uppercase">Admin</span>}
                                            </div>
                                            {activeConversation.member_roles?.[currentUser?.username] === 'admin' && userId !== currentUser?.username && (
                                                <button onClick={() => handleRemoveMember(userId)} className="p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><UserMinus className="w-3.5 h-3.5" /></button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* MODALS */}
            <AnimatePresence>
                {showNewChatModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden">
                            <div className="p-10">
                                <h3 className="text-xs font-black uppercase tracking-tighter mb-8 bg-amber-50 w-fit px-4 py-1 rounded-full text-amber-600">New Chat</h3>
                                <div className="space-y-2 max-h-96 overflow-y-auto CustomScroll pr-2">
                                    {allUsers.filter(u => u.username !== currentUser?.username).map(u => (
                                        <button key={u.username} onClick={() => handleStartDirectChat(u)} className="w-full p-4 hover:bg-gray-50 rounded-2xl flex items-center gap-4 group transition-all">
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C1CE2] flex items-center justify-center font-black text-xs uppercase group-hover:bg-[#7C1CE2] group-hover:text-white transition-all">{u.name[0]}</div>
                                                <div className="absolute -bottom-0.5 -right-0.5">
                                                    <StatusDot status={onlineUsers[u.username] || 'offline'} size="sm" />
                                                </div>
                                            </div>
                                            <div className="text-left"><p className="text-xs font-black text-gray-900 uppercase tracking-tight">{u.name}</p><p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{u.role}</p></div>
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setShowNewChatModal(false)} className="mt-8 w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {showCreateGroupModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md" onClick={() => setShowCreateGroupModal(false)}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
                            <div className="p-10">
                                <h3 className="text-xs font-black uppercase tracking-tighter mb-8 bg-blue-50 w-fit px-4 py-1 rounded-full text-blue-600">Start Group Chat</h3>
                                <div className="space-y-6">
                                    <input type="text" placeholder="Group name..." value={groupName} onChange={e => setGroupName(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-[11px] font-black uppercase focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none" />
                                    <div className="max-h-60 overflow-y-auto CustomScroll space-y-2 pr-2">
                                        {allUsers.filter(u => u.username !== currentUser?.username).map(u => (
                                            <button key={u.username} onClick={() => setSelectedUsers(prev => prev.includes(u.username) ? prev.filter(id => id !== u.username) : [...prev, u.username])} className={`w-full p-3 rounded-2xl flex items-center gap-4 transition-all ${selectedUsers.includes(u.username) ? 'bg-[#7C1CE2] text-white shadow-lg' : 'hover:bg-gray-50'}`}>
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] ${selectedUsers.includes(u.username) ? 'bg-white/20' : 'bg-gray-100'}`}>{u.name[0]}</div>
                                                <p className="text-[10px] font-black uppercase tracking-tight">{u.name}</p>
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={handleCreateGroup} disabled={isCreating} className="w-full py-4 bg-[#7C1CE2] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-purple-100 hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                                        {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Start Group Chat"}
                                    </button>
                                    <button onClick={() => setShowCreateGroupModal(false)} className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {showAddMemberModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden">
                            <div className="p-10">
                                <h3 className="text-xs font-black uppercase tracking-tighter mb-8 bg-emerald-50 w-fit px-4 py-1 rounded-full text-emerald-600">Add Member</h3>
                                <div className="space-y-2 max-h-96 overflow-y-auto CustomScroll pr-2">
                                    {allUsers.filter(u => u.username !== currentUser?.username && !activeConversation?.members?.includes(u.username)).map(u => (
                                        <button key={u.username} onClick={() => handleAddMember(u.username)} className="w-full p-4 hover:bg-gray-50 rounded-2xl flex items-center gap-4 transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs">{u.name[0]}</div>
                                            <div className="text-left"><p className="text-xs font-black uppercase">{u.name}</p><p className="text-[9px] text-gray-400 uppercase">{u.role}</p></div>
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setShowAddMemberModal(false)} className="mt-8 w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
