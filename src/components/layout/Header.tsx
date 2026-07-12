"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const menu = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Propiedades", href: "/propiedades" },
  { label: "Tasaciones", href: "/tasaciones" },
  { label: "Barrios", href: "/barrios" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-200 backdrop-blur transition-colors ${
        open ? "bg-red-500" : "bg-white/95"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">
        <Link href="/" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo-badge-navbar.png"
            alt="Carolina Bustamante Bienes Raíces"
            width={300}
            height={300}
            className="h-16 w-16 shrink-0 object-contain sm:h-24 sm:w-24"
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

        <Link
          href="/tasaciones#formulario"
          className="hidden rounded-xl bg-[#0D2B59] px-6 py-3 font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59] lg:block"
        >
          Tasación Gratuita
        </Link>

        <button
          onClick={() => {
            setOpen(!open);
            setClicks((c) => c + 1);
          }}
          aria-label="Abrir menú"
          className="flex h-11 w-16 items-center justify-center rounded-lg bg-yellow-300 text-2xl font-bold text-black lg:hidden"
        >
          {clicks}
        </button>
      </div>

      {open && (
        <nav className="border-t border-gray-100 bg-white px-8 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {menu.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-medium text-[#0D2B59] transition hover:bg-[#F5F5F5]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/tasaciones#formulario"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-xl bg-[#0D2B59] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59]"
            >
              Tasación Gratuita
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
