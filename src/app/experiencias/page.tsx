"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useExperiences } from "@/hooks/useExperiences";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import Loading from "@/components/Loading";
import Image from "next/image";
import { getOptimizedUrl } from "@/lib/images";

export default function ExperiencesPage() {
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

    if (error) {
        return (
            <div className="p-10 text-center text-red-500">
                Error: {error.message}
            </div>
        );
    }

    return (
        <>
            <Header />
            <section className="min-h-screen mx-24 bg-background pt-10">
                <div className="container mx-auto px-4 py-12">
                    {/* Título */}
                    <h1 className="text-5xl text-center font-bold mb-8 capitalize">
                        Aventuras
                    </h1>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map((exp, index) => (
                            <Link
                                key={exp.id}
                                href={`/experiencias/${exp.id}`}
                                className="group border rounded-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 flex flex-col"
                            >
                                {/* Contenedor de Imagen Optimizado */}
                                <div className="relative h-60 w-full overflow-hidden bg-gray-200">
                                    <Image
                                        src={getOptimizedUrl(exp.image)}
                                        alt={exp.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                        // Esto mantiene la imagen en cache más agresivamente
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                                    />
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {exp.title}
                                    </h2>

                                    <p className="text-sm text-gray-500 line-clamp-2 mt-2 flex-grow">
                                        {exp.description}
                                    </p>

                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                        <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                                            ⏱ {exp.duration}
                                        </span>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-black leading-none">
                                                {exp.priceFormatted}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">IVA incluido</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty state */}
                    {data.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            No hay experiencias para este destino
                        </div>
                    )}

                    {/* Paginación (simple por ahora) */}
                    <div className="flex justify-center gap-4 mt-10">
                        <button
                            disabled={!hasPrevPage}
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setPage((prev) => Math.max(prev - 1, 1))
                            }
                            }
                            className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
                        >
                            Anterior
                        </button>

                        <span className="text-sm text-gray-600">
                            Página {currentPage} de {totalPages}
                        </span>

                        <button
                            disabled={!hasNextPage}
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setPage((prev) => prev + 1)
                            }
                            }
                            className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}