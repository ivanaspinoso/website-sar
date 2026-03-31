import { createClient } from "@supabase/supabase-js";

export type ProyectoPublico = {
  id: string;
  titulo: string;
  direccion: string | null;
  anio: string | null;
  categoria: string | null;
  imagen_url: string | null;
  descripcion: string | null;
};

export type ProyectoDetalleContenido = {
  estado?: string;
  resumen?: string;
  hero_tag?: string;
  intro_titulo?: string;
  intro_parrafo_1?: string;
  intro_parrafo_2?: string;
  arquitectura_titulo?: string;
  arquitectura_parrafo_1?: string;
  arquitectura_parrafo_2?: string;
  vivir_titulo?: string;
  unidades?: string;
  amenities?: string[];
  galeria?: string[];
  video_url?: string;
  mapa_url?: string;
  brochure_url?: string;
  descripcion_markdown?: string;
};

const PROJECT_SELECT = "id,titulo,direccion,anio,categoria,imagen_url,descripcion";

export function slugifyProjectTitle(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildProjectSlug(project: ProyectoPublico) {
  const safeTitle = slugifyProjectTitle(project.titulo || "proyecto");
  return `${safeTitle}-${project.id.slice(0, 8)}`;
}

export async function getPublicProjects() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase =
    supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

  const { data } = supabase
    ? await supabase.from("proyectos").select(PROJECT_SELECT).order("created_at", { ascending: false })
    : { data: [] as ProyectoPublico[] };

  return (data ?? []) as ProyectoPublico[];
}

export function parseProjectContent(value: string | null): ProyectoDetalleContenido {
  if (!value) return {};

  try {
    const parsed = JSON.parse(value) as ProyectoDetalleContenido;
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return { resumen: value };
  }
}
