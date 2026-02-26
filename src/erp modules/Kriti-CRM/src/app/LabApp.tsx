import * as React from "react";
import { motion } from "motion/react";
import { Layout } from "./components/layout";
import { DB, LEGACY_DATA } from "./core/data";
import { ModuleId, OPTICAL_LAB_NAVIGATION_STRUCTURE } from "./types";
import { LabDashboard } from "./components/lab/dashboard";
import { LabJobsList } from "./components/lab/job-list";
import { JobDetailView } from "./components/lab/job-detail";
import { ProductionFloor } from "./components/lab/production-floor";
import { QCView } from "./components/lab/qc-view";
import { TechnicianManagement } from "./components/lab/technicians";
import { MachineManagement } from "./components/lab/machines";
import { Login } from "./components/login";
import { Microscope } from "lucide-react";

interface AppProps {
    onBackToWorkspace?: () => void;
    initialUser?: { name: string; role: string } | null;
    skipLoader?: boolean;
}

export default function LabApp({ onBackToWorkspace, initialUser, skipLoader = false }: AppProps) {
    const [activeModule, setActiveModule] = React.useState<ModuleId>("lab-dashboard");
    const [viewState, setViewState] = React.useState<"list" | "create" | "detail">("list");
    const [selectedItem, setSelectedItem] = React.useState<any>(null);

    // --- AUTHENTICATION STATE ---
    const [user, setUser] = React.useState<{ name: string; role: string } | null>(initialUser || null);
    const [isAuthLoading, setIsAuthLoading] = React.useState(!skipLoader);

    React.useEffect(() => {
        if (!initialUser) {
            const savedUser = localStorage.getItem("lab_user");
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        }

        if (!skipLoader) {
            setTimeout(() => {
                setIsAuthLoading(false);
            }, 3000);
        }
    }, [initialUser, skipLoader]);

    const handleLogin = (username: string) => {
        const userData = { name: username, role: "Lab Manager" };
        setUser(userData);
        localStorage.setItem("lab_user", JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("lab_user");
    };

    const renderContent = () => {
        switch (activeModule) {
            case "lab-dashboard":
                return <LabDashboard onViewJob={(job) => {
                    setSelectedItem(job);
                    setActiveModule("lab-jobs");
                    setViewState("detail");
                }} />;
            case "lab-jobs":
                if (viewState === "detail" && selectedItem) {
                    return <JobDetailView job={selectedItem} onBack={() => setViewState("list")} />;
                }
                return <LabJobsList onView={(job) => {
                    setSelectedItem(job);
                    setViewState("detail");
                }} />;
            case "lab-production":
                return <ProductionFloor />;
            case "lab-qc":
                return <QCView />;
            case "lab-remakes":
                // Reuse job list but filtered for remakes/errors? Or a specialized view.
                // For now, let's use a placeholder or reuse JobList with a filter prop if I implement it.
                return <LabJobsList filter="issue" onView={(job) => {
                    setSelectedItem(job);
                    setActiveModule("lab-jobs");
                    setViewState("detail");
                }} />;
            case "lab-technicians":
                return <TechnicianManagement />;
            case "lab-machines":
                return <MachineManagement />;
            case "lab-transfers":
            case "lab-batch":
            case "lab-warranty":
                // These are the new Enterprise modules.
                // For MVP, we can show a coming soon or basic list.
                // Let's use the default "Under Construction" for now, or 
                // if we want to be fancy, we can show a specific "Enterprise Feature" placeholder.
                return (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <Microscope size={64} className="mb-4 opacity-20" />
                        <h3 className="text-xl font-bold">Enterprise Feature</h3>
                        <p>The {activeModule.replace("lab-", "").toUpperCase()} module is part of the Enterprise plan.</p>
                        <p className="text-sm mt-2">Coming soon in Phase 2.</p>
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <Microscope size={64} className="mb-4 opacity-20" />
                        <h3 className="text-xl font-bold">Module Under Construction</h3>
                        <p>The {activeModule.replace("lab-", "").toUpperCase()} module is coming soon.</p>
                    </div>
                );
        }
    };

    if (isAuthLoading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#764BA2] text-white relative overflow-hidden">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center relative z-10">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Microscope size={72} className="mx-auto mb-4 text-white drop-shadow-xl" />
                    </motion.div>
                    <h1 className="text-5xl font-black tracking-widest uppercase mb-1">OPTICAL LAB</h1>
                    <p className="text-sm font-bold opacity-70 tracking-[0.6em] uppercase">Precision Lab OS</p>
                    <div className="mt-12 flex items-center gap-2 justify-center opacity-40">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                </motion.div>
                <div className="absolute inset-0 bg-white/5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>
        );
    }

    if (!user) {
        // Reuse Login component but maybe we can pass a theme or just use it as is
        return <Login onLogin={handleLogin} />;
    }

    return (
        <Layout
            activeModule={activeModule}
            setActiveModule={(id) => {
                setActiveModule(id);
                setViewState("list");
            }}
            onLogout={handleLogout}
            onBackToWorkspace={onBackToWorkspace}
            user={user}
            navigation={OPTICAL_LAB_NAVIGATION_STRUCTURE}
        >
            {renderContent()}
        </Layout>
    );
}
