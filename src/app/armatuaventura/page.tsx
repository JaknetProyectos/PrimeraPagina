"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useQuotes } from "@/hooks/useCotizaciones";
import { useExperiences } from "@/hooks/useExperiences";
import Link from "next/link";
import { X, CheckCircle, Copy, Loader2 } from "lucide-react";

export default function AdventurePlannerSection() {
    const { createQuote, loading } = useQuotes();
    const { data: experiences } = useExperiences({ pageSize: 20 }); // Para llenar el select
    const [success, setSuccess] = useState(false);
    const [quoteId, setQuoteId] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        telefono: "",
        personas: "Individual",
        experiencia_slug: "",
        detalles: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 2. Obtener el título de la experiencia seleccionada para el email
            const selectedExp = experiences?.find(ex => ex.id === form.experiencia_slug);

            const result = await createQuote({
                ...form,
                experiencia_title: selectedExp?.title || "Aventura Personalizada"
            } as any);

            // 3. Enviar el email a través de nuestra nueva API
            await fetch("/api/cotizacion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    id: result.id, // ID generado por Supabase
                    experiencia_title: selectedExp?.title || "Experiencia personalizada"
                }),
            });

            // 4. Mostrar éxito
            setQuoteId(result.id);
            setShowModal(true);

        } catch (err) {
            console.error(err);
            alert("Hubo un error al procesar tu solicitud.");
        }
    };


    return (
        <>
            <Header />
            <section
                className="relative mt-10 bg-[#f5f5f5] bg-cover bg-center bg-no-repeat min-h-screen flex items-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
                }}
            >
                {/* MODAL (Se mantiene tu lógica anterior con estilo Material) */}
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={() => setShowModal(false)} />
                        <div className="relative bg-white text-black w-full max-w-md overflow-hidden rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                            <div className="h-2 w-full bg-[#03A9F4]" />
                            <div className="p-10 text-center">
                                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-[#212121]"><X size={20} /></button>
                                <div className="w-16 h-16 bg-[#E3F2FD] text-[#03A9F4] rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={32} /></div>
                                <h3 className="text-xl font-bold uppercase tracking-widest text-[#212121] mb-2">Solicitud Recibida</h3>
                                <p className="text-xs text-gray-500 mb-8 font-medium px-4">En breve recibirás tu folio para pagar tu cotización.</p>
                                <div className="space-y-3">
                                    <button onClick={() => setShowModal(false)} className="w-full bg-[#03A9F4] text-white py-3 rounded-sm font-bold uppercase text-xs tracking-widest shadow-md hover:bg-[#0288D1]">Entendido</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* OVERLAY TIPO GRADIENTE PROFESIONAL */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                <div className="relative z-10 container mx-auto px-6 py-20">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">

                        {/* TEXTO IZQUIERDA */}
                        <div className="space-y-8 self-center">
                            <div className="space-y-2">
                                <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                                    Arma tu <br /><span className="text-[#03A9F4]">Aventura</span>
                                </h2>
                            </div>
                            <p className="text-gray-300 text-lg leading-relaxed max-w-md font-light">
                                Diseñamos recorridos únicos hechos a tu medida. Cuéntanos tu idea y nuestros expertos la harán realidad.
                            </p>
                        </div>

                        {/* FORMULARIO ESTILO MATERIAL (DERECHA) */}
                        <div className="bg-white shadow-2xl rounded-sm overflow-hidden animate-in slide-in-from-right-10 duration-700">
                            <div className="bg-[#03A9F4] p-6 text-white">
                                <h4 className="text-sm font-bold uppercase tracking-widest">Formulario de Solicitud</h4>
                                <p className="text-[10px] opacity-80 uppercase mt-1">Completa los campos para recibir tu cotización</p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[#03A9F4] uppercase">Nombre completo</label>
                                        <input
                                            required
                                            type="text"
                                            value={form.nombre}
                                            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                            className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 text-sm focus:border-[#03A9F4] focus:bg-blue-50/30 outline-none transition-all rounded-t-sm"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[#03A9F4] uppercase">Email de contacto</label>
                                        <input
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 text-sm focus:border-[#03A9F4] focus:bg-blue-50/30 outline-none transition-all rounded-t-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[#03A9F4] uppercase">Teléfono</label>
                                        <input
                                            required
                                            type="tel"
                                            value={form.telefono}
                                            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                                            className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 text-sm focus:border-[#03A9F4] focus:bg-blue-50/30 outline-none transition-all rounded-t-sm"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-[#03A9F4] uppercase">Tipo de Grupo</label>
                                        <select
                                            value={form.personas}
                                            onChange={(e) => setForm({ ...form, personas: e.target.value })}
                                            className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 text-sm focus:border-[#03A9F4] outline-none transition-all rounded-t-sm appearance-none"
                                        >
                                            <option value="Individual">Individual</option>
                                            <option value="Pareja">Pareja</option>
                                            <option value="+4 Grupo">+4 Grupo</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-[#03A9F4] uppercase">Experiencia Base</label>
                                    <select
                                        required
                                        value={form.experiencia_slug}
                                        onChange={(e) => setForm({ ...form, experiencia_slug: e.target.value })}
                                        className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 text-sm focus:border-[#03A9F4] outline-none transition-all rounded-t-sm"
                                    >
                                        <option value="">Seleccionar aventura...</option>
                                        {experiences?.map((exp) => (
                                            <option key={exp.id} value={exp.id}>{exp.title}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-[#03A9F4] uppercase">Mensaje y detalles extra</label>
                                    <textarea
                                        rows={3}
                                        value={form.detalles}
                                        onChange={(e) => setForm({ ...form, detalles: e.target.value })}
                                        className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-3 text-sm focus:border-[#03A9F4] focus:bg-blue-50/30 outline-none transition-all rounded-t-sm resize-none"
                                        placeholder="Ej: Requiero transporte privado y guía bilingüe..."
                                    />
                                </div>

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-[#03A9F4] text-white py-4 rounded-sm font-bold uppercase text-xs tracking-[0.2em] shadow-lg hover:bg-[#0288D1] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : "Enviar Solicitud"}
                                </button>

                                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">¿Ya tienes folio?</p>
                                    <Link href="/pagatuaventura" className="text-[10px] font-bold text-[#03A9F4] uppercase border-b border-[#03A9F4] hover:text-[#0288D1]">Pagar Cotización</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>           <Footer />
        </>
    );
}