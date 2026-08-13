import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { getPageContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SAR - Desarrollo inmobiliario",
  description:
    "Conocé la historia, misión y equipo detrás de SAR Inversiones & Desarrollos, empresa con más de 20 años en el mercado inmobiliario argentino.",
};

export default async function QuienesSomosPage() {
  const c = await getPageContent("quienes_somos");

  return (
    <div className="section-white">
      <section className="relative -mt-24">
        <div className="relative min-h-[64svh] overflow-hidden">
          <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/honorario.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,13,34,0.62),rgba(38,39,110,0.45))]" />
          <div className="container-sar relative z-10 mt-24 flex min-h-[calc(64svh-6rem)] items-end">
            <div className="max-w-4xl space-y-5 py-12 text-white md:py-20">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">{c.hero_titulo}</h1>
              <p className="text-base text-white/80 md:text-lg">{c.hero_subtitulo}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar">
          <Reveal className="max-w-4xl space-y-5">
            <p className="eyebrow">NUESTRA HISTORIA</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{c.historia_titulo}</h2>
            <p className="leading-relaxed text-muted">{c.historia_parrafo1}</p>
            <p className="leading-relaxed text-muted">{c.historia_parrafo2}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-sar">
          <Reveal className="max-w-5xl space-y-5">
            <p className="eyebrow">NUESTRA MISIÓN</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">{c.mision_titulo}</h2>
            <p className="max-w-4xl leading-relaxed text-muted">{c.mision_texto}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar">
          <Reveal>
            <p className="eyebrow">LO QUE DEFINE A SAR DESARROLLOS</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Nuestros valores</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {c.valores.map((value, idx) => (
              <Reveal key={value.titulo + idx} delay={idx * 0.08} className="panel border-brand/15 bg-gradient-to-b from-white to-surface">
                <span className="icon-shell">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="m7 12 3 3 7-7" />
                    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
                  </svg>
                </span>
                <p className="mt-4 leading-relaxed text-muted">
                  <span className="font-bold text-foreground">{value.titulo}</span>{" "}
                  {value.texto}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
