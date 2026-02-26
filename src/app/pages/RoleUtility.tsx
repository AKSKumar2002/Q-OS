import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ShieldCheck,
    ArrowLeft,
    Search,
    UserPlus,
    Save,
    Shield,
    CheckCircle2,
    XCircle,
    Loader2,
    Lock,
    Building2,
    Plus,
    Eye,
    EyeOff,
    Zap,
    Upload
} from 'lucide-react';
import { useNavigate } from 'react-router';

const SYSTEM_APPS = [
    { id: 'crm', title: 'CRM' },
    { id: 'hospital', title: 'Hospital' },
    { id: 'optical', title: 'Optical Lab' },
    { id: 'inventory', title: 'Inventory' },
    { id: 'hr', title: 'HR & Payroll' },
    { id: 'finance', title: 'Accounting' },
    { id: 'franchise', title: 'Sales' },
    { id: 'ecommerce', title: 'Ecommerce' },
    { id: 'franchise-mgr', title: 'Franchise Manager' },
    { id: 'analytics', title: 'Analytics' },
    { id: 'communication', title: 'Communication' },
    { id: 'system-control', title: 'System Control' },
    { id: 'helpdesk', title: 'Support' },
    { id: 'projects', title: 'Projects' },
    { id: 'role-utility', title: 'Role Utility' }
];

const GS_API_URL = import.meta.env.VITE_GS_API_URL || 'https://script.google.com/macros/s/AKfycbw0fpKTKyAFen2dPZynK-kfUg5EUyR5sjBCVgMgbsw6urIL8sHPmASHk2_942cnJVgL/exec';

const APP_TO_CODE: Record<string, string> = {
    'crm': 'c',
    'hospital': 'h',
    'optical': 'o',
    'inventory': 'i',
    'hr': 'p',
    'finance': 'f',
    'franchise': 's',
    'ecommerce': 'e',
    'franchise-mgr': 'm',
    'analytics': 'a',
    'communication': 'x',
    'system-control': 'u',
    'helpdesk': 'd',
    'projects': 'pr',
    'role-utility': 'ru'
};

const CODE_TO_APP: Record<string, string> = Object.fromEntries(
    Object.entries(APP_TO_CODE).map(([k, v]) => [v, k])
);

const GENERIC_ROLES = [
    { group: 'Platform', roles: ['Super Admin'] },
    { group: 'Management', roles: ['Owner', 'CEO', 'Director', 'Manager', 'Team Lead'] },
    { group: 'Operations', roles: ['Operations Head', 'Supervisor', 'Staff', 'Operator'] },
    { group: 'Administrative', roles: ['Admin', 'Receptionist', 'HR Manager', 'Accountant'] },
    { group: 'Sales & Marketing', roles: ['Sales Head', 'Sales Executive', 'Marketing Lead'] },
    { group: 'Support', roles: ['Customer Support', 'IT Support'] }
];

const INDUSTRY_ROLES: Record<string, { group: string, roles: string[] }[]> = {
    // Healthcare
    'Hospital': [
        { group: 'Platform', roles: ['Super Admin'] },
        { group: 'Tenant Management', roles: ['Tenant Owner', 'Operations Manager'] },
        { group: 'Clinical', roles: ['Doctor', 'Nurse', 'Surgeon', 'Receptionist'] },
        { group: 'Laboratory', roles: ['Lab Technician', 'Lab Manager'] },
        { group: 'Inventory', roles: ['Inventory Manager', 'Store Keeper'] },
        { group: 'Finance', roles: ['Accountant', 'Finance Manager'] },
        { group: 'HR & Administrative', roles: ['HR Manager', 'Branch Manager'] },
        { group: 'Growth & Marketing', roles: ['Sales Executive', 'Marketing Manager'] },
        { group: 'Technical Support', roles: ['IT Support'] }
    ],
    'Clinic': GENERIC_ROLES,
    'Diagnostic Center': GENERIC_ROLES,
    'Pharmacy': GENERIC_ROLES,
    'Medical Devices': GENERIC_ROLES,
    'Telemedicine': GENERIC_ROLES,

    // Education
    'School': GENERIC_ROLES,
    'College / University': GENERIC_ROLES,
    'Coaching Center': GENERIC_ROLES,
    'EdTech': GENERIC_ROLES,
    'Training Institute': GENERIC_ROLES,

    // Banking & Finance
    'Bank': GENERIC_ROLES,
    'NBFC': GENERIC_ROLES,
    'FinTech': GENERIC_ROLES,
    'Investment Firm': GENERIC_ROLES,
    'Accounting Firm': GENERIC_ROLES,

    // Retail & Commerce
    'Retail & Store': [ // Preserving existing key
        { group: 'Platform', roles: ['Super Admin'] },
        { group: 'Management', roles: ['Store Manager', 'Shift Supervisor'] },
        { group: 'Sales', roles: ['Sales Assistant', 'Cashier', 'Visual Merchandiser'] },
        { group: 'Logistics', roles: ['Warehouse Incharge', 'Delivery Head'] }
    ],
    'Retail Store': GENERIC_ROLES,
    'Supermarket': GENERIC_ROLES,
    'Wholesale': GENERIC_ROLES,
    'E-commerce': GENERIC_ROLES,
    'Distribution': GENERIC_ROLES,

    // Manufacturing
    'FMCG': GENERIC_ROLES,
    'Textile': GENERIC_ROLES,
    'Automobile': GENERIC_ROLES,
    'Electronics': GENERIC_ROLES,
    'Machinery': GENERIC_ROLES,
    'Food Processing': GENERIC_ROLES,
    'Automotive': [ // Preserving existing key
        { group: 'Platform', roles: ['Super Admin'] },
        { group: 'Showroom', roles: ['Showroom Manager', 'Sales Consultant', 'Receptionist'] },
        { group: 'Workshop', roles: ['Service Manager', 'Chief Mechanic', 'Service Advisor', 'Technician'] },
        { group: 'Spare Parts', roles: ['Inventory Manager', 'Parts Executive'] },
        { group: 'Accounts', roles: ['Accountant', 'Billing Executive'] }
    ],

    // Food & Hospitality
    'Food & Beverage': [ // Preserving existing key
        { group: 'Platform', roles: ['Super Admin'] },
        { group: 'Management', roles: ['Restaurant Manager', 'Floor Manager', 'F&B Manager'] },
        { group: 'Kitchen', roles: ['Head Chef', 'Sous Chef', 'Line Cook', 'Pantry'] },
        { group: 'Service', roles: ['Server', 'Cashier', 'Bartender', 'Host/Hostess'] },
        { group: 'Operations', roles: ['Inventory Head', 'Procurement Officer'] }
    ],
    'Restaurant': GENERIC_ROLES,
    'Cafe': GENERIC_ROLES,
    'Hotel': GENERIC_ROLES,
    'Resort': GENERIC_ROLES,
    'Catering': GENERIC_ROLES,

    // Logistics & Transport
    'Transportation': GENERIC_ROLES,
    'Courier Service': GENERIC_ROLES,
    'Warehousing': GENERIC_ROLES,
    'Shipping': GENERIC_ROLES,
    'Fleet Management': GENERIC_ROLES,

    // Construction & Real Estate
    'Construction Company': GENERIC_ROLES,
    'Real Estate Developer': GENERIC_ROLES,
    'Property Management': GENERIC_ROLES,
    'Interior Design': GENERIC_ROLES,
    'Architecture': GENERIC_ROLES,

    // Agriculture
    'Farming': GENERIC_ROLES,
    'AgriTech': GENERIC_ROLES,
    'Dairy': GENERIC_ROLES,
    'Poultry': GENERIC_ROLES,
    'Fisheries': GENERIC_ROLES,

    // IT & Technology
    'IT & Software': [ // Preserving existing key
        { group: 'Platform', roles: ['Super Admin'] },
        { group: 'Management', roles: ['Project Manager', 'CTO', 'Product Manager', 'Team Lead'] },
        { group: 'Engineering', roles: ['Senior Developer', 'Junior Developer', 'QA Engineer', 'DevOps'] },
        { group: 'Design', roles: ['UI/UX Designer', 'Product Designer'] },
        { group: 'Sales & Business', roles: ['Business Analyst', 'Sales Manager', 'Account Manager'] },
        { group: 'HR & Finance', roles: ['HR Executive', 'Accountant'] }
    ],
    'IT Services': GENERIC_ROLES,
    'Software Company': GENERIC_ROLES,
    'SaaS Company': GENERIC_ROLES,
    'Cybersecurity': GENERIC_ROLES,
    'AI / Data Company': GENERIC_ROLES,

    // Corporate Services
    'Consulting': GENERIC_ROLES,
    'Legal Firm': GENERIC_ROLES,
    'HR Services': GENERIC_ROLES,
    'Marketing Agency': GENERIC_ROLES,
    'Event Management': GENERIC_ROLES,

    // Energy
    'Power Generation': GENERIC_ROLES,
    'Renewable Energy': GENERIC_ROLES,
    'Oil & Gas': GENERIC_ROLES,
    'Water Supply': GENERIC_ROLES,

    // Government
    'Government Department': GENERIC_ROLES,
    'Public Service': GENERIC_ROLES,
    'Defense': GENERIC_ROLES,

    // Media
    'Production House': GENERIC_ROLES,
    'Advertising Agency': GENERIC_ROLES,
    'Gaming': GENERIC_ROLES, // from media category
    'Streaming': GENERIC_ROLES,

    // Lifestyle
    'Gym': GENERIC_ROLES,
    'Salon': GENERIC_ROLES,
    'Spa': GENERIC_ROLES,
    'Fashion Brand': GENERIC_ROLES,

    // Insurance
    'Life Insurance': GENERIC_ROLES,
    'General Insurance': GENERIC_ROLES,
    'Insurance Broker': GENERIC_ROLES,

    // BPO
    'Call Center': GENERIC_ROLES,
    'Outsourcing Services': GENERIC_ROLES,

    // Research
    'R&D Lab': GENERIC_ROLES,
    'Testing Lab': GENERIC_ROLES,
    'Biotechnology': GENERIC_ROLES,

    // Mining
    'Mining': GENERIC_ROLES,
    'Steel': GENERIC_ROLES,
    'Metal Processing': GENERIC_ROLES,

    // Aviation
    'Airline': GENERIC_ROLES,
    'Airport': GENERIC_ROLES,
    'Port Authority': GENERIC_ROLES,

    // Security
    'Private Security': GENERIC_ROLES,
    'Defense Contractor': GENERIC_ROLES,

    // Franchise
    'Franchise Network': GENERIC_ROLES,
    'Multi-Branch Enterprise': GENERIC_ROLES,

    // Religious
    'Temple / Church / Mosque Management': GENERIC_ROLES,
    'Charitable Trust': GENERIC_ROLES,

    // NGO
    'NGO / Non-Profit': GENERIC_ROLES,

    // Gaming & Esports
    'Game Studio': GENERIC_ROLES,
    'Esports Organization': GENERIC_ROLES,

    // Handicrafts
    'Small-scale Industry': GENERIC_ROLES,
    'Cottage Industry': GENERIC_ROLES,

    // Co-working
    'Co-working': GENERIC_ROLES,
    'Business Center': GENERIC_ROLES
};

const INDUSTRY_SECTIONS = {
    'Healthcare': ['Hospital', 'Clinic', 'Diagnostic Center', 'Pharmacy', 'Medical Devices', 'Telemedicine'],
    'Education': ['School', 'College / University', 'Coaching Center', 'EdTech', 'Training Institute'],
    'Banking & Finance': ['Bank', 'NBFC', 'FinTech', 'Investment Firm', 'Accounting Firm'],
    'Retail & Commerce': ['Retail & Store', 'Retail Store', 'Supermarket', 'Wholesale', 'E-commerce', 'Distribution'],
    'Manufacturing': ['Automotive', 'FMCG', 'Textile', 'Automobile', 'Electronics', 'Machinery', 'Food Processing'],
    'Food & Hospitality': ['Food & Beverage', 'Restaurant', 'Cafe', 'Hotel', 'Resort', 'Catering'],
    'Logistics & Transport': ['Transportation', 'Courier Service', 'Warehousing', 'Shipping', 'Fleet Management'],
    'Construction & Real Estate': ['Construction Company', 'Real Estate Developer', 'Property Management', 'Interior Design', 'Architecture'],
    'Agriculture': ['Farming', 'AgriTech', 'Dairy', 'Poultry', 'Fisheries'],
    'IT & Technology': ['IT & Software', 'IT Services', 'Software Company', 'SaaS Company', 'Cybersecurity', 'AI / Data Company'],
    'Corporate & Professional Services': ['Consulting', 'Legal Firm', 'HR Services', 'Marketing Agency', 'Event Management'],
    'Energy & Utilities': ['Power Generation', 'Renewable Energy', 'Oil & Gas', 'Water Supply'],
    'Government & Public Sector': ['Government Department', 'Public Service', 'Defense'],
    'Media & Entertainment': ['Production House', 'Advertising Agency', 'Gaming', 'Streaming'],
    'Lifestyle & Wellness': ['Gym', 'Salon', 'Spa', 'Fashion Brand'],
    'Insurance': ['Life Insurance', 'General Insurance', 'Insurance Broker'],
    'BPO / KPO': ['Call Center', 'Outsourcing Services'],
    'Research & Laboratory': ['R&D Lab', 'Testing Lab', 'Biotechnology'],
    'Mining & Metals': ['Mining', 'Steel', 'Metal Processing'],
    'Aviation & Maritime': ['Airline', 'Airport', 'Port Authority'],
    'Defense & Security': ['Private Security', 'Defense Contractor'],
    'Franchise & Multi-Chain Business': ['Franchise Network', 'Multi-Branch Enterprise'],
    'Religious / Trust Organizations': ['Temple / Church / Mosque Management', 'Charitable Trust'],
    'NGO / Non-Profit': ['NGO / Non-Profit'],
    'Gaming & Esports': ['Game Studio', 'Esports Organization'],
    'Handicrafts & Artisans': ['Small-scale Industry', 'Cottage Industry'],
    'Co-working & Shared Spaces': ['Co-working', 'Business Center']
};

const LEVEL_DESCRIPTIONS: Record<string, string> = {
    'L0': 'Alphery',
    'L1': 'Super Admin',
    'L2': 'Tenant Owner',
    'L3': 'Enterprise Admin',
    'L4': 'Manager',
    'L5': 'Staff',
    'L6': 'Employee',
    'L7': 'Viewer / Intern'
};

export default function RoleUtility() {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('alphery_user') || '{}');
    const isL0 = currentUser.level?.toUpperCase() === 'L0' || currentUser.role === 'Super Admin';
    const isL1 = currentUser.level?.toUpperCase() === 'L1';
    const isAdmin = isL0 || isL1;

    const [users, setUsers] = useState<any[]>([]);
    const [companies, setCompanies] = useState<any[]>([{ id: 'Alphery', name: 'Alphery', industry: 'IT & Software' }]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [selectedCompany, setSelectedCompany] = useState<string>(isL0 ? 'Alphery' : currentUser.company || '');
    const [isSaving, setIsSaving] = useState(false);

    // Safety checks to prevent L1 from changing themselves or L0 users
    const isTargetL0 = selectedUser?.level?.toUpperCase() === 'L0';
    const isSelf = selectedUser?.username === currentUser.username;
    const isRestrictedTarget = isL1 && (isSelf || isTargetL0);
    const canEditProfile = isSelf || isL0 || (isL1 && selectedUser?.isNew);

    // Caching refs
    const companiesCache = React.useRef<any[] | null>(null);
    const usersCache = React.useRef<Record<string, any[]>>({});
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    // Modal state for adding company
    const [showAddCompany, setShowAddCompany] = useState(false);
    const [newCompanyName, setNewCompanyName] = useState('');
    const [newCompanyIndustry, setNewCompanyIndustry] = useState('Hospital');

    useEffect(() => {
        fetchCompanies();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [selectedCompany]);

    const fetchCompanies = async () => {
        if (companiesCache.current) {
            setCompanies(companiesCache.current);
            if (!selectedCompany && companiesCache.current.length > 0) {
                const initialCompany = isL0 ? companiesCache.current[0].id : currentUser.company;
                setSelectedCompany(initialCompany);
            }
            return;
        }

        try {
            const params = new URLSearchParams();
            params.append('action', 'getCompanies');
            const response = await fetch(GS_API_URL, { method: 'POST', body: params, redirect: 'follow' });
            const data = await response.json();
            if (data.success && data.companies && data.companies.length > 0) {
                setCompanies(data.companies);
                companiesCache.current = data.companies;
                if (!selectedCompany) {
                    const companiesList = data.companies || [];
                    const alpheryExists = companiesList.find((c: any) => c.id === 'Alphery');
                    const initialCompany = isL0 ? (alpheryExists ? 'Alphery' : companiesList[0].id) : currentUser.company;
                    setSelectedCompany(initialCompany);
                }
            }
        } catch (err) {
            console.error('Failed to fetch companies');
        }
    };

    const handleAddCompany = async () => {
        if (!newCompanyName.trim()) return;
        setIsSaving(true);
        try {
            const params = new URLSearchParams();
            params.append('action', 'addCompany');
            params.append('sheetName', newCompanyName.trim());
            params.append('industry', newCompanyIndustry);

            const response = await fetch(GS_API_URL, { method: 'POST', body: params, redirect: 'follow' });
            const data = await response.json();

            if (data.success) {
                showToast(`Company "${newCompanyName}" created successfully!`, 'success');
                // Invalidate cache
                companiesCache.current = null;
                await fetchCompanies();
                setSelectedCompany(newCompanyName.trim());
                setShowAddCompany(false);
                setNewCompanyName('');
                setNewCompanyIndustry('Hospital');
            } else {
                showToast(data.message || 'Failed to create company', 'error');
            }
        } catch (err) {
            showToast('Error creating company', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const fetchUsers = async (forceRefresh = false) => {
        if (!selectedCompany) return;

        if (!forceRefresh && usersCache.current[selectedCompany]) {
            setUsers(usersCache.current[selectedCompany]);
            return;
        }

        setLoading(true);
        setSelectedUser(null);
        try {
            const params = new URLSearchParams();
            params.append('action', 'getUsers');
            params.append('sheetName', selectedCompany);

            const response = await fetch(GS_API_URL, {
                method: 'POST',
                body: params,
                redirect: 'follow'
            });
            const data = await response.json();
            if (data.success) {
                setUsers(data.user);
                usersCache.current[selectedCompany] = data.user;
            } else {
                setUsers([]);
                usersCache.current[selectedCompany] = [];
                showToast(data.message || 'No users found in this sheet', 'error');
            }
        } catch (err) {
            showToast('Failed to load users', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!selectedUser) return;
        setIsSaving(true);
        try {
            const params = new URLSearchParams();
            params.append('action', 'saveUser');
            params.append('sheetName', selectedCompany);
            params.append('username', selectedUser.username);
            params.append('name', selectedUser.name);
            params.append('role', selectedUser.role);
            params.append('level', selectedUser.level || 'L1');
            params.append('image', selectedUser.image || '');
            params.append('mobile', selectedUser.mobile || ''); // Send mobile number
            params.append('industry', selectedUser.industry || currentCompanyIndustry);
            params.append('allowedApps', selectedUser.allowedApps);
            if (selectedUser.password) {
                params.append('password', selectedUser.password);
            }

            const response = await fetch(GS_API_URL, {
                method: 'POST',
                body: params,
                redirect: 'follow'
            });
            const data = await response.json();
            if (data.success) {
                showToast(data.message || `Permissions saved to ${selectedCompany}!`, 'success');
                fetchUsers(true);
            } else {
                showToast(data.message || 'Server rejected changes', 'error');
            }
        } catch (err) {
            showToast('Error saving changes', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const toggleApp = (appId: string) => {
        if (!selectedUser || !isAdmin) return;
        const shortCode = APP_TO_CODE[appId] || appId;
        const currentCodes = selectedUser.allowedApps ? selectedUser.allowedApps.split(',').map((s: string) => s.trim().toLowerCase()).filter(Boolean) : [];

        let newCodes;
        if (currentCodes.includes(shortCode)) {
            newCodes = currentCodes.filter((code: string) => code !== shortCode);
        } else {
            newCodes = [...currentCodes, shortCode];
        }
        setSelectedUser({ ...selectedUser, allowedApps: newCodes.join(', ') });
    };

    const handleAddUser = () => {
        setSelectedUser({
            username: '',
            name: '',
            password: '',
            role: 'Staff',
            level: 'L1',
            allowedApps: '',
            isNew: true
        });
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const companyIndustry = companies.find(c => c.id === selectedCompany)?.industry || 'Hospital';
    const currentCompanyIndustry = selectedUser?.industry || companyIndustry;

    const [viewHistory, setViewHistory] = useState<any[]>([]);

    const handleBack = () => {
        if (selectedUser) {
            setSelectedUser(null);
            return;
        }
        navigate('/workspace');
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col overflow-hidden">
            {/* Navbar */}
            <nav className="h-14 bg-[#34495E] text-white flex items-center justify-between px-6 shadow-lg z-50">
                <div className="flex items-center gap-4">
                    <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-6 h-6 text-blue-400" />
                        <span className="font-bold">Role Utility Center</span>
                    </div>
                </div>
            </nav>

            {/* Grid Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Enterprise Company</label>
                            {isAdmin && (
                                <button
                                    onClick={() => setShowAddCompany(true)}
                                    className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 uppercase tracking-widest transition-colors"
                                >
                                    <Plus className="w-3 h-3" /> Add Company
                                </button>
                            )}
                        </div>
                        <div className="relative mb-3">
                            <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" />
                            <select
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                                disabled={!isL0}
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm font-bold appearance-none transition-all ${!isL0 ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-gray-200 cursor-pointer focus:ring-2 focus:ring-blue-500/20'}`}
                            >
                                {isL0 ? (
                                    companies.map((company: any) => (
                                        <option key={company.id} value={company.id}>{company.name}</option>
                                    ))
                                ) : (
                                    <option value={currentUser.company}>{currentUser.company}</option>
                                )}
                            </select>
                        </div>

                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {isAdmin && (
                            <button
                                onClick={handleAddUser}
                                className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                            >
                                <UserPlus className="w-4 h-4" /> Add User
                            </button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                                <Loader2 className="w-6 h-6 animate-spin mb-2" />
                                <p className="text-[10px] uppercase font-bold tracking-widest">Loading Users</p>
                            </div>
                        ) : users.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-xs text-gray-400 font-medium italic">No users in this sheet yet.</p>
                            </div>
                        ) : users.filter(u =>
                            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            u.username.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((u, index) => (
                            <div
                                key={u.username || `user-${index}`}
                                onClick={() => setSelectedUser(u)}
                                className={`p-3 rounded-xl cursor-pointer transition-all ${selectedUser?.username === u.username ? 'bg-blue-50 border-blue-200 shadow-sm border' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center justify-between mb-0.5">
                                    <h3 className="font-bold text-gray-800 text-sm">{u.name}</h3>
                                    <div className="flex gap-1">
                                        <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 rounded-md font-bold uppercase tracking-widest">{u.level || 'L1'}</span>
                                        <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 rounded-md font-bold uppercase tracking-widest">{u.role}</span>
                                    </div>
                                </div>
                                <p className="text-[11px] text-gray-500 font-medium">@{u.username || 'no-username'}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {selectedUser ? (
                            <motion.div
                                key={selectedUser.isNew ? 'new-user-editor' : (selectedUser.username || 'selected-user')}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900">User Configuration</h2>
                                        <p className="text-sm text-gray-500">Managing permissions for {selectedUser.name}</p>
                                    </div>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving || (!isAdmin && !isSelf)}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 shadow-md ${(isAdmin || isSelf) ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                    >
                                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        {(isAdmin || isSelf) ? 'Save Changes' : 'Viewing Only'}
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">User Details</label>
                                        <div className="space-y-4">
                                            <div>
                                                <span className="text-xs text-gray-500 block mb-1">Username (Primary Key)</span>
                                                {selectedUser.isNew ? (
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. KEC005"
                                                        value={selectedUser.username}
                                                        onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                                                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold outline-none ring-2 ring-blue-500/10 focus:border-blue-500"
                                                    />
                                                ) : (
                                                    <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-bold text-gray-600 border border-gray-100">{selectedUser.username}</div>
                                                )}
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 block mb-1">Full Name</span>
                                                <input
                                                    type="text"
                                                    placeholder="Enter user name"
                                                    value={selectedUser.name}
                                                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                                    disabled={!canEditProfile}
                                                    className={`w-full px-4 py-2 rounded-lg text-sm font-bold outline-none ring-2 ring-blue-500/10 transition-all ${!canEditProfile ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white border-gray-200 focus:border-blue-500'}`}
                                                />
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 block mb-1">Profile Photo</span>
                                                <div className="flex items-center gap-2">
                                                    <label className="flex-1 cursor-pointer group">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    const reader = new FileReader();
                                                                    reader.onload = (event) => {
                                                                        const img = new Image();
                                                                        img.onload = () => {
                                                                            // Create a canvas to resize the image
                                                                            const canvas = document.createElement('canvas');
                                                                            const MAX_WIDTH = 150;
                                                                            const MAX_HEIGHT = 150;
                                                                            let width = img.width;
                                                                            let height = img.height;

                                                                            if (width > height) {
                                                                                if (width > MAX_WIDTH) {
                                                                                    height *= MAX_WIDTH / width;
                                                                                    width = MAX_WIDTH;
                                                                                }
                                                                            } else {
                                                                                if (height > MAX_HEIGHT) {
                                                                                    width *= MAX_HEIGHT / height;
                                                                                    height = MAX_HEIGHT;
                                                                                }
                                                                            }

                                                                            canvas.width = width;
                                                                            canvas.height = height;
                                                                            const ctx = canvas.getContext('2d');
                                                                            ctx?.drawImage(img, 0, 0, width, height);

                                                                            // Convert to low quality JPEG to save space
                                                                            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

                                                                            if (compressedBase64.length > 45000) {
                                                                                alert("Image is still too complex for Google Sheets. Try a simpler photo.");
                                                                                return;
                                                                            }

                                                                            setSelectedUser({ ...selectedUser, image: compressedBase64 });
                                                                        };
                                                                        img.src = event.target?.result as string;
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }
                                                            }}
                                                        />
                                                        <div className={`w-full px-4 py-2 border border-dashed rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${(!isAdmin || (isL1 && !selectedUser.isNew)) ? 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed' : 'bg-gray-50 border-gray-300 text-gray-400 group-hover:bg-gray-100 group-hover:border-gray-400 group-hover:text-gray-600'}`}>
                                                            <Upload className="w-4 h-4" />
                                                            {selectedUser.image ? 'Change Photo' : 'Upload from PC'}
                                                        </div>
                                                    </label>
                                                    {selectedUser.image && !(!isAdmin || (isL1 && !selectedUser.isNew)) && (
                                                        <button
                                                            onClick={() => setSelectedUser({ ...selectedUser, image: '' })}
                                                            className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors border border-red-100"
                                                            title="Remove Photo"
                                                        >
                                                            <XCircle className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 block mb-1">Mobile Number</span>
                                                <input
                                                    type="tel"
                                                    placeholder="+91 9876543210"
                                                    value={selectedUser.mobile || ''}
                                                    onChange={(e) => setSelectedUser({ ...selectedUser, mobile: e.target.value })}
                                                    disabled={!canEditProfile}
                                                    className={`w-full px-4 py-2 rounded-lg text-sm font-bold outline-none ring-2 ring-blue-500/10 transition-all ${!canEditProfile ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white border-gray-200 focus:border-blue-500'}`}
                                                />
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 block mb-1">Industry Sector</span>
                                                <select
                                                    value={currentCompanyIndustry}
                                                    onChange={(e) => setSelectedUser({ ...selectedUser, industry: e.target.value })}
                                                    disabled={!isAdmin || (isL1 && !selectedUser.isNew)}
                                                    className={`w-full px-4 py-2 border rounded-lg text-sm font-bold outline-none ring-2 ring-blue-500/10 transition-all appearance-none cursor-pointer ${(!isAdmin || (isL1 && !selectedUser.isNew)) ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white border-gray-200 focus:border-blue-500'}`}
                                                >
                                                    {Object.entries(INDUSTRY_SECTIONS).map(([section, industries]) => (
                                                        <optgroup key={section} label={section}>
                                                            {industries.map(industry => (
                                                                <option key={industry} value={industry}>{industry}</option>
                                                            ))}
                                                        </optgroup>
                                                    ))}
                                                    {/* Fallback for any deprecated industries not in sections */}
                                                    {Object.keys(INDUSTRY_ROLES)
                                                        .filter(ind => !Object.values(INDUSTRY_SECTIONS).flat().includes(ind))
                                                        .map(industry => (
                                                            <option key={industry} value={industry}>{industry}</option>
                                                        ))}
                                                </select>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 block mb-1">Role Designation</span>
                                                <select
                                                    value={selectedUser.role}
                                                    onChange={(e) => {
                                                        const newRole = e.target.value;
                                                        setSelectedUser({
                                                            ...selectedUser,
                                                            role: newRole,
                                                            level: newRole === 'Super Admin' ? 'L0' : selectedUser.level
                                                        });
                                                    }}
                                                    disabled={!isAdmin || isRestrictedTarget}
                                                    className={`w-full px-4 py-2 border rounded-lg text-sm font-bold outline-none ring-2 ring-blue-500/10 transition-all appearance-none cursor-pointer ${(!isAdmin || isRestrictedTarget) ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white border-gray-200 focus:border-blue-500'}`}
                                                >
                                                    {(INDUSTRY_ROLES[currentCompanyIndustry] || INDUSTRY_ROLES['Hospital']).map(group => (
                                                        <optgroup key={group.group} label={group.group}>
                                                            {group.roles.map(role => (
                                                                !(isAdmin && isL1 && role === 'Super Admin') && (
                                                                    <option key={role} value={role}>{role}</option>
                                                                )
                                                            ))}
                                                        </optgroup>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 block mb-1">Clearance Level</span>
                                                <select
                                                    value={selectedUser.level || 'L7'}
                                                    onChange={(e) => setSelectedUser({ ...selectedUser, level: e.target.value })}
                                                    disabled={!isAdmin || isRestrictedTarget}
                                                    className={`w-full px-4 py-2 border rounded-lg text-sm font-bold outline-none ring-2 ring-blue-500/10 transition-all appearance-none cursor-pointer ${(!isAdmin || isRestrictedTarget) ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-gray-200 focus:ring-2 focus:ring-blue-500/20'}`}
                                                >
                                                    {Object.keys(LEVEL_DESCRIPTIONS).map((lvl) => {
                                                        const isRestrictedLevel = lvl === 'L0' || lvl === 'L1';
                                                        if (isL1 && isRestrictedLevel) return null;
                                                        return (
                                                            <option key={lvl} value={lvl}>
                                                                {lvl}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 block mb-1">Account Password</span>
                                                <div className="relative">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder={(!isAdmin || (isL1 && !selectedUser.isNew)) ? "********" : "Set new password"}
                                                        value={selectedUser.password || ''}
                                                        onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                                                        disabled={!isAdmin || (isL1 && !selectedUser.isNew)}
                                                        className={`w-full px-4 py-2 rounded-lg text-sm font-bold outline-none ring-2 ring-blue-500/10 transition-all pr-10 ${(!isAdmin || (isL1 && !selectedUser.isNew)) ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white border-gray-200 focus:border-blue-500'}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                                <p className="text-[10px] text-gray-400 mt-1 font-medium italic">* Leave blank to keep existing password (for existing users)</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ID Card Display */}
                                    <div className="relative w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 group hover:shadow-2xl transition-all duration-500">
                                        {/* Card Header (Background) */}
                                        <div className={`h-28 relative overflow-hidden ${selectedUser.level === 'L0' ? 'bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-900' : 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800'}`}>
                                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                                            <div className="absolute top-4 left-5 flex justify-between w-[calc(100%-40px)] items-start">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">Organization</span>
                                                    <span className="text-sm font-black text-white tracking-wide truncate max-w-[180px]">{selectedCompany}</span>
                                                </div>
                                                <Building2 className="w-5 h-5 text-white/40" />
                                            </div>
                                        </div>

                                        {/* Avatar / Icon */}
                                        <div className="absolute top-14 left-1/2 -translate-x-1/2">
                                            <div className="p-1.5 bg-white rounded-2xl shadow-lg">
                                                <div className={`w-20 h-20 rounded-xl flex items-center justify-center overflow-hidden border-4 ${selectedUser.level === 'L0' ? 'bg-purple-50 border-purple-100' : 'bg-blue-50 border-blue-50'}`}>
                                                    {selectedUser.image ? (
                                                        <img
                                                            src={selectedUser.image}
                                                            alt={selectedUser.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                // Fallback to UI Avatar if image fails
                                                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name || 'User')}&background=random`;
                                                            }}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name || 'User')}&background=${selectedUser.level === 'L0' ? '9333ea' : '2563eb'}&color=fff&size=128`}
                                                            alt="Avatar"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* User Details */}
                                        <div className="pt-16 pb-8 px-6 text-center">
                                            <h3 className="text-2xl font-black text-gray-900 mb-0.5">{selectedUser.name || 'User Name'}</h3>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">@{selectedUser.username}</p>
                                            {selectedUser.mobile && (
                                                <p className="text-[10px] font-bold text-gray-500 mb-6 flex items-center justify-center gap-1">
                                                    📞 {selectedUser.mobile}
                                                </p>
                                            )}

                                            <div className="space-y-3">
                                                {/* Level Badge */}
                                                <div className={`p-3 rounded-xl border ${selectedUser.level === 'L0' ? 'bg-purple-50 border-purple-100' : 'bg-blue-50 border-blue-100'}`}>
                                                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">Clearance Level</span>
                                                    <div className="flex items-center justify-center">
                                                        <span className={`text-xl font-black ${selectedUser.level === 'L0' ? 'text-purple-700' : 'text-blue-700'}`}>
                                                            {selectedUser.level || 'L7'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Role Badge */}
                                                <div className="p-3 rounded-xl border border-gray-100 bg-gray-50">
                                                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">Functional Designation</span>
                                                    <span className="text-sm font-bold text-gray-800">{selectedUser.role}</span>
                                                </div>
                                            </div>

                                            {/* Footer / Barcode decoration */}
                                            <div className="mt-6 flex items-center justify-between opacity-60">
                                                <div className="h-6 w-32 bg-[repeating-linear-gradient(90deg,black,black_1px,transparent_1px,transparent_3px)]" />
                                                <span className="text-[10px] font-mono font-bold text-gray-400">ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 font-bold">App Access Permissions</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {SYSTEM_APPS.map(app => {
                                            // Only L0 and L1 can see 'Role Utility' in the permission list (to grant/revoke access)
                                            if (app.id === 'role-utility' && !isAdmin) return null;

                                            const codes = selectedUser.allowedApps?.split(',').map((s: string) => s.trim().toLowerCase()) || [];
                                            const isAllowed = selectedUser.level === 'L0' || selectedUser.role === 'Super Admin' || codes.includes(app.id) || codes.includes(APP_TO_CODE[app.id]);
                                            return (
                                                <div
                                                    key={app.id}
                                                    onClick={() => isAdmin && toggleApp(app.id)}
                                                    className={`p-3.5 rounded-xl border transition-all flex items-center justify-between group ${isAllowed ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-100 text-gray-600 hover:border-blue-300'} ${isAdmin ? 'cursor-pointer' : 'cursor-default'}`}
                                                >
                                                    <span className="text-xs font-bold">{app.title}</span>
                                                    {isAllowed && <CheckCircle2 className="w-4 h-4" />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div key="editor-empty" className="flex flex-col items-center justify-center h-full text-center py-20">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <Lock className="w-8 h-8 text-blue-600 opacity-50" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 tracking-tight">Access Control Center</h2>
                                <p className="text-sm text-gray-500 mt-1 max-w-xs">Select a user from the left panel to configure their enterprise permissions.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {showAddCompany && (
                    <div key="company-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-white/20"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Create New Enterprise</h3>
                                <p className="text-sm text-gray-500 mb-6">Enter the name of the new business. A new spreadsheet will be automatically created.</p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Company Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Alphery Tech"
                                            value={newCompanyName}
                                            onChange={(e) => setNewCompanyName(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Industry Sector</label>
                                        <select
                                            value={newCompanyIndustry}
                                            onChange={(e) => setNewCompanyIndustry(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                        >
                                            {Object.keys(INDUSTRY_ROLES).map(industry => (
                                                <option key={industry} value={industry}>{industry}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-6">
                                    <button
                                        onClick={() => setShowAddCompany(false)}
                                        className="flex-1 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddCompany}
                                        disabled={isSaving || !newCompanyName.trim()}
                                        className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                                        Create Company
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {toast && (
                    <motion.div
                        key="toast-notification"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className={`fixed bottom-8 right-8 px-5 py-3 rounded-xl text-white font-bold shadow-xl flex items-center gap-2 z-[100] ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}
