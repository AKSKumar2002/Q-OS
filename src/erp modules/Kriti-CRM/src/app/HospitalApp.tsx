import * as React from "react";
import { motion } from "motion/react";
import { Layout } from "./components/layout";
import { DB, LEGACY_DATA } from "./core/data";
import { ModuleId, HOSPITAL_NAVIGATION_STRUCTURE } from "./types";
import { Dashboard } from "./components/dashboard";
import { ListView, FormView, DetailView } from "./components/module-views";
import { Badge, Input, Label, Card, Button, PrescriptionGrid, Receipt } from "./components/ui";
import { Login } from "./components/login";
import {
    Users, Calendar, Stethoscope, CreditCard, Activity, Package, Wrench, CheckCircle2,
    BarChart3, Settings, Plus, Printer, ChevronLeft
} from "lucide-react";

interface AppProps {
    onBackToWorkspace?: () => void;
    initialUser?: { name: string; role: string } | null;
    skipLoader?: boolean;
}

export default function HospitalApp({ onBackToWorkspace, initialUser, skipLoader = false }: AppProps) {
    const [activeModule, setActiveModule] = React.useState<ModuleId>("patient-management");
    const [viewState, setViewState] = React.useState<"list" | "create" | "detail" | "receipt" | "kanban">("list");
    const [selectedItem, setSelectedItem] = React.useState<any>(null);
    const [activeTab, setActiveTab] = React.useState("Overview");

    // --- AUTHENTICATION STATE ---
    const [user, setUser] = React.useState<{ name: string; role: string } | null>(initialUser || null);
    const [isAuthLoading, setIsAuthLoading] = React.useState(!skipLoader);

    React.useEffect(() => {
        if (!initialUser) {
            const savedUser = localStorage.getItem("hospital_user");
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        }

        if (!skipLoader) {
            setTimeout(() => {
                setIsAuthLoading(false);
            }, 3000);
        }
    }, [initialUser, skipLoader]);

    const handleLogin = (username: string) => {
        const userData = { name: username, role: "Doctor" };
        setUser(userData);
        localStorage.setItem("hospital_user", JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("hospital_user");
    };

    // --- MOCK DATA ---
    const MOCK_DATA: any = {
        ...LEGACY_DATA,
        "patient-management": DB.patients,
        "billing": [
            { id: "INV-001", patient: "John Doe", total: 1500, paid: 1500, due: 0, status: "Paid" },
            { id: "INV-002", patient: "Jane Smith", total: 2500, paid: 1000, due: 1500, status: "Partial" },
        ],
        "waiting-room": [
            { id: "WR-001", token: "A-12", patient: "John Doe", doctor: "Dr. Sharma", status: "Waiting", time: "10:15 AM", waitTime: "15m" },
            { id: "WR-002", token: "A-13", patient: "Alice Brown", doctor: "Dr. Verma", status: "In Consultation", time: "10:30 AM", waitTime: "5m" },
            { id: "WR-003", token: "B-05", patient: "Rahul Gupta", doctor: "Dr. Sharma", status: "Completed", time: "09:45 AM", waitTime: "20m" },
        ],
        "doctor-schedule": [
            { id: "SCH-001", doctor: "Dr. Sharma", day: "Monday", shift: "Morning", time: "09:00 AM - 01:00 PM", status: "Available" },
            { id: "SCH-002", doctor: "Dr. Verma", day: "Monday", shift: "Evening", time: "04:00 PM - 08:00 PM", status: "Available" },
        ],
        "clinical-templates": [
            { id: "TMP-001", name: "Standard Vision Test", type: "Examination", createdBy: "Dr. Sharma" },
            { id: "TMP-002", name: "Cataract Pre-Op", type: "Procedure", createdBy: "Dr. Sharma" },
            { id: "TMP-003", name: "Myopia Control", type: "Prescription", createdBy: "Dr. Verma" },
        ],
        "audit-logs": [
            { id: "LOG-001", action: "Updated Patient Record", user: "Dr. Sharma", target: "John Doe", timestamp: "2026-02-19 10:45 AM" },
            { id: "LOG-002", action: "Deleted Appointment", user: "Receptionist", target: "APT-105", timestamp: "2026-02-19 09:30 AM" },
        ],
        "appointments": [
            { id: "APT-101", patient: "John Doe", doctor: "Dr. Sharma", date: "2026-02-20", time: "10:00 AM", status: "Scheduled" },
            { id: "APT-102", patient: "Alice Brown", doctor: "Dr. Verma", date: "2026-02-20", time: "11:30 AM", status: "Waiting" },
        ],
        "opd": [
            { id: "OPD-501", patient: "John Doe", doctor: "Dr. Sharma", diagnosis: "Myopia", date: "2026-02-19" },
        ]
    };

    // --- RENDER HELPERS ---
    const renderList = (module: ModuleId) => {
        const data = MOCK_DATA[module] || [];
        let columns: any[] = [];

        switch (module) {
            case "patient-management":
                columns = [
                    { key: "mrn", label: "Patient ID", render: (v: any) => <span className="font-bold text-[#667EEA]">{v}</span> },
                    { key: "fullName", label: "Name", render: (v: any) => <span className="font-semibold">{v}</span> },
                    { key: "phone", label: "Phone" },
                    { key: "gender", label: "Gender", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                    { key: "lastVisitDate", label: "Last Visit" },
                    { key: "isActive", label: "Status", render: (v: any) => <Badge variant={v ? "success" : "neutral"}>{v ? 'Active' : 'Inactive'}</Badge> },
                ];
                break;
            case "appointments":
                columns = [
                    { key: "id", label: "ID", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "patient", label: "Patient" },
                    { key: "doctor", label: "Doctor" },
                    { key: "date", label: "Date" },
                    { key: "time", label: "Time" },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Scheduled" ? "info" : "warning"}>{v}</Badge> },
                ];
                break;
            case "opd":
                columns = [
                    { key: "id", label: "OPD ID", render: (v: any) => <span className="font-bold text-[#667EEA]">{v}</span> },
                    { key: "patient", label: "Patient" },
                    { key: "doctor", label: "Doctor" },
                    { key: "diagnosis", label: "Diagnosis" },
                    { key: "date", label: "Date" },
                ];
                break;
            case "billing":
                columns = [
                    { key: "id", label: "Invoice ID", render: (v: any) => <span className="font-bold text-[#667EEA]">{v}</span> },
                    { key: "patient", label: "Patient" },
                    { key: "total", label: "Total", render: (v: any) => <span className="font-bold">₹{v}</span> },
                    { key: "paid", label: "Paid", render: (v: any) => <span className="text-emerald-600">₹{v}</span> },
                    { key: "due", label: "Due", render: (v: any) => <span className="text-red-500">₹{v}</span> },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Paid" ? "success" : "warning"}>{v}</Badge> },
                ];
                break;
            case "waiting-room":
                columns = [
                    { key: "token", label: "Token", render: (v: any) => <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">{v}</div> },
                    { key: "patient", label: "Patient", render: (v: any) => <span className="font-bold text-lg">{v}</span> },
                    { key: "doctor", label: "Doctor" },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Waiting" ? "warning" : v === "In Consultation" ? "info" : "success"}>{v}</Badge> },
                    { key: "waitTime", label: "Wait Time", render: (v: any) => <span className="text-red-500 font-bold">{v}</span> },
                ];
                break;
            case "doctor-schedule":
                columns = [
                    { key: "doctor", label: "Doctor", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "day", label: "Day" },
                    { key: "shift", label: "Shift" },
                    { key: "time", label: "Time Slot" },
                    { key: "status", label: "Status", render: (v: any) => <Badge variant="success">{v}</Badge> },
                ];
                break;
            case "clinical-templates":
                columns = [
                    { key: "name", label: "Template Name", render: (v: any) => <span className="font-semibold">{v}</span> },
                    { key: "type", label: "Type", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
                    { key: "createdBy", label: "Created By" },
                ];
                break;
            case "audit-logs":
                columns = [
                    { key: "timestamp", label: "Time", render: (v: any) => <span className="text-xs font-mono">{v}</span> },
                    { key: "user", label: "User", render: (v: any) => <span className="font-bold">{v}</span> },
                    { key: "action", label: "Action" },
                    { key: "target", label: "Target" },
                ];
                break;
            default:
                columns = [
                    { key: "id", label: "ID" },
                    { key: "name", label: "Name" },
                ];
        }

        return (
            <ListView
                title={module.replace(/-/g, " ").toUpperCase()}
                data={data}
                columns={columns}
                onCreate={() => setViewState("create")}
                onView={(item: any) => {
                    setSelectedItem(item);
                    setViewState("detail");
                }}
            />
        );
    };

    const renderCreateForm = (module: ModuleId) => {
        return (
            <FormView
                title={`New ${module.replace("-", " ")}`}
                onCancel={() => setViewState("list")}
                onSave={() => setViewState("list")}
            >
                <div className="space-y-4">
                    <Label>Patient Name</Label>
                    <Input placeholder="Enter patient name..." />
                    <Label>Date</Label>
                    <Input type="date" />
                </div>
            </FormView>
        );
    };

    const renderDetail = (module: ModuleId) => {
        if (!selectedItem) return null;
        return (
            <DetailView
                title={selectedItem.fullName || selectedItem.patient || selectedItem.id}
                subtitle={`${module} Record`}
                status={selectedItem.status}
                tabs={["Overview", "Documents", "History"]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onBack={() => setViewState("list")}
                sidebarContent={
                    <div className="space-y-4">
                        <Button className="w-full gap-2" variant="outline" onClick={() => alert("Printing Record...")}>Print Record</Button>
                        {module === "opd" && (
                            <Button className="w-full gap-2 bg-[#764BA2] hover:bg-[#664091] text-white" onClick={() => alert("Prescription sent to Optical Lab!")}>
                                Send to Lab
                            </Button>
                        )}
                    </div>
                }
            >
                <div className="space-y-6">
                    {activeTab === "Overview" && (
                        <>
                            <Card className="p-6">
                                <h4 className="font-bold text-slate-800 mb-4">Core Information</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col"><span className="text-[10px] uppercase text-slate-400 font-bold">Patient</span><span className="font-bold">{selectedItem.patient || selectedItem.fullName}</span></div>
                                    <div className="flex flex-col"><span className="text-[10px] uppercase text-slate-400 font-bold">Doctor</span><span className="font-bold">{selectedItem.doctor || "Unassigned"}</span></div>
                                    <div className="flex flex-col"><span className="text-[10px] uppercase text-slate-400 font-bold">Date</span><span className="font-bold">{selectedItem.date || "Today"}</span></div>
                                    {module === "patient-management" && <div className="flex flex-col"><span className="text-[10px] uppercase text-slate-400 font-bold">Branch</span><span className="font-bold">Main Hospital</span></div>}
                                    {module === "patient-management" && <div className="flex flex-col"><span className="text-[10px] uppercase text-slate-400 font-bold">No-Show Rate</span><span className="font-bold text-red-500">2%</span></div>}
                                </div>
                            </Card>

                            {module === "opd" && (
                                <>
                                    <Card className="p-6">
                                        <h4 className="font-bold text-slate-800 mb-4">Vision & Prescription</h4>
                                        <PrescriptionGrid />
                                    </Card>

                                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <div>
                                            <p className="font-bold text-blue-900">Recommended Follow-up</p>
                                            <p className="text-xs text-blue-700">System suggests review in 15 days based on diagnosis.</p>
                                        </div>
                                        <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 bg-white">Schedule Now</Button>
                                    </div>
                                </>
                            )}

                            <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                <pre className="text-xs text-slate-500">{JSON.stringify(selectedItem, null, 2)}</pre>
                            </div>
                        </>
                    )}

                    {activeTab === "Documents" && (
                        <div className="space-y-4">
                            <Card className="p-6 border-dashed border-2 border-slate-200 bg-slate-50 flex flex-col items-center justify-center min-h-[150px] cursor-pointer hover:bg-slate-100 transition-colors">
                                <Plus className="text-slate-400 mb-2" />
                                <p className="text-sm font-bold text-slate-500">Upload Consent Form or Scan</p>
                            </Card>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center font-bold">PDF</div>
                                    <div>
                                        <p className="text-sm font-bold">LASIK_Consent_Signed.pdf</p>
                                        <p className="text-xs text-slate-400">Uploaded 2 days ago</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">View</Button>
                            </div>
                        </div>
                    )}

                    {activeTab === "History" && (
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Audit Trail</p>
                            <div className="border-l-2 border-slate-200 pl-4 py-1">
                                <p className="text-sm font-bold text-slate-800">Record Updated</p>
                                <p className="text-xs text-slate-500">By Dr. Sharma • 2 hours ago</p>
                            </div>
                            <div className="border-l-2 border-slate-200 pl-4 py-1">
                                <p className="text-sm font-bold text-slate-800">Created</p>
                                <p className="text-xs text-slate-500">By Reception • 2 days ago</p>
                            </div>
                        </div>
                    )}
                </div>
            </DetailView>
        );
    };

    const renderContent = () => {
        if (activeModule === "hospital-reports") return <Dashboard />;

        if (viewState === "create") return renderCreateForm(activeModule);
        if (viewState === "detail") return renderDetail(activeModule);

        return renderList(activeModule);
    };

    if (isAuthLoading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#E06C75] text-white relative overflow-hidden">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center relative z-10">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Stethoscope size={72} className="mx-auto mb-4 text-white drop-shadow-xl" />
                    </motion.div>
                    <h1 className="text-5xl font-black tracking-widest uppercase mb-1">HOSPITAL</h1>
                    <p className="text-sm font-bold opacity-70 tracking-[0.6em] uppercase">Healthcare Workflow OS</p>
                    <div className="mt-12 flex items-center gap-2 justify-center opacity-40">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                </motion.div>
                <div className="absolute inset-0 bg-white/5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>
        );
    }

    if (!user) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <Layout
            activeModule={activeModule}
            setActiveModule={(id) => {
                setActiveModule(id);
                setViewState("list");
            }}
            onLogout={handleLogout}
            onBackToWorkspace={onBackToWorkspace}
            user={user}
            navigation={HOSPITAL_NAVIGATION_STRUCTURE}
        >
            {renderContent()}
        </Layout>
    );
}
