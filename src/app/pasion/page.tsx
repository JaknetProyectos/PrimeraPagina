"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useQuotes } from "@/hooks/useCotizaciones";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";
import {
    Loader2,
    CheckCircle,
    Search,
    CreditCard,
    AlertCircle,
    Send,
    Trophy
} from "lucide-react";

export default function FootballExperienceLayout() {
    const { createQuote, getQuoteByFolio } = useQuotes();
    const { addToCart } = useCart();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState<"solicitar" | "pagar">("solicitar");

    // Estado para nueva solicitud (Sin folios ni precios)
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        detalles: "",
        personas: "1-2",
        experiencia_title: "Pasión Futbolera: Experiencia VIP",
        experiencia_slug: "pasion-futbolera"
    });

    // Estado para pago por folio (Búsqueda manual del cliente)
    const [paymentFolio, setPaymentFolio] = useState("");
    const [montoManual, setMontoManual] = useState<string>("");
    const [quoteFound, setQuoteFound] = useState<any>(null);
    const [error, setError] = useState("");

    const handleSubmitQuote = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 1. Creamos la cotización en Supabase (Solo datos de usuario)
            // No pasamos ni generamos Folio aquí.
            const newQuote = await createQuote(formData as any);

            // 2. Notificamos al sistema (API) para el envío de correo de confirmación de recepción
            await fetch("/api/cotizacion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    id: newQuote.id // Usamos el ID solo para referencia interna del sistema
                }),
            });

            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            alert("Hubo un problema al registrar tu solicitud.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearchFolio = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await getQuoteByFolio(paymentFolio);
            if (!data) {
                setError("Folio no localizado. Verifica el código enviado por tu asesor.");
            } else if (data.estado !== 'confirmado' && data.estado !== 'pagado') {
                setError("Tu presupuesto aún está siendo procesado por nuestro equipo.");
            } else {
                setQuoteFound(data);
                setMontoManual(data.price?.toString() || "");
            }
        } catch (err) {
            setError("Error al consultar el folio.");
        } finally {
            setLoading(false);
        }
    };

    const handleProceedToCart = () => {
        if (!quoteFound) return;

        // 1. Limpiamos el campo personas: de "1-2" a 1 (o 2)
        // Usamos parseInt para extraer el primer número que encuentre en el string
        const personasNumericas = parseInt(quoteFound.personas) || 1;

        // 2. Aseguramos que el precio sea un número válido
        // Priorizamos montoManual (el del input) y luego el de la DB
        const precioFinal = Number(montoManual) || Number(quoteFound.price) || 0;

        addToCart({
            experienceId: quoteFound.folio, // Usamos el folio como ID único
            title: `Reserva: ${quoteFound.experiencia_title || "Pasión Futbolera"}`,
            destinationName: "Pasión Futbolera",
            price: precioFinal,
            personas: personasNumericas, // Ahora es un NUMBER
            fecha: new Date().toISOString().split('T')[0], // Fecha por defecto: Hoy
            description: `Folio: ${quoteFound.folio}`
        });

        router.push("/cart");
    };

    return (
        <>
            <Header />
            <section className="relative mt-10 bg-cover bg-center bg-no-repeat min-h-screen"
                style={{ backgroundImage: "url('https://grupopineda.eu/wp-content/uploads/2022/03/shutterstock_1912601503.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/90 to-black" />

                <div className="relative z-10 text-white container mx-auto px-6 py-20 max-w-6xl">
                    <div className="flex flex-col items-center text-center mb-16 space-y-4">
                        <div className="bg-[#03A9F4] p-3 rounded-2xl mb-4 shadow-lg shadow-[#03A9F4]/20">
                            <Trophy size={32} className="text-white" />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                            Pasión <span className="text-[#03A9F4]">Futbolera</span>
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="flex bg-white/5 backdrop-blur-xl rounded-t-[2rem] p-1.5 gap-1.5 border-x border-t border-white/10 shadow-2xl">
                            <button onClick={() => setActiveTab("solicitar")}
                                className={`flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === "solicitar" ? "bg-[#03A9F4] text-white" : "hover:bg-white/5 text-white/40"}`}>
                                1. Solicitar Cotización
                            </button>
                            <button onClick={() => setActiveTab("pagar")}
                                className={`flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === "pagar" ? "bg-[#03A9F4] text-white" : "hover:bg-white/5 text-white/40"}`}>
                                2. Pagar Folio
                            </button>
                        </div>

                        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-b-[2rem] p-10 shadow-2xl">
                            {activeTab === "solicitar" ? (
                                !submitted ? (
                                    <form onSubmit={handleSubmitQuote} className="space-y-5">
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <input required type="text" placeholder="Nombre" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#03A9F4]"
                                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                                            <input required type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#03A9F4]"
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                        </div>
                                        <input required type="tel" placeholder="Teléfono" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#03A9F4]"
                                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} />
                                        <textarea required placeholder="Detalles de tu viaje..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#03A9F4]"
                                            onChange={(e) => setFormData({ ...formData, detalles: e.target.value })} />
                                        <button disabled={loading} className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-[#03A9F4] hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl">
                                            {loading ? <Loader2 className="animate-spin" /> : <><Send size={16} /> Enviar Solicitud</>}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-center py-16 space-y-6 animate-in fade-in zoom-in">
                                        <CheckCircle className="w-20 h-20 text-[#03A9F4] mx-auto" />
                                        <h4 className="text-3xl font-light italic uppercase tracking-tighter">¡Solicitud Enviada!</h4>
                                        <p className="text-white/50 text-sm max-w-xs mx-auto">
                                            Nuestro equipo analizará tu petición. Te enviaremos tu folio personalizado al correo registrado.
                                        </p>
                                    </div>
                                )
                            ) : (
                                <div className="space-y-8">
                                    {!quoteFound ? (
                                        <form onSubmit={handleSearchFolio} className="space-y-6">
                                            <input required type="text" placeholder="WNDR-XXXXX"
                                                className="w-full bg-white/10 border-2 border-white/10 rounded-3xl px-6 py-6 outline-none focus:border-[#03A9F4] text-center font-mono text-3xl uppercase tracking-[0.2em]"
                                                value={paymentFolio} onChange={(e) => setPaymentFolio(e.target.value.toUpperCase())} />
                                            {error && <div className="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2"><AlertCircle size={14} /> {error}</div>}
                                            <button disabled={loading} className="w-full bg-[#03A9F4] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3">
                                                {loading ? <Loader2 className="animate-spin" /> : <><Search size={18} /> Validar Folio</>}
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="space-y-8 animate-in slide-in-from-bottom-8">
                                            <div className="bg-white/5 p-8 rounded-[2rem] border border-[#03A9F4]/30">
                                                <p className="text-[9px] font-black text-[#03A9F4] uppercase mb-2 tracking-[0.4em]">Propuesta para:</p>
                                                <h3 className="text-3xl font-light italic mb-6">{quoteFound.nombre}</h3>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Inversión (MXN)</label>
                                                    <div className="relative">
                                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-light text-white/20">$</span>
                                                        <input type="number" className="w-full bg-white text-black rounded-[1.5rem] pl-12 pr-6 py-6 text-5xl font-black outline-none"
                                                            value={montoManual} onChange={(e) => setMontoManual(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <button onClick={() => setQuoteFound(null)} className="flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Volver</button>
                                                <button onClick={handleProceedToCart} className="flex-[2] bg-white text-black py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-[#03A9F4] hover:text-white transition-all flex items-center justify-center gap-3">
                                                    <CreditCard size={18} /> Agregar al carrito
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}