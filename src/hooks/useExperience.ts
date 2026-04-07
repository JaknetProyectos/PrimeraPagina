import { supabase } from "@/supabase/client";
import { useState, useEffect } from "react";
import { Experience } from "@/interfaces/Experiences";

export function useExperience(id?: string, slug?: string, locale: string = "es") {
  const [data, setData] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id && !slug) {
      setLoading(false);
      return;
    }

    const fetchExperience = async () => {
      setLoading(true);
      try {
        let query = supabase.from("experiences_vivatrip").select("*");

        if (id) {
          query = query.eq("id", id);
        } else if (slug) {
          query = query.eq("slug", slug);
        }

        const { data: rawData, error } = await query.maybeSingle();

        if (error) throw error;
        if (!rawData) {
          setData(null);
          return;
        }

        const mapped: Experience = {
          id: rawData.id,
          destinationSlug: rawData.destination_slug,
          destinationName:
            locale === "en"
              ? (rawData.destination_name_en || rawData.destination_name)
              : rawData.destination_name,
          title: locale === "en" ? (rawData.title_en || rawData.title) : rawData.title,
          description:
            locale === "en"
              ? (rawData.description_en || rawData.description)
              : rawData.description,
          duration:
            locale === "en"
              ? (rawData.duration_en || rawData.duration)
              : rawData.duration,
          price: rawData.price,
          priceFormatted: rawData.price_formatted,
          image: rawData.image,
          category:
            locale === "en"
              ? (rawData.category_en || rawData.category)
              : rawData.category,
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
  }, [id, slug, locale]);

  return { data, loading, error };
}