"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { borrarPropiedad, togglePublicada } from "@/lib/actions/propiedades";

type Propiedad = {
  id: string;
  titulo: string;
  tipo: string;
  barrio: string;
  precio: number;
  moneda: string;
  publicada: boolean;
  fotos?: string[];
};

export default function PropiedadRow({ propiedad }: { propiedad: Propiedad }) {
  const router = useRouter();
  const [publicada, setPublicada] = useState(propiedad.publicada);
  const [eliminada, setEliminada] = useState(false);
  const [, startTransition] = useTransition();

  function handleToggle() {
    const anterior = publicada;
    setPublicada(!anterior);
    startTransition(async () => {
      await togglePublicada(propiedad.id, anterior);
    });
  }

  function handleDelete() {
    if (!confirm("¿Seguro que querés borrar esta propiedad? No se puede deshacer.")) return;
    setEliminada(true);
    startTransition(async () => {
      await borrarPropiedad(propiedad.id);
    });
  }

  if (eliminada) return null;

  return (
    <tr className="border-b border-gray-50 last:border-0">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#F5F5F5]">
            {propiedad.fotos && propiedad.fotos.length > 0 && (
              <Image
                src={propiedad.fotos[0]}
                alt={propiedad.titulo}
                fill
                className="object-cover"
              />
            )}
          </div>
          <span className="font-medium text-[#0D2B59]">{propiedad.titulo}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600">{propiedad.tipo}</td>
      <td className="px-6 py-4 text-gray-600">{propiedad.barrio}</td>
      <td className="px-6 py-4 text-gray-600">
        {propiedad.moneda} {Number(propiedad.precio).toLocaleString("es-AR")}
      </td>
      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            publicada ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          {publicada ? "Publicada" : "Oculta"}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggle}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              publicada
                ? "bg-[#F5F5F5] text-gray-600 hover:bg-gray-200"
                : "bg-[#0D2B59] text-white hover:bg-[#C79A3B] hover:text-[#0D2B59]"
            }`}
          >
            {publicada ? "Despublicar" : "Publicar"}
          </button>
          <button
            onClick={() => router.push(`/admin/propiedades/${propiedad.id}`)}
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
      </td>
    </tr>
  );
}
