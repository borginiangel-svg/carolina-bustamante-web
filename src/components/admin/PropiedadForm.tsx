"use client";

import { useState } from "react";

const tipos = ["Casa", "Departamento", "Terreno", "Local comercial"];
const estados = ["En venta", "En alquiler"];
const barrios = ["Centro", "City Bell", "Gonnet", "Villa Elisa", "Tolosa", "Ringuelet"];
const monedas = ["USD", "ARS"];

type Props = {
  action: (formData: FormData) => void;
  defaultValues?: {
    titulo?: string;
    descripcion?: string;
    tipo?: string;
    estado?: string;
    barrio?: string;
    direccion?: string;
    precio?: number;
    moneda?: string;
    dormitorios?: number;
    banos?: number;
    superficie_m2?: number;
    publicada?: boolean;
  };
  submitLabel: string;
};

export default function PropiedadForm({ action, defaultValues, submitLabel }: Props) {
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
        name="titulo"
        required
        defaultValue={defaultValues?.titulo}
        placeholder="Título de la propiedad"
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none sm:col-span-2"
      />

      <textarea
        name="descripcion"
        rows={3}
        defaultValue={defaultValues?.descripcion}
        placeholder="Descripción"
        className="rounded-xl border border-gray-200 px-4 py-3 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none sm:col-span-2"
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
          <option key={e}>{e}</option>
        ))}
      </select>

      <select
        name="barrio"
        defaultValue={defaultValues?.barrio || barrios[0]}
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none"
      >
        {barrios.map((b) => (
          <option key={b}>{b}</option>
        ))}
      </select>

      <input
        name="direccion"
        defaultValue={defaultValues?.direccion}
        placeholder="Dirección (opcional)"
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none"
      />

      <input
        name="precio"
        type="number"
        required
        min={0}
        defaultValue={defaultValues?.precio}
        placeholder="Precio"
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none"
      />

      <select
        name="moneda"
        defaultValue={defaultValues?.moneda || monedas[0]}
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none"
      >
        {monedas.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>

      <input
        name="dormitorios"
        type="number"
        min={0}
        defaultValue={defaultValues?.dormitorios ?? 0}
        placeholder="Dormitorios"
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none"
      />

      <input
        name="banos"
        type="number"
        min={0}
        defaultValue={defaultValues?.banos ?? 0}
        placeholder="Baños"
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none"
      />

      <input
        name="superficie_m2"
        type="number"
        min={0}
        defaultValue={defaultValues?.superficie_m2}
        placeholder="Superficie (m²)"
        className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none"
      />

      <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#0D2B59]">
        <input
          type="checkbox"
          name="publicada"
          defaultChecked={defaultValues?.publicada ?? true}
          className="h-5 w-5 accent-[#0D2B59]"
        />
        Publicada (visible en el sitio)
      </label>

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
