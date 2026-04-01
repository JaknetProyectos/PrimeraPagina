"use client";
import { Suspense, useEffect, useState } from "react";
import { useQuotes } from "@/hooks/useCotizaciones";
import { useCart } from "@/context/cartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, Search, ShoppingCart, AlertCircle, ShieldCheck, CreditCard } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function PayQuoteContent() {
    const searchParams = useSearchParams();
    const queryFolio = searchParams.get('folio');

    const [folio, setFolio] = useState("");
    const [quoteData, setQuoteData] = useState<any>(null);
    const [error, setError] = useState("");
    const [searching, setSearching] = useState(false);
    const [montoManual, setMontoManual] = useState<string>("");

    const { getQuoteByFolio } = useQuotes();
    const { addToCart } = useCart();
    const router = useRouter();

    // Si viene el folio por URL (desde el link del correo)


    const autoSearch = async (f: string) => {
        setSearching(true);
        const data = await getQuoteByFolio(f);
        if (data) {
            setQuoteData(data);
            setMontoManual(data.price?.toString() || "");
        }
        setSearching(false);
    };

    useEffect(() => {
        if (queryFolio) {
            setFolio(queryFolio.toUpperCase());
            autoSearch(queryFolio.toUpperCase());
        }
    }, [queryFolio, autoSearch]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setQuoteData(null);
        setSearching(true);

        try {
            const data = await getQuoteByFolio(folio.trim().toUpperCase());

            if (!data) {
                setError("El folio ingresado no existe en nuestro sistema.");
            } else if (data.estado !== 'confirmado' && data.estado !== 'pagado') {
                setError("Esta cotización aún está en revisión. Te avisaremos por correo.");
            } else {
                setQuoteData(data);
                setMontoManual(data.price?.toString() || "");
            }
        } catch (err) {
            setError("Error al conectar con el servidor.");
        } finally {
            setSearching(false);
        }
    };

    const handleAddToBag = () => {
        if (!quoteData) return;

        // Mapeo exacto para evitar NaNs y nulos
        addToCart({
            experienceId: quoteData.folio, // Usamos el folio como ID
            title: `Pago Reserva: ${quoteData.folio}`,
            destinationName: quoteData.experiencia_title || "Aventura a Medida",
            price: Number(montoManual) || Number(quoteData.price),
            personas: parseInt(quoteData.personas) || 1,
            fecha: new Date().toISOString().split('T')[0],
            description: `Cliente: ${quoteData.nombre}`
        });

        router.push("/cart");
    };

    return (
        <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white shadow-2xl border border-gray-200 rounded-sm overflow-hidden grid md:grid-cols-2 min-h-[600px]">

                {/* LADO IZQUIERDO: CONTEXTO */}
                <div className="relative hidden md:block bg-[#212121]">
                    <img
                        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                        alt="Adventure"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                    <div className="relative z-10 p-12 text-white h-full flex flex-col justify-between">
                        <div>
                            <div className="h-1 w-12 bg-[#03A9F4] mb-6" />
                            <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
                                Tu próxima <br /> <span className="text-[#03A9F4]">Experiencia</span>
                            </h2>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 leading-relaxed font-bold">
                            Ingresa el folio enviado a tu correo para cargar el presupuesto acordado con tu asesor y proceder al pago seguro.
                        </p>
                    </div>
                </div>

                {/* LADO DERECHO: FORMULARIO */}
                <div className="p-8 md:p-14 flex flex-col justify-center bg-gray-50/50">
                    <div className="mb-10">
                        <h1 className="text-sm font-black text-[#212121] uppercase tracking-[0.3em] mb-2">Validación de Folio</h1>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Introduce el código WNDR-XXXXX</p>
                    </div>

                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="FOLIO DE COTIZACIÓN"
                                value={folio}
                                onChange={(e) => setFolio(e.target.value)}
                                className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-4 outline-none focus:border-[#03A9F4] transition-colors text-2xl font-mono uppercase tracking-widest placeholder:text-gray-200"
                                required
                            />
                        </div>

                        <button
                            disabled={searching}
                            className="w-full bg-[#212121] text-white py-5 rounded-sm font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:bg-[#03A9F4] transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            {searching ? <Loader2 className="animate-spin" /> : <><Search size={18} /> Consultar Presupuesto</>}
                        </button>
                    </form>

                    <div className="mt-10">
                        {error && (
                            <div className="flex items-center gap-3 p-5 bg-red-50 border-l-4 border-red-500 text-red-700 text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        {quoteData && (
                            <div className="border-2 border-[#03A9F4] rounded-sm p-8 bg-white shadow-xl animate-in zoom-in-95 duration-300">
                                <div className="flex items-center gap-2 mb-6 text-[#03A9F4]">
                                    <ShieldCheck size={20} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Presupuesto Confirmado</span>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Pasajero Titular</label>
                                        <p className="text-xl font-bold italic text-[#212121] uppercase tracking-tighter">{quoteData.nombre}</p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <label className="text-[9px] font-black text-[#03A9F4] uppercase block mb-2">Monto a Pagar (MXN)</label>
                                        <div className="relative">
                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl font-light text-gray-300">$</span>
                                            <input
                                                type="number"
                                                className="w-full pl-6 text-4xl font-black text-[#212121] outline-none bg-transparent"
                                                value={montoManual}
                                                onChange={(e) => setMontoManual(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToBag}
                                    className="w-full bg-[#03A9F4] text-white py-5 rounded-sm font-black uppercase text-xs tracking-[0.2em] hover:bg-[#212121] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#03A9F4]/20"
                                >
                                    <CreditCard size={18} /> Agregar al carrito
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 pt-6 border-t border-gray-100">
                        <p className="text-[9px] text-gray-400 leading-relaxed text-justify uppercase tracking-tighter font-medium italic">
                            Las cotizaciones personalizadas son válidas por 48 horas. Una vez procesado el pago, recibirá su voucher digital y contrato de servicios en su correo electrónico.
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
                <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="animate-spin text-white" size={40} /></div>}>
                    <PayQuoteContent />
                </Suspense>
            </div>
            <Footer />
        </>
    );
}