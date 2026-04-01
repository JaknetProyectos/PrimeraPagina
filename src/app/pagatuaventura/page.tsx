"use client";
import { Suspense, useEffect, useState, useCallback } from "react";
import { useQuotes } from "@/hooks/useCotizaciones";
import { useCart } from "@/context/cartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, Search, ShoppingCart, AlertCircle, ShieldCheck, CreditCard, Info } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function PayQuoteContent() {
    const searchParams = useSearchParams();
    const queryFolio = searchParams.get('folio');

    const [folio, setFolio] = useState("");
    const [montoManual, setMontoManual] = useState<string>("");
    const [quoteData, setQuoteData] = useState<any>(null);
    const [searching, setSearching] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");

    const { getQuoteByFolio } = useQuotes();
    const { addToCart } = useCart();
    const router = useRouter();

    // Búsqueda optimizada
    const autoSearch = useCallback(async (f: string) => {
        if (!f || f.length < 3) return;
        setSearching(true);
        setInfoMessage("");
        try {
            const data = await getQuoteByFolio(f.trim().toUpperCase());
            if (data) {
                setQuoteData(data);
                setMontoManual(data.price?.toString() || "");
                setInfoMessage("Cotización encontrada y vinculada.");
            } else {
                setQuoteData(null);
                setInfoMessage("Folio externo detectado. Ingresa el monto acordado.");
            }
        } catch (err) {
            console.error("Error en búsqueda:", err);
        } finally {
            setSearching(false);
        }
    }, [getQuoteByFolio]);

    useEffect(() => {
        if (queryFolio) {
            const f = queryFolio.toUpperCase();
            setFolio(f);
            autoSearch(f);
        }
    }, [queryFolio, autoSearch]);

    const handleAddToBag = () => {
        if (!folio || !montoManual) return;

        // Si no hay datos en DB, usamos valores por defecto para el folio externo
        addToCart({
            experienceId: quoteData?.folio || folio.toUpperCase(),
            title: quoteData?.experiencia_title || `Reserva Personalizada: ${folio.toUpperCase()}`,
            destinationName: "Aventura Viva Trip",
            price: Number(montoManual),
            personas: quoteData ? (parseInt(quoteData.personas) || 1) : 1,
            fecha: new Date().toISOString().split('T')[0],
            description: quoteData ? `Cliente: ${quoteData.nombre}` : `Folio de seguimiento: ${folio.toUpperCase()}`
        });

        router.push("/cart");
    };

    return (
        <div className="container mx-auto px-4 max-w-5xl animate-in fade-in duration-700">
            <div className="bg-white shadow-2xl border border-gray-200 rounded-sm overflow-hidden grid md:grid-cols-2 min-h-[650px]">

                {/* LADO IZQUIERDO: BRANDING VIVA TRIP */}
                <div className="relative hidden md:block bg-[#212121]">
                    <img
                        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                        alt="Viaje Adventure"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <div className="relative z-10 p-12 text-white h-full flex flex-col justify-between">
                        <div>
                            <div className="h-1.5 w-16 bg-[#FF9800] mb-8" />
                            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-tight">
                                Paga tu <br /> <span className="text-[#03A9F4]">Aventura</span>
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-[#03A9F4]">
                                <ShieldCheck size={24} />
                                <span className="text-xs font-bold uppercase tracking-widest">Pago 100% Seguro</span>
                            </div>
                            <p className="text-[11px] uppercase tracking-[0.2em] opacity-70 leading-relaxed font-medium">
                                Valida tu presupuesto personalizado e inicia tu viaje con el respaldo de Viva Trip México.
                            </p>
                        </div>
                    </div>
                </div>

                {/* LADO DERECHO: FORMULARIO INTEGRAL */}
                <div className="p-8 md:p-14 flex flex-col justify-center bg-white">
                    <div className="mb-10">
                        <h1 className="text-xs font-black text-[#212121] uppercase tracking-[0.4em] mb-2">Detalles de Pago</h1>
                        <div className="h-1 w-10 bg-[#03A9F4]" />
                    </div>

                    <div className="space-y-8">
                        {/* INPUT FOLIO SIEMPRE VISIBLE */}
                        <div className="relative group">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Folio de Cotización</label>
                            <div className="flex items-center gap-3 border-b-2 border-gray-100 group-focus-within:border-[#03A9F4] transition-all">
                                <input
                                    type="text"
                                    placeholder="WNDR-XXXXX"
                                    value={folio}
                                    onChange={(e) => setFolio(e.target.value)}
                                    onBlur={() => autoSearch(folio)}
                                    className="w-full bg-transparent py-4 outline-none text-2xl font-mono uppercase tracking-widest placeholder:text-gray-200"
                                    required
                                />
                                {searching ? <Loader2 className="animate-spin text-[#03A9F4]" /> : <Search size={20} className="text-gray-300" />}
                            </div>

                            {infoMessage && (
                                <div className={`mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter ${quoteData ? 'text-emerald-600' : 'text-orange-500'}`}>
                                    {quoteData ? <ShieldCheck size={14} /> : <Info size={14} />}
                                    {infoMessage}
                                </div>
                            )}
                        </div>

                        {/* DATOS DE LA DB (Opcional - solo si existe) */}
                        {quoteData && (
                            <div className="p-6 bg-blue-50/50 border-l-4 border-[#03A9F4] rounded-r-md animate-in slide-in-from-left-2 duration-300">
                                <span className="text-[9px] font-black text-[#03A9F4] uppercase tracking-widest block mb-1">Pasajero Titular</span>
                                <p className="text-xl font-bold italic text-[#212121] uppercase tracking-tight">{quoteData.nombre}</p>
                                <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-widest">{quoteData.experiencia_title}</p>
                            </div>
                        )}

                        {/* MONTO SIEMPRE VISIBLE */}
                        <div className="pt-4">
                            <label className="text-[10px] font-black text-[#212121] uppercase tracking-widest block mb-2">Inversión Total Acordada</label>
                            <div className="flex items-center gap-2 border-b-2 border-gray-100 focus-within:border-[#FF9800] transition-all">
                                <span className="text-2xl font-light text-gray-400">$</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full py-4 text-5xl font-black text-[#212121] outline-none bg-transparent tracking-tighter"
                                    value={montoManual}
                                    onChange={(e) => setMontoManual(e.target.value)}
                                />
                                <span className="text-sm font-black text-[#212121]">MXN</span>
                            </div>
                        </div>

                        {/* BOTÓN AGREGAR (Color naranja Viva Trip) */}
                        <button
                            onClick={handleAddToBag}
                            disabled={!folio || !montoManual || searching}
                            className="w-full bg-[#FF9800] text-white py-5 rounded-sm font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-orange-200 hover:bg-[#212121] transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-30 disabled:grayscale"
                        >
                            <ShoppingCart size={18} /> Añadir al Carrito
                        </button>
                    </div>

                    <div className="mt-12 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-4 opacity-40 grayscale">
                            <img src="/logos/secure-payment.png" alt="Secure" className="h-6" />
                            <img src="/logos/etomin.png" alt="Etomin" className="h-4" />
                        </div>
                        <p className="mt-4 text-[9px] text-gray-400 leading-relaxed uppercase tracking-tighter font-bold italic">
                            Esta plataforma utiliza encriptación SSL de 256 bits. El folio es indispensable para el seguimiento y gestión de su reserva personalizada.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PayQuotePage() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#F5F5F5] pt-32 pb-20 overflow-hidden" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'
            }}>
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="animate-spin text-white mb-4" size={40} />
                        <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Cargando Sistema</span>
                    </div>
                }>
                    <PayQuoteContent />
                </Suspense>
            </div>
            <Footer />
        </>
    );
}