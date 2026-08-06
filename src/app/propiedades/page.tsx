import { Suspense } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import PropiedadesFiltro from "@/components/sections/PropiedadesFiltro";
import { createClient } from "@/lib/supabase/server";

export default async function Propiedades() {
  const supabase = await createClient();
  const { data: propiedades } = await supabase
    .from("propiedades")
    .select("*")
    .eq("publicada", true)
    .order("creado_en", { ascending: false });

  return (
    <>
      <Header />
      <section className="relative flex min-h-[420px] items-center overflow-hidden py-16">
        <Image
          src="/images/propiedades/hero.jpg"
          alt="Casa moderna con pileta al atardecer"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0D2B59]/60" />
        <div className="relative z-10 mx-auto max-w-7xl px-8 text-center">
          <h1 className="font-heading text-4xl font-semibold text-white sm:text-5xl">
            Propiedades disponibles
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Encontrá la propiedad ideal en el Gran La Plata.
          </p>
        </div>
      </section>
      <Suspense fallback={null}>
        <PropiedadesFiltro propiedades={propiedades ?? []} />
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
