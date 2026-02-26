import * as React from "react";
import { Card, Badge, Button } from "../ui";
import { BarChart3, Clock, AlertTriangle, CheckCircle2, Factory, TrendingUp, Users, PenTool, LayoutDashboard } from "lucide-react";
import { DB } from "../../core/data";

export function LabDashboard({ onViewJob }: { onViewJob: (job: any) => void }) {
    const jobs = DB.labJobs || [];
    const urgentJobs = jobs.filter((j: any) => j.priority === "Urgent" || j.priority === "High");
    const pendingJobs = jobs.filter((j: any) => j.status !== "Delivered" && j.status !== "Ready");
    const completedToday = jobs.filter((j: any) => j.status === "Ready" && j.updatedAt.startsWith(new Date().toISOString().split('T')[0]));

    const stats: { label: string, value: string | number, icon: any, color: string, bg: string, subtext?: string }[] = [
        { label: "Jobs In Production", value: pendingJobs.length, icon: Factory, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Ready for QC", value: jobs.filter((j: any) => j.status === "QC_Pending").length, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
        { label: "Urgent Orders", value: urgentJobs.length, icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50" },
        { label: "Avg TAT", value: "4.2 Hrs", subtext: "Target: 24h", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Lab Overview</h2>
                    <p className="text-slate-500 font-medium">Real-time production metrics</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <LayoutDashboard size={16} /> Customize Layout
                    </Button>
                    <Button className="gap-2 bg-slate-800 text-white shadow-lg shadow-slate-800/20">
                        <BarChart3 size={16} /> View Reports
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.label} className="p-4 border-none shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                <stat.icon size={24} className={stat.color} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                                    {stat.subtext && <span className="text-xs font-bold text-slate-400">{stat.subtext}</span>}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                <AlertTriangle className="text-amber-500" size={20} />
                                Priority Queue
                            </h3>
                            <Badge variant="error">{urgentJobs.length} Critical</Badge>
                        </div>
                        <div className="space-y-3">
                            {urgentJobs.length === 0 ? (
                                <div className="text-center py-8 text-slate-400">
                                    <CheckCircle2 size={32} className="mx-auto mb-2 opacity-20" />
                                    <p>All priority jobs cleared!</p>
                                </div>
                            ) : (
                                urgentJobs.map((job: any) => (
                                    <div key={job.id} className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-between group cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => onViewJob(job)}>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-black text-amber-900">{job.jobId}</span>
                                                <Badge variant="warning" className="text-[10px] h-5 px-1.5 bg-amber-200/50 text-amber-800 border-none">{job.status.replace("_", " ")}</Badge>
                                            </div>
                                            <p className="text-xs font-bold text-amber-700/60">
                                                Patient: {job.patientId} • Due: {job.targetDeliveryDate}
                                            </p>
                                        </div>
                                        <Button size="sm" className="bg-white text-amber-900 hover:bg-amber-50 border border-amber-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            Process
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                            <TrendingUp className="text-blue-500" size={20} />
                            Production Velocity
                        </h3>
                        <div className="h-48 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-medium">Chart Component Placeholder</p>
                            {/* Integrate real chart library later */}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="p-6 bg-slate-900 text-white border-none shadow-xl shadow-slate-900/20">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Users className="text-blue-400" size={20} />
                            Technicians
                        </h3>
                        <div className="space-y-4">
                            {/* Mock Technician List */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                                            T{i}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Technician {i}</p>
                                            <p className="text-[10px] text-white/40">98% Efficiency</p>
                                        </div>
                                    </div>
                                    <Badge variant="success" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">Active</Badge>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                            <PenTool className="text-purple-500" size={20} />
                            Machine Status
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-medium text-slate-600">Edger A</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-emerald-600 font-bold">Running</span>
                                </div>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full w-[85%]" />
                            </div>

                            <div className="flex justify-between items-center text-sm mt-4">
                                <span className="font-medium text-slate-600">Blocker B</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                                    <span className="text-amber-600 font-bold">Idle</span>
                                </div>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-amber-500 h-full w-[15%]" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
