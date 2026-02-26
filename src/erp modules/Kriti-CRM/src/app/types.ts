import * as React from "react";
import {
  Users,
  Calendar,
  Stethoscope,
  CreditCard,
  FlaskConical,
  Package,
  Settings,
  BarChart3,
  Briefcase,
  Truck,
  GraduationCap,
  LayoutDashboard,
  Zap,
  Smartphone,
  MessageSquare,
  Building2,
  AlertTriangle,
  History,
  HardDrive,
  UserCheck,
  Wrench,
  Dna,
  CheckCircle2,
  FileClock,
  Wallet,
  UserPlus,
  Target,
  Clock,
  TrendingUp,
  Activity,
  Award,
  ClipboardCheck,
  ShieldCheck
} from "lucide-react";

export type ModuleId =
  | "patient-management"
  | "appointments"
  | "opd"
  | "billing"
  | "pharmacy"
  | "lab-jobs"
  | "technicians"
  | "machines"
  | "consumables"
  | "qc-checklist"
  | "remake-tickets"
  | "calibration-logs"
  | "vendors"
  | "training-records"
  | "payroll"
  | "staff"
  | "franchise"
  | "marketing"
  | "accounting"
  | "dashboard"
  | "automation"
  | "integrations"
  | "mobile-app"
  | "crm-leads"
  | "crm-lead-capture" // New
  | "crm-opportunities"
  | "crm-followups"
  | "crm-followup-mgmt" // New
  | "crm-lifecycle"
  | "crm-retention" // New
  | "crm-campaigns"
  | "crm-conversion"
  | "crm-reports"
  | "crm-revenue" // New
  | "crm-automation"
  | "crm-settings"
  | "crm-dashboard"
  | "medical-records"
  | "waiting-room" // New
  | "hospital-procedures"
  | "doctor-schedule" // New
  | "clinical-templates" // New
  | "insurance"
  | "audit-logs" // New
  | "lab-dashboard"
  | "lab-jobs"
  | "lab-production"
  | "lab-qc"
  | "lab-remakes"
  | "lab-technicians"
  | "lab-machines"
  | "lab-inventory"
  | "lab-delivery"
  | "lab-reports"
  | "lab-settings"
  | "lab-transfers"
  | "lab-batch"
  | "lab-warranty"
  | "hospital-reports"
  | "hospital-settings";

export interface NavItem {
  id: ModuleId;
  label: string;
  icon: any;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const NAVIGATION_STRUCTURE: NavGroup[] = [
  {
    title: "CRM Management and Marketing",
    items: [
      { id: "crm-leads", label: "Leads", icon: UserPlus },
      { id: "crm-opportunities", label: "Pipeline", icon: Target },
      { id: "crm-followups", label: "Tasks", icon: Clock },
      { id: "crm-conversion", label: "Conversion", icon: CheckCircle2 },
      { id: "crm-lifecycle", label: "Customers", icon: Users },
      { id: "crm-campaigns", label: "Campaigns", icon: Award },
      { id: "crm-reports", label: "Reports", icon: BarChart3 },
      { id: "crm-automation", label: "Automation", icon: Zap },
      { id: "crm-settings", label: "Settings", icon: Settings },
    ]
  }
];

export const HOSPITAL_NAVIGATION_STRUCTURE: NavGroup[] = [
  {
    title: "Core Operations",
    items: [
      { id: "waiting-room", label: "Queue / Waiting", icon: Clock },
      { id: "patient-management", label: "Patients", icon: Users },
      { id: "appointments", label: "Appointments", icon: Calendar },
      { id: "opd", label: "OPD / Consultation", icon: Stethoscope },
      { id: "medical-records", label: "Medical Records", icon: Activity },
    ]
  },
  {
    title: "Billing & Administration",
    items: [
      { id: "billing", label: "Billing", icon: CreditCard },
      { id: "pharmacy", label: "Pharmacy", icon: Package },
      { id: "hospital-procedures", label: "Procedures", icon: Wrench },
      { id: "insurance", label: "Insurance / TPA", icon: CheckCircle2 },
    ]
  },
  {
    title: "Management",
    items: [
      { id: "doctor-schedule", label: "Doctor Schedule", icon: UserCheck },
      { id: "clinical-templates", label: "Clinical Templates", icon: ClipboardCheck },
      { id: "hospital-reports", label: "Reports", icon: BarChart3 },
      { id: "audit-logs", label: "Audit Logs", icon: FileClock },
      { id: "hospital-settings", label: "Settings", icon: Settings },
    ]
  }
];

export const OPTICAL_LAB_NAVIGATION_STRUCTURE: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { id: "lab-dashboard", label: "Dashboard", icon: LayoutDashboard },
    ]
  },
  {
    title: "Production & Quality",
    items: [
      { id: "lab-jobs", label: "All Jobs", icon: Briefcase },
      { id: "lab-production", label: "Production Floor", icon: Wrench },
      { id: "lab-qc", label: "Quality Control", icon: CheckCircle2 },
      { id: "lab-remakes", label: "Remakes & Errors", icon: AlertTriangle },
    ]
  },
  {
    title: "Enterprise Features",
    items: [
      { id: "lab-transfers", label: "Inter-Branch Transfer", icon: Truck },
      { id: "lab-batch", label: "Batch Processing", icon: Package },
      { id: "lab-warranty", label: "Warranty Claims", icon: ShieldCheck },
    ]
  },
  {
    title: "Resources",
    items: [
      { id: "lab-technicians", label: "Technicians", icon: Users },
      { id: "lab-machines", label: "Machines", icon: HardDrive },
      { id: "lab-inventory", label: "Consumables", icon: Package },
    ]
  },
  {
    title: "Logistics",
    items: [
      { id: "lab-delivery", label: "Delivery", icon: Truck },
      { id: "lab-reports", label: "Reports", icon: BarChart3 },
      { id: "lab-settings", label: "Settings", icon: Settings },
    ]
  }
];