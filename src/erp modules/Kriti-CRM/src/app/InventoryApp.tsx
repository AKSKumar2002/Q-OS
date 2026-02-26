import * as React from "react";
import { motion } from "motion/react";
import { Layout } from "./components/layout";
import { InventoryModuleId, INVENTORY_NAVIGATION, INVENTORY_DB } from "./inventory-types";
import { InventoryDashboard } from "./components/inventory-dashboard";
import { ListView, FormView, DetailView } from "./components/module-views";
import { Badge, Input, Label, Card, Button } from "./components/ui";
import { Login } from "./components/login";
import {
    Package, Warehouse, AlertTriangle, ShieldAlert, TrendingDown,
    Plus, ChevronLeft, CheckCircle2, XCircle, Printer, RotateCcw,
    Lock, DollarSign, Layers, Ruler, BarChart3, Search, ShoppingCart, Truck
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────
interface AppProps {
    onBackToWorkspace?: () => void;
    initialUser?: { name: string; role: string } | null;
    skipLoader?: boolean;
}

const BRAND = "#DE7D42";

export default function InventoryApp({ onBackToWorkspace, initialUser, skipLoader = false }: AppProps) {
    const [activeModule, setActiveModule] = React.useState<InventoryModuleId>("inv-dashboard");
    const [viewState, setViewState] = React.useState<"list" | "create" | "detail">("list");
    const [selectedItem, setSelectedItem] = React.useState<any>(null);
    const [activeTab, setActiveTab] = React.useState("Overview");

    // ── Auth ──
    const [user, setUser] = React.useState<{ name: string; role: string } | null>(initialUser || null);
    const [isAuthLoading, setIsAuthLoading] = React.useState(!skipLoader);

    React.useEffect(() => {
        if (!initialUser) {
            const saved = localStorage.getItem("inventory_user");
            if (saved) setUser(JSON.parse(saved));
        }
        if (!skipLoader) {
            setTimeout(() => setIsAuthLoading(false), 2500);
        }
    }, [initialUser, skipLoader]);

    const handleLogin = (username: string) => {
        const u = { name: username, role: "Inventory Manager" };
        setUser(u);
        localStorage.setItem("inventory_user", JSON.stringify(u));
    };
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("inventory_user");
    };

    const navigate = (id: InventoryModuleId) => {
        setActiveModule(id);
        setViewState("list");
    };

    // ─────────────────────────────────────────────────────────────────
    //  DATA MAP
    // ─────────────────────────────────────────────────────────────────
    const DATA_MAP: Record<string, any[]> = {
        "inv-products": INVENTORY_DB.products,
        "inv-variants": INVENTORY_DB.variants,
        "inv-units": INVENTORY_DB.units,
        "inv-categories": INVENTORY_DB.categories,
        "inv-brands": INVENTORY_DB.brands,
        "inv-stock-ledger": INVENTORY_DB.stockLedger,
        "inv-reserved-stock": INVENTORY_DB.reservations,
        "inv-batch-tracking": INVENTORY_DB.batches,
        "inv-serial-tracking": INVENTORY_DB.serials,
        "inv-adjustments": INVENTORY_DB.adjustments,
        "inv-vendors": INVENTORY_DB.vendors,
        "inv-purchase-orders": INVENTORY_DB.purchaseOrders,
        "inv-grn": INVENTORY_DB.landedCosts,
        "inv-purchase-returns": INVENTORY_DB.returns.filter(r => r.type === 'Purchase Return'),
        "inv-sales-returns": INVENTORY_DB.returns.filter(r => r.type === 'Sales Return'),
        "inv-purchase-invoices": INVENTORY_DB.purchases,
        "inv-warehouses": INVENTORY_DB.warehouses,
        "inv-branch-stock": INVENTORY_DB.branchStock,
        "inv-transfers": INVENTORY_DB.transfers,
        "inv-aging-report": INVENTORY_DB.aging,
        "inv-valuation": INVENTORY_DB.products,
        "inv-turnover": INVENTORY_DB.products,
        "inv-approvals": INVENTORY_DB.approvals,
        "inv-period-lock": INVENTORY_DB.periodLocks,
    };

    // ─────────────────────────────────────────────────────────────────
    //  COLUMN DEFINITIONS (Enterprise Grade)
    // ─────────────────────────────────────────────────────────────────
    const getColumns = (module: InventoryModuleId): any[] => {
        switch (module) {
            case "inv-products":
                return [
                    { key: "barcode", label: "Barcode", render: (v: any) => <span className="text-[10px] font-mono bg-slate-100 px-1 rounded">{v}</span> },
                    { key: "sku", label: "SKU", render: (v: any) => <span className="font-bold text-xs" style={{ color: BRAND }}>{v}</span> },
                    { key: "name", label: "Product Name", render: (v: any) => <span className="font-semibold text-slate-800">{v}</span> },
                    { key: "moq", label: "MOQ", render: (v: any) => <span className="font-bold text-indigo-600">{v}</span> },
                    { key: "currentStock", label: "Stock", render: (v: any, row: any) => <span className="font-black">{v || 0}</span> },
                    { key: "purchasePrice", label: "Unit Cost", render: (v: any) => <span>₹{v}</span> }
                ];

            case "inv-variants":
                return [
                    { key: "sku", label: "Variant SKU", render: (v: any) => <span className="font-bold text-xs" style={{ color: BRAND }}>{v}</span> },
                    { key: "productName", label: "Base Product" },
                    { key: "variantName", label: "Variant Specs", render: (v: any) => <Badge variant="info">{v}</Badge> },
                    { key: "stock", label: "In Stock", render: (v: any) => <span className="font-black">{v}</span> },
                ];

            case "inv-units":
                return [
                    { key: "name", label: "Unit Name", render: (v: any) => <span className="font-black text-slate-800">{v}</span> },
                    { key: "baseUnit", label: "Base Unit" },
                    { key: "conversion", label: "Multiplier", render: (v: any) => <span className="font-bold text-emerald-600">×{v}</span> },
                ];

            case "inv-reserved-stock":
                return [
                    { key: "type", label: "Origin", render: (v: any) => <Badge variant="info">{v}</Badge> },
                    { key: "reference", label: "Reference", render: (v: any) => <span className="font-bold text-xs">{v}</span> },
                    { key: "product", label: "Product" },
                    { key: "qty", label: "Qty Reserved", render: (v: any) => <span className="font-black text-indigo-600">{v}</span> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === 'Active' ? 'success' : 'neutral'}>{v}</Badge> },
                    { key: "reservedOn", label: "Reserved Date" },
                ];

            case "inv-grn":
                return [
                    { key: "grnRef", label: "GRN Ref", render: (v: any) => <span className="font-bold" style={{ color: BRAND }}>{v}</span> },
                    { key: "baseAmount", label: "PO Base", render: (v: any) => <span>₹{v.toLocaleString()}</span> },
                    { key: "transport", label: "Transport", render: (v: any) => <span className="text-slate-500">₹{v}</span> },
                    { key: "totalLandedCost", label: "Landed Cost", render: (v: any) => <span className="font-black text-emerald-700">₹{v.toLocaleString()}</span> },
                    { key: "unitLandedCost", label: "Unit Cost (Actual)", render: (v: any) => <span className="font-black text-slate-800">₹{v.toLocaleString()}</span> },
                ];

            case "inv-purchase-returns":
            case "inv-sales-returns":
                return [
                    { key: "reference", label: "Return ID", render: (v: any) => <span className="font-bold" style={{ color: BRAND }}>{v}</span> },
                    { key: "vendor", label: "Party", render: (v: any, row: any) => <span>{v || row.customer}</span> },
                    { key: "reason", label: "Reason" },
                    { key: "items", label: "Qty", render: (v: any) => <span className="font-black text-red-500">{v}</span> },
                    { key: "status", label: "Return Status", render: (v: any) => <Badge variant="warning">{v}</Badge> },
                ];

            case "inv-aging-report":
                return [
                    { key: "product", label: "Product", render: (v: any) => <span className="font-bold">{v}</span> },
                    {
                        key: "range", label: "Aging Range", render: (v: any) => (
                            <Badge variant={v.includes('180') ? 'error' : v.includes('90') ? 'warning' : 'success'}>{v}</Badge>
                        )
                    },
                    { key: "qty", label: "Qty Locked", render: (v: any) => <span className="font-black">{v}</span> },
                    { key: "val", label: "Value Locked", render: (v: any) => <span className="font-bold text-red-500">₹{v.toLocaleString()}</span> },
                    { key: "lastSold", label: "Last Sale" },
                ];

            case "inv-approvals":
                return [
                    { key: "priority", label: "Priority", render: (v: any) => <Badge variant={v === 'Urgent' ? 'error' : 'warning'}>{v}</Badge> },
                    { key: "module", label: "Module" },
                    { key: "reference", label: "Reference", render: (v: any) => <span className="font-mono font-bold">{v}</span> },
                    { key: "amount", label: "Value", render: (v: any) => <span className="font-black">₹{v.toLocaleString()}</span> },
                    { key: "requestedBy", label: "Requested By" },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                ];

            case "inv-period-lock":
                return [
                    { key: "period", label: "Accounting Period", render: (v: any) => <span className="font-black text-slate-800">{v}</span> },
                    {
                        key: "status", label: "Lock Status", render: (v: any) => (
                            <span className={`flex items-center gap-1 font-bold ${v === 'Locked' ? 'text-red-500' : 'text-emerald-600'}`}>
                                {v === 'Locked' ? <Lock size={14} /> : <CheckCircle2 size={14} />} {v}
                            </span>
                        )
                    },
                    { key: "lockedOn", label: "Locked Date" },
                    { key: "lockedBy", label: "Authorized By" },
                ];

            default:
                return [
                    { key: "id", label: "ID" },
                    { key: "name", label: "Name" },
                ];
        }
    };

    const renderContent = () => {
        if (activeModule === "inv-dashboard") {
            return <InventoryDashboard onNavigate={navigate} />;
        }
        if (activeModule === "inv-settings") {
            return (
                <div className="max-w-2xl space-y-6">
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">System Configuration</h2>
                    <Card className="p-6 space-y-4">
                        <h3 className="font-bold">Inventory Period Lock</h3>
                        <p className="text-xs text-slate-400">Locking a period prevents any modifications to stock ledgers back-dated to that period.</p>
                        <Button style={{ background: BRAND, color: 'white' }}>Manage Lock Periods</Button>
                    </Card>
                    <Card className="p-6 space-y-4">
                        <h3 className="font-bold">Valuation Strategy</h3>
                        <div className="flex gap-2">
                            <Badge variant="success">FIFO (Active)</Badge>
                            <Badge variant="neutral">LIFO</Badge>
                            <Badge variant="neutral">Weighted Average</Badge>
                        </div>
                    </Card>
                </div>
            );
        }

        if (viewState === "create") {
            return (
                <FormView title={`Create ${activeModule}`} onCancel={() => setViewState("list")} onSave={() => setViewState("list")}>
                    <div className="space-y-4">
                        <Label>Reference Name/SKU</Label>
                        <Input placeholder="Enter details..." />
                        <Label>Base Value</Label>
                        <Input type="number" />
                    </div>
                    <div className="space-y-4 pt-6">
                        <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
                            <p className="text-xs text-indigo-700 font-semibold">Governance Note: This action will be logged in the audit trail and may require approval.</p>
                        </div>
                    </div>
                </FormView>
            );
        }

        if (viewState === "detail") {
            return (
                <DetailView
                    title={selectedItem?.name || selectedItem?.product || selectedItem?.id}
                    onBack={() => setViewState("list")}
                    tabs={["Overview", "Audit Log"]}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                >
                    <Card className="p-6">
                        <p className="text-slate-400">Detailed record analysis logic for {activeModule}...</p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {Object.entries(selectedItem || {}).map(([k, v]: any) => (
                                <div key={k} className="border-b border-slate-50 py-2">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{k}</span>
                                    <span className="text-sm font-bold text-slate-800">{String(v)}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </DetailView>
            );
        }

        // LIST VIEW
        const labelMap: any = {
            "inv-products": "Enterprise Product Catalog",
            "inv-variants": "Product Variants Engine",
            "inv-units": "Multi-Unit Conversions",
            "inv-categories": "Category Hierarchy",
            "inv-brands": "Brand Management",
            "inv-stock-ledger": "Master Stock Ledger",
            "inv-reserved-stock": "Stock Reservation Queue",
            "inv-grn": "GRN & Landed Costing",
            "inv-purchase-returns": "Vendor Purchase Returns",
            "inv-sales-returns": "Customer Sales Returns",
            "inv-aging-report": "Stock Aging Analysis",
            "inv-valuation": "Inventory Valuation (FIFO)",
            "inv-approvals": "Governance & Approvals",
            "inv-period-lock": "Accounting Period Locks",
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
        if (isAuthLoading) {
            return (
                <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#DE7D42] text-white relative overflow-hidden">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center relative z-10">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <Warehouse size={72} className="mx-auto mb-4 text-white drop-shadow-xl" />
                        </motion.div>
                        <h1 className="text-5xl font-black tracking-widest uppercase mb-1">INVENTORY</h1>
                        <p className="text-sm font-bold opacity-70 tracking-[0.6em] uppercase">Enterprise Stock Engine</p>
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
    }

    if (!user) return <Login onLogin={handleLogin} />;

    return (
        <Layout
            activeModule={activeModule as any}
            setActiveModule={(id: any) => { setActiveModule(id); setViewState("list"); }}
            onLogout={handleLogout}
            onBackToWorkspace={onBackToWorkspace}
            user={user}
            navigation={INVENTORY_NAVIGATION as any}
        >
            {renderContent()}
        </Layout>
    );
}
