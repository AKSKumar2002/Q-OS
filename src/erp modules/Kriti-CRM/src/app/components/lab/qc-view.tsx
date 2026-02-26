import * as React from "react";
import { ListView, DetailView } from "../module-views";
import { Card, Badge, Button, Input, Label, PrescriptionGrid } from "../ui";
import { DB } from "../../core/data";
import { LabJob } from "../../core/schema";
import { CheckCircle2, XCircle, RotateCcw, UserCheck, Ruler } from "lucide-react";

export function QCView() {
    const [selectedJob, setSelectedJob] = React.useState<LabJob | null>(null);

    // Filter jobs that are ready for QC
    const qcJobs = DB.labJobs.filter((j: any) => j.status === "QC_Pending" || j.status === "Surfacing" /* Mocking simpler flow */);

    const columns = [
        { key: "jobId", label: "Job ID", render: (v: any) => <span className="font-bold text-[#667EEA]">{v}</span> },
        { key: "technicianId", label: "Technician" },
        { key: "lensDetails", label: "Lens Type", render: (v: any) => v.type },
        { key: "status", label: "Status", render: (v: any) => <Badge variant="warning">Ready for QC</Badge> },
    ];

    if (selectedJob) {
        return (
            <QCDetailView
                job={selectedJob}
                onBack={() => setSelectedJob(null)}
                onComplete={() => setSelectedJob(null)}
            />
        );
    }

    return (
        <ListView
            title="Quality Control Queue"
            data={qcJobs}
            columns={columns}
            onCreate={() => { }} // No create here, jobs flow in
            onView={(job: any) => setSelectedJob(job)}
        />
    );
}

function QCDetailView({ job, onBack, onComplete }: { job: LabJob, onBack: () => void, onComplete: () => void }) {
    const [checklist, setChecklist] = React.useState({
        power: false,
        axis: false,
        scratch: false,
        fitting: false,
        cleaning: false
    });
    const [notes, setNotes] = React.useState("");

    const allChecked = Object.values(checklist).every(Boolean);

    const handleCheck = (key: keyof typeof checklist) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="flex h-full gap-6">
            <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                <div className="flex items-center gap-4 mb-4">
                    <Button variant="ghost" onClick={onBack}>Back</Button>
                    <h2 className="text-2xl font-black text-slate-800">QC Inspection: {job.jobId}</h2>
                </div>

                <Card className="p-6">
                    <h4 className="font-bold text-slate-800 mb-4">Job Specification</h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <Label>Patient</Label>
                            <p className="font-bold">{DB.patients.find(p => p.id === job.patientId)?.fullName}</p>
                        </div>
                        <div>
                            <Label>Technician</Label>
                            <p className="font-bold">{job.technicianId}</p>
                        </div>
                    </div>
                    <PrescriptionGrid data={job.prescription} />
                </Card>

                <Card className="p-6 bg-red-50 border-red-100">
                    <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                        <RotateCcw size={18} />
                        Remake History
                    </h4>
                    {job.redoCount > 0 ? (
                        <p className="text-sm text-red-600">This job has been remade {job.redoCount} times.</p>
                    ) : (
                        <p className="text-sm text-red-600/60">No previous remakes.</p>
                    )}
                </Card>
            </div>

            <div className="w-96 shrink-0">
                <Card className="h-full flex flex-col p-6 shadow-xl border-t-4 border-t-[#667EEA]">
                    <div className="mb-6">
                        <h3 className="text-xl font-black text-slate-800 mb-1">Inspection Checklist</h3>
                        <p className="text-sm text-slate-500">Verify all points before approval.</p>
                    </div>

                    <div className="flex-1 space-y-3">
                        <CheckItem
                            label="Power Verification"
                            desc="Correct Sphere, Cylinder, Axis"
                            checked={checklist.power}
                            onChange={() => handleCheck('power')}
                        />
                        <CheckItem
                            label="Axis Alignment"
                            desc="Within tolerance limit (+/- 2 deg)"
                            checked={checklist.axis}
                            onChange={() => handleCheck('axis')}
                        />
                        <CheckItem
                            label="Surface Quality"
                            desc="No scratches, pits, or waves"
                            checked={checklist.scratch}
                            onChange={() => handleCheck('scratch')}
                        />
                        <CheckItem
                            label="Frame Fitting"
                            desc="Lens sits tight, no gaps"
                            checked={checklist.fitting}
                            onChange={() => handleCheck('fitting')}
                        />
                        <CheckItem
                            label="Final Cleaning"
                            desc="Hydrophobic coating check"
                            checked={checklist.cleaning}
                            onChange={() => handleCheck('cleaning')}
                        />
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                        <div>
                            <Label>Inspector Notes</Label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                placeholder="Add comments if failed..."
                                value={notes}
                                onChange={(e: any) => setNotes(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 gap-2">
                                <XCircle size={18} />
                                Fail & Redo
                            </Button>
                            <Button
                                className={`gap-2 text-white shadow-lg transition-all ${allChecked ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30" : "bg-slate-300 cursor-not-allowed"}`}
                                disabled={!allChecked}
                                onClick={() => {
                                    alert("QC Passed! Job marked as Ready.");
                                    onComplete();
                                }}
                            >
                                <CheckCircle2 size={18} />
                                Approve
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function CheckItem({ label, desc, checked, onChange }: { label: string, desc: string, checked: boolean, onChange: () => void }) {
    return (
        <div
            onClick={onChange}
            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${checked ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-200 hover:border-[#667EEA]"
                }`}
        >
            <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 text-transparent"
                }`}>
                <CheckCircle2 size={12} fill="currentColor" />
            </div>
            <div>
                <p className={`font-bold text-sm ${checked ? "text-emerald-900" : "text-slate-700"}`}>{label}</p>
                <p className="text-[10px] text-slate-400">{desc}</p>
            </div>
        </div>
    );
}
