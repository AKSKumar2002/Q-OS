import * as React from "react";
import { ListView } from "../module-views";
import { Badge } from "../ui";
import { DB } from "../../core/data";
import { LabJob } from "../../core/schema";

export function LabJobsList({ filter, onView }: { filter?: string, onView: (job: LabJob) => void }) {
    const allJobs = DB.labJobs || [];
    let displayJobs = allJobs;

    if (filter === "issue") {
        displayJobs = allJobs.filter((j: LabJob) => j.redoCount > 0);
    }

    const columns = [
        { key: "jobId", label: "Job ID", render: (v: any) => <span className="font-bold text-[#667EEA]">{v}</span> },
        {
            key: "priority", label: "Priority", render: (v: any) =>
                v === "Urgent" ? <Badge variant="error" className="animate-pulse">{v}</Badge> :
                    v === "High" ? <Badge variant="warning">{v}</Badge> :
                        <Badge variant="neutral">{v}</Badge>
        },
        { key: "patientId", label: "Patient", render: (id: string) => DB.patients.find(p => p.id === id)?.fullName || id },
        {
            key: "lensDetails", label: "Lens Info", render: (v: any) =>
                <div className="flex flex-col text-xs">
                    <span className="font-bold">{v.type}</span>
                    <span className="text-slate-500">{v.coating.join(", ")}</span>
                </div>
        },
        {
            key: "status", label: "Stage", render: (v: string) => {
                const stageColors: Record<string, "info" | "success" | "warning" | "error" | "neutral"> = {
                    "New": "info",
                    "In_Lab": "warning",
                    "QC_Pending": "warning",
                    "Ready": "success",
                    "Delivered": "success",
                    "QC_Failed": "error"
                };
                return <Badge variant={stageColors[v] || "neutral"}>{v.replace("_", " ")}</Badge>;
            }
        },
        { key: "targetDeliveryDate", label: "Due Date", render: (d: string) => <span className="font-mono text-xs">{d}</span> },
    ];

    return (
        <ListView
            title={filter === "issue" ? "Remakes & Issues" : "Lab Jobs"}
            data={displayJobs}
            columns={columns}
            onCreate={() => console.log("Create Job")}
            onView={onView}
        />
    );
}
