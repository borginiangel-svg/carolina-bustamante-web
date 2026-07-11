import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const valores = [
  "Confianza",
  "Profesionalismo",
  "Honestidad",
  "Empatía",
  "Compromiso",
  "Transparencia",
  "Responsabilidad",
  "Cercanía",
  "Resultados",
];

const diferenciales = [
  "Atención personalizada",
  "Profesional matriculada",
  "Acompañamiento permanente",
  "Tasaciones reales",
  "Comunicación transparente",
  "Conocimiento profundo de cada barrio",
  "Seguimiento antes, durante y después de la operación",
];

export default function Nosotros() {
  return (
    <>
      <Header />

      {/* Hero de la página */}
      <section className="bg-[#0D2B59] py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-8 lg:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-wide text-[#C79A3B]">
              Conocé a Carolina
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">
              No vendemos propiedades. Creamos hogares.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              Cada consulta merece atención. Cada cliente merece tiempo. Cada operación
              merece transparencia. Por eso trabajamos con profesionalismo, cercanía y
              compromiso, construyendo relaciones de confianza que perduran mucho más
              allá de la firma de un contrato.
            </p>
          </div>

          {/* Placeholder de foto de Carolina */}
          <div className="mx-auto flex h-80 w-80 items-center justify-center rounded-full bg-gradient-to-br from-[#C79A3B] to-[#0D2B59] sm:h-96 sm:w-96">
            <span className="font-heading text-2xl font-semibold text-white/80">
              Foto de Carolina
            </span>
          </div>
        </div>
      </section>

      {/* Propósito */}
      <section className="mx-auto max-w-4xl px-8 py-20 text-center">
        <h2 className="font-heading text-3xl font-semibold text-[#0D2B59] sm:text-4xl">
          Nuestro propósito
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">
          Transformar la experiencia inmobiliaria en un proceso claro, seguro y humano.
          En Carolina Bustamante Bienes Raíces creemos que una propiedad nunca representa
          solamente una operación inmobiliaria: representa un proyecto de vida, esfuerzo,
          crecimiento y un nuevo comienzo.
        </p>
      </section>

      {/* Misión y Visión */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-8 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-10 shadow-sm ring-1 ring-gray-100">
            <h3 className="font-heading text-2xl font-semibold text-[#0D2B59]">
              Misión
            </h3>
            <p className="mt-4 leading-relaxed text-gray-600">
              Brindar asesoramiento inmobiliario integral para la compra, venta y
              alquiler de propiedades, ofreciendo un acompañamiento personalizado
              basado en la confianza, la transparencia y el conocimiento del mercado
              del Gran La Plata.
            </p>
          </div>

          <div className="rounded-xl bg-white p-10 shadow-sm ring-1 ring-gray-100">
            <h3 className="font-heading text-2xl font-semibold text-[#0D2B59]">
              Visión
            </h3>
            <p className="mt-4 leading-relaxed text-gray-600">
              Ser una de las inmobiliarias referentes del Gran La Plata por la calidad
              del servicio, la innovación y la confianza que generan nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="mx-auto max-w-6xl px-8 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold text-[#0D2B59] sm:text-4xl">
            Nuestros valores
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Los principios que guían cada acompañamiento.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {valores.map((v) => (
            <span
              key={v}
              className="rounded-full bg-[#F5F5F5] px-5 py-2 text-sm font-semibold text-[#0D2B59]"
            >
              {v}
            </span>
          ))}
        </div>
      </section>

      {/* Diferenciales */}
      <section className="bg-[#0D2B59] py-20">
        <div className="mx-auto max-w-4xl px-8">
          <h2 className="text-center font-heading text-3xl font-semibold text-white sm:text-4xl">
            Nuestros diferenciales
          </h2>

          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {diferenciales.map((d) => (
              <li
                key={d}
                className="flex items-start gap-3 rounded-xl bg-white/5 p-4 text-white/90"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C79A3B"
                  strokeWidth="2"
                  className="mt-0.5 shrink-0"
                >
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Manifiesto */}
      <section className="mx-auto max-w-3xl px-8 py-20 text-center">
        <h2 className="font-heading text-3xl font-semibold text-[#0D2B59] sm:text-4xl">
          Creemos en las personas antes que en las propiedades
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">
          Creemos que una vivienda es mucho más que metros cuadrados. Es donde nacen
          familias, donde crecen los hijos, donde comienzan nuevas historias. Por eso
          trabajamos con compromiso, honestidad y cercanía. Porque detrás de cada llave
          existe una ilusión, y detrás de cada cliente existe un sueño.
        </p>
        <p className="mt-4 font-heading text-xl font-semibold text-[#C79A3B]">
          Nuestro trabajo es ayudar a convertir ese sueño en un hogar.
        </p>

        <Link
          href="https://wa.me/5492215593304"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block h-[52px] rounded-xl bg-[#0D2B59] px-8 py-[14px] font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59]"
        >
          Conversemos por WhatsApp
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
