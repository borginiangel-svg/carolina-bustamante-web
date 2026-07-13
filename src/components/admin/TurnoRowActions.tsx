"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { actualizarEstadoTurno, borrarTurno } from "@/lib/actions/turnos";

const estados = ["pendiente", "confirmado", "realizado", "cancelado"];
const estadoLabels: Record<string, string> = {
  pendiente: "Pendiente",
  confirmado: "Confirmado",
  realizado: "Realizado",
  cancelado: "Cancelado",
};

export default function TurnoRowActions({
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
    await actualizarEstadoTurno(id, nuevoEstado);
    router.refresh();
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm("¿Seguro que querés borrar este turno?")) return;
    setLoading(true);
    await borrarTurno(id);
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
            {estadoLabels[e]}
          </option>
        ))}
      </select>

      <button
        onClick={() => router.push(`/admin/agenda/${id}`)}
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
