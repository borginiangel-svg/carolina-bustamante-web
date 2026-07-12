"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <div className="flex justify-center">
          <Image
            src="/images/logo-badge-original.png"
            alt="Carolina Bustamante Bienes Raíces"
            width={600}
            height={600}
            className="h-20 w-20 object-contain"
          />
        </div>

        <h1 className="mt-6 text-center font-heading text-2xl font-semibold text-[#0D2B59]">
          Panel de administración
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Ingresá con tu cuenta para continuar
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-[52px] w-full rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="h-[52px] w-full rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none"
          />

          {error && (
            <p className="text-sm font-medium text-[#DC2626]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-[52px] w-full rounded-xl bg-[#0D2B59] font-semibold text-white transition hover:bg-[#C79A3B] hover:text-[#0D2B59] disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
