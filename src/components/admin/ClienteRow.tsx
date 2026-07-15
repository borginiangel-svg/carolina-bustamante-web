"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { actualizarEstadoCliente, borrarCliente } from "@/lib/actions/clientes";

const estados = ["nuevo", "en_negociacion", "cerrado", "perdido"];
const estadoLabels: Record<string, string> = {
  nuevo: "Nuevo",
  en_negociacion: "En negociación",
  cerrado: "Cerrado",
  perdido: "Perdido",
};
const estadoColores: Record<string, string> = {
  nuevo: "bg-blue-50 text-blue-700",
  en_negociacion: "bg-yellow-50 text-yellow-700",
  cerrado: "bg-green-50 text-green-700",
  perdido: "bg-gray-100 text-gray-500",
};

type Cliente = {
  id: string;
  nombre: string;
  whatsapp: string | null;
  email: string | null;
  tipo: string | null;
  estado: string;
  notas: string | null;
  creado_en: string;
};

export default function ClienteRow({ cliente }: { cliente: Cliente }) {
  const router = useRouter();
  const [estado, setEstado] = useState(cliente.estado);
  const [eliminado, setEliminado] = useState(false);
  const [, startTransition] = useTransition();

  function handleEstadoChange(nuevo: string) {
    setEstado(nuevo);
    startTransition(async () => {
      await actualizarEstadoCliente(cliente.id, nuevo);
    });
  }

  function handleDelete() {
    if (!confirm("¿Seguro que querés borrar este cliente?")) return;
    setEliminado(true);
    startTransition(async () => {
      await borrarCliente(cliente.id);
    });
  }

  if (eliminado) return null;

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <p className="font-heading text-lg font-semibold text-[#0D2B59]">
              {cliente.nombre}
            </p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                estadoColores[estado] || "bg-gray-100 text-gray-500"
              }`}
            >
              {estadoLabels[estado] || estado}
            </span>
            {cliente.tipo && (
              <span className="rounded-full bg-[#F5F5F5] px-3 py-1 text-xs font-semibold text-[#0D2B59]">
                {cliente.tipo}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {cliente.whatsapp && <>WhatsApp: {cliente.whatsapp} </>}
            {cliente.email && <> · Email: {cliente.email}</>}
          </p>
          {cliente.notas && (
            <p className="mt-2 text-sm text-gray-600">{cliente.notas}</p>
          )}
          <p className="mt-2 text-xs text-gray-400">
            Desde {new Date(cliente.creado_en).toLocaleDateString("es-AR")}
          </p>
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
            onClick={() => router.push(`/admin/clientes/${cliente.id}`)}
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
