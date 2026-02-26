import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ECOMMERCE_DB, EC_BRAND } from "../ecommerce-types";
import { Badge } from "./ui";
import {
    ShoppingBag, TrendingUp, ShoppingCart, DollarSign, Undo2,
    Users, ArrowUpRight, ArrowDownRight, Clock, Star, Zap,
    Package, CreditCard, MousePointer2, Percent, Target, Mail
} from "lucide-react";

function KpiCard({ title, value, subtitle, icon: Icon, color = EC_BRAND, trend = null }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-lg transition-all"
        >
            <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full transition-transform duration-700 group-hover:scale-150" style={{ background: `${color}10` }} />
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl" style={{ background: `${color}15` }}>
                    <Icon size={20} style={{ color }} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${trend.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                        {trend.startsWith("+") ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                        {trend}
                    </div>
                )}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
            <p className="text-3xl font-black text-slate-800">{value}</p>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{subtitle}</p>
        </motion.div>
    );
}

export function EcommerceDashboard({ onNavigate }: { onNavigate?: (id: any) => void }) {
    const { kpis, orders, abandonedCarts, products } = ECOMMERCE_DB;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                        Ecommerce Command
                        <Badge variant="success" className="bg-blue-50 text-blue-600 border-blue-100">Live Store · alphery.store</Badge>
                    </h2>
                    <p className="text-sm text-slate-400 font-medium mt-1 uppercase tracking-tight">
                        Retail Performance · Cross-Module Integrated Commerce
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => onNavigate?.("ec-storefront")}
                        className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg"
                    >
                        <MousePointer2 size={14} /> Preview Storefront
                    </motion.button>
                </div>
            </div>

            {/* Core KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Conversion Rate" value={kpis.conversionRate} subtitle="Live Visitor-to-Sale Ratio" icon={Target} trend="+1.2%" />
                <KpiCard title="Avg Order Value" value={`₹${kpis.aov.toLocaleString()}`} subtitle="Revenue per transaction" icon={DollarSign} trend="+₹450" />
                <KpiCard title="Abandoned Value" value={`₹${(kpis.abandonedValue / 1000).toFixed(0)}K`} subtitle="Pending Recovery Campaigns" icon={ShoppingCart} color="#F59E0B" trend="-5%" />
                <KpiCard title="Repeat Customers" value={kpis.repeatCustomerRate} subtitle="Loyalty Engine Efficiency" icon={Users} color="#8B5CF6" trend="+8.4%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sale Pipeline — 8 Col */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Live Order Stream */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                                <Package size={20} style={{ color: EC_BRAND }} /> Live Order Flow
                            </h3>
                            <button onClick={() => onNavigate?.("ec-orders")} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">
                                Full OMS →
                            </button>
                        </div>
                        <div className="space-y-4">
                            {orders.slice(0, 5).map(order => (
                                <div key={order.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-transparent hover:border-blue-100 hover:bg-blue-50/10 transition-all cursor-pointer">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${order.status === "Placed" ? "bg-amber-100 text-amber-600" : order.status === "Delivered" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"}`}>
                                        <ShoppingBag size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-sm font-black text-slate-800">{order.customer}</span>
                                            <Badge variant={order.status === "Placed" ? "warning" : order.status === "Delivered" ? "success" : "info"} className="text-[8px] uppercase">{order.status}</Badge>
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{order.id} • {order.items} Items • {order.payment}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-black text-slate-800">₹{order.total.toLocaleString()}</p>
                                        <p className="text-[9px] text-slate-400 font-bold">{order.date.split(" ")[1]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Channel Performance Bar */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h3 className="font-black text-slate-800 text-lg flex items-center gap-2 mb-6">
                            <TrendingUp size={20} style={{ color: EC_BRAND }} /> Category Mastery
                        </h3>
                        <div className="space-y-5">
                            {[
                                { label: "Eyewear", value: 68, color: EC_BRAND },
                                { label: "Contact Lenses", value: 22, color: "#8B5CF6" },
                                { label: "Accessories", value: 10, color: "#10B981" },
                            ].map(cat => (
                                <div key={cat.label} className="space-y-1.5">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <span>{cat.label}</span>
                                        <span className="text-slate-800">{cat.value}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }} animate={{ width: `${cat.value}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="h-full rounded-full" style={{ background: cat.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Growth — 4 Col */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Catalog Status */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h3 className="font-black text-slate-800 text-sm mb-4 flex items-center gap-2">
                            <ShoppingBag size={18} style={{ color: "#EC4899" }} /> Catalog Overview
                        </h3>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="p-3 bg-pink-50 rounded-2xl border border-pink-100">
                                <p className="text-[9px] font-black text-pink-600 uppercase">Live SKU</p>
                                <p className="text-xl font-black text-pink-700">1,240</p>
                            </div>
                            <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                                <p className="text-[9px] font-black text-indigo-600 uppercase">Out of Stock</p>
                                <p className="text-xl font-black text-indigo-700">12</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Top Product (7d)</p>
                            {products.slice(0, 2).map((p, i) => (
                                <div key={p.id} className="flex items-center gap-3">
                                    <img src={p.image} className="w-10 h-10 rounded-xl object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-black text-slate-800 truncate">{p.name}</p>
                                        <p className="text-[9px] text-emerald-600 font-bold">₹{p.price.toLocaleString()} · 45 Sold</p>
                                    </div>
                                    <div className={`p-1 rounded-full ${i === 0 ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-400"}`}>
                                        <Star size={12} fill={i === 0 ? "currentColor" : "none"} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart Recovery Action */}
                    <div className="bg-amber-50 rounded-3xl p-6 shadow-sm border border-amber-100 relative overflow-hidden">
                        <Zap size={40} className="absolute -right-2 -bottom-2 text-amber-200/50" />
                        <h3 className="font-black text-amber-700 text-sm mb-2">Cart Recovery</h3>
                        <p className="text-3xl font-black text-amber-800">₹{kpis.abandonedValue.toLocaleString()}</p>
                        <p className="text-[10px] text-amber-600 font-bold uppercase tracking-tight mb-4">Potential Revenue at Risk</p>
                        <button
                            onClick={() => onNavigate?.("ec-marketing")}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black text-[10px] uppercase tracking-widest py-3 rounded-xl shadow-lg shadow-amber-200/50 transition-all flex items-center justify-center gap-2"
                        >
                            <Mail size={14} /> Send Recovery Blast
                        </button>
                    </div>

                    {/* Settlement Info */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h3 className="font-black text-slate-800 text-sm mb-4 flex items-center gap-2">
                            <CreditCard size={18} style={{ color: "#10B981" }} /> Payout Pipeline
                        </h3>
                        <div className="flex items-end justify-between mb-4">
                            <div>
                                <p className="text-2xl font-black text-slate-800">₹{(kpis.settlementPending / 1000).toFixed(1)}K</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Pending Settlement</p>
                            </div>
                            <Clock size={16} className="text-slate-300 mb-1" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[9px] font-bold text-slate-500">
                                <span>Razorpay (T+2)</span><span>₹52,400</span>
                            </div>
                            <div className="flex justify-between text-[9px] font-bold text-slate-500">
                                <span>Stripe (T+7)</span><span>₹29,600</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
