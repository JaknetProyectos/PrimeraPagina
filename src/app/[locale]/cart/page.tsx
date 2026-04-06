"use client";

import { useCart } from "@/context/cartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { checkout } from "@/lib/cart";
import { useState } from "react";
import { CreditCard, CheckCircle, MapPin, AlertTriangle, X } from "lucide-react";
import etominLogo from "@/public/etomin.png"
import securePayment from "@/public/secure-payment.png"
import Image from "next/image";
import { EmptyCart } from "@/components/EmptyCart";
import { useTranslations } from 'next-intl';

export default function CartPage() {
    const t = useTranslations('Cart');
    const { cart, updateItem, removeItem, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [ticket, setTicket] = useState<any[] | null>(null);
    const [paymentError, setPaymentError] = useState<string | null>(null); // Nuevo estado para errores

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
        form.cp &&
        form.telefono &&
        form.pais;

    const canCheckout =
        isFormValid &&
        card.cvv &&
        card.name &&
        card.month &&
        card.year &&
        card.number.length >= 15 && card.cvv.length >= 3 &&
        cart.length > 0 &&
        cart.every(item => item.fecha && item.personas);

    const handleCheckout = async () => {
        try {
            setLoading(true);
            setPaymentError(null); // Limpiar errores previos
            if (!canCheckout) throw Error(t('errors.missing_data'));

            const direccionCompleta = `
                ${form.calle} 
                ${form.apartamento ? `, Apt/Int: ${form.apartamento}` : ""} 
                , ${form.ciudad}, ${form.estado}
                , ${form.pais}
            `.replace(/\s+/g, ' ').trim();

            const dataParaEnvio = {
                ...form,
                direccion: direccionCompleta
            };

            const result = await checkout(cart, dataParaEnvio, card);
            clearCart();
            setTicket(result);
        } catch (err: any) {
            // En lugar de alert, usamos el estado para abrir el modal
            setPaymentError(err.message || t('errors.generic_payment'));
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0 && !ticket && !paymentError) {
        return <EmptyCart />
    }

    return (
        <>
            <Header />

            {/* MODAL DE ÉXITO */}
            {ticket && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-lg rounded-lg p-8 shadow-2xl text-center border-t-8 border-green-500 animate-in zoom-in duration-300">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">{t('success.title')}</h2>
                        <p className="text-gray-600 mb-6">{t('success.message', { email: form.email })}</p>

                        <div className="text-left bg-gray-50 rounded-lg p-4 mb-6 space-y-2 border border-gray-100 max-h-48 overflow-y-auto">
                            {ticket.map((res, i) => (
                                <p key={i} className="text-sm border-b last:border-0 pb-2 mb-2 last:mb-0">
                                    <span className="block font-bold text-blue-600 uppercase tracking-tighter">ID: {res.id.split('-')[0]}</span>
                                    <strong className="block truncate">{res.activity_title}</strong>
                                    <span className="text-gray-500 text-[10px] uppercase font-bold">{res.fecha} • {res.personas} {t('summary.people_label')}</span>
                                </p>
                            ))}
                        </div>

                        <button onClick={() => window.location.href = "/"} className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-gray-800 transition uppercase text-xs tracking-widest">
                            {t('success.back_home')}
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL DE ERROR (BLUR + RED STYLE) */}
            {paymentError && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[60] p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-md rounded-xl p-8 shadow-2xl text-center border-t-8 border-red-500 animate-in zoom-in duration-200">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-10 h-10 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-black uppercase  tracking-tighter text-gray-900 mb-2">Error en el pago</h2>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
                            {paymentError}
                        </p>
                        <button 
                            onClick={() => setPaymentError(null)} 
                            className="w-full py-4 bg-red-500 text-white rounded-lg font-black  uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                        >
                            <X size={18} /> Intentar de nuevo
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mt-20 mx-auto p-6 grid md:grid-cols-2 gap-12">
                {/* LADO IZQUIERDO: CARRITO */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-black  uppercase tracking-tighter mb-6">{t('summary.title')}</h1>
                    <div className="space-y-4">
                        {cart.map(item => (
                            <div key={item.experienceId} className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition group">
                                <div className="flex justify-between font-bold text-lg">
                                    <span className="uppercase tracking-tight">{item.title}</span>
                                    <button onClick={() => removeItem(item.experienceId)} className="text-red-400 text-[10px] font-black uppercase hover:text-red-600 transition tracking-widest">{t('summary.remove')}</button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="flex flex-col">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('summary.date_label')}</label>
                                        <input type="date" value={item.fecha || ""} onChange={e => updateItem(item.experienceId, { fecha: e.target.value })} className="border-b border-gray-200 py-1 text-sm outline-none focus:border-blue-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('summary.travelers_label')}</label>
                                        <input type="number" min={1} value={item.personas || 1} onChange={e => updateItem(item.experienceId, { personas: Number(e.target.value) })} className="border-b border-gray-200 py-1 text-sm outline-none focus:border-blue-500 font-bold" />
                                    </div>
                                </div>
                                <p className="mt-4 font-black text-right text-blue-600 text-xl tracking-tighter ">${(item.price * (item.personas || 1)).toLocaleString()} <small className="text-[10px] font-normal not-">MXN</small></p>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 bg-[#212121] rounded-lg flex justify-between items-center text-white shadow-lg border-b-4 border-blue-500">
                        <span className="font-black  uppercase tracking-widest text-xs opacity-60">{t('summary.total_label')}:</span>
                        <span className="text-4xl font-black  tracking-tighter">${total.toLocaleString()} <small className="text-xs font-normal not-">MXN</small></span>
                    </div>
                </div>

                {/* LADO DERECHO: PAGO Y CONTACTO */}
                <div className="space-y-6">
                    {/* ... (Se mantiene igual el formulario de facturación y pago) */}
                    <div className="bg-white border rounded-lg p-8 shadow-sm">
                        <h2 className="text-xl font-black uppercase  tracking-tighter mb-6 flex items-center gap-2 border-b pb-4">
                            <MapPin size={22} className="text-blue-500" /> {t('billing.title')}
                        </h2>

                        <div className="space-y-4">
                            <input type="text" placeholder={t('billing.placeholders.name')} className="w-full border rounded-lg p-3 bg-gray-50 text-sm font-medium" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                            <input type="email" placeholder={t('billing.placeholders.email')} className="w-full border rounded-lg p-3 bg-gray-50 text-sm font-medium" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

                            <div className="flex flex-col gap-1">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">{t('billing.labels.country')}</label>
                                <select className="w-full border rounded-lg p-3 bg-gray-50 outline-none text-sm font-bold" value={form.pais} onChange={e => setForm({ ...form, pais: e.target.value })}>
                                    <option value="México">México</option>
                                    <option value="Estados Unidos">United States</option>
                                    <option value="España">Spain</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Chile">Chile</option>
                                    <option value="Otro">{t('billing.countries.other')}</option>
                                </select>
                            </div>

                            <input type="text" placeholder={t('billing.placeholders.address')} className="w-full border rounded-lg p-3 bg-gray-50 text-sm" value={form.calle} onChange={e => setForm({ ...form, calle: e.target.value })} />
                            <input type="text" placeholder={t('billing.placeholders.apt')} className="w-full border rounded-lg p-3 bg-gray-50 text-sm" value={form.apartamento} onChange={e => setForm({ ...form, apartamento: e.target.value })} />

                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder={t('billing.placeholders.city')} className="w-full border rounded-lg p-3 bg-gray-50 text-sm" value={form.ciudad} onChange={e => setForm({ ...form, ciudad: e.target.value })} />
                                <input type="text" placeholder={t('billing.placeholders.state')} className="w-full border rounded-lg p-3 bg-gray-50 text-sm" value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder={t('billing.placeholders.zip')} className="w-full border rounded-lg p-3 bg-gray-50 text-sm font-mono" value={form.cp} onChange={e => setForm({ ...form, cp: e.target.value })} />
                                <input type="tel" placeholder={t('billing.placeholders.phone')} className="w-full border rounded-lg p-3 bg-gray-50 text-sm" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-8 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <h2 className="text-xl font-black uppercase  tracking-tighter flex items-center gap-2">
                                <CreditCard size={22} className="text-blue-500" /> {t('payment.title')}
                            </h2>
                            <Image src={etominLogo} alt="Etomin" width={70} height={25} className="object-contain" />
                        </div>

                        <div className="space-y-4">
                            <input type="text" placeholder={t('payment.placeholders.card_name')} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition text-sm font-bold uppercase tracking-tight" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} />
                            <input type="text" placeholder={t('payment.placeholders.card_number')} maxLength={16} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition font-mono tracking-widest text-sm" value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} />
                            <div className="grid grid-cols-3 gap-2">
                                <input type="text" placeholder="MM" maxLength={2} className="border rounded-lg p-3 text-center outline-none focus:ring-2 focus:ring-blue-500 transition text-sm font-bold" value={card.month} onChange={e => setCard({ ...card, month: e.target.value })} />
                                <input type="text" placeholder="YY" maxLength={2} className="border rounded-lg p-3 text-center outline-none focus:ring-2 focus:ring-blue-500 transition text-sm font-bold" value={card.year} onChange={e => setCard({ ...card, year: e.target.value })} />
                                <input type="password" placeholder="CVV" maxLength={4} className="border rounded-lg p-3 text-center outline-none focus:ring-2 focus:ring-blue-500 transition text-sm font-bold" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} />
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col items-center gap-3">
                            <Image src={securePayment} alt="Secure Payment" width={120} height={35} className="opacity-80" />
                            <p className="text-[9px] text-gray-400 uppercase font-black tracking-[0.2em] text-center leading-relaxed">
                                {t('payment.security_notice')}
                            </p>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={loading || !canCheckout}
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-lg font-black  text-2xl uppercase tracking-tighter flex items-center justify-center gap-3 transition-all transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:bg-gray-300 shadow-xl shadow-blue-100"
                        >
                            {loading ? t('payment.processing') : `${t('payment.pay_button')} $${total.toLocaleString()}`}
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}