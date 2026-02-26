import * as React from "react";
import { useNavigate } from "react-router";
import FranchiseApp from "../../erp modules/Kriti-CRM/src/app/FranchiseApp";

export default function FranchisePage() {
    const navigate = useNavigate();

    const savedUser = localStorage.getItem('alphery_user');
    const user = savedUser ? JSON.parse(savedUser) : null;

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <div className="h-screen w-full bg-slate-50 overflow-hidden">
            <FranchiseApp
                onBackToWorkspace={() => navigate("/workspace")}
                initialUser={{ name: user.name, role: user.role || 'Franchise Manager' }}
                skipLoader={false}
            />
        </div>
    );
}
