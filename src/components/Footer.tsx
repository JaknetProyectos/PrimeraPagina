"use client";
import visa from "@/public/visa.png"
import mastercard from "@/public/mastercard.png"
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // Función para cambiar el idioma manteniendo la ruta actual
  const handleLocaleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <footer className="bg-[#212121] text-white border-t border-white/5 font-work-sans">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand & Language Switcher */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-black italic uppercase tracking-tighter text-xl">
                Viva <span className="text-[#03A9F4]">Trip</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest font-medium">
              {t('brand_description')}
            </p>
            
            {/* SELECTOR DE IDIOMA ELITE */}
            <div className="pt-4">
              <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit">
                <button 
                  onClick={() => handleLocaleChange('es')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${locale === 'es' ? 'bg-[#03A9F4] text-white shadow-lg' : 'hover:bg-white/5 text-gray-500'}`}
                >
                  <span className="text-base">🇲🇽</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">ES</span>
                </button>
                <button 
                  onClick={() => handleLocaleChange('en')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${locale === 'en' ? 'bg-[#03A9F4] text-white shadow-lg' : 'hover:bg-white/5 text-gray-500'}`}
                >
                  <span className="text-base">🇺🇸</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">EN</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pagos */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#03A9F4] mb-6">{t('sections.payments')}</h4>
            <div className="flex flex-col gap-4">
                <Image src={visa} alt="visa" width={50} className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
                <Image src={mastercard} alt="mastercard" width={50} className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#03A9F4] mb-6">{t('sections.contact')}</h4>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
              <li><Link href="/#contactanos" className="hover:text-[#03A9F4] transition-colors">contacto@vivatrip.com</Link></li>
              <li><Link href="/#contactanos" className="hover:text-[#03A9F4] transition-colors">+ 52 1 55 1234 1234</Link></li>
              <li><span className="text-gray-600 italic">CDMX, {t('country')}</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#03A9F4] mb-6">{t('sections.legal')}</h4>
            <ul className="space-y-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
              <li><Link href="/legal/terminos" className="hover:text-white transition-colors">{t('legal_links.terms')}</Link></li>
              <li><Link href="/legal/reembolsos" className="hover:text-white transition-colors">{t('legal_links.refunds')}</Link></li>
              <li><Link href="/legal/privacidad" className="hover:text-white transition-colors">{t('legal_links.privacy')}</Link></li>
              <li><Link href="/legal/consumidor" className="hover:text-white transition-colors">{t('legal_links.consumer')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">
            {t('copyright', { year: 2026 })}
          </p>
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-[#03A9F4]/40">
            <Globe size={12} />
            <span>{t('made_with_love')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}