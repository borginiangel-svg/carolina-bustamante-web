import { crearCliente } from "@/lib/actions/clientes";
import ClienteForm from "@/components/admin/ClienteForm";

export default function NuevoCliente() {
  return (
    <>
      <h1 className="font-heading text-3xl font-semibold text-[#0D2B59]">
        Nuevo cliente
      </h1>
      <p className="mt-1 text-gray-600">
        Cargá los datos para empezar el seguimiento.
      </p>

      <div className="mt-8">
        <ClienteForm action={crearCliente} submitLabel="Crear cliente" />
      </div>
    </>
  );
}
