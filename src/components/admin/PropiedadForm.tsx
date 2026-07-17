"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

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
    fotos?: string[];
  };
  submitLabel: string;
};

export default function PropiedadForm({ action, defaultValues, submitLabel }: Props) {
  const [loading, setLoading] = useState(false);
  const [fotos, setFotos] = useState<string[]>(defaultValues?.fotos || []);
  const [subiendo, setSubiendo] = useState(false);
  const [errorFoto, setErrorFoto] = useState("");

  async function handleFotosChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setSubiendo(true);
    setErrorFoto("");
    const supabase = createClient();

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const nombreArchivo = `${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from("propiedades-fotos")
        .upload(nombreArchivo, file);

      if (error) {
        setErrorFoto("No se pudo subir " + file.name + ": " + error.message);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("propiedades-fotos")
        .getPublicUrl(nombreArchivo);

      setFotos((prev) => [...prev, urlData.publicUrl]);
    }

    setSubiendo(false);
    e.target.value = "";
  }

  function quitarFoto(url: string) {
    setFotos((prev) => prev.filter((f) => f !== url));
  }

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

      {/* Fotos */}
      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-[#0D2B59]">
          Fotos de la propiedad
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFotosChange}
          disabled={subiendo}
          className="block w-full text-sm text-gray-600 file:mr-4 file:h-[44px] file:rounded-xl file:border-0 file:bg-[#0D2B59] file:px-5 file:text-sm file:font-semibold file:text-white hover:file:bg-[#C79A3B] hover:file:text-[#0D2B59]"
        />

        {subiendo && (
          <p className="mt-2 text-sm text-gray-500">Subiendo foto...</p>
        )}
        {errorFoto && (
          <p className="mt-2 text-sm text-red-600">{errorFoto}</p>
        )}

        {fotos.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {fotos.map((url) => (
              <div key={url} className="group relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={url}
                  alt="Foto de la propiedad"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => quitarFoto(url)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Campos ocultos: mandan cada URL de foto al server action */}
        {fotos.map((url) => (
          <input key={url} type="hidden" name="fotos" value={url} />
        ))}
      </div>

      <button
        type="submit"
        disabled={loading || subiendo}
        className="h-[52px] rounded-xl bg-[#0D2B59] font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59] disabled:opacity-60 sm:col-span-2"
      >
        {loading ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
