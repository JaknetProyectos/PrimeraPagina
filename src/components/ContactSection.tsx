"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check, Loader2 } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ nombre: "", email: "", mensaje: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert(t('error_message'));
      }
    } catch (error) {
      console.error("Error:", error);
      alert(t('connection_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contactanos" className="bg-[var(--md-background)] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-medium text-[var(--md-on-surface)]">
              {t('title')}
            </h2>
            <p className="text-[var(--md-on-surface-medium)] mt-2">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--md-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[var(--md-primary)]" />
                </div>
                <div>
                  <h3 className="font-medium text-[var(--md-on-surface)]">{t('info.phone.label')}</h3>
                  <p className="text-[var(--md-on-surface-medium)] mt-1">+52 55 1234 1234</p>
                  <p className="text-sm text-[var(--md-on-surface-disabled)]">{t('info.phone.hours')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--md-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[var(--md-primary)]" />
                </div>
                <div>
                  <h3 className="font-medium text-[var(--md-on-surface)]">{t('info.email.label')}</h3>
                  <p className="text-[var(--md-on-surface-medium)] mt-1">contacto@vivatrip.com.mx</p>
                  <p className="text-sm text-[var(--md-on-surface-disabled)]">{t('info.email.response')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--md-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[var(--md-primary)]" />
                </div>
                <div>
                  <h3 className="font-medium text-[var(--md-on-surface)]">{t('info.location.label')}</h3>
                  <p className="text-[var(--md-on-surface-medium)] mt-1">{t('info.location.city')}</p>
                  <p className="text-sm text-[var(--md-on-surface-disabled)]">{t('info.location.appointment')}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md-card p-6 bg-white shadow-sm border border-gray-100 rounded-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 text-lg">
                    {t('success.title')}
                  </h3>
                  <p className="text-gray-500 mt-2">
                    {t('success.description')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form.name_label')}
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full border-b-2 border-gray-200 py-2 outline-none focus:border-[#1976D2] transition-colors"
                      placeholder={t('form.name_placeholder')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form.email_label')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border-b-2 border-gray-200 py-2 outline-none focus:border-[#1976D2] transition-colors"
                      placeholder={t('form.email_placeholder')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form.message_label')}
                    </label>
                    <textarea
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className="w-full border-b-2 border-gray-200 py-2 outline-none focus:border-[#1976D2] transition-colors resize-none"
                      rows={4}
                      placeholder={t('form.message_placeholder')}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1976D2] text-white py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-[#1565C0] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {t('form.submit_button')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}