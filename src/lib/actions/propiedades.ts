"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type PropiedadInput = {
  titulo: string;
  descripcion: string;
  tipo: string;
  estado: string;
  barrio: string;
  direccion: string;
  precio: number;
  moneda: string;
  dormitorios: number;
  banos: number;
  superficie_m2: number;
  publicada: boolean;
  fotos: string[];
};

function parseForm(formData: FormData): PropiedadInput {
  return {
    titulo: String(formData.get("titulo") || ""),
    descripcion: String(formData.get("descripcion") || ""),
    tipo: String(formData.get("tipo") || "Casa"),
    estado: String(formData.get("estado") || "En venta"),
    barrio: String(formData.get("barrio") || ""),
    direccion: String(formData.get("direccion") || ""),
    precio: Number(formData.get("precio") || 0),
    moneda: String(formData.get("moneda") || "USD"),
    dormitorios: Number(formData.get("dormitorios") || 0),
    banos: Number(formData.get("banos") || 0),
    superficie_m2: Number(formData.get("superficie_m2") || 0),
    publicada: formData.get("publicada") === "on",
    fotos: formData.getAll("fotos").map(String),
  };
}

export async function crearPropiedad(formData: FormData) {
  const supabase = await createClient();
  const data = parseForm(formData);

  const { error } = await supabase.from("propiedades").insert(data);

  if (error) {
    throw new Error("No se pudo crear la propiedad: " + error.message);
  }

  revalidatePath("/admin/propiedades");
  revalidatePath("/propiedades");
  revalidatePath("/");
  redirect("/admin/propiedades");
}

export async function actualizarPropiedad(id: string, formData: FormData) {
  const supabase = await createClient();
  const data = parseForm(formData);

  const { error } = await supabase
    .from("propiedades")
    .update({ ...data, actualizado_en: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error("No se pudo actualizar la propiedad: " + error.message);
  }

  revalidatePath("/admin/propiedades");
  revalidatePath("/propiedades");
  revalidatePath("/");
  redirect("/admin/propiedades");
}

export async function borrarPropiedad(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("propiedades").delete().eq("id", id);

  if (error) {
    throw new Error("No se pudo borrar la propiedad: " + error.message);
  }

  revalidatePath("/admin/propiedades");
  revalidatePath("/propiedades");
  revalidatePath("/");
}

export async function togglePublicada(id: string, publicada: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("propiedades")
    .update({ publicada: !publicada })
    .eq("id", id);

  if (error) {
    throw new Error("No se pudo actualizar: " + error.message);
  }

  revalidatePath("/admin/propiedades");
  revalidatePath("/propiedades");
  revalidatePath("/");
}
