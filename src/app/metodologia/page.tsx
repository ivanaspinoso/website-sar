import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Metodología",
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
      <section className="section-padding section-surface">
        <div className="container-sar">
          <Reveal className="max-w-4xl space-y-5">
            <div className="overflow-hidden rounded-3xl border border-brand/10">
              <Image
                src="/testimonio.jpg"
                alt="Profesional revisando plano de obra en etapa de desarrollo"
                width={1920}
                height={1280}
                className="h-[340px] w-full object-cover md:h-[430px]"
              />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Nuestra metodología de trabajo
            </h1>
            <p className="text-lg leading-relaxed text-muted">
              Un proceso ejecutado con precisión en cada etapa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar">
          <Reveal className="max-w-5xl">
            <p className="leading-relaxed text-muted">
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
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Timeline de trabajo paso a paso
            </h2>
          </Reveal>
          <div className="mt-8 space-y-4">
            {steps.map(([number, title, text], idx) => (
              <Reveal
                key={number}
                delay={idx * 0.05}
                className="panel relative overflow-hidden bg-white"
              >
                <div className="grid gap-4 md:grid-cols-[90px_1fr] md:gap-6">
                  <p className="text-xl font-semibold text-muted md:pt-1">
                    {number}
                  </p>
                  <div>
                    <h2 className="text-2xl font-semibold">{title}</h2>
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
