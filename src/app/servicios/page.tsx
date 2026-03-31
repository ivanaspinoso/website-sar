import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Servicios",
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
    "Para inversores. Proyectos de alta rentabilidad con potencial de valorización en zonas estratégicas de Buenos Aires y Argentina.",
    "Para renta. Emprendimientos diseñados con unidades optimizadas para el mercado de alquiler temporario y permanente.",
    "Para consumidor final. Viviendas de arquitectura moderna con materiales de calidad y terminaciones premium.",
  ];

  return (
    <div className="section-white">
      <section className="section-padding section-surface">
        <div className="container-sar">
          <Reveal className="max-w-4xl space-y-5">
            <div className="h-[340px] rounded-3xl border border-brand/15 bg-white md:h-[430px]" />
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Gestión inmobiliaria de punta a punta
            </h1>
            <p className="text-lg leading-relaxed text-muted">
              Nos dedicamos íntegramente a la ejecución y administración de
              emprendimientos inmobiliarios.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar">
          <Reveal className="max-w-5xl space-y-5">
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

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {includes.map((item, idx) => (
              <Reveal key={item} delay={idx * 0.06} className="panel bg-surface">
                <span className="icon-shell">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    aria-hidden="true"
                  >
                    <path d="m7 12 3 3 7-7" />
                    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
                  </svg>
                </span>
                <p className="mt-4 leading-relaxed text-muted">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-sar">
          <Reveal>
            <p className="eyebrow">¿PARA QUIÉN DESARROLLAMOS?</p>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {projectTypes.map((card, idx) => (
              <Reveal key={card} delay={idx * 0.08} className="panel bg-white">
                <p className="leading-relaxed text-muted">{card}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar">
          <Reveal className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="overflow-hidden rounded-3xl border border-brand/10">
              <Image
                src="/pexels-ivan-s-8962801 (1).jpg"
                alt="Equipo revisando plano arquitectónico durante la etapa de postventa"
                width={1920}
                height={1280}
                className="h-[340px] w-full object-cover md:h-[430px]"
              />
            </div>
            <div className="space-y-5">
              <p className="eyebrow">POST VENTA</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
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
