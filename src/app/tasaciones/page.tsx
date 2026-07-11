"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const beneficios = [
  {
    titulo: "Conocimiento real del mercado",
    descripcion: "Analizamos propiedades comparables en tu barrio, no estimaciones genéricas.",
  },
  {
    titulo: "Sin compromiso",
    descripcion: "La tasación es gratuita y no te obliga a nada. Vos decidís los próximos pasos.",
  },
  {
    titulo: "Informe claro y fundamentado",
    descripcion: "Te explicamos cómo llegamos a ese valor, con criterios profesionales y transparentes.",
  },
  {
    titulo: "Respuesta rápida",
    descripcion: "Coordinamos la visita a la brevedad y te acercamos el resultado sin demoras.",
  },
];

const pasos = [
  "Nos escribís por WhatsApp o completás el formulario con los datos de tu propiedad.",
  "Coordinamos una visita en el horario que más te convenga.",
  "Analizamos el mercado local y las condiciones actuales de tu propiedad.",
  "Te entregamos un informe de valor claro, sin ningún compromiso de tu parte.",
];

export default function Tasaciones() {
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    whatsapp: "",
    direccion: "",
    tipoPropiedad: "Casa",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const numero = "5492215593304";
    const texto = encodeURIComponent(
      `Hola! Quiero solicitar una tasación gratuita.\n` +
        `Nombre: ${form.nombre}\n` +
        `WhatsApp: ${form.whatsapp}\n` +
        `Dirección de la propiedad: ${form.direccion}\n` +
        `Tipo de propiedad: ${form.tipoPropiedad}`
    );
    window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
    setEnviado(true);
  }

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-[#0D2B59] py-20">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <p className="font-semibold uppercase tracking-wide text-[#C79A3B]">
            Sin costo, sin compromiso
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">
            Tasación Gratuita de tu propiedad
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            Analicemos juntos el valor real de tu propiedad, con criterio profesional
            y conocimiento del mercado del Gran La Plata.
          </p>
        </div>
      </section>

      {/* Beneficios */}
      <section className="mx-auto max-w-6xl px-8 py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {beneficios.map((b) => (
            <div
              key={b.titulo}
              className="rounded-xl bg-[#F5F5F5] p-8"
            >
              <h3 className="font-heading text-xl font-semibold text-[#0D2B59]">
                {b.titulo}
              </h3>
              <p className="mt-3 text-gray-600">{b.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proceso */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="mx-auto max-w-3xl px-8">
          <h2 className="text-center font-heading text-3xl font-semibold text-[#0D2B59] sm:text-4xl">
            Cómo funciona
          </h2>

          <ol className="mt-12 space-y-6">
            {pasos.map((paso, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0D2B59] font-semibold text-white">
                  {idx + 1}
                </span>
                <span className="pt-2 text-gray-700">{paso}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Formulario */}
      <section id="formulario" className="scroll-mt-24 bg-[#0D2B59] py-20">
        <div className="mx-auto max-w-2xl px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
              Solicitá tu tasación
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Completá tus datos y te contactamos a la brevedad.
            </p>
          </div>

          {enviado ? (
            <div className="mt-10 rounded-xl bg-white p-8 text-center">
              <p className="font-heading text-xl font-semibold text-[#0D2B59]">
                ¡Gracias por tu consulta!
              </p>
              <p className="mt-2 text-gray-600">
                Te vamos a contactar por WhatsApp para coordinar la visita.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 grid grid-cols-1 gap-4 rounded-xl bg-white p-8 shadow-xl sm:grid-cols-2"
            >
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                placeholder="Nombre completo"
                className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none sm:col-span-2"
              />

              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                required
                placeholder="WhatsApp"
                className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none"
              />

              <select
                name="tipoPropiedad"
                value={form.tipoPropiedad}
                onChange={handleChange}
                className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none"
              >
                <option>Casa</option>
                <option>Departamento</option>
                <option>Terreno</option>
                <option>Local comercial</option>
                <option>Otro</option>
              </select>

              <input
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                required
                placeholder="Dirección o barrio de la propiedad"
                className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none sm:col-span-2"
              />

              <button
                type="submit"
                className="h-[52px] rounded-xl bg-[#C79A3B] font-semibold text-[#0D2B59] transition hover:bg-white sm:col-span-2"
              >
                Solicitar tasación gratuita
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-white/70">
            ¿Preferís hablar directo?{" "}
            <Link
              href="https://wa.me/5492215593304"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#C79A3B] hover:text-white"
            >
              Escribinos por WhatsApp
            </Link>
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
