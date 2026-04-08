"use client";

import { useParams } from "next/navigation";
import { useExperience } from "@/hooks/useExperience";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Check, ChevronLeft, ChevronRight, ShoppingCart, Users, X } from "lucide-react";
import { useCart } from "@/context/cartContext";
import Loading from "@/components/Loading";
import { checkout } from "@/lib/cart";
import { useTranslations } from 'next-intl';

export default function ExperienceDetailPage() {
    const t = useTranslations('ExperienceDetail');
    const params = useParams();
    const id = params.id as string;
    const { addToCart } = useCart();
    const { data, loading, error } = useExperience(id);

    const [selectedImage, setSelectedImage] = useState(0);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);

    const [selection, setSelection] = useState({
        fecha: "",
        personas: 1,
    });

    const [form, setForm] = useState({
        fecha: "",
        personas: "1",
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        cp: "",
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
    const [addedToCart, setAddedToCart] = useState(false);

    if (loading) {
        return <Loading />;
    }

    if (error || !data) {
        return (
            <div className="p-10 text-center text-red-500">
                {t('error_loading')}
            </div>
        );
    }

    const priceNumber = Number(data.price);
    const total = priceNumber * selection.personas; // Usando selection.personas para coherencia con el subtotal visual
    const images = data.images?.length
        ? data.images
        : [data.image];

    const nextImage = () =>
        setSelectedImage((prev) => (prev + 1) % images.length);

    const prevImage = () =>
        setSelectedImage((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );

    const handleAddToCart = () => {
        if (!selection.fecha) {
            alert(t('alerts.select_date'));
            return;
        }

        addToCart({
            experienceId: data.id,
            title: data.title,
            destinationName: data.destinationName ?? "",
            price: Number(data.price),
            personas: selection.personas,
            fecha: selection.fecha,
        });

        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-background pt-20">
                <div className="container mx-auto px-4 py-10">

                    <div className="grid lg:grid-cols-2 gap-10">

                        {/* 🖼 IZQUIERDA → GALERÍA */}
                        <div>
                            <img
                                src={images[selectedImage]}
                                onClick={() => setGalleryOpen(true)}
                                className="w-full h-[420px] object-cover rounded-xl cursor-pointer"
                            />

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

                            {/* 🔥 CARD COMPRA */}
                            <div className="border border-gray-100 rounded-lg p-8 shadow-sm bg-white sticky top-28 space-y-6">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-sm text-gray-400 font-bold uppercase">{t('purchase_card.price_from')}</p>
                                        <div className="text-4xl font-black text-gray-900">MXN {data.priceFormatted}</div>
                                    </div>
                                    <div className="text-right text-xs text-gray-400 font-medium">
                                        {t('purchase_card.tax_note')}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-gray-50">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Calendar size={16} /> {t('purchase_card.labels.date')}
                                        </label>
                                        <input
                                            type="date"
                                            min={new Date().toISOString().split('T')[0]}
                                            value={selection.fecha}
                                            onChange={(e) => setSelection({ ...selection, fecha: e.target.value })}
                                            className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium outline-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Users size={16} /> {t('purchase_card.labels.people')}
                                        </label>
                                        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-1">
                                            <button
                                                onClick={() => setSelection(s => ({ ...s, personas: Math.max(1, s.personas - 1) }))}
                                                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-xl"
                                            >-</button>
                                            <span className="flex-grow text-center font-bold">{selection.personas}</span>
                                            <button
                                                onClick={() => setSelection(s => ({ ...s, personas: s.personas + 1 }))}
                                                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-xl"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <div className="flex justify-between mb-4 text-sm font-bold">
                                        <span className="text-gray-400 uppercase">{t('purchase_card.subtotal')}</span>
                                        {/* Modificación solicitada: Separado por comas */}
                                        <span className="text-xl text-gray-900">${total.toLocaleString('en-US')}</span>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${addedToCart
                                            ? "bg-green-500 text-white"
                                            : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
                                            }`}
                                    >
                                        {addedToCart ? (
                                            <><Check /> {t('purchase_card.buttons.added')}</>
                                        ) : (
                                            <><ShoppingCart size={20} /> {t('purchase_card.buttons.add_to_cart')}</>
                                        )}
                                    </button>
                                </div>

                                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                    {t('purchase_card.confirmation_note')}
                                </p>

                                <div className="mt-4 space-y-2 text-sm text-gray-500">
                                    <p>✔ {t('purchase_card.trust_badges.quick')}</p>
                                    <p>✔ {t('purchase_card.trust_badges.secure')}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* 🔽 SECCIÓN DETALLES Y LEGALES */}
                    <div className="mt-16 w-full mx-auto">

                        <section className="mb-12">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#03A9F4] mb-4">
                                {t('sections.description_title')}
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg font-light">
                                {data.description}
                            </p>
                        </section>

                        <div className="bg-white border border-gray-200 rounded-sm p-8 w-full shadow-sm">
                            <h3 className="text-lg font-bold text-[#212121] mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-[#03A9F4] rounded-full"></span>
                                {t('sections.guidelines.title')}
                            </h3>

                            <div className="space-y-6 text-sm text-gray-600 leading-7">

                                <p className="text-justify">
                                    {t.rich('sections.guidelines.p1', {
                                        bold: (chunks) => <span className="text-[#212121] font-bold underline decoration-[#03A9F4]/30">{chunks}</span>
                                    })}
                                </p>

                                <div className="bg-gray-50 p-6 border-l-4 border-gray-200">
                                    <p className="mb-4 font-medium text-[#212121]">
                                        {t('sections.guidelines.options_title')}
                                    </p>
                                    <ul className="space-y-3 list-none ml-2">
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#03A9F4] font-bold text-xs mt-1">A)</span>
                                            <span>{t.rich('sections.guidelines.option_a', {
                                                bold: (chunks) => <span className="text-[#212121] font-semibold">{chunks}</span>
                                            })}</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#03A9F4] font-bold text-xs mt-1">B)</span>
                                            <span>{t.rich('sections.guidelines.option_b', {
                                                bold: (chunks) => <span className="text-[#212121] font-semibold">{chunks}</span>
                                            })}</span>
                                        </li>
                                    </ul>
                                </div>

                                <footer className="pt-6 border-t border-gray-100 italic text-xs text-gray-500 leading-relaxed">
                                    <p>
                                        <strong className="text-gray-700 not-italic uppercase tracking-tighter mr-1">{t('sections.legal.label')}:</strong>
                                        {t.rich('sections.legal.text', {
                                            strong: (chunks) => <strong>{chunks}</strong>
                                        })}
                                    </p>
                                </footer>

                            </div>
                        </div>
                    </div>

                </div>
            </div >


            <Footer />

            {/* 🔥 MODAL GALERÍA */}
            {
                galleryOpen && (
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
                )
            }
        </>
    );
}