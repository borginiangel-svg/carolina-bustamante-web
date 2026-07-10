const propiedades = [
  {
    estado: "En venta",
    titulo: "Casa 3 ambientes con jardín",
    ubicacion: "City Bell, La Plata",
    precio: "USD 145.000",
    dormitorios: 3,
    banos: 2,
    superficie: "180 m²",
  },
  {
    estado: "En alquiler",
    titulo: "Departamento a estrenar",
    ubicacion: "Centro, La Plata",
    precio: "$ 320.000 /mes",
    dormitorios: 2,
    banos: 1,
    superficie: "65 m²",
  },
  {
    estado: "En venta",
    titulo: "PH con patio propio",
    ubicacion: "Tolosa, La Plata",
    precio: "USD 98.000",
    dormitorios: 2,
    banos: 1,
    superficie: "90 m²",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="bg-[#F5F5F5] py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold text-[#0D2B59] sm:text-4xl">
            Propiedades Destacadas
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Una selección de propiedades disponibles esta semana.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {propiedades.map((p) => (
            <div
              key={p.titulo}
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Placeholder de fotografía */}
              <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-[#0D2B59] to-[#173d73]">
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0D2B59]">
                  {p.estado}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-[#0D2B59]">
                  {p.titulo}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{p.ubicacion}</p>
                <p className="mt-3 text-xl font-semibold text-[#C79A3B]">{p.precio}</p>

                <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4 text-sm text-gray-600">
                  <span>{p.dormitorios} dorm.</span>
                  <span>{p.banos} baño{p.banos > 1 ? "s" : ""}</span>
                  <span>{p.superficie}</span>
                </div>

                <div className="mt-5 flex gap-3">
                  <button className="h-[44px] flex-1 rounded-xl bg-[#0D2B59] text-sm font-semibold text-white transition hover:bg-[#C79A3B]">
                    Ver propiedad
                  </button>
                  <button className="flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-[#25D366] text-white transition hover:opacity-90">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.87 14.02c-.25.7-1.24 1.29-2.03 1.46-.54.11-1.25.2-3.63-.78-3.05-1.26-5.01-4.36-5.16-4.56-.15-.2-1.23-1.64-1.23-3.13s.77-2.21 1.05-2.52c.27-.29.6-.36.79-.36.2 0 .4.002.57.01.18.008.43-.07.67.51.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.33 2.4 1.48.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.75-.18 1.45z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}