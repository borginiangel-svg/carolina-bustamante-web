import Image from "next/image";
import Link from "next/link";

const menu = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "#" },
  { label: "Propiedades", href: "#" },
  { label: "Tasaciones", href: "#" },
  { label: "Barrios", href: "#" },
  { label: "Contacto", href: "#" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">
        <Link href="/">
          <Image
            src="/images/logo-badge-navbar.png"
            alt="Carolina Bustamante Bienes Raíces"
            width={300}
            height={300}
            className="h-24 w-auto shrink-0 object-contain"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {menu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-medium text-[#0D2B59] transition hover:text-[#C79A3B]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="hidden rounded-xl bg-[#0D2B59] px-6 py-3 font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59] lg:block">
          Tasación Gratuita
        </button>
      </div>
    </header>
  );
}
