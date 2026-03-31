"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand/15 bg-white/95 backdrop-blur-md">
      <div className="container-sar flex h-24 items-center justify-between">
        <Link href="/" className="inline-flex items-center" aria-label="Inicio - SAR Desarrollos">
          <Image
            src="/logo1.png"
            alt="Logo de SAR Inversiones y Desarrollos"
            width={220}
            height={88}
            priority
            className="h-16 w-auto md:h-20"
          />
        </Link>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand/20 bg-white md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span className="sr-only">Menú</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
          </div>
        </button>

        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-muted transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {open ? (
        <nav className="border-t border-brand/15 bg-white md:hidden">
          <div className="container-sar flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-muted transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
