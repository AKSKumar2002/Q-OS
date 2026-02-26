import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Hash, Search, Plus, Users, Loader2, ArrowLeft, MoreVertical, Trash2, X, Pin, Archive, BellOff, Bell, LogOut, UserPlus, UserMinus, Edit3, Paperclip, Send, FileText, Download, Reply, Check, CheckCheck, SmilePlus } from 'lucide-react';
import type { Message, Conversation, ChatUser } from '../core/chat-helpers';

const REACTION_EMOJIS = ['👍', '❤️', '😂', '😮', '🔥', '👏'];

// --- Sidebar ---
export function ChatSidebar({ conversations, activeConversation, setActiveConversation, loading, searchQuery, setSearchQuery, setShowNewChatModal, setShowCreateGroupModal, currentUser, allUsers, navigate, onlineUsers, unreadCounts, currentStatus, onStatusChange }: any) {
    const [showStatusMenu, setShowStatusMenu] = React.useState(false);
    const statuses = [
        { id: 'online', label: 'Online', color: 'bg-emerald-500' },
        { id: 'busy', label: 'Busy', color: 'bg-rose-500' },
        { id: 'on_leave', label: 'In Leave', color: 'bg-blue-400' },
        { id: 'away', label: 'Away', color: 'bg-amber-400' }
    ];

    const getName = (conv: Conversation) => {
        if (conv.name) return conv.name;
        if (conv.type === 'direct' && currentUser && conv.members) {
            const otherId = conv.members.find((id: string) => id !== currentUser.username);
            const other = allUsers.find((u: ChatUser) => u.username === otherId);
            return other?.name || otherId || 'Direct Message';
        }
        return conv.type === 'group' ? 'Unnamed Group' : 'Direct Message';
    };
    const getAvatar = (conv: Conversation) => {
        if (conv.type === 'group' || conv.type === 'channel') return <Hash className="w-5 h-5" />;
        if (conv.type === 'direct' && currentUser && conv.members) {
            const otherId = conv.members.find((id: string) => id !== currentUser.username);
            const other = allUsers.find((u: ChatUser) => u.username === otherId);
            return other?.name?.[0] || 'D';
        }
        return 'D';
    };
    const getUserStatus = (userId: string): string => {
        return onlineUsers?.[userId] || 'offline';
    };

    const getOtherUserId = (conv: Conversation) => {
        if (conv.type !== 'direct' || !conv.members) return null;
        return conv.members.find((id: string) => id !== currentUser?.username);
    };

    const filtered = conversations.filter((c: Conversation) => {
        if (!searchQuery) return !c.is_archived;
        return getName(c).toLowerCase().includes(searchQuery.toLowerCase());
    });
    const pinned = filtered.filter((c: Conversation) => c.is_pinned);
    const unpinned = filtered.filter((c: Conversation) => !c.is_pinned);

    return (
        <aside className="w-80 bg-white border-r border-gray-100 flex flex-col shrink-0 z-40">
            <div className="h-16 flex items-center px-6 border-b border-gray-50 justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-100"><MessageSquare className="w-4 h-4" /></div>
                    <span className="font-black text-gray-900 tracking-tighter text-lg uppercase">Chat</span>
                </div>
                <div className="flex items-center gap-1.5 relative">
                    <button onClick={() => setShowStatusMenu(!showStatusMenu)} className="p-1 px-2 hover:bg-gray-50 rounded-xl transition-all flex items-center gap-2 border border-transparent hover:border-gray-100">
                        <StatusDot status={currentStatus} size="sm" />
                    </button>
                    <AnimatePresence>
                        {showStatusMenu && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowStatusMenu(false)} />
                                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-2xl border border-gray-50 py-2 z-50">
                                    {statuses.map(s => (
                                        <button key={s.id} onClick={() => { onStatusChange(s.id); setShowStatusMenu(false); }} className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 text-[9px] font-black uppercase tracking-widest text-gray-600 transition-colors">
                                            <div className={`w-2 h-2 rounded-full ${s.color}`} />
                                            {s.label}
                                        </button>
                                    ))}
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                    <button onClick={() => navigate('/workspace')} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 group transition-all"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5" /></button>
                </div>
            </div>
            {/* ... rest unchanged ... */}
            <div className="p-4 flex gap-2">
                <button onClick={() => setShowNewChatModal(true)} className="flex-1 bg-[#7C1CE2] text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#6A15C5] transition-all shadow-xl shadow-purple-100"><Plus className="w-4 h-4" /> New Message</button>
                <button onClick={() => setShowCreateGroupModal(true)} className="p-3 bg-gray-50 text-gray-400 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-all"><Users className="w-4 h-4" /></button>
            </div>
            <div className="px-4 pb-4">
                <div className="relative group">
                    <Search className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7C1CE2] transition-colors" />
                    <input type="text" placeholder="Find conversations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl pl-10 pr-4 py-3 text-[11px] font-bold focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all outline-none placeholder:text-gray-400" />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto CustomScroll px-2 space-y-1">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-3"><div className="w-5 h-5 border-2 border-[#7C1CE2] border-t-transparent rounded-full animate-spin" /><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Synching Nodes</span></div>
                ) : conversations.length === 0 ? (
                    <div className="text-center py-20 px-6 opacity-30"><MessageSquare className="w-10 h-10 mx-auto mb-4" /><p className="text-[10px] font-black uppercase tracking-widest">No Active Channels</p></div>
                ) : (
                    <>
                        {pinned.length > 0 && <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-4 pt-2 pb-1 flex items-center gap-1"><Pin className="w-3 h-3" /> Pinned</p>}
                        {pinned.map((conv: Conversation) => <ConvItem key={conv.id} conv={conv} active={activeConversation?.id === conv.id} onClick={() => setActiveConversation(conv)} getName={getName} getAvatar={getAvatar} status={getUserStatus(getOtherUserId(conv)!)} unread={unreadCounts[conv.id] || 0} />)}
                        {pinned.length > 0 && unpinned.length > 0 && <div className="border-t border-gray-50 my-2" />}
                        {unpinned.map((conv: Conversation) => <ConvItem key={conv.id} conv={conv} active={activeConversation?.id === conv.id} onClick={() => setActiveConversation(conv)} getName={getName} getAvatar={getAvatar} status={getUserStatus(getOtherUserId(conv)!)} unread={unreadCounts[conv.id] || 0} />)}
                    </>
                )}
            </div>
        </aside>
    );
}

export function StatusDot({ status, size = 'md' }: { status: string, size?: 'sm' | 'md' | 'lg' }) {
    const colors: any = {
        online: 'bg-emerald-500',
        away: 'bg-amber-400',
        busy: 'bg-rose-500',
        on_leave: 'bg-blue-400',
        offline: 'bg-gray-300'
    };
    const sizes: any = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4'
    };
    return (
        <div className={`rounded-full border-2 border-white ${colors[status] || colors.offline} ${sizes[size]}`} title={status.replace('_', ' ')} />
    );
}

function ConvItem({ conv, active, onClick, getName, getAvatar, status, unread }: any) {
    return (
        <button onClick={onClick} className={`w-full p-4 rounded-3xl flex items-center gap-4 transition-all group ${active ? 'bg-purple-50' : 'hover:bg-gray-50'}`}>
            <div className="relative">
                <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center text-white font-black text-sm shadow-lg ${conv.type === 'group' ? 'bg-indigo-500 shadow-indigo-100' : 'bg-[#7C1CE2] shadow-purple-100'}`}>{getAvatar(conv)}</div>
                {conv.type === 'direct' && <div className="absolute -bottom-0.5 -right-0.5"><StatusDot status={status} /></div>}
            </div>
            <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                    <h4 className="font-black text-gray-900 text-xs uppercase truncate tracking-tight">{getName(conv)}</h4>
                    {unread > 0 && <span className="bg-[#7C1CE2] text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0">{unread > 9 ? '9+' : unread}</span>}
                </div>
                <p className="text-[10px] text-gray-400 font-bold truncate mt-0.5 uppercase tracking-tighter">{conv.last_message || 'Initializing thread...'}</p>
            </div>
        </button>
    );
}

// --- Message Bubble ---
export function MessageBubble({ msg, isMe, currentUser, onReply, onEdit, onDeleteForMe, onDeleteForAll, onPin, onReact, allUsers }: any) {
    const [showActions, setShowActions] = React.useState(false);
    const [showReactions, setShowReactions] = React.useState(false);

    if (msg.is_deleted) {
        return (
            <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className="px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="text-xs text-gray-400 italic">🚫 This message was deleted</p>
                </div>
            </div>
        );
    }
    if (msg.deleted_for?.includes(currentUser?.username)) return null;
    if (msg.type === 'system') {
        return (
            <div className="flex justify-center"><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-1.5 rounded-full">{msg.content}</span></div>
        );
    }

    const hasReactions = msg.reactions && Object.keys(msg.reactions).length > 0;
    const mentionHighlight = (text: string) => {
        return text.replace(/@(\w+)/g, (match, username) => {
            const user = allUsers?.find((u: any) => u.username === username);
            return `<span class="text-blue-500 font-black">@${user?.name || username}</span>`;
        });
    };

    return (
        <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isMe ? 'justify-end' : 'justify-start'} group/msg`}>
            <div className={`max-w-[70%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`} onMouseEnter={() => setShowActions(true)} onMouseLeave={() => { setShowActions(false); setShowReactions(false); }}>
                {!isMe && <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-2">{msg.sender_name || msg.sender_id}</span>}

                {msg.reply_message && (
                    <div className={`text-[10px] mb-1 px-3 py-1.5 rounded-xl border-l-2 ${isMe ? 'bg-purple-50 border-purple-300 text-purple-700' : 'bg-gray-50 border-gray-300 text-gray-500'}`}>
                        <span className="font-black">{msg.reply_message.sender_name}</span>: {msg.reply_message.content?.substring(0, 60)}...
                    </div>
                )}

                <div className={`px-5 py-3.5 shadow-sm relative transition-all ${isMe ? 'bg-[#7C1CE2] text-white rounded-[1.5rem] rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-[1.5rem] rounded-tl-none'}`}>
                    {msg.file_url ? (
                        <div className="space-y-2">
                            {msg.file_url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                <img src={msg.file_url} alt="Attachment" className="max-w-xs rounded-xl cursor-pointer hover:opacity-90 transition-opacity" />
                            ) : (
                                <div className={`flex items-center gap-3 p-3 rounded-xl ${isMe ? 'bg-white/10' : 'bg-gray-50'}`}>
                                    <FileText className="w-4 h-4" />
                                    <span className="text-xs font-bold truncate max-w-[150px]">{msg.file_name || msg.content}</span>
                                    <a href={msg.file_url} target="_blank" rel="noreferrer" className="p-1.5 hover:bg-black/10 rounded-lg"><Download className="w-3.5 h-3.5" /></a>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-sm font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: mentionHighlight(msg.content) }} />
                    )}
                    {msg.is_edited && <span className={`text-[8px] ${isMe ? 'text-white/50' : 'text-gray-400'}`}>(edited)</span>}
                    {msg.is_pinned && <Pin className={`w-3 h-3 absolute top-2 right-2 ${isMe ? 'text-white/40' : 'text-amber-400'}`} />}
                </div>

                {hasReactions && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                        {Object.entries(msg.reactions as Record<string, string[]>).map(([emoji, users]) => (
                            <button key={emoji} onClick={() => onReact(msg.id, emoji)} className={`text-xs px-2 py-0.5 rounded-full border transition-all ${(users as string[]).includes(currentUser?.username) ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}`}>
                                {emoji} {(users as string[]).length}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-1 mt-1">
                    <span className="text-[8px] font-black text-gray-400 uppercase opacity-0 group-hover/msg:opacity-100 transition-opacity">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {isMe && <CheckCheck className="w-3 h-3 text-blue-400 opacity-0 group-hover/msg:opacity-100 transition-opacity" />}
                </div>

                <AnimatePresence>
                    {showActions && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`flex items-center gap-0.5 bg-white border border-gray-100 rounded-xl shadow-lg p-1 mt-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                            <button onClick={() => onReply(msg)} className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors" title="Reply"><Reply className="w-3.5 h-3.5" /></button>
                            <button onClick={() => setShowReactions(!showReactions)} className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors" title="React"><SmilePlus className="w-3.5 h-3.5" /></button>
                            {isMe && <button onClick={() => onEdit(msg)} className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors" title="Edit"><Edit3 className="w-3.5 h-3.5" /></button>}
                            <button onClick={() => onPin(msg.id, !msg.is_pinned)} className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-amber-500 transition-colors" title="Pin"><Pin className="w-3.5 h-3.5" /></button>
                            <button onClick={() => onDeleteForMe(msg.id)} className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors" title="Delete for me"><X className="w-3.5 h-3.5" /></button>
                            {isMe && <button onClick={() => onDeleteForAll(msg.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors" title="Delete for everyone"><Trash2 className="w-3.5 h-3.5" /></button>}
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {showReactions && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="flex gap-1 bg-white border border-gray-100 rounded-xl shadow-lg p-1.5 mt-1">
                            {REACTION_EMOJIS.map(e => <button key={e} onClick={() => { onReact(msg.id, e); setShowReactions(false); }} className="text-lg hover:scale-125 transition-transform p-0.5">{e}</button>)}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export { REACTION_EMOJIS };
