"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { sendLeadNotification } from "@/lib/email";

export async function crearConsulta(data: {
  nombre: string;
  whatsapp?: string;
  email?: string;
  asunto?: string;
  mensaje?: string;
}) {
  const supabase = await createClient();

  // Rate limiting: evitar que el mismo email o whatsapp mande varias
  // consultas seguidas en poco tiempo (protección básica contra spam/bots).
  const haceUnMinuto = new Date(Date.now() - 60 * 1000).toISOString();
  if (data.email || data.whatsapp) {
    let query = supabase
      .from("consultas")
      .select("id")
      .gte("creado_en", haceUnMinuto);

    if (data.email) {
      query = query.eq("email", data.email);
    } else if (data.whatsapp) {
      query = query.eq("whatsapp", data.whatsapp);
    }

    const { data: recientes } = await query;
    if (recientes && recientes.length > 0) {
      throw new Error(
        "Ya recibimos tu consulta. Por favor esperá un momento antes de enviar otra."
      );
    }
  }

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
  } else {
    // Si se guardó bien, avisamos por mail. Si el mail falla, no rompe el guardado.
    await sendLeadNotification({
      nombre: data.nombre,
      whatsapp: data.whatsapp,
      email: data.email,
      asunto: data.asunto,
      mensaje: data.mensaje,
    });
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
