import * as React from "react";
import { useNavigate } from 'react-router';
import FinanceApp from "../../erp modules/Finance-ERP/src/app/FinanceApp";

export default function AccountingPage() {
    const navigate = useNavigate();

    const savedUser = localStorage.getItem('alphery_user');
    const user = savedUser ? JSON.parse(savedUser) : null;

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <div className="h-screen w-full bg-slate-50 overflow-hidden">
            <FinanceApp
                onBackToWorkspace={() => navigate("/workspace")}
                initialUser={{ name: user.name, role: user.role || 'CFO' }}
            />
        </div>
    );
}
