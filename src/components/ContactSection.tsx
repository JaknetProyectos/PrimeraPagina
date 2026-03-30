"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para el botón

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
        // Opcional: Volver a mostrar el formulario después de 5 segundos
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Hubo un error al enviar el mensaje. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión.");
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
              Contáctanos
            </h2>
            <p className="text-[var(--md-on-surface-medium)] mt-2">
              ¿Tienes preguntas? Estamos aquí para ayudarte
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
                  <h3 className="font-medium text-[var(--md-on-surface)]">Teléfono</h3>
                  <p className="text-[var(--md-on-surface-medium)] mt-1">+52 55 1234 1234</p>
                  <p className="text-sm text-[var(--md-on-surface-disabled)]">Lun - Vie, 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--md-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[var(--md-primary)]" />
                </div>
                <div>
                  <h3 className="font-medium text-[var(--md-on-surface)]">Email</h3>
                  <p className="text-[var(--md-on-surface-medium)] mt-1">contacto@vivatrip.com.mx</p>
                  <p className="text-sm text-[var(--md-on-surface-disabled)]">Respondemos en 24 horas</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--md-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[var(--md-primary)]" />
                </div>
                <div>
                  <h3 className="font-medium text-[var(--md-on-surface)]">Ubicación</h3>
                  <p className="text-[var(--md-on-surface-medium)] mt-1">Ciudad de México, México</p>
                  <p className="text-sm text-[var(--md-on-surface-disabled)]">Visitas con cita previa</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md-card p-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-[var(--md-success)]/10 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-[var(--md-success)]" />
                  </div>
                  <h3 className="font-medium text-[var(--md-on-surface)] text-lg">
                    Mensaje enviado
                  </h3>
                  <p className="text-[var(--md-on-surface-medium)] mt-2">
                    Nos pondremos en contacto pronto
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--md-on-surface)] mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="md-input"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--md-on-surface)] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="md-input"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--md-on-surface)] mb-1">
                      Mensaje
                    </label>
                    <textarea
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className="md-input resize-none"
                      rows={4}
                      placeholder="¿En qué podemos ayudarte?"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full md-btn md-btn-primary flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Enviar mensaje
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
