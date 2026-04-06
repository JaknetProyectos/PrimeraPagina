"use client";

import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useExperiences } from "@/hooks/useExperiences";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import Loading from "@/components/Loading";
import Image from "next/image";
import { getOptimizedUrl } from "@/lib/images";
import { useTranslations } from 'next-intl';

export default function ExperiencesPage() {
    const t = useTranslations('Experiences');
    const params = useParams();
    const [page, setPage] = useState(1);

    const {
        data,
        loading,
        error,
        currentPage,
        totalPages,
        hasNextPage,
        hasPrevPage,
    } = useExperiences({
        page,
        pageSize: 12,
    });

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <section className="min-h-screen lg:mx-24 bg-background pt-10">
                <div className="container mx-auto px-4 py-12">
                    {/* Título */}
                    <h1 className="text-5xl text-center font-black uppercase tracking-tighter mb-12">
                        {t('title')}
                    </h1>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map((exp) => (
                            <Link
                                key={exp.id}
                                href={`/experiencias/${exp.id}`}
                                className="group border border-gray-100 rounded-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 flex flex-col"
                            >
                                {/* Contenedor de Imagen Optimizado */}
                                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                                    <Image
                                        src={getOptimizedUrl(exp.image)}
                                        alt={exp.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-black shadow-sm">
                                            ⏱ {exp.duration}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-xl font-black uppercase tracking-tighter text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                                        {exp.title}
                                    </h2>

                                    <p className="text-sm text-gray-500 line-clamp-2 mt-3 flex-grow font-light leading-relaxed">
                                        {exp.description}
                                    </p>

                                    <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('from_label')}</span>
                                            <p className="text-2xl font-black text-black tracking-tighter leading-none">
                                                {exp.priceFormatted}
                                            </p>
                                        </div>
                                        <p className="text-[9px] text-blue-500 mb-1 uppercase font-black tracking-widest">{t('tax_included')}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty state */}
                    {data.length === 0 && (
                        <div className="text-center py-32 space-y-4">
                            <div className="text-4xl opacity-20">🏜️</div>
                            <p className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">
                                {t('empty_state')}
                            </p>
                        </div>
                    )}

                    {/* Paginación */}
                    {totalPages > 1 && (
                        <div className="flex flex-col items-center gap-6 mt-20 border-t border-gray-100 pt-10">
                            <div className="flex items-center gap-4">
                                <button
                                    disabled={!hasPrevPage}
                                    onClick={() => {
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                        setPage((prev) => Math.max(prev - 1, 1))
                                    }}
                                    className="px-6 py-2 border-2 border-black text-[10px] font-black uppercase tracking-widest disabled:opacity-20 hover:bg-black hover:text-white transition-all active:scale-95"
                                >
                                    {t('pagination.prev')}
                                </button>

                                <button
                                    disabled={!hasNextPage}
                                    onClick={() => {
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                        setPage((prev) => prev + 1)
                                    }}
                                    className="px-6 py-2 border-2 border-black text-[10px] font-black uppercase tracking-widest disabled:opacity-20 hover:bg-black hover:text-white transition-all active:scale-95"
                                >
                                    {t('pagination.next')}
                                </button>
                            </div>
                            
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                {t('pagination.info', { current: currentPage, total: totalPages })}
                            </span>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}