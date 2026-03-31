import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Conocé la historia, misión y equipo detrás de SAR Inversiones & Desarrollos, empresa con más de 20 años en el mercado inmobiliario argentino.",
};

export default function QuienesSomosPage() {
  return (
    <div className="section-white">
      <section className="section-padding section-surface">
        <div className="container-sar">
          <Reveal className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
            <div className="space-y-5">
              <p className="eyebrow">QUIÉNES SOMOS</p>
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Más de 20 años construyendo proyectos únicos
              </h1>
              <p className="text-lg leading-relaxed text-muted">
                SAR Inversiones & Desarrollos | Desarrolladora inmobiliaria en Argentina
              </p>
            </div>
            <div className="h-[340px] overflow-hidden rounded-3xl border border-brand/15 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center md:h-[410px]" />
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar">
          <Reveal className="max-w-4xl space-y-5">
            <p className="eyebrow">NUESTRA HISTORIA</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Una pregunta que dio forma a todo
            </h2>
            <p className="leading-relaxed text-muted">
              Detrás de SAR Inversiones & Desarrollos hay una trayectoria sostenida en el
              mercado inmobiliario argentino y una pregunta que guió cada decisión desde
              el inicio: ¿cómo lograr que cada proyecto sea genuinamente único?
            </p>
            <p className="leading-relaxed text-muted">
              Esa búsqueda nos llevó a desarrollar una metodología propia que combina
              rigor técnico, criterio estético y gestión eficiente. El resultado: más de
              20 proyectos realizados, +50.000 m2 construidos y más de 500 unidades
              funcionales entregadas en toda Argentina.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-sar">
          <Reveal className="max-w-5xl space-y-5">
            <p className="eyebrow">NUESTRA MISIÓN</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Transformamos terrenos en proyectos inmobiliarios rentables y funcionales.
            </h2>
            <p className="max-w-4xl leading-relaxed text-muted">
              Gestionamos el ciclo completo de cada emprendimiento, desde la viabilidad
              técnica, legal y financiera hasta la escrituración. Administramos cada
              etapa del desarrollo de forma eficiente, junto a cada profesional
              interviniente.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar">
          <Reveal>
            <p className="eyebrow">LO QUE DEFINE A SAR DESARROLLOS</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Nuestros valores
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Atención al detalle. Cuidamos cada terminación priorizando la estética y los materiales de calidad.",
              "Gestión integral. Participamos en cada etapa del proyecto para garantizar coherencia y eficiencia.",
              "Compromiso post-entrega. Nuestro vínculo con el cliente no termina cuando se firma la escritura.",
              "Trayectoria comprobada. Más de dos décadas de proyectos en Argentina respaldan cada nuevo emprendimiento.",
            ].map((value, idx) => (
              <Reveal
                key={value}
                delay={idx * 0.08}
                className="panel bg-surface"
              >
                <span className="icon-shell">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="m7 12 3 3 7-7" />
                    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
                  </svg>
                </span>
                <p className="mt-4 leading-relaxed text-muted">{value}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <Link href="/contacto" className="btn-primary">
              Contactanos
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
