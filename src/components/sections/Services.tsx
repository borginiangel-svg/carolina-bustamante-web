const servicios = [
  {
    titulo: "Compra",
    descripcion: "Te acompañamos en la búsqueda de la propiedad ideal, con asesoramiento en cada paso.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D2B59" strokeWidth="1.5">
        <path d="M3 10l9-7 9 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9v11h14V9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 20v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    titulo: "Venta",
    descripcion: "Estrategia, difusión y negociación profesional para vender tu propiedad al mejor valor.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D2B59" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    titulo: "Alquiler",
    descripcion: "Gestionamos el alquiler de tu propiedad o te ayudamos a encontrar el lugar donde vivir.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D2B59" strokeWidth="1.5">
        <rect x="3" y="7" width="18" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    titulo: "Tasación",
    descripcion: "Valoramos tu propiedad con criterio profesional y conocimiento real del mercado local.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D2B59" strokeWidth="1.5">
        <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 21l-4.3-4.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-semibold text-[#0D2B59] sm:text-4xl">
          Nuestros Servicios
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Un acompañamiento profesional en cada etapa de tu decisión inmobiliaria.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {servicios.map((s) => (
          <div
            key={s.titulo}
            className="group rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F5F5F5]">
              {s.icon}
            </div>
            <h3 className="mt-6 font-heading text-xl font-semibold text-[#0D2B59]">
              {s.titulo}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {s.descripcion}
            </p>
            <button className="mt-5 text-sm font-semibold text-[#C79A3B] transition group-hover:text-[#0D2B59]">
              Conocer más →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}