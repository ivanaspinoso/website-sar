"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes Somos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/metodologia", label: "Metodología" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[linear-gradient(180deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.46)_100%)] backdrop-blur-[1.5px]">
      <div className="container-sar flex h-[86px] items-center justify-between">
        <Link href="/" className="inline-flex items-center" aria-label="Inicio - SAR Desarrollos">
          <Image
            src="/logo1.png"
            alt="Logo de SAR Inversiones y Desarrollos"
            width={150}
            height={60}
            priority
            className="h-15 w-auto md:h-20"
          />
        </Link>

        <button
          className="inline-flex h-11 items-center gap-2 rounded-md px-2"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span className="text-lg leading-none font-medium text-white">
            {open ? "Cerrar" : "Menu"}
          </span>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 text-white">
            {open ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </span>
          <span className="sr-only">
            {open ? "Cerrar" : "Menu"}
          </span>
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40">
          <button
            aria-label="Cerrar menú"
            className="absolute inset-0 bg-black/40 backdrop-blur-[2.5px]"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute top-0 right-0 h-screen w-full overflow-y-auto bg-white shadow-2xl md:w-1/2">
            <div className="px-6 py-6 sm:px-10 sm:py-7">
              <div className="mb-8 flex items-center justify-between">
                <p className="text-base leading-none text-muted sm:text-lg">Menu</p>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-3 text-lg leading-none font-medium text-foreground sm:text-xl"
                >
                  Cerrar
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/40 text-foreground">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </span>
                </button>
              </div>

              <nav className="grid gap-x-12 gap-y-10 md:grid-cols-2">
                <div className="space-y-5">
                  <Link
                    href="/proyectos"
                    onClick={() => setOpen(false)}
                    className="block text-3xl leading-none font-semibold text-foreground md:text-4xl"
                  >
                    Proyectos
                  </Link>
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 py-0.5 text-lg leading-none text-foreground/95 transition hover:text-brand md:text-lg"
                      >
                        <span className="text-muted">↗</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <Link
                    href="/contacto"
                    onClick={() => setOpen(false)}
                    className="block text-3xl leading-none font-semibold text-foreground md:text-4xl"
                  >
                    Contacto
                  </Link>
                  <Link
                    href="/quienes-somos"
                    onClick={() => setOpen(false)}
                    className="block text-3xl leading-none font-semibold text-foreground md:text-4xl"
                  >
                    Quiénes Somos
                  </Link>
                </div>
              </nav>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
