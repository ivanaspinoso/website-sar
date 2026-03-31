"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { SUPABASE_ENV_ERROR, supabase } from "@/lib/supabase";
import { parseProjectContent, type ProyectoDetalleContenido } from "@/lib/proyectos";

type Proyecto = {
  id: string;
  titulo: string;
  direccion: string | null;
  anio: string | null;
  descripcion: string | null;
  categoria: string | null;
  imagen_url: string | null;
  destacado: boolean | null;
};

type ProyectoForm = {
  titulo: string;
  direccion: string;
  anio: string;
  categoria: string;
  imagen_url: string;
  destacado: boolean;
  estado: string;
  resumen: string;
  hero_tag: string;
  intro_titulo: string;
  intro_parrafo_1: string;
  intro_parrafo_2: string;
  arquitectura_titulo: string;
  arquitectura_parrafo_1: string;
  arquitectura_parrafo_2: string;
  vivir_titulo: string;
  unidades: string;
  amenities_text: string;
  galeria_text: string;
  video_url: string;
  mapa_url: string;
  brochure_url: string;
  descripcion_markdown: string;
};

const initialForm: ProyectoForm = {
  titulo: "",
  direccion: "",
  anio: "",
  categoria: "",
  imagen_url: "",
  destacado: false,
  estado: "",
  resumen: "",
  hero_tag: "",
  intro_titulo: "",
  intro_parrafo_1: "",
  intro_parrafo_2: "",
  arquitectura_titulo: "",
  arquitectura_parrafo_1: "",
  arquitectura_parrafo_2: "",
  vivir_titulo: "",
  unidades: "",
  amenities_text: "",
  galeria_text: "",
  video_url: "",
  mapa_url: "",
  brochure_url: "",
  descripcion_markdown: "",
};

export default function AdminProyectoFormPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isCreate = useMemo(() => params.id === "nuevo", [params.id]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProyectoForm>(initialForm);
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingDescriptionImage, setUploadingDescriptionImage] = useState(false);

  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_PROJECTS_BUCKET || "proyectos";

  useEffect(() => {
    async function init() {
      if (!supabase) {
        setErrorMsg(SUPABASE_ENV_ERROR);
        setLoading(false);
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        router.replace("/admin/login");
        return;
      }

      if (!isCreate) {
        const { data, error } = await supabase.from("proyectos").select("*").eq("id", params.id).maybeSingle();
        if (error || !data) {
          setErrorMsg(error?.message || "No se encontro el proyecto.");
          setLoading(false);
          return;
        }

        const item = data as Proyecto;
        const content = parseProjectContent(item.descripcion);
        setForm({
          titulo: item.titulo ?? "",
          direccion: item.direccion ?? "",
          anio: item.anio ?? "",
          categoria: item.categoria ?? "",
          imagen_url: item.imagen_url ?? "",
          destacado: Boolean(item.destacado),
          estado: content.estado ?? "",
          resumen: content.resumen ?? "",
          hero_tag: content.hero_tag ?? "",
          intro_titulo: content.intro_titulo ?? "",
          intro_parrafo_1: content.intro_parrafo_1 ?? "",
          intro_parrafo_2: content.intro_parrafo_2 ?? "",
          arquitectura_titulo: content.arquitectura_titulo ?? "",
          arquitectura_parrafo_1: content.arquitectura_parrafo_1 ?? "",
          arquitectura_parrafo_2: content.arquitectura_parrafo_2 ?? "",
          vivir_titulo: content.vivir_titulo ?? "",
          unidades: content.unidades ?? "",
          amenities_text: (content.amenities ?? []).join("\n"),
          galeria_text: (content.galeria ?? []).join("\n"),
          video_url: content.video_url ?? "",
          mapa_url: content.mapa_url ?? "",
          brochure_url: content.brochure_url ?? "",
          descripcion_markdown: content.descripcion_markdown ?? "",
        });
      }

      setLoading(false);
    }

    void init();
  }, [isCreate, params.id, router]);

  async function uploadImage(file: File) {
    if (!supabase) {
      throw new Error(SUPABASE_ENV_ERROR);
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${crypto.randomUUID()}.${ext}`;
    const filePath = `admin/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    return data.publicUrl;
  }

  async function handleHeroImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingHero(true);
      setErrorMsg("");
      const publicUrl = await uploadImage(file);
      setForm((prev) => ({ ...prev, imagen_url: publicUrl }));
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "No se pudo subir la imagen principal.");
    } finally {
      setUploadingHero(false);
      event.target.value = "";
    }
  }

  async function handleDescriptionImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingDescriptionImage(true);
      setErrorMsg("");
      const publicUrl = await uploadImage(file);
      const markdownImage = `\n![${file.name}](${publicUrl})\n`;
      setForm((prev) => ({ ...prev, descripcion_markdown: `${prev.descripcion_markdown}${markdownImage}` }));
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "No se pudo subir la imagen de descripcion.");
    } finally {
      setUploadingDescriptionImage(false);
      event.target.value = "";
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setErrorMsg("");

    if (!supabase) {
      setErrorMsg(SUPABASE_ENV_ERROR);
      setSaving(false);
      return;
    }

    const detailContent: ProyectoDetalleContenido = {
      estado: form.estado.trim() || undefined,
      resumen: form.resumen.trim() || undefined,
      hero_tag: form.hero_tag.trim() || undefined,
      intro_titulo: form.intro_titulo.trim() || undefined,
      intro_parrafo_1: form.intro_parrafo_1.trim() || undefined,
      intro_parrafo_2: form.intro_parrafo_2.trim() || undefined,
      arquitectura_titulo: form.arquitectura_titulo.trim() || undefined,
      arquitectura_parrafo_1: form.arquitectura_parrafo_1.trim() || undefined,
      arquitectura_parrafo_2: form.arquitectura_parrafo_2.trim() || undefined,
      vivir_titulo: form.vivir_titulo.trim() || undefined,
      unidades: form.unidades.trim() || undefined,
      amenities: form.amenities_text
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      galeria: form.galeria_text
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      video_url: form.video_url.trim() || undefined,
      mapa_url: form.mapa_url.trim() || undefined,
      brochure_url: form.brochure_url.trim() || undefined,
      descripcion_markdown: form.descripcion_markdown.trim() || undefined,
    };

    const payload = {
      titulo: form.titulo.trim(),
      direccion: form.direccion.trim(),
      anio: form.anio.trim(),
      descripcion: JSON.stringify(detailContent),
      categoria: form.categoria.trim(),
      imagen_url: form.imagen_url.trim(),
      destacado: form.destacado,
    };

    if (!payload.titulo) {
      setSaving(false);
      setErrorMsg("El titulo es obligatorio.");
      return;
    }

    const response = isCreate
      ? await supabase.from("proyectos").insert(payload)
      : await supabase.from("proyectos").update(payload).eq("id", params.id);

    setSaving(false);

    if (response.error) {
      setErrorMsg(response.error.message);
      return;
    }

    router.push("/admin");
  }

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-sar">Cargando formulario...</div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-sar space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow">ADMIN</p>
            <h1 className="mt-2 text-3xl font-semibold">{isCreate ? "Crear proyecto" : "Editar proyecto"}</h1>
          </div>
          <Link href="/admin" className="rounded-md border border-brand/20 px-4 py-2 text-sm font-medium">
            Volver al listado
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-brand/15 bg-white p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-md border border-brand/20 px-3 py-2"
              placeholder="Titulo *"
              value={form.titulo}
              onChange={(event) => setForm((prev) => ({ ...prev, titulo: event.target.value }))}
              required
            />
            <input
              className="rounded-md border border-brand/20 px-3 py-2"
              placeholder="Anio"
              value={form.anio}
              onChange={(event) => setForm((prev) => ({ ...prev, anio: event.target.value }))}
            />
            <input
              className="rounded-md border border-brand/20 px-3 py-2 md:col-span-2"
              placeholder="Direccion"
              value={form.direccion}
              onChange={(event) => setForm((prev) => ({ ...prev, direccion: event.target.value }))}
            />
            <input
              className="rounded-md border border-brand/20 px-3 py-2"
              placeholder="Categoria"
              value={form.categoria}
              onChange={(event) => setForm((prev) => ({ ...prev, categoria: event.target.value }))}
            />
            <input
              className="rounded-md border border-brand/20 px-3 py-2"
              placeholder="URL de imagen"
              value={form.imagen_url}
              onChange={(event) => setForm((prev) => ({ ...prev, imagen_url: event.target.value }))}
            />
            <label className="rounded-md border border-brand/20 px-3 py-2 text-sm text-muted">
              Subir imagen principal desde computadora
              <input type="file" accept="image/*" className="mt-2 block w-full" onChange={handleHeroImageUpload} />
              {uploadingHero ? <span className="mt-2 block text-xs">Subiendo...</span> : null}
            </label>
            <input
              className="rounded-md border border-brand/20 px-3 py-2"
              placeholder="Estado (ej: En construccion)"
              value={form.estado}
              onChange={(event) => setForm((prev) => ({ ...prev, estado: event.target.value }))}
            />
            <input
              className="rounded-md border border-brand/20 px-3 py-2"
              placeholder="Hero tag (ej: PROYECTO)"
              value={form.hero_tag}
              onChange={(event) => setForm((prev) => ({ ...prev, hero_tag: event.target.value }))}
            />
            <textarea
              className="min-h-20 rounded-md border border-brand/20 px-3 py-2 md:col-span-2"
              placeholder="Resumen corto (se muestra en card y metadata)"
              value={form.resumen}
              onChange={(event) => setForm((prev) => ({ ...prev, resumen: event.target.value }))}
            />
            <input
              className="rounded-md border border-brand/20 px-3 py-2 md:col-span-2"
              placeholder="Titulo bloque 1 (ej: Caracteristicas del desarrollo)"
              value={form.intro_titulo}
              onChange={(event) => setForm((prev) => ({ ...prev, intro_titulo: event.target.value }))}
            />
            <div className="rounded-md border border-brand/20 p-3 md:col-span-2">
              <p className="text-sm font-semibold">Descripcion enriquecida (Markdown)</p>
              <p className="mt-1 text-xs text-muted">
                Usa # Titulo, ## Subtitulo, **negrita** y ![alt](url-imagen). Tambien podes subir imagenes debajo.
              </p>
              <textarea
                className="mt-3 min-h-40 w-full rounded-md border border-brand/20 px-3 py-2"
                placeholder="Escribi la descripcion en Markdown..."
                value={form.descripcion_markdown}
                onChange={(event) => setForm((prev) => ({ ...prev, descripcion_markdown: event.target.value }))}
              />
              <label className="mt-3 block text-sm text-muted">
                Subir imagen para insertar en descripcion
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 block w-full"
                  onChange={handleDescriptionImageUpload}
                />
              </label>
              {uploadingDescriptionImage ? <p className="mt-2 text-xs">Subiendo imagen para descripcion...</p> : null}
            </div>
            <textarea
              className="min-h-20 rounded-md border border-brand/20 px-3 py-2 md:col-span-2"
              placeholder="Parrafo 1 bloque 1"
              value={form.intro_parrafo_1}
              onChange={(event) => setForm((prev) => ({ ...prev, intro_parrafo_1: event.target.value }))}
            />
            <textarea
              className="min-h-20 rounded-md border border-brand/20 px-3 py-2 md:col-span-2"
              placeholder="Parrafo 2 bloque 1"
              value={form.intro_parrafo_2}
              onChange={(event) => setForm((prev) => ({ ...prev, intro_parrafo_2: event.target.value }))}
            />
            <input
              className="rounded-md border border-brand/20 px-3 py-2 md:col-span-2"
              placeholder="Titulo bloque 2 (ej: Arquitectura en movimiento)"
              value={form.arquitectura_titulo}
              onChange={(event) => setForm((prev) => ({ ...prev, arquitectura_titulo: event.target.value }))}
            />
            <textarea
              className="min-h-20 rounded-md border border-brand/20 px-3 py-2 md:col-span-2"
              placeholder="Parrafo 1 bloque 2"
              value={form.arquitectura_parrafo_1}
              onChange={(event) => setForm((prev) => ({ ...prev, arquitectura_parrafo_1: event.target.value }))}
            />
            <textarea
              className="min-h-20 rounded-md border border-brand/20 px-3 py-2 md:col-span-2"
              placeholder="Parrafo 2 bloque 2"
              value={form.arquitectura_parrafo_2}
              onChange={(event) => setForm((prev) => ({ ...prev, arquitectura_parrafo_2: event.target.value }))}
            />
            <input
              className="rounded-md border border-brand/20 px-3 py-2"
              placeholder="Titulo bloque 3 (ej: Vivi en ...)"
              value={form.vivir_titulo}
              onChange={(event) => setForm((prev) => ({ ...prev, vivir_titulo: event.target.value }))}
            />
            <input
              className="rounded-md border border-brand/20 px-3 py-2"
              placeholder="Unidades (ej: 3 a 5 ambientes)"
              value={form.unidades}
              onChange={(event) => setForm((prev) => ({ ...prev, unidades: event.target.value }))}
            />
            <textarea
              className="min-h-24 rounded-md border border-brand/20 px-3 py-2"
              placeholder="Amenities (una por linea)"
              value={form.amenities_text}
              onChange={(event) => setForm((prev) => ({ ...prev, amenities_text: event.target.value }))}
            />
            <textarea
              className="min-h-24 rounded-md border border-brand/20 px-3 py-2"
              placeholder="Galeria de imagenes (una URL por linea)"
              value={form.galeria_text}
              onChange={(event) => setForm((prev) => ({ ...prev, galeria_text: event.target.value }))}
            />
            <input
              className="rounded-md border border-brand/20 px-3 py-2"
              placeholder="URL video"
              value={form.video_url}
              onChange={(event) => setForm((prev) => ({ ...prev, video_url: event.target.value }))}
            />
            <input
              className="rounded-md border border-brand/20 px-3 py-2"
              placeholder="URL mapa"
              value={form.mapa_url}
              onChange={(event) => setForm((prev) => ({ ...prev, mapa_url: event.target.value }))}
            />
            <input
              className="rounded-md border border-brand/20 px-3 py-2 md:col-span-2"
              placeholder="URL brochure/comercial"
              value={form.brochure_url}
              onChange={(event) => setForm((prev) => ({ ...prev, brochure_url: event.target.value }))}
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.destacado}
              onChange={(event) => setForm((prev) => ({ ...prev, destacado: event.target.checked }))}
            />
            Destacado
          </label>

          {errorMsg ? <p className="text-sm text-red-600">{errorMsg}</p> : null}

          <div className="flex flex-wrap gap-2 border-t border-brand/10 pt-2">
            <button
              type="submit"
              className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
              disabled={saving}
            >
              {saving ? "Guardando..." : isCreate ? "Crear proyecto" : "Actualizar proyecto"}
            </button>
            <Link href="/admin" className="rounded-md border border-brand/20 px-4 py-2 text-sm font-medium">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
