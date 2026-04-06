import { supabase } from "@/supabase/client";

import { Reservation } from "@/interfaces/Reservations";
import { sendConfirmationEmail } from "./email";

const sampleReservations: Reservation[] = [];

async function triggerEmailNotification(reservationData: any) {
  try {
    await fetch(`/api/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservationData),
    });
  } catch (err) {
    console.error("Error al disparar el trigger de email:", err);
  }
}

// /lib/reservations.ts
export async function saveReservation(reservation: any) {
  const { data, error } = await supabase
    .from("reservations_vivatrip")
    .insert({
      activity_title: reservation.activityTitle,
      destination_name: reservation.destinationName,
      fecha: reservation.fecha,
      personas: Number(reservation.personas),
      nombre: reservation.nombre,
      email: reservation.email,
      telefono: reservation.telefono,
      price: reservation.price,
      comentarios: reservation.comentarios || "",
      status: "pending",
    })
    .select()
    .single(); // 🔥 importante

  if (error) {
    console.error(error);
    throw error;
  }

  return data; // 👈 ahora tienes ID y todo
}

export async function updateReservationStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from("reservations_vivatrip")
    .update({ status })
    .eq("id", id)
    .select() // Traemos los datos actualizados para el email
    .single();

  if (error) throw error;

  // Enviamos el email con los datos frescos de la DB
  await triggerEmailNotification(data);

  return data;
}

export async function deleteReservation(id: string) {
  // 1. Primero obtenemos los datos para poder avisar por email antes de borrar
  const { data: reservation } = await supabase
    .from("reservations_vivatrip")
    .select("*")
    .eq("id", id)
    .single();

  if (reservation) {
    // Cambiamos el status manualmente para el contexto del email
    await triggerEmailNotification({ ...reservation, status: "cancelled" });
  }

  // 2. Procedemos a borrar
  return await supabase.from("reservations_vivatrip").delete().eq("id", id);
}
