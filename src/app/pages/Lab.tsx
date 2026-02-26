import React from 'react';
import { useNavigate } from 'react-router';
import LabApp from '../../erp modules/Kriti-CRM/src/app/LabApp';

export default function Lab() {
    const navigate = useNavigate();

    const savedUser = localStorage.getItem('alphery_user');
    const user = savedUser ? JSON.parse(savedUser) : null;

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <LabApp
            onBackToWorkspace={() => navigate('/workspace')}
            initialUser={{ name: user.name, role: user.role || 'Lab Manager' }}
            skipLoader={false}
        />
    );
}
