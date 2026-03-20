"use client";

import Link from "next/link";
import { useDestinations } from "@/hooks/useDestinations";
import { MapPin, ArrowRight } from "lucide-react";

function DestinationCardSkeleton() {
  return (
    <div className="md-card animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { data: destinations, loading } = useDestinations();

  return (
    <section className="bg-[var(--md-background)]">
      {/* Hero Banner */}
      <div className="bg-[var(--md-primary)] p-6 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4">
              Descubre <span className="font-medium">México</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 font-light">
              Experiencias únicas que combinan aventura, historia, naturaleza y gastronomía.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/experiencias" className="md-btn md-btn-secondary inline-flex items-center gap-2">
                Ver experiencias
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link href="#contactanos" className="md-btn bg-white/20 text-white hover:bg-white/30">
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div id="destinos" className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-medium text-[var(--md-on-surface)]">
              Destinos populares
            </h2>
            <p className="text-[var(--md-on-surface-medium)] mt-1">
              Explora nuestros destinos más solicitados
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              <DestinationCardSkeleton />
              <DestinationCardSkeleton />
              <DestinationCardSkeleton />
            </>
          ) : (
            destinations.slice(0, 3).map((dest) => (
              <Link
                key={dest.id}
                href={`/destinos/${dest.slug}`}
                className="md-card group transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundColor: dest.bg_color,
                    backgroundImage: `url(${dest.card_image})`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 text-white/80 text-sm mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>México</span>
                    </div>
                    <h3 className="text-white text-xl font-medium">{dest.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[var(--md-on-surface-medium)] text-sm line-clamp-2">
                    {dest.short_description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {dest.highlights.slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className="text-xs px-2 py-1 bg-gray-100 text-[var(--md-on-surface-medium)] rounded"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-[var(--md-primary)] font-medium text-sm group-hover:gap-2 transition-all">
                    <span>Ver experiencias</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
