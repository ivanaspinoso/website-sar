import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { getPageContent } from "@/lib/site-content";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "700"],
});

export const metadata: Metadata = {
  title: "SAR - Desarrollo inmobiliario",
  description:
    "Desarrolladora inmobiliaria en Argentina especializada en gestión integral de proyectos rentables y funcionales.",
  icons: {
    icon: "/logo1.png",
    shortcut: "/logo1.png",
    apple: "/logo1.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const g = await getPageContent("global");

  return (
    <html lang="es" className={`${poppins.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full bg-background text-foreground">
        <SiteHeader />
        <main className="pt-24">{children}</main>
        <footer className="bg-brand py-14 text-white">
          <div className="container-sar">
            <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">

              <div>
                <Link href="/" className="inline-flex items-center" aria-label="Inicio - SAR Desarrollos">
                  <Image
                    src="/logo1.png"
                    alt="Logo de SAR Inversiones y Desarrollos"
                    width={180}
                    height={72}
                    className="h-16 w-auto"
                  />
                </Link>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/90">Navegacion</p>
                <nav className="mt-4 flex flex-col gap-2 text-sm text-white/85">
                  <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
                  <Link href="/quienes-somos" className="transition-colors hover:text-white">Quienes Somos</Link>
                  <Link href="/servicios" className="transition-colors hover:text-white">Servicios</Link>
                  <Link href="/proyectos" className="transition-colors hover:text-white">Proyectos</Link>
                  <Link href="/contacto" className="transition-colors hover:text-white">Contacto</Link>
                </nav>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/90">Contacto</p>
                <div className="mt-4 space-y-2 break-words text-sm text-white/85">
                  <a href={`mailto:${g.contacto_email}`} className="block transition-colors hover:text-white">
                    {g.contacto_email}
                  </a>
                  <a href={`tel:${g.contacto_telefono.replace(/\s/g, "")}`} className="block transition-colors hover:text-white">
                    {g.contacto_telefono}
                  </a>
                  <a
                    href={g.contacto_web.startsWith("http") ? g.contacto_web : `https://${g.contacto_web}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block transition-colors hover:text-white"
                  >
                    {g.contacto_web}
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/90">Redes</p>
                <div className="mt-4 flex items-center gap-4">
                  <a
                    href={g.redes_linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/35 p-2 text-white transition-colors hover:border-white hover:bg-white/10"
                    aria-label="LinkedIn de SAR Inversiones y Desarrollos"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 0 0 3.3 5a1.95 1.95 0 0 0 1.93 2A1.97 1.97 0 0 0 7.2 5 1.95 1.95 0 0 0 5.25 3Zm14.75 9.9c0-3.34-1.78-4.89-4.15-4.89a3.6 3.6 0 0 0-3.24 1.78h-.05V8.5H9.3V20h3.37v-5.7c0-1.5.29-2.95 2.15-2.95 1.83 0 1.86 1.72 1.86 3.05V20H20v-7.1Z" />
                    </svg>
                  </a>
                  <a
                    href={g.redes_instagram_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/35 p-2 text-white transition-colors hover:border-white hover:bg-white/10"
                    aria-label="Instagram de SAR Desarrollos"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="17.3" cy="6.8" r="1.2" fill="currentColor" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            <div className="mt-10 flex justify-end border-t border-white/10 pt-5">
              <Link
                href="/admin/login"
                className="text-[11px] lowercase tracking-wide text-white/35 transition-colors hover:text-white/70"
              >
                admin
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
