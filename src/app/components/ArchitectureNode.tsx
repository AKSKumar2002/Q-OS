import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState, ReactNode } from 'react';

interface ArchitectureNodeProps {
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
  items?: string[];
  color?: string;
  expandable?: boolean;
  defaultExpanded?: boolean;
  depth?: number;
}

export function ArchitectureNode({
  title,
  icon,
  children,
  items,
  color = 'bg-blue-500',
  expandable = true,
  defaultExpanded = false,
  depth = 0
}: ArchitectureNodeProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const hasContent = items && items.length > 0 || children;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Fix: Stop event bubbling
    if (hasContent && expandable) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`
          relative rounded-xl border transition-all duration-300 backdrop-blur-sm
          ${hasContent && expandable ? 'cursor-pointer hover:scale-[1.02]' : ''}
          ${isExpanded ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'}
          bg-white/80
        `}
        style={{ 
          borderColor: color,
          borderWidth: '2px',
          transform: isExpanded ? 'translateZ(20px)' : 'translateZ(0)',
        }}
        onClick={handleClick}
      >
        <div 
          className="p-4 flex items-center gap-3 rounded-t-xl"
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}05)`
          }}
        >
          {hasContent && expandable && (
            <div 
              className="flex-shrink-0 transition-transform duration-300"
              style={{ 
                transform: isExpanded ? 'rotate(0deg)' : 'rotate(0deg)'
              }}
            >
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 transition-transform" style={{ color }} />
              ) : (
                <ChevronRight className="w-5 h-5 transition-transform" style={{ color }} />
              )}
            </div>
          )}
          {icon && (
            <div 
              className="flex-shrink-0 p-2 rounded-lg shadow-md" 
              style={{ 
                backgroundColor: `${color}20`,
                color 
              }}
            >
              {icon}
            </div>
          )}
          <h3 className="font-bold text-lg bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {title}
          </h3>
        </div>

        {isExpanded && hasContent && (
          <div className="px-4 pb-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            {items && items.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="group px-4 py-3 rounded-lg text-sm flex items-center gap-3 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${color}10, ${color}05)`,
                      borderLeft: `3px solid ${color}`
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0 shadow-sm group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            )}
            {children && <div className="mt-4">{children}</div>}
          </div>
        )}
      </div>
    </div>
  );
}