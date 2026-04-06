"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useQuotes } from "@/hooks/useCotizaciones";
import { Loader2, CheckCircle, Send, Trophy, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

export default function FootballRequestPage() {
    const t = useTranslations('FootballRequest');
    const { createQuote } = useQuotes();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "", 
        email: "", 
        telefono: "", 
        detalles: "",
        personas: "1-2", 
        experiencia_title: "Pasión Futbolera: VIP", 
        experiencia_slug: "pasion-futbolera"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newQuote = await createQuote(formData as any);
            await fetch("/api/cotizacion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, id: newQuote.id }),
            });
            setSubmitted(true);
        } catch (err) {
            alert(t('form.error_alert'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <section className="relative mt-10 bg-cover bg-center min-h-screen flex items-center"
                style={{ backgroundImage: "url('https://grupopineda.eu/wp-content/uploads/2022/03/shutterstock_1912601503.jpg')" }}>
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                <div className="relative z-10 container mx-auto px-6 py-20 max-w-4xl">
                    <div className="text-center mb-12">
                        <Trophy size={48} className="text-[#03A9F4] mx-auto mb-6" />
                        <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
                            {t('hero.title_part1')} <span className="text-[#03A9F4]">{t('hero.title_part2')}</span>
                        </h1>
                    </div>

                    <div className="bg-white/5 backdrop-blur-2xl my-8 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl group transition-all hover:border-[#03A9F4]/30">
                        <div className="grid md:grid-cols-5 items-center">
                            {/* IMAGEN IZQUIERDA */}
                            <div className="md:col-span-2 h-64 md:h-full relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80"
                                    alt="Estadio Experiencia"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-[#0d0d0d] md:to-transparent" />
                                <div className="absolute inset-0 bg-[#03A9F4]/10 mix-blend-overlay" />
                            </div>

                            {/* CONTENIDO DERECHA */}
                            <div className="md:col-span-3 p-8 md:p-14 space-y-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-[1px] w-8 bg-[#03A9F4]" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#03A9F4]">
                                            {t('card.overline')}
                                        </span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
                                        {t('card.title_part1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{t('card.title_part2')}</span>
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-sm md:text-base text-white/80 font-light leading-relaxed border-l-2 border-[#03A9F4]/30 pl-6">
                                        {t.rich('card.description', {
                                            bold: (chunks) => <span className="text-white font-bold italic">{chunks}</span>,
                                            br: () => <br/>
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">{t('form.labels.name')}</label>
                                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#03A9F4]"
                                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">{t('form.labels.email')}</label>
                                        <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#03A9F4]"
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">{t('form.labels.details')}</label>
                                    <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#03A9F4]"
                                        onChange={(e) => setFormData({ ...formData, detalles: e.target.value })} />
                                </div>
                                <button disabled={loading} className="w-full bg-[#03A9F4] text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl">
                                    {loading ? <Loader2 className="animate-spin" /> : <><Send size={16} /> {t('form.submit_button')}</>}
                                </button>

                                <div className="mt-8 text-center border-t border-white/5 pt-6">
                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-3">
                                        {t('form.footer.question')}
                                    </p>
                                    <Link href={"/pasion-futbolera-experiencia-total"}>
                                        <button className="text-[#03A9F4] text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto">
                                            {t('form.footer.link')} <ArrowRight size={12} />
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center py-20 space-y-6 animate-in zoom-in">
                                <CheckCircle className="w-24 h-24 text-[#03A9F4] mx-auto" />
                                <h4 className="text-4xl font-black italic uppercase tracking-tighter text-white">{t('success.title')}</h4>
                                <p className="text-white/50 text-sm max-w-sm mx-auto">{t('success.description')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}