import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import TurnoRow from "@/components/admin/TurnoRow";

export default async function AdminAgenda() {
  const supabase = await createClient();
  const { data: turnos } = await supabase
    .from("turnos")
    .select("*, clientes(nombre), propiedades(titulo)")
    .order("fecha_hora", { ascending: true });

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[#0D2B59]">
            Agenda
          </h1>
          <p className="mt-1 text-gray-600">
            {turnos?.length ?? 0} turnos programados
          </p>
        </div>

        <Link
          href="/admin/agenda/nuevo"
          className="h-[48px] rounded-xl bg-[#0D2B59] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59]"
        >
          + Nuevo turno
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {!turnos || turnos.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center text-gray-500 shadow-sm">
            Todavía no hay turnos agendados.
          </div>
        ) : (
          turnos.map((t) => <TurnoRow key={t.id} turno={t} />)
        )}
      </div>
    </>
  );
}
