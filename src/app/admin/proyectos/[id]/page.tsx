"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { SUPABASE_ENV_ERROR, supabase } from "@/lib/supabase";

type Proyecto = {
  id: string;
  titulo: string;
  anio: string | null;
  imagen_url: string | null;
};

type ProyectoForm = {
  titulo: string;
  anio: string;
  imagen_url: string;
};

const initialForm: ProyectoForm = {
  titulo: "",
  anio: "",
  imagen_url: "",
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
        setForm({
          titulo: item.titulo ?? "",
          anio: item.anio ?? "",
          imagen_url: item.imagen_url ?? "",
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setErrorMsg("");

    if (!supabase) {
      setErrorMsg(SUPABASE_ENV_ERROR);
      setSaving(false);
      return;
    }

    const payload = {
      titulo: form.titulo.trim(),
      anio: form.anio.trim(),
      imagen_url: form.imagen_url.trim(),
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
          <div className="grid gap-3">
            <input
              className="rounded-md border border-brand/20 px-3 py-2"
              placeholder="Titulo *"
              value={form.titulo}
              onChange={(event) => setForm((prev) => ({ ...prev, titulo: event.target.value }))}
              required
            />
            <input
              className="rounded-md border border-brand/20 px-3 py-2"
              placeholder="Fecha (YYYY-MM-DD) o anio"
              value={form.anio}
              onChange={(event) => setForm((prev) => ({ ...prev, anio: event.target.value }))}
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
          </div>

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
