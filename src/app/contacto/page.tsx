import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacto SAR Desarrollos Inmobiliarios.",
};

export default function ContactoPage() {
  return (
    <div className="section-white">
      <section className="relative -mt-24">
        <div className="relative min-h-[64svh] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/contacto.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,13,34,0.62),rgba(38,39,110,0.46))]" />
          <div className="container-sar relative mt-24 flex min-h-[calc(64svh-6rem)] items-end">
            <Reveal className="max-w-4xl space-y-5 py-12 text-white sm:py-16 md:py-20">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                Contactanos
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                Para conocer nuestros proyectos en curso o explorar oportunidades
                de inversion.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="formulario" className="section-padding section-surface relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-12 top-10 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
        </div>
        <div className="container-sar space-y-6">
          <Reveal className="panel relative border-brand/15 bg-white">
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

          <Reveal className="panel mx-auto w-full max-w-5xl space-y-4 border-brand/15 bg-gradient-to-b from-white to-surface">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Datos de contacto
            </h2>
            <div className="grid gap-3 break-words text-muted md:grid-cols-2">
              <p>🌐 www.sardesarrollos.com.ar</p>
              <p>📧 recepcion@sardesarrollos.com.ar</p>
              <p>📞 11 4331-582</p>
              <p>💼 LinkedIn: Sar Inversiones &amp; Desarrollos</p>
              <p>📸 Instagram: @Sardesarrollos</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
