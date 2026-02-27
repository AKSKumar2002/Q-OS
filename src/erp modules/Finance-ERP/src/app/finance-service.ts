
import { db, getCurrentTenantId } from "../../../../app/core/firebase";
import { collection, addDoc, query, where, getDocs, orderBy, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Invoice, Expense, ChartOfAccount, Customer, Vendor, ProductItem } from "./finance-types";

const TENANT_ID = getCurrentTenantId();

export const financeService = {
    // ─── INVOICES ─────────────────────────────────────────────────────
    async getInvoices(): Promise<Invoice[]> {
        if (!TENANT_ID) return [];
        const q = query(collection(db, "finance_invoices"), where("tenant_id", "==", TENANT_ID), orderBy("date", "desc"));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Invoice));
    },
    async createInvoice(invoice: Omit<Invoice, "id">) {
        if (!TENANT_ID) return;
        return await addDoc(collection(db, "finance_invoices"), { ...invoice, tenant_id: TENANT_ID, created_at: new Date().toISOString() });
    },
    async updateInvoice(id: string, data: Partial<Invoice>) {
        return await updateDoc(doc(db, "finance_invoices", id), data as any);
    },
    async deleteInvoice(id: string) {
        return await deleteDoc(doc(db, "finance_invoices", id));
    },

    // ─── EXPENSES ─────────────────────────────────────────────────────
    async getExpenses(): Promise<Expense[]> {
        if (!TENANT_ID) return [];
        const q = query(collection(db, "finance_expenses"), where("tenant_id", "==", TENANT_ID), orderBy("date", "desc"));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Expense));
    },
    async createExpense(expense: Omit<Expense, "id">) {
        if (!TENANT_ID) return;
        return await addDoc(collection(db, "finance_expenses"), { ...expense, tenant_id: TENANT_ID, created_at: new Date().toISOString() });
    },
    async updateExpense(id: string, data: Partial<Expense>) {
        return await updateDoc(doc(db, "finance_expenses", id), data as any);
    },
    async deleteExpense(id: string) {
        return await deleteDoc(doc(db, "finance_expenses", id));
    },

    // ─── CHART OF ACCOUNTS ────────────────────────────────────────────
    async getAccounts(): Promise<ChartOfAccount[]> {
        if (!TENANT_ID) return [];
        const q = query(collection(db, "finance_accounts"), where("tenant_id", "==", TENANT_ID));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as ChartOfAccount));
    },
    async createAccount(account: Omit<ChartOfAccount, "id">) {
        if (!TENANT_ID) return;
        return await addDoc(collection(db, "finance_accounts"), { ...account, tenant_id: TENANT_ID, created_at: new Date().toISOString() });
    },
    async deleteAccount(id: string) {
        return await deleteDoc(doc(db, "finance_accounts", id));
    },

    // ─── CUSTOMERS ────────────────────────────────────────────────────
    async getCustomers(): Promise<Customer[]> {
        if (!TENANT_ID) return [];
        const q = query(collection(db, "finance_customers"), where("tenant_id", "==", TENANT_ID));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Customer));
    },
    async createCustomer(customer: Omit<Customer, "id">) {
        if (!TENANT_ID) return;
        return await addDoc(collection(db, "finance_customers"), { ...customer, tenant_id: TENANT_ID, created_at: new Date().toISOString() });
    },
    async updateCustomer(id: string, data: Partial<Customer>) {
        return await updateDoc(doc(db, "finance_customers", id), data as any);
    },
    async deleteCustomer(id: string) {
        return await deleteDoc(doc(db, "finance_customers", id));
    },

    // ─── VENDORS ──────────────────────────────────────────────────────
    async getVendors(): Promise<Vendor[]> {
        if (!TENANT_ID) return [];
        const q = query(collection(db, "finance_vendors"), where("tenant_id", "==", TENANT_ID));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Vendor));
    },
    async createVendor(vendor: Omit<Vendor, "id">) {
        if (!TENANT_ID) return;
        return await addDoc(collection(db, "finance_vendors"), { ...vendor, tenant_id: TENANT_ID, created_at: new Date().toISOString() });
    },
    async updateVendor(id: string, data: Partial<Vendor>) {
        return await updateDoc(doc(db, "finance_vendors", id), data as any);
    },
    async deleteVendor(id: string) {
        return await deleteDoc(doc(db, "finance_vendors", id));
    },

    // ─── ITEMS / PRODUCTS ─────────────────────────────────────────────
    async getItems(): Promise<ProductItem[]> {
        if (!TENANT_ID) return [];
        const q = query(collection(db, "finance_items"), where("tenant_id", "==", TENANT_ID));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as ProductItem));
    },
    async createItem(item: Omit<ProductItem, "id">) {
        if (!TENANT_ID) return;
        return await addDoc(collection(db, "finance_items"), { ...item, tenant_id: TENANT_ID, created_at: new Date().toISOString() });
    },
    async updateItem(id: string, data: Partial<ProductItem>) {
        return await updateDoc(doc(db, "finance_items", id), data as any);
    },
    async deleteItem(id: string) {
        return await deleteDoc(doc(db, "finance_items", id));
    },
};
