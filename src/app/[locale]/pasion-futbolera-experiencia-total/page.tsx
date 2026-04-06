"use client";
import { Suspense, useState, useCallback, useEffect } from "react";
import { useQuotes } from "@/hooks/useCotizaciones";
import { useCart } from "@/context/cartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, Search, CreditCard, Trophy } from "lucide-react";
import { useTranslations } from 'next-intl';

function PayFootballContent() {
    const t = useTranslations('PayFootball');
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
                setMsg(t('form.messages.found'));
            } else {
                setQuoteFound(null);
                setMsg(t('form.messages.external'));
            }
        } finally {
            setSearching(false);
        }
    }, [getQuoteByFolio, t]);

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
            title: quoteFound?.experiencia_title || `${t('cart.title_prefix')}: ${folio.toUpperCase()}`,
            destinationName: "Pasión Futbolera VIP",
            price: Number(montoManual),
            personas: parseInt(quoteFound?.personas) || 1,
            fecha: new Date().toISOString().split('T')[0],
            description: quoteFound ? `${t('cart.passenger')}: ${quoteFound.nombre}` : t('cart.manual_folio')
        });
        router.push("/cart");
    };

    return (
        <div className="container mx-auto px-6 max-w-5xl py-20">
            <div className="bg-zinc-900 border border-white/10 rounded-[3rem] overflow-hidden grid md:grid-cols-2 shadow-2xl">
                {/* LADO INFO */}
                <div className="p-12 bg-gradient-to-br from-[#03A9F4] to-blue-900 text-white flex flex-col justify-center">
                    <div>
                        <div className="text-xl my-3 uppercase tracking-wider">
                            {t('branding.overline')}
                        </div>
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
                            {t('branding.title_part1')} <br /> {t('branding.title_part2')}
                        </h2>
                        <div className="h-1 w-12 bg-white mt-3 mb-8" />
                    </div>

                    <div className="space-y-6">
                        <p className="text-white/90 leading-relaxed font-light">
                            {t('branding.description')}
                        </p>
                    </div>
                </div>

                {/* LADO FORMULARIO */}
                <div className="p-10 md:p-14 bg-black/40 backdrop-blur-xl space-y-10">
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#03A9F4] uppercase tracking-[0.3em]">{t('form.labels.folio')}</label>
                            <div className="flex items-center border-b-2 border-white/10 focus-within:border-[#03A9F4] transition-all">
                                <input type="text" value={folio} placeholder="COTIZACION-XXXX" className="w-full bg-transparent py-4 text-2xl font-mono text-white outline-none uppercase tracking-widest placeholder:text-white/10"
                                    onChange={(e) => setFolio(e.target.value)} onBlur={() => validateFolio(folio)} />
                                {searching ? <Loader2 className="animate-spin text-[#03A9F4]" /> : <Search className="text-white/20" />}
                            </div>
                            {msg && <p className="text-[9px] font-black uppercase text-[#03A9F4] tracking-widest animate-pulse">{msg}</p>}
                        </div>

                        {quoteFound && (
                            <div className="bg-white/5 p-6 rounded-2xl border-l-4 border-[#03A9F4] animate-in fade-in slide-in-from-left-4">
                                <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">{t('form.labels.passenger')}</p>
                                <p className="text-xl font-bold text-white uppercase italic">{quoteFound.nombre}</p>
                            </div>
                        )}

                        <div className="space-y-2 pt-4">
                            <label className="text-[10px] font-black text-[#03A9F4] uppercase tracking-[0.3em]">{t('form.labels.amount')}</label>
                            <div className="flex items-baseline gap-2 border-b-2 border-white/10 focus-within:border-white transition-all">
                                <span className="text-2xl font-light text-white/20">$</span>
                                <input type="number" value={montoManual} placeholder="0.00" className="w-full bg-transparent py-4 text-5xl font-black text-white outline-none tracking-tighter"
                                    onChange={(e) => setMontoManual(e.target.value)} />
                                <span className="text-sm font-black text-white/40">MXN</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={handlePay} disabled={!folio || !montoManual} className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-[#03A9F4] hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-20 active:scale-95 shadow-xl">
                        <CreditCard size={18} /> {t('form.submit_button')}
                    </button>
                </div>
            </div>

            {/* SECCIÓN EDITORIAL */}
            <section className="container mx-auto px-6 py-24 border-t border-white/5">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    <div className="w-full md:w-2/5 relative group">
                        <div className="absolute -inset-4 bg-[#03A9F4]/10 rounded-[3rem] blur-2xl group-hover:bg-[#03A9F4]/20 transition-all duration-700" />
                        <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1551952237-954a0e68786c?auto=format&fit=crop&q=80"
                                alt="Stadium Atmosphere"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-[#03A9F4] p-6 rounded-3xl shadow-xl hidden md:block">
                            <Trophy size={32} className="text-white" />
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 space-y-8">
                        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-[0.9]">
                            {t('editorial.title')}
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p className="text-lg md:text-xl font-light italic">
                                {t.rich('editorial.subtitle', {
                                    white: (chunks) => <span className="text-white font-bold">{chunks}</span>
                                })}
                            </p>
                            <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
                            <p className="text-sm uppercase tracking-wider font-medium leading-loose">
                                {t('editorial.description')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function PayFootballPage() {
    const t = useTranslations('PayFootball');
    return (
        <>
            <Header />
            <main className="min-h-screen bg-black pt-20">
                <Suspense fallback={<div className="py-40 text-center text-white font-black uppercase tracking-widest">{t('loading')}</div>}>
                    <PayFootballContent />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}