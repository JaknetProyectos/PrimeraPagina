"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";
import { Experience } from "@/interfaces/Experiences";

interface UseExperiencesOptions {
  destinationSlug?: string;
  page?: number;
  pageSize?: number;
}

interface UseExperiencesResult {
  data: Experience[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function useExperiences(options: UseExperiencesOptions = {}) {
  // 1. Memorizamos las opciones para evitar que el useEffect se dispare 
  // si el componente padre se renderiza con un objeto nuevo {}.
  const { destinationSlug, page = 1, pageSize = 6 } = options;

  const [state, setState] = useState({
    data: [] as Experience[],
    loading: true,
    error: null as Error | null,
    totalCount: 0
  });

  useEffect(() => {
    // AbortController para cancelar peticiones si el usuario cambia de página rápido
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
          .abortSignal(controller.signal); // Vinculamos la cancelación

        if (error) throw error;

        const mapped = (data || []).map((e) => ({
          ...e, // Si los nombres coinciden, puedes simplificar
          destinationSlug: e.destination_slug,
          destinationName: e.destination_name,
          images: e.images || [e.image],
          priceFormatted: e.price_formatted,
          reviewCount: e.review_count,
        }));

        setState({
          data: mapped,
          totalCount: count || 0,
          loading: false,
          error: null
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setState(prev => ({ ...prev, error: err, loading: false }));
        }
      }
    };

    fetchExperiences();

    return () => controller.abort(); // Limpieza al desmontar
  }, [destinationSlug, page, pageSize]); // Dependencias estables

  const totalPages = Math.ceil(state.totalCount / pageSize);

  return {
    ...state,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}