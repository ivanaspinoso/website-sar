"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.push("/admin");
  }

  return (
    <section className="section-padding">
      <div className="container-sar max-w-md">
        <p className="eyebrow">ADMIN</p>
        <h1 className="mt-2 text-3xl font-semibold">Acceso al panel</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-brand/15 bg-white p-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-brand/20 px-3 py-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contrasena"
            className="w-full rounded-md border border-brand/20 px-3 py-2"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {errorMsg ? <p className="text-sm text-red-600">{errorMsg}</p> : null}

          <button
            type="submit"
            className="w-full rounded-md bg-foreground px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </section>
  );
}
