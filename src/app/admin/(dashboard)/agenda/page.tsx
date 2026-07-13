import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import TurnoRowActions from "@/components/admin/TurnoRowActions";

const estadoColores: Record<string, string> = {
  pendiente: "bg-yellow-50 text-yellow-700",
  confirmado: "bg-blue-50 text-blue-700",
  realizado: "bg-green-50 text-green-700",
  cancelado: "bg-gray-100 text-gray-500",
};

const estadoLabels: Record<string, string> = {
  pendiente: "Pendiente",
  confirmado: "Confirmado",
  realizado: "Realizado",
  cancelado: "Cancelado",
};

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
          turnos.map((t) => {
            const fecha = new Date(t.fecha_hora);
            return (
              <div
                key={t.id}
                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="font-heading text-lg font-semibold text-[#0D2B59]">
                        {t.tipo}
                      </p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          estadoColores[t.estado] || "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {estadoLabels[t.estado] || t.estado}
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-[#C79A3B]">
                      {fecha.toLocaleDateString("es-AR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}{" "}
                      ·{" "}
                      {fecha.toLocaleTimeString("es-AR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      hs
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {t.clientes?.nombre && <>Cliente: {t.clientes.nombre} </>}
                      {t.propiedades?.titulo && (
                        <> · Propiedad: {t.propiedades.titulo}</>
                      )}
                    </p>

                    {t.direccion && (
                      <p className="mt-1 text-sm text-gray-500">{t.direccion}</p>
                    )}

                    {t.notas && (
                      <p className="mt-2 text-sm text-gray-600">{t.notas}</p>
                    )}
                  </div>

                  <TurnoRowActions id={t.id} estadoActual={t.estado} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
