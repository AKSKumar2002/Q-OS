import * as React from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  FileText,
  ShoppingBag,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  User,
  Building2,
  Tag,
  Target,
  ArrowRight,
  MoreVertical,
  GripVertical,
  IndianRupee
} from "lucide-react";
import { Card, Badge, Button, cn } from "./ui";
import { motion } from "motion/react";

// --- KANBAN BOARD for Opportunities ---
interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  items: any[];
}

export const KanbanBoard = ({ columns, onCardClick, onStageChange }: any) => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
      {columns.map((column: KanbanColumn) => (
        <div key={column.id} className="flex-shrink-0 w-80">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${column.color}`} />
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">{column.title}</h3>
              <Badge variant="neutral" className="rounded-md">{column.items.length}</Badge>
            </div>
            <div className="text-xs font-bold text-slate-400">
              ₹{column.items.reduce((sum: number, item: any) => sum + (item.value || 0), 0).toLocaleString()}
            </div>
          </div>
          <div className="space-y-4 min-h-[500px] bg-white/10 backdrop-blur-sm rounded-[2rem] p-4 border border-white/20 shadow-inner">
            {column.items.map((item: any, idx: number) => (
              <KanbanCard key={item.id} item={item} onClick={() => onCardClick(item)} />
            ))}
            {column.items.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-xs border-2 border-dashed border-white/20 rounded-3xl">
                <Target size={24} className="mb-2 opacity-20" />
                Empty Space
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const KanbanCard = ({ item, onClick }: any) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="p-4 hover:border-[#667EEA] transition-all group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1">{item.name}</h4>
            <p className="text-xs text-slate-500">{item.patient || item.lead}</p>
          </div>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 -mt-2 -mr-2">
            <MoreVertical size={14} />
          </Button>
        </div>
        <div className="flex items-center justify-between mb-3">
          <Badge variant="primary" className="text-xs">{item.type}</Badge>
          <span className="text-lg font-black text-[#667EEA]">₹{item.value?.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            {item.closeDate}
          </div>
          {item.probability && (
            <div className="flex items-center gap-1">
              <TrendingUp size={12} />
              {item.probability}%
            </div>
          )}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#667EEA] to-[#764BA2] flex items-center justify-center text-white text-[8px] font-bold">
            {item.owner?.[0] || 'A'}
          </div>
          <span className="text-xs text-slate-500 font-medium">{item.owner}</span>
        </div>
      </Card>
    </motion.div>
  );
};

// --- ACTIVITY TIMELINE (360° View) ---
interface TimelineItem {
  id: string;
  type: "call" | "whatsapp" | "email" | "appointment" | "order" | "note" | "campaign";
  title: string;
  description?: string;
  timestamp: string;
  user: string;
  metadata?: any;
}

export const ActivityTimeline = ({ activities }: { activities: TimelineItem[] }) => {
  const getIcon = (type: string) => {
    const icons: any = {
      call: Phone,
      whatsapp: MessageCircle,
      email: Mail,
      appointment: Calendar,
      order: ShoppingBag,
      note: FileText,
      campaign: Target,
    };
    return icons[type] || FileText;
  };

  const getColor = (type: string) => {
    const colors: any = {
      call: "bg-[#667EEA]/10 text-[#667EEA] border-[#667EEA]/20",
      whatsapp: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      email: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      appointment: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      order: "bg-teal-500/10 text-teal-600 border-teal-500/20",
      note: "bg-slate-500/10 text-slate-600 border-slate-500/20",
      campaign: "bg-pink-500/10 text-pink-600 border-pink-500/20",
    };
    return colors[type] || "bg-slate-500/10 text-slate-600 border-slate-500/20";
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />

      <div className="space-y-4">
        {activities.map((activity, idx) => {
          const Icon = getIcon(activity.type);
          const colorClass = getColor(activity.type);

          return (
            <div key={activity.id} className="relative flex gap-4">
              {/* Icon */}
              <div className={cn(
                "w-12 h-12 rounded-2xl border backdrop-blur-xl flex items-center justify-center shrink-0 z-10 shadow-lg",
                colorClass
              )}>
                <Icon size={20} className="drop-shadow-sm" />
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-bold text-slate-800 text-sm">{activity.title}</h4>
                  <span className="text-xs text-slate-400 font-medium">{activity.timestamp}</span>
                </div>
                {activity.description && (
                  <p className="text-sm text-slate-600 mb-2">{activity.description}</p>
                )}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <User size={12} />
                  <span>{activity.user}</span>
                </div>
                {activity.metadata && (
                  <Card className="mt-3 p-3 bg-slate-50/50 border-dashed text-xs text-slate-600">
                    {JSON.stringify(activity.metadata, null, 2)}
                  </Card>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- LIFECYCLE BADGE ---
export const LifecycleBadge = ({ stage, tooltip }: { stage: string; tooltip?: string }) => {
  const styles: any = {
    "Prospect": "bg-blue-500/10 text-blue-700 border-blue-200/50",
    "Active Patient": "bg-emerald-500/10 text-emerald-700 border-emerald-200/50",
    "Dormant": "bg-slate-500/10 text-slate-600 border-slate-300/50",
    "Repeat Customer": "bg-purple-500/10 text-purple-700 border-purple-200/50",
    "VIP": "bg-amber-500/10 text-amber-700 border-amber-200/50",
  };

  return (
    <div className="group relative inline-block">
      <Badge variant="neutral" className={cn("border-2 font-bold", styles[stage])}>
        {stage}
      </Badge>
      {tooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {tooltip}
        </div>
      )}
    </div>
  );
};

// --- CONVERSION PROBABILITY INDICATOR ---
export const ProbabilityIndicator = ({ probability }: { probability: number }) => {
  const getColor = () => {
    if (probability >= 75) return "bg-emerald-500";
    if (probability >= 50) return "bg-amber-500";
    if (probability >= 25) return "bg-blue-500";
    return "bg-slate-300";
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-3 bg-white/20 backdrop-blur-md rounded-full overflow-hidden border border-white/10 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${probability}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={cn("h-full rounded-full shadow-lg", getColor())}
        />
      </div>
      <span className="text-sm font-bold text-slate-700 w-12 text-right">{probability}%</span>
    </div>
  );
};

// --- QUICK ACTION BUTTONS (for Leads) ---
export const QuickActions = ({ onCall, onWhatsApp, onConvert }: any) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" size="sm" className="gap-2" onClick={onCall}>
        <Phone size={14} />
        Call
      </Button>
      <Button variant="secondary" size="sm" className="gap-2" onClick={onWhatsApp}>
        <MessageCircle size={14} />
        WhatsApp
      </Button>
      <Button variant="primary" size="sm" className="gap-2" onClick={onConvert}>
        <CheckCircle2 size={14} />
        Convert
      </Button>
    </div>
  );
};

// --- FOLLOW-UP CARD ---
export const FollowUpCard = ({ task, onComplete }: any) => {
  const isOverdue = task.status === "Overdue";
  const isPending = task.status === "Pending";

  return (
    <Card className={cn(
      "p-4 border-l-4 transition-all",
      isOverdue && "border-l-red-500 bg-red-50/30",
      isPending && "border-l-amber-500 bg-amber-50/30",
      task.status === "Completed" && "border-l-emerald-500 bg-emerald-50/30 opacity-60"
    )}>
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
          isOverdue ? "bg-red-100 text-red-600" : isPending ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
        )}>
          <Clock size={18} />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-slate-800 text-sm">{task.type}</h4>
                <Badge variant={task.priority === "High" ? "error" : task.priority === "Medium" ? "warning" : "neutral"} className="text-xs">
                  {task.priority}
                </Badge>
              </div>
              <p className="text-xs text-slate-600">{task.linkedTo}</p>
            </div>
            {task.status !== "Completed" && (
              <Button variant="ghost" size="sm" onClick={onComplete} className="gap-1 text-xs">
                <CheckCircle2 size={12} />
                Complete
              </Button>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              {task.dueDate}
            </div>
            <div className="flex items-center gap-1">
              <User size={12} />
              {task.assignedTo}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// --- CONVERSION FUNNEL CHART ---
export const ConversionFunnel = ({ stages }: { stages: Array<{ label: string; count: number; percentage: number }> }) => {
  return (
    <div className="space-y-2">
      {stages.map((stage, idx) => (
        <div key={idx} className="relative group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-800 uppercase tracking-[2px]">{stage.label}</span>
            <span className="text-xs font-bold text-slate-500">{stage.count} Users</span>
          </div>
          <div className="h-12 bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl flex items-center px-4 overflow-hidden relative shadow-sm group-hover:shadow-md transition-all">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stage.percentage}%` }}
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#667EEA]/40 to-[#764BA2]/40 z-0"
            />
            <div className="relative z-10 flex items-center justify-between w-full">
              <span className="text-sm font-bold text-slate-800">{stage.percentage}%</span>
              <TrendingUp size={16} className="text-[#667EEA] opacity-30" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- CAMPAIGN PERFORMANCE WIDGET ---
export const CampaignWidget = ({ campaign }: any) => {
  return (
    <Card className="p-5 hover:border-[#667EEA] transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-slate-800 mb-1">{campaign.name}</h3>
          <Badge variant="info" className="text-xs">{campaign.type}</Badge>
        </div>
        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
          <MoreVertical size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Leads</p>
          <p className="text-xl font-black text-slate-800">{campaign.leads}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Converted</p>
          <p className="text-xl font-black text-emerald-600">{campaign.conversions}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ROI</p>
          <p className="text-xl font-black text-[#667EEA]">{campaign.roi}%</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Conversion Rate</span>
          <span className="font-bold text-slate-700">{campaign.conversionRate}%</span>
        </div>
        <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#667EEA] to-[#764BA2] rounded-full"
            style={{ width: `${campaign.conversionRate}%` }}
          />
        </div>
      </div>
    </Card>
  );
};
