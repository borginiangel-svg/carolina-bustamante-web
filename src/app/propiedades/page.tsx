"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const tipos = ["Tipo de propiedad", "Casa", "Departamento", "Terreno", "Local comercial"];
const barrios = ["Barrio / Zona", "Centro", "City Bell", "Gonnet", "Villa Elisa", "Tolosa", "Ringuelet"];
const precios = [
  "Rango de precio",
  "Hasta USD 50.000",
  "USD 50.000 - 100.000",
  "USD 100.000 - 200.000",
  "Más de USD 200.000",
];

type Propiedad = {
  id: number;
  estado: "En venta" | "En alquiler";
  titulo: string;
  tipo: string;
  barrio: string;
  precioLabel: string;
  precioUSD: number;
  dormitorios: number;
  banos: number;
  superficie: string;
};

const propiedades: Propiedad[] = [
  {
    id: 1,
    estado: "En venta",
    titulo: "Casa 3 ambientes con jardín",
    tipo: "Casa",
    barrio: "City Bell",
    precioLabel: "USD 145.000",
    precioUSD: 145000,
    dormitorios: 3,
    banos: 2,
    superficie: "180 m²",
  },
  {
    id: 2,
    estado: "En alquiler",
    titulo: "Departamento a estrenar",
    tipo: "Departamento",
    barrio: "Centro",
    precioLabel: "$ 320.000 /mes",
    precioUSD: 40000,
    dormitorios: 2,
    banos: 1,
    superficie: "65 m²",
  },
  {
    id: 3,
    estado: "En venta",
    titulo: "PH con patio propio",
    tipo: "Casa",
    barrio: "Tolosa",
    precioLabel: "USD 98.000",
    precioUSD: 98000,
    dormitorios: 2,
    banos: 1,
    superficie: "90 m²",
  },
  {
    id: 4,
    estado: "En venta",
    titulo: "Departamento con balcón terraza",
    tipo: "Departamento",
    barrio: "Gonnet",
    precioLabel: "USD 175.000",
    precioUSD: 175000,
    dormitorios: 3,
    banos: 2,
    superficie: "110 m²",
  },
  {
    id: 5,
    estado: "En venta",
    titulo: "Terreno para desarrollo",
    tipo: "Terreno",
    barrio: "Villa Elisa",
    precioLabel: "USD 65.000",
    precioUSD: 65000,
    dormitorios: 0,
    banos: 0,
    superficie: "400 m²",
  },
  {
    id: 6,
    estado: "En alquiler",
    titulo: "Local comercial sobre avenida",
    tipo: "Local comercial",
    barrio: "Centro",
    precioLabel: "$ 450.000 /mes",
    precioUSD: 55000,
    dormitorios: 0,
    banos: 1,
    superficie: "75 m²",
  },
  {
    id: 7,
    estado: "En venta",
    titulo: "Casa quinta con pileta",
    tipo: "Casa",
    barrio: "Ringuelet",
    precioLabel: "USD 240.000",
    precioUSD: 240000,
    dormitorios: 4,
    banos: 3,
    superficie: "320 m²",
  },
  {
    id: 8,
    estado: "En venta",
    titulo: "Monoambiente ideal inversión",
    tipo: "Departamento",
    barrio: "City Bell",
    precioLabel: "USD 42.000",
    precioUSD: 42000,
    dormitorios: 1,
    banos: 1,
    superficie: "35 m²",
  },
  {
    id: 9,
    estado: "En alquiler",
    titulo: "Casa 4 ambientes con garaje",
    tipo: "Casa",
    barrio: "Gonnet",
    precioLabel: "$ 580.000 /mes",
    precioUSD: 70000,
    dormitorios: 4,
    banos: 2,
    superficie: "200 m²",
  },
];

function precioEnRango(precioUSD: number, rango: string) {
  if (rango === precios[0]) return true;
  if (rango === "Hasta USD 50.000") return precioUSD <= 50000;
  if (rango === "USD 50.000 - 100.000") return precioUSD > 50000 && precioUSD <= 100000;
  if (rango === "USD 100.000 - 200.000") return precioUSD > 100000 && precioUSD <= 200000;
  if (rango === "Más de USD 200.000") return precioUSD > 200000;
  return true;
}

export default function Propiedades() {
  return (
    <Suspense fallback={null}>
      <PropiedadesContent />
    </Suspense>
  );
}

function PropiedadesContent() {
  const searchParams = useSearchParams();

  const [tipo, setTipo] = useState(searchParams.get("tipo") || tipos[0]);
  const [barrio, setBarrio] = useState(searchParams.get("barrio") || barrios[0]);
  const [precio, setPrecio] = useState(searchParams.get("precio") || precios[0]);

  const resultados = useMemo(() => {
    return propiedades.filter((p) => {
      const matchTipo = tipo === tipos[0] || p.tipo === tipo;
      const matchBarrio = barrio === barrios[0] || p.barrio === barrio;
      const matchPrecio = precioEnRango(p.precioUSD, precio);
      return matchTipo && matchBarrio && matchPrecio;
    });
  }, [tipo, barrio, precio]);

  function limpiarFiltros() {
    setTipo(tipos[0]);
    setBarrio(barrios[0]);
    setPrecio(precios[0]);
  }

  return (
    <>
      <Header />

      {/* Encabezado */}
      <section className="bg-[#0D2B59] py-16">
        <div className="mx-auto max-w-7xl px-8 text-center">
          <h1 className="font-heading text-4xl font-semibold text-white sm:text-5xl">
            Propiedades disponibles
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Encontrá la propiedad ideal en el Gran La Plata.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="border-b border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none"
            >
              {tipos.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <select
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
              className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none"
            >
              {barrios.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>

            <select
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none"
            >
              {precios.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>

            <button
              onClick={limpiarFiltros}
              className="h-[52px] rounded-xl border border-[#0D2B59] font-semibold text-[#0D2B59] transition hover:bg-[#0D2B59] hover:text-white"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="bg-[#F5F5F5] py-16">
        <div className="mx-auto max-w-7xl px-8">
          <p className="mb-8 text-sm text-gray-600">
            {resultados.length}{" "}
            {resultados.length === 1 ? "propiedad encontrada" : "propiedades encontradas"}
          </p>

          {resultados.length === 0 ? (
            <div className="rounded-xl bg-white p-16 text-center shadow-sm">
              <p className="font-heading text-xl font-semibold text-[#0D2B59]">
                No encontramos propiedades con esos filtros
              </p>
              <p className="mt-2 text-gray-600">
                Probá ajustar la búsqueda o escribinos y te ayudamos a encontrar la propiedad ideal.
              </p>
              <button
                onClick={limpiarFiltros}
                className="mt-6 h-[48px] rounded-xl bg-[#0D2B59] px-6 font-semibold text-white transition hover:bg-[#C79A3B]"
              >
                Ver todas las propiedades
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {resultados.map((p) => (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Placeholder de fotografía */}
                  <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-[#0D2B59] to-[#173d73]">
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0D2B59]">
                      {p.estado}
                    </span>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#C79A3B]">
                      {p.tipo} · {p.barrio}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-semibold text-[#0D2B59]">
                      {p.titulo}
                    </h3>
                    <p className="mt-3 text-xl font-semibold text-[#C79A3B]">{p.precioLabel}</p>

                    <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4 text-sm text-gray-600">
                      {p.dormitorios > 0 && <span>{p.dormitorios} dorm.</span>}
                      {p.banos > 0 && (
                        <span>
                          {p.banos} baño{p.banos > 1 ? "s" : ""}
                        </span>
                      )}
                      <span>{p.superficie}</span>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button className="h-[44px] flex-1 rounded-xl bg-[#0D2B59] text-sm font-semibold text-white transition hover:bg-[#C79A3B]">
                        Ver propiedad
                      </button>
                      <Link
                        href={`https://wa.me/5492215593304?text=${encodeURIComponent(
                          `Hola! Me interesa esta propiedad: ${p.titulo} (${p.barrio}, ${p.precioLabel})`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-[#25D366] text-white transition hover:opacity-90"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.87 14.02c-.25.7-1.24 1.29-2.03 1.46-.54.11-1.25.2-3.63-.78-3.05-1.26-5.01-4.36-5.16-4.56-.15-.2-1.23-1.64-1.23-3.13s.77-2.21 1.05-2.52c.27-.29.6-.36.79-.36.2 0 .4.002.57.01.18.008.43-.07.67.51.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.33 2.4 1.48.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.75-.18 1.45z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
