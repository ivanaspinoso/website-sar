import { createClient } from "@supabase/supabase-js";

function normalizeEnv(v: string | undefined) {
  if (!v) return "";
  return v.trim().replace(/^['"]|['"]$/g, "");
}

function getClient() {
  const url = normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL);
  const key = normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY);
  return url && key ? createClient(url, key) : null;
}

// ─── Types ────────────────────────────────────────────────────────────────

export type MetricaItem = { value: number; prefix?: string; suffix?: string; label: string };
export type TextItem = { titulo: string; texto: string };

export type HomeContent = {
  hero_titulo: string;
  hero_subtitulo: string;
  metricas: MetricaItem[];
  compannia_titulo: string;
  compannia_texto: string;
  servicios_titulo: string;
  servicios_card1_titulo: string;
  servicios_card1_texto: string;
  servicios_card2_titulo: string;
  servicios_card2_texto: string;
  portfolio_titulo: string;
  portfolio_texto: string;
  contacto_cta_titulo: string;
  contacto_cta_texto: string;
};

export type QuienesSomosContent = {
  hero_titulo: string;
  hero_subtitulo: string;
  historia_titulo: string;
  historia_parrafo1: string;
  historia_parrafo2: string;
  mision_titulo: string;
  mision_texto: string;
  valores: TextItem[];
};

export type ServiciosContent = {
  hero_titulo: string;
  hero_subtitulo: string;
  management_titulo: string;
  management_texto: string;
  management_lista: string[];
  tipos: TextItem[];
  postventa_titulo: string;
  postventa_texto: string;
};

export type ContactoContent = {
  hero_titulo: string;
  hero_subtitulo: string;
};

export type ProyectosContent = {
  hero_titulo: string;
  hero_subtitulo: string;
};

export type GlobalContent = {
  footer_descripcion: string;
  contacto_email: string;
  contacto_telefono: string;
  contacto_web: string;
  redes_linkedin_url: string;
  redes_instagram_url: string;
  redes_linkedin_label: string;
  redes_instagram_label: string;
};

// ─── Defaults ─────────────────────────────────────────────────────────────

export const DEFAULT_HOME: HomeContent = {
  hero_titulo: "TRANSFORMAMOS TERRENOS EN PROYECTOS INMOBILIARIOS RENTABLES Y FUNCIONALES",
  hero_subtitulo: "Desarrollo inmobiliario integral en Argentina desde 2004.",
  metricas: [
    { value: 50000, suffix: " m2", label: "de obra construida" },
    { value: 500, prefix: "+", label: "unidades funcionales entregadas" },
    { value: 20, suffix: " años", prefix: "+", label: "de trayectoria en el mercado" },
    { value: 20, prefix: "+", label: "proyectos desarrollados en Argentina" },
  ],
  compannia_titulo: "Cada proyecto, una respuesta al entorno.",
  compannia_texto:
    "Detrás de SAR Inversiones hay más de dos décadas de experiencia en el mercado inmobiliario argentino y una convicción: que cada proyecto tiene que ser único. Desarrollamos emprendimientos de arquitectura moderna que generan valor en su entorno y rentabilidad sostenida.",
  servicios_titulo: "Gestión integral del desarrollo inmobiliario",
  servicios_card1_titulo: "Management de Real Estate",
  servicios_card1_texto:
    "Gestionamos todo el ciclo del emprendimiento: análisis, viabilidad, ejecución y comercialización.",
  servicios_card2_titulo: "Post Venta",
  servicios_card2_texto:
    "Nuestro compromiso no termina con la entrega. Acompañamos a cada cliente en la etapa de postventa.",
  portfolio_titulo: "Nuestra trayectoria",
  portfolio_texto:
    "Un recorrido de hitos que sintetiza escala, continuidad y visión de largo plazo.",
  contacto_cta_titulo: "¿Buscás un Desarrollo dónde invertir?",
  contacto_cta_texto:
    "Explorá oportunidades de desarrollo con un equipo con más de 20 años en el mercado.",
};

export const DEFAULT_QUIENES_SOMOS: QuienesSomosContent = {
  hero_titulo: "Más de 20 años construyendo proyectos únicos",
  hero_subtitulo: "SAR Inversiones & Desarrollos | Desarrolladora inmobiliaria en Argentina",
  historia_titulo: "Una pregunta que dio forma a todo",
  historia_parrafo1:
    "Detrás de SAR Inversiones & Desarrollos hay una trayectoria sostenida en el mercado inmobiliario argentino y una pregunta que guió cada decisión desde el inicio: ¿cómo lograr que cada proyecto sea genuinamente único?",
  historia_parrafo2:
    "Esa búsqueda nos llevó a desarrollar una metodología propia que combina rigor técnico, criterio estético y gestión eficiente. El resultado: más de 20 proyectos realizados, +50.000 m2 construidos y más de 500 unidades funcionales entregadas en toda Argentina.",
  mision_titulo: "Transformamos terrenos en proyectos inmobiliarios rentables y funcionales.",
  mision_texto:
    "Gestionamos el ciclo completo de cada emprendimiento, desde la viabilidad técnica, legal y financiera hasta la escrituración. Administramos cada etapa del desarrollo de forma eficiente, junto a cada profesional interviniente.",
  valores: [
    { titulo: "Atención al detalle.", texto: "Cuidamos cada terminación priorizando la estética y los materiales de calidad." },
    { titulo: "Gestión integral.", texto: "Participamos en cada etapa del proyecto para garantizar coherencia y eficiencia." },
    { titulo: "Compromiso post-entrega.", texto: "Nuestro vínculo con el cliente no termina cuando se firma la escritura." },
    { titulo: "Trayectoria comprobada.", texto: "Más de dos décadas de proyectos en Argentina respaldan cada nuevo emprendimiento." },
  ],
};

export const DEFAULT_SERVICIOS: ServiciosContent = {
  hero_titulo: "Más de 20 años construyendo proyectos únicos",
  hero_subtitulo: "SAR Inversiones & Desarrollos | Desarrolladora inmobiliaria en Argentina",
  management_titulo: "Management de Real Estate",
  management_texto:
    "Gestionamos desarrollos inmobiliarios pensados para renta, inversiones de alto potencial y consumidores finales, integrando ejecución, administración y posicionamiento del producto. Nuestro equipo acompaña cada proyecto desde el análisis de factibilidad hasta la entrega de llaves, asegurando resultados consistentes y predecibles.",
  management_lista: [
    "Análisis de viabilidad técnica, legal y financiera",
    "Adquisición y negociación del terreno",
    "Contratación y coordinación de profesionales",
    "Gestión de obra y calidad constructiva",
    "Estrategia comercial y marketing del proyecto",
    "Estructuración jurídica y seguimiento contable",
    "Escrituración y postventa",
  ],
  tipos: [
    { titulo: "Para inversores.", texto: "Proyectos de alta rentabilidad con potencial de valorización en zonas estratégicas de Buenos Aires y Argentina." },
    { titulo: "Para renta.", texto: "Emprendimientos diseñados con unidades optimizadas para el mercado de alquiler temporario y permanente." },
    { titulo: "Para consumidor final.", texto: "Viviendas de arquitectura moderna con materiales de calidad y terminaciones premium." },
  ],
  postventa_titulo: "La entrega no marca el fin del compromiso.",
  postventa_texto:
    "En la etapa de postventa acompañamos a nuestros clientes ante cualquier inconveniente que pueda surgir, garantizando que cada unidad funcione exactamente en las condiciones en que fue pactada.",
};

export const DEFAULT_CONTACTO: ContactoContent = {
  hero_titulo: "Contactanos",
  hero_subtitulo: "Para conocer nuestros proyectos en curso o explorar oportunidades de inversion.",
};

export const DEFAULT_PROYECTOS: ProyectosContent = {
  hero_titulo: "Nuestros Proyectos",
  hero_subtitulo:
    "Más de 20 emprendimientos desarrollados en Argentina desde 2004.",
};

export const DEFAULT_GLOBAL: GlobalContent = {
  footer_descripcion: "Desarrollamos proyectos inmobiliarios con visión estratégica y valor sostenido.",
  contacto_email: "recepcion@sardesarrollos.com.ar",
  contacto_telefono: "11 4331-5829",
  contacto_web: "www.sardesarrollos.com.ar",
  redes_linkedin_url: "https://www.linkedin.com/company/sar-inversiones-desarrollos/",
  redes_instagram_url: "https://www.instagram.com/sardesarrollos/",
  redes_linkedin_label: "Sar Inversiones & Desarrollos",
  redes_instagram_label: "@Sardesarrollos",
};

// ─── Content registry ─────────────────────────────────────────────────────

type ContentTypeMap = {
  home: HomeContent;
  quienes_somos: QuienesSomosContent;
  servicios: ServiciosContent;
  contacto: ContactoContent;
  proyectos: ProyectosContent;
  global: GlobalContent;
};

const DEFAULTS: ContentTypeMap = {
  home: DEFAULT_HOME,
  quienes_somos: DEFAULT_QUIENES_SOMOS,
  servicios: DEFAULT_SERVICIOS,
  contacto: DEFAULT_CONTACTO,
  proyectos: DEFAULT_PROYECTOS,
  global: DEFAULT_GLOBAL,
};

export async function getPageContent<K extends keyof ContentTypeMap>(
  key: K,
): Promise<ContentTypeMap[K]> {
  const supabase = getClient();
  if (!supabase) return DEFAULTS[key];

  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("valor")
      .eq("clave", key)
      .maybeSingle();

    if (error || !data?.valor) return DEFAULTS[key];

    const parsed = JSON.parse(data.valor) as Partial<ContentTypeMap[K]>;
    return { ...DEFAULTS[key], ...parsed } as ContentTypeMap[K];
  } catch {
    return DEFAULTS[key];
  }
}
