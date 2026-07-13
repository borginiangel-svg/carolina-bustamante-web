"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { crearConsulta } from "@/lib/actions/consultas";

const canales = [
  {
    titulo: "WhatsApp",
    valor: "+54 9 221 559-3304",
    href: "https://wa.me/5492215593304",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#25D366">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.87 14.02c-.25.7-1.24 1.29-2.03 1.46-.54.11-1.25.2-3.63-.78-3.05-1.26-5.01-4.36-5.16-4.56-.15-.2-1.23-1.64-1.23-3.13s.77-2.21 1.05-2.52c.27-.29.6-.36.79-.36.2 0 .4.002.57.01.18.008.43-.07.67.51.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.33 2.4 1.48.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.75-.18 1.45z" />
      </svg>
    ),
  },
  {
    titulo: "Email",
    valor: "CBbienesraices@outlook.com",
    href: "mailto:CBbienesraices@outlook.com",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D2B59" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    titulo: "Instagram",
    valor: "@carolinabustamantebienesraices",
    href: "https://instagram.com/carolinabustamantebienesraices",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D2B59" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="#0D2B59" />
      </svg>
    ),
  },
  {
    titulo: "Zona de cobertura",
    valor: "City Bell y Gran La Plata",
    href: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D2B59" strokeWidth="1.5">
        <path d="M12 21s-7-6.5-7-11a7 7 0 1114 0c0 4.5-7 11-7 11z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    whatsapp: "",
    email: "",
    asunto: "Consulta general",
    mensaje: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    crearConsulta({
      nombre: form.nombre,
      whatsapp: form.whatsapp,
      email: form.email,
      asunto: form.asunto,
      mensaje: form.mensaje,
    });

    const numero = "5492215593304";
    const texto = encodeURIComponent(
      `Hola! Mi nombre es ${form.nombre}.\n` +
        `WhatsApp: ${form.whatsapp}\n` +
        `Email: ${form.email}\n` +
        `Asunto: ${form.asunto}\n` +
        `Mensaje: ${form.mensaje}`
    );
    window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
    setEnviado(true);
  }

  return (
    <>
      <Header />

      <section className="bg-[#0D2B59] py-16">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <h1 className="font-heading text-4xl font-semibold text-white sm:text-5xl">
            Conversemos
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Estamos para ayudarte. Elegí el canal que prefieras y con gusto
            respondemos a la brevedad.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-8 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {canales.map((c) => {
            const contenido = (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F5F5F5]">
                  {c.icon}
                </div>
                <p className="mt-4 font-heading text-lg font-semibold text-[#0D2B59]">
                  {c.titulo}
                </p>
                <p className="mt-1 break-words text-sm text-gray-600">{c.valor}</p>
              </>
            );

            return c.href ? (
              <Link
                key={c.titulo}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
              >
                {contenido}
              </Link>
            ) : (
              <div
                key={c.titulo}
                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
              >
                {contenido}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#F5F5F5] py-20">
        <div className="mx-auto max-w-2xl px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-semibold text-[#0D2B59] sm:text-4xl">
              Escribinos
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Completá el formulario y te respondemos por WhatsApp.
            </p>
          </div>

          {enviado ? (
            <div className="mt-10 rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="font-heading text-xl font-semibold text-[#0D2B59]">
                ¡Gracias por escribirnos!
              </p>
              <p className="mt-2 text-gray-600">
                Te vamos a contactar por WhatsApp a la brevedad.
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

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none"
              />

              <select
                name="asunto"
                value={form.asunto}
                onChange={handleChange}
                className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none sm:col-span-2"
              >
                <option>Consulta general</option>
                <option>Quiero comprar</option>
                <option>Quiero vender</option>
                <option>Quiero alquilar</option>
                <option>Solicitar tasación</option>
                <option>Otro</option>
              </select>

              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows={4}
                placeholder="Contanos en qué podemos ayudarte"
                className="rounded-xl border border-gray-200 px-4 py-3 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none sm:col-span-2"
              />

              <button
                type="submit"
                className="h-[52px] rounded-xl bg-[#C79A3B] font-semibold text-[#0D2B59] transition hover:bg-[#0D2B59] hover:text-white sm:col-span-2"
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
