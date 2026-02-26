import * as React from "react";
import { motion } from "motion/react";
import { Layout } from "./components/layout";
import { DB, LEGACY_DATA } from "./core/data";
import { ModuleId } from "./types";
import { Dashboard } from "./components/dashboard";
import { CRMDashboard } from "./components/crm-dashboard";
import { ListView, FormView, DetailView } from "./components/module-views";
import { Badge, Input, Label, Avatar, Card, Button, PrescriptionGrid, Receipt } from "./components/ui";
import {
  KanbanBoard,
  ActivityTimeline,
  LifecycleBadge,
  ProbabilityIndicator,
  QuickActions,
  FollowUpCard,
  ConversionFunnel,
  CampaignWidget
} from "./components/crm-components";
import { JobCardsView } from "./components/crm-job-cards";
import { Login } from "./components/login";
import {
  User, Phone, Mail, MapPin, Calendar, Clock, FileText, Activity, CheckCircle2,
  AlertCircle, Stethoscope, FlaskConical, CreditCard, History, HardDrive, Dna,
  Truck, GraduationCap, Wallet, Briefcase, Building2, MessageSquare, BarChart3,
  Zap, Settings, Smartphone, Plus, Search, Filter, Download, MoreVertical,
  ChevronLeft, Trash2, Printer, Share2, Eye, UserPlus, Target, TrendingUp
} from "lucide-react";

interface AppProps {
  onBackToWorkspace?: () => void;
  initialUser?: { name: string; role: string } | null;
  skipLoader?: boolean;
}

export default function App({ onBackToWorkspace, initialUser, skipLoader = false }: AppProps) {
  const [activeModule, setActiveModule] = React.useState<ModuleId>("crm-dashboard");
  const [viewState, setViewState] = React.useState<"list" | "create" | "detail" | "receipt" | "kanban">("list");
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [activeTab, setActiveTab] = React.useState("Overview");

  // --- AUTHENTICATION STATE ---
  const [user, setUser] = React.useState<{ name: string; role: string } | null>(initialUser || null);
  const [isAuthLoading, setIsAuthLoading] = React.useState(!skipLoader);

  React.useEffect(() => {
    if (!initialUser) {
      const savedUser = localStorage.getItem("crm_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }

    if (!skipLoader) {
      // Artificial delay to show the premium splash screen
      setTimeout(() => {
        setIsAuthLoading(false);
      }, 4000);
    }
  }, [initialUser, skipLoader]);

  const handleLogin = (username: string) => {
    const userData = { name: username, role: "Super Admin" };
    setUser(userData);
    localStorage.setItem("crm_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("crm_user");
  };

  // --- DATA REPOSITORY (Enterprise Engine) ---
  const MOCK_DATA: any = {
    ...LEGACY_DATA,
    "patient-management": DB.patients,
    "lab-jobs": DB.labJobs,
    "crm-leads": DB.leads,
    "crm-opportunities": DB.opportunities,
    "crm-campaigns": DB.campaigns,
    "crm-job-cards": DB.jobCards,
  };

  // --- RELATIONSHIP RESOLVERS ---
  const getPatientName = (id: string) => DB.patients.find(p => p.id === id)?.fullName || id;
  const getLeadName = (id: string) => DB.leads.find(l => l.id === id)?.fullName || id;

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
          { key: "lifecycleStage", label: "Lifecycle", render: (v: any) => v ? <LifecycleBadge stage={v} /> : null },
          { key: "isActive", label: "Status", render: (v: any) => <Badge variant={v ? "success" : "neutral"}>{v ? 'Active' : 'Inactive'}</Badge> },
        ];
        break;
      case "lab-jobs":
        columns = [
          { key: "jobId", label: "Job ID", render: (v: any) => <span className="font-bold text-[#667EEA]">{v}</span> },
          { key: "patientId", label: "Patient", render: (id: string) => getPatientName(id) },
          { key: "lensDetails", label: "Lens Type", render: (v: any) => v?.type },
          { key: "status", label: "Status", render: (v: any) => <Badge variant={v === "Ready" || v === "Delivered" ? "success" : "warning"}>{v}</Badge> },
          { key: "priority", label: "Priority", render: (v: any) => <Badge variant={v === "High" ? "error" : "info"}>{v}</Badge> },
          { key: "createdAt", label: "Created", render: (v: string) => v.split('T')[0] },
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

      // --- CRM MODULES ---
      case "crm-leads":
        columns = [
          { key: "id", label: "Lead ID", render: (v: any) => <span className="font-bold text-[#667EEA]">{v.substring(0, 8)}</span> },
          { key: "fullName", label: "Name", render: (v: any) => <span className="font-semibold">{v}</span> },
          { key: "phone", label: "Phone" },
          { key: "source", label: "Source", render: (v: any) => <Badge variant="info">{v}</Badge> },
          { key: "interest", label: "Service", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
          {
            key: "status", label: "Status", render: (v: any) => {
              const variant = v === "Converted" ? "success" : v === "New" ? "info" : v === "Lost" ? "error" : "warning";
              return <Badge variant={variant}>{v}</Badge>;
            }
          },
          { key: "leadScore", label: "Score", render: (v: any) => <span className="font-bold">{v}</span> },
          { key: "ownerId", label: "Assigned To" },
        ];
        break;

      case "crm-followups":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Follow-ups</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="error" className="shadow-sm">{data.filter((t: any) => t.status === "Overdue").length} Overdue</Badge>
                  <Badge variant="warning" className="shadow-sm">{data.filter((t: any) => t.status === "Pending").length} Pending</Badge>
                  <Badge variant="success" className="shadow-sm">{data.filter((t: any) => t.status === "Completed").length} Done</Badge>
                </div>
              </div>
              <Button onClick={() => setViewState("create")} className="gap-2 h-12 px-6 rounded-2xl shadow-lg shadow-[#667EEA]/20">
                <Plus size={18} />
                New Follow-up
              </Button>
            </div>
            <div className="space-y-4">
              {data.map((task: any) => (
                <FollowUpCard
                  key={task.id}
                  task={task}
                  onComplete={() => console.log("Complete", task.id)}
                />
              ))}
            </div>
          </div>
        );

      case "crm-lifecycle":
        columns = [
          { key: "id", label: "Lifecycle ID", render: (v: any) => <span className="font-bold text-[#667EEA]">{v}</span> },
          { key: "name", label: "Customer Name", render: (v: any) => <span className="font-semibold">{v}</span> },
          { key: "patientId", label: "Patient ID" },
          { key: "stage", label: "Lifecycle Stage", render: (v: any) => <LifecycleBadge stage={v} tooltip={getLifecycleTooltip(v)} /> },
          { key: "visitCount", label: "Visits", render: (v: any) => <span className="font-bold">{v}</span> },
          { key: "revenue", label: "Total Revenue", render: (v: any) => <span className="font-bold text-emerald-600">₹{v.toLocaleString()}</span> },
          { key: "lastUpdate", label: "Last Update" },
        ];
        break;

      case "crm-campaigns":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Campaigns</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="success" className="shadow-sm">{data.filter((c: any) => c.status === "Active").length} Live</Badge>
                  <Badge variant="neutral" className="shadow-sm">{data.filter((c: any) => c.status === "Completed").length} Finished</Badge>
                </div>
              </div>
              <Button onClick={() => setViewState("create")} className="gap-2 h-12 px-6 rounded-2xl shadow-lg shadow-[#667EEA]/20">
                <Plus size={18} />
                New Campaign
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((campaign: any) => (
                <CampaignWidget
                  key={campaign.id}
                  campaign={campaign}
                />
              ))}
            </div>
          </div>
        );

      default:
        columns = [
          { key: "id", label: "ID" },
          { key: "name", label: "Name", render: (v: any, item: any) => <span>{v || item.id}</span> },
          { key: "status", label: "Status", render: (v: any) => <Badge variant="neutral">{v}</Badge> },
        ];
    }

    return (
      <ListView
        title={activeModule.replace(/-/g, " ").toUpperCase()}
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

  // Helper function for lifecycle tooltips
  const getLifecycleTooltip = (stage: string) => {
    const tooltips: any = {
      "Prospect": "New lead, no visit yet",
      "Active Patient": "Regular visits within 6 months",
      "Dormant": "No visit in 6+ months",
      "Repeat Customer": "Multiple purchases/visits",
      "VIP": "High-value customer, premium services"
    };
    return tooltips[stage] || "";
  };

  const renderCreateForm = (module: ModuleId) => {
    return (
      <FormView
        title={module.replace("-", " ").toUpperCase()}
        onCancel={() => setViewState("list")}
        onSave={() => setViewState("list")}
      >
        {module === "lab-jobs" ? (
          <>
            <div className="space-y-4">
              <Label>Patient Information</Label>
              <Input placeholder="Select Patient..." />
              <Label>Lens Type</Label>
              <Input placeholder="Progressive, SV, etc." />
            </div>
            <div className="space-y-4">
              <Label>Priority</Label>
              <Input placeholder="High / Normal / Low" />
              <Label>Estimated TAT</Label>
              <Input type="date" />
            </div>
            <div className="col-span-full">
              <Label>Prescription (OD/OS)</Label>
              <PrescriptionGrid />
            </div>
          </>
        ) : module === "billing" ? (
          <>
            <div className="space-y-4">
              <Label>Customer Details</Label>
              <Input placeholder="Search Patient..." />
              <Label>Reference (Appt / Job ID)</Label>
              <Input placeholder="Select Reference..." />
            </div>
            <div className="space-y-4">
              <Label>Billing Date</Label>
              <Input type="date" />
              <Label>Payment Mode</Label>
              <Input placeholder="Cash / Card / UPI" />
            </div>
            <Card className="col-span-full p-4 bg-slate-50 border-dashed">
              <p className="text-xs text-center text-slate-400">Add Line Items Table Here (Dynamic Grid)</p>
            </Card>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <Label>Primary Name / ID</Label>
              <Input placeholder="Enter details..." />
              <Label>Category</Label>
              <Input placeholder="Select category..." />
            </div>
            <div className="space-y-4">
              <Label>Date</Label>
              <Input type="date" />
              <Label>Initial Status</Label>
              <Input placeholder="Set status..." />
            </div>
          </>
        )}
      </FormView>
    );
  };

  const renderDetail = (module: ModuleId) => {
    if (!selectedItem) return null;

    return (
      <DetailView
        title={selectedItem.fullName || selectedItem.name || selectedItem.jobId || selectedItem.id}
        subtitle={`${module.replace("-", " ")} record`}
        status={selectedItem.status}
        tabs={["Overview", "Activity", "Attachments", "History"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={() => setViewState("list")}
        sidebarContent={
          <div className="space-y-4">
            <Button className="w-full gap-2" variant="outline" onClick={() => setViewState("receipt")}>
              <Printer size={16} /> View Receipt
            </Button>
            <DetailRow label="ID" value={selectedItem.id} />
            <DetailRow label="Created By" value="Admin Staff" />
            <DetailRow label="Last Update" value="Just now" />
          </div>
        }
      >
        {activeTab === "Overview" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-bold text-slate-800 mb-4">Core Information</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedItem).map(([k, v]: any) => (
                  <DetailRow key={k} label={k.toUpperCase()} value={String(v)} />
                ))}
              </div>
            </Card>
            {module === "lab-jobs" && (
              <Card className="p-6">
                <h4 className="font-bold text-slate-800 mb-4">Prescription Summary</h4>
                <PrescriptionGrid />
              </Card>
            )}
          </div>
        )}
      </DetailView>
    );
  };

  const renderContent = () => {
    if (activeModule === "dashboard") return <Dashboard />;
    if (activeModule === "crm-reports") return <CRMDashboard />; // "Reports" -> Dashboard view
    if (activeModule === "crm-conversion") return (
      <div className="space-y-6">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Conversion Analytics</h2>
        <Card className="p-8">
          <ConversionFunnel stages={[
            { label: "Visitors", count: 1200, percentage: 100 },
            { label: "Leads", count: 450, percentage: 37.5 },
            { label: "Opportunities", count: 120, percentage: 26.6 },
            { label: "Customers", count: 85, percentage: 70.8 },
          ]} />
        </Card>
      </div>
    );
    if (activeModule === "crm-automation") return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <Zap size={64} className="mb-4 opacity-20" />
        <h3 className="text-xl font-bold">Automation Rules</h3>
        <p>Configure automated workflows here.</p>
      </div>
    );
    if (activeModule === "crm-settings") return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <Settings size={64} className="mb-4 opacity-20" />
        <h3 className="text-xl font-bold">CRM Settings</h3>
        <p>Manage pipelines, stages, and tags.</p>
      </div>
    );

    // Legacy Checklist Items Mapped to Views
    if (activeModule === "crm-revenue") return <CRMDashboard />;
    if (activeModule === "crm-lead-capture") return renderList("crm-leads");
    if (activeModule === "crm-followup-mgmt") return renderList("crm-followups");
    if (activeModule === "crm-retention") return renderList("crm-lifecycle");

    if (activeModule === "mobile-app") return <MobileModule />;

    // Special handling for Opportunities Kanban
    if (activeModule === "crm-opportunities" && viewState === "list") {
      return renderOpportunitiesKanban();
    }

    // Special handling for Lead Detail with Activity Timeline
    if ((activeModule === "crm-leads" || activeModule.startsWith("crm-")) && viewState === "detail" && selectedItem) {
      return renderCRMDetail(activeModule);
    }

    if (viewState === "receipt") {
      return (
        <div className="space-y-6">
          <Button variant="ghost" onClick={() => setViewState("detail")} className="gap-2">
            <ChevronLeft size={16} /> Back to Detail
          </Button>
          <Receipt data={{
            id: selectedItem?.id || "INV-000",
            date: "2023-11-25",
            patient: selectedItem?.patient || selectedItem?.name || "Customer",
            total: selectedItem?.total || 1200,
            items: [
              { desc: "Consultation Fee", qty: 1, total: 200 },
              { desc: "Optical Lab Job", qty: 1, total: 1000 },
            ]
          }} />
        </div>
      );
    }

    if (viewState === "create") return renderCreateForm(activeModule);
    if (viewState === "detail") return renderDetail(activeModule);

    return renderList(activeModule);
  };

  // Opportunities Kanban Board
  const renderOpportunitiesKanban = () => {
    const opps = MOCK_DATA["crm-opportunities"] || [];
    const stages = ["New", "Appointment", "Consultation", "Quotation", "Negotiation", "Won", "Lost"];

    const columns = stages.map(stage => ({
      id: stage,
      title: stage,
      color: stage === "Won" ? "bg-emerald-500" : stage === "Lost" ? "bg-red-500" : "bg-[#667EEA]",
      items: opps.filter((opp: any) => opp.stage === stage)
    }));

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Opportunity Pipeline</h2>
            <div className="flex items-center gap-4">
              <Badge variant="primary" className="bg-white/40 backdrop-blur-md shadow-sm">{opps.length} Active Deals</Badge>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Total Value</span>
                <span className="text-sm font-black text-emerald-700">₹{opps.reduce((sum: number, o: any) => sum + (o.value || 0), 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => setViewState("list")} className="gap-2 px-6 h-12 rounded-2xl border-white/60 bg-white/40 backdrop-blur-md">
              <MoreVertical size={18} />
              List View
            </Button>
            <Button onClick={() => setViewState("create")} className="gap-2 px-6 h-12 rounded-2xl shadow-lg shadow-[#667EEA]/20">
              <Plus size={18} />
              New Deal
            </Button>
          </div>
        </div>
        <KanbanBoard
          columns={columns}
          onCardClick={(item: any) => {
            setSelectedItem(item);
            setViewState("detail");
          }}
          onStageChange={(id: string, newStage: string) => {
            console.log("Move", id, "to", newStage);
          }}
        />
      </div>
    );
  };

  // CRM Detail View with Activity Timeline
  const renderCRMDetail = (module: ModuleId) => {
    if (!selectedItem) return null;

    // Activity Timeline Engine
    const activities = DB.activities
      .filter((a: any) => a.entityId === selectedItem.id)
      .map((a: any) => ({
        id: a.id,
        type: (a.type.includes('call') ? 'call' : a.type.includes('whatsapp') ? 'whatsapp' : 'note') as any,
        title: a.title,
        description: a.description,
        timestamp: a.createdAt.split('T')[0],
        user: a.actorId,
        metadata: a.meta
      }));

    return (
      <DetailView
        title={selectedItem.fullName || selectedItem.name || selectedItem.id}
        subtitle={`${module.replace(/-/g, " ")} record`}
        status={selectedItem.status || selectedItem.stage}
        tabs={["Overview", "Activity Timeline", "Opportunities", "History"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={() => setViewState("list")}
        sidebarContent={
          <div className="space-y-4">
            {module === "crm-leads" && (
              <QuickActions
                onCall={() => console.log("Call")}
                onWhatsApp={() => console.log("WhatsApp")}
                onConvert={() => console.log("Convert to Patient")}
              />
            )}
            <DetailRow label="ID" value={selectedItem.id} />
            {selectedItem.phone && <DetailRow label="Phone" value={selectedItem.phone} />}
            {selectedItem.email && <DetailRow label="Email" value={selectedItem.email} />}
            {selectedItem.probability && (
              <div className="py-2">
                <Label className="mb-2">Win Probability</Label>
                <ProbabilityIndicator probability={selectedItem.probability} />
              </div>
            )}
            {selectedItem.value && <DetailRow label="Opportunity Value" value={`₹${selectedItem.value.toLocaleString()}`} />}
            <DetailRow label="Created" value={selectedItem.createdDate || "2026-02-10"} />
            <DetailRow label="Assigned To" value={selectedItem.assignedTo || selectedItem.owner || "Admin"} />
          </div>
        }
      >
        {activeTab === "Overview" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-bold text-slate-800 mb-4">Core Information</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedItem).filter(([k]) => !["id", "notes", "metadata"].includes(k)).map(([k, v]: any) => (
                  <DetailRow key={k} label={k.toUpperCase()} value={String(v)} />
                ))}
              </div>
            </Card>
            {selectedItem.notes && (
              <Card className="p-6">
                <h4 className="font-bold text-slate-800 mb-4">Notes</h4>
                <p className="text-sm text-slate-600">{selectedItem.notes}</p>
              </Card>
            )}
          </div>
        )}
        {activeTab === "Activity Timeline" && (
          <Card className="p-6">
            <h4 className="font-bold text-slate-800 mb-6">360° Activity View</h4>
            <ActivityTimeline activities={activities} />
          </Card>
        )}
        {activeTab === "Opportunities" && module === "crm-leads" && (
          <Card className="p-6">
            <h4 className="font-bold text-slate-800 mb-4">Related Opportunities</h4>
            <div className="space-y-3">
              {DB.opportunities
                .filter((opp: any) => opp.leadId === selectedItem.id)
                .map((opp: any) => (
                  <div key={opp.id} className="p-4 border border-slate-200 rounded-lg flex items-center justify-between hover:border-[#667EEA] transition-colors cursor-pointer">
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">{opp.name}</h5>
                      <p className="text-xs text-slate-500">{opp.type} • ₹{opp.value.toLocaleString()}</p>
                    </div>
                    <Badge variant="warning">{opp.stage}</Badge>
                  </div>
                ))}
            </div>
          </Card>
        )}
      </DetailView>
    );
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#00A09D] text-white relative overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center relative z-10">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Target size={72} className="mx-auto mb-4 text-white drop-shadow-xl" />
          </motion.div>
          <h1 className="text-5xl font-black tracking-widest uppercase mb-1">CRM</h1>
          <p className="text-sm font-bold opacity-70 tracking-[0.6em] uppercase">Enterprise Growth OS</p>
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
    >
      {renderContent()}
    </Layout>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/20 last:border-0 hover:bg-white/10 px-2 rounded-lg transition-colors">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">{label}</span>
      <span className="text-sm font-bold text-slate-800">{value}</span>
    </div>
  );
}

function MobileModule() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-[320px] h-[640px] bg-slate-900 rounded-[3.5rem] p-3 border-[10px] border-slate-800 shadow-2xl overflow-hidden glass-panel shrink-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-3xl z-30" />
        <div className="h-full w-full bg-white/20 backdrop-blur-3xl rounded-[2.5rem] overflow-y-auto pt-10 px-5 custom-scrollbar relative border border-white/30">
          <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#667EEA] to-[#764BA2] flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-black">K</span>
            </div>
            <Avatar fallback="AU" size="md" className="border-2 border-white/50 shadow-sm" />
          </div>

          <h3 className="text-2xl font-black text-white mb-6 drop-shadow-md">Lab Sync</h3>

          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-5 glass-card border-none bg-white/10 shadow-lg group hover:bg-white/20 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">JOB-202{i}</span>
                  <Badge variant="warning" className="bg-amber-400/20 text-amber-200 border-none backdrop-blur-md">IN LAB</Badge>
                </div>
                <p className="text-lg font-black text-white">Patient Record {i}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Clock size={12} className="text-[#667EEA]" />
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">ETA: 48 HOURS</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 mb-6">
            <Button className="w-full gap-3 rounded-[1.5rem] py-8 text-lg shadow-2xl shadow-[#667EEA]/40 group">
              <span className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                <Plus size={20} />
              </span>
              Scan QR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}