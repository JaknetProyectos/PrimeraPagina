"use client";

import { useTranslations } from 'next-intl';

export default function ExperienciasSection() {
  const t = useTranslations('Experiences');

  return (
    <section id="experiencias" className="bg-[#1f1e58] py-20">
      <div className="container mx-auto px-4">
        {/* Big Title */}
        <h2 className="font-anton text-[#e8e0c6] text-6xl md:text-8xl lg:text-[10rem] leading-none text-center mb-16 uppercase">
          {t('hero_title')}
        </h2>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="lg:w-1/3">
            <div
              className="relative w-full h-[300px] lg:h-[350px] rounded-lg overflow-hidden shadow-xl"
              style={{ backgroundColor: "#4a4a4a" }}
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1732738372625-8dc6a664ec78?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={t('image_alt')}
                className="absolute inset-0 w-full h-full object-cover grayscale"
                loading="eager"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-2/3 text-white">
            <p className="text-[#e8e0c6] uppercase tracking-wider mb-2">
              {t('upper_subtitle')}
            </p>
            <h3 className="font-anton text-[#e8e0c6] text-4xl lg:text-5xl mb-6">
              {t('notice_title')}
            </h3>
            <p className="text-white/80 leading-relaxed">
              {t.rich('notice_description', {
                bold: (chunks) => <span className="font-semibold text-white">{chunks}</span>
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}