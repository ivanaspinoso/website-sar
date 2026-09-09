// Especificaciones tecnicas por proyecto.
//
// La clave es el prefijo de 8 caracteres del id de Supabase (el mismo que va al
// final del slug). Se usa el id y no el titulo porque si renombran un proyecto
// desde el admin el slug cambia, y la ficha se perderia sin aviso.
//
// Si algun proyecto define `especificaciones` dentro del JSON de `descripcion`,
// ese valor tiene prioridad sobre lo de aca.
const ESPECIFICACIONES_POR_ID: Record<string, string> = {
  "5422bdaf": // Ecuador 1620
    "2.100 m2, 9 pisos, 31 unidades funcionales (monoambientes y 2 amb), local comercial abajo.",
  "a8e361d6": // Baez 325
    "1.300 m2, 6 pisos, 20 unidades funcionales (monoambientes), local comercial abajo, pileta en terraza.",
  "73ff283b": // Jose Bonifacio 1686
    "2.200 m2, 9 pisos, 33 unidades funcionales (mono y 2 amb), terraza con parrilla, local comercial abajo, cocheras.",
  "25ccf70f": // Valle 1373
    "3.900 m2, 10 pisos, 22 unidades funcionales (2, 3 y 4 amb), pileta, gimnasio, SUM, parrillas en unidades, cocheras.",
  "bb85852a": // Pumacahua 272
    "1.800 m2, 8 pisos, 21 unidades funcionales (2 y 3 amb), terraza con parrilla, cocheras.",
  "05d259b2": // Bogota 877
    "2.000 m2, 10 pisos, 19 unidades funcionales (2 y 3 amb), terraza con pileta, cocheras.",
  "1897a6f5": // Honorio Pueyrredon 1850
    "2.200 m2, 13 pisos, 35 unidades funcionales (mono, 2 y 3 amb), terraza con parrilla.",
  "188c5561": // Cachimayo 842
    "2.800 m2, 10 pisos, 19 unidades funcionales (3 amb), terraza con pileta, parrilla y SUM, cocheras.",
  "9afa7387": // Membrillar 255
    "2.400 m2, 9 pisos, 29 unidades funcionales (2 amb), terraza con pileta y SUM con parrilla, cocheras.",
  "f6baf444": // Azara 1343
    "1.300 m2, 5 pisos, 13 unidades funcionales (mono y 2 amb), cocheras.",
  "00f00b31": // Curapaligue 436
    "2.600 m2, 10 pisos, 19 unidades funcionales (3 amb), parrilla, pileta, cocheras.",
  "f3bb0522": // Independencia 2236
    "2.400 m2, 13 pisos, 10 unidades funcionales (mono y 2 amb), cocheras.",
  "6affc8d6": // Torre La Prensa / Azopardo 755
    "25.000 m2, 30 pisos, +200 unidades (mono, 2 y 3 amb), pileta climatizada in/out, gimnasio, seguridad 24hs, microcine, SUM, cocheras.",
  "9f597e29": // Tudor Building / Pedro Goyena 840
    "4.050 m2, 14 pisos, 18 unidades (dúplex; 3 y 4 amb), gimnasio, pileta, solarium, jardín con parrilla, seguridad 24hs, cocheras.",
  "650295f4": // Oro Two / Fray Justo Santa Maria de Oro 2264
    "2.500 m2, 8 pisos, 24 unidades (2 y 3 amb), gimnasio, pileta, sauna, cocheras.",
  "11c3884f": // Oro One / Fray Justo Santa Maria de Oro 2675
    "2.000 m2, 8 pisos, 18 unidades (2 y 3 amb), gimnasio, pileta, SUM, sauna y jacuzzi, cocheras.",
  "c3f2da77": // Jose Bonifacio 2236 (ficha "Bonifacio Imperial")
    "4.500 m2, 7 pisos, 53 unidades (mono, 2, 3 y 4 amb), pileta con solarium, quincho y SUM, cocheras.",
  "44784560": // Torre del Club Italiano (ficha "Torre Della Fontana")
    "19.000 m2, 23 pisos, +80 unidades funcionales (2, 3 y 4 amb), cocheras.",
  "481e7009": // Hortiguera 443
    "1.800 m2, 9 pisos, 17 unidades funcionales (2 y 4 amb), cocheras.",
  "faa7160a": // Poligono del Lago / Club de Campo La Martona
    "30 hectáreas (Club de campo La Martona), 119 lotes de 800 m2 c/u, con laguna, hípica y dolfina.",
};

export function getEspecificaciones(projectId: string, desdeContenido?: string) {
  // La base manda. Si la clave existe se respeta tal cual, incluso vacia: eso
  // significa que se borro la ficha a proposito y no hay que mostrar nada.
  // El mapa de arriba es solo la carga inicial, para proyectos que todavia no
  // pasaron por el admin (clave ausente).
  if (desdeContenido !== undefined) {
    return desdeContenido.trim() || null;
  }

  return ESPECIFICACIONES_POR_ID[projectId.slice(0, 8)] ?? null;
}

// Separa la ficha en items sueltos. Corta solo en las comas de primer nivel:
// varias especificaciones traen comas adentro de parentesis ("(mono, 2 y 3 amb)")
// y ahi no hay que cortar.
export function splitEspecificaciones(texto: string) {
  const items: string[] = [];
  let actual = "";
  let profundidad = 0;

  for (const char of texto) {
    if (char === "(") profundidad += 1;
    if (char === ")") profundidad = Math.max(0, profundidad - 1);

    if (char === "," && profundidad === 0) {
      items.push(actual);
      actual = "";
      continue;
    }

    actual += char;
  }

  items.push(actual);

  return items
    .map((item) => item.trim().replace(/\.$/, "").trim())
    .filter(Boolean);
}
