import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { MarkdownContent } from "@/components/markdown-content";
import { getPublicProjects, parseProjectContent } from "@/lib/proyectos";

type Params = Promise<{ slug: string }>;

function projectIdFromSlug(slug: string) {
  const tokens = slug.split("-");
  return tokens.at(-1) ?? "";
}

async function getProjectBySlug(slug: string) {
  const projectIdPrefix = projectIdFromSlug(slug);
  const projects = await getPublicProjects();
  return projects.find((item) => item.id.startsWith(projectIdPrefix));
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
    };
  }

  const content = parseProjectContent(project.descripcion);

  return {
    title: project.titulo,
    description:
      content.resumen ?? project.direccion ?? "Detalle de proyecto",
  };
}

export default async function ProyectoDetallePage(props: { params: Params }) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const heroImage = project.imagen_url || "/heroHome.jpg";
  const content = parseProjectContent(project.descripcion);
  const gallery = content.galeria?.filter(Boolean) ?? [];
  const amenities = content.amenities?.filter(Boolean) ?? [];

  return (
    <div className="section-white">
      <section className="relative -mt-24 min-h-[72svh] overflow-hidden">
        <Image src={heroImage} alt={project.titulo} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/45 via-brand/20 to-brand/55" />
        <div className="container-sar relative flex min-h-[72svh] items-end pb-14 pt-36">
          <Reveal className="max-w-3xl text-white">
            {content.hero_tag ? <p className="eyebrow !text-white/80">{content.hero_tag}</p> : null}
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">{project.titulo}</h1>
            <p className="mt-4 text-sm text-white/90 md:text-base">
              {project.direccion || "Ubicacion privilegiada en la Ciudad de Buenos Aires"}
            </p>
            {content.estado ? (
              <p className="mt-4 inline-flex rounded-full border border-white/35 bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                {content.estado}
              </p>
            ) : null}
          </Reveal>
        </div>
      </section>

      {content.intro_titulo || content.intro_parrafo_1 || content.intro_parrafo_2 ? (
        <section className="section-padding section-white">
          <div className="container-sar grid gap-12 md:grid-cols-2 md:items-start">
            <Reveal>
              {content.intro_titulo ? (
                <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{content.intro_titulo}</h2>
              ) : null}
            </Reveal>
            <Reveal delay={0.08} className="space-y-7 text-lg leading-relaxed text-foreground/95">
              {content.intro_parrafo_1 ? <p>{content.intro_parrafo_1}</p> : null}
              {content.intro_parrafo_2 ? <p>{content.intro_parrafo_2}</p> : null}
            </Reveal>
          </div>
        </section>
      ) : null}

      {content.descripcion_markdown ? (
        <section className="section-padding section-white">
          <div className="container-sar">
            <Reveal>
              <MarkdownContent content={content.descripcion_markdown} className="space-y-4" />
            </Reveal>
          </div>
        </section>
      ) : null}

      {gallery.length > 0 ? (
        <section className="section-white pb-8">
          <div className="container-sar">
            <div className="grid gap-4 md:grid-cols-2">
              {gallery.slice(0, 2).map((imageUrl, index) => (
                <div key={imageUrl + index} className="overflow-hidden rounded-3xl">
                  <Image
                    src={imageUrl}
                    alt={`Imagen ${index + 1} de ${project.titulo}`}
                    width={1600}
                    height={1000}
                    className="h-[300px] w-full object-cover md:h-[460px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {content.arquitectura_titulo || content.arquitectura_parrafo_1 || content.arquitectura_parrafo_2 ? (
        <section className="section-padding section-surface">
          <div className="container-sar grid gap-12 md:grid-cols-2">
            <Reveal>
              {content.arquitectura_titulo ? (
                <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{content.arquitectura_titulo}</h2>
              ) : null}
            </Reveal>
            <Reveal delay={0.08} className="space-y-7 text-lg leading-relaxed text-foreground/95">
              {content.arquitectura_parrafo_1 ? <p>{content.arquitectura_parrafo_1}</p> : null}
              {content.arquitectura_parrafo_2 ? <p>{content.arquitectura_parrafo_2}</p> : null}
            </Reveal>
          </div>
        </section>
      ) : null}

      {content.video_url ? (
        <section className="section-white pb-8">
          <div className="container-sar">
            <Reveal className="overflow-hidden rounded-3xl border border-brand/10">
              <video src={content.video_url} controls className="h-auto w-full" />
            </Reveal>
          </div>
        </section>
      ) : null}

      {content.mapa_url ? (
        <section className="section-white pb-8">
          <div className="container-sar">
            <Reveal className="overflow-hidden rounded-3xl border border-brand/10">
              <Image
                src={content.mapa_url}
                alt={`Mapa de ubicacion de ${project.titulo}`}
                width={1800}
                height={900}
                className="h-[320px] w-full object-cover md:h-[520px]"
              />
            </Reveal>
          </div>
        </section>
      ) : null}

      {content.vivir_titulo || amenities.length > 0 || content.unidades ? (
        <section className="section-padding section-white">
          <div className="container-sar">
            {content.vivir_titulo ? (
              <Reveal>
                <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">{content.vivir_titulo}</h2>
              </Reveal>
            ) : null}
            {content.unidades ? (
              <Reveal delay={0.06}>
                <p className="mt-4 text-base text-muted">Unidades: {content.unidades}</p>
              </Reveal>
            ) : null}

            {gallery[2] ? (
              <Reveal delay={0.08} className="mt-8 overflow-hidden rounded-3xl">
                <Image
                  src={gallery[2]}
                  alt={`Imagen de unidades de ${project.titulo}`}
                  width={1600}
                  height={1100}
                  className="h-[420px] w-full object-cover md:h-[620px]"
                />
              </Reveal>
            ) : null}

            {amenities.length > 0 ? (
              <Reveal delay={0.12} className="mt-10 flex flex-wrap gap-3">
                {amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full border border-brand/20 bg-surface px-4 py-2 text-sm font-semibold text-brand"
                  >
                    {amenity}
                  </span>
                ))}
              </Reveal>
            ) : null}

            <Reveal delay={0.16} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contacto#formulario" className="btn-primary">
                Solicitar informacion comercial
              </Link>
              {content.brochure_url ? (
                <a href={content.brochure_url} target="_blank" rel="noreferrer" className="btn-outline">
                  Descargar brochure
                </a>
              ) : null}
            </Reveal>
          </div>
        </section>
      ) : null}
    </div>
  );
}
