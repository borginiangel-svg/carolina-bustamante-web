"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function parseForm(formData: FormData) {
  return {
    tipo: String(formData.get("tipo") || "Visita"),
    fecha_hora: String(formData.get("fecha_hora") || ""),
    cliente_id: String(formData.get("cliente_id") || "") || null,
    propiedad_id: String(formData.get("propiedad_id") || "") || null,
    direccion: String(formData.get("direccion") || ""),
    notas: String(formData.get("notas") || ""),
    estado: String(formData.get("estado") || "pendiente"),
  };
}

export async function crearTurno(formData: FormData) {
  const supabase = await createClient();
  const data = parseForm(formData);

  const { error } = await supabase.from("turnos").insert(data);

  if (error) {
    throw new Error("No se pudo crear el turno: " + error.message);
  }

  revalidatePath("/admin/agenda");
  redirect("/admin/agenda");
}

export async function actualizarTurno(id: string, formData: FormData) {
  const supabase = await createClient();
  const data = parseForm(formData);

  const { error } = await supabase.from("turnos").update(data).eq("id", id);

  if (error) {
    throw new Error("No se pudo actualizar el turno: " + error.message);
  }

  revalidatePath("/admin/agenda");
  redirect("/admin/agenda");
}

export async function borrarTurno(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("turnos").delete().eq("id", id);

  if (error) {
    throw new Error("No se pudo borrar el turno: " + error.message);
  }

  revalidatePath("/admin/agenda");
}

export async function actualizarEstadoTurno(id: string, estado: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("turnos")
    .update({ estado })
    .eq("id", id);

  if (error) {
    throw new Error("No se pudo actualizar el estado: " + error.message);
  }

  revalidatePath("/admin/agenda");
}
