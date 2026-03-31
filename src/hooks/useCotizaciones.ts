"use client";
import { useState } from "react";
import { supabase } from "@/supabase/client";

export function useQuotes() {
    const [loading, setLoading] = useState(false);

    // CREATE
    const createQuote = async (formData: any) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("cotizaciones_vivatrip")
                .insert([formData])
                .select()
                .single();

            if (error) throw error;

            // Aquí disparas el envío de email (puedes usar un Server Action)
            // Ejemplo: await sendQuoteEmail(data);
            
            return data;
        } catch (error) {
            console.error("Error al crear cotización:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // READ (Para un panel admin futuro)
    const getQuote = async (id: string) => {
        const { data, error } = await supabase
            .from("cotizaciones_vivatrip")
            .select("*")
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    };

    // UPDATE
    const updateQuote = async (id: string, updates: any) => {
        const { data, error } = await supabase
            .from("cotizaciones_vivatrip")
            .update(updates)
            .eq("id", id);
        if (error) throw error;
        return data;
    };

    // DELETE
    const deleteQuote = async (id: string) => {
        const { error } = await supabase
            .from("cotizaciones_vivatrip")
            .delete()
            .eq("id", id);
        if (error) throw error;
    };

    return { createQuote, getQuote, updateQuote, deleteQuote, loading };
}