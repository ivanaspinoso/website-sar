import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "SAR - Desarrollo inmobiliario",
  description:
    "Gestión inmobiliaria de punta a punta: management de real estate, tipos de proyecto y servicio de postventa de SAR.",
};

export default function ServiciosPage() {
  const includes = [
    "Análisis de viabilidad técnica, legal y financiera",
    "Adquisición y negociación del terreno",
    "Contratación y coordinación de profesionales",
    "Gestión de obra y calidad constructiva",
    "Estrategia comercial y marketing del proyecto",
    "Estructuración jurídica y seguimiento contable",
    "Escrituración y postventa",
  ];

  const projectTypes = [
    {
      title: "Para inversores.",
      text: "Proyectos de alta rentabilidad con potencial de valorización en zonas estratégicas de Buenos Aires y Argentina.",
    },
    {
      title: "Para renta.", 
      text: "Emprendimientos diseñados con unidades optimizadas para el mercado de alquiler temporario y permanente.",
    },
    {
      title: "Para consumidor final.",
      text: "Viviendas de arquitectura moderna con materiales de calidad y terminaciones premium.",
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
      <source src="/membrillar.mp4" type="video/mp4" />
    </video>

    
    <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,13,34,0.62),rgba(38,39,110,0.45))]"></div>

    <div className="container-sar relative z-10 mt-24 flex min-h-[calc(64svh-6rem)] items-end">
      <div className="max-w-4xl space-y-5 py-12 text-white md:py-20">
        
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
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
          <Reveal className="max-w-5xl space-y-5 border-l border-brand/20 pl-4 sm:pl-6 md:pl-10">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Management de Real Estate
            </h2>
            <p className="leading-relaxed text-muted">
              Gestionamos desarrollos inmobiliarios pensados para renta,
              inversiones de alto potencial y consumidores finales, integrando
              ejecución, administración y posicionamiento del producto. Nuestro
              equipo acompaña cada proyecto desde el análisis de factibilidad
              hasta la entrega de llaves, asegurando resultados consistentes y
              predecibles.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-9 overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-b from-white to-surface">
            <ul className="divide-y divide-brand/10">
              {includes.map((item) => (
                <li
                  key={item}
                  className="grid items-center gap-4 px-4 py-5 sm:px-5 md:grid-cols-[72px_1fr_auto] md:px-8"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand/20 text-brand/75">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  </span>
                  <p className="text-base font-medium text-foreground/95 md:text-lg">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-sar">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              ¿Para quién desarrollamos?
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {projectTypes.map((card, idx) => (
              <Reveal key={idx} delay={idx * 0.08} className="panel border-brand/15 bg-white">
                <p className="leading-relaxed text-muted">
                  <span className="font-bold text-foreground">{card.title}</span>{" "}
                  {card.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar">
          <Reveal className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="overflow-hidden rounded-3xl border border-brand/10 shadow-[0_30px_80px_-55px_rgba(38,39,110,0.42)]">
              <Image
                src="/pexels-ivan-s-8962801 (1).jpg"
                alt="Equipo revisando plano arquitectónico durante la etapa de postventa"
                width={1920}
                height={1280}
                className="h-[280px] w-full object-cover sm:h-[340px] md:h-[430px]"
              />
            </div>
            <div className="space-y-5">
              <p className="eyebrow">POST VENTA</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                La entrega no marca el fin del compromiso.
              </h2>
              <p className="leading-relaxed text-muted">
                En la etapa de postventa acompañamos a nuestros clientes ante
                cualquier inconveniente que pueda surgir, garantizando que cada
                unidad funcione exactamente en las condiciones en que fue
                pactada.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

