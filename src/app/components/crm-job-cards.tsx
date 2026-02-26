import * as React from "react";
import { Card, Badge, Button, Input } from "./ui";
import { Plus, Search, Filter, ClipboardCheck, ArrowRight, MoreVertical } from "lucide-react";

export function JobCardsView() {
    const [activeTab, setActiveTab] = React.useState("Active");

    const jobs = [
        { id: "JOB-7821", patient: "Rahul Sharma", procedure: "Cataract Surgery - Left Eye", status: "In Progress", priority: "High", date: "2026-02-11" },
        { id: "JOB-7822", patient: "Priya V.", procedure: "LASIK Consultation", status: "Pending", priority: "Normal", date: "2026-02-12" },
        { id: "JOB-7823", patient: "Amit Kumar", procedure: "Retinal Screening", status: "Completed", priority: "Low", date: "2026-02-10" },
        { id: "JOB-7824", patient: "Sita Devi", procedure: "Glaucoma Follow-up", status: "On Hold", priority: "Normal", date: "2026-02-11" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-2">CRM Job Cards</h2>
                    <p className="text-slate-500 font-bold text-lg">Operations & Workflow Engine</p>
                </div>
                <Button className="gap-2 h-12 px-6 rounded-2xl shadow-lg shadow-[#667EEA]/20">
                    <Plus size={18} />
                    Launch New Job
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatTile label="Active Jobs" value="24" color="bg-blue-500" />
                <StatTile label="Pending Review" value="08" color="bg-amber-500" />
                <StatTile label="Completed Today" value="12" color="bg-emerald-500" />
                <StatTile label="Avg. Cycle Time" value="4.2h" color="bg-purple-500" />
            </div>

            <Card className="glass-card overflow-hidden border-none shadow-2xl">
                <div className="p-6 border-b border-slate-200 bg-white/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
                        {["Active", "Completed", "Archived"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-black transition-all ${activeTab === tab ? "bg-white text-[#667EEA] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <Input placeholder="Search job ID..." className="bg-white/60 border-slate-200 text-slate-800 placeholder:text-slate-400 pl-10 h-10 w-64 rounded-xl" />
                        </div>
                        <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-white/60 h-10 gap-2 rounded-xl">
                            <Filter size={16} /> Filter
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Job Card</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Primary Patient</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Procedure / Task</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Workflow Status</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Internal Priority</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {jobs.map((job) => (
                                <tr key={job.id} className="hover:bg-[#667EEA]/5 transition-colors group cursor-pointer">
                                    <td className="px-6 py-4 text-sm font-black text-slate-800">{job.id}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{job.patient}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{job.procedure}</td>
                                    <td className="px-6 py-4">
                                        <Badge variant={job.status === "Completed" ? "success" : job.status === "In Progress" ? "primary" : "warning"} className="shadow-sm">
                                            {job.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${job.priority === "High" ? "bg-red-500" : job.priority === "Normal" ? "bg-[#667EEA]" : "bg-slate-400"}`} />
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{job.priority}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-[#667EEA] hover:bg-[#667EEA]/10 rounded-lg">
                                            <MoreVertical size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

function StatTile({ label, value, color }: any) {
    return (
        <div className="p-5 glass-card border-none bg-white/50 shadow-lg group hover:bg-white/80 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
                <div className={`w-2 h-2 rounded-full ${color} shadow-[0_0_10px_currentColor]`} />
            </div>
            <p className="text-3xl font-black text-slate-800">{value}</p>
        </div>
    );
}
