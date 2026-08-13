"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, SUPABASE_ENV_ERROR } from "@/lib/supabase";
import {
  DEFAULT_HOME, DEFAULT_QUIENES_SOMOS, DEFAULT_SERVICIOS,
  DEFAULT_METODOLOGIA, DEFAULT_CONTACTO, DEFAULT_PROYECTOS, DEFAULT_GLOBAL,
  type HomeContent, type QuienesSomosContent, type ServiciosContent,
  type MetodologiaContent, type ContactoContent, type ProyectosContent,
  type GlobalContent, type MetricaItem, type TextItem, type PasoItem,
} from "@/lib/site-content";

// ─── Types ────────────────────────────────────────────────────────────────

type Tab = "inicio" | "quienes_somos" | "servicios" | "metodologia" | "contacto" | "proyectos" | "global";

const TABS: { key: Tab; label: string; href: string; dbKey: string }[] = [
  { key: "inicio",        label: "Inicio",          href: "/",               dbKey: "home" },
  { key: "quienes_somos", label: "Quiénes Somos",   href: "/quienes-somos",  dbKey: "quienes_somos" },
  { key: "servicios",     label: "Servicios",        href: "/servicios",      dbKey: "servicios" },
  { key: "metodologia",   label: "Metodología",      href: "/metodologia",    dbKey: "metodologia" },
  { key: "contacto",      label: "Contacto",         href: "/contacto",       dbKey: "contacto" },
  { key: "proyectos",     label: "Proyectos",        href: "/proyectos",      dbKey: "proyectos" },
  { key: "global",        label: "Global / Footer",  href: "/",               dbKey: "global" },
];

// ─── Helper UI components ──────────────────────────────────────────────────

function Field({
  label, hint, value, onChange, multiline = false, rows = 3,
}: {
  label: string; hint?: string; value: string;
  onChange: (v: string) => void; multiline?: boolean; rows?: number;
}) {
  const cls =
    "w-full rounded-lg border border-brand/25 bg-white px-3 py-2 text-sm focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/15";
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wide text-muted">{label}</label>
      {hint ? <p className="text-xs text-muted/70">{hint}</p> : null}
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={cls + " resize-y"} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}

function SaveBtn({
  id, saving, saved, onSave,
}: { id: string; saving: string | null; saved: string | null; onSave: () => void }) {
  const isSaving = saving === id;
  const isSaved  = saved  === id;
  return (
    <div className="flex items-center gap-3 border-t border-brand/10 pt-4">
      <button
        onClick={onSave}
        disabled={isSaving}
        className="rounded-lg bg-foreground px-5 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
      >
        {isSaving ? "Guardando..." : "Guardar sección"}
      </button>
      {isSaved ? (
        <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="m5 12 4 4 10-10" />
          </svg>
          Guardado
        </span>
      ) : null}
    </div>
  );
}

function SectionCard({ title, id, saving, saved, onSave, children }: {
  title: string; id: string; saving: string | null; saved: string | null;
  onSave: () => void; children: React.ReactNode;
}) {
  return (
    <div className="space-y-5 rounded-2xl border border-brand/15 bg-[#eef2ff] p-5 shadow-sm">
      <h3 className="border-b border-brand/10 pb-3 text-base font-semibold text-foreground">{title}</h3>
      {children}
      <SaveBtn id={id} saving={saving} saved={saved} onSave={onSave} />
    </div>
  );
}

function StringListEditor({ label, hint, items, onChange }: {
  label: string; hint?: string; items: string[]; onChange: (v: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wide text-muted">{label}</label>
      {hint ? <p className="text-xs text-muted/70">{hint}</p> : null}
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => { const n = [...items]; n[idx] = e.target.value; onChange(n); }}
              className="flex-1 rounded-lg border border-brand/25 px-3 py-2 text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== idx))}
              className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
              title="Eliminar"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="text-sm font-medium text-brand/70 hover:text-brand"
        >
          + Agregar ítem
        </button>
      </div>
    </div>
  );
}

function TextItemListEditor({ label, hint, items, onChange }: {
  label: string; hint?: string; items: TextItem[]; onChange: (v: TextItem[]) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wide text-muted">{label}</label>
      {hint ? <p className="text-xs text-muted/70">{hint}</p> : null}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="rounded-xl border border-brand/15 bg-surface p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand/50 uppercase tracking-wide">Ítem {idx + 1}</span>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== idx))}
                className="text-xs text-red-500 hover:text-red-700 font-medium"
              >
                Eliminar
              </button>
            </div>
            <input
              value={item.titulo}
              onChange={(e) => { const n = [...items]; n[idx] = { ...n[idx], titulo: e.target.value }; onChange(n); }}
              placeholder="Título"
              className="w-full rounded-lg border border-brand/25 px-3 py-2 text-sm focus:outline-none"
            />
            <textarea
              value={item.texto}
              onChange={(e) => { const n = [...items]; n[idx] = { ...n[idx], texto: e.target.value }; onChange(n); }}
              placeholder="Descripción"
              rows={2}
              className="w-full resize-y rounded-lg border border-brand/25 px-3 py-2 text-sm focus:outline-none"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, { titulo: "", texto: "" }])}
          className="text-sm font-medium text-brand/70 hover:text-brand"
        >
          + Agregar ítem
        </button>
      </div>
    </div>
  );
}

function PasoListEditor({ items, onChange }: { items: PasoItem[]; onChange: (v: PasoItem[]) => void }) {
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="rounded-xl border border-brand/15 bg-surface p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-brand/40">{String(idx + 1).padStart(2, "0")}</span>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== idx))}
              className="text-xs font-medium text-red-500 hover:text-red-700"
            >
              Eliminar
            </button>
          </div>
          <input
            value={item.titulo}
            onChange={(e) => { const n = [...items]; n[idx] = { ...n[idx], titulo: e.target.value }; onChange(n); }}
            placeholder="Título del paso"
            className="w-full rounded-lg border border-brand/25 px-3 py-2 text-sm focus:outline-none"
          />
          <textarea
            value={item.texto}
            onChange={(e) => { const n = [...items]; n[idx] = { ...n[idx], texto: e.target.value }; onChange(n); }}
            placeholder="Descripción del paso"
            rows={2}
            className="w-full resize-y rounded-lg border border-brand/25 px-3 py-2 text-sm focus:outline-none"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([...items, { numero: String(items.length + 1).padStart(2, "0"), titulo: "", texto: "" }])
        }
        className="text-sm font-medium text-brand/70 hover:text-brand"
      >
        + Agregar paso
      </button>
    </div>
  );
}

function MetricaListEditor({ items, onChange }: { items: MetricaItem[]; onChange: (v: MetricaItem[]) => void }) {
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="rounded-xl border border-brand/15 bg-surface p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted">Métrica {idx + 1}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="space-y-1">
              <label className="text-xs text-muted">Valor numérico</label>
              <input
                type="number"
                value={item.value}
                onChange={(e) => { const n = [...items]; n[idx] = { ...n[idx], value: Number(e.target.value) }; onChange(n); }}
                className="w-full rounded-lg border border-brand/25 px-2 py-1.5 text-sm focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted">Prefijo (ej: +)</label>
              <input
                value={item.prefix ?? ""}
                onChange={(e) => { const n = [...items]; n[idx] = { ...n[idx], prefix: e.target.value || undefined }; onChange(n); }}
                placeholder="+"
                className="w-full rounded-lg border border-brand/25 px-2 py-1.5 text-sm focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted">Sufijo (ej: m2)</label>
              <input
                value={item.suffix ?? ""}
                onChange={(e) => { const n = [...items]; n[idx] = { ...n[idx], suffix: e.target.value || undefined }; onChange(n); }}
                placeholder=" m2"
                className="w-full rounded-lg border border-brand/25 px-2 py-1.5 text-sm focus:outline-none"
              />
            </div>
            <div className="space-y-1 sm:col-span-1 col-span-2">
              <label className="text-xs text-muted">Descripción</label>
              <input
                value={item.label}
                onChange={(e) => { const n = [...items]; n[idx] = { ...n[idx], label: e.target.value }; onChange(n); }}
                placeholder="de obra construida"
                className="w-full rounded-lg border border-brand/25 px-2 py-1.5 text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export default function AdminContenidoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("inicio");

  // Content state for each page
  const [home,         setHome]         = useState<HomeContent>(DEFAULT_HOME);
  const [quienesSomos, setQuienesSomos] = useState<QuienesSomosContent>(DEFAULT_QUIENES_SOMOS);
  const [servicios,    setServicios]    = useState<ServiciosContent>(DEFAULT_SERVICIOS);
  const [metodologia,  setMetodologia]  = useState<MetodologiaContent>(DEFAULT_METODOLOGIA);
  const [contacto,     setContacto]     = useState<ContactoContent>(DEFAULT_CONTACTO);
  const [proyectos,    setProyectos]    = useState<ProyectosContent>(DEFAULT_PROYECTOS);
  const [global,       setGlobal]       = useState<GlobalContent>(DEFAULT_GLOBAL);

  // Save feedback
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKey,  setSavedKey]  = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Auth check + load content
  useEffect(() => {
    async function init() {
      if (!supabase) { setErrorMsg(SUPABASE_ENV_ERROR); setLoading(false); return; }

      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      if (!user) { router.replace("/admin/login"); return; }

      const { data: adminData } = await supabase
        .from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
      if (!adminData) { await supabase.auth.signOut(); router.replace("/admin/login"); return; }

      // Load all content
      const { data: rows } = await supabase.from("site_content").select("clave,valor");
      if (rows) {
        for (const row of rows) {
          try {
            const parsed = JSON.parse(row.valor ?? "{}");
            if (row.clave === "home")          setHome(v => ({ ...v, ...parsed }));
            if (row.clave === "quienes_somos") setQuienesSomos(v => ({ ...v, ...parsed }));
            if (row.clave === "servicios")     setServicios(v => ({ ...v, ...parsed }));
            if (row.clave === "metodologia")   setMetodologia(v => ({ ...v, ...parsed }));
            if (row.clave === "contacto")      setContacto(v => ({ ...v, ...parsed }));
            if (row.clave === "proyectos")     setProyectos(v => ({ ...v, ...parsed }));
            if (row.clave === "global")        setGlobal(v => ({ ...v, ...parsed }));
          } catch { /* ignore parse errors */ }
        }
      }

      setLoading(false);
    }
    void init();
  }, [router]);

  // Generic save
  const save = useCallback(async (sectionId: string, dbKey: string, content: object) => {
    if (!supabase) return;
    setSavingKey(sectionId);
    setSavedKey(null);
    setSaveError(null);
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert({ clave: dbKey, valor: JSON.stringify(content), updated_at: new Date().toISOString() });
      if (error) throw error;
      setSavingKey(null);
      setSavedKey(sectionId);
      setTimeout(() => setSavedKey((k) => (k === sectionId ? null : k)), 2500);
    } catch (err) {
      setSavingKey(null);
      setSaveError(err instanceof Error ? err.message : "Error al guardar");
      setTimeout(() => setSaveError(null), 4000);
    }
  }, []);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-sar">Cargando editor de contenido...</div>
      </section>
    );
  }

  const activeTab_ = TABS.find((t) => t.key === activeTab)!;

  return (
    <section className="section-padding">
      <div className="container-sar space-y-6">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="eyebrow">ADMIN</p>
            <h1 className="mt-2 text-3xl font-semibold">Contenido del sitio</h1>
            <p className="mt-1 text-sm text-muted">Editá los textos y secciones de cada página.</p>
          </div>
          <Link href="/admin" className="rounded-lg border border-brand/20 px-4 py-2 text-sm font-medium">
            ← Volver al panel
          </Link>
        </div>

        {errorMsg ? (
          <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorMsg}</p>
        ) : null}
        {saveError ? (
          <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">Error: {saveError}</p>
        ) : null}

        {/* Tab bar */}
        <div className="flex overflow-x-auto gap-1 rounded-xl border border-brand/15 bg-surface p-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={[
                "flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "bg-foreground text-white shadow"
                  : "text-muted hover:bg-[#eef2ff] hover:text-foreground",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active tab indicator */}
        <div className="flex items-center justify-between rounded-xl border border-brand/10 bg-[#eef2ff] px-4 py-3">
          <p className="text-sm font-medium text-foreground">
            Editando: <span className="text-brand">{activeTab_.label}</span>
          </p>
          <a
            href={activeTab_.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-brand/20 px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground"
          >
            Ver página
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6m0 0v6m0-6-9 9" />
            </svg>
          </a>
        </div>

        {/* ── INICIO ──────────────────────────────────────── */}
        {activeTab === "inicio" && (
          <div className="space-y-5">

            <SectionCard title="Hero — sección principal" id="inicio-hero" saving={savingKey} saved={savedKey}
              onSave={() => save("inicio-hero", "home", home)}>
              <p className="text-xs text-muted/70 rounded-lg bg-surface px-3 py-2">
                Es el texto grande que se ve al entrar al sitio, sobre la imagen de fondo.
              </p>
              <Field label="Título principal" value={home.hero_titulo} onChange={(v) => setHome((s) => ({ ...s, hero_titulo: v }))} multiline rows={3} />
              <Field label="Subtítulo" value={home.hero_subtitulo} onChange={(v) => setHome((s) => ({ ...s, hero_subtitulo: v }))} />
            </SectionCard>

            <SectionCard title="Métricas — números destacados" id="inicio-metricas" saving={savingKey} saved={savedKey}
              onSave={() => save("inicio-metricas", "home", home)}>
              <p className="text-xs text-muted/70 rounded-lg bg-surface px-3 py-2">
                Los 4 números grandes (ej: 50.000 m², +500 unidades). El valor numérico se anima al hacer scroll.
              </p>
              <MetricaListEditor items={home.metricas} onChange={(v) => setHome((s) => ({ ...s, metricas: v }))} />
            </SectionCard>

            <SectionCard title="Sección Compañía" id="inicio-compannia" saving={savingKey} saved={savedKey}
              onSave={() => save("inicio-compannia", "home", home)}>
              <p className="text-xs text-muted/70 rounded-lg bg-surface px-3 py-2">
                Bloque con la imagen de edificio y el texto descriptivo de SAR.
              </p>
              <Field label="Título" value={home.compannia_titulo} onChange={(v) => setHome((s) => ({ ...s, compannia_titulo: v }))} />
              <Field label="Descripción" value={home.compannia_texto} onChange={(v) => setHome((s) => ({ ...s, compannia_texto: v }))} multiline rows={4} />
            </SectionCard>

            <SectionCard title="Sección Servicios" id="inicio-servicios" saving={savingKey} saved={savedKey}
              onSave={() => save("inicio-servicios", "home", home)}>
              <Field label="Título de la sección" value={home.servicios_titulo} onChange={(v) => setHome((s) => ({ ...s, servicios_titulo: v }))} />
              <div className="grid gap-4 md:grid-cols-2 pt-2">
                <div className="space-y-3 rounded-xl border border-brand/15 bg-surface p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">Tarjeta 1</p>
                  <Field label="Título" value={home.servicios_card1_titulo} onChange={(v) => setHome((s) => ({ ...s, servicios_card1_titulo: v }))} />
                  <Field label="Texto" value={home.servicios_card1_texto} onChange={(v) => setHome((s) => ({ ...s, servicios_card1_texto: v }))} multiline rows={3} />
                </div>
                <div className="space-y-3 rounded-xl border border-brand/15 bg-surface p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">Tarjeta 2</p>
                  <Field label="Título" value={home.servicios_card2_titulo} onChange={(v) => setHome((s) => ({ ...s, servicios_card2_titulo: v }))} />
                  <Field label="Texto" value={home.servicios_card2_texto} onChange={(v) => setHome((s) => ({ ...s, servicios_card2_texto: v }))} multiline rows={3} />
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Sección Portfolio / Trayectoria" id="inicio-portfolio" saving={savingKey} saved={savedKey}
              onSave={() => save("inicio-portfolio", "home", home)}>
              <Field label="Título" value={home.portfolio_titulo} onChange={(v) => setHome((s) => ({ ...s, portfolio_titulo: v }))} />
              <Field label="Descripción" value={home.portfolio_texto} onChange={(v) => setHome((s) => ({ ...s, portfolio_texto: v }))} multiline />
            </SectionCard>

            <SectionCard title="CTA — Sección de contacto final" id="inicio-cta" saving={savingKey} saved={savedKey}
              onSave={() => save("inicio-cta", "home", home)}>
              <p className="text-xs text-muted/70 rounded-lg bg-surface px-3 py-2">
                El bloque azul al final de la home con el botón de contacto.
              </p>
              <Field label="Título" value={home.contacto_cta_titulo} onChange={(v) => setHome((s) => ({ ...s, contacto_cta_titulo: v }))} />
              <Field label="Descripción" value={home.contacto_cta_texto} onChange={(v) => setHome((s) => ({ ...s, contacto_cta_texto: v }))} multiline />
            </SectionCard>

          </div>
        )}

        {/* ── QUIÉNES SOMOS ────────────────────────────────── */}
        {activeTab === "quienes_somos" && (
          <div className="space-y-5">

            <SectionCard title="Hero — encabezado de página" id="qs-hero" saving={savingKey} saved={savedKey}
              onSave={() => save("qs-hero", "quienes_somos", quienesSomos)}>
              <Field label="Título principal" value={quienesSomos.hero_titulo} onChange={(v) => setQuienesSomos((s) => ({ ...s, hero_titulo: v }))} multiline rows={2} />
              <Field label="Subtítulo" value={quienesSomos.hero_subtitulo} onChange={(v) => setQuienesSomos((s) => ({ ...s, hero_subtitulo: v }))} />
            </SectionCard>

            <SectionCard title="Nuestra Historia" id="qs-historia" saving={savingKey} saved={savedKey}
              onSave={() => save("qs-historia", "quienes_somos", quienesSomos)}>
              <Field label="Título de la sección" value={quienesSomos.historia_titulo} onChange={(v) => setQuienesSomos((s) => ({ ...s, historia_titulo: v }))} />
              <Field label="Párrafo 1" value={quienesSomos.historia_parrafo1} onChange={(v) => setQuienesSomos((s) => ({ ...s, historia_parrafo1: v }))} multiline rows={4} />
              <Field label="Párrafo 2" value={quienesSomos.historia_parrafo2} onChange={(v) => setQuienesSomos((s) => ({ ...s, historia_parrafo2: v }))} multiline rows={4} />
            </SectionCard>

            <SectionCard title="Nuestra Misión" id="qs-mision" saving={savingKey} saved={savedKey}
              onSave={() => save("qs-mision", "quienes_somos", quienesSomos)}>
              <Field label="Título" value={quienesSomos.mision_titulo} onChange={(v) => setQuienesSomos((s) => ({ ...s, mision_titulo: v }))} multiline rows={2} />
              <Field label="Descripción" value={quienesSomos.mision_texto} onChange={(v) => setQuienesSomos((s) => ({ ...s, mision_texto: v }))} multiline rows={4} />
            </SectionCard>

            <SectionCard title="Nuestros Valores" id="qs-valores" saving={savingKey} saved={savedKey}
              onSave={() => save("qs-valores", "quienes_somos", quienesSomos)}>
              <p className="text-xs text-muted/70 rounded-lg bg-surface px-3 py-2">
                Cada ítem se muestra como una tarjeta en la grilla. Podés agregar o quitar valores.
              </p>
              <TextItemListEditor
                label="Valores"
                items={quienesSomos.valores}
                onChange={(v) => setQuienesSomos((s) => ({ ...s, valores: v }))}
              />
            </SectionCard>

          </div>
        )}

        {/* ── SERVICIOS ────────────────────────────────────── */}
        {activeTab === "servicios" && (
          <div className="space-y-5">

            <SectionCard title="Hero — encabezado de página" id="sv-hero" saving={savingKey} saved={savedKey}
              onSave={() => save("sv-hero", "servicios", servicios)}>
              <Field label="Título principal" value={servicios.hero_titulo} onChange={(v) => setServicios((s) => ({ ...s, hero_titulo: v }))} multiline rows={2} />
              <Field label="Subtítulo" value={servicios.hero_subtitulo} onChange={(v) => setServicios((s) => ({ ...s, hero_subtitulo: v }))} />
            </SectionCard>

            <SectionCard title="Management de Real Estate" id="sv-management" saving={savingKey} saved={savedKey}
              onSave={() => save("sv-management", "servicios", servicios)}>
              <Field label="Título" value={servicios.management_titulo} onChange={(v) => setServicios((s) => ({ ...s, management_titulo: v }))} />
              <Field label="Descripción" value={servicios.management_texto} onChange={(v) => setServicios((s) => ({ ...s, management_texto: v }))} multiline rows={5} />
            </SectionCard>

            <SectionCard title="Lista de servicios incluidos" id="sv-lista" saving={savingKey} saved={savedKey}
              onSave={() => save("sv-lista", "servicios", servicios)}>
              <p className="text-xs text-muted/70 rounded-lg bg-surface px-3 py-2">
                Los ítems que aparecen en la lista con tilde verde debajo de Management.
              </p>
              <StringListEditor
                label="Servicios"
                items={servicios.management_lista}
                onChange={(v) => setServicios((s) => ({ ...s, management_lista: v }))}
              />
            </SectionCard>

            <SectionCard title="¿Para quién desarrollamos?" id="sv-tipos" saving={savingKey} saved={savedKey}
              onSave={() => save("sv-tipos", "servicios", servicios)}>
              <TextItemListEditor
                label="Tipos de cliente"
                items={servicios.tipos}
                onChange={(v) => setServicios((s) => ({ ...s, tipos: v }))}
              />
            </SectionCard>

            <SectionCard title="Post Venta" id="sv-postventa" saving={savingKey} saved={savedKey}
              onSave={() => save("sv-postventa", "servicios", servicios)}>
              <Field label="Título" value={servicios.postventa_titulo} onChange={(v) => setServicios((s) => ({ ...s, postventa_titulo: v }))} />
              <Field label="Descripción" value={servicios.postventa_texto} onChange={(v) => setServicios((s) => ({ ...s, postventa_texto: v }))} multiline rows={4} />
            </SectionCard>

          </div>
        )}

        {/* ── METODOLOGÍA ──────────────────────────────────── */}
        {activeTab === "metodologia" && (
          <div className="space-y-5">

            <SectionCard title="Hero — encabezado de página" id="mt-hero" saving={savingKey} saved={savedKey}
              onSave={() => save("mt-hero", "metodologia", metodologia)}>
              <Field label="Título principal" value={metodologia.hero_titulo} onChange={(v) => setMetodologia((s) => ({ ...s, hero_titulo: v }))} multiline rows={2} />
              <Field label="Subtítulo" value={metodologia.hero_subtitulo} onChange={(v) => setMetodologia((s) => ({ ...s, hero_subtitulo: v }))} />
            </SectionCard>

            <SectionCard title="Párrafo introductorio" id="mt-intro" saving={savingKey} saved={savedKey}
              onSave={() => save("mt-intro", "metodologia", metodologia)}>
              <p className="text-xs text-muted/70 rounded-lg bg-surface px-3 py-2">
                El texto grande centrado que aparece debajo del hero.
              </p>
              <Field label="Texto" value={metodologia.intro} onChange={(v) => setMetodologia((s) => ({ ...s, intro: v }))} multiline rows={6} />
            </SectionCard>

            <SectionCard title="Pasos del proceso (timeline)" id="mt-pasos" saving={savingKey} saved={savedKey}
              onSave={() => save("mt-pasos", "metodologia", metodologia)}>
              <p className="text-xs text-muted/70 rounded-lg bg-surface px-3 py-2">
                Cada paso se numerará automáticamente (01, 02...). Podés reordenar eliminando y volviendo a agregar.
              </p>
              <PasoListEditor items={metodologia.pasos} onChange={(v) => setMetodologia((s) => ({ ...s, pasos: v }))} />
            </SectionCard>

          </div>
        )}

        {/* ── CONTACTO ─────────────────────────────────────── */}
        {activeTab === "contacto" && (
          <div className="space-y-5">

            <SectionCard title="Hero — encabezado de página" id="ct-hero" saving={savingKey} saved={savedKey}
              onSave={() => save("ct-hero", "contacto", contacto)}>
              <Field label="Título principal" value={contacto.hero_titulo} onChange={(v) => setContacto((s) => ({ ...s, hero_titulo: v }))} />
              <Field label="Subtítulo" value={contacto.hero_subtitulo} onChange={(v) => setContacto((s) => ({ ...s, hero_subtitulo: v }))} multiline rows={2} />
            </SectionCard>

          </div>
        )}

        {/* ── PROYECTOS ────────────────────────────────────── */}
        {activeTab === "proyectos" && (
          <div className="space-y-5">

            <SectionCard title="Hero — encabezado de página" id="pr-hero" saving={savingKey} saved={savedKey}
              onSave={() => save("pr-hero", "proyectos", proyectos)}>
              <p className="text-xs text-muted/70 rounded-lg bg-surface px-3 py-2">
                El listado de proyectos se gestiona desde el panel principal de Admin.
              </p>
              <Field label="Título principal" value={proyectos.hero_titulo} onChange={(v) => setProyectos((s) => ({ ...s, hero_titulo: v }))} multiline rows={2} />
              <Field label="Subtítulo" value={proyectos.hero_subtitulo} onChange={(v) => setProyectos((s) => ({ ...s, hero_subtitulo: v }))} multiline rows={2} />
            </SectionCard>

          </div>
        )}

        {/* ── GLOBAL / FOOTER ──────────────────────────────── */}
        {activeTab === "global" && (
          <div className="space-y-5">

            <SectionCard title="Footer — descripción" id="gl-footer" saving={savingKey} saved={savedKey}
              onSave={() => save("gl-footer", "global", global)}>
              <p className="text-xs text-muted/70 rounded-lg bg-surface px-3 py-2">
                El texto que aparece debajo del logo en el pie de página.
              </p>
              <Field label="Descripción" value={global.footer_descripcion} onChange={(v) => setGlobal((s) => ({ ...s, footer_descripcion: v }))} multiline rows={3} />
            </SectionCard>

            <SectionCard title="Footer — datos de contacto" id="gl-contacto" saving={savingKey} saved={savedKey}
              onSave={() => save("gl-contacto", "global", global)}>
              <p className="text-xs text-muted/70 rounded-lg bg-surface px-3 py-2">
                Email, teléfono y web que aparecen en la columna “Contacto” del footer.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Email" value={global.contacto_email} onChange={(v) => setGlobal((s) => ({ ...s, contacto_email: v }))} />
                <Field label="Teléfono" value={global.contacto_telefono} onChange={(v) => setGlobal((s) => ({ ...s, contacto_telefono: v }))} />
                <Field label="Sitio web" value={global.contacto_web} onChange={(v) => setGlobal((s) => ({ ...s, contacto_web: v }))} />
              </div>
            </SectionCard>

            <SectionCard title="Footer — redes sociales" id="gl-redes" saving={savingKey} saved={savedKey}
              onSave={() => save("gl-redes", "global", global)}>
              <p className="text-xs text-muted/70 rounded-lg bg-surface px-3 py-2">
                URL completa para los íconos de LinkedIn e Instagram en el footer.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="URL LinkedIn" value={global.redes_linkedin_url} onChange={(v) => setGlobal((s) => ({ ...s, redes_linkedin_url: v }))} />
                <Field label="Etiqueta LinkedIn" value={global.redes_linkedin_label} onChange={(v) => setGlobal((s) => ({ ...s, redes_linkedin_label: v }))} />
                <Field label="URL Instagram" value={global.redes_instagram_url} onChange={(v) => setGlobal((s) => ({ ...s, redes_instagram_url: v }))} />
                <Field label="Etiqueta Instagram" value={global.redes_instagram_label} onChange={(v) => setGlobal((s) => ({ ...s, redes_instagram_label: v }))} />
              </div>
            </SectionCard>

          </div>
        )}

      </div>
    </section>
  );
}
