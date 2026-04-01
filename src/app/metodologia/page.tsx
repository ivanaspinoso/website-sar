import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "SAR - Desarrollo inmobiliario",
  description:
    "Nuestra metodología de trabajo en desarrollo inmobiliario: un proceso ejecutado con precisión en cada etapa.",
};

export default function MetodologiaPage() {
  const steps = [
    [
      "01",
      "Análisis y Viabilidad",
      "Estudio del terreno, análisis de mercado, factibilidad técnica, legal y financiera del emprendimiento.",
    ],
    [
      "02",
      "Definición del Proyecto",
      "Concepto arquitectónico, programa de unidades, selección de profesionales clave (arquitecto, ingeniero, etc.).",
    ],
    [
      "03",
      "Estructuración Jurídica",
      "Documentación y habilitaciones correspondientes.",
    ],
    [
      "04",
      "Construcción",
      "Dirección y supervisión de obra. Control de calidad, plazos y presupuesto.",
    ],
    [
      "05",
      "Marketing y Comercialización",
      "Posicionamiento del producto y estrategia de ventas.",
    ],
    [
      "06",
      "Escrituración",
      "Acompañamiento del proceso de escrituración de cada unidad funcional.",
    ],
    [
      "07",
      "Post Venta",
      "Soporte posterior a la entrega para garantizar el correcto funcionamiento de cada unidad.",
    ],
  ];

  return (
    <div className="section-white">
      <section className="relative -mt-24">
        <div className="relative min-h-[64svh] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/12.%20Honorio%20Pueyrredon%201850%20(1).jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,13,34,0.62),rgba(38,39,110,0.46))]" />
          <div className="container-sar relative mt-24 flex min-h-[calc(64svh-6rem)] items-end">
            <Reveal className="max-w-4xl space-y-5 py-12 text-white sm:py-16 md:py-20">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                Nuestra metodología de trabajo
              </h1>
              <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                Un proceso ejecutado con precisión en cada etapa.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar">
          <Reveal className="mx-auto max-w-6xl bg-gradient-to-b from-white to-surface p-5 text-center shadow-[0_24px_60px_-45px_rgba(38,39,110,0.4)] sm:p-8 md:p-12">
            <p className="mx-auto max-w-5xl text-lg leading-relaxed text-foreground sm:text-xl md:text-[2.05rem] md:leading-[1.32]">
              Nuestra metodología abarca todo el proceso de desarrollo de un
              emprendimiento: desde la adquisición de la tierra y la definición
              del proyecto, la contratación de profesionales, la construcción y
              el marketing, hasta la estructuración jurídica y el seguimiento
              contable. Cuidamos cada detalle de terminación, priorizando la
              estética y el uso de materiales vanguardistas y de calidad.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-sar">
          <Reveal>
            <p className="eyebrow">ETAPAS DEL PROCESO</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Timeline de trabajo paso a paso
            </h2>
          </Reveal>
          <div className="mt-8 space-y-4">
            {steps.map(([number, title, text], idx) => (
              <Reveal
                key={number}
                delay={idx * 0.05}
                className="panel relative overflow-hidden border-brand/15 bg-white"
              >
                <div className="grid gap-4 md:grid-cols-[90px_1fr] md:gap-6">
                  <p className="text-xl font-semibold text-brand/55 md:pt-1">
                    {number}
                  </p>
                  <div>
                    <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
                    <p className="mt-2 text-muted">{text}</p>
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

