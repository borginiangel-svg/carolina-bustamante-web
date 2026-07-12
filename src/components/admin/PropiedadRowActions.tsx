"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { borrarPropiedad, togglePublicada } from "@/lib/actions/propiedades";

export default function PropiedadRowActions({
  id,
  publicada,
}: {
  id: string;
  publicada: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    await togglePublicada(id, publicada);
    router.refresh();
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm("¿Seguro que querés borrar esta propiedad? No se puede deshacer.")) {
      return;
    }
    setLoading(true);
    await borrarPropiedad(id);
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
          publicada
            ? "bg-[#F5F5F5] text-gray-600 hover:bg-gray-200"
            : "bg-[#0D2B59] text-white hover:bg-[#C79A3B] hover:text-[#0D2B59]"
        }`}
      >
        {publicada ? "Despublicar" : "Publicar"}
      </button>

      <button
        onClick={() => router.push(`/admin/propiedades/${id}`)}
        className="rounded-lg bg-[#F5F5F5] px-3 py-1.5 text-xs font-semibold text-[#0D2B59] transition hover:bg-gray-200"
      >
        Editar
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
      >
        Borrar
      </button>
    </div>
  );
}
