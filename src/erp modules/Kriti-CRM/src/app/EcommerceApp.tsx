import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layout } from "./components/layout";
import { EcommerceModuleId, ECOMMERCE_NAVIGATION, ECOMMERCE_DB, EC_BRAND } from "./ecommerce-types";
import { EcommerceDashboard } from "./components/ecommerce-dashboard";
import { ListView, FormView, DetailView } from "./components/module-views";
import { Badge, Input, Label, Card, Button } from "./components/ui";
import { Login } from "./components/login";
import {
    ShoppingBag, ShoppingCart, Tag, Package, CreditCard, Truck,
    Undo2, Users, Megaphone, BarChart3, Settings, Globe, Search,
    Filter, Heart, Star, Zap, Clock, ShieldCheck, Mail, MessageSquare,
    Smartphone, Wallet, Ticket, Calendar, UserCheck, Lock, ArrowLeft,
    ChevronRight, CheckCircle2, AlertTriangle, Download, Database,
    RefreshCcw, Calculator, Layers, Monitor, Phone
} from "lucide-react";

interface EcommerceAppProps {
    onBackToWorkspace?: () => void;
    initialUser?: { name: string; role: string } | null;
    skipLoader?: boolean;
}

export default function EcommerceApp({ onBackToWorkspace, initialUser, skipLoader = false }: EcommerceAppProps) {
    const [activeModule, setActiveModule] = React.useState<EcommerceModuleId>("ec-dashboard");
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

    const navigate = (id: EcommerceModuleId) => {
        setActiveModule(id); setViewState("list"); setActiveTab("Overview");
    };

    // ─── DATA MAP ──────────────────────────────────────────────────────────────
    const DATA_MAP: Record<string, any[]> = {
        "ec-products": ECOMMERCE_DB.products,
        "ec-offers": ECOMMERCE_DB.offers,
        "ec-orders": ECOMMERCE_DB.orders,
        "ec-cart-checkout": ECOMMERCE_DB.abandonedCarts,
        "ec-payments": ECOMMERCE_DB.payments,
        "ec-returns": ECOMMERCE_DB.returns,
        "ec-customers": ECOMMERCE_DB.customers,
    };

    // ─── COLUMN DEFINITIONS ────────────────────────────────────────────────
    const getColumns = (module: EcommerceModuleId): any[] => {
        switch (module) {
            case "ec-products":
                return [
                    { key: "image", label: "IMG", render: (v: any) => <img src={v} className="w-8 h-8 rounded bg-slate-100 object-cover" /> },
                    { key: "name", label: "Product Name", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "sku", label: "SKU", render: (v: any) => <span className="font-mono text-[9px] text-slate-400">{v}</span> },
                    { key: "category", label: "Category" },
                    { key: "price", label: "Price", render: (v: any) => <span className="font-black">₹{v.toLocaleString()}</span> },
                    { key: "stock", label: "Stock", render: (v: any) => <span className={`font-bold ${v < 20 ? "text-red-500" : "text-slate-600"}`}>{v}</span> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Active" ? "success" : "neutral"}>{v}</Badge> },
                ];
            case "ec-orders":
                return [
                    { key: "id", label: "Order ID", render: (v: any) => <span className="font-mono text-xs font-bold text-blue-600">{v}</span> },
                    { key: "customer", label: "Customer", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "items", label: "Items" },
                    { key: "total", label: "Total", render: (v: any) => <span className="font-black">₹{v.toLocaleString()}</span> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Delivered" ? "success" : v === "Placed" ? "warning" : v === "Returned" ? "error" : "info"}>{v}</Badge> },
                    { key: "date", label: "Order Date" },
                    { key: "branch", label: "Fulfillment Branch" },
                ];
            case "ec-cart-checkout":
                return [
                    { key: "id", label: "Cart ID", render: (v: any) => <span className="font-mono text-xs text-amber-600 font-bold">{v}</span> },
                    { key: "customer", label: "Customer", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "items", label: "Products", render: (v: any) => <span className="text-[10px] text-slate-500 font-bold">{v.join(", ")}</span> },
                    { key: "value", label: "Cart Value", render: (v: any) => <span className="font-black text-slate-800">₹{v.toLocaleString()}</span> },
                    { key: "date", label: "Abandoned At" },
                    { key: "reminderSent", label: "Reminder", render: (v: any) => <Badge variant={v === "No" ? "neutral" : "info"}>{v}</Badge> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Recovered" ? "success" : v === "Active" ? "warning" : "error"}>{v}</Badge> },
                ];
            case "ec-offers":
                return [
                    { key: "code", label: "Code", render: (v: any) => <span className="font-mono text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 uppercase">{v}</span> },
                    { key: "type", label: "Type" },
                    { key: "value", label: "Value", render: (v: any, item: any) => <span className="font-black">{item.type === "Percentage" ? `${v}%` : `₹${v}`}</span> },
                    { key: "minPurchase", label: "Min Purchase", render: (v: any) => <span className="text-[10px] text-slate-400 font-bold">₹{v}</span> },
                    { key: "usage", label: "Total Usage", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Active" ? "success" : "neutral"}>{v}</Badge> },
                ];
            case "ec-payments":
                return [
                    { key: "order", label: "Order #", render: (v: any) => <span className="font-mono text-xs text-blue-600 font-bold">{v}</span> },
                    { key: "method", label: "Payment Method", render: (v: any) => <span className="font-bold text-slate-700">{v}</span> },
                    { key: "amount", label: "Amount", render: (v: any) => <span className="font-black">₹{v.toLocaleString()}</span> },
                    { key: "gatewayRef", label: "Gateway Ref", render: (v: any) => <span className="font-mono text-[10px] text-slate-400">{v}</span> },
                    { key: "settlementStatus", label: "Settlement", render: (v: any) => <Badge variant={v === "Settled" ? "success" : "warning"}>{v}</Badge> },
                    { key: "accountingPosted", label: "Acct Posted?", render: (v: any) => <Badge variant={v ? "success" : "neutral"}>{v ? "Yes" : "No"}</Badge> },
                ];
            case "ec-returns":
                return [
                    { key: "id", label: "Return ID", render: (v: any) => <span className="font-mono text-xs text-rose-600 font-bold">{v}</span> },
                    { key: "order", label: "Orig Order" },
                    { key: "reason", label: "Reason" },
                    { key: "amount", label: "Refund Value", render: (v: any) => <span className="font-black text-rose-600">₹{v.toLocaleString()}</span> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v.includes("Approved") ? "success" : "warning"}>{v}</Badge> },
                    { key: "inventorySync", label: "Stock Sync", render: (v: any) => <Badge variant={v === "Pending" ? "warning" : "info"}>{v}</Badge> },
                ];
            case "ec-customers":
                return [
                    { key: "name", label: "Customer", render: (v: any) => <span className="font-bold text-slate-800">{v}</span> },
                    { key: "email", label: "Email" },
                    { key: "orders", label: "Total Orders" },
                    { key: "loyaltyPoints", label: "Loyalty Points", render: (v: any) => <span className="font-black text-amber-600">{v} pts</span> },
                    { key: "prescription", label: "RX Data", render: (v: any) => <Badge variant="info">Attached</Badge> },
                    { key: "status", label: "Tier", render: (v: any) => <Badge variant={v === "VIP" ? "warning" : "neutral"}>{v}</Badge> },
                ];
            default:
                return [{ key: "id", label: "ID" }, { key: "name", label: "Name" }];
        }
    };

    // ─── CONTENT RENDERER ─────────────────────────────────────────────────────
    const renderContent = () => {
        if (activeModule === "ec-dashboard") return <EcommerceDashboard onNavigate={navigate} />;

        // ── STOREFRONT PREVIEW ───────────────────────────────────────────
        if (activeModule === "ec-storefront") {
            return (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black text-slate-800">Live Storefront — Preview</h2>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Direct-to-Consumer Digital Experience</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2 font-black text-[10px] uppercase tracking-widest text-slate-600">
                                <Monitor size={14} /> Desktop
                            </Button>
                            <Button variant="outline" className="gap-2 font-black text-[10px] uppercase tracking-widest text-slate-600">
                                <Smartphone size={14} /> Mobile
                            </Button>
                            <Button className="gap-2 text-white font-black text-[10px] uppercase tracking-widest shadow-lg" style={{ background: EC_BRAND }}>
                                <Globe size={14} /> Open Live Store
                            </Button>
                        </div>
                    </div>

                    <Card className="p-0 overflow-hidden border-2 border-slate-100 bg-white">
                        {/* Mock Nav */}
                        <div className="p-4 border-b flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-8">
                                <h1 className="text-xl font-black tracking-tighter" style={{ color: EC_BRAND }}>ALPHERY<span className="text-slate-800">.STORE</span></h1>
                                <div className="hidden md:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <span className="text-slate-900 border-b-2 border-blue-500 pb-1">Shop</span>
                                    <span>Eyewear</span>
                                    <span>Contact Lenses</span>
                                    <span>Appointments</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-slate-400">
                                <Search size={18} />
                                <Heart size={18} />
                                <div className="relative">
                                    <ShoppingCart size={18} className="text-slate-900" />
                                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">2</span>
                                </div>
                            </div>
                        </div>

                        {/* Banner */}
                        <div className="h-[300px] bg-slate-900 relative flex items-center px-12 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1511499767390-a7391e5873a4?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                            <div className="relative z-10 max-w-lg space-y-4">
                                <Badge variant="warning" className="bg-amber-400 text-slate-900 border-none font-black text-[10px]">SUMMER SALE UP TO 40% OFF</Badge>
                                <h2 className="text-5xl font-black text-white leading-tight">Elite Vision.<br />Digital First.</h2>
                                <p className="text-slate-300 font-bold text-sm">Experience our premium collection of luxury eyewear with smart virtual try-on and direct-to-branch fulfillment.</p>
                                <Button className="bg-white text-slate-900 font-black px-8 py-3 rounded-xl hover:bg-slate-100 uppercase tracking-widest text-xs">Shop the Collection</Button>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="p-8 space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Trending Now</h3>
                                <button className="text-[10px] font-black uppercase tracking-widest text-blue-600">View All Products →</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {ECOMMERCE_DB.products.slice(0, 4).map(p => (
                                    <div key={p.id} className="group cursor-pointer">
                                        <div className="relative aspect-square bg-slate-50 rounded-3xl overflow-hidden mb-4 border border-transparent group-hover:border-blue-100 transition-all">
                                            <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <button className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md text-slate-900 font-black text-[10px] uppercase tracking-widest py-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                                Add to Cart
                                            </button>
                                            {p.compareAtPrice && (
                                                <div className="absolute top-4 left-4 bg-red-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">Sale</div>
                                            )}
                                        </div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{p.category}</p>
                                        <h4 className="font-black text-slate-800 mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tighter">{p.name}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="font-black text-slate-900">₹{p.price.toLocaleString()}</span>
                                            {p.compareAtPrice && <span className="text-[10px] font-bold text-slate-400 line-through">₹{p.compareAtPrice.toLocaleString()}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Powerful integration block */}
                        <div className="bg-blue-600 p-8 flex items-center justify-between text-white border-t border-blue-500">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md">
                                    <Smartphone size={32} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black mb-1 italic">Tightly Integrated Ecosystem.</h4>
                                    <p className="text-blue-100 text-sm font-bold">Orders sync instantly to Inventory, Finance, and nearest Franchise branch.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-[9px] font-black uppercase opacity-60">Status</p>
                                    <p className="text-xs font-black">All Systems Online</p>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34D399]" />
                            </div>
                        </div>
                    </Card>
                </div>
            );
        }

        // ── ORDER DETAIL (OMS) ──────────────────────────────────────────
        if (activeModule === "ec-orders" && viewState === "detail" && selectedItem) {
            return (
                <DetailView
                    title={`Order: ${selectedItem.id}`}
                    subtitle={`Customer: ${selectedItem.customer} — ${selectedItem.date}`}
                    status={selectedItem.status}
                    onBack={() => setViewState("list")}
                    tabs={["Order Content", "Fulfillment", "Payment & Billing", "History"]}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    sidebarContent={
                        <div className="space-y-3">
                            {selectedItem.status === "Placed" && (
                                <Button className="w-full text-white font-black text-[10px] uppercase tracking-widest bg-blue-600 hover:bg-blue-700">
                                    <CheckCircle2 size={14} className="mr-2" /> Confirm Order
                                </Button>
                            )}
                            <Button variant="outline" className="w-full font-black text-[10px] uppercase tracking-widest text-slate-600">
                                <Truck size={14} className="mr-2" /> Ship via Delhivery
                            </Button>
                            <Button variant="outline" className="w-full font-black text-[10px] uppercase tracking-widest text-red-500 border-red-100">
                                <AlertTriangle size={14} className="mr-2" /> Mark Fraud Risk
                            </Button>
                            <div className="p-4 rounded-2xl bg-slate-900 text-white">
                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Paid</p>
                                <p className="text-3xl font-black">₹{selectedItem.total.toLocaleString()}</p>
                                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-tight mt-1">{selectedItem.payment} Verified</p>
                            </div>
                        </div>
                    }
                >
                    {activeTab === "Payment & Billing" ? (
                        <Card className="p-6">
                            <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                                <CreditCard size={18} className="text-teal-500" /> Payment Reconciliation
                            </h4>
                            <div className="space-y-4">
                                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 size={24} className="text-emerald-600" />
                                        <div>
                                            <p className="font-black text-emerald-800 uppercase tracking-tighter text-[10px]">Payment Settlement Confirmed</p>
                                            <p className="text-[10px] font-bold text-emerald-700 opacity-70">Settled via Razorpay on T+2 basis.</p>
                                        </div>
                                    </div>
                                    <span className="font-black text-lg text-emerald-800">₹{selectedItem.total.toLocaleString()}</span>
                                </div>

                                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-8 mb-4">Accounting Impact</h5>
                                <div className="space-y-2">
                                    {[
                                        { account: "Razorpay Escrow/Clearing", type: "Dr", amount: selectedItem.total, note: "Awaiting settlement" },
                                        { account: "Online Sales Revenue", type: "Cr", amount: selectedItem.total - (selectedItem.total * 0.18), note: "Revenue (Excl. GST)" },
                                        { account: "Output GST (IGST/CGST)", type: "Cr", amount: selectedItem.total * 0.18, note: "Tax liability" },
                                    ].map((je, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/10">
                                            <div className="flex items-center gap-3">
                                                <span className={`text-[9px] font-black uppercase w-6 shrink-0 ${je.type === "Dr" ? "text-blue-500" : "text-emerald-600"}`}>{je.type}</span>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-700">{je.account}</p>
                                                    <p className="text-[9px] text-slate-400 font-bold">{je.note}</p>
                                                </div>
                                            </div>
                                            <span className="font-black">₹{je.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <Card className="p-6">
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: "Selected Branch", value: selectedItem.branch || "Auto-Assigning", sub: "Nearest Warehouse" },
                                        { label: "Shipping Method", value: "Priority Courier", sub: "Delhivery Surface" },
                                        { label: "Tracking Status", value: selectedItem.tracking || "Not Generated", sub: "Live Sync" },
                                        { label: "Packaging Code", value: "PK-82910-A", sub: "Branding Kit v4" },
                                    ].map(s => (
                                        <div key={s.label} className="p-4 bg-slate-50 rounded-2xl">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                                            <p className="text-sm font-black text-slate-800">{s.value}</p>
                                            <p className="text-[8px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">{s.sub}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/30 flex items-start gap-3">
                                    <Zap size={16} className="text-blue-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[9px] font-black text-blue-800 uppercase tracking-tighter">Inventory Auto-Deduction</p>
                                        <p className="text-[10px] text-blue-700 mt-0.5 font-medium leading-relaxed">System has pre-reserved stock from {selectedItem.branch || 'central hub'}. Deduction will finalize on "Packed" status. Multi-branch fulfillment is active for this tenant.</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </DetailView>
            );
        }

        // ── GENERIC LISTS ───────────────────────────────────────────────
        const labelMap: any = {
            "ec-products": "Catalog Manager",
            "ec-offers": "Pricing & Offers Engine",
            "ec-orders": "Order Management Master",
            "ec-cart-checkout": "Abandoned Cart Recovery",
            "ec-payments": "Payment Reconciliation Registry",
            "ec-returns": "Returns & Refund Workflow",
            "ec-customers": "Customer Digital Accounts",
            "ec-analytics": "Ecommerce Growth Analytics",
        };

        if (activeModule === "ec-analytics") {
            return (
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-slate-800">Advanced Store Analytics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Revenue Heatmap", icon: BarChart3, color: "#42A5F5" },
                            { title: "Cart Abandonment Analysis", icon: ShoppingCart, color: "#F59E0B" },
                            { title: "Repeat Purchase Matrix", icon: Users, color: "#8B5CF6" },
                            { title: "Marketing Campaign ROI", icon: Megaphone, color: "#EC4899" },
                        ].map(chart => (
                            <Card key={chart.title} className="p-8 h-64 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-blue-200 transition-all">
                                <div className="p-4 rounded-3xl mb-4 group-hover:scale-110 transition-transform" style={{ background: `${chart.color}15` }}>
                                    <chart.icon size={32} style={{ color: chart.color }} />
                                </div>
                                <h3 className="font-black text-slate-800 mb-2">{chart.title}</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Click to expand chart view</p>
                            </Card>
                        ))}
                    </div>
                </div>
            );
        }

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
            <div className="min-h-screen w-full flex flex-col items-center justify-center text-white relative overflow-hidden" style={{ background: EC_BRAND }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center relative z-10">
                    <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                        <ShoppingBag size={72} className="mx-auto mb-4 text-white drop-shadow-xl" />
                    </motion.div>
                    <h1 className="text-5xl font-black tracking-widest uppercase mb-1">ECOMMERCE</h1>
                    <p className="text-sm font-bold opacity-70 tracking-[0.5em] uppercase mb-1">Retail Platform</p>
                    <div className="mt-12 flex items-center gap-2 justify-center opacity-40">
                        {[0, 150, 300].map(d => <div key={d} className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                    </div>
                </motion.div>
            </div>
        );
    }

    if (!user) return <Login onLogin={(name: string) => setUser({ name, role: "Store Administrator" })} />;

    return (
        <Layout
            activeModule={activeModule as any}
            setActiveModule={(id: any) => { setActiveModule(id); setViewState("list"); setActiveTab("Overview"); }}
            onLogout={() => setUser(null)}
            onBackToWorkspace={onBackToWorkspace}
            user={user}
            navigation={ECOMMERCE_NAVIGATION as any}
        >
            <div className="max-w-[1600px] mx-auto">
                {renderContent()}
            </div>
        </Layout>
    );
}
