"use client";

import { useState, useTransition } from "react";
import { actualizarEstadoConsulta, borrarConsulta } from "@/lib/actions/consultas";
import { convertirConsultaEnCliente } from "@/lib/actions/clientes";

const estados = ["nuevo", "contactado", "descartado", "convertido"];
const estadoColores: Record<string, string> = {
  nuevo: "bg-blue-50 text-blue-700",
  contactado: "bg-yellow-50 text-yellow-700",
  descartado: "bg-gray-100 text-gray-500",
  convertido: "bg-green-50 text-green-700",
};

type Consulta = {
  id: string;
  nombre: string;
  whatsapp: string | null;
  email: string | null;
  asunto: string | null;
  mensaje: string | null;
  estado: string;
  creado_en: string;
};

export default function ConsultaRow({ consulta }: { consulta: Consulta }) {
  const [estado, setEstado] = useState(consulta.estado);
  const [eliminada, setEliminada] = useState(false);
  const [, startTransition] = useTransition();

  function handleEstadoChange(nuevo: string) {
    setEstado(nuevo);
    startTransition(async () => {
      await actualizarEstadoConsulta(consulta.id, nuevo);
    });
  }

  function handleDelete() {
    if (!confirm("¿Seguro que querés borrar esta consulta?")) return;
    setEliminada(true);
    startTransition(async () => {
      await borrarConsulta(consulta.id);
    });
  }

  function handleConvertir() {
    if (!confirm(`¿Convertir a "${consulta.nombre}" en cliente para hacer seguimiento?`)) return;
    setEstado("convertido");
    startTransition(async () => {
      await convertirConsultaEnCliente(consulta.id, {
        nombre: consulta.nombre,
        whatsapp: consulta.whatsapp || "",
        email: consulta.email || "",
        tipo: "Comprador",
      });
    });
  }

  if (eliminada) return null;

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <p className="font-heading text-lg font-semibold text-[#0D2B59]">
              {consulta.nombre}
            </p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                estadoColores[estado] || "bg-gray-100 text-gray-500"
              }`}
            >
              {estado}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {consulta.whatsapp && <>WhatsApp: {consulta.whatsapp} </>}
            {consulta.email && <> · Email: {consulta.email}</>}
          </p>
          {consulta.asunto && (
            <p className="mt-2 text-sm font-semibold text-[#C79A3B]">{consulta.asunto}</p>
          )}
          {consulta.mensaje && (
            <p className="mt-1 text-sm text-gray-600">{consulta.mensaje}</p>
          )}
          <p className="mt-2 text-xs text-gray-400">
            {new Date(consulta.creado_en).toLocaleString("es-AR")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={estado}
            onChange={(e) => handleEstadoChange(e.target.value)}
            className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-semibold text-[#0D2B59]"
          >
            {estados.map((e) => (
              <option key={e} value={e}>
                {e.charAt(0).toUpperCase() + e.slice(1)}
              </option>
            ))}
          </select>

          {estado !== "convertido" && (
            <button
              onClick={handleConvertir}
              className="rounded-lg bg-[#0D2B59] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59]"
            >
              Convertir en cliente
            </button>
          )}

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
