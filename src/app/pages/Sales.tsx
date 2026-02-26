import * as React from "react";
import { useNavigate } from "react-router";
import SalesApp from "../../erp modules/Kriti-CRM/src/app/SalesApp";

export default function SalesPage() {
    const navigate = useNavigate();

    const savedUser = localStorage.getItem('alphery_user');
    const user = savedUser ? JSON.parse(savedUser) : null;

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <div className="h-screen w-full bg-slate-50 overflow-hidden">
            <SalesApp
                onBackToWorkspace={() => navigate("/workspace")}
                initialUser={{ name: user.name, role: user.role || 'Sales Manager' }}
                skipLoader={false}
            />
        </div>
    );
}
