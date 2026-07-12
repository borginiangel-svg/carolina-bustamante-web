import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { actualizarPropiedad } from "@/lib/actions/propiedades";
import PropiedadForm from "@/components/admin/PropiedadForm";

export default async function EditarPropiedad({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: propiedad } = await supabase
    .from("propiedades")
    .select("*")
    .eq("id", id)
    .single();

  if (!propiedad) {
    notFound();
  }

  const actualizarConId = actualizarPropiedad.bind(null, id);

  return (
    <>
      <h1 className="font-heading text-3xl font-semibold text-[#0D2B59]">
        Editar propiedad
      </h1>
      <p className="mt-1 text-gray-600">{propiedad.titulo}</p>

      <div className="mt-8">
        <PropiedadForm
          action={actualizarConId}
          defaultValues={propiedad}
          submitLabel="Guardar cambios"
        />
      </div>
    </>
  );
}
