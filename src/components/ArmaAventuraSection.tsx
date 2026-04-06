"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

export default function ArmaAventuraSection() {
  const t = useTranslations('CustomAdventure');

  return (
    <section id="arma-aventura" className="relative min-h-screen bg-[#1f1e58]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('https://plus.unsplash.com/premium_photo-1697729995893-524dc0b91ecb?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Big Title */}
        <h2 className="font-anton text-[#e8e0c6] text-6xl md:text-8xl lg:text-[10rem] leading-none text-center mb-16 uppercase">
          {t('hero_title_line1')}
          <br />
          {t('hero_title_line2')}
        </h2>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-12">
          {/* Image */}
          <div className="lg:w-1/3">
            <div
              className="relative w-full h-[300px] lg:h-[350px] rounded-lg overflow-hidden shadow-xl"
              style={{ backgroundColor: "#4a4a4a" }}
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1679669192872-1733bfda6df2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              {t('main_subtitle')}
            </h3>
            <p className="text-white/80 mb-4">
              <span className="font-semibold text-white">{t('question')}</span>
            </p>
            <p className="text-white/70 mb-8">
              {t.rich('contact_text', {
                contact: (chunks) => <span className="font-semibold text-white underline cursor-pointer">{chunks}</span>
              })}
            </p>

            <Link
              href="/armatuaventura"
              className="inline-block border-2 border-white/50 text-white px-12 py-4 rounded hover:bg-white hover:text-[#1f1e58] transition-all duration-300 font-medium uppercase tracking-widest text-sm"
            >
              {t('cta_button')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}