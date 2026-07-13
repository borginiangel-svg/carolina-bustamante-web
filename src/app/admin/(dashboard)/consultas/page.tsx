import { createClient } from "@/lib/supabase/server";
import ConsultaRowActions from "@/components/admin/ConsultaRowActions";

const estadoColores: Record<string, string> = {
  nuevo: "bg-blue-50 text-blue-700",
  contactado: "bg-yellow-50 text-yellow-700",
  descartado: "bg-gray-100 text-gray-500",
  convertido: "bg-green-50 text-green-700",
};

export default async function AdminConsultas() {
  const supabase = await createClient();
  const { data: consultas } = await supabase
    .from("consultas")
    .select("*")
    .order("creado_en", { ascending: false });

  return (
    <>
      <h1 className="font-heading text-3xl font-semibold text-[#0D2B59]">
        Consultas
      </h1>
      <p className="mt-1 text-gray-600">
        {consultas?.length ?? 0} consultas recibidas desde el sitio
      </p>

      <div className="mt-8 space-y-4">
        {!consultas || consultas.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center text-gray-500 shadow-sm">
            Todavía no llegó ninguna consulta.
          </div>
        ) : (
          consultas.map((c) => (
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
                      {c.estado}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {c.whatsapp && <>WhatsApp: {c.whatsapp} </>}
                    {c.email && <> · Email: {c.email}</>}
                  </p>
                  {c.asunto && (
                    <p className="mt-2 text-sm font-semibold text-[#C79A3B]">
                      {c.asunto}
                    </p>
                  )}
                  {c.mensaje && (
                    <p className="mt-1 text-sm text-gray-600">{c.mensaje}</p>
                  )}
                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(c.creado_en).toLocaleString("es-AR")}
                  </p>
                </div>

                <ConsultaRowActions id={c.id} estadoActual={c.estado} />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
