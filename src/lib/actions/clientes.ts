"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ClienteInput = {
  nombre: string;
  whatsapp: string;
  email: string;
  tipo: string;
  estado: string;
  notas: string;
};

function parseForm(formData: FormData): ClienteInput {
  return {
    nombre: String(formData.get("nombre") || ""),
    whatsapp: String(formData.get("whatsapp") || ""),
    email: String(formData.get("email") || ""),
    tipo: String(formData.get("tipo") || "Comprador"),
    estado: String(formData.get("estado") || "nuevo"),
    notas: String(formData.get("notas") || ""),
  };
}

export async function crearCliente(formData: FormData) {
  const supabase = await createClient();
  const data = parseForm(formData);

  const { error } = await supabase.from("clientes").insert(data);

  if (error) {
    throw new Error("No se pudo crear el cliente: " + error.message);
  }

  revalidatePath("/admin/clientes");
  redirect("/admin/clientes");
}

export async function actualizarCliente(id: string, formData: FormData) {
  const supabase = await createClient();
  const data = parseForm(formData);

  const { error } = await supabase
    .from("clientes")
    .update({ ...data, actualizado_en: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error("No se pudo actualizar el cliente: " + error.message);
  }

  revalidatePath("/admin/clientes");
  redirect("/admin/clientes");
}

export async function borrarCliente(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("clientes").delete().eq("id", id);

  if (error) {
    throw new Error("No se pudo borrar el cliente: " + error.message);
  }

  revalidatePath("/admin/clientes");
}

export async function actualizarEstadoCliente(id: string, estado: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("clientes")
    .update({ estado, actualizado_en: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error("No se pudo actualizar el estado: " + error.message);
  }

  revalidatePath("/admin/clientes");
}

export async function convertirConsultaEnCliente(
  consultaId: string,
  data: { nombre: string; whatsapp: string; email: string; tipo: string }
) {
  const supabase = await createClient();

  const { error: insertError } = await supabase.from("clientes").insert({
    nombre: data.nombre,
    whatsapp: data.whatsapp || null,
    email: data.email || null,
    tipo: data.tipo,
    estado: "nuevo",
    consulta_origen_id: consultaId,
  });

  if (insertError) {
    throw new Error("No se pudo crear el cliente: " + insertError.message);
  }

  const { error: updateError } = await supabase
    .from("consultas")
    .update({ estado: "convertido" })
    .eq("id", consultaId);

  if (updateError) {
    throw new Error("No se pudo actualizar la consulta: " + updateError.message);
  }

  revalidatePath("/admin/clientes");
  revalidatePath("/admin/consultas");
}
