import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import CRMApp from '../../erp modules/Kriti-CRM/src/app/App';
import '../../erp modules/Kriti-CRM/src/styles/index.css';

export default function CRMPage() {
    const navigate = useNavigate();

    const savedUser = localStorage.getItem('alphery_user');
    const user = savedUser ? JSON.parse(savedUser) : null;

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen w-screen overflow-hidden"
        >
            <CRMApp
                onBackToWorkspace={() => navigate('/workspace', { replace: true })}
                initialUser={{ name: user.name, role: user.role || 'Sales Manager' }}
                skipLoader={false}
            />
        </motion.div>
    );
}
