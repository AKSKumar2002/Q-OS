import * as React from "react";
import { ListView, DetailView } from "../module-views";
import { Card, Badge, Button } from "../ui";
import { HardDrive, PenTool, Calendar, AlertOctagon, Wrench, CheckCircle2, Activity } from "lucide-react";

export function MachineManagement() {
    const machines = [
        { id: "MAC-001", name: "ES-700", type: "Edger", status: "Operational", nextCalibration: "2026-03-01", usage: "320 hrs", health: 92 },
        { id: "MAC-002", name: "ME-1200", type: "Edger/Blocker", status: "Maintenance", nextCalibration: "2026-02-15", usage: "1150 hrs", health: 65 },
        { id: "MAC-003", name: "LE-1000", type: "Finisher", status: "Operational", nextCalibration: "2026-04-10", usage: "45 hrs", health: 98 },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-6">Equipment Status</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {machines.map((machine) => (
                    <MachineCard key={machine.id} machine={machine} />
                ))}
            </div>

            <div className="mt-8">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertOctagon size={20} className="text-amber-500" />
                    Active Maintenance Tickets
                </h3>

                <Card className="p-0 overflow-hidden border border-slate-100 shadow-sm">
                    <div className="grid grid-cols-5 bg-slate-50 p-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                        <span>Ticket ID</span>
                        <span>Machine</span>
                        <span>Issue</span>
                        <span>Priority</span>
                        <span>Status</span>
                    </div>
                    <div className="p-3 border-b border-slate-50 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer transition-colors">
                        <span className="font-mono font-bold text-slate-400 text-sm">TKT-8902</span>
                        <span className="font-bold text-slate-700">ME-1200</span>
                        <span className="text-sm text-slate-600">Water leakage in chamber</span>
                        <Badge variant="error">High</Badge>
                        <Badge variant="warning">Technician Update</Badge>
                    </div>
                    <div className="p-3 border-b border-slate-50 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer transition-colors opacity-60">
                        <span className="font-mono font-bold text-slate-400 text-sm">TKT-8840</span>
                        <span className="font-bold text-slate-700">ES-700</span>
                        <span className="text-sm text-slate-600">Routine Software Update</span>
                        <Badge variant="neutral">Low</Badge>
                        <Badge variant="success">Completed</Badge>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function MachineCard({ machine }: any) {
    const isOperational = machine.status === "Operational";

    return (
        <Card className={`p-6 border-l-4 relative overflow-hidden group hover:shadow-lg transition-all ${isOperational ? "border-l-emerald-500" : "border-l-amber-500"}`}>
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl opacity-10 rounded-bl-full -mr-10 -mt-10 ${isOperational ? "from-emerald-500 to-transparent" : "from-amber-500 to-transparent"}`} />

            <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                    <HardDrive size={24} className="text-slate-600" />
                </div>
                <Badge variant={isOperational ? "success" : "warning"} className="shadow-sm">
                    {machine.status.toUpperCase()}
                </Badge>
            </div>

            <h3 className="text-2xl font-black text-slate-800 mb-1 leading-none">{machine.name}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{machine.type}</p>

            <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-2">
                        <Wrench size={14} className="text-slate-400" /> Maintenance
                    </span>
                    <span className="font-mono font-bold text-slate-700">{machine.nextCalibration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-2">
                        <Activity size={14} className="text-slate-400" /> Usage
                    </span>
                    <span className="font-mono font-bold text-slate-700">{machine.usage}</span>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Health Score</span>
                        <span className={`font-black ${machine.health > 90 ? "text-emerald-600" : "text-amber-600"}`}>{machine.health}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${machine.health > 90 ? "bg-emerald-500" : "bg-amber-500"}`}
                            style={{ width: `${machine.health}%` }}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}
