import {
    LayoutDashboard, Package, Tag, Award, BarChart3, Settings,
    ShoppingCart, Truck, FileText, Receipt, Warehouse, GitBranch,
    ArrowLeftRight, AlertTriangle, Clock, TrendingDown, BarChart2,
    PackageSearch, ShieldAlert, Users, RotateCcw, Lock, ListFilter,
    Layers, Ruler, Search, DollarSign
} from "lucide-react";

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────
export type InventoryModuleId =
    | "inv-dashboard"
    // Products
    | "inv-products"
    | "inv-variants"
    | "inv-units"
    | "inv-categories"
    | "inv-brands"
    // Stock
    | "inv-stock-ledger"
    | "inv-reserved-stock"
    | "inv-batch-tracking"
    | "inv-serial-tracking"
    | "inv-adjustments"
    // Purchase
    | "inv-vendors"
    | "inv-purchase-orders"
    | "inv-grn"
    | "inv-purchase-returns"
    | "inv-purchase-invoices"
    // Warehouse & Transfers
    | "inv-warehouses"
    | "inv-branch-stock"
    | "inv-transfers"
    // Sales Returns
    | "inv-sales-returns"
    // Alerts
    | "inv-low-stock"
    | "inv-expiry-alerts"
    | "inv-dead-stock"
    // Reports
    | "inv-valuation"
    | "inv-aging-report"
    | "inv-turnover"
    // Controls
    | "inv-approvals"
    | "inv-period-lock"
    | "inv-settings";

export interface InventoryNavItem {
    id: InventoryModuleId;
    label: string;
    icon: any;
    badge?: string;
    badgeVariant?: "error" | "warning" | "success" | "info";
}

export interface InventoryNavGroup {
    title: string;
    items: InventoryNavItem[];
}

export const INVENTORY_NAVIGATION: InventoryNavGroup[] = [
    {
        title: "Overview",
        items: [
            { id: "inv-dashboard", label: "Dashboard", icon: LayoutDashboard },
        ],
    },
    {
        title: "Product Master",
        items: [
            { id: "inv-products", label: "Products", icon: Package },
            { id: "inv-variants", label: "Variants", icon: Layers },
            { id: "inv-units", label: "Units & Conversions", icon: Ruler },
            { id: "inv-categories", label: "Categories", icon: Tag },
            { id: "inv-brands", label: "Brands", icon: Award },
        ],
    },
    {
        title: "Live Stock Mgmt",
        items: [
            { id: "inv-stock-ledger", label: "Stock Ledger", icon: PackageSearch },
            { id: "inv-reserved-stock", label: "Reserved Stock", icon: ShieldAlert, badge: "8", badgeVariant: "info" },
            { id: "inv-batch-tracking", label: "Batch & Expiry", icon: Clock },
            { id: "inv-serial-tracking", label: "Serial Tracking", icon: FileText },
            { id: "inv-adjustments", label: "Adjustments", icon: GitBranch },
        ],
    },
    {
        title: "Purchase & Landed Cost",
        items: [
            { id: "inv-vendors", label: "Vendors & MOQ", icon: Users },
            { id: "inv-purchase-orders", label: "Purchase Orders", icon: ShoppingCart },
            { id: "inv-grn", label: "GRN (Landed Cost)", icon: Truck },
            { id: "inv-purchase-returns", label: "Purchase Returns", icon: RotateCcw },
            { id: "inv-purchase-invoices", label: "Purchase Invoices", icon: Receipt },
        ],
    },
    {
        title: "Movement & Returns",
        items: [
            { id: "inv-warehouses", label: "Warehouses", icon: Warehouse },
            { id: "inv-transfers", label: "Stock Transfers", icon: ArrowLeftRight },
            { id: "inv-sales-returns", label: "Sales Returns", icon: RotateCcw, badge: "2", badgeVariant: "warning" },
        ],
    },
    {
        title: "Reports & Aging",
        items: [
            { id: "inv-aging-report", label: "Stock Aging", icon: BarChart3 },
            { id: "inv-valuation", label: "Stock Valuation", icon: DollarSign },
            { id: "inv-turnover", label: "Turnover Ratio", icon: TrendingDown },
        ],
    },
    {
        title: "Governance",
        items: [
            { id: "inv-approvals", label: "Approval Workflow", icon: ListFilter, badge: "4", badgeVariant: "warning" },
            { id: "inv-period-lock", label: "Period Lock", icon: Lock },
            { id: "inv-settings", label: "Settings", icon: Settings },
        ],
    },
];

// ─── MOCK DATA ────────────────────────────────────────────────────────
export const INVENTORY_DB = {
    products: [
        { id: "PRD-001", sku: "FRM-RB-001", barcode: "8901234567890", name: "Ray-Ban Aviator Classic", category: "Frames", brand: "Ray-Ban", type: "Frame", purchasePrice: 1200, sellingPrice: 2499, tax: 18, hsn: "90041000", reorderLevel: 10, moq: 5, unit: "PCS", status: "Active" },
        { id: "PRD-002", sku: "LNS-VR-1.67", barcode: "8901234567891", name: "Varilux CR-39 1.67 Progressive", category: "Lenses", brand: "Essilor", type: "Lens", purchasePrice: 800, sellingPrice: 1800, tax: 12, hsn: "90011000", reorderLevel: 20, moq: 20, unit: "PCS", status: "Low Stock" },
        { id: "PRD-003", sku: "MED-EYE-001", barcode: "8901234567892", name: "Ciprofloxacin Eye Drops 0.3%", category: "Medicines", brand: "Cipla", type: "Medicine", purchasePrice: 45, sellingPrice: 85, tax: 0, hsn: "30051000", reorderLevel: 30, moq: 50, unit: "STRIP", status: "Active" },
    ],
    variants: [
        { id: "VAR-001", baseProductId: "PRD-001", productName: "Ray-Ban Aviator Classic", variantName: "Color: Black Gold", sku: "FRM-RB-001-BG", stock: 12 },
        { id: "VAR-002", baseProductId: "PRD-001", productName: "Ray-Ban Aviator Classic", variantName: "Color: Silver Blue", sku: "FRM-RB-001-SB", stock: 8 },
        { id: "VAR-003", baseProductId: "PRD-002", productName: "Varilux CR-39 1.67", variantName: "Power: +1.00", sku: "LNS-VR-P100", stock: 15 },
    ],
    units: [
        { id: "UNT-001", name: "Box (10 Strips)", baseUnit: "STRIP", conversion: 10 },
        { id: "UNT-002", name: "Strip (10 Tablets)", baseUnit: "TABLET", conversion: 10 },
        { id: "UNT-003", name: "Outer (24 Boxes)", baseUnit: "BOX", conversion: 24 },
    ],
    stockSummary: [
        { id: "SS-001", product: "Ray-Ban Aviator Classic", physicalStock: 45, reservedStock: 8, inTransit: 10, damaged: 2, available: 25 },
        { id: "SS-002", product: "Varilux CR-39 Progressive", physicalStock: 8, reservedStock: 3, inTransit: 0, damaged: 0, available: 5 },
        { id: "SS-003", product: "Ciprofloxacin Eye Drops", physicalStock: 62, reservedStock: 12, inTransit: 50, damaged: 1, available: -1 }, // Example of potential double-sell alert
    ],
    reservations: [
        { id: "RSV-001", type: "Lab Job", reference: "LAB-2026-042", product: "Varilux CR-39 Progressive", qty: 2, status: "Active", reservedOn: "2026-02-19" },
        { id: "RSV-002", type: "Ecommerce", reference: "ORD-99120", product: "Ray-Ban Aviator Classic", qty: 1, status: "Active", reservedOn: "2026-02-18" },
        { id: "RSV-003", type: "POS Cart", reference: "POS-MAIN-01", product: "Ray-Ban Aviator Classic", qty: 3, status: "Expired", reservedOn: "2026-02-19" },
    ],
    landedCosts: [
        { id: "LC-001", grnRef: "GRN-2026-001", baseAmount: 38000, transport: 1200, gst: 6840, handling: 500, totalLandedCost: 46540, unitLandedCost: 23270 },
        { id: "LC-002", grnRef: "GRN-2026-002", baseAmount: 48000, transport: 800, gst: 5760, handling: 300, totalLandedCost: 54860, unitLandedCost: 18286 },
    ],
    returns: [
        { id: "PRT-001", type: "Purchase Return", reference: "RET-VND-001", vendor: "Luxottica", items: 2, amount: 2400, reason: "Defective Frame Hinges", status: "Refunded" },
        { id: "SRT-001", type: "Sales Return", reference: "RET-CUST-982", customer: "John Doe", items: 1, amount: 2499, reason: "Size Mismatch", status: "Restocked (Good)" },
    ],
    aging: [
        { id: "AG-001", product: "Polo Rimmed Frame v2", qty: 22, val: 18700, range: "180+ Days (Dead)", lastSold: "2025-07-15" },
        { id: "AG-002", product: "Essilor Crizal Sapphire", qty: 15, val: 32000, range: "90-180 Days", lastSold: "2025-11-05" },
        { id: "AG-003", product: "Ray-Ban Aviator Classic", qty: 45, val: 54000, range: "0-30 Days", lastSold: "2026-02-18" },
    ],
    approvals: [
        { id: "APP-001", module: "Stock Adjustment", reference: "ADJ-2026-102", amount: 12500, requestedBy: "Store Keeper", status: "Pending", priority: "High" },
        { id: "APP-002", module: "Purchase Order", reference: "PO-2026-881", amount: 155000, requestedBy: "Inventory Mgr", status: "Pending", priority: "Urgent" },
    ],
    periodLocks: [
        { id: "LOCK-001", period: "Jan 2026", lockedOn: "2026-02-05", lockedBy: "Fin Manager", status: "Locked" },
        { id: "LOCK-002", period: "Feb 2026", lockedOn: "-", lockedBy: "-", status: "Open" },
    ],
    // Keep base data from previous version
    stockLedger: [
        { id: "SL-001", productId: "PRD-001", productName: "Ray-Ban Aviator Classic", type: "IN", reference: "GRN-2026-001", qty: 20, balanceQty: 45, date: "2026-02-18", branch: "Main Store", createdBy: "Store Manager" },
    ],
    batches: [], serials: [], vendors: [], purchaseOrders: [], grn: [], purchases: [], warehouses: [], branchStock: [], transfers: [], lowStock: [], expiryAlerts: [], deadStock: [], categories: [], brands: [], adjustments: []
};
