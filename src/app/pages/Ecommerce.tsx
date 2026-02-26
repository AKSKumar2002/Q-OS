import * as React from "react";
import { useNavigate } from "react-router";
import EcommerceApp from "../../erp modules/Kriti-CRM/src/app/EcommerceApp";

export default function EcommercePage() {
    const navigate = useNavigate();

    const savedUser = localStorage.getItem('alphery_user');
    const user = savedUser ? JSON.parse(savedUser) : null;

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <div className="h-screen w-full bg-slate-50 overflow-hidden">
            <EcommerceApp
                onBackToWorkspace={() => navigate("/workspace")}
                initialUser={{ name: user.name, role: user.role || 'Ecommerce Manager' }}
                skipLoader={false}
            />
        </div>
    );
}
