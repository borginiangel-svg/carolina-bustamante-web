"use client";

import { useState } from "react";
import { crearConsulta } from "@/lib/actions/consultas";

export default function ContactForm() {
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    whatsapp: "",
    email: "",
    tipoPropiedad: "Casa",
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
      asunto: `Interesado en: ${form.tipoPropiedad}`,
      mensaje: form.mensaje,
    });

    const numero = "5492215593304";
    const texto = encodeURIComponent(
      `Hola! Mi nombre es ${form.nombre}.\n` +
        `WhatsApp: ${form.whatsapp}\n` +
        `Email: ${form.email}\n` +
        `Tipo de propiedad: ${form.tipoPropiedad}\n` +
        `Mensaje: ${form.mensaje}`
    );

    window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
    setEnviado(true);
  }

  return (
    <section className="bg-[#0D2B59] py-24">
      <div className="mx-auto max-w-3xl px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            Solicitá tu Tasación Gratuita
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Analicemos juntos tu propiedad. Respondemos a la brevedad.
          </p>
        </div>

        {enviado ? (
          <div className="mt-10 rounded-xl bg-white p-8 text-center">
            <p className="font-heading text-xl font-semibold text-[#0D2B59]">
              ¡Gracias por tu consulta!
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
              name="tipoPropiedad"
              value={form.tipoPropiedad}
              onChange={handleChange}
              className="h-[52px] rounded-xl border border-gray-200 px-4 text-[#0D2B59] focus:border-[#0D2B59] focus:outline-none sm:col-span-2"
            >
              <option>Casa</option>
              <option>Departamento</option>
              <option>Terreno</option>
              <option>Local comercial</option>
              <option>Otro</option>
            </select>

            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              rows={4}
              placeholder="Contanos brevemente sobre tu consulta"
              className="rounded-xl border border-gray-200 px-4 py-3 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none sm:col-span-2"
            />

            <button
              type="submit"
              className="h-[52px] rounded-xl bg-[#C79A3B] font-semibold text-[#0D2B59] transition hover:bg-[#0D2B59] hover:text-white sm:col-span-2"
            >
              Enviar consulta
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
