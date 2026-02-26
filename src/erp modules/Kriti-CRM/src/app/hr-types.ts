import {
    Users, UserPlus, Building2, CalendarCheck, Clock, CalendarDays,
    Wallet, Banknote, FileText, BarChart3, Target, Coins,
    ShieldCheck, Settings, LayoutDashboard, UserCircle2, Briefcase,
    FileBadge, Landmark, Scale, FolderLock, Trophy, Monitor,
    History, CheckSquare, Zap, Lock, MapPin, Milestone
} from "lucide-react";

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────
export type HRModuleId =
    | "hr-dashboard"
    // Employee Master & Lifecycle
    | "hr-employees"
    | "hr-lifecycle" // Probation, Confirmation, Exit
    | "hr-salary-history" // Revision versioning
    | "hr-departments"
    | "hr-documents"
    // Attendance & Time
    | "hr-attendance"
    | "hr-corrections" // Dispute resolution
    | "hr-shifts"
    | "hr-holidays" // Public/Branch holidays
    // Leave Management
    | "hr-leaves"
    | "hr-leave-req"
    // Payroll & Contracts
    | "hr-salary-structure" // Contract models: Fixed, Per-case, Revenue share
    | "hr-run-payroll"
    | "hr-payslips"
    | "hr-loans"
    | "hr-payroll-lock" // Period closing
    // Performance & Perks
    | "hr-kpis"
    | "hr-incentives"
    | "hr-assets" // Asset Assignment
    // Governance
    | "hr-approvals" // Multi-level
    | "hr-reports"
    | "hr-settings";

export interface HRNavItem {
    id: HRModuleId;
    label: string;
    icon: any;
    badge?: string;
    badgeVariant?: "error" | "warning" | "success" | "info";
}

export interface HRNavGroup {
    title: string;
    items: HRNavItem[];
}

export const HR_NAVIGATION: HRNavGroup[] = [
    {
        title: "Overview",
        items: [
            { id: "hr-dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "hr-approvals", label: "Approval Queue", icon: ShieldCheck, badge: "7", badgeVariant: "warning" },
        ],
    },
    {
        title: "Workforce & Lifecycle",
        items: [
            { id: "hr-employees", label: "Staff Directory", icon: Users },
            { id: "hr-lifecycle", label: "Lifecycle & Exit", icon: Milestone },
            { id: "hr-salary-history", label: "Salary History", icon: History },
            { id: "hr-assets", label: "Asset Assignment", icon: Monitor },
            { id: "hr-documents", label: "Digital Vault", icon: FolderLock },
        ],
    },
    {
        title: "Time & Attendance",
        items: [
            { id: "hr-attendance", label: "Daily Attendance", icon: Clock },
            { id: "hr-corrections", label: "Corrections", icon: Zap, badge: "2", badgeVariant: "info" },
            { id: "hr-shifts", label: "Shift Roster", icon: CalendarCheck },
            { id: "hr-holidays", label: "Holiday Calendar", icon: MapPin },
        ],
    },
    {
        title: "Leave Management",
        items: [
            { id: "hr-leave-req", label: "Request Queue", icon: FileText, badge: "5", badgeVariant: "warning" },
            { id: "hr-leaves", label: "Leave Planner", icon: CalendarDays },
        ],
    },
    {
        title: "Payroll & Contracts",
        items: [
            { id: "hr-salary-structure", label: "Pay Models", icon: Settings },
            { id: "hr-run-payroll", label: "Monthly Run", icon: Wallet },
            { id: "hr-payroll-lock", label: "Period Close", icon: Lock, badge: "Lock", badgeVariant: "success" },
            { id: "hr-loans", label: "Loans / EMIs", icon: Banknote },
        ],
    },
    {
        title: "Performance",
        items: [
            { id: "hr-kpis", label: "Scorecards", icon: Target },
            { id: "hr-incentives", label: "Incentive Calc", icon: Trophy },
        ],
    },
    {
        title: "Governance",
        items: [
            { id: "hr-reports", label: "Analytics", icon: BarChart3 },
            { id: "hr-settings", label: "HR Policies", icon: Settings },
        ],
    },
];

// ─── MOCK DATA ────────────────────────────────────────────────────────
export const HR_DB = {
    employees: [
        { id: "EMP-001", name: "Dr. Sameer Khan", role: "Surgeon", dept: "Hospital", branch: "Main", email: "dr.sameer@alphery.com", phone: "+91 9882200111", joinDate: "2023-01-15", status: "Confirmed", type: "Full-time", payModel: "Fixed + Per-Surgery" },
        { id: "EMP-002", name: "Rahul Sharma", role: "Lab Technician", dept: "Lab", branch: "Optical Wing", email: "rahul.lab@alphery.com", phone: "+91 9882200112", joinDate: "2024-11-20", status: "Probation", type: "Full-time", payModel: "Fixed" },
        { id: "EMP-003", name: "Anita Joseph", role: "Receptionist", dept: "Hospital", branch: "Main", email: "anita.recept@alphery.com", phone: "+91 9882200113", joinDate: "2025-02-01", status: "Probation", type: "Full-time", payModel: "Fixed" },
        { id: "EMP-006", name: "Dr. Mehta", role: "Consultant Optometrist", dept: "Hospital", branch: "Main", email: "mehta@alphery.com", phone: "+91 9882200116", joinDate: "2023-05-10", status: "Confirmed", type: "Consultant", payModel: "Per-Consultation" },
    ],
    lifecycle: [
        { id: "LC-001", empName: "Rahul Sharma", event: "Probation Review", dueDate: "2025-02-25", status: "Upcoming" },
        { id: "LC-002", empName: "Suresh Kumar", event: "Exit Clearance", dueDate: "2025-02-20", status: "On Notice", checklist: "4/7 Clear" },
        { id: "LC-003", empName: "Anita Joseph", event: "Confirmation", dueDate: "2025-05-01", status: "Pending" },
    ],
    salaryHistory: [
        { id: "SH-001", empName: "Dr. Sameer Khan", oldPay: "1,40,000", newPay: "1,65,000", effectiveDate: "2025-01-01", approvedBy: "Director" },
        { id: "SH-002", empName: "Dr. Mehta", oldPay: "Per Case: 500", newPay: "Per Case: 650", effectiveDate: "2025-02-01", approvedBy: "Director" },
    ],
    assets: [
        { id: "AST-001", empName: "Dr. Sameer Khan", asset: "MacBook Air M2", serial: "SN-9821X", assigned: "2023-01-16", status: "In Use" },
        { id: "AST-002", empName: "Anita Joseph", asset: "Cisco IP Phone", serial: "TEL-4412", assigned: "2025-02-01", status: "In Use" },
        { id: "AST-003", empName: "Suresh Kumar", asset: "Zebra Scanner", serial: "SCN-1120", assigned: "2022-08-16", status: "Returned (Exit)" },
    ],
    corrections: [
        { id: "COR-001", empName: "Rahul Sharma", date: "2026-02-15", reason: "Fingerprint mismatch", type: "Missed Punch", status: "Pending" },
        { id: "COR-002", empName: "Dr. Mehta", date: "2026-02-18", reason: "Emergency Surgery", type: "Shift Override", status: "Approved" },
    ],
    attendance: [
        { id: "ATT-001", empName: "Dr. Sameer Khan", checkIn: "08:55 AM", checkOut: "05:15 PM", status: "Present", overtime: "0h", date: "2026-02-19" },
    ],
    leaves: [
        { id: "LV-001", empId: "EMP-005", empName: "Suresh Kumar", type: "Casual", range: "18-20 Feb", reason: "Family event", status: "Approved" },
    ],
    payroll: [
        { id: "PAY-001", month: "Jan 2026", status: "Paid / Locked", employees: 48, totalPayout: 1250000, processedOn: "2026-02-01" },
    ],
    incentives: [
        { id: "INC-001", empName: "Vikas Patil", dept: "Sales", metric: "Revenue: ₹12L", amount: 15000 },
    ],
    loans: [
        { id: "LN-001", empName: "Anita Joseph", amount: 50000, emi: 5000, balance: 35000, status: "Active" },
    ],
    stats: {
        totalEmployees: 52,
        presentToday: 48,
        onLeave: 2,
        probationCount: 12,
        assetsAtRisk: 3,
        approvedInc: "₹85,000"
    }
};
