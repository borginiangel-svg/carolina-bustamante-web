"use client";

import { useEffect } from "react";

export default function DebugConsole() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") !== "1") return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/eruda";
    script.onload = () => {
      // @ts-expect-error - eruda se carga globalmente desde el script externo
      window.eruda?.init();
    };
    document.body.appendChild(script);
  }, []);

  return null;
}
