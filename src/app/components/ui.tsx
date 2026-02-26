import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-gradient-to-r from-[#667EEA]/90 to-[#764BA2]/90 backdrop-blur-md text-white border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
      secondary: "bg-white/40 backdrop-blur-md border border-white/60 text-slate-700 hover:bg-white/60 shadow-sm",
      tertiary: "text-[#667EEA] hover:bg-[#667EEA]/10",
      outline: "border border-[#667EEA]/50 text-[#667EEA] hover:bg-[#667EEA]/10 backdrop-blur-sm",
      ghost: "hover:bg-white/40 text-slate-600 backdrop-blur-sm",
      danger: "bg-red-500/90 backdrop-blur-md text-white hover:bg-red-600 shadow-md",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs font-medium rounded-lg",
      md: "px-4 py-2 text-sm font-medium rounded-lg",
      lg: "px-6 py-3 text-base font-semibold rounded-xl",
      icon: "p-2 rounded-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#667EEA]/50 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

// --- Inputs ---
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full glass-input rounded-xl px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#667EEA]/30 focus:border-[#667EEA]/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-inner",
        className
      )}
      {...props}
    />
  )
);

export const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={cn("text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block", className)}>
    {children}
  </label>
);

// --- Badge ---
export const Badge = ({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "neutral" | "primary";
  className?: string;
}) => {
  const styles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    error: "bg-red-50 text-red-700 border-red-100",
    info: "bg-blue-50 text-blue-700 border-blue-100",
    neutral: "bg-slate-50 text-slate-600 border-slate-200",
    primary: "bg-[#667EEA]/10 text-[#667EEA] border-[#667EEA]/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

// --- Table ---
export const Table = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className="w-full overflow-hidden rounded-2xl glass-card">
    <table className={cn("w-full caption-bottom text-sm", className)}>{children}</table>
  </div>
);

export const THead = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-white/30 backdrop-blur-md border-b border-white/40">{children}</thead>
);

export const TBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-slate-100">{children}</tbody>
);

export const TR = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <tr className={cn("transition-colors hover:bg-white/40 group", className)}>{children}</tr>
);

export const TH = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <th className={cn("h-12 px-4 text-left align-middle font-semibold text-slate-600", className)}>{children}</th>
);

export const TD = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={cn("p-4 align-middle text-slate-600", className)}>{children}</td>
);

// --- Card ---
export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("glass-card rounded-2xl overflow-hidden transition-all hover:shadow-lg", className)}>
    {children}
  </div>
);

// --- Tabs ---
export const Tabs = ({
  tabs,
  activeTab,
  onChange,
  className,
}: {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
}) => (
  <div className={cn("flex border-b border-slate-200 mb-6 gap-8", className)}>
    {tabs.map((tab: string) => (
      <button
        key={tab}
        onClick={() => onChange(tab)}
        className={cn(
          "pb-3 text-sm font-medium transition-all relative",
          activeTab === tab ? "text-[#667EEA]" : "text-slate-500 hover:text-slate-700"
        )}
      >
        {tab}
        {activeTab === tab && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#667EEA] rounded-full" />
        )}
      </button>
    ))}
  </div>
);

// --- Prescription Grid ---
export const PrescriptionGrid = () => (
  <div className="border border-slate-200 rounded-xl overflow-hidden">
    <table className="w-full text-sm text-center">
      <thead className="bg-slate-50 border-b border-slate-200">
        <tr>
          <th className="p-2 border-r border-slate-200">Eye</th>
          <th className="p-2 border-r border-slate-200">Sph</th>
          <th className="p-2 border-r border-slate-200">Cyl</th>
          <th className="p-2 border-r border-slate-200">Axis</th>
          <th className="p-2 border-r border-slate-200">Add</th>
          <th className="p-2">PD</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-slate-100">
          <td className="p-2 border-r border-slate-200 font-bold bg-slate-50/50">OD (Right)</td>
          <td className="p-2 border-r border-slate-200"><input className="w-full text-center outline-none bg-transparent" placeholder="0.00" /></td>
          <td className="p-2 border-r border-slate-200"><input className="w-full text-center outline-none bg-transparent" placeholder="0.00" /></td>
          <td className="p-2 border-r border-slate-200"><input className="w-full text-center outline-none bg-transparent" placeholder="0" /></td>
          <td className="p-2 border-r border-slate-200"><input className="w-full text-center outline-none bg-transparent" placeholder="0.00" /></td>
          <td className="p-2 row-span-2"><input className="w-full text-center outline-none bg-transparent" placeholder="0" /></td>
        </tr>
        <tr>
          <td className="p-2 border-r border-slate-200 font-bold bg-slate-50/50">OS (Left)</td>
          <td className="p-2 border-r border-slate-200"><input className="w-full text-center outline-none bg-transparent" placeholder="0.00" /></td>
          <td className="p-2 border-r border-slate-200"><input className="w-full text-center outline-none bg-transparent" placeholder="0.00" /></td>
          <td className="p-2 border-r border-slate-200"><input className="w-full text-center outline-none bg-transparent" placeholder="0" /></td>
          <td className="p-2 border-r border-slate-200"><input className="w-full text-center outline-none bg-transparent" placeholder="0.00" /></td>
        </tr>
      </tbody>
    </table>
  </div>
);

// --- Receipt Layout ---
export const Receipt = ({ data }: { data: any }) => (
  <div className="max-w-md mx-auto bg-white p-8 border border-slate-200 shadow-xl rounded-2xl font-mono text-sm">
    <div className="text-center mb-6">
      <div className="w-12 h-12 bg-gradient-to-br from-[#667EEA] to-[#764BA2] rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl">K</div>
      <h2 className="font-bold text-lg">KIRTI EYE CARE</h2>
      <p className="text-xs text-slate-500">123 Health Ave, Vision City</p>
      <p className="text-xs text-slate-500">Tel: +1 234 567 8900</p>
    </div>

    <div className="border-t border-b border-dashed border-slate-200 py-4 my-4 space-y-1">
      <div className="flex justify-between"><span>Receipt ID:</span> <span>{data.id}</span></div>
      <div className="flex justify-between"><span>Date:</span> <span>{data.date}</span></div>
      <div className="flex justify-between"><span>Patient:</span> <span>{data.patient}</span></div>
    </div>

    <div className="space-y-2 mb-6">
      {data.items?.map((item: any, i: number) => (
        <div key={i} className="flex justify-between">
          <span>{item.desc} x{item.qty}</span>
          <span>₹{item.total.toFixed(2)}</span>
        </div>
      ))}
    </div>

    <div className="border-t border-slate-200 pt-4 space-y-2 font-bold">
      <div className="flex justify-between"><span>Subtotal:</span> <span>₹{data.total.toFixed(2)}</span></div>
      <div className="flex justify-between text-lg text-[#667EEA]"><span>Total Paid:</span> <span>₹{data.total.toFixed(2)}</span></div>
    </div>

    <div className="mt-8 text-center">
      <div className="w-24 h-24 bg-slate-100 mx-auto mb-4 flex items-center justify-center text-slate-400">QR CODE</div>
      <p className="text-[10px] text-slate-400">Thank you for choosing Kirti Eye Care!</p>
    </div>
  </div>
);

// --- Avatar ---
export const Avatar = ({ src, fallback, size = "md", className }: { src?: string; fallback: string; size?: "sm" | "md" | "lg"; className?: string }) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
  };
  return (
    <div
      className={cn(
        "rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#667EEA] border border-slate-200 overflow-hidden shrink-0 transition-all",
        sizes[size],
        className
      )}
    >
      {src ? <img src={src} alt={fallback} className="w-full h-full object-cover" /> : fallback}
    </div>
  );
};
