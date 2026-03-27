"use client";

import Link from "next/link";
import { useDestinations } from "@/hooks/useDestinations";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo2.png"

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
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://ext.same-assets.com/619569696/3681039266.jpeg')",
      }}
    >
      {/* OVERLAY (oscurece el fondo, no el contenido) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENIDO */}
      <div className="relative z-10 text-white">
        <div className="container mx-auto px-6 py-16 md:py-24 space-y-16">

          {/* TOP 3 COLUMNAS */}
          <div className="grid md:grid-cols-3 items-center gap-8">

            {/* LEFT */}
            <div className="text-center flex flex-col px-7 md:text-left space-y-4">
              <h1 className="text-2xl md:text-4xl font-light">
                Visita México
              </h1>
              <p className="text-base opacity-90 leading-relaxed max-w-md mx-auto md:mx-0">
                Inspira a cada viajero a descubrir la magia de México con seguridad,
                comodidad y un toque de aventura.
              </p>
            </div>

            {/* CENTER */}
            <div className="flex justify-center">
              <Image
                src={logo}
                width={400}
                height={400}
                alt="Logo"
                className="object-contain"
              />
            </div>

            {/* RIGHT */}
            <div className="flex flex-col px-7 items-center gap-5 justify-center md:justify-end">
              <h1 className="text-2xl md:text-4xl font-light">
                Visita nuestra
              </h1>
              <Link
                href="/experiencias"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
              >
                Tienda
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* DESTINOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {loading ? (
              <>
                <DestinationCardSkeleton />
                <DestinationCardSkeleton />
                <DestinationCardSkeleton />
                <DestinationCardSkeleton />
              </>
            ) : (
              destinations.slice(0, 4).map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinos/${dest.slug}`}
                  className="group transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="h-48 rounded-xl bg-cover bg-center relative overflow-hidden"
                    style={{
                      backgroundImage: `url(${dest.card_image})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-lg md:text-xl font-medium text-center px-2">
                        {dest.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
}