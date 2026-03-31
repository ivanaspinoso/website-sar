"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
  descripcion: string;
  categoria: string;
  imagen_url: string;
  destacado: boolean;
};

const initialForm: ProyectoForm = {
  titulo: "",
  direccion: "",
  anio: "",
  descripcion: "",
  categoria: "",
  imagen_url: "",
  destacado: false,
};

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<Proyecto[]>([]);
  const [form, setForm] = useState<ProyectoForm>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function loadProjects() {
    const { data, error } = await supabase
      .from("proyectos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setItems((data as Proyecto[]) ?? []);
  }

  useEffect(() => {
    async function init() {
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

      await loadProjects();
      setLoading(false);
    }

    void init();
  }, [router]);

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function startEdit(item: Proyecto) {
    setEditingId(item.id);
    setForm({
      titulo: item.titulo ?? "",
      direccion: item.direccion ?? "",
      anio: item.anio ?? "",
      descripcion: item.descripcion ?? "",
      categoria: item.categoria ?? "",
      imagen_url: item.imagen_url ?? "",
      destacado: Boolean(item.destacado),
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setErrorMsg("");

    const payload = {
      titulo: form.titulo.trim(),
      direccion: form.direccion.trim(),
      anio: form.anio.trim(),
      descripcion: form.descripcion.trim(),
      categoria: form.categoria.trim(),
      imagen_url: form.imagen_url.trim(),
      destacado: form.destacado,
    };

    if (!payload.titulo) {
      setSaving(false);
      setErrorMsg("El titulo es obligatorio.");
      return;
    }

    let error: Error | null = null;

    if (editingId) {
      const response = await supabase.from("proyectos").update(payload).eq("id", editingId);
      error = response.error;
    } else {
      const response = await supabase.from("proyectos").insert(payload);
      error = response.error;
    }

    setSaving(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    resetForm();
    await loadProjects();
  }

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm("Seguro que queres eliminar este proyecto?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("proyectos").delete().eq("id", id);
    if (error) {
      setErrorMsg(error.message);
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    await loadProjects();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-sar">Cargando panel...</div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-sar space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">ADMIN</p>
            <h1 className="mt-2 text-3xl font-semibold">Gestion de proyectos</h1>
          </div>
          <button onClick={handleLogout} className="rounded-md border border-brand/20 px-4 py-2 text-sm font-medium">
            Cerrar sesion
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3 rounded-2xl border border-brand/15 bg-white p-5 md:grid-cols-2">
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
          <textarea
            className="min-h-28 rounded-md border border-brand/20 px-3 py-2 md:col-span-2"
            placeholder="Descripcion"
            value={form.descripcion}
            onChange={(event) => setForm((prev) => ({ ...prev, descripcion: event.target.value }))}
          />
          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input
              type="checkbox"
              checked={form.destacado}
              onChange={(event) => setForm((prev) => ({ ...prev, destacado: event.target.checked }))}
            />
            Destacado
          </label>

          {errorMsg ? <p className="text-sm text-red-600 md:col-span-2">{errorMsg}</p> : null}

          <div className="flex gap-2 md:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
              disabled={saving}
            >
              {saving ? "Guardando..." : editingId ? "Actualizar proyecto" : "Crear proyecto"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-brand/20 px-4 py-2 text-sm font-medium"
              >
                Cancelar edicion
              </button>
            ) : null}
          </div>
        </form>

        <div className="grid gap-4">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-brand/15 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {item.anio || "-"} {item.categoria ? `- ${item.categoria}` : ""}
              </p>
              <h2 className="mt-2 text-xl font-semibold">{item.titulo}</h2>
              <p className="mt-1 text-sm text-muted">{item.direccion || "-"}</p>
              {item.descripcion ? <p className="mt-3 text-sm text-muted">{item.descripcion}</p> : null}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => startEdit(item)}
                  className="rounded-md border border-brand/20 px-3 py-2 text-sm font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
          {items.length === 0 ? (
            <p className="rounded-xl border border-dashed border-brand/20 p-4 text-sm text-muted">
              Todavia no hay proyectos cargados.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
