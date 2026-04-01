import { createClient } from "@supabase/supabase-js";

export type ProyectoPublico = {
  id: string;
  titulo: string;
  direccion: string | null;
  anio: string | null;
  categoria: string | null;
  imagen_url: string | null;
  descripcion: string | null;
  created_at?: string | null;
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

const PROJECT_SELECT = "id,titulo,direccion,anio,categoria,imagen_url,descripcion,created_at";

function normalizeEnv(value: string | undefined) {
  if (!value) return "";
  return value.trim().replace(/^['"]|['"]$/g, "");
}

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

function parseProjectDate(value: string | null | undefined) {
  if (!value) return null;
  const normalized = value.trim();
  if (!normalized) return null;

  // Admite "YYYY", "YYYY-MM" o "YYYY-MM-DD" y lo vuelve comparable.
  const parsed = Date.parse(
    /^\d{4}$/.test(normalized) ? `${normalized}-12-31` : normalized,
  );
  return Number.isNaN(parsed) ? null : parsed;
}

export function sortProjectsNewestFirst<T extends { anio: string | null; created_at?: string | null }>(
  projects: T[],
) {
  return [...projects].sort((a, b) => {
    const aDate = parseProjectDate(a.anio) ?? parseProjectDate(a.created_at);
    const bDate = parseProjectDate(b.anio) ?? parseProjectDate(b.created_at);

    if (aDate === null && bDate === null) return 0;
    if (aDate === null) return 1;
    if (bDate === null) return -1;
    return bDate - aDate;
  });
}

export async function getPublicProjects() {
  const supabaseUrl = normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL);
  const supabaseAnonKey = normalizeEnv(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY,
  );

  const supabase =
    supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

  const { data, error } = supabase
    ? await supabase.from("proyectos").select(PROJECT_SELECT).order("created_at", { ascending: false })
    : { data: [] as ProyectoPublico[] };

  if (error) {
    console.error("Error cargando proyectos publicos desde Supabase:", error.message);
    return [];
  }

  return sortProjectsNewestFirst((data ?? []) as ProyectoPublico[]);
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
