import * as React from "react";
import { DetailView } from "../module-views";
import { Card, Badge, Button, PrescriptionGrid, Label } from "../ui";
import { DB } from "../../core/data";
import { LabJob } from "../../core/schema";
import { CheckCircle2, AlertTriangle, Printer, RotateCcw, Truck, Microscope, DollarSign, Paperclip, FileText, Image, ShieldCheck } from "lucide-react";

export function JobDetailView({ job, onBack }: { job: LabJob, onBack: () => void }) {
    const [activeTab, setActiveTab] = React.useState("Overview");

    const statusSteps = ["New", "In_Lab", "Surfacing", "Coating", "Fitting", "QC_Pending", "Ready", "Delivered"];
    const currentStepIndex = statusSteps.indexOf(job.status);

    return (
        <DetailView
            title={job.jobId}
            subtitle={`Order for ${DB.patients.find(p => p.id === job.patientId)?.fullName || job.patientId}`}
            status={job.status}
            tabs={["Overview", "QC & History", "Remakes"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onBack={onBack}
            sidebarContent={
                <div className="space-y-4">
                    <Button className="w-full gap-2" variant="outline">
                        <Printer size={16} /> Print Job Card
                    </Button>
                    <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30">
                        <Microscope size={16} /> Update Status
                    </Button>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <Label className="uppercase text-[10px] tracking-widest text-slate-400 mb-2">Technician</Label>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                {job.technicianId ? job.technicianId.replace("TEC-", "") : "?"}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{job.technicianId || "Unassigned"}</p>
                                <p className="text-xs text-green-600 font-medium">On Shift</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle size={14} className="text-amber-600" />
                            <Label className="uppercase text-[10px] tracking-widest text-amber-800">Priority</Label>
                        </div>
                        <p className={`text-lg font-black ${job.priority === "Urgent" ? "text-red-600 animate-pulse" : "text-amber-900"}`}>
                            {job.priority.toUpperCase()}
                        </p>
                        <p className="text-xs text-amber-700 mt-1">Due: {job.targetDeliveryDate}</p>
                    </div>
                </div>
            }
        >
            {activeTab === "Overview" && (
                <div className="space-y-6">
                    {/* PROGRESS TRACKER */}
                    <Card className="p-8">
                        <div className="flex items-center justify-between relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-0" />
                            {statusSteps.map((step, index) => {
                                const isCompleted = index <= currentStepIndex;
                                const isCurrent = index === currentStepIndex;

                                return (
                                    <div key={step} className="flex flex-col items-center gap-2 relative z-10 bg-white px-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isCurrent ? "bg-blue-600 border-blue-600 text-white scale-125 shadow-lg shadow-blue-500/40" :
                                            isCompleted ? "bg-emerald-500 border-emerald-500 text-white" :
                                                "bg-white border-slate-200 text-slate-300"
                                            }`}>
                                            {isCompleted ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isCurrent ? "text-blue-600" : "text-slate-400"}`}>
                                            {step.replace("_", " ")}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Microscope size={20} className="text-purple-500" />
                            Lens Specification
                        </h4>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div>
                                <Label>Type</Label>
                                <p className="text-lg font-bold text-slate-800">{job.lensDetails.type}</p>
                            </div>
                            <div>
                                <Label>Material</Label>
                                <p className="text-lg font-bold text-slate-800">{job.lensDetails.material}</p>
                            </div>
                            <div>
                                <Label>Brand</Label>
                                <p className="text-lg font-bold text-slate-800">{job.lensDetails.brand}</p>
                            </div>
                            <div>
                                <Label>Coatings</Label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {job.lensDetails.coating.map(c => (
                                        <Badge key={c} variant="info">{c}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <Label className="mb-4 block">Prescription Data</Label>
                            <PrescriptionGrid data={job.prescription} />
                        </div>
                    </Card>
                    {/* COST TRACKING (Advanced) */}
                    <Card className="p-6 bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                <DollarSign size={20} className="text-emerald-600" />
                                Job Costing
                            </h4>
                            <Badge variant="neutral">Internal Only</Badge>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-3 bg-white rounded-lg border border-slate-100">
                                <p className="text-xs text-slate-400 font-bold uppercase">Lens Cost</p>
                                <p className="text-lg font-black text-slate-700">₹850.00</p>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-slate-100">
                                <p className="text-xs text-slate-400 font-bold uppercase">Frame Cost</p>
                                <p className="text-lg font-black text-slate-700">₹1,200.00</p>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-slate-100">
                                <p className="text-xs text-slate-400 font-bold uppercase">Labor/Overhead</p>
                                <p className="text-lg font-black text-slate-700">₹450.00</p>
                            </div>
                            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                                <p className="text-xs text-emerald-600 font-bold uppercase">Total Profit</p>
                                <p className="text-lg font-black text-emerald-700">₹2,490.00</p>
                            </div>
                        </div>
                    </Card>

                    {/* ATTACHMENTS */}
                    <Card className="p-6">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Paperclip size={20} className="text-blue-500" />
                            Attachments & Reference
                        </h4>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            <div className="w-32 h-32 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer">
                                <Paperclip size={24} className="mb-2" />
                                <span className="text-xs font-bold uppercase">Add File</span>
                            </div>
                            <div className="w-32 h-32 bg-slate-50 rounded-xl border border-slate-200 relative group overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FileText size={32} className="text-slate-300" />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full bg-slate-900/80 text-white text-[10px] p-1 font-medium text-center truncate">
                                    Prescription.pdf
                                </div>
                            </div>
                            <div className="w-32 h-32 bg-slate-50 rounded-xl border border-slate-200 relative group overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image size={32} className="text-slate-300" />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full bg-slate-900/80 text-white text-[10px] p-1 font-medium text-center truncate">
                                    Frame_Ref.jpg
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* DELIVERY & WARRANTY */}
                    <Card className="p-6">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Truck size={20} className="text-slate-600" />
                            Delivery & Warranty
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label>Delivery Confirmation</Label>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-500 flex flex-col gap-2">
                                    <p className="flex justify-between"><span>Status:</span> <Badge variant="neutral">Pending</Badge></p>
                                    <p className="flex justify-between"><span>Expected:</span> <span className="font-bold text-slate-700">{job.targetDeliveryDate}</span></p>
                                    <Button size="sm" variant="outline" className="mt-2 w-full">Record Delivery</Button>
                                </div>
                            </div>
                            <div>
                                <Label>Warranty Status</Label>
                                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-sm text-purple-800 flex flex-col gap-2">
                                    <p className="flex justify-between items-center"><span className="font-bold flex gap-2 items-center"><ShieldCheck size={14} /> Coating Warranty</span> <span>1 Year</span></p>
                                    <p className="text-xs opacity-70">Expires: {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {activeTab === "QC & History" && (
                <QCPanel job={job} />
            )}
        </DetailView>
    );
}

function QCPanel({ job }: { job: LabJob }) {
    return (
        <div className="space-y-6">
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-slate-800">QC Checklist</h4>
                    <Badge variant={job.status === "QC_Failed" ? "error" : job.status === "Ready" ? "success" : "neutral"}>
                        {job.status === "QC_Failed" ? "FAILED" : job.status === "Ready" ? "PASSED" : "PENDING"}
                    </Badge>
                </div>

                <div className="space-y-4">
                    {["Power Verification (OD/OS)", "Axis Alignment", "Surface Quality (Scratch-free)", "Fitting Integrity", "Hydrophobic Cleaning"].map((check, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="font-medium text-slate-700">{check}</span>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50">Fail</Button>
                                <Button size="sm" variant="ghost" className="text-emerald-500 hover:bg-emerald-50">Pass</Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Reject & Remake</Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/30">Approve & Dispatch</Button>
                </div>
            </Card>
        </div>
    );
}
