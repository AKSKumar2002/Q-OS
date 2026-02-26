import { ReactNode } from 'react';

interface FlowchartBoxProps {
  title: string;
  icon?: ReactNode;
  items?: string[];
  color?: string;
  size?: 'small' | 'medium' | 'large';
  delay?: number;
}

export function FlowchartBox({
  title,
  icon,
  items,
  color = '#3b82f6',
  size = 'medium',
  delay = 0
}: FlowchartBoxProps) {
  const sizeClasses = {
    small: 'min-w-[200px] max-w-[220px]',
    medium: 'min-w-[240px] max-w-[260px]',
    large: 'min-w-[280px] max-w-[320px]'
  };

  return (
    <div 
      className={`${sizeClasses[size]} relative group animate-in fade-in slide-in-from-bottom-4 duration-700`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500 animate-pulse"
        style={{ 
          background: `linear-gradient(135deg, ${color}, ${color}80)`
        }}
      />
      
      {/* Main card */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border-2 group-hover:scale-110 group-hover:-translate-y-2 transform"
        style={{ borderColor: color }}
      >
        {/* Animated gradient bar */}
        <div 
          className="h-1.5 w-full animate-pulse"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}60, ${color})`
          }}
        />

        {/* Header */}
        <div
          className="px-4 py-4 flex items-center gap-3"
        >
          {icon && (
            <div
              className="flex-shrink-0 p-2.5 rounded-xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                color: color
              }}
            >
              {icon}
            </div>
          )}
          <h4 className="font-bold text-sm leading-tight text-gray-800 group-hover:text-gray-900 transition-colors">
            {title}
          </h4>
        </div>

        {/* Items */}
        {items && items.length > 0 && (
          <div className="px-4 pb-4 space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 text-xs text-gray-600 group-hover:text-gray-800 transition-all duration-300 hover:translate-x-1"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 group-hover:scale-150 transition-transform duration-300"
                  style={{ backgroundColor: color }}
                />
                <span className="leading-tight font-medium">{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom accent */}
        <div 
          className="h-1 w-0 group-hover:w-full transition-all duration-500"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
