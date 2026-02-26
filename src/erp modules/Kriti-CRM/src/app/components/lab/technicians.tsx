import * as React from "react";
import { ListView } from "../module-views";
import { Card, Badge, Button, Avatar } from "../ui";
import { User, Award, Activity, AlertTriangle, TrendingUp, IndianRupee } from "lucide-react";

export function TechnicianManagement() {
    // Mock Data
    const technicians = [
        { id: "TEC-001", name: "Rajesh Kumar", role: "Senior Technician", jobsCompleted: 450, avgTime: "18m", errorRate: "0.4%", incentive: 12500, status: "Active" },
        { id: "TEC-002", name: "Suresh P.", role: "Junior Technician", jobsCompleted: 120, avgTime: "25m", errorRate: "2.1%", incentive: 3200, status: "On Leave" },
        { id: "TEC-003", name: "Amit Verma", role: "Edging Specialist", jobsCompleted: 310, avgTime: "12m", errorRate: "0.8%", incentive: 8900, status: "Active" },
    ];

    const columns = [
        { key: "id", label: "ID", render: (v: string) => <span className="font-mono font-bold text-slate-400">{v}</span> },
        {
            key: "name", label: "Name", render: (v: string, item: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">{item.name[0]}</div>
                    <div>
                        <p className="font-bold text-slate-800">{v}</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.role}</p>
                    </div>
                </div>
            )
        },
        { key: "jobsCompleted", label: "Jobs (Mtd)", render: (v: number) => <span className="font-bold text-slate-700">{v}</span> },
        { key: "avgTime", label: "Avg Time", render: (v: string) => <Badge variant="neutral" className="bg-slate-100 font-mono">{v}</Badge> },
        {
            key: "errorRate", label: "Error %", render: (v: string) => {
                const val = parseFloat(v);
                return <Badge variant={val < 1 ? "success" : val < 2.5 ? "warning" : "error"}>{v}</Badge>
            }
        },
        { key: "incentive", label: "Incentive", render: (v: number) => <span className="font-black text-emerald-600">₹{v.toLocaleString()}</span> },
        { key: "status", label: "Status", render: (v: string) => <Badge variant={v === "Active" ? "success" : "neutral"}>{v}</Badge> },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-gradient-to-br from-[#667EEA]/10 to-[#764BA2]/10 border-[#667EEA]/20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                            <Award className="text-[#667EEA]" size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Incentives</p>
                            <h3 className="text-3xl font-black text-slate-800">₹24,600</h3>
                        </div>
                    </div>
                    <div className="h-1 bg-white/50 w-full rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#667EEA] to-[#764BA2] w-[75%]" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 font-medium text-right">75% of Monthly Budget Used</p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shadow-sm">
                            <AlertTriangle className="text-amber-500" size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Error Rate</p>
                            <h3 className="text-3xl font-black text-slate-800">1.1%</h3>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400">Target: &lt; 0.5%</p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shadow-sm">
                            <Activity className="text-emerald-500" size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Efficiency</p>
                            <h3 className="text-3xl font-black text-slate-800">94%</h3>
                        </div>
                    </div>
                    <p className="text-xs text-emerald-600 font-bold">+2.4% vs last month</p>
                </Card>
            </div>

            <ListView
                title="Technician Performance"
                subtitle="Performance tracking & Payroll Integration"
                data={technicians}
                columns={columns}
                onCreate={() => { }}
                onView={(item) => console.log(item)}
            />
        </div>
    );
}
