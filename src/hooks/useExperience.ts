import { supabase } from "@/supabase/client";
import { useState, useEffect } from "react";
import { Experience } from "@/interfaces/Experiences";

export function useExperience(id?: string, slug?: string) {
    const [data, setData] = useState<Experience | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Evitamos ejecutar la consulta si no hay ningún parámetro
        if (!id && !slug) {
            setLoading(false);
            return;
        }

        const fetchExperience = async () => {
            setLoading(true);
            try {
                // Construimos la query base
                let query = supabase.from("experiences_vivatrip").select("*");

                // Priorizamos la búsqueda por ID, si no, usamos el SLUG
                if (id) {
                    query = query.eq("id", id);
                } else if (slug) {
                    query = query.eq("slug", slug); // Asegúrate que la columna en DB se llame 'slug'
                }

                const { data: rawData, error } = await query.maybeSingle();

                if (error) throw error;
                if (!rawData) {
                    setData(null);
                    return;
                }

                // Mapeo de datos (CamelCase para el Frontend)
                const mapped: Experience = {
                    id: rawData.id,
                    destinationSlug: rawData.destination_slug,
                    destinationName: rawData.destination_name,
                    title: rawData.title,
                    description: rawData.description,
                    duration: rawData.duration,
                    price: rawData.price,
                    priceFormatted: rawData.price_formatted,
                    image: rawData.image,
                    category: rawData.category,
                    images: rawData.images || [],
                    rating: rawData.rating,
                    reviewCount: rawData.review_count,
                    slug: rawData.slug
                };

                setData(mapped);
            } catch (err) {
                console.error("Error fetching experience:", err);
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperience();
    }, [id, slug]); // El efecto se dispara si cambia cualquiera de los dos

    return { data, loading, error };
}