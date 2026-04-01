import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { AnimatedCounter } from "@/components/animated-counter";
import { Reveal } from "@/components/reveal";
import { ParallaxMedia } from "@/components/parallax-media";

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
      <section id="inicio" className="relative -mt-24">
        <div className="relative min-h-[100svh] overflow-hidden">
          <ParallaxMedia className="absolute inset-0" intensity={20}>
            <div className="h-[108%] w-full bg-[url('/heroHome.jpg')] bg-cover bg-[center_30%] md:bg-center" />
          </ParallaxMedia>
          <div className="absolute inset-0 bg-gradient-to-b from-brand/58 via-brand/24 to-brand/44" />
          <div className="container-sar relative mt-24 flex min-h-[calc(100svh-6rem)] items-center justify-center">
            <Reveal className="max-w-5xl space-y-5 p-4 text-center text-white sm:p-6 md:p-9">
              <h1 className="text-balance text-[1.85rem] leading-[1.08] font-semibold [text-shadow:0_4px_18px_rgba(0,0,0,0.65)] sm:text-4xl lg:text-5xl">
                TRANSFORMAMOS TERRENOS EN PROYECTOS INMOBILIARIOS RENTABLES Y FUNCIONALES
              </h1>
              <p className="mx-auto max-w-2xl text-sm font-semibold leading-relaxed text-white/95 [text-shadow:0_2px_10px_rgba(0,0,0,0.58)] md:text-base">
                Desarrollo inmobiliario integral en Argentina desde 2004.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 pt-3 sm:flex-row">
                <Link
                  href="#proyectos"
                  className="btn-light w-full sm:w-auto"
                >
                  Conocé nuestros proyectos
                </Link>
                <Link
                  href="#nosotros"
                  className="btn-outline-light w-full sm:w-auto"
                >
                  Quiénes somos
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="metricas" className="section-padding section-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-36 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/8 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-brand/6 blur-3xl" />
        </div>
        <div className="container-sar">
          <Reveal className="relative">
            <p className="eyebrow mb-4">Métricas</p>
            <h2 className="mb-10 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Números que hablan
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((item, index) => (
                <Reveal key={item.label} delay={0.08 * index}>
                  <article className="panel grid h-full grid-rows-[auto_auto_1fr] border-brand/15 bg-gradient-to-b from-white to-surface">
                    <span className="mb-6 block h-px w-14 bg-brand/30" />
                    <p className="min-h-[3.3rem] md:min-h-[3.8rem]">
                      <AnimatedCounter
                        value={item.value}
                        prefix={item.prefix}
                        suffix={item.suffix}
                        className="block text-3xl leading-none font-extrabold tracking-[-0.01em] text-foreground md:text-4xl"
                      />
                    </p>
                    <p className="mt-3 self-start overflow-hidden text-sm tracking-wide text-muted/90 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] md:text-base">
                      {item.label}
                    </p>
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
              className="h-[280px] rounded-3xl bg-cover bg-center shadow-[0_30px_80px_-45px_rgba(38,39,110,0.55)] sm:h-[330px] md:h-[360px]"
              style={{
                backgroundImage:
                  "url('/12.%20Honorio%20Pueyrredon%201850%20(1).jpg')",
              }}
            />
            <div className="space-y-5">
              <p className="eyebrow">Compañía</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Cada proyecto, una respuesta al entorno.
              </h2>
              <p className="leading-relaxed text-muted">
                Detrás de SAR Inversiones hay más de dos décadas de experiencia en el
                mercado inmobiliario argentino y una convicción: que cada proyecto tiene
                que ser único. Desarrollamos emprendimientos de arquitectura moderna que
                generan valor en su entorno y rentabilidad sostenida.
              </p>
              <Link href="/quienes-somos" className="btn-primary w-full sm:w-auto">
                Conocenos más
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="servicios" className="section-padding section-white">
        <div className="container-sar">
          <Reveal>
            <p className="eyebrow">Servicios</p>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Gestión integral del desarrollo inmobiliario
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <Reveal delay={0.08}>
                <article className="panel p-8 md:p-10">
                  <span className="icon-shell">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <path d="M4 19h16M5 16V7l7-3 7 3v9" />
                      <path d="M9 12h6M9 9h6" />
                    </svg>
                  </span>
                  <h3 className="mt-4 text-xl font-semibold md:text-2xl">Management de Real Estate</h3>
                  <p className="mt-3 text-muted">
                    Gestionamos todo el ciclo del emprendimiento: análisis, viabilidad,
                    ejecución y comercialización.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={0.16}>
                <article className="panel p-8 md:p-10">
                  <span className="icon-shell">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <path d="M5 7h14M5 12h14M5 17h8" />
                      <path d="m15 16 2 2 3-4" />
                    </svg>
                  </span>
                  <h3 className="mt-4 text-xl font-semibold md:text-2xl">Post Venta</h3>
                  <p className="mt-3 text-muted">
                    Nuestro compromiso no termina con la entrega. Acompañamos a cada cliente
                    en la etapa de postventa.
                  </p>
                </article>
              </Reveal>
            </div>
            <div className="mt-10">
              <Link href="/servicios" className="btn-outline w-full sm:w-auto">
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
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Nuestra trayectoria
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Un recorrido de hitos que sintetiza escala, continuidad y visión de largo plazo.
            </p>
            <div className="mt-6 overflow-hidden rounded-3xl border border-brand/10 bg-surface p-1 shadow-[0_30px_70px_-50px_rgba(38,39,110,0.5)] md:mt-7 md:p-2">
              <div className="overflow-hidden">
                <ParallaxMedia className="mx-auto w-full" intensity={14}>
                  <Image
                    src="/cronologia2.png"
                    alt="Cronología de proyectos destacados"
                    width={1820}
                    height={500}
                    className="mx-auto h-auto w-full brightness-90 contrast-125"
                  />
                </ParallaxMedia>
              </div>
            </div>
            <div className="mt-6 md:mt-7">
              <Link href="/proyectos" className="btn-primary w-full sm:w-auto">
                Ver todos los proyectos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contacto" className="relative overflow-hidden section-white">
        <div className="absolute inset-0 bg-[url('/contacto.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(38,39,110,0.82),rgba(38,39,110,0.56))]" />
        <div className="container-sar relative section-padding">
          <Reveal
            delay={0.12}
            className="panel mx-auto max-w-4xl rounded-3xl border-white/35 bg-white/95 p-6 shadow-[0_34px_100px_-60px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:-translate-y-1 sm:p-8 md:p-14"
          >
            <p className="eyebrow">Contacto</p>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              ¿Buscás un Desarrollo dónde invertir?
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Explorá oportunidades de desarrollo con un equipo con más de 20 años en
              el mercado.
            </p>
            <div className="mt-8">
              <Link href="/contacto#formulario" className="btn-primary w-full sm:w-auto">
                Contactanos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
