import { createClient } from "@/lib/supabase/server";

export default async function AdminHome() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <h1 className="font-heading text-3xl font-semibold text-[#0D2B59]">
        ¡Bienvenido/a!
      </h1>
      <p className="mt-2 text-gray-600">
        Este es el panel de administración de Carolina Bustamante Bienes Raíces.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm text-gray-500">Propiedades publicadas</p>
          <p className="mt-2 font-heading text-3xl font-semibold text-[#0D2B59]">—</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm text-gray-500">Consultas nuevas</p>
          <p className="mt-2 font-heading text-3xl font-semibold text-[#0D2B59]">—</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm text-gray-500">Clientes activos</p>
          <p className="mt-2 font-heading text-3xl font-semibold text-[#0D2B59]">—</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm text-gray-500">Turnos esta semana</p>
          <p className="mt-2 font-heading text-3xl font-semibold text-[#0D2B59]">—</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <p className="text-sm text-gray-600">
          Sesión iniciada correctamente como <strong>{user?.email}</strong>.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Los números de arriba se van a completar con datos reales en los
          próximos sprints (Propiedades, Consultas, Clientes y Agenda).
        </p>
      </div>
    </>
  );
}
