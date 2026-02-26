
import { db, getCurrentTenantId } from "../../../../app/core/firebase";
import { collection, addDoc, query, where, getDocs, orderBy, updateDoc, doc } from "firebase/firestore";
import { Invoice, Expense, ChartOfAccount } from "./finance-types";

const TENANT_ID = getCurrentTenantId();

export const financeService = {
    // Invoices
    async getInvoices(): Promise<Invoice[]> {
        if (!TENANT_ID) return [];
        const q = query(collection(db, "finance_invoices"), where("tenant_id", "==", TENANT_ID), orderBy("date", "desc"));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Invoice));
    },

    async createInvoice(invoice: Omit<Invoice, "id">) {
        if (!TENANT_ID) return;
        return await addDoc(collection(db, "finance_invoices"), {
            ...invoice,
            tenant_id: TENANT_ID,
            created_at: new Date().toISOString()
        });
    },

    // Expenses
    async getExpenses(): Promise<Expense[]> {
        if (!TENANT_ID) return [];
        const q = query(collection(db, "finance_expenses"), where("tenant_id", "==", TENANT_ID), orderBy("date", "desc"));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Expense));
    },

    async createExpense(expense: Omit<Expense, "id">) {
        if (!TENANT_ID) return;
        return await addDoc(collection(db, "finance_expenses"), {
            ...expense,
            tenant_id: TENANT_ID,
            created_at: new Date().toISOString()
        });
    },

    // Chart of Accounts
    async getAccounts(): Promise<ChartOfAccount[]> {
        if (!TENANT_ID) return [];
        const q = query(collection(db, "finance_accounts"), where("tenant_id", "==", TENANT_ID));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as ChartOfAccount));
    }
};
