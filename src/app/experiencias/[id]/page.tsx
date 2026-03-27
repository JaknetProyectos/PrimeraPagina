"use client";

import { useParams } from "next/navigation";
import { useExperience } from "@/hooks/useExperience";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { saveReservation } from "@/lib/reservations";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { sendConfirmationEmail } from "@/lib/email";
import { useCart } from "@/context/cartContext";

export default function ExperienceDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const { addToCart } = useCart();

    const { data, loading, error } = useExperience(id);

    const [selectedImage, setSelectedImage] = useState(0);
    const [galleryOpen, setGalleryOpen] = useState(false);

    const [bookingOpen, setBookingOpen] = useState(false);
    const [form, setForm] = useState({
        fecha: "",
        personas: "1",
        nombre: "",
        email: "",
        telefono: "",
    });

    const [successOpen, setSuccessOpen] = useState(false);
    const [reservationData, setReservationData] = useState<any>(null);

    if (loading) {
        return <div className="p-10 text-center">Cargando experiencia...</div>;
    }

    if (error || !data) {
        return (
            <div className="p-10 text-center text-red-500">
                Error al cargar la experiencia
            </div>
        );
    }

    const priceNumber = Number(data.priceFormatted.replace(/[^0-9]/g, ""));
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

        try {
            const reservation = await saveReservation({
                ...form,
                activityTitle: data.title,
                destinationName: data.destinationName,
                price: total,
            });

            await sendConfirmationEmail(form);

            setReservationData(reservation);
            setBookingOpen(false);
            setSuccessOpen(true);
        } catch (err) {
            console.error(err);
            alert("Error al guardar la reservación");
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
                                </div>

                                <div className="text-sm text-gray-500 mb-4">
                                    por persona
                                </div>

                                <button
                                    onClick={() => setBookingOpen(true)}
                                    className="w-full bg-[#ae4e68] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                                >
                                    Reservar ahora
                                </button>

                                <button
                                    onClick={() =>
                                        addToCart({
                                            experienceId: data.id,
                                            title: data.title,
                                            destinationName: data.destinationName ?? "",
                                            price: data.price,
                                            personas: 1,
                                        })
                                    }
                                    className="w-full bg-blue-600 mt-5 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
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
                    <div className="mt-16 max-w-3xl">
                        <h2 className="text-xl font-semibold mb-4">
                            Detalles de la experiencia
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            {data.description}
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setBookingOpen(false)}
                            className="absolute top-4 right-4"
                        >
                            <X />
                        </button>

                        <h3 className="text-xl font-bold mb-4">
                            Reservar {data.title}
                        </h3>

                        <form onSubmit={handleBooking} className="space-y-3">
                            <input
                                type="date"
                                required
                                value={form.fecha}
                                onChange={(e) =>
                                    setForm({ ...form, fecha: e.target.value })
                                }
                                className="w-full border p-2 rounded"
                            />

                            <input
                                type="number"
                                min="1"
                                value={form.personas}
                                onChange={(e) =>
                                    setForm({ ...form, personas: e.target.value })
                                }
                                className="w-full border p-2 rounded"
                            />

                            <input
                                type="text"
                                placeholder="Nombre"
                                required
                                onChange={(e) =>
                                    setForm({ ...form, nombre: e.target.value })
                                }
                                className="w-full border p-2 rounded"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                required
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                className="w-full border p-2 rounded"
                            />

                            <input
                                type="tel"
                                placeholder="Teléfono"
                                required
                                onChange={(e) =>
                                    setForm({ ...form, telefono: e.target.value })
                                }
                                className="w-full border p-2 rounded"
                            />

                            <div className="bg-gray-100 p-3 rounded text-sm">
                                <div>Precio por persona: {data.priceFormatted}</div>
                                <div>Personas: {form.personas}</div>

                                <div className="font-bold text-lg mt-2">
                                    Total: ${total}
                                </div>
                            </div>

                            <button className="w-full bg-[#ae4e68] text-white py-2 rounded">
                                Confirmar reservación
                            </button>


                        </form>
                    </div>
                </div>
            )}

            {successOpen && reservationData && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-xl max-w-md w-full overflow-hidden shadow-xl">

                        {/* Header tipo ticket */}
                        <div className="bg-[#ae4e68] text-white p-4">
                            <h3 className="text-lg font-semibold">🎟 Reservación Confirmada</h3>
                            <p className="text-sm opacity-80">
                                Número de orden : {String(reservationData.id).toUpperCase()}
                            </p>
                        </div>

                        <div className="p-5 space-y-4">

                            {/* Experiencia */}
                            <div>
                                <p className="text-sm text-gray-500">Experiencia</p>
                                <p className="font-medium">{reservationData.activity_title}</p>
                            </div>

                            {/* Destino */}
                            <div>
                                <p className="text-sm text-gray-500">Destino</p>
                                <p className="font-medium">{reservationData.destination_name}</p>
                            </div>

                            {/* Fecha */}
                            <div>
                                <p className="text-sm text-gray-500">Fecha</p>
                                <p className="font-medium">{reservationData.fecha}</p>
                            </div>

                            {/* Personas */}
                            <div>
                                <p className="text-sm text-gray-500">Personas</p>
                                <p className="font-medium">{reservationData.personas}</p>
                            </div>

                            {/* Precio */}
                            <div className="border-t pt-3">
                                <div className="flex justify-between text-sm">
                                    <span>Precio por persona</span>
                                    <span>${Math.floor(reservationData.price / reservationData.personas)}</span>
                                </div>

                                <div className="flex justify-between font-bold text-lg mt-1">
                                    <span>Total</span>
                                    <span>${reservationData.price}</span>
                                </div>
                            </div>

                            {/* Estado */}
                            <div className="text-xs text-yellow-600 bg-yellow-100 p-2 rounded text-center">
                                Estado: Pendiente de confirmación de pago
                            </div>

                            {/* Email */}
                            <p className="text-xs text-gray-500 text-center">
                                📧 Se envió un correo con los detalles
                            </p>

                            {/* Botón */}
                            <button
                                onClick={() => setSuccessOpen(false)}
                                className="w-full bg-[#ae4e68] text-white py-2 rounded-lg"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
