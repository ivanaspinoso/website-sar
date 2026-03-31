"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SUPABASE_ENV_ERROR, supabase } from "@/lib/supabase";
import { buildProjectSlug, parseProjectContent } from "@/lib/proyectos";

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

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Proyecto[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");

  async function loadProjects() {
    if (!supabase) {
      setErrorMsg(SUPABASE_ENV_ERROR);
      return;
    }

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

      await loadProjects();
      setLoading(false);
    }

    void init();
  }, [router]);

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm("Seguro que queres eliminar este proyecto?");
    if (!confirmDelete) return;

    if (!supabase) {
      setErrorMsg(SUPABASE_ENV_ERROR);
      return;
    }

    const { error } = await supabase.from("proyectos").delete().eq("id", id);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    await loadProjects();
  }

  async function handleLogout() {
    if (!supabase) {
      setErrorMsg(SUPABASE_ENV_ERROR);
      return;
    }

    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) =>
      [item.titulo, item.direccion, item.categoria, item.anio]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [items, search]);

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
            <p className="mt-2 text-sm text-muted">
              Crea, edita y publica el contenido completo de cada proyecto desde un solo lugar.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/proyectos/nuevo" className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-white">
              Crear proyecto
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-md border border-brand/20 px-4 py-2 text-sm font-medium"
            >
              Cerrar sesion
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-brand/15 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-muted">Total proyectos</p>
            <p className="mt-2 text-2xl font-semibold">{items.length}</p>
          </article>
          <article className="rounded-xl border border-brand/15 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-muted">Destacados</p>
            <p className="mt-2 text-2xl font-semibold">{items.filter((item) => item.destacado).length}</p>
          </article>
          <article className="rounded-xl border border-brand/15 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-muted">Mostrando</p>
            <p className="mt-2 text-2xl font-semibold">{filteredItems.length}</p>
          </article>
        </div>

        {errorMsg ? <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorMsg}</p> : null}

        <aside className="space-y-4 rounded-2xl border border-brand/15 bg-white p-5">
            <div>
              <h2 className="text-xl font-semibold">Todos los proyectos</h2>
              <p className="mt-1 text-sm text-muted">Buscalos por nombre, anio, categoria o direccion.</p>
            </div>
            <input
              className="w-full rounded-md border border-brand/20 px-3 py-2"
              placeholder="Buscar proyecto..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <div className="max-h-[860px] space-y-3 overflow-auto pr-1">
              {filteredItems.map((item) => (
                <article key={item.id} className="rounded-xl border border-brand/15 bg-surface p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {item.anio || "-"} {item.categoria ? `- ${item.categoria}` : ""}
              </p>
              <h2 className="mt-2 text-xl font-semibold">{item.titulo}</h2>
              <p className="mt-1 text-sm text-muted">{item.direccion || "-"}</p>
              {parseProjectContent(item.descripcion).resumen ? (
                <p className="mt-3 text-sm text-muted">{parseProjectContent(item.descripcion).resumen}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/admin/proyectos/${item.id}`} className="rounded-md border border-brand/20 px-3 py-2 text-sm font-medium">
                  Editar
                </Link>
                <Link
                  href={`/proyectos/${buildProjectSlug(item)}`}
                  className="rounded-md border border-brand/20 px-3 py-2 text-sm font-medium"
                >
                  Abrir en web
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </article>
              ))}
              {filteredItems.length === 0 ? (
                <p className="rounded-xl border border-dashed border-brand/20 p-4 text-sm text-muted">
                  No hay proyectos para el filtro actual.
                </p>
              ) : null}
            </div>
          </aside>
      </div>
    </section>
  );
}
