import * as React from 'react';
import HRApp from '../../erp modules/Kriti-CRM/src/app/HRApp';
import { useNavigate } from 'react-router';

export default function HRPage() {
    const navigate = useNavigate();

    const savedUser = localStorage.getItem('alphery_user');
    const user = savedUser ? JSON.parse(savedUser) : null;

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <div className="fixed inset-0 bg-white z-50">
            <HRApp
                onBackToWorkspace={() => navigate('/workspace')}
                initialUser={{ name: user.name, role: user.role || 'HR Manager' }}
                skipLoader={false}
            />
        </div>
    );
}
