import { db, storage } from './firebase';
import {
    collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc,
    query, where, orderBy, limit, onSnapshot, serverTimestamp,
    setDoc, Timestamp, writeBatch
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// --- Types ---
export interface ChatUser {
    username: string;
    name: string;
    role: string;
    level: string;
    image?: string;
    email?: string;
}

export interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    content: string;
    file_url?: string;
    file_name?: string;
    file_type?: string;
    type: 'text' | 'image' | 'file' | 'system' | 'reply';
    reply_to?: string;
    is_edited: boolean;
    is_deleted: boolean;
    deleted_for: string[];
    is_pinned: boolean;
    reactions: Record<string, string[]>;
    mentions: string[];
    edited_at?: string;
    created_at: string;
    sender_name?: string;
    reply_message?: Message | null;
}

export interface Conversation {
    id: string;
    tenant_id: string;
    type: 'direct' | 'group' | 'channel';
    name?: string;
    description?: string;
    created_by?: string;
    is_archived: boolean;
    created_at: string;
    updated_at: string;
    members?: string[];
    member_roles?: Record<string, string>;
    last_message?: string;
    last_cleared_at?: string;
    last_read_at?: string;
    is_muted?: boolean;
    is_pinned?: boolean;
    unread_count?: number;
}

// --- Presence ---
export type UserStatus = 'online' | 'away' | 'busy' | 'on_leave' | 'offline';

export const updatePresence = async (userId: string, tenantId: string, status: UserStatus) => {
    try {
        const presRef = doc(db, 'user_presence', userId);
        await setDoc(presRef, {
            user_id: userId, tenant_id: tenantId, status,
            last_seen: serverTimestamp()
        }, { merge: true });
    } catch { /* collection may not exist yet */ }
};

// --- Typing ---
export const sendTypingIndicator = async (convId: string, userId: string) => {
    try {
        const typingRef = doc(db, 'typing_indicators', `${convId}_${userId}`);
        await setDoc(typingRef, {
            conversation_id: convId, user_id: userId,
            updated_at: serverTimestamp()
        }, { merge: true });
    } catch { /* collection may not exist yet */ }
};

export const clearTypingIndicator = async (convId: string, userId: string) => {
    try {
        const typingRef = doc(db, 'typing_indicators', `${convId}_${userId}`);
        await deleteDoc(typingRef);
    } catch { /* collection may not exist yet */ }
};

// --- Reactions ---
export const toggleReaction = async (msgId: string, emoji: string, userId: string, currentReactions: Record<string, string[]>) => {
    const updated = { ...currentReactions };
    if (!updated[emoji]) updated[emoji] = [];
    if (updated[emoji].includes(userId)) {
        updated[emoji] = updated[emoji].filter(id => id !== userId);
        if (updated[emoji].length === 0) delete updated[emoji];
    } else {
        updated[emoji].push(userId);
    }
    const msgRef = doc(db, 'messages', msgId);
    await updateDoc(msgRef, { reactions: updated });
    return updated;
};

// --- Message Actions ---
export const editMessage = async (msgId: string, newContent: string) => {
    const msgRef = doc(db, 'messages', msgId);
    await updateDoc(msgRef, {
        content: newContent,
        is_edited: true,
        edited_at: new Date().toISOString()
    });
};

export const deleteMessageForMe = async (msgId: string, userId: string, currentDeletedFor: string[]) => {
    const updated = [...currentDeletedFor, userId];
    const msgRef = doc(db, 'messages', msgId);
    await updateDoc(msgRef, { deleted_for: updated });
};

export const deleteMessageForEveryone = async (msgId: string) => {
    const msgRef = doc(db, 'messages', msgId);
    await updateDoc(msgRef, { is_deleted: true, content: 'This message was deleted' });
};

export const pinMessage = async (msgId: string, pinned: boolean) => {
    const msgRef = doc(db, 'messages', msgId);
    await updateDoc(msgRef, { is_pinned: pinned });
};

// --- Read Receipts ---
export const markAsRead = async (convId: string, userId: string) => {
    try {
        const memberRef = doc(db, 'conversation_members', `${convId}_${userId}`);
        await updateDoc(memberRef, { last_read_at: new Date().toISOString() });
    } catch { /* doc may not exist yet */ }
};

// --- Group Management ---
export const addMemberToGroup = async (convId: string, userId: string) => {
    const memberRef = doc(db, 'conversation_members', `${convId}_${userId}`);
    await setDoc(memberRef, {
        conversation_id: convId,
        user_id: userId,
        role: 'member',
        is_muted: false,
        is_pinned: false,
        joined_at: new Date().toISOString(),
        last_cleared_at: '1970-01-01',
        last_read_at: '1970-01-01'
    });
};

export const removeMemberFromGroup = async (convId: string, userId: string) => {
    const memberRef = doc(db, 'conversation_members', `${convId}_${userId}`);
    await deleteDoc(memberRef);
};

export const leaveGroup = async (convId: string, userId: string, tenantId: string) => {
    const memberRef = doc(db, 'conversation_members', `${convId}_${userId}`);
    await deleteDoc(memberRef);
    await addDoc(collection(db, 'messages'), {
        conversation_id: convId,
        sender_id: 'system',
        content: `${userId} left the group`,
        tenant_id: tenantId,
        type: 'system',
        is_edited: false,
        is_deleted: false,
        deleted_for: [],
        is_pinned: false,
        reactions: {},
        mentions: [],
        created_at: new Date().toISOString()
    });
};

export const renameGroup = async (convId: string, newName: string) => {
    const convRef = doc(db, 'conversations', convId);
    await updateDoc(convRef, { name: newName });
};

export const toggleMuteConversation = async (convId: string, userId: string, muted: boolean) => {
    const memberRef = doc(db, 'conversation_members', `${convId}_${userId}`);
    await updateDoc(memberRef, { is_muted: muted });
};

export const togglePinConversation = async (convId: string, userId: string, pinned: boolean) => {
    const memberRef = doc(db, 'conversation_members', `${convId}_${userId}`);
    await updateDoc(memberRef, { is_pinned: pinned });
};

export const archiveConversation = async (convId: string, archived: boolean) => {
    const convRef = doc(db, 'conversations', convId);
    await updateDoc(convRef, { is_archived: archived });
};

export const GS_API_URL = import.meta.env.VITE_GS_API_URL || 'https://script.google.com/macros/s/AKfycby3kgcdq5dgx7AdkPKbV2-OH3f5cPWdW6YFdqUHIwqSkDobLu3fd7wvo-yV6Cprjs9TTw/exec';
