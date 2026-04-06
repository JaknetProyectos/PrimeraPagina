"use client";
import { useCart } from "@/context/cartContext";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingBag, ArrowLeft, Ticket, Compass } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Loader2 } from "lucide-react";
import { useTranslations } from 'next-intl';

// Componente para el Estado Vacío
export function EmptyCart() {
    const t = useTranslations('Cart');

    return (
        <>
            <Header />
            <div className="flex mt-20 flex-col items-center justify-center py-20 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Icono con Círculo de Fondo */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-[#03A9F4]/10 rounded-full blur-2xl animate-pulse" />
                    <div className="relative bg-white border-2 border-gray-100 p-10 rounded-full shadow-xl">
                        <ShoppingBag size={60} className="text-gray-200" strokeWidth={1} />
                        <div className="absolute -top-2 -right-2 bg-[#FF9800] p-3 rounded-full shadow-lg">
                            <Compass size={20} className="text-white animate-spin-slow" />
                        </div>
                    </div>
                </div>

                {/* Textos Editorial */}
                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[#212121] mb-4 text-center">
                    {t('empty_title_part1')} <span className="text-[#03A9F4]">{t('empty_title_part2')}</span>
                </h2>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] max-w-xs text-center leading-loose mb-12">
                    {t('empty_description')}
                </p>

                {/* Acciones Rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                    <Link href="/experiencias"
                        className="flex items-center justify-center gap-3 bg-[#212121] text-white py-5 rounded-sm font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#03A9F4] transition-all shadow-lg active:scale-95">
                        {t('explore_destinations')}
                    </Link>
                    <Link href="/pasion"
                        className="flex items-center justify-center gap-3 border-2 border-gray-200 text-[#212121] py-5 rounded-sm font-black uppercase text-[10px] tracking-[0.2em] hover:border-[#03A9F4] transition-all active:scale-95">
                        {t('football_passion')}
                    </Link>
                </div>

                {/* Footer de Carrito Vacío */}
                <Link href="/" className="mt-10 flex items-center gap-2 text-[9px] font-black text-gray-300 uppercase tracking-widest hover:text-[#FF9800] transition-colors">
                    <ArrowLeft size={14} /> {t('back_home')}
                </Link>
            </div>
            <Footer />
        </>
    );
}