import * as React from "react";
import { motion } from "motion/react";
import { Layout } from "./components/layout";
import { SalesModuleId, SALES_NAVIGATION, SALES_DB, SALES_BRAND } from "./sales-types";
import { SalesDashboard } from "./components/sales-dashboard";
import { SalesPOS } from "./components/sales-pos";
import { ListView, FormView, DetailView } from "./components/module-views";
import { Badge, Input, Label, Card, Button } from "./components/ui";
import { Login } from "./components/login";
import {
    ShoppingBag, FileText, Receipt, CreditCard, RefreshCcw, Award,
    Target, BarChart3, Settings, Download, CheckCircle2, ShieldCheck,
    Banknote, Users, Package, Zap, ChevronRight, History, ShieldAlert,
    AlertTriangle, Radio, TrendingUp, BookOpen, Layers, Clock, Bell,
    MapPin, Globe, Eye
} from "lucide-react";

interface SalesAppProps {
    onBackToWorkspace?: () => void;
    initialUser?: { name: string; role: string } | null;
    skipLoader?: boolean;
}

export default function SalesApp({ onBackToWorkspace, initialUser, skipLoader = false }: SalesAppProps) {
    const [activeModule, setActiveModule] = React.useState<SalesModuleId>("sales-dashboard");
    const [viewState, setViewState] = React.useState<"list" | "create" | "detail">("list");
    const [selectedItem, setSelectedItem] = React.useState<any>(null);
    const [activeTab, setActiveTab] = React.useState("Overview");
    const [showPOS, setShowPOS] = React.useState(false);

    const [user, setUser] = React.useState<{ name: string; role: string } | null>(initialUser || null);
    const [isAuthLoading, setIsAuthLoading] = React.useState(!skipLoader && !initialUser);

    React.useEffect(() => {
        if (!initialUser) {
            const saved = localStorage.getItem("alphery_user");
            if (saved) setUser(JSON.parse(saved));
        }
        if (!skipLoader && !initialUser) {
            setTimeout(() => setIsAuthLoading(false), 2200);
        }
    }, []);

    const navigate = (id: SalesModuleId) => {
        if (id === "sales-pos") { setShowPOS(true); return; }
        setActiveModule(id);
        setViewState("list");
        setActiveTab("Overview");
    };

    // ─── DATA MAP ────────────────────────────────────────────────────────
    const DATA_MAP: Record<string, any[]> = {
        "sales-customers": SALES_DB.customers,
        "sales-credit-control": SALES_DB.creditControl,
        "sales-ledger": SALES_DB.ledger,
        "sales-products": SALES_DB.products,
        "sales-pricing": SALES_DB.pricing,
        "sales-tax": SALES_DB.taxEngine,
        "sales-quotations": SALES_DB.quotations,
        "sales-orders": SALES_DB.orders,
        "sales-invoices": SALES_DB.invoices,
        "sales-payments": SALES_DB.payments,
        "sales-returns": SALES_DB.returns,
        "sales-channels": SALES_DB.channels,
        "sales-commission": SALES_DB.commissions,
        "sales-targets": SALES_DB.targets,
        "sales-automation": SALES_DB.automation,
        "sales-audit": SALES_DB.auditTrail,
    };

    // ─── COLUMN DEFINITIONS ─────────────────────────────────────────────
    const getColumns = (module: SalesModuleId): any[] => {
        switch (module) {
            case "sales-customers":
                return [
                    { key: "id", label: "ID", render: (v: any) => <span className="font-mono text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">{v}</span> },
                    { key: "name", label: "Customer", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "type", label: "Type", render: (v: any) => <Badge variant={v === "Corporate" ? "info" : v === "Insurance" ? "warning" : "neutral"}>{v}</Badge> },
                    { key: "channel", label: "Channel", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                    { key: "creditLimit", label: "Credit Limit", render: (v: any) => <span className="font-bold">₹{v.toLocaleString()}</span> },
                    { key: "outstanding", label: "Outstanding", render: (v: any) => <span className={`font-black ${v > 0 ? "text-red-500" : "text-emerald-600"}`}>₹{v.toLocaleString()}</span> },
                    { key: "creditStatus", label: "Credit Status", render: (v: any) => <Badge variant={v === "OK" ? "success" : v === "WARNING" ? "warning" : "error"}>{v}</Badge> },
                    { key: "paymentTerms", label: "Terms" },
                ];
            case "sales-credit-control":
                return [
                    { key: "customer", label: "Customer", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "creditLimit", label: "Credit Limit", render: (v: any) => <span className="font-bold">₹{v.toLocaleString()}</span> },
                    { key: "outstanding", label: "Outstanding", render: (v: any) => <span className="font-black text-red-500">₹{v.toLocaleString()}</span> },
                    { key: "overdueAmount", label: "Overdue", render: (v: any) => <span className={`font-black ${v > 0 ? "text-red-600" : "text-emerald-600"}`}>₹{v.toLocaleString()}</span> },
                    { key: "overdueDays", label: "Overdue Days", render: (v: any) => <span className={`font-black ${v > 30 ? "text-red-600" : v > 0 ? "text-amber-500" : "text-slate-400"}`}>{v}d</span> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "OK" ? "success" : v === "WARNING" ? "warning" : "error"}>{v}</Badge> },
                    { key: "lastAction", label: "Last Action", render: (v: any) => <span className="text-[10px] text-slate-500 font-bold">{v}</span> },
                ];
            case "sales-ledger":
                return [
                    { key: "customer", label: "Customer", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "date", label: "Date" },
                    { key: "description", label: "Description", render: (v: any) => <span className="font-bold text-slate-700">{v}</span> },
                    { key: "debit", label: "Debit (Dr)", render: (v: any) => v > 0 ? <span className="font-black text-red-500">₹{v.toLocaleString()}</span> : <span className="text-slate-300">—</span> },
                    { key: "credit", label: "Credit (Cr)", render: (v: any) => v > 0 ? <span className="font-black text-emerald-600">₹{v.toLocaleString()}</span> : <span className="text-slate-300">—</span> },
                    { key: "balance", label: "Balance", render: (v: any) => <span className="font-black text-slate-800">₹{v.toLocaleString()}</span> },
                ];
            case "sales-products":
                return [
                    { key: "sku", label: "SKU", render: (v: any) => <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">{v}</span> },
                    { key: "name", label: "Product / Service", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "type", label: "Type", render: (v: any) => <Badge variant={v === "Service" ? "info" : v === "Bundle" ? "warning" : "success"}>{v}</Badge> },
                    { key: "taxPct", label: "Tax %", render: (v: any) => <span className={`font-black ${v === 0 ? "text-emerald-600" : "text-amber-600"}`}>{v}%</span> },
                    { key: "costPrice", label: "Cost", render: (v: any) => <span className="text-slate-400 font-bold">₹{v.toLocaleString()}</span> },
                    { key: "sellingPrice", label: "MRP", render: (v: any) => <span className="font-black text-slate-800">₹{v.toLocaleString()}</span> },
                    { key: "maxDiscount", label: "Max Disc", render: (v: any) => <span className="font-bold text-red-400">{v}%</span> },
                    { key: "serialTracked", label: "Serial?", render: (v: any) => <Badge variant={v ? "info" : "neutral"}>{v ? "Yes" : "No"}</Badge> },
                ];
            case "sales-tax":
                return [
                    { key: "name", label: "Tax Rule", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "slab", label: "Slab", render: (v: any) => <span className="font-bold text-amber-600">{v}</span> },
                    { key: "type", label: "Type", render: (v: any) => <Badge variant={v === "Exempt" ? "success" : v === "Reverse Charge" ? "warning" : v === "Zero-Rated Export" ? "info" : "neutral"}>{v}</Badge> },
                    { key: "appliesTo", label: "Applies To", render: (v: any) => <span className="text-xs text-slate-600 font-bold">{v}</span> },
                    { key: "reverseCharge", label: "Reverse Charge", render: (v: any) => <Badge variant={v ? "warning" : "neutral"}>{v ? "Yes" : "No"}</Badge> },
                    { key: "exportApplicable", label: "Export", render: (v: any) => <Badge variant={v ? "info" : "neutral"}>{v ? "Export" : "Domestic"}</Badge> },
                ];
            case "sales-quotations":
                return [
                    { key: "id", label: "Quote #", render: (v: any) => <span className="font-mono text-[10px] text-purple-600 font-bold">{v}</span> },
                    { key: "customer", label: "Customer", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "date", label: "Date" },
                    { key: "channel", label: "Channel", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                    { key: "items", label: "Items" },
                    { key: "discount", label: "Discount", render: (v: any) => <span className="font-black text-red-400">{v}</span> },
                    { key: "discountApproved", label: "Approved?", render: (v: any) => <Badge variant={v ? "success" : "warning"}>{v ? "Yes" : "Pending"}</Badge> },
                    { key: "amount", label: "Value", render: (v: any) => <span className="font-black text-slate-800">₹{v.toLocaleString()}</span> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Accepted" ? "success" : v === "Sent" ? "info" : v === "Expired" ? "error" : "warning"}>{v}</Badge> },
                ];
            case "sales-orders":
                return [
                    { key: "id", label: "Order #", render: (v: any) => <span className="font-mono text-[10px] text-purple-600 font-bold">{v}</span> },
                    { key: "customer", label: "Customer", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "date", label: "Date" },
                    { key: "channel", label: "Channel", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                    { key: "amount", label: "Value", render: (v: any) => <span className="font-black text-slate-800">₹{v.toLocaleString()}</span> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Completed" ? "success" : "info"}>{v}</Badge> },
                    { key: "deliveryStatus", label: "Delivery", render: (v: any) => <Badge variant={v === "Delivered" ? "success" : "warning"}>{v}</Badge> },
                    { key: "branch", label: "Branch" },
                ];
            case "sales-invoices":
                return [
                    { key: "id", label: "Invoice #", render: (v: any) => <span className="font-mono text-[9px] font-black text-purple-600">{v}</span> },
                    { key: "customer", label: "Customer", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "date", label: "Date" },
                    { key: "dueDate", label: "Due Date" },
                    { key: "channel", label: "Channel", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                    { key: "total", label: "Total", render: (v: any) => <span className="font-black text-slate-800">₹{v.toLocaleString()}</span> },
                    { key: "type", label: "Type", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Paid" ? "success" : v === "Overdue" ? "error" : v === "Partial" ? "warning" : "info"}>{v}</Badge> },
                ];
            case "sales-payments":
                return [
                    { key: "id", label: "Payment ID", render: (v: any) => <span className="font-mono text-xs text-purple-600 font-bold">{v}</span> },
                    { key: "customer", label: "From", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "invoice", label: "Invoice", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                    { key: "date", label: "Date" },
                    { key: "amount", label: "Amount", render: (v: any) => <span className="font-black text-emerald-600">₹{v.toLocaleString()}</span> },
                    { key: "mode", label: "Mode", render: (v: any) => <Badge variant="info">{v}</Badge> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Cleared" ? "success" : "warning"}>{v}</Badge> },
                ];
            case "sales-returns":
                return [
                    { key: "id", label: "Return ID", render: (v: any) => <span className="font-mono text-xs font-bold text-red-500">{v}</span> },
                    { key: "customer", label: "Customer", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "invoice", label: "Orig. Invoice", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                    { key: "date", label: "Date" },
                    { key: "amount", label: "Return Value", render: (v: any) => <span className="font-black text-red-500">₹{v.toLocaleString()}</span> },
                    { key: "refundMode", label: "Refund Mode", render: (v: any) => <Badge variant="warning">{v}</Badge> },
                    { key: "accountingEntry", label: "Accounting Entry", render: (v: any) => <span className="text-[9px] font-bold text-slate-500 font-mono">{v}</span> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant="info">{v}</Badge> },
                ];
            case "sales-channels":
                return [
                    { key: "name", label: "Channel", render: (v: any) => <span className="font-black text-slate-800">{v}</span> },
                    { key: "orders", label: "Orders", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "revenue", label: "Revenue", render: (v: any) => <span className="font-black text-emerald-600">₹{(v / 1000).toFixed(0)}K</span> },
                    { key: "avgOrder", label: "Avg Order Value", render: (v: any) => <span className="font-bold">₹{v.toLocaleString()}</span> },
                    { key: "growth", label: "Growth", render: (v: any) => <span className={`font-black ${v.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>{v}</span> },
                ];
            case "sales-commission":
                return [
                    { key: "staff", label: "Staff", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "role", label: "Role", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                    { key: "period", label: "Period" },
                    { key: "pct", label: "Commission %", render: (v: any) => <span className="font-black text-purple-600">{v}</span> },
                    { key: "amount", label: "Earned", render: (v: any) => <span className="font-black">₹{v.toLocaleString()}</span> },
                    { key: "settled", label: "Payroll", render: (v: any) => <Badge variant={v ? "success" : "warning"}>{v ? "Synced" : "Pending"}</Badge> },
                ];
            case "sales-targets":
                return [
                    { key: "name", label: "Entity", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "type", label: "Type", render: (v: any) => <Badge variant={v === "Branch" ? "info" : "neutral"}>{v}</Badge> },
                    { key: "target", label: "Target", render: (v: any) => <span className="font-bold">₹{v.toLocaleString()}</span> },
                    { key: "achieved", label: "Achieved", render: (v: any) => <span className="font-black text-emerald-600">₹{v.toLocaleString()}</span> },
                    { key: "pct", label: "Achievement", render: (v: any) => <Badge variant={v >= 80 ? "success" : v >= 60 ? "warning" : "error"}>{v}%</Badge> },
                ];
            case "sales-automation":
                return [
                    { key: "rule", label: "Rule Name", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "trigger", label: "Trigger", render: (v: any) => <span className="text-xs text-slate-600 font-bold">{v}</span> },
                    { key: "action", label: "Action", render: (v: any) => <span className="text-xs text-slate-700 font-bold">{v}</span> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Active" ? "success" : "error"}>{v}</Badge> },
                    { key: "lastRun", label: "Last Run", render: (v: any) => <span className="text-[10px] text-slate-400 font-bold font-mono">{v}</span> },
                ];
            case "sales-audit":
                return [
                    { key: "timestamp", label: "Timestamp", render: (v: any) => <span className="font-mono text-[9px] text-slate-500">{v}</span> },
                    { key: "user", label: "User", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "module", label: "Module", render: (v: any) => <Badge variant="info">{v}</Badge> },
                    { key: "action", label: "Action", render: (v: any) => <span className="text-xs font-bold text-slate-700">{v}</span> },
                    { key: "value", label: "Value", render: (v: any) => <span className="font-black text-slate-600">{v}</span> },
                    { key: "ipAddress", label: "IP", render: (v: any) => <span className="font-mono text-[9px] text-slate-400">{v}</span> },
                ];
            case "sales-pricing":
                return [
                    { key: "name", label: "Price Rule", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "appliesTo", label: "Applies To", render: (v: any) => <Badge variant="info">{v}</Badge> },
                    { key: "discount", label: "Discount", render: (v: any) => <span className="font-black text-red-500">{v}</span> },
                    { key: "approvalRequired", label: "Needs Approval?", render: (v: any) => <Badge variant={v ? "warning" : "success"}>{v ? "Yes" : "No"}</Badge> },
                    { key: "validFrom", label: "From" },
                    { key: "validTo", label: "To" },
                ];
            default:
                return [{ key: "id", label: "ID" }, { key: "name", label: "Name" }];
        }
    };

    // ─── SPECIAL VIEWS (INVOICE DETAIL + CREDIT CONTROL) ────────────────
    const renderContent = () => {
        if (activeModule === "sales-dashboard") {
            return <SalesDashboard onNavigate={navigate} />;
        }

        // ── FORECASTING ───────────────────────────────────────────────────
        if (activeModule === "sales-forecasting") {
            return (
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-slate-800">Sales Forecasting</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {SALES_DB.forecasting.map((f, i) => (
                            <Card key={i} className="p-5">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{f.month}</p>
                                <p className="text-2xl font-black text-slate-800">₹{(f.forecast / 100000).toFixed(1)}L</p>
                                <p className="text-[10px] font-bold text-slate-500 mt-1">Target: ₹{(f.target / 100000).toFixed(1)}L</p>
                                <p className="text-[10px] font-bold text-slate-400">Last Year: ₹{(f.lastYear / 100000).toFixed(1)}L</p>
                                <div className="mt-3 h-1.5 bg-slate-100 rounded-full">
                                    <div className="h-full rounded-full" style={{ width: `${Math.round(f.forecast / f.target * 100)}%`, background: SALES_BRAND }} />
                                </div>
                                <p className="text-[9px] font-black text-purple-600 mt-1">{Math.round(f.forecast / f.target * 100)}% of target</p>
                            </Card>
                        ))}
                    </div>
                    <Card className="p-6">
                        <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                            <TrendingUp size={18} style={{ color: SALES_BRAND }} /> Revenue Trend — Next 4 Months
                        </h3>
                        <div className="flex items-end gap-4 h-32">
                            {SALES_DB.forecasting.map((f, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                    <span className="text-[9px] font-black text-slate-500">₹{(f.forecast / 100000).toFixed(1)}L</span>
                                    <div className="w-full rounded-t-lg transition-all" style={{ height: `${Math.round(f.forecast / 3500000 * 100)}%`, background: `linear-gradient(180deg, ${SALES_BRAND}, #9B6FD4)` }} />
                                    <span className="text-[8px] font-bold text-slate-400">{f.month.split(" ")[0]}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            );
        }

        // ── CREDIT CONTROL DETAIL ─────────────────────────────────────────
        if (activeModule === "sales-credit-control" && viewState === "detail" && selectedItem) {
            return (
                <DetailView
                    title={selectedItem.customer}
                    subtitle="Credit Control Analysis"
                    status={selectedItem.status}
                    onBack={() => setViewState("list")}
                    tabs={["Credit Profile", "Action History"]}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    sidebarContent={
                        <div className="space-y-3">
                            {selectedItem.status === "BLOCKED" && (
                                <Button className="w-full text-white font-black text-[10px] uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700">
                                    <CheckCircle2 size={14} className="mr-2" /> Lift Block (Override)
                                </Button>
                            )}
                            <Button variant="outline" className="w-full font-black text-[10px] uppercase tracking-widest text-red-500 border-red-200">
                                <ShieldAlert size={14} className="mr-2" /> Escalate to CFO
                            </Button>
                            <div className="p-4 bg-slate-900 rounded-2xl text-white">
                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Overdue</p>
                                <p className="text-2xl font-black text-red-400">₹{selectedItem.overdueAmount?.toLocaleString()}</p>
                                <p className="text-[9px] text-slate-400 font-bold">{selectedItem.overdueDays} days pending</p>
                            </div>
                        </div>
                    }
                >
                    <Card className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(selectedItem || {}).map(([k, v]: any) => (
                                <div key={k} className="p-3 bg-slate-50 rounded-xl">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">{k}</p>
                                    <p className="text-sm font-black text-slate-800">{String(v)}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </DetailView>
            );
        }

        // ── INVOICE DETAIL WITH JOURNAL ENTRY ─────────────────────────────
        if (activeModule === "sales-invoices" && viewState === "detail" && selectedItem) {
            return (
                <DetailView
                    title={selectedItem.id}
                    subtitle={`${selectedItem.type} • ${selectedItem.customer}`}
                    status={selectedItem.status}
                    onBack={() => setViewState("list")}
                    tabs={["Invoice Detail", "Tax Breakdown", "Accounting Impact", "Payments"]}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    sidebarContent={
                        <div className="space-y-3">
                            <Button className="w-full gap-2 text-white font-black text-[10px] uppercase tracking-widest" style={{ background: SALES_BRAND }}>
                                <Download size={14} /> Export PDF
                            </Button>
                            <Button variant="outline" className="w-full font-black text-[10px] uppercase tracking-widest text-emerald-600 border-emerald-100 hover:bg-emerald-50">
                                <CheckCircle2 size={14} className="mr-2" /> Record Payment
                            </Button>
                            <Button variant="outline" className="w-full font-black text-[10px] uppercase tracking-widest text-amber-600 border-amber-100 hover:bg-amber-50">
                                <RefreshCcw size={14} className="mr-2" /> Create Credit Note
                            </Button>
                            <div className="p-3 bg-slate-900 rounded-2xl text-white">
                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Total</p>
                                <p className="text-2xl font-black">₹{selectedItem.total?.toLocaleString()}</p>
                                <p className="text-[9px] text-slate-400 font-bold">incl. ₹{selectedItem.tax?.toLocaleString()} GST</p>
                            </div>
                        </div>
                    }
                >
                    {activeTab === "Accounting Impact" ? (
                        <Card className="p-6">
                            <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                                <Banknote size={18} className="text-teal-500" /> Auto-Generated Journal Entry
                            </h4>
                            <div className="space-y-2">
                                {[
                                    { account: "Accounts Receivable (AR)", type: "Dr", amount: selectedItem.total },
                                    { account: "Sales Revenue", type: "Cr", amount: selectedItem.amount },
                                    { account: "GST Output Tax Liability", type: "Cr", amount: selectedItem.tax },
                                ].map((entry, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                                        <span className={`text-[10px] font-black uppercase w-8 ${entry.type === "Dr" ? "text-red-500" : "text-emerald-600"}`}>{entry.type}</span>
                                        <span className="text-sm font-bold text-slate-700 flex-1 px-3">{entry.account}</span>
                                        <span className="font-black text-slate-800">₹{entry.amount?.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 p-3 bg-teal-50 rounded-xl border border-teal-100 flex items-center gap-2">
                                <ShieldCheck size={16} className="text-teal-600" />
                                <p className="text-[9px] font-bold text-teal-700 uppercase tracking-tighter">Auto-posted to Accounting → General Ledger on Save.</p>
                            </div>
                        </Card>
                    ) : (
                        <Card className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(selectedItem || {}).map(([k, v]: any) => (
                                    <div key={k} className="p-3 bg-slate-50 rounded-xl">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">{k}</p>
                                        <p className="text-sm font-black text-slate-800">{String(v)}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </DetailView>
            );
        }

        // ── QUOTATION CREATE FORM ─────────────────────────────────────────
        if (activeModule === "sales-quotations" && viewState === "create") {
            return (
                <FormView title="New Quotation" onCancel={() => setViewState("list")} onSave={() => setViewState("list")}>
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5"><Label>Customer</Label><Input placeholder="Search customer..." className="h-11" /></div>
                            <div className="space-y-1.5"><Label>Sales Channel</Label><Input placeholder="Walk-in / Corporate / Insurance..." className="h-11" /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1.5"><Label>Quote Date</Label><Input type="date" className="h-11" /></div>
                            <div className="space-y-1.5"><Label>Valid Until</Label><Input type="date" className="h-11" /></div>
                            <div className="space-y-1.5"><Label>Payment Terms</Label><Input placeholder="e.g. Net 30" className="h-11" /></div>
                        </div>
                        <div className="space-y-2">
                            <Label>Line Items</Label>
                            {[1, 2].map(i => (
                                <div key={i} className="grid grid-cols-12 gap-2 p-3 bg-slate-50 rounded-2xl">
                                    <div className="col-span-4"><Input placeholder="Product / Service" /></div>
                                    <div className="col-span-2"><Input placeholder="Qty" type="number" /></div>
                                    <div className="col-span-2"><Input placeholder="Rate (₹)" type="number" /></div>
                                    <div className="col-span-1"><Input placeholder="Disc %" type="number" /></div>
                                    <div className="col-span-1"><Input placeholder="HSN" /></div>
                                    <div className="col-span-2"><Input placeholder="Tax %" type="number" /></div>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full border-dashed text-[10px] font-black uppercase tracking-widest">+ Add Line Item</Button>
                        </div>
                        <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100/50 flex items-start gap-3">
                            <ShieldCheck size={18} className="text-amber-600 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-[9px] font-bold text-amber-800 uppercase tracking-tighter">Discount Approval Matrix</p>
                                <p className="text-[9px] text-amber-700 mt-0.5">Discount &gt; 10% → Manager Approval | &gt; 20% → Super Admin</p>
                            </div>
                        </div>
                        <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100/50 flex items-center gap-3">
                            <Zap size={18} className="text-purple-600 shrink-0" />
                            <p className="text-[9px] font-bold text-purple-800 uppercase tracking-tighter">
                                On acceptance → Auto-converts to Sales Order → Invoice Engine → Accounting journal entry.
                            </p>
                        </div>
                    </div>
                </FormView>
            );
        }

        // ── GENERIC LIST + DETAIL ─────────────────────────────────────────
        if (viewState === "detail") {
            return (
                <DetailView
                    title={selectedItem?.name || selectedItem?.customer || selectedItem?.staff || selectedItem?.rule || selectedItem?.id || "Detail"}
                    onBack={() => setViewState("list")}
                    tabs={["Overview", "Audit Trail"]}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    sidebarContent={<Button className="w-full text-white font-black text-[10px] uppercase tracking-widest" style={{ background: SALES_BRAND }}>Edit Record</Button>}
                >
                    <Card className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(selectedItem || {}).map(([k, v]: any) => (
                                <div key={k} className="p-3 bg-slate-50 rounded-xl">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">{k}</p>
                                    <p className="text-sm font-black text-slate-800">{String(v)}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </DetailView>
            );
        }

        if (viewState === "create") {
            return (
                <FormView title={activeModule.replace("sales-", "").replace(/-/g, " ")} onCancel={() => setViewState("list")} onSave={() => setViewState("list")}>
                    <div className="space-y-4">
                        <div className="space-y-1.5"><Label>Name / Description</Label><Input placeholder="Enter details..." className="h-11 font-bold" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5"><Label>Category / Type</Label><Input placeholder="Type..." /></div>
                            <div className="space-y-1.5"><Label>Date</Label><Input type="date" /></div>
                        </div>
                    </div>
                </FormView>
            );
        }

        const labelMap: any = {
            "sales-customers": "Customer Master",
            "sales-credit-control": "Credit Control Engine",
            "sales-ledger": "Customer Ledger",
            "sales-products": "Products & Services Catalog",
            "sales-pricing": "Pricing & Discount Rules",
            "sales-tax": "Tax Engine (GST)",
            "sales-quotations": "Quotation Management",
            "sales-orders": "Sales Orders",
            "sales-invoices": "Invoice Register",
            "sales-payments": "Payment Collections",
            "sales-returns": "Returns & Credit Notes",
            "sales-channels": "Sales Channel Analytics",
            "sales-commission": "Commission Engine",
            "sales-targets": "Targets & Goal Tracker",
            "sales-automation": "Workflow Automation & Dunning",
            "sales-audit": "Audit Trail (Full History)",
            "sales-reports": "Analytics & Reports",
            "sales-settings": "Sales Configuration",
        };

        return (
            <ListView
                title={labelMap[activeModule] || "Sales View"}
                data={DATA_MAP[activeModule] || []}
                columns={getColumns(activeModule)}
                onCreate={() => setViewState("create")}
                onView={(item: any) => { setSelectedItem(item); setViewState("detail"); setActiveTab("Overview"); }}
            />
        );
    };

    // ─── LOADING SCREEN ──────────────────────────────────────────────────
    if (isAuthLoading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center text-white relative overflow-hidden" style={{ background: SALES_BRAND }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center relative z-10">
                    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                        <ShoppingBag size={72} className="mx-auto mb-4 text-white drop-shadow-xl" />
                    </motion.div>
                    <h1 className="text-5xl font-black tracking-widest uppercase mb-1">SALES</h1>
                    <p className="text-sm font-bold opacity-70 tracking-[0.6em] uppercase">Revenue Engine OS</p>
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

    if (!user) return <Login onLogin={(name: string) => setUser({ name, role: "Sales Manager" })} />;

    return (
        <>
            {showPOS && <SalesPOS onClose={() => setShowPOS(false)} />}
            <Layout
                activeModule={activeModule as any}
                setActiveModule={(id: any) => { setActiveModule(id); setViewState("list"); setActiveTab("Overview"); }}
                onLogout={() => { setUser(null); }}
                onBackToWorkspace={onBackToWorkspace}
                user={user}
                navigation={SALES_NAVIGATION as any}
            >
                {renderContent()}
            </Layout>
        </>
    );
}
