import { Suspense } from "react";
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

      <section className="bg-[#0D2B59] py-16">
        <div className="mx-auto max-w-7xl px-8 text-center">
          <h1 className="font-heading text-4xl font-semibold text-white sm:text-5xl">
            Propiedades disponibles
          </h1>
          <p className="mt-4 text-lg text-white/80">
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
