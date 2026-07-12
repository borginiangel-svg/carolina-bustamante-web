import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import DebugConsole from "@/components/DebugConsole";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Carolina Bustamante Bienes Raíces | Gran La Plata",
  description:
    "Asesoramiento inmobiliario integral en el Gran La Plata. Compra, venta, alquiler y tasaciones con acompañamiento personalizado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
        {children}
        <DebugConsole />
      </body>
    </html>
  );
}
