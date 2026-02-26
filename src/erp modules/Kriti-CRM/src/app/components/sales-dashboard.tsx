import * as React from "react";
import { motion } from "motion/react";
import { SALES_DB, SALES_BRAND } from "../sales-types";
import { Badge } from "./ui";
import {
    ArrowUpRight, ArrowDownRight, TrendingUp, ShoppingCart,
    Receipt, CreditCard, Target, Award, Zap, RefreshCcw,
    BarChart3, FileText, ChevronRight, ShieldAlert, Radio,
    AlertTriangle, History, Banknote, CheckCircle2, Clock
} from "lucide-react";

function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue, color = SALES_BRAND, warning = false }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-2xl p-5 shadow-sm border transition-shadow relative overflow-hidden group hover:shadow-md ${warning ? "border-red-200 bg-red-50/30" : "border-slate-100"}`}
        >
            <div className="absolute -right-3 -top-3 w-14 h-14 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-500" style={{ background: `${color}15` }} />
            <div className="flex items-start justify-between mb-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pr-2 leading-tight">{title}</p>
                <div className="p-2 rounded-xl shrink-0" style={{ background: `${color}15` }}>
                    <Icon size={16} style={{ color }} />
                </div>
            </div>
            <p className={`text-2xl font-black mb-1 ${warning ? "text-red-600" : "text-slate-800"}`}>{value}</p>
            <div className="flex items-center gap-2">
                {trend && <span className={`flex items-center gap-0.5 text-xs font-bold ${trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                    {trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{trendValue}
                </span>}
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{subtitle}</p>
            </div>
        </motion.div>
    );
}

export function SalesDashboard({ onNavigate }: { onNavigate?: (id: any) => void }) {
    const { kpis, quotations, invoices, targets, commissions, channels, automation, auditTrail, creditControl } = SALES_DB;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                        Revenue Command Centre
                        <Badge variant="info" className="text-xs">FY 25-26 Live</Badge>
                    </h2>
                    <p className="text-sm text-slate-400 font-medium mt-1 uppercase tracking-tight">
                        Pipeline → Invoice → Payment → Accounting • Real-time
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => onNavigate?.("sales-pos")}
                        className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest"
                    >
                        <ShoppingCart size={14} /> Open POS
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => onNavigate?.("sales-quotations")}
                        className="flex items-center gap-2 text-white px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg"
                        style={{ background: SALES_BRAND }}
                    >
                        <FileText size={14} /> New Quotation
                    </motion.button>
                </div>
            </div>

            {/* KPI Grid Row 1 */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                <StatCard title="Today's Revenue" value={`₹${(kpis.todayRevenue / 1000).toFixed(0)}K`} subtitle="Live" icon={TrendingUp} trend="up" trendValue="+12%" />
                <StatCard title="Monthly Revenue" value={`₹${(kpis.monthlyRevenue / 100000).toFixed(1)}L`} subtitle="Feb 2026" icon={BarChart3} trend="up" trendValue={kpis.revenueGrowth} color="#10B981" />
                <StatCard title="Outstanding AR" value={`₹${(kpis.outstandingAR / 1000).toFixed(0)}K`} subtitle="Receivables" icon={CreditCard} trend="down" trendValue="-3%" color="#EF4444" />
                <StatCard title="Avg Order Value" value={`₹${kpis.avgOrderValue.toLocaleString()}`} subtitle="Per transaction" icon={ShoppingCart} color="#F59E0B" />
                <StatCard title="Overdue Invoices" value={kpis.overdueInvoices} subtitle="Action required" icon={AlertTriangle} warning color="#EF4444" />
                <StatCard title="Blocked Customers" value={kpis.blockedCustomers} subtitle="Credit blocked" icon={ShieldAlert} warning color="#EF4444" />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 8 col */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Invoice Pipeline */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                                <Receipt size={20} style={{ color: SALES_BRAND }} /> Invoice Pipeline
                                <Badge variant="error">{kpis.overdueInvoices} Overdue</Badge>
                            </h3>
                            <button onClick={() => onNavigate?.("sales-invoices")} className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1" style={{ color: SALES_BRAND }}>
                                View All <ChevronRight size={12} />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {invoices.map(inv => (
                                <div key={inv.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[9px] font-black shrink-0" style={{ background: `${SALES_BRAND}15`, color: SALES_BRAND }}>
                                        {inv.type.split(" ")[0].slice(0, 3).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-slate-400">{inv.id}</span>
                                            <Badge variant={inv.status === "Paid" ? "success" : inv.status === "Overdue" ? "error" : inv.status === "Partial" ? "warning" : "info"}>{inv.status}</Badge>
                                        </div>
                                        <p className="text-sm font-black text-slate-800 truncate">{inv.customer}</p>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase">Due: {inv.dueDate} • {inv.channel}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-black text-slate-800">₹{inv.total.toLocaleString()}</p>
                                        <p className="text-[9px] text-slate-400 font-bold">{inv.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sales Channels */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                                <Radio size={20} style={{ color: SALES_BRAND }} /> Revenue by Channel
                            </h3>
                            <button onClick={() => onNavigate?.("sales-channels")} className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1" style={{ color: SALES_BRAND }}>
                                Full View <ChevronRight size={12} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {channels.map((ch, i) => {
                                const maxRev = Math.max(...channels.map(c => c.revenue));
                                const pct = Math.round(ch.revenue / maxRev * 100);
                                return (
                                    <div key={ch.id}>
                                        <div className="flex justify-between items-center mb-1 px-0.5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-black text-slate-800">{ch.name}</span>
                                                <span className="text-[9px] font-bold text-emerald-600">{ch.growth}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-bold text-slate-400">{ch.orders} orders</span>
                                                <span className="text-xs font-black text-slate-700">₹{(ch.revenue / 1000).toFixed(0)}K</span>
                                            </div>
                                        </div>
                                        <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: SALES_BRAND, opacity: 0.4 + (i * 0.1) }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Targets */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                                <Target size={20} style={{ color: SALES_BRAND }} /> Target vs Achieved
                            </h3>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Feb 2026</span>
                        </div>
                        <div className="space-y-4">
                            {targets.map(t => (
                                <div key={t.id}>
                                    <div className="flex justify-between items-center mb-1.5 px-0.5">
                                        <div><span className="text-xs font-black text-slate-800">{t.name}</span><span className="ml-2 text-[9px] font-bold text-slate-400 uppercase">{t.type}</span></div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold text-slate-500">₹{(t.achieved / 1000).toFixed(0)}K / ₹{(t.target / 1000).toFixed(0)}K</span>
                                            <span className={`text-xs font-black ${t.pct >= 80 ? "text-emerald-600" : t.pct >= 60 ? "text-amber-600" : "text-red-500"}`}>{t.pct}%</span>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${t.pct}%`, background: t.pct >= 80 ? "#10B981" : t.pct >= 60 ? "#F59E0B" : "#EF4444" }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right 4 col */}
                <div className="lg:col-span-4 space-y-5">
                    {/* Credit Control Alerts */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                        <h3 className="font-black text-slate-800 text-sm flex items-center gap-2 mb-4">
                            <ShieldAlert size={16} className="text-red-500" /> Credit Alerts
                        </h3>
                        <div className="space-y-2">
                            {creditControl.filter(c => c.status !== "OK").map(c => (
                                <div key={c.id} className={`p-3 rounded-2xl border ${c.status === "BLOCKED" ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}>
                                    <div className="flex items-start justify-between mb-1">
                                        <span className="text-xs font-black text-slate-800 leading-tight">{c.customer}</span>
                                        <Badge variant={c.status === "BLOCKED" ? "error" : "warning"}>{c.status}</Badge>
                                    </div>
                                    <p className="text-[9px] font-bold text-slate-500">Overdue: ₹{c.overdueAmount.toLocaleString()} • {c.overdueDays}d</p>
                                    <p className="text-[9px] font-bold text-red-500 mt-0.5">{c.lastAction}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => onNavigate?.("sales-credit-control")} className="mt-3 w-full py-2.5 rounded-xl text-white font-black text-[10px] uppercase tracking-widest" style={{ background: "#EF4444" }}>
                            Manage Credit Control
                        </button>
                    </div>

                    {/* Automation Status */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                        <h3 className="font-black text-slate-800 text-sm flex items-center gap-2 mb-4">
                            <Zap size={16} className="text-amber-500" /> Automation Rules
                        </h3>
                        <div className="space-y-2">
                            {automation.slice(0, 4).map(rule => (
                                <div key={rule.id} className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-black text-slate-800 truncate">{rule.rule}</p>
                                        <p className="text-[8px] text-slate-400 font-bold truncate">{rule.lastRun}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => onNavigate?.("sales-automation")} className="mt-3 w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">
                            Manage Automations
                        </button>
                    </div>

                    {/* Recent Audit Trail */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                        <h3 className="font-black text-slate-800 text-sm flex items-center gap-2 mb-4">
                            <History size={16} className="text-slate-400" /> Recent Activity
                        </h3>
                        <div className="space-y-2">
                            {auditTrail.slice(0, 4).map(entry => (
                                <div key={entry.id} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                    <p className="text-[10px] font-black text-slate-800 leading-tight">{entry.action}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[8px] font-bold text-slate-400">{entry.user}</span>
                                        <span className="text-[8px] text-slate-300">•</span>
                                        <span className="text-[8px] font-bold text-slate-400">{entry.timestamp.split(" ")[1]}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => onNavigate?.("sales-audit")} className="mt-3 w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">
                            Full Audit Trail
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
