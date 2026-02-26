import * as React from "react";
import { motion } from "motion/react";
import {
    Users, CalendarDays, Clock, Banknote, TrendingUp, TrendingDown,
    UserCheck, UserMinus, UserPlus, Briefcase, FileText, ChevronRight,
    ArrowUpRight, ArrowDownRight, Target, Trophy, Milestone, Monitor, ShieldCheck
} from "lucide-react";
import { HR_DB } from "../hr-types";

const BRAND = "#5C6BC0"; // Indigo theme for HR

function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue, color = BRAND }: any) {
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

export function HRDashboard({ onNavigate }: { onNavigate?: (id: any) => void }) {
    const { stats } = HR_DB;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Workforce Command Center</h2>
                    <p className="text-sm text-slate-400 font-medium mt-1">Hospital, Lab & Sales Teams • Performance & Payroll</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-bold text-slate-700">92% Attendance Today</span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-2 bg-[#5C6BC0] text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100"
                    >
                        <UserPlus size={16} /> Hire New Talent
                    </motion.button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    title="Total Workforce"
                    value={stats.totalEmployees.toString()}
                    subtitle="Across 4 branches"
                    icon={Users}
                    trend="up"
                    trendValue="+3 this month"
                />
                <StatCard
                    title="Lifecycle"
                    value={stats.probationCount?.toString() || "0"}
                    subtitle="Probation / Reviews"
                    icon={Milestone}
                    color="#8B5CF6"
                />
                <StatCard
                    title="Assets Assigned"
                    value="42 Units"
                    subtitle={`${stats.assetsAtRisk} unreturned items`}
                    icon={Monitor}
                    color="#EF4444"
                />
                <StatCard
                    title="Pending Queue"
                    value="7 Tasks"
                    subtitle="Leaves & Revisions"
                    icon={ShieldCheck}
                    color="#F59E0B"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Attendance & Performance Insight */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 outline outline-2 outline-indigo-50/50">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-black text-slate-800">Critical Lifecycle Alerts</h3>
                            <Badge variant="error" className="animate-pulse">Active Actions</Badge>
                        </div>
                        <div className="space-y-3">
                            {HR_DB.lifecycle.map(event => (
                                <div key={event.id} className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg shadow-sm"><Milestone size={16} className="text-indigo-500" /></div>
                                        <div>
                                            <p className="text-xs font-black text-slate-800">{event.empName}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{event.event} • Due {event.dueDate}</p>
                                        </div>
                                    </div>
                                    <Badge variant={event.status === 'On Notice' ? 'error' : 'warning'}>{event.status}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-slate-800">Branch Attendance Real-time</h3>
                            <select className="text-xs font-bold border-none bg-slate-50 rounded-lg px-2 py-1 outline-none">
                                <option>Today: Feb 19</option>
                                <option>Yesterday</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            {['Main Hospital', 'Optical Wing', 'HQ Warehouse', 'Jayanagar Branch'].map((branch, i) => (
                                <div key={branch} className="flex items-center gap-4">
                                    <div className="w-24 text-[10px] font-black text-slate-400 uppercase">{branch}</div>
                                    <div className="flex-1 h-3 bg-slate-50 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-emerald-400" style={{ width: `${85 + (i * 3)}%` }} />
                                        <div className="h-full bg-amber-400" style={{ width: `${5}%` }} />
                                        <div className="h-full bg-red-400" style={{ width: `${10 - (i * 3)}%` }} />
                                    </div>
                                    <div className="w-12 text-xs font-bold text-slate-700 text-right">{85 + (i * 3)}%</div>
                                </div>
                            ))}
                            <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /><span className="text-[10px] font-bold text-slate-400 uppercase">Present</span></div>
                                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /><span className="text-[10px] font-bold text-slate-400 uppercase">Late</span></div>
                                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" /><span className="text-[10px] font-bold text-slate-400 uppercase">Absent</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h3 className="font-black text-slate-800 mb-4">Target vs Performance (Revenue/Jobs)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {HR_DB.incentives.map(inc => (
                                <div key={inc.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-indigo-600 shadow-sm">{inc.empName.charAt(0)}</div>
                                        <div>
                                            <p className="text-xs font-black text-slate-800">{inc.empName}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{inc.metric}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-emerald-600">₹{inc.amount.toLocaleString()}</p>
                                        <Badge variant="success">Achieved</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Status */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h3 className="font-black text-slate-800 mb-4">Today's Availability</h3>
                        <div className="space-y-5">
                            {HR_DB.leaves.filter(l => l.status === 'Approved').map(leave => (
                                <div key={leave.id} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                                        <UserMinus size={14} className="text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800">{leave.empName}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{leave.type} Leave till {leave.range.split('-')[1]}</p>
                                    </div>
                                </div>
                            ))}
                            {HR_DB.stats.assetsAtRisk > 0 && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                                        <Monitor size={14} className="text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800">{HR_DB.stats.assetsAtRisk} Pending Assets</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Asset recovery needed for Exit</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-start gap-3 cursor-pointer group" onClick={() => onNavigate?.('hr-approvals')}>
                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                                    <ShieldCheck size={14} className="text-indigo-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-800">Pending Approvals</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase underline">View Full Queue</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#5C6BC0] to-[#71639E] rounded-2xl p-6 text-white shadow-xl shadow-indigo-100">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="font-black text-sm uppercase tracking-widest text-white/70">Next Payroll Run</h3>
                            <Banknote size={24} className="text-white/40" />
                        </div>
                        <p className="text-3xl font-black mb-1">Feb 28</p>
                        <p className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Estimated Payout: ₹14.8L</p>
                        <div className="mt-6">
                            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md py-2.5 rounded-xl font-black text-xs uppercase transition-colors tracking-widest">
                                Pre-Calculate All
                            </button>
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
