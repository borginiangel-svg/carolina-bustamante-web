"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-3 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-[#0D2B59] transition hover:bg-[#F5F5F5]"
    >
      Cerrar sesión
    </button>
  );
}
