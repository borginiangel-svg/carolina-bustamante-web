"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { actualizarEstadoTurno, borrarTurno } from "@/lib/actions/turnos";

const estados = ["pendiente", "confirmado", "realizado", "cancelado"];
const estadoLabels: Record<string, string> = {
  pendiente: "Pendiente",
  confirmado: "Confirmado",
  realizado: "Realizado",
  cancelado: "Cancelado",
};
const estadoColores: Record<string, string> = {
  pendiente: "bg-yellow-50 text-yellow-700",
  confirmado: "bg-blue-50 text-blue-700",
  realizado: "bg-green-50 text-green-700",
  cancelado: "bg-gray-100 text-gray-500",
};

type Turno = {
  id: string;
  tipo: string;
  fecha_hora: string;
  direccion: string | null;
  notas: string | null;
  estado: string;
  clientes: { nombre: string } | null;
  propiedades: { titulo: string } | null;
};

export default function TurnoRow({ turno }: { turno: Turno }) {
  const router = useRouter();
  const [estado, setEstado] = useState(turno.estado);
  const [eliminado, setEliminado] = useState(false);
  const [, startTransition] = useTransition();

  function handleEstadoChange(nuevo: string) {
    setEstado(nuevo);
    startTransition(async () => {
      await actualizarEstadoTurno(turno.id, nuevo);
    });
  }

  function handleDelete() {
    if (!confirm("¿Seguro que querés borrar este turno?")) return;
    setEliminado(true);
    startTransition(async () => {
      await borrarTurno(turno.id);
    });
  }

  if (eliminado) return null;

  const fecha = new Date(turno.fecha_hora);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <p className="font-heading text-lg font-semibold text-[#0D2B59]">{turno.tipo}</p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                estadoColores[estado] || "bg-gray-100 text-gray-500"
              }`}
            >
              {estadoLabels[estado] || estado}
            </span>
          </div>

          <p className="mt-2 text-sm font-semibold text-[#C79A3B]">
            {fecha.toLocaleDateString("es-AR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}{" "}
            ·{" "}
            {fecha.toLocaleTimeString("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            hs
          </p>

          <p className="mt-1 text-sm text-gray-600">
            {turno.clientes?.nombre && <>Cliente: {turno.clientes.nombre} </>}
            {turno.propiedades?.titulo && <> · Propiedad: {turno.propiedades.titulo}</>}
          </p>

          {turno.direccion && (
            <p className="mt-1 text-sm text-gray-500">{turno.direccion}</p>
          )}

          {turno.notas && <p className="mt-2 text-sm text-gray-600">{turno.notas}</p>}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={estado}
            onChange={(e) => handleEstadoChange(e.target.value)}
            className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-semibold text-[#0D2B59]"
          >
            {estados.map((e) => (
              <option key={e} value={e}>
                {estadoLabels[e]}
              </option>
            ))}
          </select>

          <button
            onClick={() => router.push(`/admin/agenda/${turno.id}`)}
            className="rounded-lg bg-[#F5F5F5] px-3 py-1.5 text-xs font-semibold text-[#0D2B59] transition hover:bg-gray-200"
          >
            Editar
          </button>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
}
