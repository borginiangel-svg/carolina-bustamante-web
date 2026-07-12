import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import Testimonials from "@/components/sections/Testimonials";
import ContactForm from "@/components/sections/ContactForm";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: propiedades } = await supabase
    .from("propiedades")
    .select("*")
    .eq("publicada", true)
    .order("creado_en", { ascending: false })
    .limit(3);

  return (
    <>
      <Header />
      <Hero />
      <Services />
      <FeaturedProperties propiedades={propiedades ?? []} />
      <Testimonials />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
