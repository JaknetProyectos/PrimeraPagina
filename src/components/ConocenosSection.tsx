"use client";

import { Globe2Icon } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ConocenosSection() {
  const t = useTranslations('About');

  return (
    <section id="conocenos" className="bg-[#1f1e58] py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="lg:w-1/2">
            <div
              className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl"
              style={{ backgroundColor: "#7d9fab" }}
            >
              <img
                src="https://images.unsplash.com/photo-1653661279002-692227e35f0f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={t('image_alt')}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 text-white">
            <p className="text-[#e8e0c6] font-abel text-xl mb-2 italic">
              {t('subtitle')}
            </p>
            <h2 className="font-anton text-5xl lg:text-6xl text-[#e8e0c6] mb-6">
              VivaTrip
            </h2>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              {t.rich('description', {
                brand: (chunks) => <span className="font-semibold text-[#e8e0c6]">{chunks}</span>
              })}
            </p>

            <div className="flex items-start gap-3">
              <Globe2Icon className="w-6 h-6 mt-1 text-[#e8e0c6]" />
              <div>
                <span className="font-semibold text-[#e8e0c6]">{t('essense_title')}</span>
                <p className="text-white/80 mt-1">
                  {t('essense_description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}