import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ClienteRowActions from "@/components/admin/ClienteRowActions";

const estadoColores: Record<string, string> = {
  nuevo: "bg-blue-50 text-blue-700",
  en_negociacion: "bg-yellow-50 text-yellow-700",
  cerrado: "bg-green-50 text-green-700",
  perdido: "bg-gray-100 text-gray-500",
};

const estadoLabels: Record<string, string> = {
  nuevo: "Nuevo",
  en_negociacion: "En negociación",
  cerrado: "Cerrado",
  perdido: "Perdido",
};

export default async function AdminClientes() {
  const supabase = await createClient();
  const { data: clientes } = await supabase
    .from("clientes")
    .select("*")
    .order("creado_en", { ascending: false });

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[#0D2B59]">
            Clientes
          </h1>
          <p className="mt-1 text-gray-600">
            {clientes?.length ?? 0} clientes en seguimiento
          </p>
        </div>

        <Link
          href="/admin/clientes/nuevo"
          className="h-[48px] rounded-xl bg-[#0D2B59] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59]"
        >
          + Nuevo cliente
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {!clientes || clientes.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center text-gray-500 shadow-sm">
            Todavía no cargaste ningún cliente.
          </div>
        ) : (
          clientes.map((c) => (
            <div
              key={c.id}
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-heading text-lg font-semibold text-[#0D2B59]">
                      {c.nombre}
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        estadoColores[c.estado] || "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {estadoLabels[c.estado] || c.estado}
                    </span>
                    {c.tipo && (
                      <span className="rounded-full bg-[#F5F5F5] px-3 py-1 text-xs font-semibold text-[#0D2B59]">
                        {c.tipo}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {c.whatsapp && <>WhatsApp: {c.whatsapp} </>}
                    {c.email && <> · Email: {c.email}</>}
                  </p>
                  {c.notas && (
                    <p className="mt-2 text-sm text-gray-600">{c.notas}</p>
                  )}
                  <p className="mt-2 text-xs text-gray-400">
                    Desde {new Date(c.creado_en).toLocaleDateString("es-AR")}
                  </p>
                </div>

                <ClienteRowActions id={c.id} estadoActual={c.estado} />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
