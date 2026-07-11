import Link from "next/link";

export default function WhatsAppButton() {
  const numero = "5492215593304";
  const mensaje = encodeURIComponent(
    "Hola! Vi tu sitio web y me gustaría hacer una consulta."
  );

  return (
    <Link
      href={`https://wa.me/${numero}?text=${mensaje}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110 hover:shadow-xl"
      aria-label="Contactar por WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.87 14.02c-.25.7-1.24 1.29-2.03 1.46-.54.11-1.25.2-3.63-.78-3.05-1.26-5.01-4.36-5.16-4.56-.15-.2-1.23-1.64-1.23-3.13s.77-2.21 1.05-2.52c.27-.29.6-.36.79-.36.2 0 .4.002.57.01.18.008.43-.07.67.51.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.33 2.4 1.48.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.75-.18 1.45z" />
      </svg>
    </Link>
  );
}
