"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";
import { Destination } from "./useDestinations";

export default function useDestination(slug: string) {
    const [data, setData] = useState<Destination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const { data, error } = await supabase
                    .from("destinations")
                    .select("*")
                    .eq("slug", slug)
                    .single();

                if (error) throw error;

                // ✅ mapear objeto (no array)
                const mapped = {
                    id: data.id,
                    slug: data.slug,
                    name: data.name,
                    shortDescription: data.short_description,
                    description: data.description,
                    heroImage: data.hero_image,
                    cardImage: data.card_image,
                    highlights: data.highlights,
                    bgColor: data.bg_color,
                };

                console.log(mapped);

                setData(mapped);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchDestination();
    }, [slug]);

    return { data, loading, error };
}