"use client";

import Link from "next/link";
import { useDestinations } from "@/hooks/useDestinations";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import logoBig from "@/public/logo-big.png"
import { useMemo } from "react";
import { getOptimizedUrl } from "@/lib/images";

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

const FEATURED_DESTINATIONS = [
  {
    name: "Oaxaca",
    slug: "exp-012", // Asegúrate que coincida con tu ruta /destinos/oaxaca
    image: getOptimizedUrl("https://images.unsplash.com/photo-1660670173026-ec491dd3dd1a?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    label: "Cultura y Tradición"
  },
  {
    name: "Los Cabos",
    slug: "exp-007",
    image: getOptimizedUrl("https://images.unsplash.com/photo-1587673461694-f0b160bef05c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    label: "Lujo y Playa"
  },
  {
    name: "Xochimilco",
    slug: "exp-002",
    image: getOptimizedUrl("https://images.unsplash.com/photo-1564762332974-5bf63a654c9d?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    label: "Magia en el Agua"
  },
  {
    name: "Querétaro",
    slug: "exp-008",
    image: getOptimizedUrl("https://images.unsplash.com/photo-1591933733584-bf9577821973?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    label: "Historia y Vino"
  }
];

export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1616036740257-9449ea1f6605?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* OVERLAY (oscurece el fondo, no el contenido) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENIDO */}
      <div className="relative z-10 text-white">
        <div className="container mx-auto px-6 py-16 md:py-24 space-y-16">

          {/* TOP 3 COLUMNAS */}
          <div className="grid md:grid-cols-3 items-center gap-8">

            {/* IZQUIERDA */}
            <div className="text-center lg:text-left space-y-4 order-2 lg:order-1">
              <h1 className="text-3xl md:text-5xl font-light tracking-tight">
                Visita <span className="font-bold">México</span>
              </h1>
              <p className="text-lg opacity-80 leading-relaxed max-w-md mx-auto lg:mx-0 font-light">
                Descubre la magia de nuestras tierras con seguridad,
                comodidad y un toque de aventura inolvidable.
              </p>
            </div>

            {/* CENTER */}
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative transform hover:scale-110 transition-transform duration-500">
                <Image
                  src={logoBig}
                  width={1000} // Aumentado significativamente
                  height={650}
                  alt="Logo Principal"
                  className="object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>
            </div>

            {/* DERECHA */}
            <div className="flex flex-col items-center lg:items-end gap-6 order-3">
              <h2 className="text-3xl md:text-5xl font-light text-center lg:text-right">
                Explora la <br className="hidden lg:block" /> <span className="font-bold">Tienda</span>
              </h2>
              <Link
                href="/experiencias"
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase text-sm tracking-widest hover:bg-[#ae4e68] hover:text-white transition-all duration-300 shadow-xl"
              >
                Comenzar viaje
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

          {/* DESTINOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
            {FEATURED_DESTINATIONS.map((dest) => (
              <Link
                key={dest.slug}
                href={`/experiencias/${dest.slug}`}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3"
              >
                {/* Imagen de fondo con Zoom al hacer hover */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-125"
                  style={{
                    backgroundImage: `url(${dest.image})`,
                  }}
                />

                {/* Overlay oscuro progresivo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Contenido de la Card */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-black uppercase tracking-[3px] text-[#ae4e68] mb-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {dest.label}
                  </span>
                  <h3 className="text-white text-2xl font-bold tracking-tight">
                    {dest.name}
                  </h3>
                  <div className="w-0 h-1 bg-[#ae4e68] mt-2 group-hover:w-full transition-all duration-500" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}