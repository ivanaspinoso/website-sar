import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Metodología",
  description: "Etapas del proceso de desarrollo inmobiliario, de la tierra a la escrituración.",
};

export default function MetodologiaPage() {
  const steps = [
    ["01", "Identificacion de oportunidad", "Seleccion de tierra y evaluacion del contexto urbano y comercial."],
    ["02", "Factibilidad y estrategia", "Analisis tecnico-financiero para validar viabilidad y rentabilidad esperada."],
    ["03", "Proyecto y permisos", "Desarrollo arquitectonico y gestion administrativa para habilitar la ejecucion."],
    ["04", "Ejecucion de obra", "Seguimiento integral de obra con control de plazos, calidad y presupuesto."],
    ["05", "Comercializacion", "Plan de ventas, posicionamiento del producto y acompanamiento a inversores."],
    ["06", "Entrega y escrituracion", "Cierre documental, postventa y consolidacion del valor generado."],
  ];

  return (
    <div className="section-white">
      <section className="section-padding section-surface">
        <div className="container-sar">
          <Reveal className="max-w-4xl space-y-5">
            <p className="eyebrow">METODOLOGIA</p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Del terreno a la escrituracion, con una metodologia clara.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar space-y-4">
          {steps.map(([number, title, text], idx) => (
            <Reveal
              key={number}
              delay={idx * 0.05}
              className="panel relative overflow-hidden"
            >
              <div className="timeline-line hidden md:block" />
              <div className="grid gap-4 md:grid-cols-[90px_1fr] md:gap-6">
                <p className="text-xl font-semibold text-muted md:pt-1">{number}</p>
                <div>
                  <h2 className="text-2xl font-semibold">{title}</h2>
                  <p className="mt-2 text-muted">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
