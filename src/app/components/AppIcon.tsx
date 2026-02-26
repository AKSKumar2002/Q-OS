import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface AppIconProps {
  title: string;
  icon: ReactNode;
  color: string;
  onClick: () => void;
  delay?: number;
}

export function AppIcon({ title, icon, color, onClick, delay = 0 }: AppIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-3 p-4 rounded-2xl cursor-pointer group hover:bg-white/50 transition-all duration-300"
    >
      {/* Icon Container */}
      <div className="relative">
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
          style={{ backgroundColor: color }}
        />

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          className="relative w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center text-white group-hover:shadow-2xl transition-shadow duration-300"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}dd)`
          }}
        >
          {icon}
        </motion.div>
      </div>

      {/* Title */}
      <p className="text-sm font-semibold text-white/90 text-center leading-tight max-w-[100px] drop-shadow-md group-hover:text-white transition-colors">
        {title}
      </p>
    </motion.div>
  );
}
