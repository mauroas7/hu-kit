# Plan — pasar en limpio hu-kit después de la auditoría

**Objetivo:** corregir lo que encontró la auditoría del 13 de noviembre de 2026
sobre la v1.16.0 (`eb4ff20`): un bug en el menú del celular, ocho arreglos
chicos y la documentación que quedó atrás del código. Nada nuevo que el kit no
necesite.

## Decisiones

- **U1 y U2 salen juntas como v1.16.1.** Son arreglos: ningún sistema cambia
  código para adoptarlas.
- **La regla de versiones se reescribe según lo que se hace.** De v1.9 a v1.15
  hubo siete cambios visibles en versiones menores; la regla escrita pedía
  v2.0.0 para cada uno. Queda así:
  - el último número, un arreglo que no pide nada al sistema;
  - el del medio, algo nuevo (pieza, prop, token) o un cambio que se ve y que
    el sistema adopta sólo revisando sus pantallas;
  - el primero, lo que obliga a cambiar código del sistema: un export, un prop
    o un token que se saca o cambia de nombre.
- **El borde de los controles llega a 3:1 con un token propio,
  `brandText-control` (`#8A8A8C`), en su versión: v1.17.0.** `brandText-soft`
  da 1,44:1 sobre blanco y el README del kit pide 3:1. Un token aparte porque
  `brandText-soft` sigue siendo el de separadores y tarjetas, que no lo piden.
  En oscuro va `gray-500`. Cambia todos los formularios: por eso no viaja con
  los arreglos.
- **Los PDF generados salen del repo y van como adjuntos del release.** `.git`
  pesa 11 MB al mes de vida, casi todo PDF regenerado, y `main` no se
  reescribe: lo ya subido queda, pero deja de crecer.
- **Hay un `npm run verificar`.** El repo no tiene ningún chequeo automático, y
  uno de tres pasos habría atajado la guía con la versión vieja.
- **`arquitectura-hu` deja las reglas y saca el relato de lo que portal-hospital
  hace mal.** El repo es público; es lo mismo que se hizo en v1.5.0.
- **`useConfirmacion` no cambia de comportamiento: se escribe su contrato.** El
  único caso real que lo incumple desmonta la página y no deja nada colgado.
- **La guía toma la versión de `package.json` al compilar.** A mano quedó en
  1.8.1 durante ocho versiones.

## Preguntas abiertas

Cada una tiene una respuesta por defecto, así que ninguna frena su unidad.

1. **FormRequest o validación inline (U5).** La skill dice que las dos valen,
   con un criterio; el `CLAUDE.md` personal dice «validation in a FormRequest».
   Por defecto la skill no cambia: es la fuente versionada, y lo que se
   corregiría es el resumen del `CLAUDE.md`, en `claude-personal`.
2. **La fuente de `docs/plantilla-hu.pdf` (U8).** No está en el repo. Por
   defecto el PDF se adjunta al release tal cual y el README dice que su fuente
   no vive acá.

## Lo que no se toca

- `PasswordInput`: su API distinta al resto funciona, está documentada y tiene
  seis usos.
- Los cortes en 1340 y 1366 px de `Estado` y `MenuDeAcciones`: atados a una
  pantalla de quirofanohu, pero comentados.
- Las piezas que hoy usa un solo sistema, o ninguno (`Cargando`): sacarlas
  rompe, y el portal las va a usar.

## Reglas para todas las unidades

- hu-kit no tiene tests ni formateador: lo que se corre al terminar es
  `npm run catalogo:build`, y desde U6, `npm run verificar`.
- Las piezas se miran en el catálogo (`npm run catalogo`), en claro y en oscuro.
- Los comentarios dicen qué hace el código hoy, no su historia.
- Una unidad que cambia `skills/` vuelve a correr `instalar.ps1`.
- El tag y el push de cada versión los hace Mauro, con los pasos de «Publicar
  una versión».

---

## U1 — El menú del celular queda por encima del encabezado

**Estado:** pendiente

**Qué pasa hoy:** la barra lateral y el encabezado comparten `z-dropdown` y el
encabezado va después en el DOM. Con el menú abierto, el encabezado tapa el
logo y el botón «Cerrar menú» (el toque lo recibe el subtítulo), y el fondo
oscuro, en `z-30`, no lo atenúa. Sólo se cierra tocando afuera o con Escape.
Afecta a quirofanohu y a sistemabienes.

**Qué cambia:** en celular, el fondo oscuro y la barra pasan a `z-modal`, con
el fondo debajo de la barra. Desde `lg` la barra vuelve a `z-dropdown`, como
está.

**Archivos:** `componentes/MarcoApp.jsx` (líneas 154, 187 y 193).

**Revisar:** catálogo en 375 px, `?seccion=listado`, en claro y en oscuro.
- Con el menú abierto se ven el logo y «Cerrar menú», y el botón cierra.
- El encabezado queda atenuado y no recibe toques.
- Tocar afuera y Escape siguen cerrando.
- En 1440 px no cambia nada: la barra fija, el menú del usuario abre por encima.

## U2 — Arreglos chicos y v1.16.1

**Estado:** pendiente

**Qué cambia:**

| Qué | Dónde |
|---|---|
| `react-dom` entra en `peerDependencies` (`^18.3.1`): el toast lo importa | `package.json` |
| `CHANGELOG.md` entra en `files`: el README lo enlaza y no viajaba | `package.json` |
| `postcss` sube a la primera versión sin aviso, y `npm audit fix` sin `--force` para `follow-redirects`; si pide un major, queda afuera y se dice | `package.json`, el lock si cambia |
| «Cerrar sesión» y la acción de peligro pasan de `text-red-600` a `text-red-700` (4,41:1 → 5,91:1 sobre `red-50`); el oscuro no cambia | `componentes/MenuDeAcciones.jsx:51`, `componentes/MenuDeUsuario.jsx:108` |
| El párrafo de la pantalla de error pasa a `text-brandText dark:text-brandText-dark` (`gray-500` sobre `canvas` da 4,49:1) | `componentes/ErrorBoundary.jsx:32` |
| `Flash` pasa a ser un alias en `index.js` (`export { default as Flash } from './AvisoFlotante.jsx'`), `MarcoApp` importa `AvisoFlotante` y `Flash.jsx` se borra. El nombre sigue exportado: los dos sistemas lo importan | `componentes/index.js`, `componentes/MarcoApp.jsx`, `componentes/Flash.jsx` |
| El comentario de `useConfirmacion` dice el contrato: `accion` inicia una visita de Inertia o devuelve una promesa; si no, el diálogo queda en «Confirmando…» | `componentes/useConfirmacion.js` |
| La fuente de íconos sólo tiene el eje `FILL`: `font-variation-settings` queda en `'FILL' 0` y el `@font-face` en `font-weight: 400`. Se dibuja igual | `estilos/estilos.css:18` y `:60` |
| Se ignoran `CLAUDE.md` y `.claude/`, la regla que el README pide a cada proyecto | `.gitignore` |
| Versión 1.16.1 y su entrada, con U1 adentro | `package.json`, `CHANGELOG.md` |

**Reglas:** `marca-hu` para los colores; la fila de `Flash` en la tabla del
README sigue siendo cierta o se corrige.

**Revisar:**
- `npm run catalogo:build` compila y `npm pack --dry-run` lista `CHANGELOG.md`.
- `npm audit` sin altas, o con la que quedó afuera nombrada.
- Catálogo: el menú del usuario y un menú de acciones con ítem de peligro, en
  claro y en oscuro; un aviso de éxito sigue saliendo (`?seccion=avisos`).
- Los íconos se ven igual, en trazo y con `relleno` (la sección activa del
  menú).

**Después del commit (Mauro):** tag `v1.16.1` y push; cada sistema la adopta en
un commit propio.

## U3 — La documentación del paquete dice lo que el código hace

**Estado:** pendiente

**Qué cambia:**
- **Fuente de íconos:** `estilos/README.md:19` deja de decir «la fuente variable
  completa»: trae sólo el eje `FILL`.
- **Regla de versiones:** las tres viñetas de `estilos/README.md:77-82` pasan a
  la regla de «Decisiones».
- **«Versiones» y «Publicar una versión» se mudan al `README.md` raíz:** son de
  todo el paquete, no de los estilos. En `estilos/README.md` queda una línea
  con el enlace. La lista de publicar suma `npm run guia` cuando cambió una
  pieza o la guía.
- **«Plantilla»:** el párrafo de `docs/plantilla-hu.pdf` (`README.md:171`)
  aclara en una frase que no es `hu-plantilla`, el sistema vacío de «Qué falta».

**Archivos:** `README.md`, `estilos/README.md`.

**Revisar:** los enlaces entre los dos README abren; no queda «variable
completa» ni «v2.0.0» como regla; la lista de publicar se lee de corrido.

## U4 — La guía toma la versión sola

**Estado:** pendiente

**Qué cambia:**
- La tapa (`guia.html:67`) y el comando de instalación (`:297`) llevan la
  versión de `package.json`, y la tapa el mes y el año en que se compila. Lo
  resuelve un `transformIndexHtml` en `catalogo/vite.config.js`.
- El caso de Bienes HU (`:393` a `:423`) es historia y se queda en 1.8.1.
- La fila de `institucional` (`:228`) suma el horario del Call Center.
- Se regenera el PDF con `npm run guia`.

**Archivos:** `catalogo/guia.html`, `catalogo/vite.config.js`,
`docs/guia-hu-kit.pdf`.

**Revisar:** en el PDF, la tapa dice 1.16.1 y el mes actual; el comando de
«Mientras no exista la plantilla» apunta a `#v1.16.1`; la fila de
`institucional` nombra el horario; ninguna página quedó cortada.

## U5 — Las skills, al día

**Estado:** pendiente

**Qué cambia en `marca-hu`:**
- `references/tipografia-e-iconos.md:77-78`: la fuente trae sólo `FILL`.
- `references/componentes.md:136`: el ejemplo de `AppLayout` «en el README» no
  existe; apunta a donde sí está (la guía o `catalogo/ejemplos/`).
- `references/componentes.md:85`: el fondo de la tarjeta, como en
  `Tarjeta.jsx`.
- `SKILL.md`: sistemabienes entra entre los sistemas que usan el paquete.

**Qué cambia en `arquitectura-hu`:**
- `references/validacion-y-nombres.md:74`: las fechas del front salen de
  `aFecha` y `fechaCompleta` de `hu-kit/componentes`, no de un `utils/fechas.js`
  del sistema.
- `SKILL.md` y las siete referencias: cada regla queda con su porqué, sin el
  relato de lo que portal-hospital incumple («sistemáticamente violadas», las
  llamadas sin timeout, los services que no loguean). Lo que se copia de
  portal-hospital sigue nombrado.
- `SKILL.md`: sistemabienes entra en la descripción.
- FormRequest o inline: ver pregunta abierta 1.

**Archivos:** `skills/marca-hu/`, `skills/arquitectura-hu/`.

**Reglas:** ninguna regla se pierde ni se ablanda; sólo sale el relato.

**Revisar:** buscar en `skills/` «sistemáticamente», «sin timeout»,
«utils/fechas» y «opsz» no devuelve nada; después de `instalar.ps1`, la copia
de `~/.claude/skills/` es igual al repo.

## U6 — `npm run verificar`

**Estado:** pendiente

**Qué cambia:** un script en la raíz, sin dependencias nuevas, que corta con
error en el primer paso que falle:
1. el catálogo compila;
2. cada export de `componentes/index.js` está nombrado en `README.md`;
3. la versión de `package.json` es la primera de `CHANGELOG.md`.

Entra como primer paso de «Publicar una versión».

**Archivos:** `verificar.mjs` (nuevo: lo corre npm), `package.json`,
`README.md`.

**Revisar:** pasa sobre el repo como está; falla con un mensaje claro al sacar
una fila de la tabla del README y al cambiar la versión de `package.json` (las
dos pruebas se deshacen).

## U7 — El borde de los controles llega a 3:1 (v1.17.0)

**Estado:** pendiente

**Qué cambia:**
- Token nuevo `brandText.control: '#8A8A8C'`: 3,45:1 sobre blanco y 3,20:1
  sobre `canvas`.
- `claseControl` (variante normal) y `claseCasilla` pasan de
  `border-brandText-soft dark:border-gray-700` a
  `border-brandText-control dark:border-gray-500` (3,83:1 sobre `surface-dark`,
  3,63:1 sobre `canvas-dark`).
- La variante `ingreso` no cambia: es la excepción documentada del panel.
- La decisión se anota en «Foco» de `estilos/README.md` y el token en
  `colores.md` de `marca-hu`.
- Versión 1.17.0, su entrada en el CHANGELOG y la guía regenerada (las capturas
  de formularios cambian).

**Archivos:** `estilos/tokens.js`, `componentes/Campo.jsx:85`,
`componentes/Checkbox.jsx:55`, `estilos/README.md`,
`skills/marca-hu/references/colores.md`, `package.json`, `CHANGELOG.md`,
`docs/guia-hu-kit.pdf`.

**Revisar:** catálogo `?seccion=campos` y `?seccion=formulario`, en claro y en
oscuro.
- El borde en reposo se distingue del fondo sin verse pesado.
- El borde de error (rojo) y el de foco (`primary`, dorado en oscuro) siguen
  distinguiéndose del de reposo.
- La casilla sin marcar se ve; marcada no cambió.
- Otro control con borde que haya quedado en `brandText-soft` se nombra en
  «Fuera de alcance», no se toca.

**Después del commit (Mauro):** tag `v1.17.0` y push; cada sistema la adopta
revisando sus formularios.

## U8 — Los PDF salen del repo

**Estado:** pendiente

**Antes de empezar (Mauro):** los dos PDF quedan adjuntos al release de la
última versión publicada.

**Qué cambia:**
- `docs/guia-hu-kit.pdf` y `docs/plantilla-hu.pdf` se borran del repo y
  `.gitignore` suma `docs/*.pdf`. `npm run guia` sigue escribiendo ahí.
- El README enlaza la guía en
  `https://github.com/mauroas7/hu-kit/releases/latest/download/guia-hu-kit.pdf`,
  y la plantilla igual; de la plantilla dice dónde está su fuente (pregunta
  abierta 2).
- «Publicar una versión» suma adjuntar los PDF al release.
- Esta unidad borra `docs/planes/auditoria.md`.

**Archivos:** `docs/guia-hu-kit.pdf`, `docs/plantilla-hu.pdf`, `.gitignore`,
`README.md`, `docs/planes/auditoria.md`.

**Revisar:** los dos enlaces del README bajan el PDF; `git status` no muestra
el PDF después de `npm run guia`.

## Sin verificar en la auditoría

- El chequeo con axe-core no se pudo correr; los contrastes se recalcularon a
  partir de los tokens.
- El contenido de los dos PDF no se revisó página por página.
