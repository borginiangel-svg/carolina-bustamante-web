import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { createClient } from "@/lib/supabase/server";

export default async function DetallePropiedad({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: propiedad } = await supabase
    .from("propiedades")
    .select("*")
    .eq("id", id)
    .eq("publicada", true)
    .single();

  if (!propiedad) {
    notFound();
  }

  const fotos: string[] = propiedad.fotos || [];
  const mensajeWhatsapp = encodeURIComponent(
    `Hola! Me interesa esta propiedad: ${propiedad.titulo} (${propiedad.barrio})`
  );

  return (
    <>
      <Header />

      {/* Foto principal + miniaturas */}
      {fotos.length > 0 ? (
        <section className="mx-auto max-w-5xl px-8 pt-8">
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-[#0D2B59] sm:h-96">
            <Image
              src={fotos[0]}
              alt={propiedad.titulo}
              fill
              priority
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#0D2B59]">
              {propiedad.estado}
            </span>
          </div>

          {fotos.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
              {fotos.slice(1).map((url) => (
                <div
                  key={url}
                  className="relative aspect-square overflow-hidden rounded-lg bg-[#F5F5F5]"
                >
                  <Image src={url} alt={propiedad.titulo} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="relative flex h-72 items-center justify-center bg-gradient-to-br from-[#0D2B59] to-[#173d73] sm:h-96">
          <span className="absolute left-6 top-6 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#0D2B59]">
            {propiedad.estado}
          </span>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-8 py-12">
        <Link
          href="/propiedades"
          className="text-sm font-semibold text-[#0D2B59] hover:text-[#C79A3B]"
        >
          ← Volver a Propiedades
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#C79A3B]">
              {propiedad.tipo} · {propiedad.barrio}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-semibold text-[#0D2B59] sm:text-4xl">
              {propiedad.titulo}
            </h1>
            {propiedad.direccion && (
              <p className="mt-2 text-gray-500">{propiedad.direccion}</p>
            )}
          </div>

          <p className="whitespace-nowrap font-heading text-3xl font-semibold text-[#C79A3B]">
            {propiedad.moneda} {Number(propiedad.precio).toLocaleString("es-AR")}
            {propiedad.estado === "En alquiler" ? " /mes" : ""}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-6 rounded-xl bg-[#F5F5F5] p-6">
          {propiedad.dormitorios > 0 && (
            <div>
              <p className="text-2xl font-semibold text-[#0D2B59]">
                {propiedad.dormitorios}
              </p>
              <p className="text-sm text-gray-600">Dormitorios</p>
            </div>
          )}
          {propiedad.banos > 0 && (
            <div>
              <p className="text-2xl font-semibold text-[#0D2B59]">{propiedad.banos}</p>
              <p className="text-sm text-gray-600">
                Baño{propiedad.banos > 1 ? "s" : ""}
              </p>
            </div>
          )}
          {propiedad.superficie_m2 > 0 && (
            <div>
              <p className="text-2xl font-semibold text-[#0D2B59]">
                {propiedad.superficie_m2}
              </p>
              <p className="text-sm text-gray-600">m² totales</p>
            </div>
          )}
        </div>

        {propiedad.descripcion && (
          <div className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-[#0D2B59]">
              Descripción
            </h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-gray-600">
              {propiedad.descripcion}
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-4 rounded-xl bg-[#0D2B59] p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-white">
            ¿Te interesa esta propiedad?
          </p>
          <Link
            href={`https://wa.me/5492215593304?text=${mensajeWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[52px] items-center justify-center rounded-xl bg-[#25D366] px-8 font-semibold text-white transition hover:opacity-90"
          >
            Consultar por WhatsApp
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
