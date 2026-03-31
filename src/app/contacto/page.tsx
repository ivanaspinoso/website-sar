import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacto SAR Desarrollos Inmobiliarios.",
};

export default function ContactoPage() {
  return (
    <div className="section-white">
      <section className="relative -mt-20">
        <div className="relative min-h-[62svh] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/contacto.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-brand/55" />
          <div className="container-sar relative mt-20 flex min-h-[calc(62svh-5rem)] items-center">
            <Reveal className="max-w-3xl space-y-5 py-16 text-white md:py-24">
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Contactanos
              </h1>
              <p className="max-w-2xl text-base text-white/90 md:text-lg">
                Para conocer nuestros proyectos en curso o explorar oportunidades
                de inversion.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="formulario" className="section-padding section-surface">
        <div className="container-sar grid gap-8 md:grid-cols-[1.35fr_1fr]">
          <Reveal className="panel">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Formulario de contacto
            </h2>
            <form className="mt-6 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="label-premium">
                    Nombre completo
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    className="input-premium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="telefono" className="label-premium">
                    Telefono
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    name="telefono"
                    className="input-premium"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="label-premium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="input-premium"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="motivo" className="label-premium">
                  Motivo de contacto
                </label>
                <select id="motivo" name="motivo" className="input-premium" required>
                  <option value="">Seleccionar motivo</option>
                  <option value="inversion">Inversion</option>
                  <option value="informacion-proyectos">
                    Informacion de proyectos
                  </option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="mensaje" className="label-premium">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  className="input-premium resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Enviar consulta
              </button>
            </form>
          </Reveal>

          <Reveal className="panel space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Datos de contacto
            </h2>
            <p className="text-muted">🌐 www.sardesarrollos.com.ar</p>
            <p className="text-muted">📧 recepcion@sardesarrollos.com.ar</p>
            <p className="text-muted">📞 11 4331-582</p>
            <p className="text-muted">
              💼 LinkedIn: Sar Inversiones &amp; Desarrollos
            </p>
            <p className="text-muted">📸 Instagram: @Sardesarrollos</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
