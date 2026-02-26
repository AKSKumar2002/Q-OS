import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, Eye, EyeOff, Lock, User, ShieldCheck, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import bgImage from '@/images/Bg image.jpeg';
import logoImage from '@/images/Alphery Trans BG.png';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const GS_API_URL = import.meta.env.VITE_GS_API_URL || '';

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Set to true to bypass the network call and use local dev credentials only.
  // Useful when Google Apps Script is unreachable (e.g. blocked network/firewall).
  const USE_LOCAL_FALLBACK = import.meta.env.VITE_USE_LOCAL_FALLBACK === 'true';

  const loginWithLocalCredentials = () => {
    // Only Kirti Eye Care has local fallback for now
    if (username === 'KEC000001' && password === 'AU25@erp') {
      const mockUser = {
        username: 'KEC000001',
        name: 'Administrator',
        role: 'Super Admin',
        level: 'L0',
        company: 'Kirti Eye Care',
        allowedApps: ['crm', 'hospital', 'optical', 'inventory', 'hr', 'finance', 'franchise', 'ecommerce', 'franchise-mgr', 'analytics', 'communication', 'system-control', 'helpdesk', 'projects', 'role-utility']
      };
      localStorage.setItem('alphery_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Local mode: skip network call entirely
      if (USE_LOCAL_FALLBACK || !GS_API_URL) {
        if (loginWithLocalCredentials()) {
          setTimeout(() => navigate('/workspace', { replace: true }), 800);
        } else {
          setError('Invalid username or password');
        }
        return;
      }

      const params = new URLSearchParams();
      params.append('action', 'globalLogin');
      params.append('username', username);
      params.append('password', password);

      let data: any;
      try {
        const response = await fetch(GS_API_URL, {
          method: 'POST',
          body: params,
          redirect: 'follow', // Critically important for Google's redirects
        });
        data = await response.json();
      } catch (networkErr: any) {
        console.warn('[Login] Network request to GS API failed, trying local fallback:', networkErr?.message);
        if (loginWithLocalCredentials()) {
          setTimeout(() => navigate('/workspace', { replace: true }), 800);
        } else {
          setError('Authentication server unreachable. Check your network connection.');
        }
        return;
      }

      if (data.success) {
        // The backend now returns the user along with their 'company' (sheetName)
        localStorage.setItem('alphery_user', JSON.stringify(data.user));
        setTimeout(() => navigate('/workspace', { replace: true }), 800);
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err: any) {
      setError(err.message || 'Connection to authentication server failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Video Blending with Background */}
          <div className="relative w-[500px] flex items-center justify-center">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full mix-blend-screen"
            >
              <source src="/Loader1.mp4" type="video/mp4" />
            </video>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <h1 className="text-3xl font-black tracking-[0.1em] mb-8">Alphery Space</h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.5em] ml-1 opacity-70">Enterprise Cloud Platform</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Odoo Style Login Card - Auto Scale Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[380px] relative z-10 scale-[0.95] md:scale-100 transition-transform duration-300"
      >
        <div className="bg-white/70 backdrop-blur-2xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden border border-white/30 backdrop-contrast-125 ring-1 ring-white/40">
          {/* Top Bar Accent */}
          <div className="h-1.5 bg-gradient-to-r from-[#7C1CE2] to-[#4B19C3]" />

          <div className="p-9">
            {/* Logo area */}
            <div className="text-center mb-7">
              <div className="inline-flex items-center justify-center w-18 h-18 mb-3.5 select-none">
                <img src={logoImage} alt="Alphery Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl font-black text-gray-800 tracking-tight">Alphery Space</h1>
              <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mt-1.5">Enterprise Grade Platform</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5 ml-1">
                  User / Tenant ID
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7C1CE2] transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your id here"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#7C1CE2] focus:ring-4 focus:ring-[#7C1CE2]/10 focus:outline-none transition-all bg-white/80 text-gray-900 text-sm font-medium placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7C1CE2] transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password here"
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-200 focus:border-[#7C1CE2] focus:ring-4 focus:ring-[#7C1CE2]/10 focus:outline-none transition-all bg-white/80 text-gray-900 text-sm font-medium placeholder:text-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-md hover:bg-gray-100"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-bold border border-red-100 flex items-center gap-2 shadow-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7C1CE2] to-[#4B19C3] hover:from-[#6A15C5] hover:to-[#3F14A5] text-white font-bold text-xs md:text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all disabled:opacity-70 flex items-center justify-center gap-2 transform active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span className="opacity-90">Authenticating...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-7 pt-5 border-t border-gray-100/50 flex items-center justify-between text-xs font-bold text-gray-500">
              <button className="hover:text-[#7C1CE2] transition-colors hover:underline decoration-[#7C1CE2] underline-offset-4">Reset Password?</button>
              <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/50 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" /> Secure
              </div>
            </div>
          </div>
        </div>

        {/* Footer info - Compact */}
        <div className="mt-8 md:mt-10 text-center pb-2">
          <p className="text-white text-[11px] font-bold tracking-[0.2em] uppercase mb-4 opacity-80">Powered by Alphery</p>
        </div>
      </motion.div>
    </div>
  );
}
