const testimonios = [
  {
    nombre: "María Fernández",
    comentario:
      "Carolina nos acompañó en todo el proceso de venta con una transparencia que no habíamos visto antes. Nos sentimos cuidados en cada paso.",
    calificacion: 5,
  },
  {
    nombre: "Lucas Gómez",
    comentario:
      "Encontramos nuestro primer departamento gracias a su asesoramiento. Nunca sentimos presión, solo acompañamiento real.",
    calificacion: 5,
  },
  {
    nombre: "Sofía Martínez",
    comentario:
      "La tasación fue clara y profesional. Recomiendo totalmente trabajar con Carolina Bustamante Bienes Raíces.",
    calificacion: 5,
  },
];

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-semibold text-[#0D2B59] sm:text-4xl">
          Lo que dicen nuestros clientes
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Historias reales de personas que encontraron su hogar.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonios.map((t) => (
          <div
            key={t.nombre}
            className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0D2B59] font-semibold text-white">
                {iniciales(t.nombre)}
              </div>
              <div>
                <p className="font-semibold text-[#0D2B59]">{t.nombre}</p>
                <div className="mt-1 flex gap-0.5 text-[#C79A3B]">
                  {Array.from({ length: t.calificacion }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-gray-600">
              "{t.comentario}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}