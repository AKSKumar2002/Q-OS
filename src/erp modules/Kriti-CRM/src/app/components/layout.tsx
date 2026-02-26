import * as React from "react";
import { NAVIGATION_STRUCTURE, ModuleId, NavGroup } from "../types";
import { cn, Button, Avatar } from "./ui";
import { Search, Bell, HelpCircle, ChevronRight, Menu, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LayoutProps {
  children: React.ReactNode;
  activeModule: ModuleId;
  setActiveModule: (id: ModuleId) => void;
  onLogout: () => void;
  onBackToWorkspace?: () => void;
  user?: {
    name: string;
    role: string;
  };
  navigation?: NavGroup[];
}

export function Layout({ children, activeModule, setActiveModule, onLogout, onBackToWorkspace, user: currentUser, navigation }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const navStructure = navigation || NAVIGATION_STRUCTURE;

  // Simulated alphery hooks/state
  const tenant = {
    installedApps: ["crm", "hospital", "lab"],
    features: ["job_cards", "analytics"]
  };
  const user = {
    role: currentUser?.role || "Admin" // Admin, Staff, Viewer
  };

  return (
    <div className="flex h-screen overflow-hidden p-4 gap-4">
      {/* Floating Glass Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className={cn(
          "glass-panel rounded-3xl flex flex-col h-full relative z-20 transition-all duration-300",
          !isSidebarOpen && "pointer-events-none overflow-hidden"
        )}
      >
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#667EEA] to-[#764BA2] flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-sm leading-tight">Kirti Eye Care</h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Enterprise ERP</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          {navStructure.map((group, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                {group.title}
              </h3>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveModule(item.id);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group relative",
                      activeModule === item.id
                        ? "bg-[#667EEA]/10 text-[#667EEA] shadow-[inset_0_0_20px_rgba(102,126,234,0.1)]"
                        : "text-slate-600 hover:bg-white/20 hover:text-slate-900"
                    )}
                  >
                    <item.icon size={18} className={cn(
                      "shrink-0 transition-transform group-hover:scale-110",
                      activeModule === item.id ? "text-[#667EEA] drop-shadow-[0_0_8px_rgba(102,126,234,0.4)]" : "text-slate-400 group-hover:text-slate-600"
                    )} />
                    <span className="truncate">{item.label}</span>
                    {activeModule === item.id && (
                      <motion.div
                        layoutId="active-indicator"
                        className="ml-auto w-1 h-5 bg-[#667EEA] rounded-full shadow-[0_0_10px_#667EEA]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 transition-all"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Floating Glass Header */}
        <header className="h-16 glass-panel rounded-2xl flex items-center justify-between px-6 shrink-0 z-10 mx-2 mt-2 border-white/40 shadow-xl overflow-hidden">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="bg-white/20 hover:bg-white/40 rounded-xl transition-all h-10 w-10">
              <Menu size={22} className="text-slate-700" />
            </Button>
            {onBackToWorkspace && (
              <Button
                variant="ghost"
                onClick={onBackToWorkspace}
                className="bg-[#667EEA]/10 text-[#667EEA] hover:bg-[#667EEA]/20 rounded-xl px-4 h-10 font-bold flex items-center gap-2 transition-all"
              >
                <ChevronRight className="rotate-180 size-4" />
                Workspace
              </Button>
            )}
            <div className="relative group min-w-[320px]">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#667EEA] transition-colors" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full glass-input h-11 pl-12 pr-4 rounded-xl text-sm transition-all outline-none bg-white/30 border-none shadow-sm placeholder:text-slate-500 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative h-10 w-10 hover:bg-white/40 rounded-xl group transition-all">
              <Bell size={22} className="text-slate-600 transition-transform group-hover:rotate-12" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-white/40 rounded-xl transition-all">
              <HelpCircle size={22} className="text-slate-600" />
            </Button>

            <div className="h-10 w-px bg-slate-400/20 mx-4" />

            <div className="flex items-center gap-4 cursor-pointer group hover:bg-white/20 p-2 rounded-xl transition-all">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-800 leading-tight">{currentUser?.name || "Admin User"}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{currentUser?.role || "Super Admin"}</p>
              </div>
              <Avatar fallback={currentUser?.name?.substring(0, 2).toUpperCase() || "AU"} size="md" className="border-2 border-white/50 shadow-md transform group-hover:scale-105 transition-transform" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-2 custom-scrollbar mt-4">
          {children}
        </main>
      </div>
    </div>
  );
}
