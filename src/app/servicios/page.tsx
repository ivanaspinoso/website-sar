import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Modelo de management inmobiliario y servicio integral de SAR.",
};

export default function ServiciosPage() {
  const services = [
    {
      title: "Analisis de tierra y factibilidad",
      text: "Evaluamos normativa, contexto urbano y potencial comercial para definir la mejor estrategia de desarrollo.",
    },
    {
      title: "Estructuracion del negocio",
      text: "Armamos el modelo economico, escenarios de riesgo y plan de inversion para cada etapa del proyecto.",
    },
    {
      title: "Gestion de obra y coordinacion",
      text: "Coordinamos equipos tecnicos, administrativos y contratistas con foco en tiempos, calidad y costos.",
    },
    {
      title: "Comercializacion y postventa",
      text: "Acompanamos la salida al mercado, cierre de operaciones y el soporte al cliente despues de la entrega.",
    },
  ];

  return (
    <div className="section-white">
      <section className="section-padding section-surface">
        <div className="container-sar">
          <Reveal className="max-w-4xl space-y-5">
            <p className="eyebrow">SERVICIOS</p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Gestion integral del desarrollo inmobiliario.
            </h1>
            <p className="text-lg text-muted">
              Un modelo de management que conecta arquitectura, inversion y ejecucion.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar grid gap-5 md:grid-cols-2">
          {services.map((service, idx) => (
            <Reveal
              key={service.title}
              delay={idx * 0.05}
              className="panel"
            >
              <h2 className="text-2xl font-semibold">{service.title}</h2>
              <p className="mt-3 text-muted">{service.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
