"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function SetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // El cliente de Supabase detecta automáticamente el token que viene
    // en el hash de la URL (#access_token=...) y crea la sesión.
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setReady(true);
      } else {
        setError(
          "El link de invitación no es válido o ya expiró. Pedí una invitación nueva."
        );
      }
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("La contraseña tiene que tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError("No pudimos guardar la contraseña. Probá de nuevo.");
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
          Creá tu contraseña
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Definí una contraseña para acceder al panel de administración
        </p>

        {ready ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nueva contraseña"
              className="h-[52px] w-full rounded-xl border border-gray-200 px-4 text-[#0D2B59] placeholder:text-gray-400 focus:border-[#0D2B59] focus:outline-none"
            />

            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repetir contraseña"
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
              {loading ? "Guardando..." : "Guardar contraseña"}
            </button>
          </form>
        ) : (
          <p className="mt-8 text-center text-sm text-[#DC2626]">
            {error || "Verificando invitación..."}
          </p>
        )}
      </div>
    </div>
  );
}
