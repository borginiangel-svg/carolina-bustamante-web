import { createClient } from "@/lib/supabase/server";
import ConsultaRow from "@/components/admin/ConsultaRow";

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
          consultas.map((c) => <ConsultaRow key={c.id} consulta={c} />)
        )}
      </div>
    </>
  );
}
