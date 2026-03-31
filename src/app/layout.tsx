import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "SAR Desarrollos Inmobiliarios",
    template: "%s | SAR Desarrollos",
  },
  description:
    "Desarrolladora inmobiliaria en Argentina especializada en gestión integral de proyectos rentables y funcionales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <SiteHeader />
        <main className="pt-20">{children}</main>
        <footer className="border-t border-brand/15 bg-white py-8">
          <div className="container-sar flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
            <p>SAR Desarrollos Inmobiliarios - Arquitectura y Real Estate.</p>
            <Link href="/contacto" className="font-medium text-muted transition hover:text-foreground">
              Contacto
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
