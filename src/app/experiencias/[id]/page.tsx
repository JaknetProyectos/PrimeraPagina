"use client";

import { useParams } from "next/navigation";
import { useExperience } from "@/hooks/useExperience";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { saveReservation } from "@/lib/reservations";
import { CheckCircle, ChevronLeft, ChevronRight, CreditCard, Lock, X } from "lucide-react";
import { sendConfirmationEmail } from "@/lib/email";
import { useCart } from "@/context/cartContext";
import Loading from "@/components/Loading";
import { checkout } from "@/lib/cart";

export default function ExperienceDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const { addToCart } = useCart();
    const { data, loading, error } = useExperience(id);

    const [selectedImage, setSelectedImage] = useState(0);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);



    const [form, setForm] = useState({
        fecha: "",
        personas: "1",
        nombre: "",
        email: "",
        telefono: "",
        direccion: "", // Requerido para Etomin
        cp: "",        // Requerido para Etomin
    });

    const [card, setCard] = useState({
        number: "",
        name: "",
        month: "",
        year: "",
        cvv: "",
    });

    const [successOpen, setSuccessOpen] = useState(false);
    const [reservationData, setReservationData] = useState<any>(null);

    if (loading) {
        return <Loading />;
    }

    if (error || !data) {
        return (
            <div className="p-10 text-center text-red-500">
                Error al cargar la experiencia
            </div>
        );
    }

    const priceNumber = Number(data.price);
    const total = priceNumber * Number(form.personas || 1);
    const images = data.images?.length
        ? data.images
        : [data.image]; // fallback temporal

    // 👉 navegación galería
    const nextImage = () =>
        setSelectedImage((prev) => (prev + 1) % images.length);

    const prevImage = () =>
        setSelectedImage((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );

    // 👉 submit reserva
    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingCheckout(true);

        try {
            // Creamos un "item de carrito" temporal para la función checkout
            const tempCartItem = [{
                experienceId: data.id,
                title: data.title,
                destinationName: data.destinationName ?? "",
                price: priceNumber,
                personas: Number(form.personas),
                fecha: form.fecha
            }];

            // Usamos la función checkout que ya tiene integrada la lógica de Etomin,
            // Guardado en DB y Envío de Email de Ticket.
            const results = await checkout(tempCartItem, form, card);

            setReservationData(results);
            setBookingOpen(false);
            setSuccessOpen(true);
        } catch (err: any) {
            console.error("Error en reservación:", err);
            alert(err.message || "No pudimos procesar tu pago. Inténtalo de nuevo.");
        } finally {
            setLoadingCheckout(false);
        }
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-background pt-20">
                <div className="container mx-auto px-4 py-10">

                    {/* 🔥 GRID PRINCIPAL */}
                    <div className="grid lg:grid-cols-2 gap-10">

                        {/* 🖼 IZQUIERDA → GALERÍA */}
                        <div>
                            {/* Imagen principal */}
                            <img
                                src={images[selectedImage]}
                                onClick={() => setGalleryOpen(true)}
                                className="w-full h-[420px] object-cover rounded-xl cursor-pointer"
                            />

                            {/* Thumbnails */}
                            <div className="flex gap-2 mt-3">
                                {images.map((img: any, i: number) => (
                                    <img
                                        key={i}
                                        src={img}
                                        onClick={() => setSelectedImage(i)}
                                        className={`h-20 w-20 object-cover rounded cursor-pointer border ${selectedImage === i ? "border-[#ae4e68]" : "border-gray-200"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* 🧾 DERECHA → INFO + COMPRA */}
                        <div className="flex flex-col gap-6">

                            {/* INFO */}
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{data.title}</h1>

                                <p className="text-sm text-gray-500 mb-2">
                                    📍 {data.destinationName}
                                </p>

                                <div className="flex gap-4 text-sm text-gray-600 mb-4">
                                    <span>⏱ {data.duration}</span>
                                    <span>🏷 {data.category}</span>
                                </div>

                                <p className="text-gray-600 leading-relaxed">
                                    {data.description}
                                </p>
                            </div>

                            {/* 🔥 CARD COMPRA (STICKY) */}
                            <div className="border rounded-xl p-6 shadow-md bg-white sticky top-24">

                                <div className="text-3xl font-bold text-black mb-1">
                                    {data.priceFormatted}
                                    <div className="text-sm text-gray-500 mb-4">
                                        (IVA 16%) incluido
                                    </div>
                                </div>

                                <div className="text-sm text-gray-500 mb-4">
                                    por persona
                                </div>

                                <button
                                    onClick={() => setBookingOpen(true)}
                                    className="w-full bg-[#ae4e68] text-white mb-4 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                                >
                                    Reservar ahora
                                </button>

                                <button
                                    onClick={() => addToCart({
                                        experienceId: data.id,
                                        title: data.title,
                                        destinationName: data.destinationName ?? "",
                                        price: data.price,
                                        personas: 1,
                                    })}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                                >
                                    Agregar al carrito
                                </button>

                                {/* Confianza tipo e-commerce */}
                                <div className="mt-4 space-y-2 text-sm text-gray-500">
                                    <p>✔ Confirmación rápida</p>
                                    <p>✔ Pago offline seguro</p>
                                    <p>✔ Soporte 24/7</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* 🔽 SECCIÓN EXTRA (debajo) */}
                    <div className="mt-16 w-full">
                        <h2 className="text-xl font-semibold mb-4">
                            Detalles de la experiencia
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            {data.description}
                        </p>

                        <hr className="mt-3 mb-3" />

                        <p className="text-gray-600 text-justify leading-relaxed">
                            Todos nuestros servicios de experiencias están sujetos a confirmación previa de disponibilidad por parte de nuestro equipo. La confirmación se realizará una vez verificados los espacios disponibles para la fecha seleccionada por el cliente. <br />
                        </p>

                        <p className="text-gray-600 text-justify leading-relaxed">
                            En caso de que el cupo se encuentre lleno o no sea posible ofrecer el servicio en la fecha solicitada, se notificará oportunamente al cliente para que pueda: <br />

                            a) Elegir una nueva fecha disponible; o bien, <br />
                            b) Seleccionar otra experiencia equivalente en la misma zona o de características similares a la previamente contratada.
                        </p>

                        <hr className="mt-3 mb-3" />

                        <p className="text-justify">
                            En cumplimiento con la Ley Federal de Protección al Consumidor, el cliente tiene derecho a ser informado con claridad sobre las condiciones, fechas y características del servicio antes de su realización. Asimismo, cualquier cambio o reprogramación se llevará a cabo con previo consentimiento del cliente.
                        </p>
                    </div>

                </div>
            </div>


            <Footer />

            {/* 🔥 MODAL GALERÍA */}
            {galleryOpen && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
                    <button
                        onClick={() => setGalleryOpen(false)}
                        className="absolute top-6 right-6 text-white"
                    >
                        <X size={30} />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-6 text-white"
                    >
                        <ChevronLeft size={40} />
                    </button>

                    <img
                        src={images[selectedImage]}
                        className="max-h-[80vh] rounded-lg"
                    />

                    <button
                        onClick={nextImage}
                        className="absolute right-6 text-white"
                    >
                        <ChevronRight size={40} />
                    </button>
                </div>
            )}

            {/* 🔥 MODAL RESERVA */}
            {bookingOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-8 relative my-8">
                        <button onClick={() => setBookingOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-black">
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl font-bold mb-6 text-gray-900">Finalizar Reserva</h3>

                        <form onSubmit={handleBooking} className="space-y-4">
                            {/* Datos de la Experiencia */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-gray-500">Fecha</label>
                                    <input type="date" required value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-[#ae4e68]" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-gray-500">Personas</label>
                                    <input type="number" min="1" value={form.personas} onChange={(e) => setForm({ ...form, personas: e.target.value })} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-[#ae4e68]" />
                                </div>
                            </div>

                            {/* Datos de Contacto */}
                            <div className="space-y-3">
                                <input type="text" placeholder="Nombre completo" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full border p-2.5 rounded-lg" />
                                <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border p-2.5 rounded-lg" />
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" placeholder="Dirección" required value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} className="w-full border p-2.5 rounded-lg" />
                                    <input type="text" placeholder="C.P." required value={form.cp} onChange={(e) => setForm({ ...form, cp: e.target.value })} className="w-full border p-2.5 rounded-lg" />
                                </div>
                            </div>

                            {/* Datos de Tarjeta */}
                            <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-100">
                                <h4 className="text-sm font-bold flex items-center gap-2"><CreditCard size={16} /> Pago Seguro con Etomin</h4>
                                <input type="text" placeholder="Número de Tarjeta" required maxLength={16} value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} className="w-full border p-2.5 rounded-lg bg-white" />
                                <div className="grid grid-cols-3 gap-2">
                                    <input type="text" placeholder="MM" required maxLength={2} value={card.month} onChange={(e) => setCard({ ...card, month: e.target.value })} className="border p-2.5 rounded-lg text-center bg-white" />
                                    <input type="text" placeholder="AA" required maxLength={2} value={card.year} onChange={(e) => setCard({ ...card, year: e.target.value })} className="border p-2.5 rounded-lg text-center bg-white" />
                                    <input type="password" placeholder="CVV" required maxLength={4} value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} className="border p-2.5 rounded-lg text-center bg-white" />
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-2 border-t mt-4">
                                <span className="text-gray-600">Total a pagar:</span>
                                <span className="text-xl font-bold text-[#ae4e68]">${total.toLocaleString()} MXN</span>
                            </div>

                            <button
                                disabled={loadingCheckout}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition disabled:opacity-50"
                            >
                                {loadingCheckout ? "Procesando..." : <><Lock size={18} /> Pagar ahora</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL DE ÉXITO (TICKET UNIFICADO) */}
            {successOpen && reservationData && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[60] p-4">
                    <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="bg-green-500 text-white p-8 text-center">
                            <CheckCircle size={60} className="mx-auto mb-4" />
                            <h3 className="text-2xl font-bold">¡Todo listo!</h3>
                            <p className="opacity-90">Tu pago ha sido procesado</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-center text-gray-500 text-sm">Se ha enviado un ticket con los detalles a tu correo electrónico.</p>
                            <button
                                onClick={() => setSuccessOpen(false)}
                                className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-black transition"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
