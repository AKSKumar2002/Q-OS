import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    LayoutDashboard,
    Briefcase,
    CheckSquare,
    Users,
    Settings,
    Plus,
    Search,
    ArrowLeft,
    ListTodo,
    Trello,
    Clock,
    IndianRupee,
    MoreHorizontal,
    ChevronRight,
    Zap,
    AlertCircle,
    Activity,
    Layers,
    Calendar,
    GanttChartSquare,
    BarChart3,
    TrendingUp,
    Paperclip,
    Flag,
    Filter,
    Layout,
    Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { db, getCurrentTenantId } from '../core/firebase';
import { collection, doc, addDoc, updateDoc, getDocs, getDoc, query, where, orderBy } from 'firebase/firestore';

// --- Types ---
type ViewType = 'dashboard' | 'projects' | 'tasks' | 'workload' | 'reports' | 'settings' | 'project-detail';
type ProjectDetailTab = 'overview' | 'board' | 'list' | 'gantt' | 'calendar' | 'files' | 'time' | 'analytics' | 'automation';

const GS_API_URL = 'https://script.google.com/macros/s/AKfycby3kgcdq5dgx7AdkPKbV2-OH3f5cPWdW6YFdqUHIwqSkDobLu3fd7wvo-yV6Cprjs9TTw/exec';

interface Task {
    id: string;
    project_id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee_id: string;
    due_date: string;
    created_at: string;
}

interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    type: string;
    priority: string;
    budget_allocated: number;
    currency: string;
    progress?: number;
    alloc_eng?: number;
    alloc_design?: number;
    alloc_strategy?: number;
    health_score?: number;
    next_milestone_title?: string;
    next_milestone_date?: string;
    risk_title?: string;
    risk_level?: string;
    created_at: string;
    created_by: string;
    tenant_id: string;
    is_partially_paid?: boolean;
    partially_paid_amount?: number;
    start_date?: string;
    end_date?: string;
    completion_date?: string;
    signed_by?: string;
    allocated_to?: string;
    client_name?: string;
}

// --- Sub-components (Fidelity Layer) ---

function SidebarItem({ icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${active ? 'bg-purple-50 text-[#7C1CE2] font-bold shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
        >
            <div className={`${active ? 'text-[#7C1CE2]' : 'text-gray-400'}`}>
                {icon}
            </div>
            <span className="text-sm font-medium">{label}</span>
            {active && <motion.div layoutId="sidebar-indicator" className="ml-auto w-1 h-4 bg-[#7C1CE2] rounded-full" />}
        </button>
    );
}

function StatCard({ label, value, icon, color, trend }: { label: string, value: string, icon: any, color: string, trend?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
        >
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</span>
                <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}>
                    {icon}
                </div>
            </div>
            <div className="flex items-end gap-2">
                <h3 className="text-3xl font-black text-gray-900">{value}</h3>
                {trend && <span className="text-xs text-green-600 font-bold mb-1">{trend}</span>}
            </div>
        </motion.div>
    );
}

// --- View: Dashboard ---
function DashboardView({ projects, stats, onProjectClick }: { projects: Project[], stats: any, onProjectClick: (p: Project) => void }) {
    const totalBudget = projects.reduce((acc, p) => acc + (Number(p.budget_allocated) || 0), 0);
    const burnRateFormatted = stats.totalExpenses > 1000 ? `₹${(stats.totalExpenses / 1000).toFixed(1)}k` : `₹${stats.totalExpenses}`;

    return (
        <div className="p-8 space-y-8 overflow-y-auto h-full CustomScroll">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Projects" value={projects.length.toString()} icon={<Layers className="w-4 h-4" />} color="blue" />
                <StatCard label="Active Tasks" value={stats.activeTasks.toString()} icon={<CheckSquare className="w-4 h-4" />} color="purple" trend={stats.activeTasks > 0 ? "+Live" : "No Tasks"} />
                <StatCard label="Total Budget" value={burnRateFormatted} icon={<TrendingUp className="w-4 h-4" />} color="red" trend={stats.totalExpenses > totalBudget ? "Over Budget" : "On Track"} />
                <StatCard label="Performance" value={stats.velocity.toFixed(1)} icon={<Zap className="w-4 h-4" />} color="orange" trend={stats.velocity > 0 ? "Tracking" : "Stale"} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="font-bold text-gray-800">Current Projects</h3>
                        <button className="text-xs font-bold text-[#7C1CE2] hover:underline">View Roadmap</button>
                    </div>
                    {projects.length > 0 ? (
                        <div className="space-y-3">
                            {projects.slice(0, 5).map((p) => (
                                <motion.div
                                    key={p.id}
                                    whileHover={{ x: 4 }}
                                    onClick={() => onProjectClick(p)}
                                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6 cursor-pointer group hover:border-[#7C1CE2]/30 transition-all"
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-inner ${p.priority === 'Critical' ? 'bg-red-500' : 'bg-[#7C1CE2]'}`}>
                                        {p.name[0]}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 group-hover:text-[#7C1CE2] transition-colors">{p.name}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-[#7C1CE2] uppercase bg-purple-50 px-1.5 py-0.5 rounded">{p.client_name || 'No Client'}</span>
                                            <p className="text-xs text-gray-500 truncate max-w-xs">{p.description || 'No description provided'}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block w-32">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-[10px] font-bold text-gray-400">PROGRESS</span>
                                            <span className="text-[10px] font-bold text-gray-900">{p.progress || 0}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#7C1CE2] rounded-full transition-all duration-500" style={{ width: `${p.progress || 0}%` }} />
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#7C1CE2] transition-all" />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                            <Briefcase className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                            <p className="text-gray-400 font-medium">No projects found for this tenant.</p>
                        </div>
                    )}
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col h-[600px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">Cluster Resource Pulse</h3>
                        <div className="px-2 py-1 bg-gray-50 rounded text-[9px] font-black text-gray-400 uppercase">Live Capacity</div>
                    </div>

                    <div className="flex-1 space-y-5 overflow-y-auto pr-2 CustomScroll">
                        {[
                            { label: 'Leadership', key: 'alloc_leadership' },
                            { label: 'Strategy & Planning', key: 'alloc_strategy_planning' },
                            { label: 'Business Analysis', key: 'alloc_business_analysis' },
                            { label: 'Product Management', key: 'alloc_product_mgmt' },
                            { label: 'Project Management', key: 'alloc_project_mgmt' },
                            { label: 'Designing', key: 'alloc_designing' },
                            { label: 'Developing', key: 'alloc_developing' },
                            { label: 'Data & AI', key: 'alloc_data_ai' },
                            { label: 'Infrastructure & DevOps', key: 'alloc_infra_devops' },
                            { label: 'Security & Compliance', key: 'alloc_security_compliance' },
                            { label: 'Testing & QA', key: 'alloc_testing_qa' },
                            { label: 'Deployment', key: 'alloc_deployment_impl' },
                            { label: 'Support & Maint', key: 'alloc_support_maint' },
                            { label: 'Sales & Mktg', key: 'alloc_sales_mktg' },
                            { label: 'Customer Success', key: 'alloc_customer_success' },
                            { label: 'Human Resources', key: 'alloc_hr' },
                            { label: 'Finance & Accounts', key: 'alloc_finance_accounts' },
                            { label: 'Legal & Governance', key: 'alloc_legal_gov' },
                            { label: 'Procurement', key: 'alloc_procurement_admin' },
                            { label: 'Research & Innovation', key: 'alloc_research_innovation' }
                        ].map((field, i) => {
                            const totalUsed = projects.reduce((acc, p) => acc + (Number((p as any)[field.key]) || 0), 0);
                            const remaining = Math.max(0, 100 - totalUsed);
                            const color = totalUsed > 90 ? 'red' : totalUsed > 70 ? 'orange' : 'purple';

                            return (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-end mb-1.5">
                                        <div className="space-y-0.5">
                                            <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest block">{field.label}</span>
                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Available: {remaining}%</span>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-[10px] font-black text-${color}-600`}>{totalUsed}%</span>
                                            <span className="text-[8px] font-bold text-gray-300 ml-0.5 uppercase">Used</span>
                                        </div>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${totalUsed}%` }}
                                            className={`h-full bg-${color}-500 transition-all duration-700 ease-out rounded-full`}
                                            style={{ width: `${totalUsed}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-50">
                        <p className="text-[9px] font-bold text-gray-400 leading-relaxed uppercase tracking-widest">
                            * Data aggregated across all active nodes in the current execution tenant.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- View: Project Detail ---
interface ProjectDetailViewProps {
    project: Project;
    activeTab: ProjectDetailTab;
    onTabChange: (t: ProjectDetailTab) => void;
    showTaskEdit: any;
    setShowTaskEdit: (task: any) => void;
    showTaskView: any;
    setShowTaskView: (task: any) => void;
    activeTaskMenu: string | null;
    setActiveTaskMenu: (id: string | null) => void;
    companyUsers: any[];
    milestones: any[];
    onAddMilestone: () => void;
    onToggleMilestone: (id: string, currentStatus: string) => void;
    onEditMilestone: (m: any) => void;
    user?: any;
}

function ProjectDetailView({
    project,
    activeTab,
    onTabChange,
    showTaskEdit,
    setShowTaskEdit,
    showTaskView,
    setShowTaskView,
    activeTaskMenu,
    setActiveTaskMenu,
    companyUsers,
    milestones,
    onAddMilestone,
    onToggleMilestone,
    onEditMilestone,
    user
}: ProjectDetailViewProps) {
    const isPM = user?.role === 'Project Manager';
    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-[#FBFBFE]">
            {/* Project Navigation */}
            <div className="h-14 px-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-8 h-full">
                    {[
                        { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
                        { id: 'board', label: 'Board', icon: <Trello className="w-4 h-4" /> },
                        { id: 'list', label: 'Task List', icon: <ListTodo className="w-4 h-4" /> },
                        { id: 'gantt', label: 'Gantt', icon: <GanttChartSquare className="w-4 h-4" /> },
                        { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-4 h-4" /> },
                        { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
                        { id: 'automation', label: 'Automation', icon: <Zap className="w-4 h-4" /> }
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => onTabChange(t.id as ProjectDetailTab)}
                            className={`h-full flex items-center gap-2 px-1 relative transition-all whitespace-nowrap ${activeTab === t.id ? 'text-[#7C1CE2] font-black' : 'text-gray-500 font-medium hover:text-gray-800'}`}
                        >
                            {t.icon}
                            <span className="text-sm">{t.label}</span>
                            {activeTab === t.id && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C1CE2]" />}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${(window as any).isEngineSaving ? 'bg-purple-50 text-purple-500' : 'bg-emerald-50 text-emerald-500'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${(window as any).isEngineSaving ? 'bg-purple-500 animate-pulse' : 'bg-emerald-500'}`} />
                        {(window as any).isEngineSaving ? 'Syncing...' : 'Live & Saved'}
                    </div>
                </div>
            </div>

            {/* Content Layer */}
            <div className="flex-1 overflow-y-auto p-8 h-full CustomScroll">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Mission Statement</h3>
                                <textarea
                                    defaultValue={project?.description || ''}
                                    onBlur={(e) => (window as any).updateProjectField(project.id, 'description', e.target.value)}
                                    className="w-full text-xl font-medium text-gray-800 leading-relaxed bg-transparent border-none focus:ring-4 focus:ring-purple-50 rounded-xl transition-all resize-none outline-none"
                                    placeholder="Establishing core benchmarks for high-impact execution within this strategic track..."
                                    rows={2}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600"><Flag className="w-4 h-4" /></div>
                                            <h4 className="font-bold text-gray-800">Mission Milestones</h4>
                                        </div>
                                        <button
                                            onClick={onAddMilestone}
                                            className="p-2 hover:bg-gray-50 text-[#7C1CE2] rounded-lg transition-all"
                                            title="Add Milestone"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-3 CustomScroll overflow-y-auto max-h-[120px] pr-2">
                                        {milestones.filter(m => m.project_id === project.id).length > 0 ? (
                                            milestones.filter(m => m.project_id === project.id).map((m, i) => (
                                                <div key={m.id || i} className="group bg-gray-50 p-3 rounded-xl border border-gray-100 relative hover:border-purple-200 transition-all">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-xs font-black text-gray-900 group-hover:text-[#7C1CE2] transition-colors">{m.title}</span>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => onEditMilestone(m)}
                                                                className="text-gray-400 hover:text-[#7C1CE2] transition-colors p-1"
                                                            >
                                                                <Layout className="w-3 h-3" />
                                                            </button>
                                                            <button
                                                                onClick={() => onToggleMilestone(m.id, m.status)}
                                                                className={`text-[9px] font-black px-1.5 py-0.5 rounded capitalize transition-all hover:scale-110 active:scale-95 ${m.status === 'Completed' ? 'bg-[#7C1CE2] text-white shadow-sm' : 'bg-emerald-50 text-emerald-600'
                                                                    }`}
                                                                title={m.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
                                                            >
                                                                {m.status}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400">
                                                        <Calendar className="w-2.5 h-2.5" />
                                                        {m.due_date ? new Date(m.due_date).toLocaleDateString() : 'No Target Date'}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="py-4 text-center">
                                                <p className="text-[10px] font-bold text-gray-300 uppercase italic">No milestones established</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-orange-50 text-orange-600"><AlertCircle className="w-4 h-4" /></div>
                                            <h4 className="font-bold text-gray-800">Risk Assessment</h4>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const currentRisks = Array.isArray(project.risks) ? project.risks : [];
                                                const newRisks = [...currentRisks, { title: 'New Risk Factor', level: 'Medium', reason: 'Company', date: new Date().toISOString().split('T')[0] }];
                                                (window as any).updateProjectField(project.id, 'risks', newRisks);
                                            }}
                                            className="p-2 hover:bg-gray-50 text-orange-500 rounded-lg transition-all"
                                            title="Add Risk"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-3 CustomScroll overflow-y-auto max-h-[140px] pr-2">
                                        {(Array.isArray(project.risks) && project.risks.length > 0) ? (
                                            project.risks.map((risk: any, idx: number) => (
                                                <div key={idx} className="group relative bg-gray-50/50 p-2 rounded-xl border border-gray-100 hover:border-orange-200 transition-all">
                                                    <input
                                                        type="text"
                                                        defaultValue={risk.title}
                                                        onBlur={(e) => {
                                                            const newRisks = [...(project.risks || [])];
                                                            newRisks[idx] = { ...newRisks[idx], title: e.target.value };
                                                            (window as any).updateProjectField(project.id, 'risks', newRisks);
                                                        }}
                                                        className="text-xs font-black text-gray-900 bg-transparent border-none p-0 w-full mb-1 focus:ring-0 placeholder-gray-300"
                                                        placeholder="Risk Title"
                                                    />
                                                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                                                        <select
                                                            defaultValue={risk.level}
                                                            onChange={(e) => {
                                                                const newRisks = [...(project.risks || [])];
                                                                newRisks[idx] = { ...newRisks[idx], level: e.target.value };
                                                                (window as any).updateProjectField(project.id, 'risks', newRisks);
                                                            }}
                                                            className={`text-[9px] uppercase font-black bg-transparent border-none focus:ring-0 cursor-pointer p-0 shrink-0 ${risk.level === 'High' || risk.level === 'Critical' ? 'text-red-500' : 'text-orange-500'}`}
                                                        >
                                                            <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                                                        </select>

                                                        <select
                                                            defaultValue={risk.reason || 'Company'}
                                                            onChange={(e) => {
                                                                const newRisks = [...(project.risks || [])];
                                                                newRisks[idx] = { ...newRisks[idx], reason: e.target.value };
                                                                (window as any).updateProjectField(project.id, 'risks', newRisks);
                                                            }}
                                                            className="text-[9px] uppercase font-black bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border-none focus:ring-0 cursor-pointer shrink-0"
                                                        >
                                                            <option>From Client</option><option>From Company</option>
                                                        </select>

                                                        <div className="flex items-center gap-1 shrink-0">
                                                            <input
                                                                type="date"
                                                                defaultValue={risk.date || ''}
                                                                onBlur={(e) => {
                                                                    const newRisks = [...(project.risks || [])];
                                                                    newRisks[idx] = { ...newRisks[idx], date: e.target.value };
                                                                    (window as any).updateProjectField(project.id, 'risks', newRisks);
                                                                }}
                                                                title="Identification Date"
                                                                className="text-[9px] font-black text-gray-400 bg-transparent border-none p-0 focus:ring-0 cursor-pointer w-20"
                                                            />
                                                            <span className="text-[8px] font-black text-gray-300">|</span>
                                                            <input
                                                                type="date"
                                                                defaultValue={risk.completion_date || ''}
                                                                onBlur={(e) => {
                                                                    const newRisks = [...(project.risks || [])];
                                                                    newRisks[idx] = { ...newRisks[idx], completion_date: e.target.value };
                                                                    (window as any).updateProjectField(project.id, 'risks', newRisks);
                                                                }}
                                                                title="Resolution/Completion Date"
                                                                className="text-[9px] font-black text-emerald-600 bg-transparent border-none p-0 focus:ring-0 cursor-pointer w-20"
                                                            />
                                                        </div>

                                                        <button
                                                            onClick={() => {
                                                                const newRisks = (project.risks || []).filter((_: any, i: number) => i !== idx);
                                                                (window as any).updateProjectField(project.id, 'risks', newRisks);
                                                            }}
                                                            className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            /* Backward Compatibility / Empty State fallback */
                                            project.risk_title ? (
                                                <div className="group relative bg-gray-50/50 p-2 rounded-xl border border-gray-100">
                                                    <input
                                                        type="text"
                                                        defaultValue={project.risk_title}
                                                        readOnly
                                                        className="text-xs font-black text-gray-900 bg-transparent border-none p-0 w-full mb-1 focus:ring-0"
                                                    />
                                                    <div className="flex justify-between items-center">
                                                        <span className={`text-[9px] uppercase font-black ${project.risk_level === 'High' || project.risk_level === 'Critical' ? 'text-red-500' : 'text-orange-500'}`}>{project.risk_level || 'Medium'}</span>
                                                        <button
                                                            onClick={() => (window as any).updateProjectField(project.id, 'risks', [{ title: project.risk_title, level: project.risk_level || 'Medium' }])}
                                                            className="text-[8px] font-bold text-[#7C1CE2] uppercase bg-purple-50 px-1.5 py-0.5 rounded"
                                                        >
                                                            Migrate to List
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="py-4 text-center">
                                                    <p className="text-[10px] font-bold text-gray-300 uppercase italic">No risks identified</p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#7C1CE2] p-4 rounded-3xl text-white shadow-xl shadow-purple-200 shrink-0">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-200">Progress</h4>
                                    <div className="flex items-center gap-1">
                                        <input
                                            type="number"
                                            defaultValue={project.progress || 0}
                                            onBlur={(e) => (window as any).updateProjectField(project.id, 'progress', e.target.value)}
                                            className="w-10 text-right bg-white/10 border-none rounded text-xs font-black p-1 focus:ring-1 focus:ring-white transition-all outline-none"
                                        />
                                        <span className="text-[10px] font-bold text-purple-200">%</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="text-4xl font-black">{project.progress || 0}</div>
                                    <div className="text-xs font-bold text-purple-200">Completion<br />Score</div>
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-white transition-all duration-500" style={{ width: `${project.progress || 0}%` }} />
                                </div>
                                <input
                                    type="range"
                                    min="0" max="100"
                                    value={project.progress || 0}
                                    onChange={(e) => (window as any).updateProjectField(project.id, 'progress', e.target.value)}
                                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm relative group">
                                <h3 className="font-bold text-gray-800 mb-2 text-sm">Project Data</h3>
                                <div className="space-y-2.5">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-medium">Type</span>
                                        <select
                                            defaultValue={project.type}
                                            onChange={(e) => (window as any).updateProjectField(project.id, 'type', e.target.value)}
                                            disabled={isPM}
                                            className="font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide border-none focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
                                        >
                                            <option>Internal</option><option>External</option><option>Vendor</option><option>Product</option><option>Service</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-medium">Priority</span>
                                        <select
                                            defaultValue={project.priority}
                                            onChange={(e) => (window as any).updateProjectField(project.id, 'priority', e.target.value)}
                                            disabled={isPM}
                                            className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wide border-none focus:ring-0 cursor-pointer disabled:cursor-not-allowed ${project.priority === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-purple-50 text-purple-600'
                                                }`}
                                        >
                                            <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                                        </select>
                                    </div>
                                    {!isPM && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400 font-medium">Budget</span>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    defaultValue={project.budget_allocated}
                                                    onBlur={(e) => (window as any).updateProjectBudget(project.id, e.target.value)}
                                                    className="w-24 text-right font-bold text-gray-900 bg-gray-50 border-none rounded px-1 focus:ring-1 focus:ring-purple-200 outline-none transition-all"
                                                />
                                                <span className="text-[10px] font-black text-gray-400 uppercase">INR</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-medium">Start Date</span>
                                        <input
                                            type="date"
                                            defaultValue={project.start_date || (project.created_at ? new Date(project.created_at).toISOString().split('T')[0] : '')}
                                            onBlur={(e) => (window as any).updateProjectField(project.id, 'start_date', e.target.value)}
                                            disabled={isPM}
                                            className="font-bold text-gray-900 bg-transparent border-none text-[10px] text-right p-0 focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-medium">Expected End</span>
                                        <input
                                            type="date"
                                            defaultValue={project.end_date || ''}
                                            onBlur={(e) => (window as any).updateProjectField(project.id, 'end_date', e.target.value)}
                                            disabled={isPM}
                                            className="font-bold text-gray-900 bg-transparent border-none text-[10px] text-right p-0 focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-medium">Completion Date</span>
                                        <input
                                            type="date"
                                            defaultValue={project.completion_date || ''}
                                            onBlur={(e) => (window as any).updateProjectField(project.id, 'completion_date', e.target.value)}
                                            disabled={isPM}
                                            className="font-bold text-emerald-600 bg-transparent border-none text-[10px] text-right p-0 focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
                                        />
                                    </div>
                                    {!isPM && (
                                        <>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400 font-medium">Paid Partially</span>
                                                <button
                                                    onClick={() => (window as any).updateProjectField(project.id, 'is_partially_paid', !project.is_partially_paid)}
                                                    className={`px-2 py-0.5 rounded text-[9px] font-black uppercase transition-all ${project.is_partially_paid ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}
                                                >
                                                    {project.is_partially_paid ? 'Yes' : 'No'}
                                                </button>
                                            </div>
                                            {project.is_partially_paid && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-400 font-medium">Commenced Amt</span>
                                                    <div className="flex items-center gap-1">
                                                        <input
                                                            type="number"
                                                            defaultValue={project.partially_paid_amount || 0}
                                                            onBlur={(e) => (window as any).updateProjectField(project.id, 'partially_paid_amount', e.target.value)}
                                                            className="w-20 text-right font-bold text-orange-600 bg-orange-50/50 border-none rounded px-1 focus:ring-1 focus:ring-orange-200 outline-none transition-all text-[10px]"
                                                        />
                                                        <span className="text-[10px] font-black text-gray-400 uppercase">INR</span>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-medium">Signed By</span>
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={project.signed_by || ''}
                                                onChange={(e) => (window as any).updateProjectField(project.id, 'signed_by', e.target.value)}
                                                disabled={isPM}
                                                className="w-32 text-right font-bold text-gray-900 bg-transparent border-none p-0 text-[10px] focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
                                            >
                                                <option value="">Select Signatory</option>
                                                {companyUsers.filter((u: any) => u.level === 'L0' || u.level === 'L1').map((u: any) => (
                                                    <option key={u.username} value={u.username}>
                                                        {u.name || u.username}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="w-4 h-4 rounded bg-purple-100 text-[#7C1CE2] flex items-center justify-center" title={companyUsers.find(u => u.username === project.signed_by)?.name || 'Unknown Signatory'}>
                                                <Users className="w-2.5 h-2.5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-medium">Allocated To</span>
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={project.allocated_to || ''}
                                                onChange={(e) => (window as any).updateProjectField(project.id, 'allocated_to', e.target.value)}
                                                disabled={isPM}
                                                className="w-32 text-right font-bold text-gray-900 bg-transparent border-none p-0 text-[10px] focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
                                            >
                                                <option value="">Select Lead</option>
                                                {companyUsers.filter((u: any) => u.role === 'Project Manager').map((u: any) => (
                                                    <option key={u.username} value={u.username}>
                                                        {u.name || u.username}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="w-4 h-4 rounded bg-blue-100 text-[#0066FF] flex items-center justify-center" title={companyUsers.find(u => u.username === project.allocated_to)?.name || 'Unknown Lead'}>
                                                <Users className="w-2.5 h-2.5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-medium">Client Name</span>
                                        <input
                                            type="text"
                                            defaultValue={project.client_name || ''}
                                            onBlur={(e) => (window as any).updateProjectField(project.id, 'client_name', e.target.value)}
                                            placeholder="Client Name"
                                            className="font-bold text-gray-900 bg-transparent border-none text-[10px] text-right p-0 focus:ring-0"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-gray-800 mb-2 text-sm">Resource Allocation</h3>
                                <div className="space-y-4 CustomScroll overflow-y-auto max-h-[180px] pr-2">
                                    {[
                                        { label: 'Leadership', key: 'alloc_leadership' },
                                        { label: 'Strategy & Planning', key: 'alloc_strategy_planning' },
                                        { label: 'Business Analysis', key: 'alloc_business_analysis' },
                                        { label: 'Product Management', key: 'alloc_product_mgmt' },
                                        { label: 'Project Management', key: 'alloc_project_mgmt' },
                                        { label: 'Designing', key: 'alloc_designing' },
                                        { label: 'Developing', key: 'alloc_developing' },
                                        { label: 'Data & AI', key: 'alloc_data_ai' },
                                        { label: 'Infrastructure & DevOps', key: 'alloc_infra_devops' },
                                        { label: 'Security & Compliance', key: 'alloc_security_compliance' },
                                        { label: 'Testing & Quality Assurance', key: 'alloc_testing_qa' },
                                        { label: 'Deployment & Implementation', key: 'alloc_deployment_impl' },
                                        { label: 'Support & Maintenance', key: 'alloc_support_maint' },
                                        { label: 'Sales & Marketing', key: 'alloc_sales_mktg' },
                                        { label: 'Customer Success', key: 'alloc_customer_success' },
                                        { label: 'Human Resources', key: 'alloc_hr' },
                                        { label: 'Finance & Accounts', key: 'alloc_finance_accounts' },
                                        { label: 'Legal & Governance', key: 'alloc_legal_gov' },
                                        { label: 'Procurement & Administration', key: 'alloc_procurement_admin' },
                                        { label: 'Research & Innovation', key: 'alloc_research_innovation' }
                                    ].map((field) => (
                                        <div key={field.key} className="group">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:text-purple-600 transition-colors">{field.label}</span>
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="number"
                                                        value={(project as any)[field.key] || 0}
                                                        onChange={(e) => (window as any).updateProjectField(project.id, field.key, e.target.value)}
                                                        className="w-8 text-right bg-transparent border-none focus:ring-0 text-[10px] font-black p-0 text-gray-900"
                                                    />
                                                    <span className="text-[8px] font-bold text-gray-300">%</span>
                                                </div>
                                            </div>
                                            <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="absolute top-0 left-0 h-full bg-[#7C1CE2] transition-all duration-300 ease-out rounded-full shadow-[0_0_8px_rgba(124,28,226,0.3)]"
                                                    style={{ width: `${(project as any)[field.key] || 0}%` }}
                                                />
                                                <input
                                                    type="range"
                                                    min="0" max="100"
                                                    value={(project as any)[field.key] || 0}
                                                    onChange={(e) => (window as any).updateProjectField(project.id, field.key, e.target.value)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {activeTab === 'list' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="font-black text-gray-900 tracking-tighter uppercase text-sm">Execution Roadmap</h3>
                            <button
                                onClick={() => (window as any).toggleTaskModal(true)}
                                className="px-4 py-2 bg-[#7C1CE2] text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#6A15C5] transition-all"
                            >
                                <Plus className="w-4 h-4" /> New Task
                            </button>
                        </div>

                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <th className="px-6 py-4">Title</th>
                                        <th className="px-6 py-4">Assignee</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Priority</th>
                                        <th className="px-6 py-4">Due Date</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {(window as any).currentProjectTasks?.length > 0 ? (window as any).currentProjectTasks.map((t: any) => (
                                        <tr
                                            key={t.id}
                                            onClick={() => setShowTaskView(t)}
                                            className="hover:bg-gray-50 transition-colors cursor-pointer group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900">{t.title}</span>
                                                    <span className="text-[10px] text-gray-400 line-clamp-1">{t.description || 'No description'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-purple-100 text-[#7C1CE2] flex items-center justify-center text-[8px] font-black">{t.assignee_id?.[0]?.toUpperCase() || 'U'}</div>
                                                    <span className="text-xs font-medium text-gray-700">
                                                        {companyUsers.find(u => u.username === t.assignee_id)?.name || t.assignee_id || 'Unassigned'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={t.status}
                                                    onChange={(e) => (window as any).updateTaskStatus(t.id, e.target.value)}
                                                    className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border-none focus:ring-2 focus:ring-purple-200 cursor-pointer ${t.status === 'Done' ? 'bg-emerald-50 text-emerald-600' :
                                                        t.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'
                                                        }`}
                                                >
                                                    <option>To Do</option>
                                                    <option>In Progress</option>
                                                    <option>Done</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-bold uppercase ${t.priority === 'High' || t.priority === 'Critical' ? 'text-red-500' : 'text-gray-500'}`}>{t.priority}</span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-gray-500">{t.due_date ? new Date(t.due_date).toLocaleDateString() : 'No date'}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="relative inline-block text-left">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveTaskMenu(activeTaskMenu === t.id ? null : t.id);
                                                        }}
                                                        className="p-2 hover:bg-gray-50 text-gray-300 hover:text-gray-600 rounded-lg transition-all"
                                                    >
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </button>

                                                    {activeTaskMenu === t.id && (
                                                        <div className="absolute right-full top-[-10px] mr-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden py-1">
                                                            <button
                                                                onClick={() => {
                                                                    setShowTaskEdit(t);
                                                                    setActiveTaskMenu(null);
                                                                }}
                                                                className="w-full px-4 py-2 text-left text-[10px] font-black text-gray-600 hover:bg-purple-50 hover:text-[#7C1CE2] transition-colors uppercase tracking-widest flex items-center gap-2"
                                                            >
                                                                <Layout className="w-3 h-3" /> Edit
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    (window as any).deleteTask(t.id);
                                                                    setActiveTaskMenu(null);
                                                                }}
                                                                className="w-full px-4 py-2 text-left text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest flex items-center gap-2"
                                                            >
                                                                <Trash2 className="w-3 h-3" /> Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={6} className="py-20 text-center text-gray-400 font-medium">No tasks found. Deploy your first task to begin.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'board' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[500px]">
                        {['To Do', 'In Progress', 'Done'].map(status => (
                            <div key={status} className="flex flex-col gap-4">
                                <div className="flex items-center justify-between px-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${status === 'Done' ? 'bg-emerald-500' : status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-400'}`} />
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">{status}</h4>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-300">{(window as any).currentProjectTasks.filter((t: any) => t.status === status).length}</span>
                                </div>
                                <div className="flex-1 bg-gray-50/50 rounded-[2rem] p-4 space-y-4 border border-gray-100/50 pb-32">
                                    {(window as any).currentProjectTasks.filter((t: any) => t.status === status).map((t: any) => (
                                        <motion.div
                                            layout
                                            id={t.id}
                                            key={t.id}
                                            onClick={() => setShowTaskView(t)}
                                            className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 group hover:shadow-2xl hover:border-purple-200 transition-all flex flex-col gap-4 relative cursor-pointer"
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${t.priority === 'High' || t.priority === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400'
                                                    }`}>
                                                    {t.priority}
                                                </span>
                                                <div className="relative">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveTaskMenu(activeTaskMenu === t.id ? null : t.id);
                                                        }}
                                                        className="p-1 hover:bg-gray-50 text-gray-300 hover:text-gray-600 rounded transition-all"
                                                    >
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </button>

                                                    {activeTaskMenu === t.id && (
                                                        <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden py-1">
                                                            <button
                                                                onClick={() => {
                                                                    setShowTaskEdit(t);
                                                                    setActiveTaskMenu(null);
                                                                }}
                                                                className="w-full px-4 py-2 text-left text-[10px] font-black text-gray-600 hover:bg-purple-50 hover:text-[#7C1CE2] transition-colors uppercase tracking-widest flex items-center gap-2"
                                                            >
                                                                <Layout className="w-3 h-3" /> Edit
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    (window as any).deleteTask(t.id);
                                                                    setActiveTaskMenu(null);
                                                                }}
                                                                className="w-full px-4 py-2 text-left text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest flex items-center gap-2"
                                                            >
                                                                <Trash2 className="w-3 h-3" /> Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <h5 className="text-sm font-black text-gray-900 leading-tight">{t.title}</h5>
                                            <p className="text-[10px] text-gray-400 leading-relaxed line-clamp-2">{t.description || 'No description provided.'}</p>

                                            {t.due_date && (
                                                <div className="flex items-center gap-2 py-2 border-y border-gray-50 my-1">
                                                    <Calendar className="w-3 h-3 text-purple-400" />
                                                    <span className="text-[9px] font-black text-gray-400 uppercase">
                                                        {new Date(t.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-6 h-6 rounded-full bg-purple-100 text-[#7C1CE2] flex items-center justify-center text-[8px] font-black">{t.assignee_id?.[0]?.toUpperCase() || 'U'}</div>
                                                    <span className="text-[9px] font-bold text-gray-400">
                                                        {companyUsers.find(u => u.username === t.assignee_id)?.name || t.assignee_id || 'Alpha'}
                                                    </span>
                                                </div>
                                                <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${t.status === 'Done' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'
                                                    }`}>
                                                    {t.status}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                    <button
                                        onClick={() => (window as any).toggleTaskModal(true)}
                                        className="w-full py-3 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] font-black text-gray-300 uppercase tracking-widest hover:border-purple-200 hover:text-purple-400 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-3 h-3" /> Append Node
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'gantt' && (
                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="font-black text-gray-900 tracking-tighter uppercase text-sm">Temporal Execution Map</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Timeline Visualization</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-all"><ArrowLeft className="w-4 h-4" /></button>
                                <span className="text-xs font-black text-gray-900 uppercase">Feb 2026</span>
                                <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-all"><ArrowLeft className="w-4 h-4 rotate-180" /></button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {(window as any).currentProjectTasks.map((t: any, idx: number) => (
                                <div key={t.id} className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-3">
                                        <p className="text-xs font-bold text-gray-800 truncate">{t.title}</p>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t.status}</p>
                                    </div>
                                    <div className="col-span-9 relative h-8 bg-gray-50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.max(10, 20 + idx * 15)}%`, x: idx * 40 }}
                                            className={`h-full absolute rounded-full shadow-sm flex items-center px-3 ${t.status === 'Done' ? 'bg-emerald-400' : 'bg-[#7C1CE2]'}`}
                                        >
                                            <span className="text-[8px] font-black text-white uppercase whitespace-nowrap">Execution Node</span>
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'calendar' && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-3 bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                            <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-3xl overflow-hidden border border-gray-100 shadow-inner">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                    <div key={d} className="bg-gray-50/50 py-4 text-center text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">{d}</div>
                                ))}
                                {Array.from({ length: 31 }).map((_, i) => {
                                    const day = i + 1;
                                    const hasTask = (window as any).currentProjectTasks.some((t: any) => t.due_date && new Date(t.due_date).getDate() === day);
                                    return (
                                        <div key={i} className="bg-white h-32 p-4 hover:bg-gray-50 transition-colors relative group border-[0.5px] border-gray-50">
                                            <span className="text-xs font-black text-gray-400 group-hover:text-gray-900">{day}</span>
                                            {hasTask && (
                                                <div className="mt-2 space-y-1">
                                                    {(window as any).currentProjectTasks.filter((t: any) => t.due_date && new Date(t.due_date).getDate() === day).map((t: any) => (
                                                        <div key={t.id} className="text-[8px] font-black uppercase p-1.5 bg-purple-50 text-[#7C1CE2] rounded-lg truncate border border-purple-100">{t.title}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col">
                            <h3 className="text-sm font-black text-gray-900 uppercase mb-6 tracking-tighter">Scheduled Loads</h3>
                            <div className="flex-1 space-y-6 overflow-y-auto pr-2 no-scrollbar">
                                {(window as any).currentProjectTasks.filter((t: any) => t.due_date).sort((a: any, b: any) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()).map((t: any) => (
                                    <div key={t.id} className="flex gap-4 items-start">
                                        <div className="shrink-0 w-10 text-center">
                                            <p className="text-[10px] font-black text-gray-900">{new Date(t.due_date).getDate()}</p>
                                            <p className="text-[8px] font-black text-gray-400 uppercase">{new Date(t.due_date).toLocaleString('default', { month: 'short' })}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-800 leading-tight">{t.title}</p>
                                            <p className="text-[9px] font-medium text-gray-400 mt-1">{t.assignee_id || 'Unassigned'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: 'Task Throughput', val: '84%', icon: <Zap className="w-5 h-5" />, color: 'purple' },
                                { label: 'Resource Burn', val: '₹4.2k', icon: <Activity className="w-5 h-5" />, color: 'blue' },
                                { label: 'Active Blocks', val: '08', icon: <Layers className="w-5 h-5" />, color: 'emerald' },
                                { label: 'Velocity Index', val: '9.2', icon: <LayoutDashboard className="w-5 h-5" />, color: 'orange' }
                            ].map((s, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                    <div className={`w-10 h-10 rounded-2xl bg-${s.color}-50 text-${s.color}-500 flex items-center justify-center mb-4`}>{s.icon}</div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                                    <p className="text-2xl font-black text-gray-900 tracking-tighter">{s.val}</p>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                                <h3 className="text-sm font-black text-gray-900 uppercase mb-10 tracking-tighter">Execution Velocity</h3>
                                <div className="h-64 flex items-end justify-between gap-4">
                                    {[30, 45, 60, 90, 75, 85, 95].map((v, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-4">
                                            <motion.div initial={{ height: 0 }} animate={{ height: `${v}%` }} className="w-full bg-[#7C1CE2] rounded-t-xl opacity-20 hover:opacity-100 transition-all cursor-pointer relative group">
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">{v}%</div>
                                            </motion.div>
                                            <span className="text-[8px] font-black text-gray-400 uppercase">W{i + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                                <h3 className="text-sm font-black text-gray-900 uppercase mb-10 tracking-tighter">Contributor Load</h3>
                                <div className="space-y-8">
                                    {(window as any).currentProjectTasks.reduce((acc: any[], t: any) => {
                                        const name = t.assignee_id || 'Alpha';
                                        const existing = acc.find(x => x.name === name);
                                        if (existing) existing.count++;
                                        else acc.push({ name, count: 1 });
                                        return acc;
                                    }, []).map((c: any, i: number) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-[8px] font-black">{c.name[0]}</div>
                                                    <span className="text-xs font-bold text-gray-700">{c.name}</span>
                                                </div>
                                                <span className="text-[10px] font-black text-gray-400">{c.count} Nodes</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${(c.count / (window as any).currentProjectTasks.length) * 100}%` }} className="h-full bg-blue-500" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'automation' && (
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="bg-[#7C1CE2] p-12 rounded-[3rem] text-white shadow-2xl shadow-purple-200 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-4xl font-black tracking-tighter uppercase mb-4">Neural Orchestration</h3>
                                <p className="text-purple-200 text-lg font-medium leading-relaxed max-w-xl">Configure automated triggers and workflows to optimize execution speed and eliminate manual data entry.</p>
                                <button className="mt-8 px-8 py-4 bg-white text-[#7C1CE2] rounded-[1.5rem] text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">Establish New Protocol</button>
                            </div>
                            <Zap className="w-64 h-64 text-white opacity-5 absolute -right-20 -bottom-20 rotate-12" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: 'Auto-Assign On Trigger', desc: 'Automatically assign tasks based on keyword detection in mission statements.', status: 'Active' },
                                { title: 'Velocity Sentinel', desc: 'Alert stakeholders if task velocity drops below defined thresholds.', status: 'Standby' },
                                { title: 'Budget Shield', desc: 'Lock project adjustments once 90% burn rate is established.', status: 'Active' },
                                { title: 'Status Propagation', desc: 'Sync parent track status based on micro-task completion percentages.', status: 'Draft' }
                            ].map((rule, i) => (
                                <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-start gap-6 hover:border-purple-200 transition-all cursor-pointer group">
                                    <div className={`p-4 rounded-2xl ${rule.status === 'Active' ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-50 text-gray-400'} group-hover:scale-110 transition-all`}>
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="font-bold text-gray-900">{rule.title}</h4>
                                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${rule.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>{rule.status}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 font-medium leading-relaxed">{rule.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Main Engine ---

export default function Projects() {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState<ViewType>('dashboard');
    const [viewHistory, setViewHistory] = useState<ViewType[]>([]);

    const navigateToView = (view: ViewType) => {
        if (view !== currentView) {
            setViewHistory(prev => [...prev, currentView]);
            setCurrentView(view);
        }
    };
    const [projects, setProjects] = useState<any[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [projectTab, setProjectTab] = useState<ProjectDetailTab>('overview');
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ activeTasks: 0, completedTasks: 0, totalExpenses: 0, velocity: 0 });
    const [milestones, setMilestones] = useState<any[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showMilestoneModal, setShowMilestoneModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [newProject, setNewProject] = useState({
        name: '', description: '', type: 'Internal', priority: 'Medium', budget: '0',
        is_partially_paid: false, partially_paid_amount: '0', start_date: '', end_date: '', completion_date: '', signed_by: '', allocated_to: '', client_name: ''
    });
    const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Medium', status: 'To Do', assignee: '' });
    const [newMilestone, setNewMilestone] = useState({ title: '', due_date: '' });
    const [editingMilestone, setEditingMilestone] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const tenantId = getCurrentTenantId();

    useEffect(() => {
        const savedUser = localStorage.getItem('alphery_user');
        if (!savedUser) { navigate('/'); return; }
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        loadData(parsed.company || parsed.tenant_id);
    }, [navigate]);

    const [showTaskEdit, setShowTaskEdit] = useState<any>(null);
    const [showTaskView, setShowTaskView] = useState<any>(null);
    const [activeTaskMenu, setActiveTaskMenu] = useState<string | null>(null);
    const [companyUsers, setCompanyUsers] = useState<any[]>([]);

    const fetchCompanyUsers = async (tId: string) => {
        if (!tId) return;
        // Optimization: Don't clear if it's the same tenant
        try {
            const params = new URLSearchParams();
            params.append('action', 'getUsers');
            params.append('sheetName', tId.trim());
            const response = await fetch(GS_API_URL, { method: 'POST', body: params, redirect: 'follow' });
            const data = await response.json();
            if (data.success) {
                const allUsers = data.user || [];
                setCompanyUsers(allUsers);
            } else {
                setCompanyUsers([]);
            }
        } catch (err) {
            console.error('Failed to fetch company users from GS:', err);
            setCompanyUsers([]);
        }
    };

    const loadData = async (tId: string, silent = false) => {
        if (!silent) setIsLoading(true);
        const savedUser = localStorage.getItem('alphery_user');
        const sheetName = savedUser ? JSON.parse(savedUser).company : tId;
        fetchCompanyUsers(sheetName || tId);
        try {
            // 1. Fetch Projects, Tasks & Milestones from Firestore
            const projQ = query(collection(db, 'projects'), where('tenant_id', '==', tId), orderBy('created_at', 'desc'));
            const taskQ = query(collection(db, 'tasks'), where('tenant_id', '==', tId));
            const mileQ = query(collection(db, 'milestones'), where('tenant_id', '==', tId), orderBy('due_date', 'asc'));

            const [projSnap, taskSnap, mileSnap] = await Promise.all([getDocs(projQ), getDocs(taskQ), getDocs(mileQ)]);

            let projData = projSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter((p: any) => !p.deleted_at);

            // Filter for Project Managers: Only show projects allocated to them
            const savedUserStr = localStorage.getItem('alphery_user');
            if (savedUserStr) {
                const sUser = JSON.parse(savedUserStr);
                if (sUser.role === 'Project Manager') {
                    projData = projData.filter((p: any) => p.allocated_to === sUser.username);
                }
            }
            const taskData = taskSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter((t: any) => !t.deleted_at);
            const mileData = mileSnap.docs.map(d => ({ id: d.id, ...d.data() }));

            // 2. Filter tasks/milestones based on active projects
            const activeProjectIds = new Set(projData.map((p: any) => p.id));
            const filteredTasks = taskData.filter((t: any) => activeProjectIds.has(t.project_id));
            const filteredMilestones = mileData.filter((m: any) => activeProjectIds.has(m.project_id));

            // 3. Calculate Progress for each project
            const enhancedProjects = projData.map((p: any) => {
                const pTasks = filteredTasks.filter((t: any) => t.project_id === p.id);
                const done = pTasks.filter((t: any) => t.status === 'Done').length;
                const calculatedProg = pTasks.length > 0 ? Math.round((done / pTasks.length) * 100) : 0;
                return { ...p, progress: p.progress > 0 ? p.progress : calculatedProg };
            });

            setProjects(enhancedProjects);
            setTasks(filteredTasks as any);
            setMilestones(filteredMilestones);

            // 4. Stats logic
            const activeCount = filteredTasks.filter((t: any) => t.status !== 'Done').length;
            const completedCount = filteredTasks.filter((t: any) => t.status === 'Done').length;

            let totalExp = 0;
            try {
                const expQ = query(collection(db, 'project_expenses'), where('tenant_id', '==', tId));
                const expSnap = await getDocs(expQ);
                totalExp = expSnap.docs.reduce((acc, d) => acc + (Number(d.data().amount) || 0), 0);
            } catch { /* collection may not exist */ }

            setStats({
                activeTasks: activeCount,
                completedTasks: completedCount,
                totalExpenses: totalExp,
                velocity: (activeCount + completedCount) > 0 ? (completedCount / (activeCount + completedCount)) * 10 : 0
            });
        } catch (err) {
            console.error('Fetch Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Bridge for sub-components
    (window as any).currentProjectTasks = tasks.filter(t => t.project_id === selectedProject?.id);
    (window as any).toggleTaskModal = (val: boolean) => setShowTaskModal(val);
    (window as any).updateTaskStatus = async (id: string, newStatus: string) => {
        try { await updateDoc(doc(db, 'tasks', id), { status: newStatus }); loadData(tenantId!, true); } catch (err) { console.error(err); }
    };
    (window as any).deleteTask = async (id: string) => {
        try { await updateDoc(doc(db, 'tasks', id), { deleted_at: new Date().toISOString() }); loadData(tenantId!, true); } catch (err) { console.error(err); }
    };
    (window as any).updateTaskField = async (id: string, field: string, value: any) => {
        // Optimistic UI
        setTasks(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));

        setIsSaving(true);
        try {
            await updateDoc(doc(db, 'tasks', id), { [field]: value });
            // Background refresh to sync
            const taskDoc = await getDoc(doc(db, 'tasks', id));
            if (taskDoc.exists()) setTasks(prev => prev.map(t => t.id === id ? { ...t, ...taskDoc.data() } : t));
        } catch (err) {
            console.error('Task Update Error:', err);
        } finally {
            setIsSaving(false);
        }
    };
    (window as any).updateProjectBudget = async (id: string, budget: string) => {
        try { await updateDoc(doc(db, 'projects', id), { budget_allocated: parseFloat(budget) }); loadData(tenantId!, true); } catch (err) { console.error(err); }
    };
    (window as any).isEngineSaving = isSaving;
    (window as any).updateProjectField = async (id: string, field: string, value: any) => {
        const numericFields = [
            'alloc_eng', 'alloc_design', 'alloc_strategy', 'health_score', 'budget_allocated', 'progress',
            'alloc_leadership', 'alloc_strategy_planning', 'alloc_business_analysis', 'alloc_product_mgmt',
            'alloc_project_mgmt', 'alloc_designing', 'alloc_developing', 'alloc_data_ai',
            'alloc_infra_devops', 'alloc_security_compliance', 'alloc_testing_qa', 'alloc_deployment_impl',
            'alloc_support_maint', 'alloc_sales_mktg', 'alloc_customer_success', 'alloc_hr',
            'alloc_finance_accounts', 'alloc_legal_gov', 'alloc_procurement_admin', 'alloc_research_innovation',
            'partially_paid_amount'
        ];
        const val = numericFields.includes(field) ? (Number(value) || 0) : value;

        // 1. Immediate Local Update (Optimistic UI)
        setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p));
        if (selectedProject?.id === id) {
            setSelectedProject((prev: any) => ({ ...prev, [field]: val }));
        }

        setIsSaving(true);
        try {
            await updateDoc(doc(db, 'projects', id), { [field]: val });

            // 2. Silently refresh in background without clearing local state
            const projDoc = await getDoc(doc(db, 'projects', id));
            if (projDoc.exists()) {
                const data = projDoc.data();
                setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
                if (selectedProject?.id === id) {
                    setSelectedProject((prev: any) => ({ ...prev, ...data }));
                }
            }
        } catch (err) {
            console.error('Field Update Error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCreateTask = async () => {
        if (!newTask.title.trim() || !selectedProject || !tenantId) return;
        setIsSaving(true);
        try {
            const taskData = {
                project_id: selectedProject.id,
                tenant_id: tenantId,
                title: newTask.title,
                description: newTask.description,
                status: newTask.status,
                priority: newTask.priority,
                assignee_id: newTask.assignee || user?.username,
                created_at: new Date().toISOString()
            };
            const newTaskRef = await addDoc(collection(db, 'tasks'), taskData);
            setTasks([...tasks, { id: newTaskRef.id, ...taskData } as any]);
            setShowTaskModal(false);
            setNewTask({ title: '', description: '', priority: 'Medium', status: 'To Do', assignee: '' });
            loadData(tenantId, true);
        } finally { setIsSaving(false); }
    };

    const handleCreate = async () => {
        if (!newProject.name.trim() || !tenantId) return;
        setIsSaving(true);
        try {
            const projData = {
                name: newProject.name,
                description: newProject.description,
                type: newProject.type,
                priority: newProject.priority,
                budget_allocated: parseFloat(newProject.budget),
                tenant_id: tenantId,
                created_by: user?.username || 'System',
                is_partially_paid: newProject.is_partially_paid,
                partially_paid_amount: parseFloat(newProject.partially_paid_amount) || 0,
                start_date: newProject.start_date || null,
                end_date: newProject.end_date || null,
                completion_date: newProject.completion_date || null,
                signed_by: newProject.signed_by,
                allocated_to: newProject.allocated_to,
                client_name: newProject.client_name,
                created_at: new Date().toISOString(),
                progress: 0
            };
            const newProjRef = await addDoc(collection(db, 'projects'), projData);
            setProjects([{ id: newProjRef.id, ...projData }, ...projects]);
            setShowCreateModal(false);
            setNewProject({
                name: '', description: '', type: 'Internal', priority: 'Medium', budget: '0',
                is_partially_paid: false, partially_paid_amount: '0', start_date: '', end_date: '', completion_date: '', signed_by: '', allocated_to: '', client_name: ''
            });
        } catch (err) {
            alert('Error creating project. Check your Firebase connection.');
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string, mode: 'archive' | 'purge') => {
        setIsSaving(true);
        try {
            await updateDoc(doc(db, 'projects', id), { deleted_at: new Date().toISOString() });

            setProjects(projects.filter(p => p.id !== id));
            if (selectedProject?.id === id) {
                setCurrentView('projects');
                setSelectedProject(null);
            }
        } catch (err) {
            console.error('Removal error:', err);
            alert(`Error ${mode}ing project. Check your Firebase connection.`);
        } finally {
            setIsSaving(false);
            setShowDeleteConfirm(null);
        }
    };

    const handleCreateMilestone = async () => {
        if (!newMilestone.title.trim() || !selectedProject) return;
        setIsSaving(true);
        try {
            if (editingMilestone) {
                await updateDoc(doc(db, 'milestones', editingMilestone.id), {
                    title: newMilestone.title,
                    due_date: newMilestone.due_date || null
                });
            } else {
                await addDoc(collection(db, 'milestones'), {
                    project_id: selectedProject.id,
                    tenant_id: tenantId,
                    title: newMilestone.title,
                    due_date: newMilestone.due_date || null,
                    status: 'Pending'
                });
            }
            setShowMilestoneModal(false);
            setEditingMilestone(null);
            setNewMilestone({ title: '', due_date: '' });
            loadData(tenantId!, true);
        } catch (err) {
            console.error('Milestone Operation Error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleToggleMilestone = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
        // Optimistic UI
        setMilestones(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));

        try {
            await updateDoc(doc(db, 'milestones', id), { status: newStatus });
        } catch (err) {
            console.error('Milestone Update Error:', err);
            // Revert on error
            setMilestones(prev => prev.map(m => m.id === id ? { ...m, status: currentStatus } : m));
        }
    };

    const handleProjectLaunch = (p: Project) => {
        setSelectedProject(p);
        // Important: Fetch users for THIS project's specific company (tenant_id)
        if (p.tenant_id) fetchCompanyUsers(p.tenant_id);
        navigateToView('project-detail');
        setProjectTab('overview');
    };

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#F8F9FA]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#7C1CE2] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-black text-[#7C1CE2] uppercase tracking-[0.3em]">Synching Node</span>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-[#F8F9FA] flex overflow-hidden font-sans text-gray-900 border-t border-white/5">
            {/* Nav Rail */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 z-40">
                <div className="h-16 flex items-center px-6 border-b border-gray-50 justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#7C1CE2] flex items-center justify-center text-white shadow-lg shadow-purple-100"><Briefcase className="w-4 h-4" /></div>
                        <span className="font-black text-gray-900 tracking-tighter text-lg uppercase">Engine</span>
                    </div>
                    <button
                        onClick={() => {
                            if (viewHistory.length > 0) {
                                const prev = viewHistory[viewHistory.length - 1];
                                setViewHistory(prev => prev.slice(0, -1));
                                setCurrentView(prev);
                            } else {
                                navigate('/workspace');
                            }
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 group transition-all flex items-center gap-1.5"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{viewHistory.length > 0 ? 'Back' : 'Workspace'}</span>
                    </button>
                </div>

                <div className="p-4">
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="w-full bg-[#7C1CE2] text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#6A15C5] transition-all shadow-xl shadow-purple-100"
                    >
                        <Plus className="w-4 h-4" /> New Project
                    </button>
                </div>

                <nav className="flex-1 px-3 space-y-1 overflow-y-auto CustomScroll">
                    <SidebarItem icon={<LayoutDashboard className="w-4 h-4" />} label="Project Summary" active={currentView === 'dashboard'} onClick={() => navigateToView('dashboard')} />
                    <SidebarItem icon={<Layers className="w-4 h-4" />} label="Project Tracking" active={currentView === 'projects'} onClick={() => navigateToView('projects')} />
                    <SidebarItem icon={<CheckSquare className="w-4 h-4" />} label="My Execution" active={currentView === 'tasks'} onClick={() => navigateToView('tasks')} />
                    <SidebarItem icon={<Users className="w-4 h-4" />} label="Teams" active={currentView === 'workload'} onClick={() => navigateToView('workload')} />

                    <div className="my-6 mx-3 border-t border-gray-50 pt-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Insights</span>
                        <div className="mt-2 space-y-1">
                            <SidebarItem icon={<BarChart3 className="w-4 h-4" />} label="Velocity Reports" active={currentView === 'reports'} onClick={() => navigateToView('reports')} />
                            <SidebarItem icon={<Settings className="w-4 h-4" />} label="Engine Config" active={currentView === 'settings'} onClick={() => navigateToView('settings')} />
                        </div>
                    </div>
                </nav>

                <div className="p-4">
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Connected Node</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-bold text-gray-800 truncate">{tenantId || 'Stand-alone'}</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Stage */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#FBFBFE] relative h-full">
                <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 z-30">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter flex items-center">
                            {currentView === 'project-detail' ? (
                                (user?.level === 'L0' || user?.level === 'L1') ? (
                                    <input
                                        type="text"
                                        defaultValue={selectedProject?.name}
                                        onBlur={(e) => {
                                            if (e.target.value.trim() && e.target.value !== selectedProject?.name) {
                                                (window as any).updateProjectField(selectedProject.id, 'name', e.target.value.trim());
                                            }
                                        }}
                                        className="bg-transparent border-none text-xl font-black text-gray-900 uppercase tracking-tighter p-0 focus:ring-0 w-full outline-none"
                                        placeholder="Track Name"
                                    />
                                ) : (
                                    selectedProject?.name
                                )
                            ) : (
                                currentView.replace('-', ' ')
                            )}
                        </h2>
                        {currentView === 'project-detail' && (
                            <select
                                value={selectedProject?.status || 'Planning'}
                                onChange={(e) => (window as any).updateProjectField(selectedProject.id, 'status', e.target.value)}
                                className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border-emerald-100 border-none outline-none cursor-pointer hover:bg-emerald-100 focus:ring-0 appearance-none text-center min-w-[80px]"
                                title="Change Project Phase"
                            >
                                <option value="Planning">Planning</option>
                                <option value="Designing">Designing</option>
                                <option value="Development">Development</option>
                                <option value="Testing">Testing</option>
                                <option value="Deployment">Deployment</option>
                            </select>
                        )}
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden xl:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Omni-Search..." className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-purple-100 w-64 transition-all" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-blue-600 shadow-sm">
                            {user?.username?.substring(0, 2).toUpperCase() || 'AD'}
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-hidden">
                    {currentView === 'dashboard' && <DashboardView projects={projects} stats={stats} onProjectClick={handleProjectLaunch} />}
                    {currentView === 'project-detail' && selectedProject && (
                        <ProjectDetailView
                            project={selectedProject}
                            activeTab={projectTab}
                            onTabChange={setProjectTab}
                            showTaskEdit={showTaskEdit}
                            setShowTaskEdit={setShowTaskEdit}
                            showTaskView={showTaskView}
                            setShowTaskView={setShowTaskView}
                            activeTaskMenu={activeTaskMenu}
                            setActiveTaskMenu={setActiveTaskMenu}
                            companyUsers={companyUsers}
                            milestones={milestones}
                            onAddMilestone={() => { setEditingMilestone(null); setNewMilestone({ title: '', due_date: '' }); setShowMilestoneModal(true); }}
                            onToggleMilestone={handleToggleMilestone}
                            onEditMilestone={(m) => {
                                setEditingMilestone(m);
                                setNewMilestone({ title: m.title, due_date: m.due_date ? new Date(m.due_date).toISOString().split('T')[0] : '' });
                                setShowMilestoneModal(true);
                            }}
                            user={user}
                        />
                    )}

                    {currentView === 'projects' && (
                        <div className="p-8 h-full CustomScroll overflow-y-auto">
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <th className="px-6 py-5">Track Name</th>
                                            <th className="px-6 py-5">Status</th>
                                            <th className="px-6 py-5">Category</th>
                                            <th className="px-6 py-5">Client</th>
                                            <th className="px-6 py-5">Allocated To</th>
                                            <th className="px-6 py-5">Budget</th>
                                            <th className="px-6 py-5 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {projects.map(p => (
                                            <tr key={p.id} onClick={() => handleProjectLaunch(p)} className="hover:bg-gray-50 cursor-pointer group transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-black text-[10px] group-hover:bg-[#7C1CE2] group-hover:text-white transition-all uppercase">{p.name[0]}</div>
                                                        <span className="font-bold text-gray-900">{p.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${p.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{p.status}</span>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-bold text-gray-500">{p.type}</td>
                                                <td className="px-6 py-4 text-xs font-bold text-[#7C1CE2]">{p.client_name || 'N/A'}</td>
                                                <td className="px-6 py-4 text-xs font-bold text-gray-700">{p.allocated_to || 'N/A'}</td>
                                                <td className="px-6 py-4 text-xs font-black text-gray-900">₹{Number(p.budget_allocated).toLocaleString('en-IN')}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(p.id); }}
                                                            className="p-2 hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-lg transition-colors"
                                                            title="Delete Track"
                                                        >
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {showTaskView && (
                        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xl">
                            <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 30 }} className="bg-white rounded-[3.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20">
                                <div className="p-12 relative">
                                    <button onClick={() => setShowTaskView(null)} className="absolute top-8 right-10 p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-all font-black">✕</button>

                                    <div className="flex items-center gap-2 mb-8">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${showTaskView.priority === 'High' || showTaskView.priority === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                                            {showTaskView.priority} CRITICALITY
                                        </span>
                                        <span className="px-3 py-1 bg-purple-50 text-[#7C1CE2] rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {showTaskView.status}
                                        </span>
                                    </div>

                                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-8 leading-[1.1]">{showTaskView.title}</h2>

                                    <div className="space-y-10">
                                        <div>
                                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Mission Intelligence</h4>
                                            <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100/50">
                                                <p className="text-sm font-medium text-gray-700 leading-relaxed CustomScroll overflow-y-auto max-h-[300px]">
                                                    {showTaskView.description || 'No detailed mission parameters provided for this node.'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-[#7C1CE2] font-black text-lg">
                                                    {companyUsers.find(u => u.username === showTaskView.assignee_id)?.name?.[0] || showTaskView.assignee_id?.[0] || 'A'}
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Primary Assigned</p>
                                                    <p className="text-sm font-bold text-gray-900">
                                                        {companyUsers.find(u => u.username === showTaskView.assignee_id)?.name || showTaskView.assignee_id || 'Alpha Operative'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Deadline</p>
                                                <p className="text-sm font-bold text-gray-900">{showTaskView.due_date ? new Date(showTaskView.due_date).toLocaleDateString() : 'Continuous'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => { setShowTaskEdit(showTaskView); setShowTaskView(null); }}
                                        className="mt-12 w-full py-5 bg-[#7C1CE2] text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-purple-200 hover:scale-[1.02] transition-all"
                                    >
                                        Modify Parameters
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showTaskEdit && (
                        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
                            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-[3rem] shadow-2xl w-full max-w-3xl overflow-hidden border border-white/20">
                                <div className="p-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-[#7C1CE2]"><Layout className="w-6 h-6" /></div>
                                        <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Modify Node</h3>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Designation</label>
                                            <input
                                                type="text"
                                                value={showTaskEdit.title}
                                                onChange={e => setShowTaskEdit({ ...showTaskEdit, title: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Mission Protocol Description</label>
                                            <textarea
                                                rows={8}
                                                value={showTaskEdit.description || ''}
                                                onChange={e => setShowTaskEdit({ ...showTaskEdit, description: e.target.value })}
                                                className="w-full px-6 py-5 bg-gray-50 border-none rounded-[1.5rem] text-sm font-medium focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all outline-none resize-none leading-relaxed"
                                                placeholder="Provide detailed execution steps and context here..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Assignee ID</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. KEC001"
                                                    value={showTaskEdit.assignee_id || ''}
                                                    onChange={e => setShowTaskEdit({ ...showTaskEdit, assignee_id: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none"
                                                />
                                                <div className="mt-2 flex items-center gap-2 px-1">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${companyUsers.find(u => u.username === showTaskEdit.assignee_id) ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                                                    <span className="text-[9px] font-black text-[#7C1CE2] uppercase tracking-tighter">
                                                        Identity: {companyUsers.find(u => u.username === showTaskEdit.assignee_id)?.name || 'Guest/Unfiltered'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Due Date</label>
                                                <input
                                                    type="date"
                                                    value={showTaskEdit.due_date ? new Date(showTaskEdit.due_date).toISOString().split('T')[0] : ''}
                                                    onChange={e => setShowTaskEdit({ ...showTaskEdit, due_date: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Status</label>
                                                <select
                                                    value={showTaskEdit.status}
                                                    onChange={e => setShowTaskEdit({ ...showTaskEdit, status: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none"
                                                >
                                                    <option>To Do</option><option>In Progress</option><option>Done</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Criticality</label>
                                                <select
                                                    value={showTaskEdit.priority}
                                                    onChange={e => setShowTaskEdit({ ...showTaskEdit, priority: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none"
                                                >
                                                    <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pt-10">
                                        <button onClick={() => setShowTaskEdit(null)} className="flex-1 py-4 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Cancel</button>
                                        <button
                                            onClick={async () => {
                                                await (window as any).updateTaskField(showTaskEdit.id, 'title', showTaskEdit.title);
                                                await (window as any).updateTaskField(showTaskEdit.id, 'description', showTaskEdit.description);
                                                await (window as any).updateTaskField(showTaskEdit.id, 'assignee_id', showTaskEdit.assignee_id);
                                                await (window as any).updateTaskField(showTaskEdit.id, 'due_date', showTaskEdit.due_date);
                                                await (window as any).updateTaskField(showTaskEdit.id, 'status', showTaskEdit.status);
                                                await (window as any).updateTaskField(showTaskEdit.id, 'priority', showTaskEdit.priority);
                                                setShowTaskEdit(null);
                                            }}
                                            className="flex-1 py-4 rounded-2xl bg-[#7C1CE2] text-white text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-purple-100"
                                        >
                                            Sync Updates
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Removal Confirmation Modal */}
                <AnimatePresence>
                    {showDeleteConfirm && (
                        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden p-8">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-6">
                                        <AlertCircle className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2">Track Removal</h3>
                                    <p className="text-sm text-gray-500 mb-8 px-4">Choose how you want to handle this execution track. Data integrity depends on your selection.</p>

                                    <div className="grid grid-cols-1 gap-4 w-full mb-8">
                                        <button
                                            onClick={() => handleDelete(showDeleteConfirm, 'archive')}
                                            disabled={isSaving}
                                            className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all text-left"
                                        >
                                            <div className="p-3 rounded-xl bg-purple-100 text-[#7C1CE2] group-hover:bg-[#7C1CE2] group-hover:text-white transition-all">
                                                <Layers className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900">Archive Track</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Safe • Hide from Workspace</p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => handleDelete(showDeleteConfirm, 'purge')}
                                            disabled={isSaving}
                                            className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all text-left"
                                        >
                                            <div className="p-3 rounded-xl bg-red-100 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                                <Activity className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900">Purge from DB</p>
                                                <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Permanent • Cannot be Undone</p>
                                            </div>
                                        </button>
                                    </div>

                                    <button onClick={() => setShowDeleteConfirm(null)} className="py-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-900">Abort Operation</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Deploy Modal */}
                <AnimatePresence>
                    {showCreateModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden border border-white/20">
                                <div className="p-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-[#7C1CE2]"><Plus className="w-6 h-6" /></div>
                                        <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Add New Project</h3>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Project Name</label>
                                                <input type="text" placeholder="e.g. Q1 Global Growth" value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Client Name</label>
                                                <input type="text" placeholder="e.g. Acme Corp" value={newProject.client_name} onChange={e => setNewProject({ ...newProject, client_name: e.target.value })} className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Project Description</label>
                                            <textarea placeholder="Instructional breakdown..." rows={3} value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all outline-none resize-none" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Start Date</label>
                                                <input type="date" value={newProject.start_date} onChange={e => setNewProject({ ...newProject, start_date: e.target.value })} className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Comp/Target End</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input type="date" value={newProject.end_date} onChange={e => setNewProject({ ...newProject, end_date: e.target.value })} className="w-full px-2 py-3.5 bg-gray-50 border-none rounded-xl text-[10px] font-bold focus:bg-white transition-all outline-none" title="Expected End" />
                                                    <input type="date" value={newProject.completion_date} onChange={e => setNewProject({ ...newProject, completion_date: e.target.value })} className="w-full px-2 py-3.5 bg-emerald-50 border-none rounded-xl text-[10px] font-bold focus:bg-white transition-all outline-none" title="Actual Completion" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                                            <div className="flex items-center justify-between px-2 p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center"><IndianRupee className="w-4 h-4" /></div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Partial Payment</p>
                                                        <p className="text-[9px] font-bold text-gray-400 uppercase">Mark if partially paid</p>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={newProject.is_partially_paid}
                                                    onChange={e => setNewProject({ ...newProject, is_partially_paid: e.target.checked })}
                                                    className="w-5 h-5 rounded-lg border-2 border-gray-200 text-[#7C1CE2] focus:ring-[#7C1CE2] transition-all cursor-pointer"
                                                />
                                            </div>

                                            {newProject.is_partially_paid && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    className="px-4 pb-4 pt-2 bg-orange-50/30 border-t border-orange-100"
                                                >
                                                    <label className="text-[9px] font-black text-orange-600 uppercase tracking-widest block mb-1.5 ml-1">Commenced Amount (INR)</label>
                                                    <div className="relative">
                                                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-orange-400" />
                                                        <input
                                                            type="number"
                                                            placeholder="0.00"
                                                            value={newProject.partially_paid_amount}
                                                            onChange={e => setNewProject({ ...newProject, partially_paid_amount: e.target.value })}
                                                            className="w-full pl-9 pr-4 py-2.5 bg-white border border-orange-100 rounded-xl text-sm font-bold text-orange-700 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="relative bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Project Signed By</label>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C1CE2] flex items-center justify-center shrink-0"><Users className="w-5 h-5" /></div>
                                                    <select
                                                        value={newProject.signed_by}
                                                        onChange={e => setNewProject({ ...newProject, signed_by: e.target.value })}
                                                        className="flex-1 bg-transparent border-none text-sm font-bold focus:ring-0 p-0 outline-none cursor-pointer"
                                                    >
                                                        <option value="">Select Signatory...</option>
                                                        {companyUsers.filter((u: any) => u.level === 'L0' || u.level === 'L1').map((u: any) => (
                                                            <option key={u.username} value={u.username}>{u.name} ({u.username})</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="mt-2 pt-2 border-t border-gray-50 flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${newProject.signed_by ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                                                    <span className="text-[9px] font-black text-[#7C1CE2] uppercase tracking-widest leading-none">
                                                        {newProject.signed_by ? (companyUsers.find(u => u.username === newProject.signed_by)?.name || 'Member') : 'None'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="relative bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Allocated To</label>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0"><Users className="w-5 h-5" /></div>
                                                    <select
                                                        value={newProject.allocated_to}
                                                        onChange={e => setNewProject({ ...newProject, allocated_to: e.target.value })}
                                                        className="flex-1 bg-transparent border-none text-sm font-bold focus:ring-0 p-0 outline-none cursor-pointer"
                                                    >
                                                        <option value="">Select Lead...</option>
                                                        {companyUsers.filter((u: any) => u.role === 'Project Manager').map((u: any) => (
                                                            <option key={u.username} value={u.username}>{u.name} ({u.username})</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="mt-2 pt-2 border-t border-gray-50 flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${newProject.allocated_to ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                                                    <span className="text-[9px] font-black text-[#0066FF] uppercase tracking-widest leading-none">
                                                        {newProject.allocated_to ? (companyUsers.find(u => u.username === newProject.allocated_to)?.name || 'Member') : 'None'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pt-10">
                                        <button onClick={() => setShowCreateModal(false)} className="flex-1 py-4 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Abort</button>
                                        <button onClick={handleCreate} disabled={isSaving || !newProject.name.trim()} className="flex-1 py-4 rounded-2xl bg-[#7C1CE2] text-white text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-purple-100 disabled:opacity-50">
                                            {isSaving ? 'Initializing...' : 'Deploy Track'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {showTaskModal && (
                        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20">
                                <div className="p-10">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7C1CE2] flex items-center justify-center"><CheckSquare className="w-6 h-6" /></div>
                                        <div>
                                            <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">New Task</h3>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Project: {selectedProject?.name}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <input type="text" placeholder="Task Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all outline-none" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold outline-none cursor-pointer">
                                                <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                                            </select>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Assignee ID"
                                                    value={newTask.assignee}
                                                    onChange={e => setNewTask({ ...newTask, assignee: e.target.value })}
                                                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all"
                                                />
                                                <div className="mt-2 flex items-center gap-2 px-1">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${companyUsers.find(u => u.username === newTask.assignee) ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                                                    <span className="text-[9px] font-black text-[#7C1CE2] uppercase tracking-tighter">
                                                        Identity: {companyUsers.find(u => u.username === newTask.assignee)?.name || 'Guest User'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pt-12">
                                        <button onClick={() => setShowTaskModal(false)} className="flex-1 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Cancel</button>
                                        <button onClick={handleCreateTask} disabled={isSaving || !newTask.title.trim()} className="flex-1 py-4 rounded-2xl bg-[#7C1CE2] text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-purple-100 disabled:opacity-50">
                                            {isSaving ? 'Synching...' : 'Commit'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                    {showMilestoneModal && (
                        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20">
                                <div className="p-10">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Flag className="w-6 h-6" /></div>
                                        <div>
                                            <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">{editingMilestone ? 'Modify Milestone' : 'New Milestone'}</h3>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Project: {selectedProject?.name}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Milestone Title</label>
                                            <input type="text" placeholder="e.g. Beta Version Launch" value={newMilestone.title} onChange={e => setNewMilestone({ ...newMilestone, title: e.target.value })} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all outline-none" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Target Date</label>
                                            <input type="date" value={newMilestone.due_date} onChange={e => setNewMilestone({ ...newMilestone, due_date: e.target.value })} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all" />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pt-12">
                                        <button onClick={() => { setShowMilestoneModal(false); setEditingMilestone(null); }} className="flex-1 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Abort</button>
                                        <button onClick={handleCreateMilestone} disabled={isSaving || !newMilestone.title.trim()} className="flex-1 py-4 rounded-2xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-100 disabled:opacity-50">
                                            {isSaving ? 'Synching...' : editingMilestone ? 'Sync Updates' : 'Deploy Milestone'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>

            <style>{`
                .CustomScroll::-webkit-scrollbar { width: 6px; }
                .CustomScroll::-webkit-scrollbar-track { background: transparent; }
                .CustomScroll::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
                .CustomScroll::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
                @keyframes pulse-soft { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
            `}</style>
        </div>
    );
}
