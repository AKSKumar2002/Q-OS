import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { SALES_DB, SALES_BRAND } from "../sales-types";
import { Badge } from "./ui";
import {
    Search, Plus, Minus, Trash2, CreditCard, Banknote, Smartphone,
    X, CheckCircle2, Printer, RefreshCcw, ShoppingCart, Percent, User
} from "lucide-react";

interface POSItem {
    id: string;
    name: string;
    price: number;
    tax: number;
    qty: number;
}

export function SalesPOS({ onClose }: { onClose?: () => void }) {
    const [cart, setCart] = React.useState<POSItem[]>([]);
    const [search, setSearch] = React.useState("");
    const [discount, setDiscount] = React.useState(0);
    const [paymentMode, setPaymentMode] = React.useState<"Cash" | "UPI" | "Card">("Cash");
    const [customerName, setCustomerName] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    const filtered = SALES_DB.posProducts.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
    );

    const addToCart = (product: any) => {
        setCart(prev => {
            const exist = prev.find(i => i.id === product.id);
            if (exist) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const updateQty = (id: string, delta: number) => {
        setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
    };

    const removeItem = (id: string) => setCart(prev => prev.filter(i => i.id !== id));

    const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const taxAmt = cart.reduce((acc, i) => acc + (i.price * i.qty * i.tax / 100), 0);
    const discountAmt = Math.round(subtotal * discount / 100);
    const total = subtotal + taxAmt - discountAmt;

    const handleCheckout = () => {
        setSuccess(true);
        setTimeout(() => { setSuccess(false); setCart([]); setDiscount(0); setCustomerName(""); }, 3000);
    };

    return (
        <div className="fixed inset-0 z-50 flex" style={{ background: "#0F172A" }}>
            {/* Left — Product Grid */}
            <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
                {/* POS Header */}
                <div className="flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: SALES_BRAND }}>
                            <ShoppingCart size={18} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-white font-black text-lg tracking-tight">Point of Sale</h1>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Alphery Sales POS • Optical Counter</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 py-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-emerald-400 text-[10px] font-black uppercase">Live</span>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors">
                            <X size={18} className="text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="relative shrink-0">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-slate-800 text-white rounded-xl pl-10 pr-4 py-3 text-sm font-bold placeholder-slate-500 focus:outline-none focus:ring-2 border-0"
                        style={{ "--tw-ring-color": SALES_BRAND } as any}
                        placeholder="Search products by name or SKU..."
                        autoFocus
                    />
                </div>

                {/* Quick Categories */}
                <div className="flex gap-2 shrink-0 overflow-x-auto pb-1">
                    {["All", "Lenses", "Frames", "Services", "Packages"].map(cat => (
                        <button
                            key={cat}
                            className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all"
                            style={cat === "All" ? { background: SALES_BRAND, color: "#fff" } : { background: "#1E293B", color: "#94A3B8" }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 overflow-y-auto flex-1 content-start">
                    {filtered.map(product => (
                        <motion.button
                            key={product.id}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => addToCart(product)}
                            className="bg-slate-800 rounded-2xl p-4 text-left hover:bg-slate-700 transition-colors border border-slate-700/50 hover:border-purple-500/30 relative group"
                        >
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: SALES_BRAND }}>
                                    <Plus size={12} className="text-white" />
                                </div>
                            </div>
                            <div className="text-[8px] font-black text-slate-500 uppercase mb-2 font-mono">{product.sku}</div>
                            <p className="text-white font-bold text-sm leading-tight mb-3">{product.name}</p>
                            <div className="flex items-end justify-between">
                                <span className="text-xl font-black text-white">₹{product.price.toLocaleString()}</span>
                                {product.tax > 0
                                    ? <span className="text-[8px] font-black text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">+{product.tax}% GST</span>
                                    : <span className="text-[8px] font-black text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">Tax Free</span>
                                }
                            </div>
                        </motion.button>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-4 text-center py-12 text-slate-500 font-bold">No products found</div>
                    )}
                </div>
            </div>

            {/* Right — Cart & Checkout */}
            <div className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col">
                {/* Customer */}
                <div className="p-4 border-b border-slate-800 shrink-0">
                    <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 py-2.5">
                        <User size={14} className="text-slate-500 shrink-0" />
                        <input
                            value={customerName}
                            onChange={e => setCustomerName(e.target.value)}
                            className="bg-transparent text-white text-sm font-bold placeholder-slate-500 focus:outline-none flex-1"
                            placeholder="Customer name (optional)"
                        />
                    </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    <AnimatePresence>
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center gap-3 opacity-30 py-12">
                                <ShoppingCart size={48} className="text-slate-600" />
                                <p className="text-slate-500 font-black text-sm uppercase tracking-widest">Cart is empty</p>
                                <p className="text-slate-600 text-[10px] font-bold">Click products to add</p>
                            </div>
                        ) : cart.map(item => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-slate-800 rounded-2xl p-3"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <p className="text-white text-xs font-bold leading-tight flex-1 pr-2">{item.name}</p>
                                    <button onClick={() => removeItem(item.id)} className="shrink-0 text-slate-600 hover:text-red-400 transition-colors">
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors">
                                            <Minus size={11} className="text-white" />
                                        </button>
                                        <span className="text-white font-black text-sm w-4 text-center">{item.qty}</span>
                                        <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors" style={{ background: SALES_BRAND }}>
                                            <Plus size={11} className="text-white" />
                                        </button>
                                    </div>
                                    <span className="text-white font-black">₹{(item.price * item.qty).toLocaleString()}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Totals & Discount */}
                {cart.length > 0 && (
                    <div className="p-4 border-t border-slate-800 space-y-4 shrink-0">
                        {/* Discount */}
                        <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 py-2">
                            <Percent size={14} className="text-amber-400 shrink-0" />
                            <span className="text-slate-400 text-xs font-bold flex-1">Discount %</span>
                            <div className="flex items-center gap-2">
                                {[0, 5, 10, 15].map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setDiscount(d)}
                                        className="text-[10px] font-black px-2 py-1 rounded-lg transition-all"
                                        style={discount === d ? { background: SALES_BRAND, color: "#fff" } : { background: "#334155", color: "#94A3B8" }}
                                    >
                                        {d}%
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Amounts */}
                        <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between text-slate-400 font-bold">
                                <span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-amber-400 font-bold">
                                <span>GST</span><span>+₹{Math.round(taxAmt).toLocaleString()}</span>
                            </div>
                            {discountAmt > 0 && (
                                <div className="flex justify-between text-emerald-400 font-bold">
                                    <span>Discount ({discount}%)</span><span>-₹{discountAmt.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-white font-black text-xl pt-2 border-t border-slate-700">
                                <span>Total</span><span>₹{Math.round(total).toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Payment Mode */}
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { mode: "Cash" as const, icon: Banknote },
                                { mode: "UPI" as const, icon: Smartphone },
                                { mode: "Card" as const, icon: CreditCard },
                            ].map(({ mode, icon: Icon }) => (
                                <button
                                    key={mode}
                                    onClick={() => setPaymentMode(mode)}
                                    className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-[10px] font-black uppercase transition-all"
                                    style={paymentMode === mode ? { background: SALES_BRAND, color: "#fff" } : { background: "#1E293B", color: "#64748B" }}
                                >
                                    <Icon size={18} />
                                    {mode}
                                </button>
                            ))}
                        </div>

                        {/* Checkout Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleCheckout}
                            className="w-full py-4 rounded-2xl text-white font-black text-sm uppercase tracking-widest transition-all"
                            style={{ background: `linear-gradient(135deg, ${SALES_BRAND}, #9B6FD4)` }}
                        >
                            Charge ₹{Math.round(total).toLocaleString()} • {paymentMode}
                        </motion.button>
                    </div>
                )}

                {/* Success Overlay */}
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center gap-4 z-10 right-0 w-96"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center"
                            >
                                <CheckCircle2 size={48} className="text-emerald-400" />
                            </motion.div>
                            <h3 className="text-white font-black text-2xl">Payment Done!</h3>
                            <p className="text-slate-400 font-bold text-sm">₹{Math.round(total).toLocaleString()} via {paymentMode}</p>
                            <div className="flex gap-3 mt-2">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-black uppercase">
                                    <Printer size={14} /> Print Receipt
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-black uppercase">
                                    <RefreshCcw size={14} /> New Sale
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
