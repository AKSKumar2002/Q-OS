import * as React from "react";
import { motion } from "motion/react";
import { Layout } from "./components/layout";
import { HRModuleId, HR_NAVIGATION, HR_DB } from "./hr-types";
import { HRDashboard } from "./components/hr-dashboard";
import { ListView, FormView, DetailView } from "./components/module-views";
import { Badge, Input, Label, Card, Button, Avatar } from "./components/ui";
import { Login } from "./components/login";
import {
    Users, UserPlus, CalendarDays, Clock, Banknote, ShieldCheck,
    Plus, ChevronLeft, CheckCircle2, UserCircle2,
    FileBadge, Trophy, Scale, Wallet, Landmark, Target, Briefcase,
    Milestone, History, Monitor, Zap, Lock, MapPin
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────
interface AppProps {
    onBackToWorkspace?: () => void;
    initialUser?: { name: string; role: string } | null;
    skipLoader?: boolean;
}

const BRAND = "#5C6BC0"; // Indigo theme

export default function HRApp({ onBackToWorkspace, initialUser, skipLoader = false }: AppProps) {
    const [activeModule, setActiveModule] = React.useState<HRModuleId>("hr-dashboard");
    const [viewState, setViewState] = React.useState<"list" | "create" | "detail">("list");
    const [selectedItem, setSelectedItem] = React.useState<any>(null);
    const [activeTab, setActiveTab] = React.useState("Overview");

    // ── Auth ──
    const [user, setUser] = React.useState<{ name: string; role: string } | null>(initialUser || null);
    const [isAuthLoading, setIsAuthLoading] = React.useState(!skipLoader);

    React.useEffect(() => {
        if (!initialUser) {
            const saved = localStorage.getItem("hr_user");
            if (saved) setUser(JSON.parse(saved));
        }
        if (!skipLoader) {
            setTimeout(() => setIsAuthLoading(false), 2000);
        }
    }, [initialUser, skipLoader]);

    const handleLogin = (username: string) => {
        const u = { name: username, role: "HR Manager" };
        setUser(u);
        localStorage.setItem("hr_user", JSON.stringify(u));
    };
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("hr_user");
    };

    const navigate = (id: HRModuleId) => {
        setActiveModule(id);
        setViewState("list");
    };

    // ─────────────────────────────────────────────────────────────────
    //  DATA MAP (Enterprise Expanded)
    // ─────────────────────────────────────────────────────────────────
    const DATA_MAP: Record<string, any[]> = {
        "hr-employees": HR_DB.employees,
        "hr-lifecycle": HR_DB.lifecycle,
        "hr-salary-history": HR_DB.salaryHistory,
        "hr-assets": HR_DB.assets,
        "hr-attendance": HR_DB.attendance,
        "hr-corrections": HR_DB.corrections,
        "hr-leaves": HR_DB.leaves,
        "hr-leave-req": HR_DB.leaves.filter(l => l.status === 'Pending'),
        "hr-run-payroll": HR_DB.payroll,
        "hr-payslips": HR_DB.payroll.filter(p => p.status === 'Paid'),
        "hr-loans": HR_DB.loans,
        "hr-incentives": HR_DB.incentives,
        "hr-kpis": HR_DB.incentives,
        "hr-approvals": [...HR_DB.corrections.filter(c => c.status === 'Pending'), ...HR_DB.leaves.filter(l => l.status === 'Pending')],
    };

    // ─────────────────────────────────────────────────────────────────
    //  COLUMN DEFINITIONS (Enterprise Grade)
    // ─────────────────────────────────────────────────────────────────
    const getColumns = (module: HRModuleId): any[] => {
        switch (module) {
            case "hr-employees":
                return [
                    { key: "id", label: "Employee ID", render: (v: any) => <span className="text-[10px] font-mono bg-slate-100 px-1 rounded">{v}</span> },
                    {
                        key: "name", label: "Employee", render: (v: any, row: any) => (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 text-xs">{v.charAt(0)}</div>
                                <div>
                                    <div className="font-bold text-sm text-slate-800">{v}</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{row.role}</div>
                                </div>
                            </div>
                        )
                    },
                    { key: "dept", label: "Department", render: (v: any) => <Badge variant="info">{v}</Badge> },
                    { key: "payModel", label: "Pay Model", render: (v: any) => <span className="text-[9px] font-black text-slate-400 border border-slate-200 px-1.5 rounded uppercase">{v}</span> },
                    { key: "status", label: "Lifecycle", render: (v: any) => <Badge variant={v === 'Confirmed' ? 'success' : 'warning'}>{v}</Badge> },
                ];

            case "hr-lifecycle":
                return [
                    { key: "empName", label: "Employee", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "event", label: "Target Event", render: (v: any) => <span className="font-black text-indigo-600">{v}</span> },
                    { key: "dueDate", label: "Review Due" },
                    { key: "status", label: "Current Status", render: (v: any) => <Badge variant={v === 'On Notice' ? 'error' : 'warning'}>{v}</Badge> },
                ];

            case "hr-salary-history":
                return [
                    { key: "empName", label: "Employee", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "oldPay", label: "Former Pay", render: (v: any) => <span className="text-slate-400 line-through">₹{v}</span> },
                    { key: "newPay", label: "Revised Pay", render: (v: any) => <span className="font-black text-emerald-600">₹{v}</span> },
                    { key: "effectiveDate", label: "Effective From" },
                    { key: "approvedBy", label: "Auth Signatory" },
                ];

            case "hr-assets":
                return [
                    { key: "empName", label: "Assigned To", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "asset", label: "Asset Item", render: (v: any) => <div className="flex items-center gap-2"><Monitor size={14} className="text-slate-400" /><span>{v}</span></div> },
                    { key: "serial", label: "Serial / Tag", render: (v: any) => <span className="text-[10px] font-mono">{v}</span> },
                    { key: "status", label: "State", render: (v: any) => <Badge variant={v.includes('Returned') ? 'neutral' : 'success'}>{v}</Badge> },
                ];

            case "hr-corrections":
                return [
                    { key: "empName", label: "Employee", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "date", label: "Dispute Date" },
                    { key: "type", label: "Reason Type", render: (v: any) => <Badge variant="info">{v}</Badge> },
                    { key: "status", label: "Resolution", render: (v: any) => <Badge variant={v === 'Approved' ? 'success' : 'warning'}>{v}</Badge> },
                ];

            case "hr-attendance":
                return [
                    { key: "date", label: "Date" },
                    { key: "empName", label: "Employee", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "checkIn", label: "In", render: (v: any) => <span className="text-emerald-600 font-bold">{v}</span> },
                    { key: "checkOut", label: "Out", render: (v: any) => <span className="text-blue-600 font-bold">{v}</span> },
                    { key: "status", label: "Mode", render: (v: any) => <Badge variant={v === 'Present' ? 'success' : 'error'}>{v}</Badge> },
                ];

            default:
                return [
                    { key: "id", label: "ID" },
                    { key: "name", label: "Name" },
                ];
        }
    };

    const renderContent = () => {
        if (activeModule === "hr-dashboard") {
            return <HRDashboard onNavigate={navigate} />;
        }

        // --- Specialized Enterprise Views ---
        if (activeModule === "hr-salary-structure") {
            return (
                <div className="max-w-4xl space-y-6">
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Contract & Pay Models</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 space-y-4">
                            <h3 className="font-black text-indigo-600 flex items-center gap-2"><Target size={18} /> Healthcare Models</h3>
                            <div className="space-y-3">
                                {['Fixed Salary', 'Per Consultation Fee', 'Surgeon Fee (Per Case %)', 'Revenue Share (Dermat/Opt)'].map(m => (
                                    <div key={m} className="p-3 bg-indigo-50/30 border border-indigo-100 rounded-xl flex items-center justify-between">
                                        <span className="text-sm font-bold text-slate-700">{m}</span>
                                        <Button size="sm" variant="ghost"><Plus size={14} /></Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card className="p-6 space-y-4">
                            <h3 className="font-black text-emerald-600 flex items-center gap-2"><Scale size={18} /> Statutory Rules (India)</h3>
                            <div className="space-y-2">
                                {['EPF Contribution (12%)', 'ESI (Employer + Employee)', 'Professional Tax (Slabs)', 'TDS (Income Tax)'].map(c => (
                                    <div key={c} className="flex justify-between p-2 bg-slate-50 rounded-lg text-xs font-bold"><span>{c}</span><span className="text-slate-400 font-mono">Auto-Calc</span></div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            );
        }

        if (activeModule === "hr-payroll-lock") {
            return (
                <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-100">
                        <Lock size={48} className="text-emerald-600" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800">Financial Period Control</h2>
                        <p className="text-slate-500 font-medium mt-2">Locking a period prevents attendance adjustments and salary changes for the closed month.</p>
                    </div>
                    <Card className="p-6 bg-slate-50 border-dashed text-left">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Closed Periods</h3>
                        <div className="space-y-2">
                            {['January 2026', 'December 2025', 'November 2025'].map(m => (
                                <div key={m} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                                    <span className="font-bold text-slate-700">{m}</span>
                                    <Badge variant="success">Locked & Reconciled</Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Button className="w-full bg-[#5C6BC0] h-12 rounded-2xl font-black uppercase tracking-widest">Close February 2026 Period</Button>
                </div>
            );
        }

        if (viewState === "create") {
            const isEmployee = activeModule === "hr-employees";
            return (
                <FormView title={activeModule.replace('hr-', '')} onCancel={() => setViewState("list")} onSave={() => setViewState("list")}>
                    <div className="space-y-4">
                        <Label>Employee Name / Reference</Label>
                        <Input placeholder="Enter name or title..." />
                        {isEmployee && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5"><Label>Role</Label><Input placeholder="e.g. Doctor, Technician" /></div>
                                    <div className="space-y-1.5"><Label>Pay Model</Label><Input placeholder="Fixed / Case-based" /></div>
                                </div>
                                <div className="space-y-1.5"><Label>Current Life-stage</Label><Input placeholder="Probation / Confirmed" /></div>
                            </>
                        )}
                        <Label>Effective Date</Label>
                        <Input type="date" />
                    </div>
                    <div className="space-y-4 pt-4">
                        <Label>Primary Amount / Multiplier</Label>
                        <Input type="number" placeholder="Enter value" />
                        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 flex items-center gap-3">
                            <ShieldCheck size={20} className="text-indigo-600" />
                            <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-tighter">This action triggers an Approval Workflow according to HR Policy.</p>
                        </div>
                    </div>
                </FormView>
            );
        }

        if (viewState === "detail") {
            return (
                <DetailView
                    title={selectedItem?.name || selectedItem?.empName || "Record Details"}
                    onBack={() => setViewState("list")}
                    tabs={["Overview", "Salary History", "Asset Logs", "Actions"]}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    sidebarContent={
                        <div className="space-y-3">
                            {['Emp ID: ' + (selectedItem?.id || 'N/A'), 'Status: ' + (selectedItem?.status || 'Active')].map((s, i) => (
                                <div key={i} className="flex justify-between text-xs py-1 border-b border-slate-50">
                                    <span className="font-bold text-slate-800">{s}</span>
                                </div>
                            ))}
                            <div className="pt-4 space-y-2">
                                <Button className="w-full justify-start gap-2 h-9 text-[10px] font-black uppercase tracking-widest" variant="outline"><UserPlus size={14} /> Role Change</Button>
                                <Button className="w-full justify-start gap-2 h-9 text-[10px] font-black uppercase tracking-widest" variant="outline"><Zap size={14} /> Transfer Branch</Button>
                                <Button className="w-full justify-start gap-2 h-9 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 border-red-100" variant="outline"><Scale size={14} /> Process Exit</Button>
                            </div>
                        </div>
                    }
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                                <UserCircle2 size={18} className="text-indigo-500" /> Professional Dossier
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(selectedItem || {}).map(([k, v]: any) => (
                                    <div key={k} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{k}</span>
                                        <span className="text-sm font-black text-slate-800 text-right">{String(v)}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <div className="space-y-6">
                            <Card className="p-6 border-l-4 border-indigo-500 bg-white">
                                <h3 className="font-black text-slate-800 mb-4 text-sm">Performance Scorecard</h3>
                                <div className="space-y-4">
                                    {['Clinical KPI', 'Operational Compliance', 'Patient Rating'].map((metric, i) => (
                                        <div key={metric} className="space-y-1">
                                            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase"><span>{metric}</span><span>{80 + (i * 2)}%</span></div>
                                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${80 + (i * 2)}%` }} /></div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                            <Card className="p-6 bg-slate-900 text-white rounded-3xl overflow-hidden relative shadow-xl shadow-slate-200">
                                <History size={80} className="absolute -right-4 -bottom-4 opacity-10" />
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-6">Revision History</h3>
                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-start gap-3 border-l-2 border-white/20 pl-4">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1" />
                                        <div>
                                            <p className="text-xs font-black">Current: ₹1.65L</p>
                                            <p className="text-[10px] opacity-50 uppercase">Effective Jan 01, 2026</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 border-l-2 border-white/20 pl-4 opacity-40">
                                        <div className="w-2 h-2 rounded-full bg-white mt-1" />
                                        <div>
                                            <p className="text-xs font-black">Previous: ₹1.40L</p>
                                            <p className="text-[10px] uppercase">Effective Mar 15, 2025</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </DetailView>
            );
        }

        const labelMap: any = {
            "hr-employees": "Staff Directory",
            "hr-lifecycle": "Employee Lifecycle Tracker",
            "hr-salary-history": "Salary Revision Ledger",
            "hr-assets": "Asset Assignments",
            "hr-attendance": "Daily Attendance Logs",
            "hr-corrections": "Correction Requests",
            "hr-leaves": "Leave Master Calendar",
            "hr-leave-req": "Pending Approvals",
            "hr-run-payroll": "Payroll Batches",
            "hr-payroll-lock": "Period Close Control",
            "hr-loans": "Advances & Loan EMIs",
            "hr-incentives": "Incentive Calc",
            "hr-kpis": "Performance scorecards",
            "hr-approvals": "Central Approval Queue",
        };

        return (
            <ListView
                title={labelMap[activeModule] || "Module View"}
                data={DATA_MAP[activeModule] || []}
                columns={getColumns(activeModule)}
                onCreate={() => setViewState("create")}
                onView={(item: any) => { setSelectedItem(item); setViewState("detail"); }}
            />
        );
    };

    if (isAuthLoading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#5C6BC0] text-white relative overflow-hidden">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center relative z-10">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Users size={72} className="mx-auto mb-4 text-white drop-shadow-xl" />
                    </motion.div>
                    <h1 className="text-5xl font-black tracking-widest uppercase mb-1">HR & PAYROLL</h1>
                    <p className="text-sm font-bold opacity-70 tracking-[0.6em] uppercase">Enterprise Workforce Engine</p>
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

    if (!user) return <Login onLogin={handleLogin} />;

    return (
        <Layout
            activeModule={activeModule as any}
            setActiveModule={(id: any) => { setActiveModule(id); setViewState("list"); }}
            onLogout={handleLogout}
            onBackToWorkspace={onBackToWorkspace}
            user={user}
            navigation={HR_NAVIGATION as any}
        >
            {renderContent()}
        </Layout>
    );
}
