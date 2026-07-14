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

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between px-8">
        <Link href="/" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo-lockup-v3.png"
            alt="Carolina Bustamante Bienes Raíces"
            width={1249}
            height={420}
            className="h-20 w-auto shrink-0 object-contain sm:h-24"
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
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-[#0D2B59] transition hover:bg-[#F5F5F5] lg:hidden"
        >
          {open ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
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
