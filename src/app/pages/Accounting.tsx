import * as React from "react";
import { useNavigate } from "react-router";
import AccountingApp from "../../erp modules/Kriti-CRM/src/app/AccountingApp";

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
            <AccountingApp
                onBackToWorkspace={() => navigate("/workspace")}
                initialUser={{ name: user.name, role: user.role || 'Chief Accountant' }}
                skipLoader={false}
            />
        </div>
    );
}
