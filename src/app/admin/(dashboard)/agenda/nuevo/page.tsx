import { createClient } from "@/lib/supabase/server";
import { crearTurno } from "@/lib/actions/turnos";
import TurnoForm from "@/components/admin/TurnoForm";

export default async function NuevoTurno() {
  const supabase = await createClient();

  const { data: clientes } = await supabase
    .from("clientes")
    .select("id, nombre")
    .order("nombre");

  const { data: propiedades } = await supabase
    .from("propiedades")
    .select("id, titulo")
    .order("titulo");

  return (
    <>
      <h1 className="font-heading text-3xl font-semibold text-[#0D2B59]">
        Nuevo turno
      </h1>
      <p className="mt-1 text-gray-600">
        Agendá una visita o tasación.
      </p>

      <div className="mt-8">
        <TurnoForm
          action={crearTurno}
          clientes={(clientes ?? []).map((c) => ({ id: c.id, label: c.nombre }))}
          propiedades={(propiedades ?? []).map((p) => ({
            id: p.id,
            label: p.titulo,
          }))}
          submitLabel="Crear turno"
        />
      </div>
    </>
  );
}
