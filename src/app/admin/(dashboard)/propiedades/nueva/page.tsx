import { crearPropiedad } from "@/lib/actions/propiedades";
import PropiedadForm from "@/components/admin/PropiedadForm";

export default function NuevaPropiedad() {
  return (
    <>
      <h1 className="font-heading text-3xl font-semibold text-[#0D2B59]">
        Nueva propiedad
      </h1>
      <p className="mt-1 text-gray-600">
        Completá los datos para publicarla en el sitio.
      </p>

      <div className="mt-8">
        <PropiedadForm action={crearPropiedad} submitLabel="Crear propiedad" />
      </div>
    </>
  );
}
