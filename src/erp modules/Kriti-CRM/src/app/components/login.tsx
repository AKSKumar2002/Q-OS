import * as React from "react";
import { Button, Input, Label, Card } from "./ui";
import { motion } from "motion/react";
import { LogIn, User, Lock, Eye, EyeOff } from "lucide-react";

interface LoginProps {
    onLogin: (username: string) => void;
}

export function Login({ onLogin }: LoginProps) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (username === "KEC000001" && password === "AU25@erp") {
                onLogin(username);
            } else {
                setError("Invalid username or password");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#667EEA]/20 via-white to-[#764BA2]/20 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#667EEA]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#764BA2]/10 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[400px] z-10"
            >
                <Card className="glass-panel p-8 border-white/40 shadow-2xl backdrop-blur-xl bg-white/40">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#667EEA] to-[#764BA2] flex items-center justify-center shadow-xl mb-4 group transition-transform hover:scale-110">
                            <span className="text-white font-black text-3xl">K</span>
                        </div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight text-center">Kriti Eye Care</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">Sign in to your CRM dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Username</Label>
                            <div className="relative group">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#667EEA] transition-colors" />
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="pl-12 bg-white/50 border-white/20 h-12 rounded-xl focus:ring-[#667EEA]/20 transition-all shadow-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</Label>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#667EEA] transition-colors" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-12 pr-12 bg-white/50 border-white/20 h-12 rounded-xl focus:ring-[#667EEA]/20 transition-all shadow-sm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="text-xs font-bold text-red-500 text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 rounded-xl bg-gradient-to-r from-[#667EEA] to-[#764BA2] hover:from-[#5A67D8] hover:to-[#6B46C1] text-white font-bold shadow-lg shadow-[#667EEA]/20 transition-all active:scale-[0.98] disabled:opacity-70 gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <LogIn size={18} />
                                    <span>Sign In</span>
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                        <p className="text-xs text-slate-400 font-medium">
                            Alphery Secure Engine 1.4
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
