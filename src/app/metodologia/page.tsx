import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { getPageContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SAR - Desarrollo inmobiliario",
  description:
    "Nuestra metodología de trabajo en desarrollo inmobiliario: un proceso ejecutado con precisión en cada etapa.",
};

export default async function MetodologiaPage() {
  const c = await getPageContent("metodologia");

  return (
    <div className="section-white">
      <section className="relative -mt-24">
        <div className="relative min-h-[64svh] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/12.%20Honorio%20Pueyrredon%201850%20(1).jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,13,34,0.62),rgba(38,39,110,0.46))]" />
          <div className="container-sar relative mt-24 flex min-h-[calc(64svh-6rem)] items-end">
            <Reveal className="max-w-4xl space-y-5 py-12 text-white sm:py-16 md:py-20">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl">{c.hero_titulo}</h1>
              <p className="text-base leading-relaxed text-white/90 sm:text-lg">{c.hero_subtitulo}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar">
          <Reveal className="mx-auto max-w-6xl bg-gradient-to-b from-white to-surface p-5 text-center shadow-[0_24px_60px_-45px_rgba(38,39,110,0.4)] sm:p-8 md:p-12">
            <p className="mx-auto max-w-5xl text-lg leading-relaxed text-foreground sm:text-xl md:text-[2.05rem] md:leading-[1.32]">
              {c.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-sar">
          <Reveal>
            <p className="eyebrow">ETAPAS DEL PROCESO</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Timeline de trabajo paso a paso</h2>
          </Reveal>
          <div className="mt-8 space-y-4">
            {c.pasos.map((paso, idx) => (
              <Reveal key={paso.numero + idx} delay={idx * 0.05} className="panel relative overflow-hidden border-brand/15 bg-white">
                <div className="grid gap-4 md:grid-cols-[90px_1fr] md:gap-6">
                  <p className="text-xl font-semibold text-brand/55 md:pt-1">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h2 className="text-xl font-semibold sm:text-2xl">{paso.titulo}</h2>
                    <p className="mt-2 text-muted">{paso.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
