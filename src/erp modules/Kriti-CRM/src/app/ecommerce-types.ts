import {
    LayoutDashboard, ShoppingBag, Tag, ShoppingCart, CreditCard,
    Package, Truck, Undo2, Users, Megaphone, BarChart3, Settings,
    Search, Heart, Star, Globe, Zap, Clock, ShieldCheck, Mail,
    MessageSquare, Smartphone, Wallet, Ticket, Calendar, UserCheck
} from "lucide-react";

export type EcommerceModuleId =
    | "ec-dashboard"
    | "ec-storefront"
    | "ec-products"
    | "ec-offers"
    | "ec-cart-checkout"
    | "ec-payments"
    | "ec-orders"
    | "ec-shipping"
    | "ec-returns"
    | "ec-customers"
    | "ec-marketing"
    | "ec-loyalty"
    | "ec-analytics"
    | "ec-settings";

export interface EcommerceNavItem {
    id: EcommerceModuleId;
    label: string;
    icon: any;
    badge?: string;
    badgeVariant?: "error" | "warning" | "success" | "info" | "neutral";
}
export interface EcommerceNavGroup {
    title: string;
    items: EcommerceNavItem[];
}

export const EC_BRAND = "#42A5F5"; // Bright Blue — matches workspace icon

export const ECOMMERCE_NAVIGATION: EcommerceNavGroup[] = [
    {
        title: "Store Management",
        items: [
            { id: "ec-dashboard", label: "Store Dashboard", icon: LayoutDashboard },
            { id: "ec-storefront", label: "Live Storefront", icon: Globe, badge: "Preview", badgeVariant: "info" },
            { id: "ec-products", label: "Catalog Manager", icon: ShoppingBag },
            { id: "ec-offers", label: "Pricing & Offers", icon: Tag, badge: "3 Active", badgeVariant: "success" },
        ],
    },
    {
        title: "Sales Lifecycle",
        items: [
            { id: "ec-orders", label: "Order Management", icon: Package, badge: "14 New", badgeVariant: "error" },
            { id: "ec-cart-checkout", label: "Abandoned Carts", icon: ShoppingCart, badge: "₹45K", badgeVariant: "warning" },
            { id: "ec-payments", label: "Payment Registry", icon: CreditCard },
            { id: "ec-shipping", label: "Shipping & Logistics", icon: Truck },
        ],
    },
    {
        title: "Post-Purchase",
        items: [
            { id: "ec-returns", label: "Returns & Refunds", icon: Undo2, badge: "2 Pending", badgeVariant: "warning" },
            { id: "ec-customers", label: "Customer Accounts", icon: Users },
            { id: "ec-loyalty", label: "Loyalty & Wallet", icon: Wallet },
        ],
    },
    {
        title: "Growth & Controls",
        items: [
            { id: "ec-marketing", label: "Marketing Campaigns", icon: Megaphone },
            { id: "ec-analytics", label: "Sales Analytics", icon: BarChart3 },
            { id: "ec-settings", label: "Store Settings", icon: Settings },
        ],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
//  ECOMMERCE MOCK DATABASE
// ─────────────────────────────────────────────────────────────────────────────
export const ECOMMERCE_DB = {

    // 1️⃣ PRODUCTS (Synced with Inventory)
    products: [
        { id: "EC-PRD-001", sku: "RAY-AVI-BLK-01", name: "Ray-Ban Aviator Classic", category: "Eyewear", price: 8500, compareAtPrice: 10500, stock: 45, image: "https://images.unsplash.com/photo-1572635196237-14b3f281303f?auto=format&fit=crop&q=80&w=200", status: "Active", type: "Physical", weight: "250g", tax: 18, warranty: "12 Months" },
        { id: "EC-PRD-002", sku: "OAK-HLB-09", name: "Oakley Holbrook Prizm", category: "Eyewear", price: 12500, compareAtPrice: null, stock: 12, image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=200", status: "Active", type: "Physical", weight: "280g", tax: 18, warranty: "24 Months" },
        { id: "EC-PRD-003", sku: "LNS-ACC-DLY-01", name: "Acuvue Moist Daily (30p)", category: "Contacts", price: 2400, compareAtPrice: 2800, stock: 120, image: "https://images.unsplash.com/photo-1629198688463-5462fc18df86?auto=format&fit=crop&q=80&w=200", status: "Active", type: "Physical", weight: "50g", tax: 12, warranty: "6 Months" },
        { id: "EC-PRD-004", sku: "SRV-EYE-CHK-01", name: "Comprehensive Eye Checkup", category: "Services", price: 500, compareAtPrice: 750, stock: 999, image: "https://images.unsplash.com/photo-1576091160550-2173bdd99625?auto=format&fit=crop&q=80&w=200", status: "Active", type: "Service", weight: "0", tax: 0, warranty: "N/A" },
        { id: "EC-PRD-005", sku: "BUN-OPT-HLT-01", name: "Computer Vision Eye Bundle", category: "Bundles", price: 4999, compareAtPrice: 6500, stock: 15, image: "https://images.unsplash.com/photo-1473966116484-68c176866b67?auto=format&fit=crop&q=80&w=200", status: "Draft", type: "Bundle", weight: "400g", tax: 18, warranty: "12 Months" },
    ],

    // 2️⃣ ORDERS (OMS)
    orders: [
        { id: "EC-ORD-2026-0001", customer: "Amit Sharma", email: "amit@example.com", items: 2, total: 11500, status: "Placed", date: "2026-02-19 21:05", payment: "UPI", fulfillment: "Pending", branch: "Bhopal HQ" },
        { id: "EC-ORD-2026-0002", customer: "Priya Singh", email: "priya@example.com", items: 1, total: 2400, status: "Shipped", date: "2026-02-19 14:30", payment: "Card", fulfillment: "Delhi Logistics", tracking: "DLY82910" },
        { id: "EC-ORD-2026-0003", customer: "Rahul Varma", email: "rahul@example.com", items: 3, total: 18400, status: "Confirmed", date: "2026-02-18 10:15", payment: "COD", fulfillment: "In Production", branch: "Indore Branch" },
        { id: "EC-ORD-2026-0004", customer: "Neha Dubey", email: "neha@example.com", items: 1, total: 8500, status: "Delivered", date: "2026-02-15 11:00", payment: "UPI", fulfillment: "Delivered", tracking: "DLY77612" },
        { id: "EC-ORD-2026-0005", customer: "Sameer Khan", email: "sameer@example.com", items: 2, total: 4800, status: "Returned", date: "2026-02-10 16:45", payment: "Card", fulfillment: "Return Received", tracking: "RET-2210" },
    ],

    // 3️⃣ ABANDONED CARTS
    abandonedCarts: [
        { id: "CRT-0129", customer: "Vikram P.", items: ["Oakley Holbrook"], value: 12500, date: "2026-02-19 20:15", reminderSent: "No", status: "Active" },
        { id: "CRT-0125", customer: "Sonia G.", items: ["Ray-Ban Aviator", "Contact Lens"], value: 10900, date: "2026-02-19 12:30", reminderSent: "D-1 Sent", status: "Recovered" },
        { id: "CRT-0120", customer: "Karan Johar", items: ["Computer Vision Bundle"], value: 4999, date: "2026-02-18 09:45", reminderSent: "D-2 Sent", status: "Expired" },
    ],

    // 4️⃣ OFFERS & COUPONS
    offers: [
        { id: "CPR-EYE-10", code: "EYE10", type: "Percentage", value: 10, minPurchase: 2000, status: "Active", usage: 145, description: "10% Off on all Eyewear" },
        { id: "CPR-FIRST-NEW", code: "WELCOME500", type: "Fixed", value: 500, minPurchase: 3000, status: "Active", usage: 22, description: "₹500 Off for first time users" },
        { id: "CPR-BOGO-LNS", code: "BOGOLENS", type: "BOGO", value: 0, minPurchase: 0, status: "Inactive", usage: 0, description: "Buy 1 Get 1 on Contact Lenses" },
    ],

    // 5️⃣ PAYMENTS & RECONCILIATION
    payments: [
        { id: "PAY-EC-001", order: "EC-ORD-2026-0001", method: "Razorpay (UPI)", amount: 11500, gatewayRef: "rzp_test_9210", settlementStatus: "Clearing", accountingPosted: true },
        { id: "PAY-EC-002", order: "EC-ORD-2026-0002", method: "Stripe (Card)", amount: 2400, gatewayRef: "ch_921029", settlementStatus: "Settled", accountingPosted: true },
        { id: "PAY-EC-003", order: "EC-ORD-2026-0003", method: "COD", amount: 18400, gatewayRef: "CASH_REF_01", settlementStatus: "Pending Cash", accountingPosted: false },
    ],

    // 6️⃣ RETURNS & REFUNDS
    returns: [
        { id: "RET-EC-001", order: "EC-ORD-2026-0005", reason: "Fitment Issue", type: "Refund", status: "Received & Approved", amount: 4800, inventorySync: "Back to Stock", accountingReversal: "Posted" },
        { id: "RET-EC-002", order: "EC-ORD-2026-0002", reason: "Damaged on Arrival", type: "Replacement", status: "Approval Pending", amount: 2400, inventorySync: "Pending", accountingReversal: "N/A" },
    ],

    // 7️⃣ CUSTOMER ACCOUNTS EXTRAS
    customers: [
        { id: "EC-CUST-01", name: "Amit Sharma", email: "amit@example.com", orders: 4, walletBalance: 450, loyaltyPoints: 1200, prescription: "PR-2026-001.pdf", status: "Active" },
        { id: "EC-CUST-02", name: "Priya Singh", email: "priya@example.com", orders: 12, walletBalance: 120, loyaltyPoints: 4500, prescription: "PR-2025-092.pdf", status: "VIP" },
    ],

    // 8️⃣ KPI ANALYTICS
    kpis: {
        dailySales: 45200,
        monthlySales: 1245000,
        conversionRate: "3.2%",
        aov: 5850,
        activeOrders: 14,
        returnsPending: 2,
        abandonedValue: 45000,
        repeatCustomerRate: "28%",
        topCategory: "Eyewear (68%)",
        settlementPending: 82000,
    },
};
