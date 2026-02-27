
import {
    LayoutDashboard,
    FileText,
    Receipt,
    TrendingUp,
    TrendingDown,
    Wallet,
    Building2,
    PieChart,
    History,
    Settings,
    Landmark,
    Briefcase,
    FileSpreadsheet,
    Users,
    UserCircle,
    Building,
    Calculator,
    CreditCard,
    FileSignature,
    Scale,
    Package
} from "lucide-react";

export type FinanceModuleId =
    | "fin-dashboard"
    | "fin-items"
    | "fin-customers"
    | "fin-vendors"
    | "fin-estimates"
    | "fin-invoices"
    | "fin-bills"
    | "fin-expenses"
    | "fin-journal"
    | "fin-banking"
    | "fin-accounts"
    | "fin-projects"
    | "fin-taxes"
    | "fin-reporting"
    | "fin-settings";

export interface FinanceNavigationItem {
    id: FinanceModuleId;
    label: string;
    icon: any;
    color: string;
}

export const FINANCE_NAVIGATION: FinanceNavigationItem[] = [
    { id: "fin-dashboard", label: "Dashboard", icon: LayoutDashboard, color: "#7C1CE2" },
    { id: "fin-items", label: "Items / Products", icon: Package, color: "#F97316" },
    { id: "fin-customers", label: "Customers", icon: Users, color: "#3B82F6" },
    { id: "fin-vendors", label: "Vendors", icon: Building, color: "#8B5CF6" },
    { id: "fin-estimates", label: "Quotes / Estimates", icon: FileSignature, color: "#14B8A6" },
    { id: "fin-invoices", label: "Invoices", icon: FileText, color: "#10B981" },
    { id: "fin-bills", label: "Bills", icon: Receipt, color: "#F59E0B" },
    { id: "fin-expenses", label: "Expenses", icon: TrendingDown, color: "#EF4444" },
    { id: "fin-banking", label: "Banking", icon: CreditCard, color: "#2563EB" },
    { id: "fin-journal", label: "Journal Entries", icon: History, color: "#6366F1" },
    { id: "fin-accounts", label: "Chart of Accounts", icon: Landmark, color: "#8B5CF6" },
    { id: "fin-projects", label: "Project Finance", icon: Briefcase, color: "#EC4899" },
    { id: "fin-taxes", label: "Settings / Taxes", icon: Scale, color: "#F43F5E" },
    { id: "fin-reporting", label: "Reports", icon: PieChart, color: "#06B6D4" },
    { id: "fin-settings", label: "Company Settings", icon: Settings, color: "#6B7280" },
];

export interface ChartOfAccount {
    id: string;
    code: string;
    name: string;
    type: "Asset" | "Liability" | "Equity" | "Income" | "Expense";
    category: string;
    balance: number;
    currency: string;
}

export interface Invoice {
    id: string;
    invoice_number: string;
    client_name: string;
    project_id?: string;
    date: string;
    due_date: string;
    amount: number;
    tax_amount: number;
    total_amount: number;
    status: "Draft" | "Sent" | "Paid" | "Overdue" | "Void";
    items: InvoiceItem[];
}

export interface InvoiceItem {
    description: string;
    quantity: number;
    unit_price: number;
    amount: number;
}

export interface Expense {
    id: string;
    date: string;
    category: string;
    payee: string;
    amount: number;
    project_id?: string;
    status: "Pending" | "Reimbursed" | "Approved";
    payment_mode: string;
    reference?: string;
}

export interface ProjectFinance {
    project_id: string;
    project_name: string;
    budget: number;
    actual_cost: number;
    remaining_budget: number;
    revenue: number;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    currency: string;
    outstanding_receivable: number;
}

export interface Vendor {
    id: string;
    name: string;
    email: string;
    phone: string;
    currency: string;
    outstanding_payable: number;
}

export interface ProductItem {
    id: string;
    name: string;
    sku: string;
    description: string;
    price: number;
    type: "Goods" | "Service";
}
