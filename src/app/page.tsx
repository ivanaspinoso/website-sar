import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { AnimatedCounter } from "@/components/animated-counter";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Proyectos inmobiliarios en Argentina con enfoque integral: tierra, desarrollo, comercialización y postventa.",
};

export default function Home() {
  const metrics = [
    { value: 50000, suffix: " m2", label: "de obra construida" },
    { value: 500, prefix: "+", label: "unidades funcionales entregadas" },
    { value: 20, suffix: " años", prefix: "+", label: "de trayectoria en el mercado" },
    { value: 20, prefix: "+", label: "proyectos desarrollados en Argentina" },
  ];

  return (
    <>
      <section id="inicio" className="relative -mt-20">
        <div className="relative min-h-[100svh] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/heroHome.jpg')] bg-cover bg-[center_30%] md:bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand/45 via-brand/8 to-brand/30" />
          <div className="container-sar relative min-h-[85svh] flex items-center justify-center">
            <Reveal className="absolute left-0 max-w-6xl space-y-4 text-white md:bottom-14">
              
              <h1 className="text-3xl leading-[1.1] font-semibold md:text-5xl lg:text-5xl">
                TRANSFORMAMOS TERRENOS EN PROYECTOS INMOBILIARIOS RENTABLES Y FUNCIONALES.
              </h1>
              <p className="max-w-2xl text-sm font-semibold leading-relaxed text-white/90 md:text-base">
                Desarrollo inmobiliario integral en Argentina desde 2004.
              </p>
              <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                <Link
                  href="#proyectos"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-white/90"
                >
                  Conocé nuestros proyectos
                </Link>
                <Link
                  href="#nosotros"
                  className="inline-flex items-center justify-center rounded-full border border-white/85 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-foreground"
                >
                  Quiénes somos
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="metricas" className="section-padding section-white">
        <div className="container-sar">
          <Reveal>
            <p className="eyebrow mb-10">NUMEROS QUE HABLAN</p>
            <div className="grid gap-4 md:grid-cols-4">
              {metrics.map((item, index) => (
                <Reveal key={item.label} delay={0.08 * index}>
                  <article className="panel bg-surface">
                    <p className="text-3xl font-semibold md:text-4xl">
                      <AnimatedCounter
                        value={item.value}
                        prefix={item.prefix}
                        suffix={item.suffix}
                      />
                    </p>
                    <p className="mt-3 text-sm text-muted">{item.label}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="nosotros" className="section-padding section-surface">
        <div className="container-sar">
          <Reveal className="grid gap-10 md:grid-cols-2 md:items-center">
            <div
              className="h-[360px] rounded-3xl bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/12.%20Honorio%20Pueyrredon%201850%20(1).jpg')",
              }}
            />
            <div className="space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Cada proyecto, una respuesta al entorno.
              </h2>
              <p className="leading-relaxed text-muted">
                Detrás de SAR Inversiones hay más de dos décadas de experiencia en el
                mercado inmobiliario argentino y una convicción: que cada proyecto tiene
                que ser único. Desarrollamos emprendimientos de arquitectura moderna que
                generan valor en su entorno y rentabilidad sostenida.
              </p>
              <Link href="/quienes-somos" className="btn-primary">
                Conocenos más
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="servicios" className="section-padding section-white">
        <div className="container-sar">
          <Reveal>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              Gestión integral del desarrollo inmobiliario
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <Reveal delay={0.08}>
                <article className="panel p-8">
                  <span className="icon-shell">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <path d="M4 19h16M5 16V7l7-3 7 3v9" />
                      <path d="M9 12h6M9 9h6" />
                    </svg>
                  </span>
                  <h3 className="mt-3 text-xl font-semibold">Management de Real Estate</h3>
                  <p className="mt-3 text-muted">
                    Gestionamos todo el ciclo del emprendimiento: análisis, viabilidad,
                    ejecución y comercialización.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.16}>
                <article className="panel p-8">
                  <span className="icon-shell">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <path d="M5 7h14M5 12h14M5 17h8" />
                      <path d="m15 16 2 2 3-4" />
                    </svg>
                  </span>
                  <h3 className="mt-3 text-xl font-semibold">Post Venta</h3>
                  <p className="mt-3 text-muted">
                    Nuestro compromiso no termina con la entrega. Acompañamos a cada cliente
                    en la etapa de postventa.
                  </p>
                </article>
              </Reveal>
            </div>
            <div className="mt-10">
              <Link href="/servicios" className="btn-outline">
                Ver servicios
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="proyectos" className="section-surface py-14 md:py-20">
        <div className="container-sar">
          <Reveal>
            <p className="eyebrow">PORTFOLIO</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Nuestra trayectoria
            </h2>
            <div className="mt-6 overflow-hidden rounded-3xl bg-surface p-1 md:mt-7 md:p-2">
              <div className="overflow-x-auto">
                <Image
                  src="/cronologia2.png"
                  alt="Cronología de proyectos destacados"
                  width={1820}
                  height={500}
                  className="mx-auto h-auto w-[1320px] max-w-none brightness-90 contrast-125 md:w-full md:max-w-full"
                />
              </div>
            </div>
            <div className="mt-6 md:mt-7">
              <Link href="/proyectos" className="btn-primary">
                Ver todos los proyectos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contacto" className="section-padding section-white">
        <div className="container-sar">
          <Reveal delay={0.12} className="panel rounded-3xl p-10 md:p-14">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              ¿Buscás un desarrollo dónde invertir?
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Explorá oportunidades de desarrollo con un equipo con más de 20 años en el
              mercado.
            </p>
            <div className="mt-8">
              <Link href="/contacto#formulario" className="btn-primary">
                Contactanos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
