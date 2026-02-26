import * as React from "react";
import {
  Plus,
  Search,
  Download,
  Filter,
  ChevronLeft,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  History,
  Paperclip,
  Activity,
  ArrowRight
} from "lucide-react";
import { Button, Input, Badge, Card, Table, THead, TBody, TR, TH, TD, Tabs, Avatar, Label } from "./ui";
import { motion } from "motion/react";

// --- Types for the Generic Module ---
interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface ModuleProps {
  title: string;
  data: any[];
  columns: Column[];
  onCreate?: () => void;
  onView?: (item: any) => void;
}

// --- List View Screen ---
export const ListView = ({ title, data, columns, onCreate, onView, filters = true }: any) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="primary" className="rounded-md">{data.length} Total</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="gap-2">
            <Download size={16} />
            Export
          </Button>
          <Button onClick={onCreate} className="gap-2">
            <Plus size={16} />
            Create New
          </Button>
        </div>
      </div>

      {filters && (
        <Card className="p-4 bg-white/30 backdrop-blur-md border border-white/40">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                placeholder={`Search ${title.toLowerCase()}...`}
                className="w-full glass-input h-10 pl-10 pr-4 rounded-xl text-sm transition-all outline-none"
              />
            </div>
            <Button variant="secondary" size="icon">
              <Filter size={18} className="text-slate-600" />
            </Button>
            <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
              <Badge variant="neutral" className="cursor-pointer hover:bg-slate-100">Today</Badge>
              <Badge variant="neutral" className="cursor-pointer hover:bg-slate-100">Last 7 Days</Badge>
              <Badge variant="neutral" className="cursor-pointer hover:bg-slate-100">This Month</Badge>
            </div>
          </div>
        </Card>
      )}

      <Table>
        <THead>
          <TR>
            {columns.map((col: Column) => (
              <TH key={col.key}>{col.label}</TH>
            ))}
            <TH className="text-right">Actions</TH>
          </TR>
        </THead>
        <TBody>
          {data.map((item: any, idx: number) => (
            <TR key={item.id || idx}>
              {columns.map((col: Column) => (
                <TD key={col.key}>
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </TD>
              ))}
              <TD className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onView?.(item)}>
                  <MoreVertical size={16} />
                </Button>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <div className="flex items-center justify-between px-2 text-sm text-slate-500">
        <p>Showing 1-{data.length} of {data.length} results</p>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" disabled>Previous</Button>
          <div className="flex items-center gap-1">
            <Button variant="primary" size="sm" className="w-8 h-8 p-0">1</Button>
            <Button variant="secondary" size="sm" className="w-8 h-8 p-0">2</Button>
          </div>
          <Button variant="secondary" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

// --- Form Screen ---
export const FormView = ({ title, onCancel, onSave, children }: any) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ChevronLeft size={20} />
        </Button>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Create New {title}</h2>
      </div>

      <Card className="p-8 glass-card border-none shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {children}
        </div>

        <div className="mt-12 flex items-center justify-end gap-3 pt-6 border-t border-white/20">
          <Button variant="secondary" onClick={onCancel} className="px-8 bg-white/40 hover:bg-white/60">Cancel</Button>
          <Button onClick={onSave} className="px-12 shadow-lg shadow-[#667EEA]/20">Save {title}</Button>
        </div>
      </Card>
    </div>
  );
};

// --- Detail View Screen ---
export const DetailView = ({ title, subtitle, status, tabs, activeTab, onTabChange, sidebarContent, children, onBack }: any) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft size={20} />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
              <Badge variant={status === "Completed" || status === "Paid" ? "success" : "warning"}>{status}</Badge>
            </div>
            <p className="text-slate-500 font-medium text-sm mt-0.5">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="gap-2">
            <FileText size={16} />
            Generate Invoice
          </Button>
          <Button className="gap-2">
            <Activity size={16} />
            Action Center
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
          {children}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 glass-card">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Plus size={16} className="text-[#667EEA]" /> Quick Summary
            </h3>
            <div className="space-y-4">
              {sidebarContent}
            </div>
          </Card>

          <Card className="p-6 border-dashed border-white/40 bg-white/20 backdrop-blur-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Paperclip size={16} className="text-[#667EEA]" /> Attachments
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/40 flex items-center justify-between text-xs group cursor-pointer hover:border-[#667EEA]/50 hover:bg-white/60 transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-red-50 text-red-600 flex items-center justify-center font-bold">PDF</div>
                  <div>
                    <p className="font-semibold text-slate-700">Medical_Report.pdf</p>
                    <p className="text-slate-400">2.4 MB • Oct 12, 2023</p>
                  </div>
                </div>
                <Download size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
