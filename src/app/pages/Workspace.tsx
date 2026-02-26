import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  Stethoscope,
  FlaskConical,
  Warehouse,
  Users2,
  DollarSign,
  Store,
  ShoppingBag,
  Sparkles,
  User,
  Settings,
  Bell,
  LogOut,
  Search,
  LayoutGrid,
  Loader2,
  Menu,
  ChevronRight,
  Plus,
  Building2,
  BarChart3,
  MessageSquare,
  Cpu,
  LifeBuoy,
  ShieldCheck
} from 'lucide-react';
import { AppIcon } from '../components/AppIcon';
import { useNavigate } from 'react-router';
import bgImage from '@/images/BGW.jpg';
import logoImage from '@/images/Alphery Trans BG.png';
import { db } from '../core/firebase';
import { collection, query, where, getDocs, orderBy, limit, onSnapshot, getDoc, doc } from 'firebase/firestore';

interface App {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  modules: string[];
}

const apps: App[] = [
  {
    id: 'crm',
    title: 'CRM',
    icon: <Target className="w-8 h-8" strokeWidth={2.5} />,
    color: '#00A09D', // Odoo Teal
    modules: ['Leads & Enquiries', 'Pipeline', 'Follow-ups', 'Campaigns', 'Analytics']
  },
  {
    id: 'hospital',
    title: 'Hospital',
    icon: <Stethoscope className="w-8 h-8" strokeWidth={2.5} />,
    color: '#E06C75', // Material Coral
    modules: ['Patients', 'Appointments', 'OPD', 'Prescriptions', 'Billing', 'Pharmacy']
  },
  {
    id: 'optical',
    title: 'Optical Lab',
    icon: <FlaskConical className="w-8 h-8" strokeWidth={2.5} />,
    color: '#8265B1', // Material Purple
    modules: ['Lab Jobs', 'QC Checklist', 'Machines', 'Inventory', 'Vendors', 'Payroll']
  },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: <Warehouse className="w-8 h-8" strokeWidth={2.5} />,
    color: '#DE7D42', // Odoo Orange
    modules: ['Product Catalog', 'SKU Mgmt', 'Stock', 'Purchase Orders', 'Transfers', 'Reorder']
  },
  {
    id: 'sales',
    title: 'Sales',
    icon: <Store className="w-8 h-8" strokeWidth={2.5} />,
    color: '#71639E', // Deep Purple
    modules: ['Customers', 'Quotations', 'Orders', 'Invoices', 'Payments', 'Returns']
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce',
    icon: <ShoppingBag className="w-8 h-8" strokeWidth={2.5} />,
    color: '#42A5F5', // Bright Blue
    modules: ['Product Listing', 'Cart & Orders', 'Payments', 'Delivery', 'Returns', 'Loyalty']
  },
  {
    id: 'finance',
    title: 'Accounting',
    icon: <DollarSign className="w-8 h-8" strokeWidth={2.5} />,
    color: '#26A69A', // Greenish Teal
    modules: ['Accounts', 'Journal', 'AR/AP', 'GST/Tax', 'Reports', 'Budget']
  },
  {
    id: 'hr',
    title: 'HR & Payroll',
    icon: <Users2 className="w-8 h-8" strokeWidth={2.5} />,
    color: '#5C6BC0', // Indigo
    modules: ['Employees', 'Attendance', 'Leave Mgmt', 'Payroll', 'Incentives', 'Performance']
  },
  {
    id: 'franchise',
    title: 'Franchise Manager',
    icon: <Building2 className="w-8 h-8" strokeWidth={2.5} />,
    color: '#71639E', // Deep Purple
    modules: ['Franchise Setup', 'Legal Docs', 'Revenue Share', 'Compliance', 'Brand Guidelines']
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: <BarChart3 className="w-8 h-8" strokeWidth={2.5} />,
    color: '#689F38', // Professional Green
    modules: ['Sales Reports', 'User Activity', 'Financial Trends', 'Custom Dashboards', 'Forecasting']
  },
  {
    id: 'communication',
    title: 'Communication',
    icon: <MessageSquare className="w-8 h-8" strokeWidth={2.5} />,
    color: '#FBC02D', // Amber/Yellow
    modules: ['Internal Chat', 'Email Center', 'Broadcasts', 'Notifications', 'Feedback']
  },
  {
    id: 'helpdesk',
    title: 'Support',
    icon: <LifeBuoy className="w-8 h-8" strokeWidth={2.5} />,
    color: '#C2185B', // Deep Rose
    modules: ['Tickets', 'Knowledge Base', 'Live Support', 'SLA Tracking', 'Customer Satisfaction']
  },
  {
    id: 'role-utility',
    title: 'Role Utility',
    icon: <ShieldCheck className="w-8 h-8" strokeWidth={2.5} />,
    color: '#34495E', // Midnight Blue/Slate
    modules: ['User Management', 'App Permissions', 'Access Logs', 'Security Settings']
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: <Sparkles className="w-8 h-8" strokeWidth={2.5} />,
    color: '#7C1CE2', // Alphery Purple
    modules: ['Dashboard', 'Project List', 'My Tasks', 'Workload', 'Reports', 'Automation']
  },
  {
    id: 'system-control',
    title: 'System Control',
    icon: <Cpu className="w-8 h-8" strokeWidth={2.5} />,
    color: '#455A64', // Blue Grey
    modules: ['User Permissions', 'Logs', 'API Settings', 'Database Backup', 'System Health']
  }
];

// Mapping short codes from GSheet to full App IDs
const APP_CODES: Record<string, string> = {
  c: 'crm',
  h: 'hospital',
  o: 'optical',
  i: 'inventory',
  p: 'hr',
  f: 'finance',
  s: 'sales',
  e: 'ecommerce',
  m: 'franchise',
  a: 'analytics',
  x: 'communication',
  u: 'system-control',
  d: 'helpdesk',
  pr: 'projects',
  ru: 'role-utility'
};

export default function Workspace() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user, setUser] = useState<any>(null);
  const [unreadNotifications, setUnreadNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('alphery_user');
    if (!savedUser) {
      navigate('/');
      return;
    }
    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const tId = user.company || user.tenant_id;
    if (!tId) return;

    const fetchNotifications = async () => {
      try {
        const membersQ = query(collection(db, 'conversation_members'), where('user_id', '==', user.username));
        const memberSnap = await getDocs(membersQ);
        const members = memberSnap.docs.map(d => d.data());

        if (members.length === 0) return;

        const convIds = members.map(m => m.conversation_id);

        // Fetch recent messages for these conversations
        // (Firestore "in" query limited to 30 items)
        const chunks = [];
        for (let i = 0; i < convIds.length; i += 30) {
          chunks.push(convIds.slice(i, i + 30));
        }

        let allRecentMsgs: any[] = [];
        for (const chunk of chunks) {
          const msgsQ = query(
            collection(db, 'messages'),
            where('conversation_id', 'in', chunk),
            orderBy('created_at', 'desc'),
            limit(50)
          );
          const msgsSnap = await getDocs(msgsQ);
          allRecentMsgs = [...allRecentMsgs, ...msgsSnap.docs.map(d => ({ id: d.id, ...d.data() }))];
        }

        const filtered = await Promise.all(allRecentMsgs.filter(m => {
          const member = members.find(mem => mem.conversation_id === m.conversation_id);
          return m.sender_id !== user.username && (!member?.last_read_at || m.created_at > member.last_read_at);
        }).map(async m => {
          // Enriched with conversation info
          try {
            const convDoc = await getDoc(doc(db, 'conversations', m.conversation_id));
            return { ...m, conversations: convDoc.exists() ? convDoc.data() : null };
          } catch {
            return m;
          }
        }));

        setUnreadNotifications(filtered.sort((a, b) => b.created_at.localeCompare(a.created_at)));
      } catch (err) { console.error('Error fetching notifications:', err); }
    };

    fetchNotifications();

    // Set up realtime listeners
    const msgsQ = query(collection(db, 'messages'), where('tenant_id', '==', tId));
    const unsubMsgs = onSnapshot(msgsQ, () => fetchNotifications());

    const membersQ2 = query(collection(db, 'conversation_members'), where('user_id', '==', user.username));
    const unsubMembers = onSnapshot(membersQ2, () => fetchNotifications());

    return () => {
      unsubMsgs();
      unsubMembers();
    };
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('alphery_user');
    navigate('/');
  };

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (!user) return matchesSearch;

    const isL0 = user.level?.toUpperCase() === 'L0' || user.role === 'Super Admin';
    const isL1 = user.level?.toUpperCase() === 'L1';

    // Role Utility is visible if user has explicit access, or is L0
    if (app.id === 'role-utility') {
      if (isL0) return matchesSearch;

      const hasExplicitAccess = user.allowedApps?.some((val: string) => {
        const code = val.trim().toLowerCase();
        return code === 'role-utility' || code === 'ru';
      });

      return matchesSearch && hasExplicitAccess;
    }

    // Super Admin / L0 sees everything.
    // Others see only what is assigned in allowedApps.
    const hasFullAccess = isL0;

    // Check if the app ID OR its translated short code is in the allowed list
    const isAllowed = hasFullAccess || user.allowedApps?.some((val: string) => {
      const code = val.trim().toLowerCase();
      return code === app.id || APP_CODES[code] === app.id;
    });

    return matchesSearch && isAllowed;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <h2 className="text-white text-xl font-medium">Entering Workspace</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col overflow-hidden">
      {/* Odoo Top Bar */}
      <nav className="h-12 bg-gradient-to-r from-[#71639E] to-[#5d5182] text-white flex items-center justify-between px-4 z-50 shrink-0 shadow-lg border-b border-white/10">
        <div className="flex items-center gap-2 h-full">
          <button
            onClick={() => setSelectedApp(null)}
            className="p-2 hover:bg-white/10 rounded-md transition-colors text-white"
            title="App Menu"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>

          {selectedApp && (
            <>
              <div className="w-px h-6 bg-white/20 mx-1" />
              <button className="px-3 h-full hover:bg-white/10 flex items-center gap-2 font-medium text-white">
                {selectedApp.title}
              </button>
              <div className="flex items-center text-white/60 text-sm">
                <ChevronRight className="w-4 h-4" />
                <span className="px-2 text-white/80">Dashboard</span>
              </div>
            </>
          )}

          {!selectedApp && (
            <div className="flex flex-col ml-2 justify-center">
              <span className="font-bold tracking-tight text-white leading-none text-sm">{user?.company || 'Kirti Eye Care'}</span>
              <div className="flex items-center gap-1 mt-0.5 opacity-70">
                <span className="text-[8px] uppercase tracking-widest text-white font-medium">powered by</span>
                <img src={logoImage} alt="Alphery Logo" className="w-3 h-3 object-contain" />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/15 border border-transparent rounded-md pl-10 pr-4 py-1.5 text-sm focus:ring-1 focus:ring-white/30 focus:bg-white/25 transition-all outline-none placeholder:text-white/40 text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 hover:bg-white/10 text-white rounded-md relative group transition-all ${showNotifications ? 'bg-white/10' : ''}`}
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-[#71639E] text-[8px] font-black flex items-center justify-center shadow-lg animate-bounce">
                  {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
                  >
                    <div className="px-5 py-3 border-b border-gray-50 flex items-center justify-between">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Notifications</h3>
                      {unreadNotifications.length > 0 && <span className="px-2 py-0.5 bg-red-50 text-red-500 rounded-full text-[9px] font-black">{unreadNotifications.length} NEW</span>}
                    </div>

                    <div className="max-h-[400px] overflow-y-auto CustomScroll">
                      {unreadNotifications.length === 0 ? (
                        <div className="px-10 py-12 text-center">
                          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-6 h-6 text-gray-200" />
                          </div>
                          <p className="text-xs font-black text-gray-300 uppercase tracking-widest">All caught up!</p>
                        </div>
                      ) : (
                        unreadNotifications.map((n, idx) => (
                          <button
                            key={n.id}
                            onClick={() => {
                              navigate('/communication');
                              setShowNotifications(false);
                            }}
                            className="w-full px-5 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 flex gap-4 items-start"
                          >
                            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C1CE2] flex items-center justify-center font-black text-xs shrink-0">
                              {n.sender_id?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-0.5">
                                <p className="text-[10px] font-black text-gray-900 uppercase truncate">
                                  {n.conversations?.name || n.sender_id}
                                </p>
                                <span className="text-[8px] font-black text-gray-400 uppercase shrink-0">
                                  {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed">
                                {n.content}
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>

                    <button
                      onClick={() => {
                        navigate('/communication');
                        setShowNotifications(false);
                      }}
                      className="w-full py-4 text-[9px] font-black text-[#7C1CE2] uppercase tracking-[0.2em] hover:bg-purple-50 transition-colors border-t border-gray-50 bg-white sticky bottom-0"
                    >
                      View All in Chat
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button className="p-2 hover:bg-white/10 text-white rounded-md">
            <Settings className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-white/20 mx-2" />

          <div className="relative">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className={`flex items-center px-2 py-1 rounded-md text-sm font-semibold text-white hover:bg-white/10 transition-colors ${showCalendar ? 'bg-white/10' : ''}`}
            >
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </button>

            <AnimatePresence>
              {showCalendar && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/40 p-5 z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {currentTime.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center cursor-not-allowed opacity-50"><ChevronRight size={16} className="rotate-180" /></div>
                      <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center cursor-not-allowed opacity-50"><ChevronRight size={16} /></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-y-4 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                      <div key={day} className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-widest">{day}</div>
                    ))}

                    {(() => {
                      const year = currentTime.getFullYear();
                      const month = currentTime.getMonth();
                      const daysInMonth = new Date(year, month + 1, 0).getDate();
                      const firstDayOfMonth = new Date(year, month, 1).getDay();

                      const days = [];
                      for (let i = 0; i < firstDayOfMonth; i++) {
                        days.push(<div key={`empty-${i}`} />);
                      }

                      for (let day = 1; day <= daysInMonth; day++) {
                        const isToday = day === currentTime.getDate();
                        days.push(
                          <div key={day} className="flex items-center justify-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all ${isToday ? 'bg-[#7C1CE2] text-white shadow-lg' : 'text-gray-700 hover:bg-black/5 cursor-pointer'}`}>
                              {day}
                            </div>
                          </div>
                        );
                      }
                      return days;
                    })()}
                  </div>

                  <div className="mt-6 pt-5 border-t border-gray-200">
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#7C1CE2]" />
                      <span>Next Meeting: CRM Design Review</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-px h-6 bg-white/20 mx-2" />

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-md hover:bg-white/10 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20 text-white/80">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold hidden md:block text-white">
                {user?.name || 'Administrator'}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 text-gray-800">
                <div className="px-4 py-2 border-b border-gray-100 mb-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Logged in as</p>
                  <p className="text-sm font-bold text-[#7C1CE2] truncate">{user?.role || 'User'}</p>
                </div>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2">
                  <User className="w-4 h-4" /> Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Preferences
                </button>
                <div className="my-1 border-t border-gray-100" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <motion.main
        className="flex-1 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <AnimatePresence mode="wait">
          {!selectedApp ? (
            /* APP LAUNCHER GRID */
            <motion.div
              key="launcher"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 overflow-y-auto pt-32 px-12 pb-12 backdrop-blur-sm"
            >
              <div className="max-w-6xl mx-auto px-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-16">
                  {filteredApps.map((app, index) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      className="flex flex-col items-center gap-3 cursor-pointer group"
                      onClick={() => {
                        if (app.id === 'crm') {
                          navigate('/crm');
                        } else if (app.id === 'hospital') {
                          navigate('/hospital');
                        } else if (app.id === 'role-utility') {
                          navigate('/role-utility');
                        } else if (app.id === 'optical') {
                          navigate('/lab');
                        } else if (app.id === 'inventory') {
                          navigate('/inventory');
                        } else if (app.id === 'hr') {
                          navigate('/hr');
                        } else if (app.id === 'finance') {
                          navigate('/accounting');
                        } else if (app.id === 'sales') {
                          navigate('/sales');
                        } else if (app.id === 'franchise') {
                          navigate('/franchise');
                        } else if (app.id === 'ecommerce') {
                          navigate('/ecommerce');
                        } else if (app.id === 'projects') {
                          navigate('/projects');
                        } else if (app.id === 'communication') {
                          navigate('/communication');
                        } else {
                          setSelectedApp(app);
                        }
                      }}
                    >
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] rotate-45 transform"
                        style={{ backgroundColor: app.color }}
                      >
                        <div className="-rotate-45">
                          {app.icon}
                        </div>
                      </div>
                      <span className="text-gray-800 text-sm font-semibold text-center leading-tight mt-4">
                        {app.title}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {filteredApps.length === 0 && (
                  <div className="text-center py-20 text-white/40">
                    <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p className="text-xl">No applications found</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* APP WORKSPACE */
            <motion.div
              key="workspace"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0 flex"
            >
              {/* Sidebar */}
              <aside className="w-64 bg-white/70 backdrop-blur-2xl border-r border-white/20 flex flex-col shrink-0">
                <div className="p-4 border-b border-gray-200">
                  <button className="w-full bg-[#7C1CE2] text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <Plus className="w-4 h-4" /> New Record
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto py-2">
                  {selectedApp.modules.map((module: string, idx: number) => (
                    <button
                      key={idx}
                      className={`w-full px-6 py-2.5 text-left text-sm hover:bg-gray-100 flex items-center gap-3 transition-colors ${idx === 0 ? 'bg-purple-50 text-[#7C1CE2] border-r-4 border-[#7C1CE2] font-medium' : 'text-gray-600'}`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedApp.color }} />
                      {module}
                    </button>
                  ))}
                </div>
              </aside>

              {/* Main App Content */}
              <div className="flex-1 bg-gray-50 flex flex-col min-w-0">
                {/* App Toolbar */}
                <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium hover:bg-gray-50">List</button>
                      <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium hover:bg-gray-50">Kanban</button>
                      <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium hover:bg-gray-50">Graph</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Filter..."
                        className="pl-9 pr-4 py-1.5 bg-gray-100 border-none rounded-md text-sm focus:ring-1 focus:ring-purple-200 outline-none w-64"
                      />
                    </div>
                  </div>
                </header>

                {/* Dashboard Grid Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-gray-500 uppercase">Metric {i}</span>
                          <div className="p-2 rounded-lg bg-gray-50 text-[#714B67]">
                            <Target className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">$24,500</div>
                        <div className="mt-2 text-xs text-green-600 flex items-center gap-1 font-medium">
                          <span className="bg-green-100 px-1 rounded">+12.5%</span>
                          <span className="text-gray-400">vs last month</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">Recent Activities</h3>
                      <button className="text-xs text-[#7C1CE2] font-medium hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">New lead generated from campaign {i}</p>
                            <p className="text-xs text-gray-500">2 hours ago • Marketing Team</p>
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-md">
                            <Menu className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* OS Toast Notification Placeholder */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-900/90 backdrop-blur-md text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 pointer-events-auto border border-white/10"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse transition-all duration-700 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
          <span className="text-sm font-bold tracking-wide">All Systems Online</span>
        </motion.div>
      </div>
    </div>
  );
}
