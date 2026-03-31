"use client";

import { useCart } from "@/context/cartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { checkout } from "@/lib/cart";
import { useState } from "react";
import { CreditCard, Lock, CheckCircle } from "lucide-react";

export default function CartPage() {
    const { cart, updateItem, removeItem, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [ticket, setTicket] = useState<any[] | null>(null);

    // Datos de contacto y envío
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
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

    const canCheckout = 
        form.nombre && form.email.includes("@") && form.direccion &&
        card.number.length >= 15 && card.cvv.length >= 3 &&
        cart.every(item => item.fecha && item.personas);

    const handleCheckout = async () => {
        try {
            setLoading(true);
            if (!canCheckout) throw Error("Por favor completa todos los datos de contacto y tarjeta");

            // Pasamos los datos al Server Action
            const result = await checkout(cart, form, card);

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
                    <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">¡Pago Exitoso!</h2>
                        <p className="text-gray-600 mb-6">Tu reserva ha sido confirmada. Revisa tu correo electrónico para ver tu ticket.</p>
                        
                        <div className="text-left bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
                           {ticket.map((res, i) => (
                               <p key={i} className="text-sm border-b last:border-0 pb-1">
                                   <strong>{res.activity_title}</strong> - {res.fecha}
                               </p>
                           ))}
                        </div>

                        <button onClick={() => window.location.href = "/"} className="w-full py-3 bg-black text-white rounded-xl font-semibold">
                            Volver al inicio
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mt-20 mx-auto p-6 grid md:grid-cols-2 gap-12">
                {/* LADO IZQUIERDO: CARRITO */}
                <div>
                    <h1 className="text-2xl font-bold mb-6">Tu selección</h1>
                    <div className="space-y-4">
                        {cart.map(item => (
                            <div key={item.experienceId} className="border rounded-2xl p-4 bg-white shadow-sm">
                                <div className="flex justify-between font-bold">
                                    <span>{item.title}</span>
                                    <button onClick={() => removeItem(item.experienceId)} className="text-red-400 text-xs uppercase tracking-wider">Quitar</button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <input type="date" value={item.fecha || ""} onChange={e => updateItem(item.experienceId, { fecha: e.target.value })} className="border rounded-lg p-2 text-sm" />
                                    <input type="number" min={1} value={item.personas || 1} onChange={e => updateItem(item.experienceId, { personas: Number(e.target.value) })} className="border rounded-lg p-2 text-sm" />
                                </div>
                                <p className="mt-3 font-semibold text-right text-blue-600">${(item.price * (item.personas || 1)).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-2xl flex justify-between items-center">
                        <span className="font-medium text-gray-600">Total a pagar:</span>
                        <span className="text-2xl font-bold text-black">${total.toLocaleString()} MXN</span>
                    </div>
                </div>

                {/* LADO DERECHO: PAGO Y CONTACTO */}
                <div className="space-y-6">
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <CreditCard size={20} /> Información de Pago
                        </h2>
                        
                        <div className="space-y-3">
                            <input type="text" placeholder="Nombre en la tarjeta" className="w-full border rounded-lg p-3" value={card.name} onChange={e => setCard({...card, name: e.target.value})} />
                            <input type="text" placeholder="Número de tarjeta" maxLength={16} className="w-full border rounded-lg p-3" value={card.number} onChange={e => setCard({...card, number: e.target.value})} />
                            <div className="grid grid-cols-3 gap-2">
                                <input type="text" placeholder="MM" maxLength={2} className="border rounded-lg p-3 text-center" value={card.month} onChange={e => setCard({...card, month: e.target.value})} />
                                <input type="text" placeholder="AA" maxLength={2} className="border rounded-lg p-3 text-center" value={card.year} onChange={e => setCard({...card, year: e.target.value})} />
                                <input type="password" placeholder="CVV" maxLength={4} className="border rounded-lg p-3 text-center" value={card.cvv} onChange={e => setCard({...card, cvv: e.target.value})} />
                            </div>
                        </div>

                        <h2 className="text-lg font-bold mt-8 mb-4">Datos de Facturación</h2>
                        <div className="space-y-3">
                            <input type="text" placeholder="Nombre completo" className="w-full border rounded-lg p-3" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
                            <input type="email" placeholder="Email" className="w-full border rounded-lg p-3" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                            <input type="text" placeholder="Dirección (Calle y Número)" className="w-full border rounded-lg p-3" value={form.direccion} onChange={e => setForm({...form, direccion: e.target.value})} />
                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" placeholder="C.P." className="border rounded-lg p-3" value={form.cp} onChange={e => setForm({...form, cp: e.target.value})} />
                                <input type="tel" placeholder="Teléfono" className="border rounded-lg p-3" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} />
                            </div>
                        </div>

                        <button 
                            onClick={handleCheckout} 
                            disabled={loading || !canCheckout}
                            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
                        >
                            {loading ? "Procesando pago..." : <><Lock size={18}/> Pagar ${total.toLocaleString()}</>}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}