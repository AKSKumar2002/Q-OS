import * as React from "react";
import { Card, Badge, Button, Avatar } from "../ui";
import { DB } from "../../core/data";
import { LabJob } from "../../core/schema";
import { Clock, MoreVertical, Plus, Settings, User } from "lucide-react";
import { motion } from "motion/react";

const STAGES = [
    "Lens Cutting",
    "Edging",
    "Polishing",
    "Fitting",
    "Final Assembly"
];

export function ProductionFloor() {
    // In a real app, we would fetch jobs and filter/sort them into columns based on their status.
    // For this mock, we'll simulate jobs in different stages.
    const jobs = DB.labJobs || [];

    // Helper to distribute jobs for demo purposes if they don't match exact stages
    const getStageJobs = (stage: string) => {
        // This is a mock distribution because DB statuses (schema) might differ from User Configured Stages
        // Real implementation would map schema status to these configured stages or have a custom field.
        return jobs.filter((j: any) => {
            if (stage === "Lens Cutting") return j.status === "In_Lab";
            if (stage === "Edging") return j.status === "Surfacing";
            if (stage === "Polishing") return j.status === "Coating";
            if (stage === "Fitting") return j.status === "Fitting";
            if (stage === "Final Assembly") return j.status === "QC_Pending"; // Waiting for QC
            return false;
        });
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Production Floor</h2>
                    <p className="text-slate-500 font-medium">Drag & Drop to update stage</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Settings size={16} /> Configure Stages
                    </Button>
                    <Button className="gap-2 bg-blue-600 text-white shadow-lg shadow-blue-500/30">
                        <Plus size={16} /> New Batch
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex gap-6 min-w-max h-full">
                    {STAGES.map((stage, i) => (
                        <div key={stage} className="w-80 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{i + 1}</span>
                                    <h3 className="font-bold text-slate-700">{stage}</h3>
                                    <Badge variant="neutral" className="bg-slate-100 text-slate-600 border-none">{getStageJobs(stage).length}</Badge>
                                </div>
                            </div>

                            <div className="flex-1 bg-slate-50/50 rounded-2xl p-3 border border-slate-200/60 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                                {getStageJobs(stage).length === 0 ? (
                                    <div className="h-32 flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 rounded-xl">
                                        <span className="text-xs font-bold uppercase">Empty</span>
                                    </div>
                                ) : (
                                    getStageJobs(stage).map((job: LabJob) => (
                                        <ProductionCard key={job.id} job={job} />
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ProductionCard({ job }: { job: LabJob }) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} className="cursor-grab active:cursor-grabbing">
            <Card className="p-4 bg-white shadow-sm hover:shadow-md border-slate-100 group relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${job.priority === "Urgent" ? "bg-red-500" : job.priority === "High" ? "bg-amber-500" : "bg-blue-400"}`} />

                <div className="pl-2">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-black text-slate-700">{job.jobId}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical size={14} />
                        </Button>
                    </div>

                    <div className="mb-3">
                        <p className="text-xs font-bold text-slate-500 line-clamp-1">{DB.patients.find(p => p.id === job.patientId)?.fullName}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{job.lensDetails.type} • {job.lensDetails.material}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} className="text-slate-400" />
                            <span className="text-[10px] font-mono font-bold text-slate-500">
                                {new Date(job.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>

                        {job.technicianId && (
                            <div className="flex items-center gap-1 bg-slate-100 pl-1 pr-2 py-0.5 rounded-full">
                                <div className="w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-[8px] font-bold">
                                    {job.technicianId.replace("TEC-", "")}
                                </div>
                                <span className="text-[10px] font-bold text-slate-600">{job.technicianId}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
