import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

type Servicio = {
  id: string;
  titulo: string;
  bajada: string;
  pasos: string[];
  icon: React.ReactNode;
};

const servicios: Servicio[] = [
  {
    id: "compra",
    titulo: "Compra",
    bajada:
      "Te acompañamos en la búsqueda de la propiedad ideal, con asesoramiento real en cada paso, sin presión y con información clara.",
    pasos: [
      "Escucha inicial: entendemos qué estás buscando y qué necesitás realmente.",
      "Búsqueda personalizada de propiedades que se ajusten a tu perfil.",
      "Visitas acompañadas, con información honesta sobre cada propiedad.",
      "Negociación profesional para conseguir las mejores condiciones.",
      "Firma y entrega de llaves, con todo el proceso transparente.",
    ],
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0D2B59" strokeWidth="1.5">
        <path d="M3 10l9-7 9 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9v11h14V9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 20v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "venta",
    titulo: "Venta",
    bajada:
      "Estrategia, difusión y negociación profesional para vender tu propiedad al mejor valor posible, con seguimiento constante.",
    pasos: [
      "Tasación real, basada en el mercado actual del Gran La Plata.",
      "Estrategia de difusión en los canales adecuados para tu propiedad.",
      "Visitas coordinadas con potenciales compradores calificados.",
      "Negociación profesional, siempre priorizando tus intereses.",
      "Cierre seguro, con toda la documentación en regla.",
    ],
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0D2B59" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "alquiler",
    titulo: "Alquiler",
    bajada:
      "Gestionamos el alquiler de tu propiedad de punta a punta, o te ayudamos a encontrar el lugar donde vivir, con respaldo profesional.",
    pasos: [
      "Publicación y difusión en los canales con mayor alcance.",
      "Selección cuidadosa de inquilinos, con verificación de referencias.",
      "Armado de contrato y garantías conforme a la normativa vigente.",
      "Gestión completa de la firma, sin que tengas que ocuparte de nada.",
      "Acompañamiento durante todo el período de alquiler.",
    ],
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0D2B59" strokeWidth="1.5">
        <rect x="3" y="7" width="18" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "tasacion",
    titulo: "Tasación",
    bajada:
      "Valoramos tu propiedad con criterio profesional y conocimiento real del mercado local, sin compromiso de tu parte.",
    pasos: [
      "Análisis del mercado local y de propiedades comparables.",
      "Visita a la propiedad para evaluar su estado y potencial.",
      "Informe de valor real, claro y fundamentado.",
      "Asesoramiento sobre los próximos pasos, sin ningún compromiso.",
    ],
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0D2B59" strokeWidth="1.5">
        <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 21l-4.3-4.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Servicios() {
  return (
    <>
      <Header />

      {/* Encabezado */}
      <section className="bg-[#0D2B59] py-16">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <h1 className="font-heading text-4xl font-semibold text-white sm:text-5xl">
            Nuestros Servicios
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Un acompañamiento profesional en cada etapa de tu decisión inmobiliaria.
            No vendemos propiedades: creamos hogares.
          </p>
        </div>
      </section>

      {/* Navegación interna */}
      <section className="border-b border-gray-100 bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-8">
          {servicios.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-[#0D2B59] transition hover:border-[#0D2B59] hover:bg-[#0D2B59] hover:text-white"
            >
              {s.titulo}
            </a>
          ))}
        </div>
      </section>

      {/* Detalle de cada servicio */}
      {servicios.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`scroll-mt-24 py-20 ${i % 2 === 1 ? "bg-[#F5F5F5]" : "bg-white"}`}
        >
          <div className="mx-auto max-w-4xl px-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#F5F5F5]">
              {s.icon}
            </div>
            <h2 className="mt-6 font-heading text-3xl font-semibold text-[#0D2B59] sm:text-4xl">
              {s.titulo}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">{s.bajada}</p>

            <ul className="mt-8 space-y-4">
              {s.pasos.map((paso, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0D2B59] text-sm font-semibold text-white">
                    {idx + 1}
                  </span>
                  <span className="pt-1 text-gray-700">{paso}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`https://wa.me/5492215593304?text=${encodeURIComponent(
                `Hola! Quiero más información sobre el servicio de ${s.titulo.toLowerCase()}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block h-[52px] rounded-xl bg-[#0D2B59] px-8 py-[14px] font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59]"
            >
              Consultar sobre {s.titulo.toLowerCase()}
            </Link>
          </div>
        </section>
      ))}

      {/* CTA final */}
      <section className="bg-[#0D2B59] py-20">
        <div className="mx-auto max-w-2xl px-8 text-center">
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            ¿No sabés por dónde empezar?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Escribinos y te ayudamos a definir el mejor camino para tu situación,
            sin ningún compromiso.
          </p>
          <Link
            href="https://wa.me/5492215593304"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block h-[52px] rounded-xl bg-[#C79A3B] px-8 py-[14px] font-semibold text-[#0D2B59] transition hover:bg-white"
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
