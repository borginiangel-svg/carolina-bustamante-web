"use client";

import { useState } from "react";

const tipos = ["Visita", "Tasación"];
const estados = ["pendiente", "confirmado", "realizado", "cancelado"];
const estadoLabels: Record<string, string> = {
  pendiente: "Pendiente",
  confirmado: "Confirmado",
  realizado: "Realizado",
  cancelado: "Cancelado",
};

type Opcion = { id: string; label: string };

type Props = {
  action: (formData: FormData) => void;
  clientes: Opcion[];
  propiedades: Opcion[];
  defaultValues?: {
    tipo?: string;
    fecha_hora?: string;
    cliente_id?: string | null;
    propiedad_id?: string | null;
    direccion?: string;
    notas?: string;
    estado?: string;
  };
  submitLabel: string;
};

function toDatetimeLocal(value?: string) {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export default function TurnoForm({
  action,
  clientes,
  propiedades,
  defaultValues,
  submitLabel,
}: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <form
      action={async (formData) => {
        setLoading(true);
        await action(formData);
      }}
      className="grid grid-cols-1 gap-4 rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100 sm:grid-cols-2"
    >
      <select
        name="tipo"
        defaultValue={defaultValues?.tipo || tipos[0]}
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none"
      >
        {tipos.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>

      <input
        name="fecha_hora"
        type="datetime-local"
        required
        defaultValue={toDatetimeLocal(defaultValues?.fecha_hora)}
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none"
      />

      <select
        name="cliente_id"
        defaultValue={defaultValues?.cliente_id || ""}
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none"
      >
        <option value="">Sin cliente asignado</option>
        {clientes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>

      <select
        name="propiedad_id"
        defaultValue={defaultValues?.propiedad_id || ""}
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none"
      >
        <option value="">Sin propiedad asignada</option>
        {propiedades.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>

      <input
        name="direccion"
        defaultValue={defaultValues?.direccion}
        placeholder="Dirección del encuentro (opcional)"
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none"
      />

      <select
        name="estado"
        defaultValue={defaultValues?.estado || estados[0]}
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none"
      >
        {estados.map((e) => (
          <option key={e} value={e}>
            {estadoLabels[e]}
          </option>
        ))}
      </select>

      <textarea
        name="notas"
        rows={3}
        defaultValue={defaultValues?.notas}
        placeholder="Notas sobre el turno"
        className="rounded-xl border border-gray-200 px-4 py-3 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none sm:col-span-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="h-[52px] rounded-xl bg-[#0D2B59] font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59] disabled:opacity-60 sm:col-span-2"
      >
        {loading ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
