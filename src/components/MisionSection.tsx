"use client";

import { useTranslations } from 'next-intl';

export default function MisionSection() {
  const t = useTranslations('Mission');

  return (
    <section className="relative min-h-[60vh] bg-[#326240]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506261423908-ea2559c1f24c?q=80&w=884&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />

      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] text-center">
        {/* Mission Title with Gradient */}
        <h2 className="font-anton text-7xl text-white md:text-9xl lg:text-[12rem] text-gradient-mission opacity-80 mb-8 uppercase">
          {t('title')}
        </h2>

        {/* Mission Text */}
        <p className="text-white text-lg md:text-xl lg:text-2xl max-w-4xl leading-relaxed font-light">
          {t('description')}
        </p>
      </div>
    </section>
  );
}