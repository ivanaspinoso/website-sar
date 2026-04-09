import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "SAR - Desarrollo inmobiliario",
  description:
    "Conocé la historia, misión y equipo detrás de SAR Inversiones & Desarrollos, empresa con más de 20 años en el mercado inmobiliario argentino.",
};

export default function QuienesSomosPage() {
  const values = [
    {
      title: "Atención al detalle.",
      text: "Cuidamos cada terminación priorizando la estética y los materiales de calidad.",
    },
    {
      title: "Gestión integral.",
      text: "Participamos en cada etapa del proyecto para garantizar coherencia y eficiencia.",
    },
    {
      title: "Compromiso post-entrega.",
      text: "Nuestro vínculo con el cliente no termina cuando se firma la escritura.",
    },
    {
      title: "Trayectoria comprobada.",
      text: "Más de dos décadas de proyectos en Argentina respaldan cada nuevo emprendimiento.",
    },
  ];

  return (
    <div className="section-white">
     <section className="relative -mt-24">
  <div className="relative min-h-[64svh] overflow-hidden">

    <video
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay  
      loop
      muted
      playsInline
    >
      <source src="/honorario.mp4" type="video/mp4" />
    </video>

    <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,13,34,0.62),rgba(38,39,110,0.45))]"></div>

    <div className="container-sar relative z-10 mt-24 flex min-h-[calc(64svh-6rem)] items-end">
      <div className="max-w-4xl space-y-5 py-12 text-white md:py-20">
        
        <h1 className ="text-4xl font-bold leading-tight md:text-5xl">
          Más de 20 años construyendo proyectos únicos
        </h1>

        <p className="text-base text-white/80 md:text-lg">
          SAR Inversiones & Desarrollos | Desarrolladora inmobiliaria en Argentina
        </p>

      </div>
    </div>

  </div>
</section>

      <section className="section-padding section-white">
        <div className="container-sar">
          <Reveal className="max-w-4xl space-y-5 border-l border-brand/20 pl-4 sm:pl-6 md:pl-10">
            <p className="eyebrow">NUESTRA HISTORIA</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Una pregunta que dio forma a todo
            </h2>
            <p className="leading-relaxed text-muted">
              Detrás de SAR Inversiones & Desarrollos hay una trayectoria sostenida en el
              mercado inmobiliario argentino y una pregunta que guió cada decisión desde
              el inicio:{" "}
              <span className="font-bold text-foreground">
                ¿cómo lograr que cada proyecto sea genuinamente único?
              </span>
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
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
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
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Nuestros valores
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {values.map((value, idx) => (
              <Reveal key={value.title} delay={idx * 0.08} className="panel border-brand/15 bg-gradient-to-b from-white to-surface">
                <span className="icon-shell">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="m7 12 3 3 7-7" />
                    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
                  </svg>
                </span>
                <p className="mt-4 leading-relaxed text-muted">
                  <span className="font-bold text-foreground">{value.title}</span>{" "}
                  {value.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

