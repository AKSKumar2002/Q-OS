import * as React from "react";
import { motion } from "motion/react";
import {
    Package, TrendingUp, TrendingDown, AlertTriangle, ShieldAlert,
    ShoppingCart, Truck, ArrowUpRight, ArrowDownRight, RefreshCw,
    BarChart3, Warehouse, Clock, ChevronRight, Lock, RotateCcw,
    Layers, Ruler, DollarSign
} from "lucide-react";
import { INVENTORY_DB } from "../inventory-types";

const BRAND = "#DE7D42";

function KPICard({ title, value, subtitle, icon: Icon, trend, trendValue, color = BRAND }: any) {
    const isPositive = trend === "up";
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
        >
            <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
                <div className="p-2 rounded-xl" style={{ background: `${color}18` }}>
                    <Icon size={18} style={{ color }} />
                </div>
            </div>
            <p className="text-2xl font-black text-slate-800 mb-1">{value}</p>
            <div className="flex items-center gap-2">
                {trend && (
                    <span className={`flex items-center gap-0.5 text-xs font-bold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                        {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {trendValue}
                    </span>
                )}
                <p className="text-xs text-slate-400">{subtitle}</p>
            </div>
        </motion.div>
    );
}

export function InventoryDashboard({ onNavigate }: { onNavigate?: (id: any) => void }) {
    // Aggregate Metrics
    const reservedCount = INVENTORY_DB.reservations.filter(r => r.status === 'Active').length;
    const pendingApprovals = INVENTORY_DB.approvals.filter(a => a.status === 'Pending').length;
    const agingAtRisk = INVENTORY_DB.aging.filter(a => a.range.includes('180+')).reduce((acc, a) => acc + a.val, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Enterprise Inventory</h2>
                    <p className="text-sm text-slate-400 font-medium mt-1">Multi-branch Control • Stock Aging • Reservations</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
                        <Lock size={12} className="text-emerald-500" />
                        <span className="font-bold">Jan 2026 Locked</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-bold text-slate-700">Stock Sync: LIVE</span>
                    </div>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KPICard
                    title="Stock Valuation"
                    value="₹4.82M"
                    subtitle="FIFO (Landed Cost)"
                    icon={DollarSign}
                    trend="up"
                    trendValue="+4.1%"
                />
                <KPICard
                    title="Reserved Stock"
                    value={reservedCount.toString()}
                    subtitle="Committed to orders"
                    icon={ShieldAlert}
                    color="#5C6BC0"
                />
                <KPICard
                    title="Aging at Risk"
                    value={`₹${(agingAtRisk / 1000).toFixed(1)}K`}
                    subtitle="Dead Stock (180d+)"
                    icon={TrendingDown}
                    color="#E06C75"
                />
                <KPICard
                    title="Pending Approvals"
                    value={pendingApprovals.toString()}
                    subtitle="Governance Queue"
                    icon={ListFilter}
                    color="#DE7D42"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Reservation Engine Status */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-black text-slate-800">Stock Availability Engine</h3>
                            <p className="text-xs text-slate-400 font-medium mt-0.5">Preventing Double-Selling across channels</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {INVENTORY_DB.stockSummary.map((item, i) => (
                            <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                                        <Package size={20} className="text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-800">{item.product}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Phy: {item.physicalStock} • Res: {item.reservedStock} • Tra: {item.inTransit}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-xl font-black ${item.available < 0 ? 'text-red-500' : 'text-emerald-600'}`}>{item.available}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Available</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions & Governance */}
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h3 className="font-black text-slate-800 text-sm mb-4">Stock Aging (Aging Value)</h3>
                        <div className="space-y-3">
                            {[
                                { label: '0-30 Days', val: 65, color: '#10b981' },
                                { label: '31-90 Days', val: 20, color: '#3b82f6' },
                                { label: '91-180 Days', val: 10, color: '#f59e0b' },
                                { label: '180+ Days', val: 5, color: '#ef4444' },
                            ].map(group => (
                                <div key={group.label} className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                                        <span>{group.label}</span>
                                        <span>{group.val}%</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${group.val}%`, background: group.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h3 className="font-black text-slate-800 text-sm mb-4">Recent Returns</h3>
                        <div className="space-y-2">
                            {INVENTORY_DB.returns.map(ret => (
                                <div key={ret.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                        <RotateCcw size={14} className="text-slate-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-black text-slate-800 truncate">{ret.reference}</p>
                                        <p className="text-[9px] text-slate-400 font-bold tracking-tight">{ret.type} • {ret.reason}</p>
                                    </div>
                                    <Badge variant={ret.status.includes('Restock') ? 'success' : 'neutral'}>{ret.items}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Badge({ children, variant = "neutral" }: any) {
    const styles: any = {
        success: "bg-emerald-100 text-emerald-700",
        error: "bg-red-100 text-red-700",
        warning: "bg-amber-100 text-amber-700",
        info: "bg-indigo-100 text-indigo-700",
        neutral: "bg-slate-100 text-slate-600",
    };
    return (
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${styles[variant]}`}>
            {children}
        </span>
    );
}

function ListFilter({ size, ...props }: any) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M3 6h18M7 12h10M10 18h4" />
        </svg>
    );
}
