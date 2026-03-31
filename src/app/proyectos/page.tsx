import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ParallaxMedia } from "@/components/parallax-media";
import { buildProjectSlug, getPublicProjects, parseProjectContent } from "@/lib/proyectos";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Galería de proyectos inmobiliarios finalizados y en curso de SAR en Argentina.",
};

export default async function ProyectosPage() {
  const projects = await getPublicProjects();

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
            <Reveal key={project.id} delay={idx * 0.07}>
              <Link
                href={`/proyectos/${buildProjectSlug(project)}`}
                className="panel group flex h-full flex-col bg-surface p-4 md:p-5"
              >
                <ParallaxMedia className="project-card-media" intensity={12}>
                  <Image
                    src={project.imagen_url || "/heroHome.jpg"}
                    alt={project.titulo}
                    width={900}
                    height={1125}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </ParallaxMedia>
                <div className="flex grow flex-col justify-end pt-5">
                  <p className="text-sm font-semibold text-muted">
                    {project.anio || "Sin anio"} {project.categoria ? `- ${project.categoria}` : ""}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">{project.titulo}</h2>
                  <p className="mt-2 text-muted">{project.direccion || "Ubicacion no informada"}</p>
                  {parseProjectContent(project.descripcion).resumen ? (
                    <p className="mt-3 line-clamp-2 text-sm text-muted">
                      {parseProjectContent(project.descripcion).resumen}
                    </p>
                  ) : null}
                  <p className="mt-4 text-sm font-semibold text-brand">Ver proyecto</p>
                </div>
              </Link>
            </Reveal>
          ))}
          {projects.length === 0 ? (
            <p className="col-span-full rounded-xl border border-dashed border-brand/20 p-5 text-center text-sm text-muted">
              Aun no hay proyectos publicados.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
