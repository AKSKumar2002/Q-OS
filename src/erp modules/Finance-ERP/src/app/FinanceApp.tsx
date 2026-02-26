
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    LayoutDashboard,
    FileText,
    Receipt,
    TrendingDown,
    History,
    Landmark,
    Briefcase,
    PieChart,
    Settings,
    Plus,
    Download,
    Filter,
    Search,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    Building2,
    Calendar,
    MoreHorizontal,
    TrendingUp,
    ShieldCheck,
    CreditCard,
    ArrowLeftRight
} from "lucide-react";

import { FINANCE_NAVIGATION, FinanceModuleId, Invoice, ChartOfAccount } from "./finance-types";
import { financeService } from "./finance-service";
import { Button } from "../../../../app/components/ui/button";
import { Card } from "../../../../app/components/ui/card";
import { Input } from "../../../../app/components/ui/input";
import { Badge } from "../../../../app/components/ui/badge";
import { Avatar } from "../../../../app/components/ui/avatar";

// ─── MAIN COMPONENT ───────────────────────────────────────────────────
interface AppProps {
    onBackToWorkspace?: () => void;
    initialUser?: { name: string; role: string } | null;
}

export default function FinanceApp({ onBackToWorkspace, initialUser }: AppProps) {
    const [activeModule, setActiveModule] = React.useState<FinanceModuleId>("fin-dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [user] = React.useState(initialUser || { name: "Admin", role: "CFO" });
    const [invoices, setInvoices] = React.useState<Invoice[]>([]);
    const [accounts, setAccounts] = React.useState<ChartOfAccount[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const loadData = async () => {
            try {
                const dbInvoices = await financeService.getInvoices();
                const dbAccounts = await financeService.getAccounts();
                setInvoices(dbInvoices);
                setAccounts(dbAccounts);
            } catch (error) {
                console.error("Finance data load error:", error);
            } finally {
                setTimeout(() => setIsLoading(false), 800);
            }
        };
        loadData();
    }, []);

    const renderContent = () => {
        if (isLoading) return <LoadingState />;

        switch (activeModule) {
            case "fin-dashboard": return <DashboardView invoices={invoices} />;
            case "fin-invoices": return <InvoicesView invoices={invoices} />;
            case "fin-accounts": return <AccountsView accounts={accounts} />;
            case "fin-projects": return <ProjectsView />;
            case "fin-settings": return <CompanyView />;
            default: return <UnderDevelopment />;
        }
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
            {/* Sidebar */}
            <motion.aside
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="bg-white border-r border-slate-200 flex flex-col h-full z-20 shadow-xl shadow-slate-200/50"
            >
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C1CE2] to-[#9D50EE] flex items-center justify-center text-white shadow-lg shadow-purple-200">
                        <Landmark size={24} />
                    </div>
                    {isSidebarOpen && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h1 className="font-black text-slate-900 leading-tight">Finance</h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise FinOS</p>
                        </motion.div>
                    )}
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                    {FINANCE_NAVIGATION.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveModule(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${activeModule === item.id
                                ? "bg-purple-50 text-[#7C1CE2] font-bold shadow-sm"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <item.icon size={20} className={activeModule === item.id ? "text-[#7C1CE2]" : "text-slate-400 group-hover:text-slate-600"} />
                            {isSidebarOpen && <span className="text-sm">{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-2xl">
                        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-[#7C1CE2] font-black">
                            {user.name.substring(0, 1)}
                        </div>
                        {isSidebarOpen && (
                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase">{user.role}</p>
                            </div>
                        )}
                        {isSidebarOpen && (
                            <button onClick={onBackToWorkspace} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-red-500 transition-colors" title="Back to Workspace">
                                <ArrowLeftRight size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2.5 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100 transition-all border border-slate-100"
                        >
                            <ChevronRight className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">
                            {FINANCE_NAVIGATION.find(n => n.id === activeModule)?.label}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group hidden md:block">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search transactions, invoices..."
                                className="pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm w-80 focus:ring-2 focus:ring-purple-100 transition-all"
                            />
                        </div>
                        <Button className="bg-[#7C1CE2] hover:bg-purple-700 text-white rounded-xl gap-2 h-11 px-6 shadow-lg shadow-purple-100 font-bold uppercase text-[10px] tracking-widest">
                            <Plus size={18} /> Create New
                        </Button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50/30">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeModule}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

// ─── DASHBOARD VIEW ───────────────────────────────────────────────────
function DashboardView({ invoices }: { invoices: Invoice[] }) {
    const totalRev = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.total_amount, 0);
    const unpaidRev = invoices.filter(i => i.status !== 'Paid' && i.status !== 'Void').reduce((sum, i) => sum + i.total_amount, 0);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Revenue" value={`₹${totalRev.toLocaleString()}`} icon={<TrendingUp />} color="emerald" />
                <StatCard label="Total Expenses" value="₹0" icon={<TrendingDown />} color="rose" />
                <StatCard label="Net Profit" value={`₹${totalRev.toLocaleString()}`} icon={<PieChart />} color="purple" />
                <StatCard label="Unpaid Receivables" value={`₹${unpaidRev.toLocaleString()}`} icon={<Wallet />} color="blue" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="p-8 lg:col-span-2 border-slate-100 shadow-xl shadow-slate-200/30 rounded-3xl bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 opacity-50" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Revenue vs Expenses</h3>
                                <p className="text-sm text-slate-400 font-medium tracking-tight">Monthly financial performance overview</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 px-3 py-1 font-black text-[10px]">REVENUE</Badge>
                                <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-100 px-3 py-1 font-black text-[10px]">EXPENSES</Badge>
                            </div>
                        </div>
                        <div className="h-[300px] w-full bg-slate-50 rounded-2xl flex items-center justify-center border border-dashed border-slate-200 group">
                            <div className="text-center group-hover:scale-110 transition-transform">
                                <PieChart size={48} className="text-slate-200 mx-auto mb-2" />
                                <p className="text-sm font-black text-slate-300 uppercase tracking-widest italic">Chart Rendering Engine</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-8 border-slate-100 shadow-xl shadow-slate-200/30 rounded-3xl bg-white flex flex-col">
                    <h3 className="text-lg font-black text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                        <History size={18} className="text-purple-500" /> Recent Invoices
                    </h3>
                    <div className="flex-1 space-y-4">
                        {invoices.length === 0 ? (
                            <div className="py-8"><EmptyDataState title="No Invoices" message="No invoices generated yet." icon={Receipt} /></div>
                        ) : (
                            invoices.slice(0, 5).map(inv => (
                                <div key={inv.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#7C1CE2] font-black text-xs">INV</div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 truncate max-w-[120px]">{inv.client_name}</p>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{inv.invoice_number} • {inv.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900">₹{inv.total_amount.toLocaleString()}</p>
                                        <Badge className={inv.status === 'Paid' ? 'bg-emerald-500 font-black text-[8px]' : 'bg-orange-500 font-black text-[8px]'}>{inv.status}</Badge>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <Button variant="outline" className="mt-8 w-full rounded-2xl border-slate-100 font-black uppercase text-[10px] tracking-widest py-6 hover:bg-slate-50 transition-all group">
                        View All Invoices <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-8 border-slate-100 shadow-xl shadow-slate-200/30 rounded-[2.5rem] bg-white">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <Building2 className="text-blue-500" /> Company Handling
                        </h3>
                        <Button variant="ghost" className="text-[10px] font-black text-blue-600 hover:bg-blue-50 uppercase tracking-widest px-4">Manage Entities</Button>
                    </div>
                    <div className="space-y-4">
                        <EmptyDataState title="No Entities Linked" message="You haven't linked any legal entities to this group yet." icon={Building2} />
                    </div>
                </Card>

                <Card className="p-8 border-slate-100 shadow-xl shadow-slate-200/30 rounded-[2.5rem] bg-white">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <Briefcase className="text-purple-500" /> Project Profitability
                        </h3>
                        <Button variant="ghost" className="text-[10px] font-black text-purple-600 hover:bg-purple-50 uppercase tracking-widest px-4">Detailed Analytics</Button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: "Global Cloud Migration", budget: "₹1.2Cr", margin: "34%", health: "On Track" },
                            { name: "FinTech App V2", budget: "₹45L", margin: "22%", health: "Risk" }
                        ].map((p, i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-3xl transition-all border border-transparent hover:border-slate-100">
                                <div>
                                    <p className="text-sm font-black text-slate-900 truncate max-w-[150px]">{p.name}</p>
                                    <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase">BUDGET: {p.budget}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-emerald-600 mb-1">{p.margin} Margin</p>
                                    <Badge className={p.health === 'Risk' ? 'bg-rose-500 font-black text-[8px]' : 'bg-[#7C1CE2] font-black text-[8px]'}>{p.health}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}

// ─── INVOICES VIEW ────────────────────────────────────────────────────
function InvoicesView({ invoices }: { invoices: Invoice[] }) {
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20">
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl gap-2 h-11 px-5 font-black uppercase text-[10px] tracking-widest border-slate-100 hover:bg-slate-50 transition-all">
                        <Filter size={16} /> Advanced Filters
                    </Button>
                    <Button variant="outline" className="rounded-xl gap-2 h-11 px-5 font-black uppercase text-[10px] tracking-widest border-slate-100 hover:bg-slate-50 transition-all">
                        <Download size={16} /> Bulk Export
                    </Button>
                </div>
                <div className="flex items-center gap-8">
                    <div className="text-right border-r border-slate-100 pr-8">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Unpaid Receivables</p>
                        <p className="text-2xl font-black text-slate-900">₹14.25L</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Received This Month</p>
                        <p className="text-2xl font-black text-emerald-600">₹28.40L</p>
                    </div>
                </div>
            </div>

            <Card className="border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden rounded-[3rem] bg-white border-none">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100/50">
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
                            <th className="px-10 py-6">Invoice & Reference</th>
                            <th className="px-10 py-6">Entity / Customer</th>
                            <th className="px-10 py-6">Fiscal Timeline</th>
                            <th className="px-10 py-6">Valuation</th>
                            <th className="px-10 py-6">Execution Phase</th>
                            <th className="px-10 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {invoices.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-16">
                                    <EmptyDataState title="Empty Receivables" message="No invoices generated or found in the database." icon={FileText} />
                                </td>
                            </tr>
                        ) : (
                            invoices.map(inv => (
                                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors cursor-pointer group">
                                    <td className="px-10 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-900 text-sm group-hover:text-[#7C1CE2] transition-colors">{inv.invoice_number}</span>
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter mt-1">REF: PROJ_{inv.project_id?.toUpperCase() || 'GENERAL'}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6">
                                        <p className="font-black text-slate-800 text-sm">{inv.client_name}</p>
                                    </td>
                                    <td className="px-10 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-slate-800 tracking-tight">{inv.date}</span>
                                            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mt-1 italic">DUE: {inv.due_date}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6">
                                        <span className="font-black text-slate-900 text-lg">₹{inv.total_amount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-10 py-6 text-center">
                                        <Badge className={`${inv.status === 'Paid' ? 'bg-emerald-500 bg-opacity-10 text-emerald-600 border border-emerald-200' : 'bg-orange-500 bg-opacity-10 text-orange-600 border border-orange-200'} font-black text-[9px] uppercase tracking-widest py-1.5 px-4 rounded-full shadow-none`}>
                                            {inv.status}
                                        </Badge>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <button className="p-3 hover:bg-white rounded-2xl text-slate-400 transition-all border border-transparent hover:border-slate-100 hover:shadow-sm">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}

// ─── ACCOUNTS VIEW ────────────────────────────────────────────────────
function AccountsView({ accounts }: { accounts: ChartOfAccount[] }) {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Chart of Accounts</h2>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mt-1">Full Ledger Control Panel</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl border-slate-100 h-12 px-8 font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                        Reconcile Bank Statements
                    </Button>
                    <Button className="bg-[#71639E] hover:bg-slate-900 text-white rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-purple-100 transition-all">
                        Create New Ledger
                    </Button>
                </div>
            </div>

            <div className={`grid grid-cols-1 ${accounts.length > 0 ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-8 pb-12`}>
                {accounts.length === 0 ? (
                    <EmptyDataState title="Clean Ledger" message="No Chart of Accounts mapped yet." icon={Landmark} />
                ) : (
                    accounts.map(acc => (
                        <Card key={acc.id} className="p-8 border-none hover:shadow-2xl hover:shadow-purple-100 transition-all group cursor-pointer relative overflow-hidden bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/30">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50/50 rounded-bl-full -mr-16 -mt-16 transition-all group-hover:scale-125 group-hover:bg-purple-50" />
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`p-4 rounded-3xl shadow-sm ${acc.type === 'Asset' ? 'bg-emerald-50 text-emerald-600' :
                                        acc.type === 'Liability' ? 'bg-rose-50 text-rose-600' :
                                            acc.type === 'Income' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'
                                        }`}>
                                        <Landmark size={28} />
                                    </div>
                                    <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] mt-2">{acc.code}</span>
                                </div>
                                <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-[#7C1CE2] transition-colors">{acc.name}</h4>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10">{acc.category}</p>

                                <div className="mt-auto pt-6 border-t border-slate-50 flex items-end justify-between">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 opacity-60">Carried Balance</p>
                                        <p className="text-3xl font-black text-slate-900 tracking-tight">
                                            <span className="text-sm font-bold text-slate-300 mr-1.5 uppercase tracking-tighter">{acc.currency}</span>
                                            {acc.balance.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-purple-100 transition-colors">
                                        <ArrowUpRight size={22} className="text-slate-300 group-hover:text-[#7C1CE2] transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

// ─── PROJECTS VIEW ────────────────────────────────────────────────────
function ProjectsView() {
    const projects: any[] = [];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Project Profitability</h2>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mt-1">Resource & Cost Analysis</p>
                </div>
                <Button className="bg-[#7C1CE2] text-white rounded-2xl gap-2 h-12 px-8 font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-purple-100">
                    <Plus size={18} /> New Project Budget
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-8 pb-12">
                {projects.length === 0 ? (
                    <EmptyDataState title="No Active Projects" message="You haven't allocated budgets for any active projects." icon={Briefcase} />
                ) : (
                    projects.map(p => (
                        <Card key={p.id} className="p-10 border-none hover:shadow-[0_20px_60px_-15px_rgba(124,28,226,0.15)] transition-all rounded-[3.5rem] bg-white group shadow-xl shadow-slate-200/20 relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-2 group-hover:w-4 transition-all duration-500" style={{ backgroundColor: p.status === 'Overbudget' ? '#EF4444' : '#7C1CE2' }} />

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
                                <div className="lg:col-span-1 border-r border-slate-50 pr-10 flex flex-col justify-center">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] mb-3 leading-none italic">#ENTITY_REF_{p.id}</p>
                                    <h4 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-[#7C1CE2] transition-colors leading-tight">{p.name}</h4>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-tight">{p.client}</p>
                                    <div className="mt-8 flex gap-2">
                                        <Badge className={`px-5 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest ${p.status === 'Overbudget' ? 'bg-rose-500 shadow-lg shadow-rose-100' : 'bg-[#7C1CE2] shadow-lg shadow-purple-100'}`}>{p.status}</Badge>
                                        <Badge variant="outline" className="border-slate-100 text-slate-400 font-black text-[9px] uppercase tracking-widest">LIVE TRACK</Badge>
                                    </div>
                                </div>

                                <div className="lg:col-span-2 flex flex-col justify-center px-6">
                                    <div className="flex justify-between mb-4">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] font-mono">FINANCIAL_UTILIZATION</span>
                                        <span className="text-sm font-black text-slate-900 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{((p.spent / p.budget) * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden mb-8 border border-slate-100 p-0.5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(p.spent / p.budget) * 100}%` }}
                                            className={`h-full rounded-full flex items-center justify-end pr-2 transition-all duration-1000 ${p.spent > p.budget * 0.9 ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-lg shadow-rose-100' : 'bg-gradient-to-r from-[#7C1CE2] to-[#9D50EE] shadow-lg shadow-purple-100'}`}
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                                        </motion.div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm group-hover:border-purple-100 transition-colors">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                                <TrendingUp size={12} className="text-emerald-500" /> B_ALLOCATED
                                            </p>
                                            <p className="text-xl font-black text-slate-900 tracking-tight">₹{p.budget.toLocaleString()}</p>
                                        </div>
                                        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm group-hover:border-rose-100 transition-colors">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                                <TrendingDown size={12} className="text-rose-500" /> C_ACTUALS
                                            </p>
                                            <p className="text-xl font-black text-slate-900 tracking-tight font-mono text-rose-500">₹{p.spent.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-1 flex flex-col items-center justify-center text-center bg-slate-50/50 rounded-[3rem] p-8 border border-slate-100/50 group-hover:bg-white transition-all transform group-hover:scale-[1.02]">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] mb-4">Projected Profitability</p>
                                    <div className={`text-6xl font-black mb-2 tracking-tighter ${p.spent > p.budget ? 'text-rose-500' : 'text-emerald-600'}`}>
                                        {(((p.budget - p.spent) / p.budget) * 100).toFixed(0)}%
                                    </div>
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-4 py-1.5 rounded-full">NET_ENTITY_MARGIN</p>
                                    <Button variant="ghost" className="mt-8 text-[11px] font-black text-[#7C1CE2] uppercase tracking-[0.3em] gap-2 group/btn">
                                        Full Ledger Trace <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

// ─── COMPANY VIEW ─────────────────────────────────────────────────────
function CompanyView() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Company Handling</h2>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mt-1">Multi-entity & Legal Control Nodes</p>
                </div>
                <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl gap-3 h-12 px-8 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-slate-200">
                    <Plus size={18} /> Link Legal Entity
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-12">
                <Card className="p-10 lg:col-span-2 border-none shadow-2xl shadow-slate-200/40 rounded-[3.5rem] bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full -mr-48 -mt-48 opacity-30" />
                    <h3 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-4 relative z-10">
                        <div className="w-8 h-8 rounded-xl bg-[#7C1CE2]/10 flex items-center justify-center">
                            <Building2 size={20} className="text-[#7C1CE2]" />
                        </div>
                        Active Legal Entities
                    </h3>
                    <div className="space-y-8 relative z-10">
                        <EmptyDataState title="Clean Entity Architecture" message="No subsidiaries or branches linked." icon={Building2} />
                    </div>
                </Card>

                <div className="space-y-8">
                    <Card className="p-10 border-none shadow-2xl shadow-purple-100/50 rounded-[3.5rem] bg-[#7C1CE2] text-white relative overflow-hidden group">
                        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-tl-full transition-all group-hover:scale-110" />
                        <h3 className="text-xl font-black mb-8 flex items-center gap-4 relative z-10">
                            <ShieldCheck className="text-purple-200" size={24} /> Fiscal Policy
                        </h3>
                        <div className="space-y-8 relative z-10">
                            <div>
                                <p className="text-[10px] font-black text-purple-200 uppercase tracking-[0.3em] mb-2 leading-none italic font-mono">ACCOUNTING_LOGIC</p>
                                <p className="text-lg font-black tracking-tight uppercase">Accrual Basis Accounting</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-purple-200 uppercase tracking-[0.3em] mb-2 leading-none italic font-mono">TAX_COMPLIANCE</p>
                                <p className="text-lg font-black tracking-tight leading-relaxed uppercase">VAT 5.0% <span className="text-purple-300 text-xs mx-2">|</span> GST 18.0%</p>
                            </div>
                            <div className="p-6 bg-white/10 rounded-[2rem] border border-white/20 backdrop-blur-sm">
                                <p className="text-[9px] font-black text-purple-200 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                    <TrendingUp size={12} /> AUTOMATED_FIN_RULES
                                </p>
                                <ul className="text-[11px] font-black uppercase tracking-widest space-y-3 opacity-90">
                                    <li className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        Auto_Project_Billing
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
                                        Intercompany_Recon
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
                                        FX_Realtime_Update
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-10 border-none shadow-2xl shadow-slate-200/40 rounded-[3.5rem] bg-white group border-t-4 border-slate-50 transition-all hover:-translate-y-1">
                        <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Audit Reporting</h3>
                        <p className="text-xs text-slate-400 font-bold mb-8 uppercase tracking-tighter opacity-70">Consolidated Financial Control Board</p>
                        <div className="grid grid-cols-1 gap-4">
                            <Button variant="outline" className="justify-start gap-4 h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] border-slate-100 group/item transition-all hover:bg-slate-50">
                                <Download size={18} className="text-slate-300 group-hover/item:text-[#7C1CE2] transition-colors" /> Balance Sheet
                            </Button>
                            <Button variant="outline" className="justify-start gap-4 h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] border-slate-100 group/item transition-all hover:bg-slate-50">
                                <Download size={18} className="text-slate-300 group-hover/item:text-[#7C1CE2] transition-colors" /> P&L Statement
                            </Button>
                            <Button variant="outline" className="justify-start gap-4 h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] border-slate-100 text-[#7C1CE2] border-purple-100 hover:bg-purple-50 group/item transition-all shadow-lg shadow-purple-50">
                                <Download size={18} className="text-[#7C1CE2] group-hover/item:rotate-12 transition-transform" /> Primary Audit Log
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// ─── HELPER COMPONENTS ───────────────────────────────────────────────
function EmptyDataState({ title, message, icon: Icon }: any) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-[3rem] bg-slate-50 border border-slate-100/50 col-span-full">
            <div className="w-20 h-20 bg-white shadow-xl shadow-purple-100 rounded-[2rem] flex items-center justify-center mb-6">
                <Icon size={32} className="text-[#7C1CE2]" />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
            <p className="text-sm font-bold text-slate-400 mt-2 max-w-sm mx-auto">{message}</p>
        </div>
    );
}

function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl bg-[#7C1CE2] flex items-center justify-center text-white shadow-2xl shadow-purple-200 mb-8"
            >
                <Landmark size={32} />
            </motion.div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Initializing Finance</h3>
            <p className="text-sm font-black text-slate-300 uppercase tracking-[0.4em] mt-2">Connecting to Financial Cloud Hub</p>
            <div className="mt-8 flex gap-2">
                {[0, 1, 2].map(i => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full bg-[#7C1CE2]"
                    />
                ))}
            </div>
        </div>
    );
}

function UnderDevelopment() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center mb-6 border border-slate-200 border-dashed animate-pulse">
                <Settings size={48} className="text-slate-300 rotate-180" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Feature Node Locked</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2 max-w-[300px] leading-relaxed">
                Our engineering team is finalizing the secure blockchain integration for this module.
            </p>
            <Button className="mt-8 bg-slate-900 text-white rounded-xl h-11 px-8 font-black uppercase text-[10px] tracking-widest">
                Priority Notification
            </Button>
        </div>
    );
}

function StatCard({ label, value, icon, color, trend }: any) {
    const colors: any = {
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100/50",
        rose: "bg-rose-50 text-rose-600 border-rose-100 shadow-rose-100/50",
        purple: "bg-purple-50 text-[#7C1CE2] border-purple-100 shadow-purple-100/50",
        blue: "bg-blue-50 text-blue-600 border-blue-100 shadow-blue-100/50",
    };

    return (
        <Card className={`p-8 border-none shadow-xl rounded-[2rem] ${colors[color]} relative overflow-hidden group transition-all hover:scale-[1.03] hover:shadow-2xl`}>
            <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:scale-125 group-hover:opacity-10 transition-all text-current">
                {React.cloneElement(icon, { size: 140 })}
            </div>
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 italic font-mono">{label}</span>
                    <div className="p-3 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
                        {React.cloneElement(icon, { size: 20 })}
                    </div>
                </div>
                <div className="flex flex-col mt-auto gap-1">
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h3>
                        {trend && (
                            <div className={`text-[10px] font-black px-2 py-0.5 rounded-full ${trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                                {trend}
                            </div>
                        )}
                    </div>
                    <p className="text-[9px] font-semibold opacity-40 uppercase tracking-widest mt-1">Updated 2 minutes ago</p>
                </div>
            </div>
        </Card>
    );
}
