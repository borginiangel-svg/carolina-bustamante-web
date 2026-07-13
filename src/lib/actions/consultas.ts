"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function crearConsulta(data: {
  nombre: string;
  whatsapp?: string;
  email?: string;
  asunto?: string;
  mensaje?: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("consultas").insert({
    nombre: data.nombre,
    whatsapp: data.whatsapp || null,
    email: data.email || null,
    asunto: data.asunto || null,
    mensaje: data.mensaje || null,
    origen: "sitio_web",
  });

  if (error) {
    console.error("Error al guardar la consulta:", error.message);
  }

  revalidatePath("/admin/consultas");
}

export async function actualizarEstadoConsulta(id: string, estado: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("consultas")
    .update({ estado })
    .eq("id", id);

  if (error) {
    throw new Error("No se pudo actualizar la consulta: " + error.message);
  }

  revalidatePath("/admin/consultas");
}

export async function borrarConsulta(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("consultas").delete().eq("id", id);

  if (error) {
    throw new Error("No se pudo borrar la consulta: " + error.message);
  }

  revalidatePath("/admin/consultas");
}
