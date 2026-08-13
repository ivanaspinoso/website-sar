import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ProjectCardImage } from "@/components/project-card-image";
import { buildProjectSlug, getPublicProjects } from "@/lib/proyectos";
import { getPageContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

// Las fotos son verticales (4:5) y la card es 4:4.4, asi que object-cover recorta
// arriba y abajo. Por defecto queda centrado; aca se ajusta el anclaje en los
// proyectos donde ese centrado corta mal (techo cortado, vereda de mas, etc).
const ENCUADRE_POR_SLUG: Record<string, string> = {
  "jose-bonifacio-1686-73ff283b": "object-top",
};

export const metadata: Metadata = {
  title: "SAR - Desarrollo inmobiliario",
  description: "Galería de proyectos inmobiliarios finalizados y en curso de SAR en Argentina.",
};

export default async function ProyectosPage() {
  const [projects, c] = await Promise.all([
    getPublicProjects(),
    getPageContent("proyectos"),
  ]);

  return (
    <div className="section-white">
      <section className="relative -mt-24">
        <div className="relative min-h-[64svh] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/heroHome.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,13,34,0.62),rgba(38,39,110,0.46))]" />
          <div className="container-sar relative mt-24 flex min-h-[calc(64svh-6rem)] items-end">
            <Reveal className="max-w-4xl space-y-5 py-12 text-white sm:py-16 md:py-20">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">{c.hero_titulo}</h1>
              <p className="max-w-3xl text-white/90">{c.hero_subtitulo}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding section-white">
        <div className="container-sar space-y-14">
          {projects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projects.map((project, idx) => {
                const slug = buildProjectSlug(project);
                const encuadre = ENCUADRE_POR_SLUG[slug] ?? "";

                return (
                <Reveal key={project.id} delay={idx * 0.07}>
                  <Link href={`/proyectos/${slug}`} className="group block">
                    <div className="relative aspect-[4/4.4] overflow-hidden">
                      <ProjectCardImage
                        src={project.imagen_url}
                        alt={project.titulo}
                        className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] ${encuadre}`}
                      />
                    </div>
                    <div className="pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{project.anio || "-"}</p>
                      <h3 className="text-[1.40rem] font-thin leading-tight tracking-normal text-foreground sm:text-[1.5rem] md:text-[1.4rem]">
                        {project.titulo}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
                );
              })}
            </div>
          ) : null}

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
