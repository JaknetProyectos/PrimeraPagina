"use client";
import React from 'react';
import { AlertTriangle, ArrowLeft, RefreshCcw } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface FullscreenErrorProps {
    title?: string;
    message?: string;
    code?: string | number;
    onRetry?: () => void;
}

export default function ErrorScreen({
    title = "Algo no salió como esperábamos",
    message = "No pudimos cargar la información en este momento. Por favor, intenta de nuevo o regresa al inicio.",
    code = "500",
    onRetry
}: FullscreenErrorProps) {
    return (
        <div className="fixed inset-0 z-[200] bg-[#F5F5F5] flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full text-center">

                {/* SUPERFICIE DE ERROR (CARD) */}
                <div className="bg-white shadow-xl rounded-sm overflow-hidden border border-gray-200">

                    {/* BARRA SUPERIOR DE ALERTA */}
                    <div className="h-1.5 w-full bg-[#FF5252]" /> {/* Rojo Material para errores */}

                    <div className="p-10">
                        {/* ICONO CIRCULAR */}
                        <div className="w-20 h-20 bg-red-50 text-[#FF5252] rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={40} strokeWidth={1.5} />
                        </div>

                        {/* CÓDIGO DE ERROR SUTIL */}
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] block mb-2">
                            Error Code: {code}
                        </span>

                        <h1 className="text-2xl font-bold text-[#212121] leading-tight mb-4 uppercase tracking-tight">
                            {title}
                        </h1>

                        <p className="text-sm text-gray-500 leading-relaxed mb-8 px-2">
                            {message}
                        </p>

                        {/* ACCIONES MATERIAL */}
                        <div className="grid gap-3">
                            {onRetry && (
                                <button
                                    onClick={onRetry}
                                    className="flex items-center justify-center gap-2 w-full bg-[#03A9F4] text-white py-3.5 rounded-sm font-bold uppercase text-xs tracking-widest shadow-md hover:bg-[#0288D1] transition-all active:scale-95"
                                >
                                    <RefreshCcw size={16} />
                                    Reintentar carga
                                </button>
                            )}

                            <Link
                                href="/"
                                className="flex items-center justify-center gap-2 w-full border-2 border-gray-100 text-gray-600 py-3.5 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-gray-50 transition-all"
                            >
                                <ArrowLeft size={16} />
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </div>

                {/* FOOTER DE SOPORTE */}
                <p className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    ¿Necesitas ayuda? <a href="mailto:contacto@vivamytrip.com" className="text-[#03A9F4] underline decoration-2 underline-offset-4">Contacta a soporte</a>
                </p>
            </div>
        </div>
    );
}