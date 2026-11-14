# Plan — pasar en limpio hu-kit después de la auditoría

**Objetivo:** corregir lo que encontró la auditoría del 13 de noviembre de 2026
sobre la v1.16.0 (`eb4ff20`): un bug en el menú del celular, los arreglos
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
- **«Versiones» y «Publicar una versión» se quedan en `estilos/README.md`.**
  Mudarlas al README raíz es reordenar, y rompe el enlace del CHANGELOG.
- **La guía no escribe la versión.** A mano quedó en 1.8.1 durante ocho
  versiones. La tapa va sin número (lo da el release al que va adjunta) y los
  comandos dicen `#vX.Y.Z`, como `estilos/README.md`.
- **No hay `npm run verificar`.** Lo que controlaría (exports contra README,
  versión contra CHANGELOG) nunca falló, y lo que sí falló, la guía, deja de
  escribir la versión.
- **`CHANGELOG.md` no viaja en el paquete.** Se lee en GitHub; en
  `node_modules` nadie lo abre.
- **Los PDF generados salen del repo y van como adjuntos del release.** Cada
  instalación de un sistema baja el árbol entero del tag, con 4,4 MB de PDF que
  `files` después descarta, y `.git` crece con cada guía regenerada. Va antes
  que la guía y el borde, que regeneran el PDF.
- **El borde de los controles llega a 3:1 con un token propio,
  `brandText-control` (`#8A8A8C`), en su versión: v1.17.0.** `brandText-soft`
  da 1,44:1 sobre blanco y el README del kit pide 3:1. Un token aparte porque
  `brandText-soft` sigue siendo el de separadores y tarjetas, que no lo piden.
  En oscuro va `gray-500`. Cambia todos los formularios: por eso no viaja con
  los arreglos.
- **`arquitectura-hu` deja las reglas y saca el relato de lo que portal-hospital
  hace mal.** El repo es público; es lo mismo que se hizo en v1.5.0.
- **`useConfirmacion` no cambia de comportamiento: se escribe su contrato.** El
  único caso real que lo incumple desmonta la página y no deja nada colgado.

## Preguntas abiertas

Cada una tiene una respuesta por defecto, así que ninguna frena su unidad.

1. **FormRequest o validación inline (U3).** La skill dice que las dos valen,
   con un criterio; el `CLAUDE.md` personal dice «validation in a FormRequest».
   Por defecto la skill no cambia: es la fuente versionada, y lo que se
   corregiría es el resumen del `CLAUDE.md`, en `claude-personal`.
2. **La fuente de `docs/plantilla-hu.pdf` (U5).** No está en el repo. Por
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
  `npm run catalogo:build`.
- Las piezas se miran en el catálogo (`npm run catalogo`), en claro y en oscuro.
- Los comentarios dicen qué hace el código hoy, no su historia.
- Una unidad que cambia `skills/` vuelve a correr `instalar.ps1`.
- El tag, el push y los releases los hace Mauro, con los pasos de «Publicar
  una versión».

---

## U1 — El menú del celular queda por encima del encabezado

**Estado:** hecha

**Qué pasa hoy:** la barra lateral y el encabezado comparten `z-dropdown` y el
encabezado va después en el DOM. Con el menú abierto, el encabezado tapa el
logo y el botón «Cerrar menú» (el toque lo recibe el subtítulo), y el fondo
oscuro, en `z-30`, no lo atenúa. Sólo se cierra tocando afuera o con Escape.
Afecta a quirofanohu y a sistemabienes.

**Qué cambia:** en celular, el fondo oscuro y la barra pasan a `z-modal`, con
el fondo debajo de la barra. Desde `lg` la barra vuelve a `z-dropdown`, como
está.

**Archivos:** `componentes/MarcoApp.jsx`.

**Revisar:** catálogo en 375 px, `?seccion=listado`, en claro y en oscuro.
- Con el menú abierto se ven el logo y «Cerrar menú», y el botón cierra.
- El encabezado queda atenuado y no recibe toques.
- Tocar afuera y Escape siguen cerrando.
- En 1440 px no cambia nada: la barra fija, el menú del usuario abre por encima.

## U2 — Arreglos chicos y v1.16.1

**Estado:** hecha

**Qué cambia:**

| Qué | Dónde |
|---|---|
| `react-dom` entra en `peerDependencies` (`^18.3.1`): el toast lo importa | `package.json` |
| `postcss` sube a 8.5.32 y `npm audit fix` sin `--force` arregla `follow-redirects` | `package.json`, `package-lock.json` |
| «Cerrar sesión» y la acción de peligro pasan de `text-red-600` a `text-red-700` (4,41:1 → 5,91:1 sobre `red-50`); el oscuro no cambia | `componentes/MenuDeAcciones.jsx`, `componentes/MenuDeUsuario.jsx` |
| El párrafo de la pantalla de error pasa a `text-brandText dark:text-brandText-dark` (`gray-500` sobre `canvas` da 4,49:1) | `componentes/ErrorBoundary.jsx` |
| `Flash` pasa a ser un alias en `index.js`, `MarcoApp` importa `AvisoFlotante` y `Flash.jsx` se borra. El nombre sigue exportado: los dos sistemas lo importan | `componentes/index.js`, `componentes/MarcoApp.jsx`, `componentes/Flash.jsx` |
| El comentario de `useConfirmacion` dice el contrato: `accion` inicia una visita de Inertia o devuelve una promesa | `componentes/useConfirmacion.js` |
| La fuente de íconos sólo tiene el eje `FILL`: `font-variation-settings` queda en `'FILL' 0` (y `'FILL' 1` en `relleno`). El `font-weight: 100 700` del `@font-face` se queda: no es un eje, y sin él el navegador le inventa negrita a un ícono con `font-black` (quirofanohu tiene uno) | `estilos/estilos.css` |
| Se ignoran `CLAUDE.md` y `.claude/`, la regla que el README pide a cada proyecto | `.gitignore` |
| Versión 1.16.1 y su entrada, con U1 adentro | `package.json`, `CHANGELOG.md` |

**Revisar:**
- `npm run catalogo:build` compila y `npm audit` da 0.
- Catálogo: el menú del usuario y un menú de acciones con ítem de peligro, en
  claro y en oscuro; un aviso de éxito sigue saliendo (`?seccion=avisos`).
- Los íconos se ven igual, en trazo y con `relleno` (la sección activa del
  menú).

**Después del commit (Mauro):** tag `v1.16.1` y push; cada sistema la adopta en
un commit propio.

## U3 — Las skills, al día

**Estado:** hecha

**Qué cambia en `marca-hu`:**
- `references/tipografia-e-iconos.md:77-78`: la fuente trae sólo `FILL`.
- `references/componentes.md:136`: el ejemplo de `AppLayout` «en el README» no
  existe; apunta a donde sí está (la guía o `catalogo/ejemplos/`).
- `references/componentes.md:85`: el fondo de la tarjeta, como en
  `Tarjeta.jsx`.
- `SKILL.md:48`: el toast es `AvisoFlotante` (`Flash` es su alias).
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

## U4 — La documentación del paquete dice lo que el código hace

**Estado:** hecha

**Qué cambia:**
- **Fuente de íconos:** `estilos/README.md:19` deja de decir «la fuente variable
  completa»: trae sólo el eje `FILL`.
- **Regla de versiones:** las tres viñetas de `estilos/README.md:77-82` pasan a
  la regla de «Decisiones».
- **Publicar una versión** (`estilos/README.md:96`): suma `npm run guia` antes
  del commit, cuando cambió una pieza que sale en la guía.
- **«Plantilla»:** el párrafo de `docs/plantilla-hu.pdf` (`README.md:171`)
  aclara en una frase que no es `hu-plantilla`, el sistema vacío de «Qué falta».

**Archivos:** `README.md`, `estilos/README.md`.

**Revisar:** no queda «variable completa» ni «v2.0.0» como regla; la lista de
publicar se lee de corrido.

## U5 — Los PDF salen del repo

**Estado:** pendiente

**Antes de empezar (Mauro):** con v1.16.1 publicada, su release en GitHub con
los dos PDF adjuntos:

```bash
gh release create v1.16.1 docs/guia-hu-kit.pdf docs/plantilla-hu.pdf --title v1.16.1 --notes "Ver CHANGELOG.md"
```

**Qué cambia:**
- `docs/guia-hu-kit.pdf` y `docs/plantilla-hu.pdf` se borran del repo y
  `.gitignore` suma `docs/*.pdf`. `npm run guia` sigue escribiendo ahí.
- El README enlaza la guía en
  `https://github.com/mauroas7/hu-kit/releases/latest/download/guia-hu-kit.pdf`,
  y la plantilla igual; de la plantilla dice dónde está su fuente (pregunta
  abierta 2).
- «Publicar una versión» suma crear el release con los dos PDF adjuntos.

**Archivos:** `docs/guia-hu-kit.pdf`, `docs/plantilla-hu.pdf`, `.gitignore`,
`README.md`, `estilos/README.md`.

**Revisar:** los dos enlaces del README bajan el PDF; `git status` no muestra
el PDF después de `npm run guia`.

## U6 — La guía, sin versión escrita y al día

**Estado:** pendiente

**Qué cambia:**
- La tapa (`catalogo/guia.html:67`) pierde la línea «Versión 1.8.1 · octubre de
  2026»: el número lo da el release al que va adjunta.
- El comando de «Mientras no exista la plantilla» (`:297`) pasa a `#vX.Y.Z`,
  con «el último tag, en CHANGELOG.md», como en `estilos/README.md`.
- El caso de Bienes HU (`:393` a `:423`) es historia y se queda en 1.8.1.
- La fila de `institucional` (`:228`) suma el horario del Call Center.
- Se regenera el PDF con `npm run guia`.

**Archivos:** `catalogo/guia.html`.

**Revisar:** en el PDF, la tapa no tiene versión; el comando dice `#vX.Y.Z`; la
fila de `institucional` nombra el horario; ninguna página quedó cortada.

**Después del commit (Mauro):** el PDF nuevo reemplaza al del último release:

```bash
gh release upload v1.16.1 docs/guia-hu-kit.pdf --clobber
```

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
- Versión 1.17.0 y su entrada en el CHANGELOG. La guía se regenera: las
  capturas de formularios cambian.
- Esta unidad borra `docs/planes/auditoria.md`.

**Archivos:** `estilos/tokens.js`, `componentes/Campo.jsx`,
`componentes/Checkbox.jsx`, `estilos/README.md`,
`skills/marca-hu/references/colores.md`, `package.json`, `CHANGELOG.md`,
`docs/planes/auditoria.md`.

**Revisar:** catálogo `?seccion=campos` y `?seccion=formulario`, en claro y en
oscuro.
- El borde en reposo se distingue del fondo sin verse pesado.
- El borde de error (rojo) y el de foco (`primary`, dorado en oscuro) siguen
  distinguiéndose del de reposo.
- La casilla sin marcar se ve; marcada no cambió.
- Otro control con borde que haya quedado en `brandText-soft` se nombra en
  «Fuera de alcance», no se toca.

**Después del commit (Mauro):** tag `v1.17.0`, push y su release con los dos
PDF; cada sistema la adopta revisando sus formularios.

## Sin verificar en la auditoría

- El chequeo con axe-core no se pudo correr; los contrastes se recalcularon a
  partir de los tokens.
- El contenido de los dos PDF no se revisó página por página.
