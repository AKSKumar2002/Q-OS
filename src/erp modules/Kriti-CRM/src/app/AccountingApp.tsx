import * as React from "react";
import { motion } from "motion/react";
import { Layout } from "./components/layout";
import { AccountingModuleId, ACCOUNTING_NAVIGATION, ACCOUNTING_DB } from "./accounting-types";
import { AccountingDashboard } from "./components/accounting-dashboard";
import { ListView, FormView, DetailView } from "./components/module-views";
import { Badge, Input, Label, Card, Button, Avatar } from "./components/ui";
import { Login } from "./components/login";
import {
    LayoutDashboard, PieChart, Landmark, Library, FileText, Receipt,
    Scale, Building, Settings, ShieldCheck, History, Monitor,
    Lock, ArrowUpRight, ArrowDownRight, Database, Wallet, Plus,
    ChevronLeft, CheckCircle2, UserCircle2, Landmark as BankIcon,
    BarChart3, RefreshCcw, Download, Banknote, GitCompare, Repeat,
    ClipboardList, ShieldAlert, Layers as DeptIcon, RefreshCw
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────
interface AppProps {
    onBackToWorkspace?: () => void;
    initialUser?: { name: string; role: string } | null;
    skipLoader?: boolean;
}

const BRAND = "#00A09D"; // Emerald / Teal

export default function AccountingApp({ onBackToWorkspace, initialUser, skipLoader = false }: AppProps) {
    const [activeModule, setActiveModule] = React.useState<AccountingModuleId>("acc-dashboard");
    const [viewState, setViewState] = React.useState<"list" | "create" | "detail">("list");
    const [selectedItem, setSelectedItem] = React.useState<any>(null);
    const [activeTab, setActiveTab] = React.useState("Overview");

    // ── Auth ──
    const [user, setUser] = React.useState<{ name: string; role: string } | null>(initialUser || null);
    const [isAuthLoading, setIsAuthLoading] = React.useState(!skipLoader);

    React.useEffect(() => {
        if (!initialUser) {
            const saved = localStorage.getItem("acc_user");
            if (saved) setUser(JSON.parse(saved));
        }
        if (!skipLoader) {
            setTimeout(() => setIsAuthLoading(false), 2000);
        }
    }, [initialUser, skipLoader]);

    const handleLogin = (username: string) => {
        const u = { name: username, role: "Chief Accountant" };
        setUser(u);
        localStorage.setItem("acc_user", JSON.stringify(u));
    };
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("acc_user");
    };

    const navigate = (id: AccountingModuleId) => {
        setActiveModule(id);
        setViewState("list");
    };

    // ─────────────────────────────────────────────────────────────────
    //  DATA MAP (Enterprise Expanded)
    // ─────────────────────────────────────────────────────────────────
    const DATA_MAP: Record<string, any[]> = {
        "acc-chart-of-accounts": ACCOUNTING_DB.accounts,
        "acc-journal-entries": ACCOUNTING_DB.journalEntries,
        "acc-receivables": ACCOUNTING_DB.receivables,
        "acc-payables": ACCOUNTING_DB.payables,
        "acc-expenses": ACCOUNTING_DB.expenses,
        "acc-fixed-assets": ACCOUNTING_DB.fixedAssets,
        "acc-cost-centers": ACCOUNTING_DB.costCenters,
        "acc-inter-branch": ACCOUNTING_DB.branchPerformance,
        "acc-insurance": ACCOUNTING_DB.insurance,
        "acc-audit-trail": ACCOUNTING_DB.auditLogs,
        "acc-credit-debit": ACCOUNTING_DB.creditDebit,
    };

    // ─────────────────────────────────────────────────────────────────
    //  COLUMN DEFINITIONS
    // ─────────────────────────────────────────────────────────────────
    const getColumns = (module: AccountingModuleId): any[] => {
        switch (module) {
            case "acc-chart-of-accounts":
                return [
                    { key: "code", label: "Account Code", render: (v: any) => <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded">{v}</span> },
                    { key: "name", label: "Account Name", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "category", label: "Category", render: (v: any) => <Badge variant={v === 'Assets' ? 'success' : v === 'Liabilities' ? 'error' : 'info'}>{v}</Badge> },
                    { key: "subCategory", label: "Group" },
                    { key: "balance", label: "Current Balance", render: (v: any) => <span className="font-black">₹{v.toLocaleString()}</span> },
                ];

            case "acc-journal-entries":
                return [
                    { key: "date", label: "Date" },
                    { key: "id", label: "Entry ID", render: (v: any) => <span className="text-[10px] font-bold text-teal-600">{v}</span> },
                    { key: "description", label: "Memo / Narration", render: (v: any) => <span className="text-xs text-slate-600 font-medium">{v}</span> },
                    { key: "amount", label: "Value", render: (v: any) => <span className="font-black">₹{v.toLocaleString()}</span> },
                    { key: "branch", label: "Branch Context", render: (v: any) => <Badge variant="info">{v}</Badge> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === 'Posted' ? 'success' : 'warning'}>{v}</Badge> },
                ];

            case "acc-audit-trail":
                return [
                    { key: "timestamp", label: "Timestamp", render: (v: any) => <span className="text-[10px] text-slate-400 font-mono">{v}</span> },
                    { key: "user", label: "Actor", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                    { key: "action", label: "Action Event", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "impact", label: "Financial Impact", render: (v: any) => <span className="font-black text-emerald-600 font-mono text-[11px]">{v}</span> },
                ];

            case "acc-cost-centers":
                return [
                    { key: "name", label: "Center (Dept/Doc)", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "revenue", label: "Captured Revenue", render: (v: any) => <span>₹{v.toLocaleString()}</span> },
                    { key: "cost", label: "Direct Cost", render: (v: any) => <span className="text-red-500">₹{v.toLocaleString()}</span> },
                    { key: "margin", label: "Operating Margin", render: (v: any) => <Badge variant="success">{v}</Badge> },
                ];

            case "acc-insurance":
                return [
                    { key: "tpa", label: "Third Party Admin (TPA)", render: (v: any) => <span className="font-bold bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg text-xs">{v}</span> },
                    { key: "amount", label: "Claim Value", render: (v: any) => <span className="font-black">₹{v.toLocaleString()}</span> },
                    { key: "aging", label: "Claim Age", render: (v: any) => <span className="text-[10px] font-bold text-slate-400">{v}</span> },
                    { key: "status", label: "Settlement Phase", render: (v: any) => <Badge variant={v === 'Disputed' ? 'error' : 'warning'}>{v}</Badge> },
                ];

            case "acc-credit-debit":
                return [
                    { key: "date", label: "Date" },
                    { key: "type", label: "Document Type", render: (v: any) => <Badge variant={v.includes('Credit') ? 'success' : 'error'}>{v}</Badge> },
                    { key: "entity", label: "Patient / Vendor", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "amount", label: "Adjustment Value", render: (v: any) => <span className="font-black">₹{v.toLocaleString()}</span> },
                    { key: "reason", label: "Correction Reason", render: (v: any) => <span className="text-xs opacity-60 italic">"{v}"</span> },
                ];

            default:
                return [
                    { key: "id", label: "ID" },
                    { key: "name", label: "Name" },
                ];
        }
    };

    const renderContent = () => {
        if (activeModule === "acc-dashboard") {
            return <AccountingDashboard onNavigate={navigate} />;
        }

        if (activeModule === "acc-chart-of-accounts") {
            const categories = ["Assets", "Liabilities", "Income", "Expenses"];
            return (
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Enterprise Chart of Accounts</h2>
                            <p className="text-sm text-slate-400 font-medium">Categorized General Ledger hierarchy with real-time sub-balancing.</p>
                        </div>
                        <Button className="bg-[#00A09D] text-white gap-2 rounded-2xl h-12 shadow-xl shadow-teal-50"><Plus size={18} /> New Ledger Account</Button>
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                        {categories.map(cat => (
                            <div key={cat} className="space-y-3">
                                <div className="flex items-center justify-between px-2 border-b border-slate-100 pb-2">
                                    <h3 className={`text-xs font-black uppercase tracking-[0.2em] ${cat === 'Assets' ? 'text-emerald-600' : cat === 'Liabilities' ? 'text-red-600' : cat === 'Income' ? 'text-teal-600' : 'text-slate-600'}`}>{cat}</h3>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sub-total: ₹{(ACCOUNTING_DB.accounts.filter(a => a.category === cat).reduce((sum, a) => sum + a.balance, 0)).toLocaleString()}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {ACCOUNTING_DB.accounts.filter(a => a.category === cat).map(acc => (
                                        <Card key={acc.code} className="p-5 border-slate-100 hover:border-teal-300 transition-all group cursor-pointer hover:shadow-lg hover:shadow-teal-50/50 relative overflow-hidden">
                                            <div className="flex items-start justify-between relative z-10">
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">{acc.code}</span>
                                                    <span className="text-sm font-black text-slate-800 leading-tight group-hover:text-teal-600 transition-colors">{acc.name}</span>
                                                    <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{acc.subCategory}</span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-black text-slate-800">₹{acc.balance.toLocaleString()}</p>
                                                    <div className="flex justify-end mt-2 h-1.5 w-1.5 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity translate-x-1" />
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (activeModule === "acc-inter-branch") {
            return (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-slate-800">Branch & Entity Consolidation</h2>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-tight mt-1">Multi-tenant financial reconciliation • Inter-branch balancing</p>
                        </div>
                        <Button className="bg-slate-900 text-white gap-2"><Download size={16} /> Consolidated P&L</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ACCOUNTING_DB.branchPerformance.map(branch => (
                            <Card key={branch.id} className="p-6 hover:border-teal-500 transition-colors">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center font-black text-teal-600">{branch.id}</div>
                                    <h4 className="font-black text-slate-800 uppercase tracking-tight">{branch.name}</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-xs">
                                        <span className="font-bold text-slate-400 uppercase tracking-widest">Revenue</span>
                                        <span className="font-black text-slate-800">₹{branch.revenue.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="font-bold text-slate-400 uppercase tracking-widest">Expenses</span>
                                        <span className="font-black text-red-500">₹{branch.expenses.toLocaleString()}</span>
                                    </div>
                                    <div className="h-px bg-slate-50 w-full" />
                                    <div className="flex justify-between text-sm">
                                        <span className="font-black text-slate-800 uppercase tracking-widest">Net Profit</span>
                                        <span className="font-black text-emerald-600">₹{branch.profit.toLocaleString()}</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <Card className="p-6 bg-slate-50 border-dashed border-2">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-white rounded-2xl shadow-sm"><GitCompare className="text-indigo-600" /></div>
                            <div>
                                <h3 className="font-black text-slate-800">Pending Inter-branch Settlement</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase">Main Hospital ➔ Satellite Clinic (Stock Transfer: Opticals)</p>
                            </div>
                            <Button size="sm" className="ml-auto bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest px-6 h-9 rounded-xl">Reconcile Settlement</Button>
                        </div>
                    </Card>
                </div>
            );
        }

        if (viewState === "create") {
            const isJournal = activeModule === "acc-journal-entries";
            return (
                <FormView title={activeModule.replace('acc-', '')} onCancel={() => setViewState("list")} onSave={() => setViewState("list")}>
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <Label>Narration / Description</Label>
                            <Input placeholder="Enter financial justification..." className="h-12 text-sm font-bold" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5"><Label>Debit Account</Label><Input placeholder="Search Ledger..." /></div>
                            <div className="space-y-1.5"><Label>Credit Account</Label><Input placeholder="Search Ledger..." /></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1.5"><Label>Amount (INR)</Label><Input type="number" placeholder="0.00" className="font-mono" /></div>
                            <div className="space-y-1.5"><Label>Branch Context</Label><Input placeholder="Select Branch" /></div>
                            <div className="space-y-1.5"><Label>Effective Date</Label><Input type="date" /></div>
                        </div>

                        <div className="space-y-1.5"><Label>Cost Center (Optional)</Label><Input placeholder="Tag Dept / Doctor / Campaign" /></div>

                        <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100/50 flex items-start gap-4">
                            <ShieldCheck size={20} className="text-teal-600 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-[10px] font-black text-teal-800 uppercase tracking-tighter">Double-Entry Validation Active</p>
                                <p className="text-[9px] font-bold text-teal-600/80 uppercase tracking-tighter mt-1">
                                    Creating this entry will automatically update the selected ledgers and log a permanent trace in the Financial Audit Log.
                                </p>
                            </div>
                        </div>
                    </div>
                </FormView>
            );
        }

        if (viewState === "detail") {
            return (
                <DetailView
                    title={selectedItem?.name || selectedItem?.description || selectedItem?.action || "Record Snapshot"}
                    onBack={() => setViewState("list")}
                    tabs={["Financial View", "Audit Trace", "Source Docs"]}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    sidebarContent={
                        <div className="space-y-4">
                            <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Signature</h4>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center font-black text-teal-600 text-xs shadow-sm">SA</div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800">{selectedItem?.createdBy || user?.name}</p>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase">Authorized Actor</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Button className="w-full bg-[#00A09D] hover:bg-teal-600 text-white text-[10px] font-black uppercase tracking-[0.2em] h-10 shadow-lg shadow-teal-50/50">
                                    Freeze Transaction
                                </Button>
                                <Button variant="outline" className="w-full text-[10px] font-black uppercase tracking-[0.2em] h-10 border-red-100 text-red-500 hover:bg-red-50">
                                    Reverse & Refund
                                </Button>
                            </div>
                        </div>
                    }
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="p-6 lg:col-span-2 shadow-sm border-slate-100">
                            <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2 lowercase">
                                <FileText size={18} className="text-teal-500" /> core entry dossier
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(selectedItem || {}).map(([k, v]: any) => (
                                    <div key={k} className="flex flex-col p-3 bg-slate-50/50 rounded-2xl border border-slate-50">
                                        <span className="text-[10px] uppercase font-black text-slate-300 tracking-widest mb-1">{k}</span>
                                        <span className="text-sm font-black text-slate-800">{String(v)}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <div className="space-y-6">
                            <div className="bg-slate-900 rounded-3xl p-6 text-white relative h-full flex flex-col items-center justify-center text-center group">
                                <Database size={100} className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity rotate-12" />
                                <div className="p-4 bg-teal-500/20 rounded-full mb-6">
                                    <ShieldCheck size={40} className="text-teal-400" />
                                </div>
                                <h3 className="text-xs font-bold text-teal-400 uppercase tracking-[0.2em] mb-4">Ledger Trace Verified</h3>
                                <p className="text-[10px] font-medium opacity-50 uppercase leading-relaxed max-w-[180px]">
                                    Source integrity hash confirmed. This record is immutable and linked to the Primary Financial Node.
                                </p>
                                <button className="mt-8 border border-white/20 hover:bg-white/10 w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors font-mono"> audit_seq#88219 </button>
                            </div>
                        </div>
                    </div>
                </DetailView>
            );
        }

        const labelMap: any = {
            "acc-chart-of-accounts": "Master Chart of Accounts",
            "acc-journal-entries": "General Ledger Journals",
            "acc-receivables": "Aging Analysis (Patient AR)",
            "acc-payables": "Vendor Payables (AP Control)",
            "acc-expenses": "Corporate Expense Claims",
            "acc-fixed-assets": "Asset Depreciation Board",
            "acc-budgeting": "Budget vs Burn Analysis",
            "acc-settings": "Financial Year & Policy",
            "acc-cost-centers": "Profitability Centers (Dept/Doc)",
            "acc-inter-branch": "Multi-Branch Consolidation",
            "acc-insurance": "Insurance (TPA) Receivables",
            "acc-audit-trail": "Full Audit Trace Ledger",
            "acc-credit-debit": "Refunds & Adjustments (Notes)",
        };

        return (
            <ListView
                title={labelMap[activeModule] || "Accounting View"}
                data={DATA_MAP[activeModule] || []}
                columns={getColumns(activeModule)}
                onCreate={() => setViewState("create")}
                onView={(item: any) => { setSelectedItem(item); setViewState("detail"); }}
            />
        );
    };

    if (isAuthLoading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#00A09D] text-white relative overflow-hidden">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Banknote size={72} className="mx-auto mb-4 text-white drop-shadow-xl" />
                    </motion.div>
                    <h1 className="text-5xl font-black tracking-widest uppercase mb-1">ACCOUNTING</h1>
                    <p className="text-sm font-bold opacity-70 tracking-[0.6em] uppercase">Enterprise Financial OS</p>
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
            navigation={ACCOUNTING_NAVIGATION as any}
        >
            {renderContent()}
        </Layout>
    );
}
