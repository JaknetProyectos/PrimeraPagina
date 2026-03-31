"use client";
import { useEffect, useState } from "react";
import { useQuotes } from "@/hooks/useCotizaciones";
import { useCart } from "@/context/cartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, Search, ShoppingCart, AlertCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function PayQuotePage() {
    const [quoteId, setQuoteId] = useState("");
    const searchParams = useSearchParams();
    const queryId = searchParams.get('quoteId');
    const [quoteData, setQuoteData] = useState<any>(null);
    const [error, setError] = useState("");
    const [searching, setSearching] = useState(false);

    const { getQuote } = useQuotes();
    const { addToCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        if (queryId) {
            setQuoteId(queryId);
            // Opcional: disparar la búsqueda automáticamente
            // triggerSearch(queryId); 
        }
    }, [queryId]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setQuoteData(null);
        setSearching(true);

        try {
            const data = await getQuote(quoteId.trim());

            if (!data) {
                setError("ID de cotización no encontrado. Verifique el código enviado a su correo.");
            } else if (!data.price || data.estado !== 'confirmado') {
                setError("Esta cotización se encuentra en proceso de revisión por nuestro equipo técnico.");
                setQuoteData(data);
            } else {
                setQuoteData(data);
            }
        } catch (err) {
            setError("Error en la conexión. Intente más tarde.");
        } finally {
            setSearching(false);
        }
    };

    const handleAddToBag = () => {
        if (!quoteData) return;

        addToCart({
            experienceId: `QUOTE-${quoteData.id.substring(0, 8)}`,
            title: `Plan Personalizado: ${quoteData.nombre}`,
            destinationName: "Aventura a Medida",
            price: Number(quoteData.price),
            personas: quoteData.personas.includes("+4") ? 4 : (quoteData.personas === "Pareja" ? 2 : 1),
            fecha: new Date().toISOString().split('T')[0],
        });

        router.push("/cart");
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#F5F5F5] pt-32 pb-20" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
            }}>
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="bg-white shadow-md border border-gray-200 rounded-sm overflow-hidden grid md:grid-cols-2">

                        {/* LADO IZQUIERDO: IMAGEN Y CONTEXTO */}
                        <div className="relative hidden md:block bg-[#1976D2]">
                            <img
                                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                                alt="Adventure"
                                className="absolute inset-0 w-full h-full object-cover opacity-60"
                            />
                            <div className="relative z-10 p-12 text-white h-full flex flex-col justify-end">
                                <h2 className="text-3xl font-bold mb-4">Finaliza tu Reserva</h2>
                                <p className="text-sm opacity-90 leading-relaxed">
                                    Utiliza el identificador único proporcionado por nuestro equipo para cargar tu itinerario personalizado y proceder al pago seguro.
                                </p>
                            </div>
                        </div>

                        {/* LADO DERECHO: FORMULARIO MATERIAL */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="mb-8">
                                <h1 className="text-2xl font-medium text-[#212121] mb-2 uppercase tracking-wide">Validar Cotización</h1>
                                <div className="h-1 w-16 bg-[#1976D2]"></div>
                            </div>

                            <form onSubmit={handleSearch} className="space-y-6">
                                <div className="relative">
                                    <label className="text-[11px] font-bold text-[#1976D2] uppercase mb-1 block">Número de Folio / ID</label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese su ID de cotización"
                                        value={quoteId}
                                        onChange={(e) => setQuoteId(e.target.value)}
                                        className="w-full border-b-2 border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-[#1976D2] transition-colors rounded-t-sm text-sm"
                                        required
                                    />
                                </div>

                                <button
                                    disabled={searching}
                                    className="w-full bg-[#1976D2] text-white py-3 px-6 rounded-sm font-bold uppercase text-xs tracking-widest shadow-sm hover:shadow-lg hover:bg-[#1565C0] transition-all flex items-center justify-center gap-2"
                                >
                                    {searching ? <Loader2 className="animate-spin w-4 h-4" /> : <><Search size={16} /> Consultar Folio</>}
                                </button>
                            </form>

                            {/* ESTADOS DE RESPUESTA */}
                            <div className="mt-8">
                                {error && (
                                    <div className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs">
                                        <AlertCircle size={16} className="shrink-0" />
                                        <p>{error}</p>
                                    </div>
                                )}

                                {quoteData && quoteData.estado === 'confirmado' && (
                                    <div className="border border-gray-200 rounded-sm p-6 bg-white animate-in fade-in">
                                        <div className="flex items-center gap-2 mb-4 text-[#2E7D32]">
                                            <ShieldCheck size={20} />
                                            <span className="text-xs font-bold uppercase">Cotización Validada</span>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="text-xs text-gray-500 uppercase">Titular</span>
                                                <span className="text-xs font-bold">{quoteData.nombre}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="text-xs text-gray-500 uppercase">Importe Total</span>
                                                <span className="text-sm font-bold text-[#1976D2]">${Number(quoteData.price).toLocaleString()} MXN</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleAddToBag}
                                            className="w-full border-2 border-[#1976D2] text-[#1976D2] py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-[#E3F2FD] transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart size={16} /> Agregar al Carrito
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* LEGAL */}
                            <div className="mt-12 pt-6 border-t border-gray-100">
                                <p className="text-[10px] text-gray-400 leading-relaxed text-justify uppercase tracking-tighter">
                                    Al procesar este pago, usted acepta que las cotizaciones personalizadas están sujetas a disponibilidad y cambios sin previo aviso hasta la confirmación del pago. Los datos proporcionados están protegidos bajo nuestra política de privacidad conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}