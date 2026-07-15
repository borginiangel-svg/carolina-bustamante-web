import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ClienteRow from "@/components/admin/ClienteRow";

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
          clientes.map((c) => <ClienteRow key={c.id} cliente={c} />)
        )}
      </div>
    </>
  );
}
