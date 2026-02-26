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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, Badge, Button, cn } from "./ui";
import {
  TrendingUp,
  Users,
  FlaskConical,
  CreditCard,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

const data = [
  { name: 'Mon', revenue: 4000, jobs: 24 },
  { name: 'Tue', revenue: 3000, jobs: 18 },
  { name: 'Wed', revenue: 2000, jobs: 29 },
  { name: 'Thu', revenue: 2780, jobs: 20 },
  { name: 'Fri', revenue: 1890, jobs: 15 },
  { name: 'Sat', revenue: 2390, jobs: 22 },
  { name: 'Sun', revenue: 3490, jobs: 28 },
];

const pieData = [
  { name: 'Progressive', value: 400 },
  { name: 'Single Vision', value: 300 },
  { name: 'Bifocal', value: 300 },
  { name: 'Contact Lenses', value: 200 },
];

const COLORS = ['#667EEA', '#764BA2', '#9F7AEA', '#B794F4'];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Executive Overview</h2>
          <p className="text-slate-500 font-medium text-lg">System-wide performance & resource metrics</p>
        </div>
        <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-2 rounded-2xl border border-white/60 shadow-sm">
          <Badge variant="primary" className="shadow-sm">REAL-TIME</Badge>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">Status: All Systems Nominal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIItem title="Total Patients" value="1,284" change="+12.5%" icon={Users} color="bg-blue-50 text-blue-600" />
        <KPIItem title="Lab Jobs" value="482" change="+8.2%" icon={FlaskConical} color="bg-purple-50 text-purple-600" />
        <KPIItem title="Total Revenue" value="₹42,390" change="+14.1%" icon={CreditCard} color="bg-emerald-50 text-emerald-600" />
        <KPIItem title="QC Pass Rate" value="98.4%" change="+2.1%" icon={CheckCircle2} color="bg-amber-50 text-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 overflow-hidden min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Revenue Insights</h3>
            <select className="text-xs font-semibold bg-slate-50 border-none rounded-md px-2 py-1 outline-none text-slate-500 cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#667EEA" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#667EEA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: '600' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#667EEA" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 overflow-hidden min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Lab Job Distribution</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#667EEA]" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Product A</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center min-w-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 col-span-2 overflow-hidden">
          <h3 className="font-bold text-slate-800 mb-6">Technician Productivity</h3>
          <div className="h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip cursor={{ fill: '#F8FAFC' }} />
                <Bar dataKey="jobs" fill="#764BA2" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-slate-800 mb-4">Critical Alerts</h3>
          <div className="space-y-4">
            <AlertItem title="Machine Calibration Due" time="2h ago" type="error" />
            <AlertItem title="Inventory Low: CR-39 Lenses" time="5h ago" type="warning" />
            <AlertItem title="QC Failure Rate Spike" time="Yesterday" type="error" />
            <AlertItem title="New Integration Request" time="2 days ago" type="info" />
          </div>
          <Button variant="ghost" className="w-full mt-6 text-slate-500 text-xs font-bold uppercase tracking-widest">
            View All Alerts
          </Button>
        </Card>
      </div>
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
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
            <TrendingUp size={10} /> {change}
          </span>
        </div>
      </div>
    </Card>
  );
}

function AlertItem({ title, time, type }: any) {
  const styles = {
    error: "bg-red-500/10 text-red-700 border-red-500/20",
    warning: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    info: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  };
  return (
    <div className={`p-4 rounded-xl border backdrop-blur-md flex items-start gap-3 transition-all hover:bg-white/40 shadow-sm ${styles[type as keyof typeof styles]}`}>
      <AlertTriangle size={18} className="shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-black leading-tight">{title}</p>
        <p className="text-[10px] font-bold opacity-50 uppercase mt-2 tracking-widest">{time}</p>
      </div>
    </div>
  );
}
