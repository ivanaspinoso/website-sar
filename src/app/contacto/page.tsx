import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacto SAR Desarrollos Inmobiliarios.",
};

export default function ContactoPage() {
  return (
    <div className="section-white">
      <section className="section-padding section-surface">
        <div className="container-sar">
          <Reveal className="max-w-4xl space-y-5">
            <p className="eyebrow">CONTACTO</p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Hablemos de tu proximo desarrollo.
            </h1>
            <p className="text-lg text-muted">
              Completá el formulario y nos pondremos en contacto a la brevedad.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="formulario" className="section-padding section-white">
        <div className="container-sar grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <Reveal className="space-y-4">
            <h2 className="text-2xl font-semibold">Datos de contacto</h2>
            <p className="text-muted">Buenos Aires, Argentina</p>
            <p className="text-muted">+54 11 4321-0000</p>
            <p className="text-muted">info@sardesarrollos.com</p>
          </Reveal>

          <Reveal className="panel">
            <form className="space-y-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre y apellido"
                className="input-premium"
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electronico"
                className="input-premium"
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Telefono"
                className="input-premium"
              />
              <textarea
                name="mensaje"
                rows={5}
                placeholder="Contanos sobre tu consulta"
                className="input-premium"
              />
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Enviar consulta
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
