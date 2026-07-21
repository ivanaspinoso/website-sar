-- Permite BORRAR objetos del bucket "proyectos" SOLO a usuarios admin.
-- Necesario para que el panel limpie imagenes al eliminar/reemplazar proyectos.
-- Ejecutar en: Supabase Dashboard -> SQL Editor -> New query -> Run.

create policy "admins can delete proyectos objects"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'proyectos'
  and exists (
    select 1 from public.admin_users a
    where a.user_id = auth.uid()
  )
);
