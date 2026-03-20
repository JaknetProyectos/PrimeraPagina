"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";

import { Destination } from "@/interfaces/Destination";


export function useDestinations() {
  const [data, setData] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data, error } = await supabase
          .from("destinations")
          .select("*");

        console.log(data)

        if (error) throw error;

        // 👇 opcional: mapear snake_case → camelCase
        const mapped = (data || []).map((d) => ({
          id: d.id,
          slug: d.slug,
          name: d.name,
          shortDescription: d.short_description,
          description: d.description,
          heroImage: d.hero_image,
          cardImage: d.card_image,
          highlights: d.highlights,
          bgColor: d.bg_color,
        }));

        setData(mapped);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return { data, loading, error };
}