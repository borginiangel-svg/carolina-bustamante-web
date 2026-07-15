import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PropiedadRow from "@/components/admin/PropiedadRow";

export default async function AdminPropiedades() {
  const supabase = await createClient();
  const { data: propiedades } = await supabase
    .from("propiedades")
    .select("*")
    .order("creado_en", { ascending: false });

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[#0D2B59]">
            Propiedades
          </h1>
          <p className="mt-1 text-gray-600">
            {propiedades?.length ?? 0} propiedades cargadas
          </p>
        </div>

        <Link
          href="/admin/propiedades/nueva"
          className="h-[48px] rounded-xl bg-[#0D2B59] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59]"
        >
          + Nueva propiedad
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
        {!propiedades || propiedades.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            Todavía no cargaste ninguna propiedad.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-[#F5F5F5] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Título</th>
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3">Barrio</th>
                <th className="px-6 py-3">Precio</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {propiedades.map((p) => (
                <PropiedadRow key={p.id} propiedad={p} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
