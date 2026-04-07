"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";
import { Experience } from "@/interfaces/Experiences";

interface UseExperiencesOptions {
  destinationSlug?: string;
  page?: number;
  pageSize?: number;
  locale?: string;
}

export function useExperiences(options: UseExperiencesOptions = {}) {
  const {
    destinationSlug,
    page = 1,
    pageSize = 6,
    locale = "es"
  } = options;

  const [state, setState] = useState({
    data: [] as Experience[],
    loading: true,
    error: null as Error | null,
    totalCount: 0
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchExperiences = async () => {
      setState(prev => ({ ...prev, loading: true }));

      try {
        let query = supabase
          .from("experiences_vivatrip")
          .select("*", { count: "exact" });

        if (destinationSlug) {
          query = query.eq("destination_slug", destinationSlug);
        }

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        const { data, error, count } = await query
          .range(from, to)
          .abortSignal(controller.signal);

        if (error) throw error;

        const mapped = (data || []).map((e) => ({
          ...e,
          destinationSlug: e.destination_slug,
          destinationName:
            locale === "en"
              ? (e.destination_name_en || e.destination_name)
              : e.destination_name,
          title: locale === "en" ? (e.title_en || e.title) : e.title,
          description:
            locale === "en"
              ? (e.description_en || e.description)
              : e.description,
          duration: locale === "en" ? (e.duration_en || e.duration) : e.duration,
          category: locale === "en" ? (e.category_en || e.category) : e.category,
          images: e.images || [e.image],
          priceFormatted: e.price_formatted,
          reviewCount: e.review_count
        }));

        setState({
          data: mapped,
          totalCount: count || 0,
          loading: false,
          error: null
        });
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setState(prev => ({ ...prev, error: err, loading: false }));
        }
      }
    };

    fetchExperiences();

    return () => controller.abort();
  }, [destinationSlug, page, pageSize, locale]);

  const totalPages = Math.ceil(state.totalCount / pageSize);

  return {
    ...state,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}