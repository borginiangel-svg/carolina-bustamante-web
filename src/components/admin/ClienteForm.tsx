"use client";

import { useState } from "react";

const tipos = ["Comprador", "Vendedor", "Inquilino", "Propietario"];
const estados = ["nuevo", "en_negociacion", "cerrado", "perdido"];

const estadoLabels: Record<string, string> = {
  nuevo: "Nuevo",
  en_negociacion: "En negociación",
  cerrado: "Cerrado",
  perdido: "Perdido",
};

type Props = {
  action: (formData: FormData) => void;
  defaultValues?: {
    nombre?: string;
    whatsapp?: string;
    email?: string;
    tipo?: string;
    estado?: string;
    notas?: string;
  };
  submitLabel: string;
};

export default function ClienteForm({ action, defaultValues, submitLabel }: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <form
      action={async (formData) => {
        setLoading(true);
        await action(formData);
      }}
      className="grid grid-cols-1 gap-4 rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100 sm:grid-cols-2"
    >
      <input
        name="nombre"
        required
        defaultValue={defaultValues?.nombre}
        placeholder="Nombre completo"
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none sm:col-span-2"
      />

      <input
        name="whatsapp"
        defaultValue={defaultValues?.whatsapp}
        placeholder="WhatsApp"
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none"
      />

      <input
        name="email"
        type="email"
        defaultValue={defaultValues?.email}
        placeholder="Email"
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none"
      />

      <select
        name="tipo"
        defaultValue={defaultValues?.tipo || tipos[0]}
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none"
      >
        {tipos.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>

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
        rows={4}
        defaultValue={defaultValues?.notas}
        placeholder="Notas de seguimiento (historial de contacto, preferencias, etc.)"
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
