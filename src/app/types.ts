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
  ClipboardCheck
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
  | "crm-opportunities"
  | "crm-followups"
  | "crm-lifecycle"
  | "crm-campaigns"
  | "crm-job-cards"
  | "crm-dashboard";

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
    title: "PILLAR 1 — HOSPITAL",
    items: [
      { id: "patient-management", label: "Patient Management", icon: Users },
      { id: "appointments", label: "Appointments & Scheduling", icon: Calendar },
      { id: "opd", label: "OPD & Consultation", icon: Stethoscope },
      { id: "billing", label: "Billing & Payments", icon: CreditCard },
      { id: "pharmacy", label: "Pharmacy Management", icon: Package },
    ]
  },
  {
    title: "PILLAR 2 — OPTICAL LAB CRM",
    items: [
      { id: "lab-jobs", label: "Lab Jobs", icon: FlaskConical },
      { id: "technicians", label: "Technicians", icon: UserCheck },
      { id: "machines", label: "Machines", icon: HardDrive },
      { id: "consumables", label: "Consumables Inventory", icon: Dna },
      { id: "qc-checklist", label: "QC Checklist", icon: CheckCircle2 },
      { id: "remake-tickets", label: "Remake Tickets", icon: AlertTriangle },
      { id: "calibration-logs", label: "Machine Calibration", icon: Wrench },
      { id: "vendors", label: "Vendors / Suppliers", icon: Truck },
      { id: "training-records", label: "Training Records", icon: GraduationCap },
      { id: "payroll", label: "Salary & Bonus", icon: Wallet },
    ]
  },
  {
    title: "PILLAR 3 — CRM & MARKETING",
    items: [
      { id: "crm-dashboard", label: "CRM Dashboard", icon: LayoutDashboard },
      { id: "crm-leads", label: "Leads & Enquiries", icon: UserPlus },
      { id: "crm-opportunities", label: "Opportunities Pipeline", icon: Target },
      { id: "crm-job-cards", label: "Operations: Job Cards", icon: ClipboardCheck },
      { id: "crm-followups", label: "Follow-ups & Tasks", icon: Clock },
      { id: "crm-lifecycle", label: "Customer Lifecycle", icon: TrendingUp },
      { id: "crm-campaigns", label: "Campaign Analytics", icon: Award },
      { id: "marketing", label: "Marketing & CRM", icon: MessageSquare },
    ]
  },
  {
    title: "PILLAR 4 — OPERATIONS",
    items: [
      { id: "staff", label: "Staff Management", icon: Briefcase },
      { id: "franchise", label: "Franchise Management", icon: Building2 },
    ]
  },
  {
    title: "PILLAR 5 — FINANCE",
    items: [
      { id: "accounting", label: "Accounting (Zoho Books)", icon: BarChart3 },
    ]
  },
  {
    title: "PILLAR 6 — ADMIN & SYSTEM",
    items: [
      { id: "dashboard", label: "Dashboards & Analytics", icon: LayoutDashboard },
      { id: "automation", label: "Automation Rules", icon: Zap },
      { id: "integrations", label: "Integrations", icon: Settings },
      { id: "mobile-app", label: "Mobile App Module", icon: Smartphone },
    ]
  }
];