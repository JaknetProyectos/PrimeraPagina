"use client";

import { useState, useEffect } from "react";

export interface Review {
  id: string;
  destinationSlug: string;
  experienceId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  activityName: string;
}

const REVIEWS_DATA: Review[] = [
  // Querétaro
  { id: "rev-1", destinationSlug: "queretaro", experienceId: "exp-2", userName: "María González", userAvatar: "", rating: 5, date: "2024-02-15", comment: "La ruta del vino fue espectacular. Los guías muy profesionales.", activityName: "Ruta del Vino" },
  { id: "rev-2", destinationSlug: "queretaro", experienceId: "exp-1", userName: "Carlos Rodríguez", userAvatar: "", rating: 5, date: "2024-01-20", comment: "El tour por el centro histórico fue muy completo.", activityName: "Centro Histórico" },
  { id: "rev-3", destinationSlug: "queretaro", experienceId: "exp-3", userName: "Ana Martínez", userAvatar: "", rating: 4, date: "2023-12-10", comment: "Subir a la Peña de Bernal fue increíble.", activityName: "Peña de Bernal" },
  // Xochimilco
  { id: "rev-4", destinationSlug: "xochimilco", experienceId: "exp-4", userName: "Pedro Sánchez", userAvatar: "", rating: 5, date: "2024-03-01", comment: "Una experiencia mágica. La trajinera y la música perfectos.", activityName: "Paseo en Trajinera" },
  { id: "rev-5", destinationSlug: "xochimilco", experienceId: "exp-5", userName: "Laura Hernández", userAvatar: "", rating: 5, date: "2024-02-28", comment: "El tour gastronómico fue delicioso.", activityName: "Tour Gastronómico" },
  { id: "rev-6", destinationSlug: "xochimilco", experienceId: "exp-6", userName: "Roberto Díaz", userAvatar: "", rating: 4, date: "2024-01-15", comment: "Las chinampas son impresionantes.", activityName: "Visita a las Chinampas" },
  // Oaxaca
  { id: "rev-7", destinationSlug: "oaxaca", experienceId: "exp-7", userName: "Sofía Ramírez", userAvatar: "", rating: 5, date: "2024-03-05", comment: "Monte Albán es impresionante. Vistas espectaculares.", activityName: "Monte Albán" },
  { id: "rev-8", destinationSlug: "oaxaca", experienceId: "exp-8", userName: "Diego López", userAvatar: "", rating: 5, date: "2024-02-20", comment: "La ruta del mezcal fue increíble.", activityName: "Ruta del Mezcal" },
  { id: "rev-9", destinationSlug: "oaxaca", experienceId: "exp-9", userName: "Elena Torres", userAvatar: "", rating: 5, date: "2024-01-10", comment: "Hierve el Agua es un lugar mágico.", activityName: "Hierve el Agua" },
];

// Simulates: supabase.from('reviews').select('*').eq('destination_slug', slug)
export function useReviews(destinationSlug: string) {
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const filtered = REVIEWS_DATA.filter((r) => r.destinationSlug === destinationSlug);
        setData(filtered);

        if (filtered.length > 0) {
          const avg = filtered.reduce((acc, r) => acc + r.rating, 0) / filtered.length;
          setAverageRating(avg);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [destinationSlug]);

  return { data, loading, error, averageRating };
}
