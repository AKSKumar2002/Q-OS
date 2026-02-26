import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layout } from "./components/layout";
import { FranchiseModuleId, FRANCHISE_NAVIGATION, FRANCHISE_DB, FR_BRAND } from "./franchise-types";
import { FranchiseDashboard } from "./components/franchise-dashboard";
import { ListView, FormView, DetailView } from "./components/module-views";
import { Badge, Input, Label, Card, Button } from "./components/ui";
import { Login } from "./components/login";
import {
    Activity, UserPlus, DollarSign, LogOut, RefreshCcw, GraduationCap,
    CheckCircle2, ShieldCheck, AlertTriangle, FileText, Download,
    Briefcase, Zap, Search, User, Filter, History, Trash2, Mail,
    Smartphone, MapPin, Globe, Lock, BookOpen, Layers, Monitor
} from "lucide-react";

interface FranchiseAppProps {
    onBackToWorkspace?: () => void;
    initialUser?: { name: string; role: string } | null;
    skipLoader?: boolean;
}

export default function FranchiseApp({ onBackToWorkspace, initialUser, skipLoader = false }: FranchiseAppProps) {
    const [activeModule, setActiveModule] = React.useState<FranchiseModuleId>("fr-dashboard");
    const [viewState, setViewState] = React.useState<"list" | "create" | "detail">("list");
    const [selectedItem, setSelectedItem] = React.useState<any>(null);
    const [activeTab, setActiveTab] = React.useState("Overview");

    const [user, setUser] = React.useState<{ name: string; role: string } | null>(initialUser || null);
    const [isAuthLoading, setIsAuthLoading] = React.useState(!skipLoader && !initialUser);

    React.useEffect(() => {
        if (!initialUser) {
            const saved = localStorage.getItem("alphery_user");
            if (saved) setUser(JSON.parse(saved));
        }
        if (!skipLoader && !initialUser) setTimeout(() => setIsAuthLoading(false), 2000);
    }, []);

    const navigate = (id: FranchiseModuleId) => {
        setActiveModule(id); setViewState("list"); setActiveTab("Overview");
    };

    // ─── DATA MAP ──────────────────────────────────────────────────────────────
    const DATA_MAP: Record<string, any[]> = {
        "fr-onboarding": FRANCHISE_DB.franchises,
        "fr-agreements": FRANCHISE_DB.agreements,
        "fr-royalty": FRANCHISE_DB.collections,
        "fr-reconciliation": FRANCHISE_DB.reconciliation,
        "fr-branches": FRANCHISE_DB.branches,
        "fr-compliance": FRANCHISE_DB.compliance,
        "fr-health-score": FRANCHISE_DB.franchises,
        "fr-inventory": FRANCHISE_DB.inventory,
        "fr-performance": FRANCHISE_DB.ranking,
        "fr-recruitment": FRANCHISE_DB.recruitmentLeads,
        "fr-training": FRANCHISE_DB.training,
        "fr-exit": FRANCHISE_DB.exits,
        "fr-support": FRANCHISE_DB.support,
        "fr-territory": FRANCHISE_DB.territory,
        "fr-marketing": FRANCHISE_DB.marketing,
        "fr-legal": FRANCHISE_DB.legalVault,
    };

    // ─── COLUMN DEFINITIONS ────────────────────────────────────────────────
    const getColumns = (module: FranchiseModuleId): any[] => {
        switch (module) {
            case "fr-recruitment":
                return [
                    { key: "name", label: "Lead Name", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "location", label: "Location" },
                    { key: "investmentCapacity", label: "Investment", render: (v: any) => <Badge variant="info">{v}</Badge> },
                    { key: "screeningScore", label: "Score", render: (v: any) => <span className={`font-black ${v >= 80 ? "text-emerald-600" : "text-amber-500"}`}>{v}/100</span> },
                    { key: "verification", label: "Verification", render: (v: any) => <Badge variant={v === "Verified" ? "success" : "warning"}>{v}</Badge> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                    { key: "nextAction", label: "Next Step", render: (v: any) => <span className="text-[10px] text-slate-500 font-bold">{v}</span> },
                ];
            case "fr-health-score":
                return [
                    { key: "businessName", label: "Franchise", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    {
                        key: "healthScore", label: "Health Score", render: (v: any) => (
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${v}%`, background: v >= 80 ? "#10B981" : v >= 60 ? "#F59E0B" : "#EF4444" }} />
                                </div>
                                <span className="font-black text-xs">{v}%</span>
                            </div>
                        )
                    },
                    { key: "complaintRate", label: "Complaints", render: (v: any) => <span className={`font-bold ${parseFloat(v) > 3 ? "text-red-500" : "text-emerald-600"}`}>{v}</span> },
                    { key: "staffTraining", label: "Training", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "royaltyCompliance", label: "Royalty Compliance", render: (v: any) => <Badge variant={v === "100%" ? "success" : "warning"}>{v}</Badge> },
                ];
            case "fr-royalty":
                return [
                    { key: "id", label: "Invoice", render: (v: any) => <span className="font-mono text-[10px] bg-slate-50 px-1.5 py-0.5 rounded font-bold">{v}</span> },
                    { key: "franchise", label: "Franchise", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "dueDate", label: "Due Date" },
                    { key: "amount", label: "Amount", render: (v: any) => <span className="font-black">₹{v.toLocaleString()}</span> },
                    { key: "lateFee", label: "Late Fee", render: (v: any) => <span className="text-red-500 font-bold">₹{v}</span> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Overdue" ? "error" : "info"}>{v}</Badge> },
                    { key: "reminderSent", label: "Reminded On" },
                ];
            case "fr-reconciliation":
                return [
                    { key: "franchise", label: "Franchise" },
                    { key: "period", label: "Period" },
                    { key: "type", label: "Type", render: (v: any) => <Badge variant="info">{v}</Badge> },
                    { key: "reason", label: "Reason", render: (v: any) => <span className="text-[10px] font-bold text-slate-500">{v}</span> },
                    { key: "adjustment", label: "Adj", render: (v: any) => <span className={`font-black ${v > 0 ? "text-emerald-600" : "text-red-500"}`}>{v > 0 ? "+" : ""}₹{v.toLocaleString()}</span> },
                    { key: "finalAmt", label: "Final Amount", render: (v: any) => <span className="font-black">₹{v.toLocaleString()}</span> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant="success">{v}</Badge> },
                ];
            case "fr-training":
                return [
                    { key: "staff", label: "Staff", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "branch", label: "Branch" },
                    { key: "module", label: "Module" },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Certified" ? "success" : v === "Expiring Soon" ? "warning" : "error"}>{v}</Badge> },
                    { key: "score", label: "Score", render: (v: any) => <span className="font-black">{v}%</span> },
                    { key: "expiry", label: "Expiry" },
                ];
            case "fr-exit":
                return [
                    { key: "franchise", label: "Franchise", render: (v: any) => <span className="font-black text-red-600">{v}</span> },
                    { key: "requestDate", label: "Request Date" },
                    { key: "reason", label: "Reason" },
                    { key: "netRefund", label: "Refund", render: (v: any) => <span className="font-black">₹{v.toLocaleString()}</span> },
                    { key: "accessRevoked", label: "Access?", render: (v: any) => <Badge variant={v ? "error" : "neutral"}>{v ? "Revoked" : "Active"}</Badge> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                ];
            case "fr-legal":
                return [
                    { key: "franchise", label: "Franchise" },
                    { key: "docType", label: "Document Type", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "version", label: "Version" },
                    { key: "date", label: "Upload Date" },
                    { key: "file", label: "Filename", render: (v: any) => <span className="font-mono text-[9px] text-sky-600">{v}</span> },
                ];
            default:
                return [
                    { key: "businessName", label: "Franchise", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "location", label: "Location" },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                ];
        }
    };

    // ─── CONTENT RENDERER ─────────────────────────────────────────────────────
    const renderContent = () => {
        if (activeModule === "fr-dashboard") return <FranchiseDashboard onNavigate={navigate} />;

        // ── SEARCH & FILTER HEADER (Shared for generic lists) ───────────────
        const isGenericList = ["fr-recruitment", "fr-training", "fr-reconciliation", "fr-legal"].includes(activeModule);

        // ── RECRUITMENT LEAD DETAIL ───────────────────────────────────────
        if (activeModule === "fr-recruitment" && viewState === "detail" && selectedItem) {
            return (
                <DetailView
                    title={selectedItem.name}
                    subtitle={`Franchise Prospect • ${selectedItem.location}`}
                    status={selectedItem.status}
                    onBack={() => setViewState("list")}
                    tabs={["Prospect Profile", "Screening Log", "Legal & Verification"]}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    sidebarContent={
                        <div className="space-y-3">
                            <Button className="w-full text-white font-black text-[10px] uppercase tracking-widest" style={{ background: FR_BRAND }}>
                                <UserPlus size={14} className="mr-2" /> Approve Application
                            </Button>
                            <Button variant="outline" className="w-full font-black text-[10px] uppercase tracking-widest text-emerald-600 border-emerald-100">
                                <CheckCircle2 size={14} className="mr-2" /> Mark Verified
                            </Button>
                            <Button variant="outline" className="w-full font-black text-[10px] uppercase tracking-widest text-red-500 border-red-100">
                                <Trash2 size={14} className="mr-2" /> Reject Prospect
                            </Button>
                            <div className="p-4 rounded-2xl bg-slate-900 text-white">
                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Score</p>
                                <p className="text-3xl font-black">{selectedItem.screeningScore}<span className="text-xs text-slate-500">/100</span></p>
                            </div>
                        </div>
                    }
                >
                    <Card className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(selectedItem).map(([k, v]: any) => (
                                <div key={k} className="p-3 bg-slate-50 rounded-xl">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{k}</p>
                                    <p className="text-sm font-black text-slate-800">{String(v)}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </DetailView>
            );
        }

        // ── EXIT & TERMINATION DETAIL ─────────────────────────────────────
        if (activeModule === "fr-exit" && viewState === "detail" && selectedItem) {
            return (
                <DetailView
                    title={selectedItem.franchise}
                    subtitle="Franchise Termination & Exit Flow"
                    status={selectedItem.status}
                    onBack={() => setViewState("list")}
                    tabs={["Exit Checklist", "Financial Settlement", "Legal Archival"]}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    sidebarContent={
                        <div className="space-y-3">
                            {!selectedItem.accessRevoked && (
                                <Button className="w-full text-white font-black text-[10px] uppercase tracking-widest bg-red-600 hover:bg-red-700">
                                    <Lock size={14} className="mr-2" /> Revoke System Access
                                </Button>
                            )}
                            <Button variant="outline" className="w-full font-black text-[10px] uppercase tracking-widest text-slate-600">
                                <Database size={14} className="mr-2" /> Archive Data
                            </Button>
                            <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
                                <p className="text-[8px] font-black uppercase tracking-widest text-red-500 mb-1">Net Refund</p>
                                <p className="text-2xl font-black text-red-600">₹{selectedItem.netRefund?.toLocaleString()}</p>
                                <p className="text-[9px] text-red-400 font-bold">after ₹{selectedItem.deductions?.toLocaleString()} deductions</p>
                            </div>
                        </div>
                    }
                >
                    {activeTab === "Financial Settlement" ? (
                        <Card className="p-6">
                            <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                                <DollarSign size={18} className="text-teal-500" /> Settlement Ledger
                            </h4>
                            <div className="space-y-2">
                                {[
                                    { item: "Security Deposit (Refundable)", type: "Cr", amount: selectedItem.depositRefundable },
                                    { item: "Royalty Dues Deduction", type: "Dr", amount: 45000 },
                                    { item: "Inventory Repurchase Adjustment", type: "Dr", amount: 80000 },
                                    { item: "Legal/Early Exit Penalty", type: "Dr", amount: 20000 },
                                    { item: "Final Net Refund Payable", type: "Total", amount: selectedItem.netRefund },
                                ].map((step, i) => (
                                    <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${step.type === "Total" ? "bg-slate-900 text-white mt-4" : "border-slate-50 bg-slate-50/50"}`}>
                                        <span className={`text-[9px] font-black uppercase w-8 ${step.type === "Dr" ? "text-red-500" : step.type === "Cr" ? "text-emerald-500" : "text-slate-400"}`}>{step.type !== "Total" ? step.type : ""}</span>
                                        <span className={`text-sm font-bold flex-1 px-3 ${step.type === "Total" ? "text-white" : "text-slate-700"}`}>{step.item}</span>
                                        <span className="font-black">₹{step.amount?.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ) : (
                        <Card className="p-6">
                            <div className="space-y-4">
                                {[
                                    { label: "Revoke Staff Logins", status: selectedItem.accessRevoked, delay: "Instant" },
                                    { label: "Deactivate Dashboard", status: selectedItem.accessRevoked, delay: "Instant" },
                                    { label: "Archive Patient Records", status: selectedItem.dataArchived === "Completed", delay: "24-48h" },
                                    { label: "Close Royalty Ledger", status: true, delay: "Audit Needed" },
                                    { label: "Release Branding Rights", status: false, delay: "Legal" },
                                ].map(step => (
                                    <div key={step.label} className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${step.status ? "bg-emerald-500" : "bg-slate-300"}`} />
                                            <span className="text-sm font-black text-slate-700">{step.label}</span>
                                        </div>
                                        <Badge variant={step.status ? "success" : "neutral"}>{step.status ? "Done" : `Pending (${step.delay})`}</Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </DetailView>
            );
        }

        // ── ROYALTY LIST (OVERRIDES) ──────────────────────────────────────
        if (activeModule === "fr-royalty") {
            return (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black text-slate-800">Royalty Register</h2>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2 font-black text-[10px] uppercase tracking-widest text-slate-600">
                                <RefreshCcw size={14} /> Sync Sales
                            </Button>
                            <Button className="gap-2 text-white font-black text-[10px] uppercase tracking-widest" style={{ background: FR_BRAND }}>
                                <Calculator size={14} /> Calculate All
                            </Button>
                        </div>
                    </div>
                    <ListView
                        data={DATA_MAP[activeModule]}
                        columns={getColumns(activeModule)}
                        onView={(item) => navigate("fr-royalty")}
                    />
                </div>
            );
        }

        // ── GENERIC LISTS ──────────────────────────────────────────────────
        const labelMap: any = {
            "fr-onboarding": "Franchise Onboarding",
            "fr-agreements": "Agreement Vault",
            "fr-branches": "Monitoring Console",
            "fr-compliance": "Compliance Desk",
            "fr-health-score": "Network Health Score Index",
            "fr-inventory": "Supply Chain Master",
            "fr-performance": "Network Leaderboard",
            "fr-recruitment": "Franchise Selection Pipeline",
            "fr-training": "Training & Certifications",
            "fr-reconciliation": "Royalty Reconciliation Log",
            "fr-legal": "Legal Document Vault",
        };

        return (
            <ListView
                title={labelMap[activeModule] || "Module"}
                data={DATA_MAP[activeModule] || []}
                columns={getColumns(activeModule)}
                onCreate={() => setViewState("create")}
                onView={(item: any) => { setSelectedItem(item); setViewState("detail"); setActiveTab("Overview"); }}
            />
        );
    };

    // ─── LOADING SCREEN ────────────────────────────────────────────────────
    if (isAuthLoading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center text-white relative overflow-hidden" style={{ background: FR_BRAND }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center relative z-10">
                    <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                        <Building2 size={72} className="mx-auto mb-4 text-white drop-shadow-xl" />
                    </motion.div>
                    <h1 className="text-5xl font-black tracking-widest uppercase mb-1">FRANCHISE</h1>
                    <p className="text-sm font-bold opacity-70 tracking-[0.5em] uppercase mb-1">Enterprise Platform</p>
                    <div className="mt-12 flex items-center gap-2 justify-center opacity-40">
                        {[0, 150, 300].map(d => <div key={d} className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                    </div>
                </motion.div>
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
            </div>
        );
    }

    if (!user) return <Login onLogin={(name: string) => setUser({ name, role: "Network Administrator" })} />;

    return (
        <Layout
            activeModule={activeModule as any}
            setActiveModule={(id: any) => { setActiveModule(id); setViewState("list"); setActiveTab("Overview"); }}
            onLogout={() => setUser(null)}
            onBackToWorkspace={onBackToWorkspace}
            user={user}
            navigation={FRANCHISE_NAVIGATION as any}
        >
            <div className="max-w-[1600px] mx-auto">
                {renderContent()}
            </div>
        </Layout>
    );
}
