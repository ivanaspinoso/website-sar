import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ProjectCardImage } from "@/components/project-card-image";
import { buildProjectSlug, getPublicProjects } from "@/lib/proyectos";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SAR - Desarrollo inmobiliario",
  description: "Galería de proyectos inmobiliarios finalizados y en curso de SAR en Argentina.",
};

export default async function ProyectosPage() {
  const projects = await getPublicProjects();

  return (
    <div className="section-white">
      <section className="relative -mt-24">
        <div className="relative min-h-[64svh] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/heroHome.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,13,34,0.62),rgba(38,39,110,0.46))]" />
          <div className="container-sar relative mt-24 flex min-h-[calc(64svh-6rem)] items-end">
            <Reveal className="max-w-4xl space-y-5 py-12 text-white sm:py-16 md:py-20">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Trayectoria construida con vision y precision
              </h1>
              <p className="max-w-3xl text-white/90">
                Selección de desarrollos realizados y en curso, concebidos para generar valor urbano y rentabilidad sostenida.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.07}>
              <Link
                href={`/proyectos/${buildProjectSlug(project)}`}
                className="group block"
              >
                <div className="relative aspect-[4/4.4] overflow-hidden">
                  <ProjectCardImage
                    src={project.imagen_url}
                    alt={project.titulo}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {project.anio || "-"}
                  </p>
                  <h2 className="text-[1.65rem] font-thin leading-tight tracking-normal text-foreground/85 sm:text-[1.85rem] md:text-[2rem]">
                    {project.titulo}
                  </h2>
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

