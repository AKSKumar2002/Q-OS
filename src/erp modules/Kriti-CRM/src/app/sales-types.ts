import {
    LayoutDashboard, Users, Package, Tag, FileText, ShoppingCart,
    Receipt, CreditCard, RefreshCcw, Award, Target, BarChart3,
    Settings, ShieldCheck, History, Monitor, Zap, Globe, MapPin,
    AlertTriangle, Layers, BookOpen, TrendingUp, Radio, Banknote,
    Cpu, Clock, Bell
} from "lucide-react";

export type SalesModuleId =
    | "sales-dashboard"
    | "sales-customers"
    | "sales-credit-control"
    | "sales-ledger"
    | "sales-products"
    | "sales-pricing"
    | "sales-tax"
    | "sales-quotations"
    | "sales-orders"
    | "sales-invoices"
    | "sales-payments"
    | "sales-returns"
    | "sales-pos"
    | "sales-channels"
    | "sales-commission"
    | "sales-targets"
    | "sales-automation"
    | "sales-forecasting"
    | "sales-audit"
    | "sales-reports"
    | "sales-settings";

export interface SalesNavItem {
    id: SalesModuleId;
    label: string;
    icon: any;
    badge?: string;
    badgeVariant?: "error" | "warning" | "success" | "info" | "neutral";
}
export interface SalesNavGroup {
    title: string;
    items: SalesNavItem[];
}

export const SALES_BRAND = "#7C5CBF";

export const SALES_NAVIGATION: SalesNavGroup[] = [
    {
        title: "Overview",
        items: [
            { id: "sales-dashboard", label: "Revenue Dashboard", icon: LayoutDashboard },
            { id: "sales-reports", label: "Analytics & Reports", icon: BarChart3 },
            { id: "sales-forecasting", label: "Sales Forecasting", icon: TrendingUp },
        ],
    },
    {
        title: "POS & Quick Billing",
        items: [
            { id: "sales-pos", label: "Point of Sale (POS)", icon: Monitor, badge: "Live", badgeVariant: "success" },
        ],
    },
    {
        title: "Revenue Pipeline",
        items: [
            { id: "sales-quotations", label: "Quotations", icon: FileText, badge: "3 Pending", badgeVariant: "warning" },
            { id: "sales-orders", label: "Sales Orders", icon: ShoppingCart },
            { id: "sales-invoices", label: "Invoices", icon: Receipt, badge: "2 Overdue", badgeVariant: "error" },
            { id: "sales-payments", label: "Payments & Modes", icon: CreditCard },
            { id: "sales-returns", label: "Returns & Credit Notes", icon: RefreshCcw },
        ],
    },
    {
        title: "Customer 360",
        items: [
            { id: "sales-customers", label: "Customer Master", icon: Users },
            { id: "sales-credit-control", label: "Credit Control Engine", icon: ShieldCheck, badge: "1 Blocked", badgeVariant: "error" },
            { id: "sales-ledger", label: "Customer Ledger", icon: BookOpen },
        ],
    },
    {
        title: "Catalog & Pricing",
        items: [
            { id: "sales-products", label: "Products & Services", icon: Package },
            { id: "sales-pricing", label: "Pricing & Discounts", icon: Tag },
            { id: "sales-tax", label: "Tax Engine (GST)", icon: Layers },
        ],
    },
    {
        title: "Performance",
        items: [
            { id: "sales-channels", label: "Sales Channels", icon: Radio },
            { id: "sales-commission", label: "Commission Engine", icon: Award },
            { id: "sales-targets", label: "Targets & Goals", icon: Target },
        ],
    },
    {
        title: "Automation & Compliance",
        items: [
            { id: "sales-automation", label: "Workflow Automation", icon: Zap, badge: "5 Rules", badgeVariant: "info" },
            { id: "sales-audit", label: "Audit Trail", icon: History },
            { id: "sales-settings", label: "Sales Settings", icon: Settings },
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────────────
//  COMPREHENSIVE SALES DATABASE
// ──────────────────────────────────────────────────────────────────────────────
export const SALES_DB = {
    customers: [
        { id: "CUST-001", name: "Rajesh Kumar", type: "Retail", gst: "", creditLimit: 5000, outstanding: 1200, paymentTerms: "Net 15", branch: "Main Hospital", salesRep: "Anita S.", channel: "Walk-in", territory: "Zone A", currency: "INR", creditStatus: "OK" },
        { id: "CUST-002", name: "TechCorp India Ltd.", type: "Corporate", gst: "27AAACT2727Q1ZW", creditLimit: 500000, outstanding: 84500, paymentTerms: "Net 30", branch: "Optical Wing", salesRep: "Rahul M.", channel: "Corporate", territory: "Zone B", currency: "INR", creditStatus: "OK" },
        { id: "CUST-003", name: "Star Health Insurance", type: "Insurance", gst: "27AACCS4699K1ZP", creditLimit: 2000000, outstanding: 450000, paymentTerms: "Net 45", branch: "Consolidated", salesRep: "Dr. Sharma", channel: "Insurance", territory: "All", currency: "INR", creditStatus: "BLOCKED" },
        { id: "CUST-004", name: "Meena Patel", type: "Retail", gst: "", creditLimit: 3000, outstanding: 0, paymentTerms: "Immediate", branch: "Satellite Clinic", salesRep: "Priya V.", channel: "Referral", territory: "Zone A", currency: "INR", creditStatus: "OK" },
    ],
    creditControl: [
        { id: "CUST-003", customer: "Star Health Insurance", creditLimit: 2000000, outstanding: 450000, overdueAmount: 280000, overdueDays: 45, status: "BLOCKED", lastAction: "Auto-blocked: Overdue > 30 days", approvedOverride: null },
        { id: "CUST-002", customer: "TechCorp India Ltd.", creditLimit: 500000, outstanding: 84500, overdueAmount: 0, overdueDays: 0, status: "OK", lastAction: "Within credit limit", approvedOverride: null },
        { id: "CUST-001", customer: "Rajesh Kumar", creditLimit: 5000, outstanding: 1200, overdueAmount: 1200, overdueDays: 22, status: "WARNING", lastAction: "Overdue 22 days — reminder sent", approvedOverride: null },
    ],
    ledger: [
        { id: "LDG-001", customer: "TechCorp India Ltd.", date: "2026-02-19", description: "Invoice INV-2026-002", debit: 147500, credit: 0, balance: 147500 },
        { id: "LDG-002", customer: "TechCorp India Ltd.", date: "2026-02-10", description: "Advance Payment Received", debit: 0, credit: 63000, balance: 84500 },
        { id: "LDG-003", customer: "Star Health Insurance", date: "2026-01-15", description: "Invoice INV-2026-004", debit: 450000, credit: 0, balance: 450000 },
        { id: "LDG-004", customer: "Star Health Insurance", date: "2026-02-10", description: "Partial Settlement", debit: 0, credit: 200000, balance: 250000 },
    ],
    products: [
        { id: "PRD-001", sku: "OPT-LENS-PG", name: "Progressive Lenses (Zeiss)", type: "Physical", hsn: "9001", taxPct: 18, taxSlab: "CGST 9% + SGST 9%", costPrice: 2800, sellingPrice: 5500, discountAllowed: true, maxDiscount: 15, commission: true, serialTracked: true, warrantyMonths: 12 },
        { id: "PRD-002", sku: "SVC-CONSULT", name: "Ophthalmology Consultation", type: "Service", hsn: "999311", taxPct: 0, taxSlab: "Exempt", costPrice: 0, sellingPrice: 800, discountAllowed: false, maxDiscount: 0, commission: true, serialTracked: false, warrantyMonths: 0 },
        { id: "PRD-003", sku: "OPT-FRAME-LX", name: "Premium Frame (Ray-Ban)", type: "Physical", hsn: "9003", taxPct: 18, taxSlab: "CGST 9% + SGST 9%", costPrice: 1500, sellingPrice: 4200, discountAllowed: true, maxDiscount: 20, commission: true, serialTracked: true, warrantyMonths: 6 },
        { id: "PRD-004", sku: "SVC-LASIK", name: "LASIK Surgery (Per Eye)", type: "Service", hsn: "999311", taxPct: 0, taxSlab: "Healthcare Exempt", costPrice: 0, sellingPrice: 45000, discountAllowed: true, maxDiscount: 10, commission: true, serialTracked: false, warrantyMonths: 0 },
        { id: "PRD-005", sku: "PKG-EYE-CARE", name: "Annual Eye Care Package", type: "Bundle", hsn: "999311", taxPct: 0, taxSlab: "Composite Exempt", costPrice: 0, sellingPrice: 2500, discountAllowed: false, maxDiscount: 0, commission: false, serialTracked: false, warrantyMonths: 0 },
    ],
    pricing: [
        { id: "PRC-001", name: "Standard Retail MRP", appliesTo: "All Retail", discount: "0%", approvalRequired: false, validFrom: "2026-04-01", validTo: "2027-03-31" },
        { id: "PRC-002", name: "Corporate Volume Discount (15%)", appliesTo: "Corporate Clients", discount: "15%", approvalRequired: false, validFrom: "2026-01-01", validTo: "2026-12-31" },
        { id: "PRC-003", name: "Insurance Rate Card", appliesTo: "Insurance TPAs", discount: "Custom", approvalRequired: true, validFrom: "2026-01-01", validTo: "2026-12-31" },
        { id: "PRC-004", name: "Seasonal Eye Camp Offer (20%)", appliesTo: "All", discount: "20%", approvalRequired: true, validFrom: "2026-03-01", validTo: "2026-03-31" },
    ],
    taxEngine: [
        { id: "TAX-001", name: "Standard GST 18%", slab: "CGST 9% + SGST 9%", type: "Exclusive", appliesTo: "Physical Goods (9001–9005)", reverseCharge: false, exportApplicable: false },
        { id: "TAX-002", name: "Healthcare Exempt", slab: "0% (Exempt)", type: "Exempt", appliesTo: "Medical Services (999311)", reverseCharge: false, exportApplicable: false },
        { id: "TAX-003", name: "GST 12% (Medicals)", slab: "CGST 6% + SGST 6%", type: "Exclusive", appliesTo: "Medical Devices / Instruments", reverseCharge: false, exportApplicable: false },
        { id: "TAX-004", name: "Reverse Charge – Legal", slab: "18% (Party Pays)", type: "Reverse Charge", appliesTo: "Legal / Consultancy Services", reverseCharge: true, exportApplicable: false },
        { id: "TAX-005", name: "Export Zero-Rated", slab: "0% (LUT)", type: "Zero-Rated Export", appliesTo: "International Clients", reverseCharge: false, exportApplicable: true },
    ],
    quotations: [
        { id: "QT-001", customer: "TechCorp India Ltd.", date: "2026-02-18", amount: 125000, status: "Sent", validUntil: "2026-03-05", items: 4, assignedTo: "Rahul M.", channel: "Corporate", discount: "15%", discountApproved: true },
        { id: "QT-002", customer: "Meena Patel", date: "2026-02-19", amount: 5500, status: "Accepted", validUntil: "2026-03-01", items: 1, assignedTo: "Priya V.", channel: "Walk-in", discount: "0%", discountApproved: true },
        { id: "QT-003", customer: "Star Health Insurance", date: "2026-02-10", amount: 850000, status: "Draft", validUntil: "2026-02-28", items: 12, assignedTo: "Dr. Sharma", channel: "Insurance", discount: "Custom", discountApproved: false },
        { id: "QT-004", customer: "Rajesh Kumar", date: "2026-02-05", amount: 6800, status: "Expired", validUntil: "2026-02-15", items: 2, assignedTo: "Anita S.", channel: "Walk-in", discount: "5%", discountApproved: true },
    ],
    orders: [
        { id: "SO-001", customer: "TechCorp India Ltd.", quotation: "QT-001", date: "2026-02-19", amount: 125000, status: "Processing", deliveryStatus: "Pending", branch: "Optical Wing", channel: "Corporate" },
        { id: "SO-002", customer: "Meena Patel", quotation: "QT-002", date: "2026-02-19", amount: 5500, status: "Completed", deliveryStatus: "Delivered", branch: "Main Hospital", channel: "Walk-in" },
        { id: "SO-003", customer: "Rajesh Kumar", quotation: null, date: "2026-02-17", amount: 800, status: "Completed", deliveryStatus: "N/A (Service)", branch: "Main Hospital", channel: "Walk-in" },
    ],
    invoices: [
        { id: "INV-2026-001", customer: "Meena Patel", order: "SO-002", date: "2026-02-19", dueDate: "2026-02-19", amount: 5500, tax: 990, total: 6490, status: "Paid", type: "Tax Invoice", channel: "Walk-in" },
        { id: "INV-2026-002", customer: "TechCorp India Ltd.", order: "SO-001", date: "2026-02-19", dueDate: "2026-03-20", amount: 125000, tax: 22500, total: 147500, status: "Sent", type: "Tax Invoice", channel: "Corporate" },
        { id: "INV-2026-003", customer: "Rajesh Kumar", order: "SO-003", date: "2026-02-17", dueDate: "2026-03-04", amount: 800, tax: 0, total: 800, status: "Overdue", type: "Service Invoice", channel: "Walk-in" },
        { id: "INV-2026-004", customer: "Star Health Insurance", order: null, date: "2026-01-15", dueDate: "2026-03-01", amount: 450000, tax: 0, total: 450000, status: "Partial", type: "Insurance Invoice", channel: "Insurance" },
    ],
    payments: [
        { id: "PAY-001", invoice: "INV-2026-001", customer: "Meena Patel", date: "2026-02-19", amount: 6490, mode: "UPI", status: "Cleared", reference: "UPI-8821993", refundMode: null },
        { id: "PAY-002", invoice: "INV-2026-004", customer: "Star Health Insurance", date: "2026-02-10", amount: 200000, mode: "Bank Transfer", status: "Cleared", reference: "NEFT-5512288", refundMode: null },
    ],
    returns: [
        { id: "RET-001", invoice: "INV-2026-001", customer: "Meena Patel", date: "2026-02-20", reason: "Frame size doesn't fit — exchange", amount: 4200, type: "Sales Return", status: "Credit Note Issued", refundMode: "Credit Note", accountingEntry: "Dr: Sales Revenue / Cr: AR" },
    ],
    channels: [
        { id: "CHN-001", name: "Walk-in", revenue: 845000, orders: 124, avgOrder: 6814, growth: "+8%" },
        { id: "CHN-002", name: "Corporate", revenue: 1200000, orders: 18, avgOrder: 66667, growth: "+22%" },
        { id: "CHN-003", name: "Insurance", revenue: 450000, orders: 6, avgOrder: 75000, growth: "+5%" },
        { id: "CHN-004", name: "Referral", revenue: 320000, orders: 42, avgOrder: 7619, growth: "+15%" },
        { id: "CHN-005", name: "Online / WhatsApp", revenue: 185000, orders: 31, avgOrder: 5968, growth: "+38%" },
    ],
    commissions: [
        { id: "CMN-001", staff: "Dr. Sharma", role: "Ophthalmologist", period: "Feb 2026", amount: 85000, pct: "5%", settled: false },
        { id: "CMN-002", staff: "Priya V.", role: "Optical Sales", period: "Feb 2026", amount: 12500, pct: "3%", settled: true },
        { id: "CMN-003", staff: "Rahul M.", role: "B2B Sales Rep", period: "Feb 2026", amount: 18750, pct: "1.5%", settled: false },
    ],
    targets: [
        { id: "TGT-001", name: "Main Hospital", type: "Branch", target: 2000000, achieved: 1450000, pct: 72 },
        { id: "TGT-002", name: "Optical Wing", type: "Branch", target: 800000, achieved: 620000, pct: 77 },
        { id: "TGT-003", name: "Dr. Sharma", type: "Doctor", target: 500000, achieved: 450000, pct: 90 },
        { id: "TGT-004", name: "Rahul M.", type: "Sales Rep", target: 200000, achieved: 125000, pct: 62 },
    ],
    automation: [
        { id: "AUTO-001", rule: "Auto Invoice After Delivery", trigger: "Sales Order: Delivered", action: "Generate Tax Invoice + Notify customer", status: "Active", lastRun: "2026-02-19 14:30" },
        { id: "AUTO-002", rule: "Payment Reminder D-3", trigger: "Invoice Due Date - 3 days", action: "WhatsApp + Email: Payment reminder", status: "Active", lastRun: "2026-02-18 09:00" },
        { id: "AUTO-003", rule: "Overdue Escalation D+7", trigger: "Invoice Overdue > 7 days", action: "Alert Sales Rep + Manager via notification", status: "Active", lastRun: "2026-02-19 08:00" },
        { id: "AUTO-004", rule: "Dunning — Credit Block D+30", trigger: "Invoice Overdue > 30 days", action: "Auto-block customer credit + Notify CFO", status: "Active", lastRun: "2026-02-17 08:00" },
        { id: "AUTO-005", rule: "Discount Approval > 15%", trigger: "Quotation: Discount field > 15%", action: "Route to Sales Manager for approval", status: "Active", lastRun: "2026-02-15 11:20" },
    ],
    auditTrail: [
        { id: "AUD-001", timestamp: "2026-02-19 21:00", user: "Rahul M.", module: "Invoices", action: "Invoice INV-2026-002 Created", value: "₹1,47,500", ipAddress: "192.168.1.14" },
        { id: "AUD-002", timestamp: "2026-02-19 18:30", user: "Priya V.", module: "Quotations", action: "QT-002 Converted to Sales Order", value: "₹5,500", ipAddress: "192.168.1.8" },
        { id: "AUD-003", timestamp: "2026-02-18 15:45", user: "Admin", module: "Credit Control", action: "Star Health — Credit Block Applied", value: "₹4,50,000 Outstanding", ipAddress: "192.168.1.2" },
        { id: "AUD-004", timestamp: "2026-02-17 12:10", user: "Anita S.", module: "Payments", action: "PAY-001 Recorded — UPI Cleared", value: "₹6,490", ipAddress: "192.168.1.22" },
        { id: "AUD-005", timestamp: "2026-02-16 09:20", user: "Dr. Sharma", module: "Pricing", action: "LASIK discount override (12%) — Approved", value: "₹45,000 → ₹39,600", ipAddress: "192.168.1.5" },
    ],
    forecasting: [
        { month: "Mar 2026", forecast: 2800000, target: 2500000, lastYear: 2100000 },
        { month: "Apr 2026", forecast: 3100000, target: 3000000, lastYear: 2400000 },
        { month: "May 2026", forecast: 2600000, target: 2800000, lastYear: 2200000 },
        { month: "Jun 2026", forecast: 3400000, target: 3200000, lastYear: 2700000 },
    ],
    posProducts: [
        { id: "PRD-001", sku: "OPT-LENS-PG", name: "Progressive Lenses (Zeiss)", price: 5500, tax: 18 },
        { id: "PRD-002", sku: "SVC-CONSULT", name: "Consultation", price: 800, tax: 0 },
        { id: "PRD-003", sku: "OPT-FRAME-LX", name: "Premium Frame (Ray-Ban)", price: 4200, tax: 18 },
        { id: "PRD-005", sku: "PKG-EYE-CARE", name: "Annual Care Package", price: 2500, tax: 0 },
    ],
    kpis: {
        todayRevenue: 132000,
        monthlyRevenue: 2480000,
        outstandingAR: 536000,
        conversionRate: "68%",
        collectionEfficiency: "94%",
        topProduct: "LASIK Surgery",
        avgOrderValue: 18500,
        revenueGrowth: "+14.2%",
        refundRate: "1.8%",
        overdueInvoices: 2,
        blockedCustomers: 1,
    },
};
