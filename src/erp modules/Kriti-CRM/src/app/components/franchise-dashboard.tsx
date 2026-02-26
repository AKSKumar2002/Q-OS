import * as React from "react";
import { motion } from "motion/react";
import { FRANCHISE_DB, FR_BRAND } from "../franchise-types";
import { Badge } from "./ui";
import {
    Building2, TrendingUp, DollarSign, ShieldCheck, LifeBuoy,
    AlertTriangle, Award, ChevronRight, ArrowUpRight, Clock,
    Users, Package, Star, Megaphone, FileText, Zap, Activity,
    UserPlus, GraduationCap, LogOut
} from "lucide-react";

function StatCard({ title, value, subtitle, icon: Icon, color = FR_BRAND, alert = false }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-2xl p-5 shadow-sm border transition-shadow hover:shadow-md relative overflow-hidden group ${alert ? "border-red-100 bg-red-50/20" : "border-slate-100"}`}
        >
            <div className="absolute -right-3 -top-3 w-14 h-14 rounded-full opacity-30 group-hover:scale-150 transition-transform duration-500" style={{ background: `${color}25` }} />
            <div className="flex items-start justify-between mb-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pr-2 leading-tight">{title}</p>
                <div className="p-2 rounded-xl shrink-0" style={{ background: `${color}15` }}>
                    <Icon size={16} style={{ color: alert ? "#EF4444" : color }} />
                </div>
            </div>
            <p className={`text-2xl font-black mb-1 ${alert ? "text-red-600" : "text-slate-800"}`}>{value}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{subtitle}</p>
        </motion.div>
    );
}

const HEALTH_GRADIENT: any = { Good: "#10B981", Warning: "#F59E0B", Poor: "#EF4444" };

export function FranchiseDashboard({ onNavigate }: { onNavigate?: (id: any) => void }) {
    const { kpis, franchises, recruitmentLeads, ranking, support, compliance } = FRANCHISE_DB;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                        Franchise Network Command
                        <Badge variant="success" className="text-xs">
                            {kpis.activeFranchises}/{kpis.totalFranchises} Active
                        </Badge>
                    </h2>
                    <p className="text-sm text-slate-400 font-medium mt-1 uppercase tracking-tight">
                        Managed Healthcare Business Network • Network Health Index: {kpis.avgHealthScore}%
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => onNavigate?.("fr-recruitment")}
                        className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest"
                    >
                        <UserPlus size={14} /> Recruitment Funnel
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => onNavigate?.("fr-onboarding")}
                        className="flex items-center gap-2 text-white px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg"
                        style={{ background: FR_BRAND }}
                    >
                        <Users size={14} /> Onboard Suite
                    </motion.button>
                </div>
            </div>

            {/* Network KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                <StatCard title="Network Revenue" value={`₹${(kpis.networkRevenue / 100000).toFixed(1)}L`} subtitle={`Feb 2026 • ${kpis.networkRevenueGrowth}`} icon={TrendingUp} />
                <StatCard title="Health Index" value={`${kpis.avgHealthScore}%`} subtitle="Composite score" icon={Activity} color="#10B981" />
                <StatCard title="Unsettled Royalty" value={`₹${(kpis.unsettledRoyalty / 1000).toFixed(0)}K`} subtitle="Pending collections" icon={DollarSign} alert />
                <StatCard title="Supply Compliance" value="94%" subtitle="Purchase mandatory" icon={Package} color="#8B5CF6" />
                <StatCard title="Upcoming Renewals" value={kpis.upcomingRenewals} subtitle="Action required" icon={Clock} alert color="#EF4444" />
                <StatCard title="Recruitment" value={kpis.recruitmentPipeline} subtitle="Leads in funnel" icon={UserPlus} color="#3B82F6" />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left — 8 Col */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Franchise Health Scores */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                                <Activity size={20} style={{ color: FR_BRAND }} /> Franchise Health Index
                            </h3>
                            <button onClick={() => onNavigate?.("fr-health-score")} className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1" style={{ color: FR_BRAND }}>
                                View Analytics <ChevronRight size={12} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {franchises.map(fr => (
                                <div key={fr.id} className="p-4 rounded-2xl border border-slate-50 bg-slate-50/30 flex items-center gap-4">
                                    <div className="relative shrink-0">
                                        <svg className="w-14 h-14 rotate-[-90deg]">
                                            <circle cx="28" cy="28" r="24" stroke="#F1F5F9" strokeWidth="6" fill="none" />
                                            <circle cx="28" cy="28" r="24" stroke={fr.healthScore >= 90 ? "#10B981" : fr.healthScore >= 75 ? "#F59E0B" : "#EF4444"} strokeWidth="6" strokeDasharray={150.8} strokeDashoffset={150.8 * (1 - fr.healthScore / 100)} fill="none" strokeLinecap="round" className="transition-all duration-1000" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-800">{fr.healthScore}%</div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-slate-800 truncate">{fr.businessName.split("–")[1]?.trim()}</p>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Rev: ₹{(fr.monthlyRevenue / 1000).toFixed(0)}K • Staff: {fr.staffTraining}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant={fr.healthScore >= 75 ? "success" : "warning"} className="text-[8px] py-0 px-1.5">{fr.healthScore >= 75 ? "Stable" : "Critical"}</Badge>
                                            <span className="text-[8px] text-slate-400 font-bold">{fr.royaltyCompliance} Royalty</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recruitment Pipeline */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                                <UserPlus size={20} style={{ color: FR_BRAND }} /> Expansion Pipeline
                            </h3>
                            <button onClick={() => onNavigate?.("fr-recruitment")} className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1" style={{ color: FR_BRAND }}>
                                Open Leads <ChevronRight size={12} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recruitmentLeads.slice(0, 3).map(lead => (
                                <div key={lead.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer border border-slate-50">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                                        <Users size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black text-slate-800">{lead.name}</span>
                                            <Badge variant="info" className="text-[8px]">{lead.status}</Badge>
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-bold">{lead.location} • {lead.investmentCapacity} Capacity</p>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-xs font-black ${lead.screeningScore >= 80 ? "text-emerald-600" : "text-amber-600"}`}>{lead.screeningScore}</div>
                                        <p className="text-[8px] text-slate-400 font-bold">score</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right — 4 Col */}
                <div className="lg:col-span-4 space-y-5">
                    {/* Training Compliance */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                        <h3 className="font-black text-slate-800 text-sm flex items-center gap-2 mb-4">
                            <GraduationCap size={16} className="text-blue-500" /> Training Compliance
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-3xl font-black text-slate-800">{kpis.trainingCompliance}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Certified Staff</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-emerald-600">+4%</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">vs last qtr</p>
                                </div>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: kpis.trainingCompliance }} />
                            </div>
                            <button onClick={() => onNavigate?.("fr-training")} className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-600 font-black text-[10px] uppercase tracking-widest">
                                Manage Certifications →
                            </button>
                        </div>
                    </div>

                    {/* Exit Watchlist */}
                    {FRANCHISE_DB.exits.filter(e => e.status === "In Progress").length > 0 && (
                        <div className="bg-red-50 rounded-3xl p-5 shadow-sm border border-red-100">
                            <h3 className="font-black text-red-600 text-sm flex items-center gap-2 mb-4">
                                <LogOut size={16} /> Exit Monitoring
                            </h3>
                            <div className="space-y-3">
                                {FRANCHISE_DB.exits.filter(e => e.status === "In Progress").map(exit => (
                                    <div key={exit.id} className="p-3 bg-white rounded-2xl border border-red-100">
                                        <p className="text-xs font-black text-slate-800 mb-1">{exit.franchise}</p>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="error" className="text-[8px]">Access {exit.accessRevoked ? "Revoked" : "Pending"}</Badge>
                                            <span className="text-[9px] text-slate-400 font-bold">{exit.status}</span>
                                        </div>
                                        <div className="bg-slate-50 p-2 rounded-lg">
                                            <div className="flex justify-between text-[9px] font-bold text-slate-400">
                                                <span>Settlement</span><span>₹{(exit.netRefund / 1000).toFixed(0)}K</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Support Queue */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                        <h3 className="font-black text-slate-800 text-sm flex items-center gap-2 mb-4">
                            <LifeBuoy size={16} className="text-sky-500" /> Support Queue
                        </h3>
                        <div className="space-y-2">
                            {support.filter(t => t.status !== "Resolved").map(ticket => (
                                <div key={ticket.id} className={`p-3 rounded-xl border transition-colors ${ticket.priority === "High" ? "border-red-100 bg-red-50/30" : "border-slate-100 hover:bg-slate-50"}`}>
                                    <div className="flex items-start justify-between gap-2 mb-0.5">
                                        <p className="text-[10px] font-black text-slate-800 leading-tight flex-1">{ticket.subject}</p>
                                        <Badge variant={ticket.priority === "High" ? "error" : ticket.priority === "Medium" ? "warning" : "neutral"} className="shrink-0 text-[8px]">
                                            {ticket.priority}
                                        </Badge>
                                    </div>
                                    <p className="text-[9px] text-slate-400 font-bold">{ticket.franchise.split("–")[1]?.trim()} • {ticket.category}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
