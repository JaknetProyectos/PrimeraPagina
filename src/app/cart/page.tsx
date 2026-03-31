"use client";

import { useCart } from "@/context/cartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { checkout } from "@/lib/cart";
import { useState } from "react";
import { CreditCard, Lock, CheckCircle, MapPin } from "lucide-react";
import etominLogo from "@/public/etomin.png"
import securePayment from "@/public/secure-payment.png"
import Image from "next/image";


export default function CartPage() {
    const { cart, updateItem, removeItem, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [ticket, setTicket] = useState<any[] | null>(null);

    // Datos de contacto y envío
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        telefono: "",
        pais: "México",
        calle: "",
        apartamento: "",
        ciudad: "",
        estado: "",
        cp: "",
    });

    // Datos de tarjeta (Nunca se guardan en DB, solo se pasan a Etomin)
    const [card, setCard] = useState({
        number: "",
        name: "",
        month: "",
        year: "",
        cvv: "",
    });

    const total = cart.reduce((acc, item) => acc + item.price * (item.personas || 1), 0);

    const isFormValid =
        form.nombre &&
        form.email.includes("@") &&
        form.calle &&
        form.ciudad &&
        form.estado &&
        form.cp;

    const canCheckout =
        isFormValid &&
        card.number.length >= 15 && card.cvv.length >= 3 &&
        cart.length > 0 &&
        cart.every(item => item.fecha && item.personas);

    const handleCheckout = async () => {
        try {
            setLoading(true);
            if (!canCheckout) throw Error("Por favor completa todos los datos obligatorios.");

            // CONCATENACIÓN ORDENADA: Aquí unimos todo en el campo 'direccion'
            const direccionCompleta = `
                ${form.calle} 
                ${form.apartamento ? `, Apt/Int: ${form.apartamento}` : ""} 
                , ${form.ciudad}, ${form.estado}
                , ${form.pais}
            `.replace(/\s+/g, ' ').trim();

            const dataParaEnvio = {
                ...form,
                direccion: direccionCompleta // El backend recibirá la cadena ya formateada
            };

            const result = await checkout(cart, dataParaEnvio, card);

            clearCart();
            setTicket(result);
        } catch (err: any) {
            alert(err.message || "Error al procesar el pago");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            {ticket && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-lg rounded-lg p-8 shadow-2xl text-center border-t-8 border-green-500">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">¡Pago Exitoso!</h2>
                        <p className="text-gray-600 mb-6">Hemos enviado los detalles de tu reserva a <strong>{form.email}</strong></p>

                        <div className="text-left bg-gray-50 rounded-lg p-4 mb-6 space-y-2 border border-gray-100">
                            {ticket.map((res, i) => (
                                <p key={i} className="text-sm border-b last:border-0 pb-2 mb-2 last:mb-0">
                                    <span className="block font-bold text-blue-600">ID: {res.id.split('-')[0].toUpperCase()}</span>
                                    <strong>{res.activity_title}</strong> <br />
                                    <span className="text-gray-500">{res.fecha} • {res.personas} personas</span>
                                </p>
                            ))}
                        </div>

                        <button onClick={() => window.location.href = "/"} className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-gray-800 transition">
                            Volver al inicio
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mt-20 mx-auto p-6 grid md:grid-cols-2 gap-12">
                {/* LADO IZQUIERDO: CARRITO */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold mb-6">Revisar selección</h1>
                    <div className="space-y-4">
                        {cart.map(item => (
                            <div key={item.experienceId} className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>{item.title}</span>
                                    <button onClick={() => removeItem(item.experienceId)} className="text-red-400 text-xs font-bold uppercase hover:text-red-600 transition">Quitar</button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="flex flex-col">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase">Fecha</label>
                                        <input type="date" value={item.fecha || ""} onChange={e => updateItem(item.experienceId, { fecha: e.target.value })} className="border-b border-gray-200 py-1 text-sm outline-none focus:border-blue-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase">Viajeros</label>
                                        <input type="number" min={1} value={item.personas || 1} onChange={e => updateItem(item.experienceId, { personas: Number(e.target.value) })} className="border-b border-gray-200 py-1 text-sm outline-none focus:border-blue-500" />
                                    </div>
                                </div>
                                <p className="mt-4 font-bold text-right text-blue-600 text-lg">${(item.price * (item.personas || 1)).toLocaleString()} MXN</p>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 bg-[#212121] rounded-lg flex justify-between items-center text-white shadow-lg">
                        <span className="font-medium opacity-80 uppercase tracking-widest text-sm">Total del pedido:</span>
                        <span className="text-3xl font-black">${total.toLocaleString()} <small className="text-xs font-normal">MXN</small></span>
                    </div>
                </div>

                {/* LADO DERECHO: PAGO Y CONTACTO */}
                <div className="space-y-6">
                    <div className="bg-white border rounded-lg p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-4">
                            <MapPin size={22} className="text-blue-500" /> Datos de Facturación
                        </h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <input type="text" placeholder="Nombre completo" className="w-full border rounded-lg p-3 bg-gray-50" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                                <input type="email" placeholder="Correo electrónico" className="w-full border rounded-lg p-3 bg-gray-50" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">País / Región</label>
                                <select
                                    className="w-full border rounded-lg p-3 bg-gray-50 outline-none"
                                    value={form.pais}
                                    onChange={e => setForm({ ...form, pais: e.target.value })}
                                >
                                    <option value="México">México</option>
                                    <option value="Estados Unidos">Estados Unidos</option>
                                    <option value="España">España</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Chile">Chile</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            <input type="text" placeholder="Dirección (Calle y número)" className="w-full border rounded-lg p-3 bg-gray-50" value={form.calle} onChange={e => setForm({ ...form, calle: e.target.value })} />

                            <input type="text" placeholder="Apartamento, habitación, etc. (opcional)" className="w-full border rounded-lg p-3 bg-gray-50" value={form.apartamento} onChange={e => setForm({ ...form, apartamento: e.target.value })} />

                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Población / Ciudad" className="w-full border rounded-lg p-3 bg-gray-50" value={form.ciudad} onChange={e => setForm({ ...form, ciudad: e.target.value })} />
                                <input type="text" placeholder="Estado / Provincia" className="w-full border rounded-lg p-3 bg-gray-50" value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Código Postal" className="w-full border rounded-lg p-3 bg-gray-50" value={form.cp} onChange={e => setForm({ ...form, cp: e.target.value })} />
                                <input type="tel" placeholder="Teléfono" className="w-full border rounded-lg p-3 bg-gray-50" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <CreditCard size={22} className="text-blue-500" /> Pago con Tarjeta
                            </h2>
                            <Image src={etominLogo} alt="Etomin" width={70} height={25} className="object-contain" />
                        </div>

                        <div className="space-y-4">
                            <input type="text" placeholder="Titular de la tarjeta" className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} />
                            <input type="text" placeholder="Número de tarjeta" maxLength={16} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition" value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} />
                            <div className="grid grid-cols-3 gap-2">
                                <input type="text" placeholder="Mes (MM)" maxLength={2} className="border rounded-lg p-3 text-center outline-none focus:ring-2 focus:ring-blue-500 transition" value={card.month} onChange={e => setCard({ ...card, month: e.target.value })} />
                                <input type="text" placeholder="Año (AA)" maxLength={2} className="border rounded-lg p-3 text-center outline-none focus:ring-2 focus:ring-blue-500 transition" value={card.year} onChange={e => setCard({ ...card, year: e.target.value })} />
                                <input type="password" placeholder="CVV" maxLength={4} className="border rounded-lg p-3 text-center outline-none focus:ring-2 focus:ring-blue-500 transition" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} />
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col items-center gap-3">
                            <Image src={securePayment} alt="Secure Payment" width={120} height={35} className="opacity-80" />
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center">
                                Pago procesado de forma segura <br /> Protección de datos SSL 256-bit
                            </p>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={loading || !canCheckout}
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-lg font-black text-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:bg-gray-300 shadow-xl shadow-blue-200"
                        >
                            {loading ? "PROCESANDO..." : `PAGAR $${total.toLocaleString()}`}
                        </button>
                    </div>
                </div>


            </div>

            <Footer />
        </>
    );
}