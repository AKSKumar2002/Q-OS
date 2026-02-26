import * as React from "react";
import { motion } from "motion/react";
import {
    PieChart, BarChart3, TrendingUp, TrendingDown, Wallet, Landmark,
    ArrowUpRight, ArrowDownRight, FileText, ShieldCheck, Activity,
    Calendar, Users, Building2, Banknote, Receipt, Scale, Repeat,
    GitCompare, Layers, ClipboardList, Zap, Percent, RefreshCcw
} from "lucide-react";
import { ACCOUNTING_DB } from "../accounting-types";
import { Button, Badge } from "./ui";

const BRAND = "#00A09D"; // Odoo Teal / Emerald

function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue, color = BRAND }: any) {
    const isPositive = trend === "up";
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group h-full"
        >
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-50" />
            <div className="flex items-start justify-between mb-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</p>
                <div className="p-2 rounded-xl relative z-10" style={{ background: `${color}18` }}>
                    <Icon size={16} style={{ color }} />
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
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{subtitle}</p>
            </div>
        </motion.div>
    );
}

export function AccountingDashboard({ onNavigate }: { onNavigate?: (id: any) => void }) {
    const { kpis, branchPerformance, costCenters, auditLogs } = ACCOUNTING_DB;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                        Financial Command Centre
                        <Badge variant="success" className="text-xs">FY 25-26 Live</Badge>
                    </h2>
                    <p className="text-sm text-slate-400 font-medium mt-1 uppercase tracking-tight">Enterprise Multi-Branch Consolidation • Real-time GL & Audit Trace</p>
                </div>
                <div className="flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg"
                    >
                        <FileText size={16} /> New Journal Entry
                    </motion.button>
                </div>
            </div>

            {/* Top KPI Grid (Enterprise Metrics) */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard
                    title="Net Profit Margin"
                    value={kpis.netProfitMargin}
                    subtitle="Post-Tax Estimation"
                    icon={Percent}
                    trend="up"
                    trendValue="+2.1%"
                    color="#10B981"
                />
                <StatCard
                    title="Operating Burn"
                    value={kpis.burnRate}
                    subtitle="Cash Runway Optimized"
                    icon={Activity}
                    trend="down"
                    trendValue="-4%"
                    color="#EF4444"
                />
                <StatCard
                    title="Collection Eff."
                    value={kpis.collectionEfficiency}
                    subtitle="Patient & Insurance"
                    icon={Zap}
                    trend="up"
                    trendValue="+8%"
                    color="#3B82F6"
                />
                <StatCard
                    title="Insurance Asset"
                    value="₹8.5L"
                    subtitle="Claims Awaiting Fund"
                    icon={ShieldCheck}
                    color="#F59E0B"
                />
                <StatCard
                    title="GST Payable"
                    value="₹1.1L"
                    subtitle="Disbursal: Mar 20"
                    icon={Scale}
                    color="#6366F1"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Visual: Branch Profitability */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                                    <GitCompare size={20} className="text-teal-500" /> Multi-Branch Performance
                                </h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Consolidated Profit & Revenue breakdown</p>
                            </div>
                            <Button variant="outline" size="sm" className="text-[10px] font-black uppercase tracking-widest gap-2 h-9 border-slate-200">
                                <RefreshCcw size={14} /> Compare Time Range
                            </Button>
                        </div>

                        <div className="space-y-6">
                            {branchPerformance.map(branch => (
                                <div key={branch.id} className="group">
                                    <div className="flex justify-between items-center mb-2 px-1">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center font-black text-slate-400 text-[10px] group-hover:bg-teal-500 group-hover:text-white transition-colors">{branch.id}</div>
                                            <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{branch.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-right">
                                            <div className="hidden md:block">
                                                <p className="text-[9px] font-black text-slate-400 uppercase">Rev</p>
                                                <p className="text-xs font-bold text-slate-800">₹{(branch.revenue / 1000).toFixed(0)}K</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase">Profit</p>
                                                <p className="text-xs font-black text-emerald-600">₹{(branch.profit / 1000).toFixed(0)}K</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-teal-400 group-hover:bg-teal-500 transition-colors" style={{ width: `${(branch.profit / branch.revenue) * 100}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-teal-600"><Layers size={20} /></div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Top Cost Center</p>
                                    <p className="text-sm font-black text-slate-800">{costCenters[0].name}</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <Badge variant="info" className="mb-1">{costCenters[0].margin} Margin</Badge>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-orange-600"><Percent size={20} /></div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Avg Tax Leakage</p>
                                    <p className="text-sm font-black text-slate-800">4.2% Optimization</p>
                                </div>
                                <div className="ml-auto text-right text-emerald-600 font-bold">
                                    <p className="text-xs">Healthy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Audit Trace & Quick Governance */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-slate-800 text-sm flex items-center gap-2 lowercase">
                                <ClipboardList size={16} className="text-slate-400" /> recent audit trace
                            </h3>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>

                        <div className="flex-1 space-y-5">
                            {auditLogs.map(log => (
                                <div key={log.id} className="relative pl-6 pb-2 border-l border-slate-100 last:border-0 group cursor-pointer hover:bg-slate-50/50 rounded-r-xl transition-colors p-1">
                                    <div className="absolute left-[-4.5px] top-2 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-teal-500 group-hover:scale-125 transition-all" />
                                    <div className="flex justify-between items-start">
                                        <p className="text-[11px] font-black text-slate-800 leading-tight">{log.action}</p>
                                        <span className="text-[9px] font-bold text-slate-300">{log.timestamp.split(' ')[1]}</span>
                                    </div>
                                    <p className="text-[9px] text-slate-400 font-medium uppercase mt-0.5">{log.details}</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-[9px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">{log.user}</span>
                                        <span className="text-[9px] font-black text-slate-700">{log.impact}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 space-y-3">
                            <button className="w-full bg-slate-900 text-white rounded-2xl py-3 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-colors">
                                Export Full Ledger Trace
                            </button>
                            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex items-center gap-3">
                                <ShieldCheck size={20} className="text-amber-600 shrink-0" />
                                <p className="text-[9px] font-bold text-amber-700 uppercase leading-tight tracking-tighter">
                                    All financial exports are watermarked and logged under your Role context.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

