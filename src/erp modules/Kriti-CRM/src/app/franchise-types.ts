import {
    LayoutDashboard, Users, FileText, DollarSign, Building2,
    ShieldCheck, Package, TrendingUp, LifeBuoy, MapPin, Megaphone,
    Settings, Calculator, Award, AlertTriangle, Clock, CheckCircle2,
    Database, LogOut, GraduationCap, Target, History, RefreshCcw,
    Activity, UserPlus, BookOpen, Briefcase, FileCode, Lock, Globe
} from "lucide-react";

export type FranchiseModuleId =
    | "fr-dashboard"
    | "fr-onboarding"
    | "fr-agreements"
    | "fr-royalty"
    | "fr-reconciliation"
    | "fr-branches"
    | "fr-compliance"
    | "fr-health-score"
    | "fr-inventory"
    | "fr-performance"
    | "fr-recruitment"
    | "fr-training"
    | "fr-exit"
    | "fr-support"
    | "fr-territory"
    | "fr-marketing"
    | "fr-legal"
    | "fr-settings";

export interface FranchiseNavItem {
    id: FranchiseModuleId;
    label: string;
    icon: any;
    badge?: string;
    badgeVariant?: "error" | "warning" | "success" | "info" | "neutral";
}
export interface FranchiseNavGroup {
    title: string;
    items: FranchiseNavItem[];
}

export const FR_BRAND = "#71639E"; // Deep purple — matches workspace icon

export const FRANCHISE_NAVIGATION: FranchiseNavGroup[] = [
    {
        title: "Command Centre",
        items: [
            { id: "fr-dashboard", label: "Network Dashboard", icon: LayoutDashboard },
            { id: "fr-health-score", label: "Health Score Index", icon: Activity, badge: "New", badgeVariant: "success" },
            { id: "fr-performance", label: "Leaderboard & Ranking", icon: Award },
            { id: "fr-branches", label: "Branch Monitoring", icon: Building2 },
        ],
    },
    {
        title: "Franchise Lifecycle",
        items: [
            { id: "fr-recruitment", label: "Recruitment Funnel", icon: UserPlus, badge: "12 Leads", badgeVariant: "info" },
            { id: "fr-onboarding", label: "Onboarding Suite", icon: Users },
            { id: "fr-agreements", label: "Agreement Vault", icon: FileText },
            { id: "fr-exit", label: "Exit & Termination", icon: LogOut },
        ],
    },
    {
        title: "Royalty & Fintech",
        items: [
            { id: "fr-royalty", label: "Royalty Engine", icon: DollarSign, badge: "₹3.2L", badgeVariant: "error" },
            { id: "fr-reconciliation", label: "Reconciliation Log", icon: RefreshCcw },
        ],
    },
    {
        title: "Operations & Governance",
        items: [
            { id: "fr-compliance", label: "Compliance & Audit", icon: ShieldCheck },
            { id: "fr-training", label: "Training & Certs", icon: GraduationCap },
            { id: "fr-inventory", label: "Supply Chain", icon: Package },
            { id: "fr-territory", label: "Territory Control", icon: MapPin },
        ],
    },
    {
        title: "Ecosystem Assets",
        items: [
            { id: "fr-marketing", label: "Marketing Library", icon: Megaphone },
            { id: "fr-legal", label: "Legal Document Vault", icon: Briefcase },
            { id: "fr-support", label: "Support Desk", icon: LifeBuoy },
            { id: "fr-settings", label: "Network Settings", icon: Settings },
        ],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
//  EXPANDED FRANCHISE MOCK DATABASE
// ─────────────────────────────────────────────────────────────────────────────
export const FRANCHISE_DB = {

    // 1️⃣ FRANCHISE MASTERS + HEALTH SCORE
    franchises: [
        {
            id: "FR-001", businessName: "Kriti Eye Care – Bhopal", owner: "Suresh Agarwal",
            tier: "Gold", location: "Bhopal, MP", investmentAmt: 1500000,
            status: "Active", monthlyRevenue: 820000, royaltyDue: 41000,
            auditScore: 87, healthScore: 82, complaintRate: "1.2%", staffTraining: "90%",
            royaltyCompliance: "100%", pricingRule: "HQ Controlled (±5% flex)",
        },
        {
            id: "FR-002", businessName: "Kriti Eye Care – Indore", owner: "Priya Joshi",
            tier: "Premium", location: "Indore, MP", investmentAmt: 2500000,
            status: "Active", monthlyRevenue: 1250000, royaltyDue: 62500,
            auditScore: 94, healthScore: 96, complaintRate: "0.5%", staffTraining: "100%",
            royaltyCompliance: "100%", pricingRule: "HQ Mandatory",
        },
        {
            id: "FR-003", businessName: "Kriti Eye Care – Jabalpur", owner: "Rahul Dubey",
            tier: "Silver", location: "Jabalpur, MP", investmentAmt: 800000,
            status: "Active", monthlyRevenue: 320000, royaltyDue: 16000,
            auditScore: 72, healthScore: 58, complaintRate: "4.5%", staffTraining: "65%",
            royaltyCompliance: "88%", pricingRule: "Flexible",
        },
        {
            id: "FR-004", businessName: "Kriti Eye Care – Raipur", owner: "Neha Sharma",
            tier: "Gold", location: "Raipur, CG", investmentAmt: 1200000,
            status: "Renewal Pending", monthlyRevenue: 740000, royaltyDue: 37000,
            auditScore: 81, healthScore: 78, complaintRate: "1.8%", staffTraining: "82%",
            royaltyCompliance: "100%", pricingRule: "HQ Controlled",
        },
    ],

    // 2️⃣ ROYALTY RECONCILIATION
    reconciliation: [
        { id: "REC-001", franchise: "Kriti Eye – Bhopal", period: "Jan 2026", type: "Adjustment", reason: "Backdated Sales Return (Credit Note issued)", originalAmt: 39500, adjustment: -1200, finalAmt: 38300, status: "Adjusted", timestamp: "2026-02-10 14:20" },
        { id: "REC-002", franchise: "Kriti Eye – Indore", period: "Dec 2025", type: "Recalculation", reason: "Forex gain/loss adjustment — Corporate client", originalAmt: 61000, adjustment: +450, finalAmt: 61450, status: "Adjusted", timestamp: "2026-02-12 09:00" },
    ],

    // 3️⃣ ROYALTY COLLECTIONS
    collections: [
        { id: "INV-ROY-2026-01", franchise: "Kriti Eye – Bhopal", invoiceDate: "2026-03-01", dueDate: "2026-03-10", amount: 41000, lateFee: 0, penalty: 0, status: "Generated", reminderSent: "2026-03-01" },
        { id: "INV-ROY-2026-02", franchise: "Kriti Eye – Indore", invoiceDate: "2026-03-01", dueDate: "2026-03-10", amount: 62500, lateFee: 0, penalty: 0, status: "Generated", reminderSent: "2026-03-01" },
        { id: "INV-ROY-2025-12", franchise: "Kriti Eye – Jabalpur", invoiceDate: "2026-01-01", dueDate: "2026-01-10", amount: 15000, lateFee: 500, penalty: 150, status: "Overdue", reminderSent: "2026-02-15" },
    ],

    // 4️⃣ EXIT & TERMINATION
    exits: [
        { id: "EXIT-001", franchise: "Kriti Eye – Gwalior (Inactive)", owner: "Vikram Singh", requestDate: "2026-02-05", reason: "Revenue consistency failure", status: "In Progress", accessRevoked: true, depositRefundable: 500000, deductions: 145000, netRefund: 355000, dataArchived: "Pending" },
        { id: "EXIT-002", franchise: "Kriti Eye – Ujjain (Inactive)", owner: "Sumeet Vyas", requestDate: "2025-11-20", reason: "Agreement violation (Branding)", status: "Completed", accessRevoked: true, depositRefundable: 300000, deductions: 300000, netRefund: 0, dataArchived: "2025-12-31" },
    ],

    // 5️⃣ RECRUITMENT FUNNEL (Franchise Leads)
    recruitmentLeads: [
        { id: "FLD-001", name: "Dr. Ankit Varma", location: "Pune", source: "Website", investmentCapacity: "35L+", status: "Screening", screeningScore: 88, verification: "Verified", nextAction: "HQ Visit — Demo" },
        { id: "FLD-002", name: "MedLife Group", location: "Bangalore", source: "Corporate Referral", investmentCapacity: "1.2Cr", status: "Legal Review", screeningScore: 92, verification: "Verified", nextAction: "LOI Signing" },
        { id: "FLD-003", name: "Sunil Hegde", location: "Mysore", source: "Social Media", investmentCapacity: "15L", status: "Initial Call", screeningScore: 45, verification: "Pending", nextAction: "Prospect Profile Needed" },
        { id: "FLD-004", name: "Aarohan Capital", location: "Varanasi", source: "Investment Broker", investmentCapacity: "50L", status: "Site Visit", screeningScore: 76, verification: "In Progress", nextAction: "Territory Conflict Check" },
    ],

    // 6️⃣ TRAINING & CERTIFICATION
    training: [
        { id: "TRN-001", branch: "Bhopal", staff: "Anil K.", module: "ERP Masterclass: Sales & POS", status: "Certified", score: 92, expiry: "2027-02-15", certUrl: "#" },
        { id: "TRN-002", branch: "Indore", staff: "Megha S.", module: "Clinical SOP: Pre-LASIK", status: "Certified", score: 98, expiry: "2027-03-31", certUrl: "#" },
        { id: "TRN-003", branch: "Jabalpur", staff: "Amit D.", module: "Customer Service & Soft Skills", status: "Training Incomplete", score: 42, expiry: null, certUrl: null },
        { id: "TRN-004", branch: "Raipur", staff: "Pooja V.", module: "Inventory Control & Audit", status: "Expiring Soon", score: 85, expiry: "2026-03-15", certUrl: "#" },
    ],

    // ASSET LIBRARY & LEGAL VAULT
    assets: [
        { id: "AST-001", name: "HQ Approved Signage Kit v4", type: "Branding", version: "4.2", format: "CDR/PDF", size: "45MB" },
        { id: "AST-002", name: "Eye Camp Campaign 2026", type: "Marketing", version: "1.0", format: "ZIP/Assets", size: "120MB" },
    ],
    legalVault: [
        { id: "DOC-001", franchise: "Kriti Eye – Bhopal", docType: "Signed Agreement", version: "Final", date: "2024-04-01", file: "ag_bhopal_final.pdf" },
        { id: "DOC-002", franchise: "Kriti Eye – Bhopal", docType: "GST Certificate", version: "Recent", date: "2025-05-10", file: "gst_bhopal.pdf" },
    ],

    kpis: {
        totalFranchises: 6,
        activeFranchises: 4,
        networkRevenue: 3130000,
        networkRevenueGrowth: "+13.4%",
        avgHealthScore: 78.5,
        targetAchievement: 91,
        recruitmentPipeline: 12,
        unsettledRoyalty: 155000,
        upcomingRenewals: 1,
        trainingCompliance: "84%",
    },
};
