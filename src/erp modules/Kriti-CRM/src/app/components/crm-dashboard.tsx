import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, Badge, Button, cn } from "./ui";
import {
  UserPlus,
  Target,
  Clock,
  TrendingUp,
  Award,
  Phone,
  CheckCircle2,
  IndianRupee,
  Calendar,
  ArrowRight
} from "lucide-react";

const conversionData = [
  { name: 'Mon', leads: 12, conversions: 8 },
  { name: 'Tue', leads: 15, conversions: 11 },
  { name: 'Wed', leads: 8, conversions: 5 },
  { name: 'Thu', leads: 18, conversions: 14 },
  { name: 'Fri', leads: 22, conversions: 16 },
  { name: 'Sat', leads: 25, conversions: 19 },
  { name: 'Sun', leads: 10, conversions: 7 },
];

const sourceData = [
  { name: 'Website', value: 400 },
  { name: 'Walk-in', value: 300 },
  { name: 'Phone Call', value: 200 },
  { name: 'Campaign', value: 278 },
];

const COLORS = ['#667EEA', '#764BA2', '#9F7AEA', '#B794F4'];

export function CRMDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-1 drop-shadow-sm">CRM Intelligence</h2>
          <p className="text-slate-500 font-medium text-lg">Real-time lifecycle & relationship engine</p>
        </div>
        <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-2 rounded-2xl border border-white/60 shadow-sm">
          <Badge variant="success" className="animate-pulse shadow-sm">LIVE FEED</Badge>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">Last Sync: 0s ago</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPIItem
          title="New Leads Today"
          value="47"
          change="+18%"
          icon={UserPlus}
          color="bg-blue-50 text-blue-600"
        />
        <KPIItem
          title="Conversion Rate"
          value="68.4%"
          change="+5.2%"
          icon={TrendingUp}
          color="bg-emerald-50 text-emerald-600"
        />
        <KPIItem
          title="Follow-ups Due"
          value="23"
          change="Today"
          icon={Clock}
          color="bg-amber-50 text-amber-600"
        />
        <KPIItem
          title="Pipeline Value"
          value="₹128K"
          change="+24%"
          icon={Target}
          color="bg-purple-50 text-purple-600"
        />
        <KPIItem
          title="Campaigns Active"
          value="8"
          change="3 ending soon"
          icon={Award}
          color="bg-pink-50 text-pink-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 overflow-hidden min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Lead Conversion Trends</h3>
            <select className="text-xs font-semibold bg-slate-50 border-none rounded-md px-2 py-1 outline-none text-slate-500 cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: '600' }}
                />
                <Line type="monotone" dataKey="leads" stroke="#667EEA" strokeWidth={3} dot={{ fill: '#667EEA', r: 4 }} />
                <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 overflow-hidden min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Lead Source Distribution</h3>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center min-w-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry) => entry.name}
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Quick Actions & Top Campaigns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 col-span-2">
          <h3 className="font-bold text-slate-800 mb-6">Top Performing Campaigns</h3>
          <div className="space-y-4">
            <CampaignRow
              name="Diwali Vision Sale"
              leads={124}
              conversions={89}
              revenue="₹28,400"
              conversionRate={71.8}
            />
            <CampaignRow
              name="Free Eye Checkup Drive"
              leads={98}
              conversions={62}
              revenue="₹18,900"
              conversionRate={63.3}
            />
            <CampaignRow
              name="Premium Lens Promotion"
              leads={76}
              conversions={54}
              revenue="₹22,100"
              conversionRate={71.1}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full gap-2 justify-start" variant="secondary">
              <UserPlus size={16} />
              Add New Lead
            </Button>
            <Button className="w-full gap-2 justify-start" variant="secondary">
              <Phone size={16} />
              Today's Follow-ups
            </Button>
            <Button className="w-full gap-2 justify-start" variant="secondary">
              <Target size={16} />
              Pipeline View
            </Button>
            <Button className="w-full gap-2 justify-start" variant="secondary">
              <Award size={16} />
              Launch Campaign
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <h4 className="font-bold text-slate-700 text-sm mb-3">Upcoming Milestones</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                <div>
                  <p className="text-slate-700 font-semibold">Q1 Target: 85% complete</p>
                  <p className="text-slate-400">17 days remaining</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                <div>
                  <p className="text-slate-700 font-semibold">Campaign ends tomorrow</p>
                  <p className="text-slate-400">Summer Sale 2026</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Activity Summary */}
      <Card className="p-6">
        <h3 className="font-bold text-slate-800 mb-6">Today's Activity Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ActivityStat label="Calls Made" value="42" icon={Phone} />
          <ActivityStat label="Emails Sent" value="28" icon={Calendar} />
          <ActivityStat label="Appointments Set" value="15" icon={CheckCircle2} />
          <ActivityStat label="Revenue Generated" value="₹8,400" icon={IndianRupee} />
        </div>
      </Card>
    </div>
  );
}

function KPIItem({ title, value, change, icon: Icon, color }: any) {
  return (
    <Card className="p-6 relative overflow-hidden group border-none shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10 rounded-full transition-transform group-hover:scale-150 duration-500", color)} />
      <div className="relative z-10">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm", color)}>
          <Icon size={24} />
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-1">{title}</p>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-black text-slate-800">{value}</span>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full backdrop-blur-md">
            {change}
          </span>
        </div>
      </div>
    </Card>
  );
}

function CampaignRow({ name, leads, conversions, revenue, conversionRate }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/20 hover:bg-white/40 border border-white/30 transition-all cursor-pointer group shadow-sm hover:shadow-md">
      <div className="flex-1">
        <h4 className="font-bold text-slate-800 text-sm mb-1">{name}</h4>
        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
          <span>{leads} Leads</span>
          <span className="opacity-30">•</span>
          <span>{conversions} Wins</span>
          <span className="opacity-30">•</span>
          <span className="text-emerald-600">₹{revenue.toLocaleString()}</span>
        </div>
      </div>
      <div className="text-right flex items-center gap-6">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rate</p>
          <p className="text-lg font-black text-[#667EEA]">{conversionRate}%</p>
        </div>
        <div className="p-2 rounded-full bg-[#667EEA]/10 text-[#667EEA] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
}

function ActivityStat({ label, value, icon: Icon }: any) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/30 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-md transition-all">
      <div className="w-12 h-12 rounded-2xl bg-[#667EEA]/10 flex items-center justify-center text-[#667EEA] shadow-inner">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
}
