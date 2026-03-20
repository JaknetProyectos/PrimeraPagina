"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useDestinations } from "@/hooks/useDestinations";
import { MapPin, ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/supabase/client";

// Constante para definir cuántos elementos ver por página
const ITEMS_PER_PAGE = 6;

function DestinationCardSkeleton() {
  return (
    <div className="md-card animate-pulse border border-border rounded-lg overflow-hidden">
      <div className="h-48 bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-muted rounded w-2/3" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-1/2" />
      </div>
    </div>
  );
}

export default function DestinationsPage() {
  const { data: destinations = [], loading } = useDestinations();

  // Estados para búsqueda y paginación
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Filtrado lógico por nombre o descripción
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) =>
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [destinations, searchTerm]);

  // 2. Cálculos de paginación
  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDestinations = filteredDestinations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reiniciar a página 1 cuando se busca algo
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="pt-20 bg-background min-h-screen">
      <Header />

      <div id="destinos" className="container mx-auto px-4 py-12">
        {/* Barra de Búsqueda */}
        <div className="relative max-w-md mx-auto mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar destinos..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-input rounded-full text-foreground focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
          />
        </div>

        {/* Grid de Destinos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <DestinationCardSkeleton key={i} />)
          ) : currentDestinations.length > 0 ? (
            currentDestinations.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinos/${dest.slug}`}
                className="md-card group transition-all duration-300 hover:-translate-y-1 border border-border rounded-lg overflow-hidden bg-card"
              >
                {/* Imagen y Overlay */}
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundColor: dest.bgColor,
                    backgroundImage: `url(${dest.cardImage})`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 text-white/80 text-xs mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>México</span>
                    </div>
                    <h3 className="text-white text-xl font-medium">{dest.name}</h3>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-4">
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {dest.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {dest.highlights.slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className="text-[10px] uppercase tracking-wider px-2 py-1 bg-secondary text-secondary-foreground rounded-md font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>Ver experiencias</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-muted-foreground">No se encontraron destinos que coincidan con "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* Controles de Paginación */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${currentPage === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent text-foreground"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
}