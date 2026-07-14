"use client";

import { useState } from "react";
import Image from "next/image";

const tipos = ["Tipo de propiedad", "Casa", "Departamento", "Terreno", "Local comercial"];
const barrios = ["Barrio / Zona", "Centro", "City Bell", "Gonnet", "Villa Elisa", "Tolosa", "Ringuelet"];
const precios = ["Rango de precio", "Hasta USD 50.000", "USD 50.000 - 100.000", "USD 100.000 - 200.000", "Más de USD 200.000"];

export default function Hero() {
  const [tipo, setTipo] = useState(tipos[0]);
  const [barrio, setBarrio] = useState(barrios[0]);
  const [precio, setPrecio] = useState(precios[0]);

  function handleBuscar() {
    const params = new URLSearchParams();
    if (tipo !== tipos[0]) params.set("tipo", tipo);
    if (barrio !== barrios[0]) params.set("barrio", barrio);
    if (precio !== precios[0]) params.set("precio", precio);
    window.location.href = `/propiedades?${params.toString()}`;
  }

  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden">
      {/* Foto de fondo real */}
      <Image
        src="/images/hero-casa.jpg"
        alt="Casa premium en Gran La Plata"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "65% 40%" }}
      />

      {/* Degradado azul institucional oscureciendo la base, para que el texto se lea bien */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B59] via-[#0D2B59]/70 to-[#0D2B59]/40" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <h1 className="font-heading text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
          Conectamos propiedades con personas
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/90">
          Acompañamos cada decisión inmobiliaria con transparencia, cercanía y conocimiento
          profundo del mercado del Gran La Plata.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={handleBuscar}
            className="h-[52px] rounded-xl bg-[#C79A3B] px-8 font-semibold text-[#0D2B59] transition hover:bg-white"
          >
            Ver propiedades
          </button>
          <button className="h-[52px] rounded-xl border border-white bg-transparent px-8 font-semibold text-white transition hover:bg-white hover:text-[#0D2B59]">
            Tasación Gratuita
          </button>
        </div>

        {/* Buscador funcional */}
        <div className="mt-12 grid w-full grid-cols-1 gap-3 rounded-2xl bg-white p-4 shadow-xl sm:grid-cols-4">
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
            onClick={handleBuscar}
            className="h-[52px] rounded-xl bg-[#0D2B59] font-semibold text-white transition hover:bg-[#C79A3B]"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
