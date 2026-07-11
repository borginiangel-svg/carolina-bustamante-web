import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

type Barrio = {
  nombre: string;
  descripcion: string;
  gradient: string;
};

const barrios: Barrio[] = [
  {
    nombre: "Centro",
    descripcion:
      "El corazón administrativo y comercial de La Plata. Ideal para quienes buscan vida urbana, cercanía a la universidad y todos los servicios a pocas cuadras.",
    gradient: "from-[#0D2B59] to-[#173d73]",
  },
  {
    nombre: "City Bell",
    descripcion:
      "Reconocido por sus calles arboladas y su ambiente tranquilo. Un barrio residencial con identidad propia, boutiques, gastronomía y mucha vida de barrio.",
    gradient: "from-[#C79A3B] to-[#8a6a24]",
  },
  {
    nombre: "Gonnet",
    descripcion:
      "Zona residencial en crecimiento, cercana a countries y a los principales polos educativos. Buena opción para quienes buscan tranquilidad sin alejarse demasiado del centro.",
    gradient: "from-[#173d73] to-[#0D2B59]",
  },
  {
    nombre: "Villa Elisa",
    descripcion:
      "Un barrio residencial consolidado, con buena conectividad hacia La Plata y Buenos Aires. Combina tranquilidad con cercanía a rutas principales.",
    gradient: "from-[#8a6a24] to-[#C79A3B]",
  },
  {
    nombre: "Tolosa",
    descripcion:
      "Barrio tradicional, muy cercano al casco urbano de La Plata. Ideal para quienes buscan identidad de barrio con todos los servicios cerca.",
    gradient: "from-[#0D2B59] to-[#3a5a8f]",
  },
  {
    nombre: "Ringuelet",
    descripcion:
      "Zona en expansión, con buena conectividad vial hacia el Gran Buenos Aires. Cada vez más elegida por familias que buscan crecer con la zona.",
    gradient: "from-[#3a5a8f] to-[#0D2B59]",
  },
];

export default function Barrios() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-[#0D2B59] py-16">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <h1 className="font-heading text-4xl font-semibold text-white sm:text-5xl">
            Conocé el Gran La Plata
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Trabajamos con conocimiento profundo de cada barrio, para ayudarte
            a encontrar no solo una propiedad, sino el lugar correcto para vos.
          </p>
        </div>
      </section>

      {/* Grid de barrios */}
      <section className="mx-auto max-w-7xl px-8 py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {barrios.map((b) => (
            <div
              key={b.nombre}
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`flex h-40 items-center justify-center bg-gradient-to-br ${b.gradient}`}
              >
                <span className="font-heading text-2xl font-semibold text-white">
                  {b.nombre}
                </span>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-gray-600">
                  {b.descripcion}
                </p>

                <Link
                  href={`/propiedades?barrio=${encodeURIComponent(b.nombre)}`}
                  className="mt-5 inline-block h-[44px] rounded-xl bg-[#0D2B59] px-5 py-[10px] text-sm font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59]"
                >
                  Ver propiedades en {b.nombre}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="mx-auto max-w-2xl px-8 text-center">
          <h2 className="font-heading text-3xl font-semibold text-[#0D2B59] sm:text-4xl">
            ¿No encontrás tu zona?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Trabajamos en todo el Gran La Plata y alrededores. Contanos qué
            estás buscando y te ayudamos a encontrarlo.
          </p>
          <Link
            href="https://wa.me/5492215593304"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block h-[52px] rounded-xl bg-[#0D2B59] px-8 py-[14px] font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59]"
          >
            Conversemos por WhatsApp
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
