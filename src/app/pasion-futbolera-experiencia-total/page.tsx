"use client";
import { Suspense, useState, useCallback, useEffect } from "react";
import { useQuotes } from "@/hooks/useCotizaciones";
import { useCart } from "@/context/cartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, Search, CreditCard, ShieldCheck, Info } from "lucide-react";

function PayFootballContent() {
    const searchParams = useSearchParams();
    const queryFolio = searchParams.get('folio');
    const { getQuoteByFolio } = useQuotes();
    const { addToCart } = useCart();
    const router = useRouter();

    const [folio, setFolio] = useState("");
    const [montoManual, setMontoManual] = useState<string>("");
    const [quoteFound, setQuoteFound] = useState<any>(null);
    const [searching, setSearching] = useState(false);
    const [msg, setMsg] = useState("");

    const validateFolio = useCallback(async (f: string) => {
        if (!f || f.length < 3) return;
        setSearching(true);
        setMsg("");
        try {
            const data = await getQuoteByFolio(f.trim().toUpperCase());
            if (data) {
                setQuoteFound(data);
                setMontoManual(data.price?.toString() || "");
                setMsg("COTIZACIÓN LOCALIZADA");
            } else {
                setQuoteFound(null);
                setMsg("FOLIO EXTERNO DETECTADO");
            }
        } finally {
            setSearching(false);
        }
    }, [getQuoteByFolio]);

    useEffect(() => {
        if (queryFolio) {
            setFolio(queryFolio.toUpperCase());
            validateFolio(queryFolio.toUpperCase());
        }
    }, [queryFolio, validateFolio]);

    const handlePay = () => {
        if (!folio || !montoManual) return;
        addToCart({
            experienceId: quoteFound?.folio || folio.toUpperCase(),
            title: quoteFound?.experiencia_title || `EXP. TOTAL: ${folio.toUpperCase()}`,
            destinationName: "Pasión Futbolera VIP",
            price: Number(montoManual),
            personas: parseInt(quoteFound?.personas) || 1,
            fecha: new Date().toISOString().split('T')[0],
            description: quoteFound ? `Titular: ${quoteFound.nombre}` : "Folio Manual"
        });
        router.push("/cart");
    };

    return (
        <div className="container mx-auto px-6 max-w-5xl py-20">
            <div className="bg-zinc-900 border border-white/10 rounded-[3rem] overflow-hidden grid md:grid-cols-2 shadow-2xl">
                {/* LADO INFO */}
                <div className="p-12 bg-gradient-to-br from-[#03A9F4] to-blue-900 text-white flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Experiencia <br /> Total</h2>
                        <div className="h-1 w-12 bg-white mb-8" />
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl backdrop-blur-md">
                            <ShieldCheck className="text-white" />
                            <p className="text-[10px] font-bold uppercase tracking-widest">Transacción Cifrada 256-bit</p>
                        </div>
                    </div>
                </div>

                {/* LADO FORMULARIO - SIEMPRE VISIBLE */}
                <div className="p-10 md:p-14 bg-black/40 backdrop-blur-xl space-y-10">
                    <div className="space-y-8">
                        {/* FOLIO */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#03A9F4] uppercase tracking-[0.3em]">Folio de Seguimiento</label>
                            <div className="flex items-center border-b-2 border-white/10 focus-within:border-[#03A9F4] transition-all">
                                <input type="text" value={folio} placeholder="PSN-XXXX" className="w-full bg-transparent py-4 text-2xl font-mono text-white outline-none uppercase tracking-widest"
                                    onChange={(e) => setFolio(e.target.value)} onBlur={() => validateFolio(folio)} />
                                {searching ? <Loader2 className="animate-spin text-[#03A9F4]" /> : <Search className="text-white/20" />}
                            </div>
                            {msg && <p className="text-[9px] font-black uppercase text-[#03A9F4] tracking-widest">{msg}</p>}
                        </div>

                        {/* DATOS DINÁMICOS */}
                        {quoteFound && (
                            <div className="bg-white/5 p-6 rounded-2xl border-l-4 border-[#03A9F4] animate-in fade-in slide-in-from-left-4">
                                <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Titular</p>
                                <p className="text-xl font-bold text-white uppercase italic">{quoteFound.nombre}</p>
                            </div>
                        )}

                        {/* MONTO SIEMPRE VISIBLE */}
                        <div className="space-y-2 pt-4">
                            <label className="text-[10px] font-black text-[#03A9F4] uppercase tracking-[0.3em]">Monto Total Acordado (MXN)</label>
                            <div className="flex items-baseline gap-2 border-b-2 border-white/10 focus-within:border-white transition-all">
                                <span className="text-2xl font-light text-white/20">$</span>
                                <input type="number" value={montoManual} placeholder="0.00" className="w-full bg-transparent py-4 text-5xl font-black text-white outline-none tracking-tighter"
                                    onChange={(e) => setMontoManual(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <button onClick={handlePay} disabled={!folio || !montoManual} className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-[#03A9F4] hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-20">
                        <CreditCard size={18} /> Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function PayFootballPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-black pt-20">
                <Suspense fallback={<div className="py-40 text-center text-white font-black uppercase tracking-widest">Iniciando Checkout...</div>}>
                    <PayFootballContent />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}