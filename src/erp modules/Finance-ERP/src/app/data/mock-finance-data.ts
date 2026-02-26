
import { ChartOfAccount, Invoice, Expense } from "../finance-types";

export const MOCK_ACCOUNTS: ChartOfAccount[] = [
    { id: "1", code: "1001", name: "Main Bank Account", type: "Asset", category: "Cash & Bank", balance: 4500000, currency: "INR" },
    { id: "2", code: "1200", name: "Accounts Receivable", type: "Asset", category: "Current Asset", balance: 1250000, currency: "INR" },
    { id: "3", code: "2100", name: "Accounts Payable", type: "Liability", category: "Current Liability", balance: 650000, currency: "INR" },
    { id: "4", code: "4000", name: "Service Revenue", type: "Income", category: "Revenue", balance: 8500000, currency: "INR" },
    { id: "5", code: "5000", name: "Salaries & Wages", type: "Expense", category: "Operating Expense", balance: 2500000, currency: "INR" },
    { id: "6", code: "5100", name: "Office Rent", type: "Expense", category: "Operating Expense", balance: 300000, currency: "INR" },
];

export const MOCK_INVOICES: Invoice[] = [
    {
        id: "INV-2024-001",
        invoice_number: "INV-2024-001",
        client_name: "Tech Solutions Inc.",
        project_id: "proj_001",
        date: "2024-02-15",
        due_date: "2024-03-15",
        amount: 250000,
        tax_amount: 45000,
        total_amount: 295000,
        status: "Paid",
        items: [
            { description: "MVP Development - Phase 1", quantity: 1, unit_price: 250000, amount: 250000 }
        ]
    },
    {
        id: "INV-2024-002",
        invoice_number: "INV-2024-002",
        client_name: "Global Retailers",
        project_id: "proj_002",
        date: "2024-02-20",
        due_date: "2024-03-20",
        amount: 150000,
        tax_amount: 27000,
        total_amount: 177000,
        status: "Sent",
        items: [
            { description: "Cloud Migration Strategy", quantity: 1, unit_price: 150000, amount: 150000 }
        ]
    }
];

export const MOCK_EXPENSES: Expense[] = [
    { id: "EXP-001", date: "2024-02-10", category: "Marketing", payee: "Google Ads", amount: 50000, status: "Approved", payment_mode: "Corporate Card" },
    { id: "EXP-002", date: "2024-02-12", category: "Infrastructure", payee: "AWS", amount: 120000, status: "Approved", payment_mode: "Bank Transfer" },
];
