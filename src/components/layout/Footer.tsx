import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A2147] py-16 text-white">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/logo-solo-footer.png"
              alt="Carolina Bustamante Bienes Raíces"
              width={352}
              height={347}
              className="h-20 w-20 object-contain"
            />
            <p className="mt-4 text-sm text-white/70">
              Conectamos propiedades con personas, creamos hogares.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold">Contacto</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <Link
                  href="https://wa.me/5492215593304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-[#C79A3B]"
                >
                  WhatsApp: +54 9 221 559-3304
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:CBbienesraices@outlook.com"
                  className="transition hover:text-[#C79A3B]"
                >
                  CBbienesraices@outlook.com
                </Link>
              </li>
              <li>City Bell, La Plata</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold">Redes</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <Link
                  href="https://instagram.com/carolinabustamantebienesraices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-[#C79A3B]"
                >
                  @carolinabustamantebienesraices
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold">Cobertura</h3>
            <p className="mt-4 text-sm text-white/70">
              Gran La Plata y alrededores.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Carolina Bustamante Bienes Raíces. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
