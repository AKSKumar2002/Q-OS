import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: ReactNode;
  color: string;
  modules: string[];
}

export function AppModal({ isOpen, onClose, title, icon, color, modules }: AppModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              {/* Header */}
              <div 
                className="p-6 text-white relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}dd)`
                }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                    >
                      {icon}
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{title}</h2>
                      <p className="text-white/80 text-sm">Available Modules</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modules Grid */}
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {modules.map((module, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer group transition-all duration-200 bg-gradient-to-br from-gray-50 to-white hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-2 h-2 rounded-full group-hover:scale-150 transition-transform duration-200"
                          style={{ backgroundColor: color }}
                        />
                        <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                          {module}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold transition-all duration-200 hover:shadow-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
