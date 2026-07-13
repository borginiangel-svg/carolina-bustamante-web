import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { actualizarCliente } from "@/lib/actions/clientes";
import ClienteForm from "@/components/admin/ClienteForm";

export default async function EditarCliente({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: cliente } = await supabase
    .from("clientes")
    .select("*")
    .eq("id", id)
    .single();

  if (!cliente) {
    notFound();
  }

  const actualizarConId = actualizarCliente.bind(null, id);

  return (
    <>
      <h1 className="font-heading text-3xl font-semibold text-[#0D2B59]">
        Editar cliente
      </h1>
      <p className="mt-1 text-gray-600">{cliente.nombre}</p>

      <div className="mt-8">
        <ClienteForm
          action={actualizarConId}
          defaultValues={cliente}
          submitLabel="Guardar cambios"
        />
      </div>
    </>
  );
}
