import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { actualizarTurno } from "@/lib/actions/turnos";
import TurnoForm from "@/components/admin/TurnoForm";

export default async function EditarTurno({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: turno } = await supabase
    .from("turnos")
    .select("*")
    .eq("id", id)
    .single();

  if (!turno) {
    notFound();
  }

  const { data: clientes } = await supabase
    .from("clientes")
    .select("id, nombre")
    .order("nombre");

  const { data: propiedades } = await supabase
    .from("propiedades")
    .select("id, titulo")
    .order("titulo");

  const actualizarConId = actualizarTurno.bind(null, id);

  return (
    <>
      <h1 className="font-heading text-3xl font-semibold text-[#0D2B59]">
        Editar turno
      </h1>
      <p className="mt-1 text-gray-600">{turno.tipo}</p>

      <div className="mt-8">
        <TurnoForm
          action={actualizarConId}
          clientes={(clientes ?? []).map((c) => ({ id: c.id, label: c.nombre }))}
          propiedades={(propiedades ?? []).map((p) => ({
            id: p.id,
            label: p.titulo,
          }))}
          defaultValues={turno}
          submitLabel="Guardar cambios"
        />
      </div>
    </>
  );
}
