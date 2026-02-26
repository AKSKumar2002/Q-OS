import {
    LayoutDashboard, PieChart, Landmark, ArrowUpRight, ArrowDownRight,
    Library, FileText, Receipt, Wallet, Banknote, Building, Scale,
    Settings, ShieldCheck, History, Monitor, BarChart3, Database, Lock,
    GitCompare, Repeat, FileSpreadsheet, ClipboardList, ShieldAlert,
    Ban, Percent, RefreshCw, Layers, Boxes
} from "lucide-react";

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────
export type AccountingModuleId =
    | "acc-dashboard"
    | "acc-chart-of-accounts"
    | "acc-journal-entries"
    | "acc-receivables"
    | "acc-payables"
    | "acc-credit-debit" // NEW: Returns & Corrections
    | "acc-expenses"
    | "acc-bank-cash"
    | "acc-cost-centers" // NEW: Dept/Doctor Profitability
    | "acc-inter-branch" // NEW: Consolidation
    | "acc-insurance"    // NEW: TPA & Corporate
    | "acc-fixed-assets"
    | "acc-tax-gst"
    | "acc-audit-trail"  // NEW: Integrity log
    | "acc-reports"
    | "acc-budgeting"
    | "acc-settings"
    | "acc-period-lock";

export interface AccNavItem {
    id: AccountingModuleId;
    label: string;
    icon: any;
    badge?: string;
    badgeVariant?: "error" | "warning" | "success" | "info";
}

export interface AccNavGroup {
    title: string;
    items: AccNavItem[];
}

export const ACCOUNTING_NAVIGATION: AccNavGroup[] = [
    {
        title: "Overview",
        items: [
            { id: "acc-dashboard", label: "KPI Command Center", icon: LayoutDashboard },
            { id: "acc-reports", label: "Financial Reports", icon: PieChart },
            { id: "acc-audit-trail", label: "Audit Trace", icon: ClipboardList, badge: "Live", badgeVariant: "success" },
        ],
    },
    {
        title: "Core Ledger & Governance",
        items: [
            { id: "acc-chart-of-accounts", label: "Chart of Accounts", icon: Library },
            { id: "acc-journal-entries", label: "Journal Engine", icon: FileText },
            { id: "acc-cost-centers", label: "Cost Centers", icon: Layers },
            { id: "acc-inter-branch", label: "Branch Consolidation", icon: GitCompare },
            { id: "acc-period-lock", label: "Period Control", icon: Lock, badge: "FY 25-26", badgeVariant: "success" },
        ],
    },
    {
        title: "Accounts Control",
        items: [
            { id: "acc-receivables", label: "Receivables (AR)", icon: ArrowDownRight, badge: "₹4.2L", badgeVariant: "warning" },
            { id: "acc-insurance", label: "Insurance & TPA", icon: ShieldAlert },
            { id: "acc-payables", label: "Payables (AP)", icon: ArrowUpRight },
            { id: "acc-credit-debit", label: "Credit/Debit Notes", icon: Repeat },
        ],
    },
    {
        title: "Ops & Liquidity",
        items: [
            { id: "acc-expenses", label: "Expenses", icon: Receipt },
            { id: "acc-bank-cash", label: "Bank & Cash", icon: Landmark },
            { id: "acc-tax-gst", label: "Tax & GST", icon: Scale },
        ],
    },
    {
        title: "Assets & Strategy",
        items: [
            { id: "acc-fixed-assets", label: "Fixed Assets", icon: Monitor },
            { id: "acc-budgeting", label: "Budgeting", icon: BarChart3 },
            { id: "acc-settings", label: "Policy Setup", icon: Settings },
        ],
    },
];

// ─── MOCK DATABASE ──────────────────────────────────────────────────
export const ACCOUNTING_DB = {
    accounts: [
        { code: "1000", name: "Cash in Hand", category: "Assets", subCategory: "Current Assets", balance: 85200 },
        { code: "1100", name: "HDFC Operating A/c", category: "Assets", subCategory: "Bank", balance: 1450000 },
        { code: "1200", name: "Accounts Receivable", category: "Assets", subCategory: "Current Assets", balance: 420000 },
        { code: "1300", name: "Insurance Receivables", category: "Assets", subCategory: "TPA Control", balance: 850000 },
        { code: "2000", name: "Accounts Payable", category: "Liabilities", subCategory: "Current Liabilities", balance: 125000 },
        { code: "2100", name: "GST Output Payable", category: "Liabilities", subCategory: "Tax", balance: 64200 },
        { code: "3000", name: "Consultation Revenue", category: "Income", subCategory: "Service", balance: 850000 },
        { code: "3100", name: "Optical Sales", category: "Income", subCategory: "Product", balance: 425000 },
        { code: "4000", name: "Salary Expense", category: "Expenses", subCategory: "Payroll", balance: 650000 },
        { code: "4100", name: "Electricity Bill", category: "Expenses", subCategory: "Utilities", balance: 12400 },
    ],
    journalEntries: [
        { id: "JE-001", date: "2026-02-19", reference: "HOSP-BILL-982", description: "Patient Consultation Billing", amount: 1200, status: "Posted", branch: "Main Hospital", createdBy: "Staff.Anita" },
        { id: "JE-002", date: "2026-02-19", reference: "PUR-INV-441", description: "Lens Stock Purchase (Vendor: Zeiss)", amount: 45000, status: "Awaiting Approval", branch: "Optical Wing", createdBy: "Inv.Rahul" },
        { id: "JE-003", date: "2026-02-18", reference: "PAY-SAL-FEB", description: "Monthly Salary Disbursement", amount: 1482000, status: "Posted", branch: "Consolidated", createdBy: "HR.Admin" },
        { id: "JE-004", date: "2026-02-18", reference: "REFD-998", description: "Refund: Surgery overage reversal", amount: 2500, status: "Posted", branch: "Main Hospital", createdBy: "Acc.Sam" },
    ],
    branchPerformance: [
        { id: "BR-01", name: "Main Hospital", revenue: 1450000, expenses: 850000, profit: 600000, staffCount: 22 },
        { id: "BR-02", name: "Optical Wing", revenue: 620000, expenses: 410000, profit: 210000, staffCount: 12 },
        { id: "BR-03", name: "Satellite Clinic", revenue: 210000, expenses: 185000, profit: 25000, staffCount: 8 },
    ],
    costCenters: [
        { id: "CC-01", name: "OPD Department", revenue: 450000, cost: 120000, margin: "73%" },
        { id: "CC-02", name: "Surgery / OT", revenue: 850000, cost: 320000, margin: "62%" },
        { id: "CC-03", name: "Pharmacy", revenue: 310000, cost: 240000, margin: "22%" },
        { id: "CC-04", name: "Lab Processing", revenue: 185000, cost: 85000, margin: "54%" },
    ],
    insurance: [
        { id: "INS-01", tpa: "Star Health", amount: 145000, status: "Under Review", aging: "45 Days" },
        { id: "INS-02", tpa: "ICICI Lombard", amount: 82000, status: "Approved, Pending Fund", aging: "12 Days" },
        { id: "INS-03", tpa: "MediAssist TPA", amount: 215000, status: "Disputed", aging: "92 Days" },
    ],
    auditLogs: [
        { id: "LOG-01", timestamp: "2026-02-19 15:45", user: "Sam.Acc", action: "Posted Journal Entry", details: "Manual Adjustment for GST Reversal (Inv-4481)", impact: "₹+4520" },
        { id: "LOG-02", timestamp: "2026-02-19 14:22", user: "Admin", action: "Modified Policy", details: "Changed 'High-Value Expense' threshold to ₹50,000", impact: "Rule Change" },
        { id: "LOG-03", timestamp: "2026-02-18 10:05", user: "Inv.System", action: "Auto-Journal", details: "Stock Purchase INV-928 from Inventory System", impact: "₹+1,25,000" },
    ],
    creditDebit: [
        { id: "CN-001", type: "Credit Note", entity: "John Doe", amount: 500, date: "2026-02-19", reason: "Consultation overcharge reversal" },
        { id: "DN-001", type: "Debit Note", entity: "Zeiss India", amount: 4500, date: "2026-02-18", reason: "Quality mismatch rebate claim" },
    ],
    receivables: [
        { id: "AR-001", customer: "John Doe", amount: 4500, dueDate: "2026-02-25", aging: "0-30", status: "Due" },
        { id: "AR-002", customer: "Corporate Health Ins", amount: 125000, dueDate: "2026-01-15", aging: "30-60", status: "Overdue" },
    ],
    payables: [
        { id: "AP-001", vendor: "Essilor India", amount: 85000, dueDate: "2026-03-05", status: "Pending" },
    ],
    expenses: [
        { id: "EXP-001", category: "Marketing", branch: "Main Hospital", amount: 15000, date: "2026-02-15", status: "Approved", description: "Newspaper Clipping Ad" },
    ],
    fixedAssets: [
        { id: "AST-001", name: "Canon Retinal Camera", cost: 1200000, purchaseDate: "2024-05-10", depRate: "15%", netBookValue: 1020000 },
    ],
    kpis: {
        netProfit: 425000,
        netProfitMargin: "17.4%",
        todayRevenue: 85200,
        arRatio: 0.85,
        burnRate: "₹18.5L/mo",
        collectionEfficiency: "94.2%",
        liquidityRatio: 1.25,
        monthlyRevenue: 2480000,
        monthlyExpense: 1850000,
    }
};
