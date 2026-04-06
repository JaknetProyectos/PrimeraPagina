"use client";
import { Suspense, useEffect, useState, useCallback } from "react";
import { useQuotes } from "@/hooks/useCotizaciones";
import { useCart } from "@/context/cartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, Search, ShoppingCart, ShieldCheck, Info } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from 'next-intl';

function PayQuoteContent() {
    const t = useTranslations('PayQuote');
    const searchParams = useSearchParams();
    const queryFolio = searchParams.get('folio');

    const [folio, setFolio] = useState("");
    const [montoManual, setMontoManual] = useState<string>("");
    const [quoteData, setQuoteData] = useState<any>(null);
    const [searching, setSearching] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");

    const { getQuoteByFolio } = useQuotes();
    const { addToCart } = useCart();
    const router = useRouter();

    const autoSearch = useCallback(async (f: string) => {
        if (!f || f.length < 3) return;
        setSearching(true);
        setInfoMessage("");
        try {
            const data = await getQuoteByFolio(f.trim().toUpperCase());
            if (data) {
                setQuoteData(data);
                setMontoManual(data.price?.toString() || "");
                setInfoMessage(t('form.messages.found'));
            } else {
                setQuoteData(null);
                setInfoMessage(t('form.messages.external'));
            }
        } catch (err) {
            console.error("Error en búsqueda:", err);
        } finally {
            setSearching(false);
        }
    }, [getQuoteByFolio, t]);

    useEffect(() => {
        if (queryFolio) {
            const f = queryFolio.toUpperCase();
            setFolio(f);
            autoSearch(f);
        }
    }, [queryFolio, autoSearch]);

    const handleAddToBag = () => {
        if (!folio || !montoManual) return;

        addToCart({
            experienceId: quoteData?.folio || folio.toUpperCase(),
            title: quoteData?.experiencia_title || `${t('cart.custom_prefix')}: ${folio.toUpperCase()}`,
            destinationName: "Aventura Viva Trip",
            price: Number(montoManual),
            personas: quoteData ? (parseInt(quoteData.personas) || 1) : 1,
            fecha: new Date().toISOString().split('T')[0],
            description: quoteData ? `${t('cart.client')}: ${quoteData.nombre}` : `${t('cart.folio_label')}: ${folio.toUpperCase()}`
        });

        router.push("/cart");
    };

    return (
        <div className="container mx-auto px-4 max-w-5xl animate-in fade-in duration-700">
            <div className="bg-white shadow-2xl border border-gray-200 rounded-sm overflow-hidden grid md:grid-cols-2 min-h-[650px]">

                {/* LADO IZQUIERDO: BRANDING */}
                <div className="relative hidden md:block bg-[#212121]">
                    <img
                        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                        alt="Adventure"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <div className="relative z-10 p-12 text-white h-full flex flex-col justify-center">
                        <div>
                            <div className="h-1.5 w-16 bg-[#FF9800] mb-8" />
                            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-tight">
                                {t('branding.title_part1')} <br /> <span className="text-[#03A9F4]">{t('branding.title_part2')}</span>
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-[11px] uppercase tracking-[0.2em] opacity-70 leading-relaxed font-medium">
                                {t('branding.subtitle')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* LADO DERECHO: FORMULARIO */}
                <div className="p-8 md:p-14 flex flex-col justify-center bg-white">
                    <div className="mb-10">
                        <h1 className="text-xs font-black text-[#212121] uppercase tracking-[0.4em] mb-2">{t('form.header')}</h1>
                        <div className="h-1 w-10 bg-[#03A9F4]" />
                    </div>

                    <div className="space-y-8">
                        <div className="relative group">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{t('form.labels.folio')}</label>
                            <div className="flex items-center gap-3 border-b-2 border-gray-100 group-focus-within:border-[#03A9F4] transition-all">
                                <input
                                    type="text"
                                    placeholder="WNDR-XXXXX"
                                    value={folio}
                                    onChange={(e) => setFolio(e.target.value)}
                                    onBlur={() => autoSearch(folio)}
                                    className="w-full bg-transparent py-4 outline-none text-2xl font-mono uppercase tracking-widest placeholder:text-gray-200"
                                    required
                                />
                                {searching ? <Loader2 className="animate-spin text-[#03A9F4]" /> : <Search size={20} className="text-gray-300" />}
                            </div>

                            {infoMessage && (
                                <div className={`mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter ${quoteData ? 'text-emerald-600' : 'text-orange-500'}`}>
                                    {quoteData ? <ShieldCheck size={14} /> : <Info size={14} />}
                                    {infoMessage}
                                </div>
                            )}
                        </div>

                        {quoteData && (
                            <div className="p-6 bg-blue-50/50 border-l-4 border-[#03A9F4] rounded-r-md animate-in slide-in-from-left-2 duration-300">
                                <span className="text-[9px] font-black text-[#03A9F4] uppercase tracking-widest block mb-1">{t('form.labels.passenger')}</span>
                                <p className="text-xl font-bold italic text-[#212121] uppercase tracking-tight">{quoteData.nombre}</p>
                                <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-widest">{quoteData.experiencia_title}</p>
                            </div>
                        )}

                        <div className="pt-4">
                            <label className="text-[10px] font-black text-[#212121] uppercase tracking-widest block mb-2">{t('form.labels.amount')}</label>
                            <div className="flex items-center gap-2 border-b-2 border-gray-100 focus-within:border-[#FF9800] transition-all">
                                <span className="text-2xl font-light text-gray-400">$</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full py-4 text-5xl font-black text-[#212121] outline-none bg-transparent tracking-tighter"
                                    value={montoManual}
                                    onChange={(e) => setMontoManual(e.target.value)}
                                />
                                <span className="text-sm font-black text-[#212121]">MXN</span>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToBag}
                            disabled={!folio || !montoManual || searching}
                            className="w-full bg-[#FF9800] text-white py-5 rounded-sm font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-orange-200 hover:bg-[#212121] transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-30 disabled:grayscale"
                        >
                            <ShoppingCart size={18} /> {t('form.submit_button')}
                        </button>
                    </div>
                </div>
            </div>

            {/* SECCIÓN EDITORIAL INFERIOR */}
            <section className="container mx-auto px-6 py-24 border-t border-white/5">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    <div className="w-full md:w-2/5 relative group">
                        <div className="absolute -inset-4 bg-[#03A9F4]/10 rounded-[3rem] blur-2xl group-hover:bg-[#03A9F4]/20 transition-all duration-700" />
                        <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl">
                            <img
                                src="https://www.kiwakatravel.com/wp-content/uploads/2019/03/AdobeStock_245712323-scaled-1-e1625781391389-7.jpeg"
                                alt="Adventure Atmosphere"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 space-y-8">
                        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-[0.9]">
                            {t('editorial.title')}
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p className="text-lg md:text-xl font-light">
                                {t('editorial.subtitle')}
                            </p>
                            <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
                            <p className="text-sm tracking-wider font-medium leading-loose">
                                {t('editorial.description')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function PayQuotePage() {
    const t = useTranslations('PayQuote');
    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#000000FF] pt-32 pb-20 overflow-hidden">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="animate-spin text-white mb-4" size={40} />
                        <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">{t('loading')}</span>
                    </div>
                }>
                    <PayQuoteContent />
                </Suspense>
            </div>
            <Footer />
        </>
    );
}