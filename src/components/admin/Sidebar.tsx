"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";

const links = [
  { href: "/admin", label: "Inicio", exact: true },
  { href: "/admin/propiedades", label: "Propiedades" },
  { href: "/admin/consultas", label: "Consultas" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/agenda", label: "Agenda" },
];

export default function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-6">
        <Image
          src="/images/logo-badge-navbar.png"
          alt="Carolina Bustamante Bienes Raíces"
          width={300}
          height={300}
          className="h-10 w-10 object-contain"
        />
        <span className="font-heading text-lg font-semibold text-[#0D2B59]">
          Panel
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {links.map((link) => {
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-[#0D2B59] text-white"
                  : "text-[#0D2B59] hover:bg-[#F5F5F5]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 p-4">
        <p className="truncate px-2 text-xs text-gray-500">{email}</p>
        <LogoutButton />
      </div>
    </aside>
  );
}
