import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminHome() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-6">
          <Image
            src="/images/logo-badge-navbar.png"
            alt="Carolina Bustamante Bienes Raíces"
            width={300}
            height={300}
            className="h-10 w-10 object-contain"
          />
          <span className="font-heading text-lg font-semibold text-[#0D2B59]">
            Panel
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          <Link
            href="/admin"
            className="block rounded-lg bg-[#0D2B59] px-4 py-3 text-sm font-semibold text-white"
          >
            Inicio
          </Link>
          <span className="block cursor-not-allowed rounded-lg px-4 py-3 text-sm font-medium text-gray-400">
            Propiedades (próximamente)
          </span>
          <span className="block cursor-not-allowed rounded-lg px-4 py-3 text-sm font-medium text-gray-400">
            Consultas (próximamente)
          </span>
          <span className="block cursor-not-allowed rounded-lg px-4 py-3 text-sm font-medium text-gray-400">
            Clientes (próximamente)
          </span>
          <span className="block cursor-not-allowed rounded-lg px-4 py-3 text-sm font-medium text-gray-400">
            Agenda (próximamente)
          </span>
        </nav>

        <div className="border-t border-gray-100 p-4">
          <p className="truncate px-2 text-xs text-gray-500">{user.email}</p>
          <LogoutButton />
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-10">
        <h1 className="font-heading text-3xl font-semibold text-[#0D2B59]">
          ¡Bienvenido/a!
        </h1>
        <p className="mt-2 text-gray-600">
          Este es el panel de administración de Carolina Bustamante Bienes Raíces.
        </p>

        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm text-gray-600">
            Sesión iniciada correctamente como <strong>{user.email}</strong>.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Las secciones de Propiedades, Consultas, Clientes y Agenda se
            van a habilitar en los próximos sprints.
          </p>
        </div>
      </main>
    </div>
  );
}
