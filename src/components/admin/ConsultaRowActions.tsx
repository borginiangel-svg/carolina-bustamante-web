"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { actualizarEstadoConsulta, borrarConsulta } from "@/lib/actions/consultas";

const estados = ["nuevo", "contactado", "descartado", "convertido"];

export default function ConsultaRowActions({
  id,
  estadoActual,
}: {
  id: string;
  estadoActual: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleEstadoChange(nuevoEstado: string) {
    setLoading(true);
    await actualizarEstadoConsulta(id, nuevoEstado);
    router.refresh();
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm("¿Seguro que querés borrar esta consulta?")) return;
    setLoading(true);
    await borrarConsulta(id);
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={estadoActual}
        onChange={(e) => handleEstadoChange(e.target.value)}
        disabled={loading}
        className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-semibold text-[#0D2B59] disabled:opacity-50"
      >
        {estados.map((e) => (
          <option key={e} value={e}>
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </option>
        ))}
      </select>

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
