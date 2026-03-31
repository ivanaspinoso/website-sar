import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Galería de proyectos inmobiliarios finalizados y en curso de SAR en Argentina.",
};

export default function ProyectosPage() {
  const projects = [
    { name: "Torre Rivadavia", address: "Av. Rivadavia 1520, CABA", year: "2024", status: "En curso" },
    { name: "Residencias Alvear", address: "Boulevard Oroño 860, Rosario", year: "2022", status: "Finalizado" },
    { name: "Nucleo Norte", address: "Av. Colon 2350, Cordoba", year: "2019", status: "Finalizado" },
    { name: "Barrio Parque Sur", address: "Camino Gral. Belgrano 4012, Buenos Aires", year: "2016", status: "Finalizado" },
  ];

  return (
    <div className="section-white">
      <section className="section-padding section-surface">
        <div className="container-sar">
          <Reveal className="max-w-4xl space-y-5">
            <p className="eyebrow">PROYECTOS</p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Trayectoria construida con vision y precision.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar grid gap-5 md:grid-cols-2">
          {projects.map((project, idx) => (
            <Reveal
              key={project.name}
              delay={idx * 0.07}
              className="panel bg-surface"
            >
              <p className="text-sm font-semibold text-muted">
                {project.year} - {project.status}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">{project.name}</h2>
              <p className="mt-2 text-muted">{project.address}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
