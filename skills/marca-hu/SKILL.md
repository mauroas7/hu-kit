---
name: marca-hu
description: Aplica el Manual de Marca del Hospital Universitario (colores, tipografía Montserrat, botones, íconos, ilustraciones, modo oscuro y tono de la copy) a cualquier pantalla, componente, PDF o email de un sistema del hospital — portal-hospital, quirofanohu/StartMed, o cualquier sistema nuevo del hospital. Usar SIEMPRE que se cree o edite una vista, un layout, un componente de UI, una paleta de colores, una fuente, un botón, un ícono, un badge/estado, o el texto de una pantalla en un proyecto de este hospital — incluso si el pedido no menciona "marca" o "diseño" explícitamente (ej. "agregá un botón de guardar", "hacé la vista de listado de cirugías", "qué color le pongo a este estado", "escribí el texto de este error"). No aplica a proyectos que no sean del Hospital Universitario.
---

# Marca del Hospital Universitario

Esta skill destila el Manual de Marca HU (10 páginas, vive en el repo privado
`hu-referencias`, en `manual-de-marca/`) más
cómo lo implementa **portal-hospital** — el sistema que más fielmente lo
respeta — y cómo lo adoptó **quirofanohu/StartMed**.

El stack de referencia es **Laravel 12 + Inertia 2 + React 18 + Tailwind 3**:
es lo que corren portal-hospital y quirofanohu, y un sistema nuevo arranca
directamente en él. Si un sistema del hospital todavía tiene vistas Blade, **la
marca es la misma en las dos tecnologías**: los tokens salen del mismo preset y
las clases son idénticas, sólo cambia dónde se escriben.

## Regla de oro

> Si una pantalla existente contradice el manual, gana el manual.

Las pantallas de referencia (las de portal-hospital y las de quirofanohu)
definen la *estructura* — cómo se arma una cabecera, una tarjeta, un estado
vacío — no los valores de marca. Ante la duda entre "así está hecho en otro
lado" y "así lo pide el manual", se sigue el manual y se corrige lo otro.

## Dónde viven los tokens

En el **paquete de estilos de `hu-kit`** (`hu-kit/estilos/`): un preset de
Tailwind con los colores, la tipografía, las capas y el movimiento, más un CSS
base con las fuentes y el foco. Cada sistema lo instala fijado a un tag
(`github:mauroas7/hu-kit#vX.Y.Z`), lo carga con `presets: [huKit]` e importa
`hu-kit/estilos.css`. Uso y decisiones en `hu-kit/estilos/README.md`.

**Un tono que falta se agrega en el preset de `hu-kit`, no en el config del
sistema**: así lo heredan todos. En el config del sistema va sólo lo propio
(espaciados de sus componentes, plugins). **Prohibido el color arbitrario**
(`bg-[#...]`, `text-[#...]`) tanto en JSX como en Blade. Ver
`references/colores.md` para la paleta y las reglas de contraste.

quirofanohu ya usa el paquete; portal-hospital todavía tiene su
`tailwind.config.js` propio con los valores de antes.

## Los componentes se importan, no se copian

El mismo paquete trae los componentes de React (`hu-kit/componentes`): el marco
de la app (`MarcoApp`, con `MenuDeUsuario` y `Flash`, más `rutaActiva`), los de
formulario (`Boton`, `Campo`, `Input`, `PasswordInput`, `Select`, `Textarea`,
`Checkbox`, `SelectorFecha`, `Buscador`), los de contenido (`Tarjeta`,
`Estado`, `EstadoVacio`, `Cargando`, `Alerta`, `Rotulo`, `Dato`, `Metrica`,
`Paginador`, las clases de tabla), la navegación (`Solapas`,
`SelectorDeVista`, `MenuDeAcciones` con `ItemDeMenu`), los avisos
(`AvisoFlotante`), los modales (`Modal`, `ModalConfirmar` con
`useConfirmacion`), los archivos (`SelectorDeArchivo`, `useSubidaDeArchivo`,
`BarraDeProgreso`) y `Icono`, `ApplicationLogo`, `PanelAutenticacion`,
`ErrorBoundary`, `institucional` y el tema (`ThemeProvider`, `useTheme`,
`ThemeToggle`). Si lo que vas a armar es uno de éstos, se importa: copiarlo es
lo que hace que dos sistemas terminen distintos. Cómo se ven, en el catálogo de
`hu-kit` (`npm run catalogo`); qué pide el sistema (la línea de `content` de
Tailwind, el `AppLayout` sobre `MarcoApp`), en su `README.md`; las clases de
cada uno, en `references/componentes.md`.

## Qué leer según lo que estés por tocar

| Vas a... | Leé |
|---|---|
| Elegir o agregar un color, tocar el preset o `tailwind.config.js` | `references/colores.md` |
| Poner texto, títulos, pesos de fuente, íconos, ilustraciones | `references/tipografia-e-iconos.md` |
| Armar un botón, una tarjeta, un badge/estado, un layout de auth, un z-index | `references/componentes.md` |
| Escribir copy — mensajes, labels, textos de error | `references/tono-y-copy.md` |
| Implementar o tocar el toggle de modo claro/oscuro | `references/modo-oscuro.md` |

Cada archivo trae fragmentos de código reales (no inventados) citando de qué
archivo salieron, para copiar la forma, no solo la idea.

## Checklist antes de dar por terminada una pantalla

- [ ] Ningún color arbitrario; todo sale de un token del preset de `hu-kit`.
- [ ] Todo texto llega a 4,5:1: dorado sobre claro es `secondary-dark`, nunca
      `secondary`; grises de texto desde `gray-500`; sobre `primary`, blanco
      desde `white/70`. Ver `references/colores.md`.
- [ ] Ningún texto de menos de 12 px (`text-xs`). En pantallas que se usan con
      el dedo, todo lo que se toca mide 44 px de alto como mínimo. La única
      excepción es `PanelAutenticacion`, que copia el login del portal.
- [ ] Sólo `font-normal` / `font-semibold` / `font-black` (400/600/900). Nunca
      `font-bold` ni `font-medium`: esos pesos no están cargados y el
      navegador los resuelve a 900 y 400 — mienten sobre lo que se ve.
- [ ] Botones: `rounded-full` si es confirmación/`type="submit"`, `rounded-xl`
      (~12px) si es un conjunto que navega o alterna. Siempre con estado
      hover.
- [ ] Íconos Material Symbols **Outlined**, con el eje `FILL` en 1 sólo para
      la sección activa.
- [ ] Si el proyecto tiene modo oscuro: pares fijos (`canvas`/`canvas-dark`,
      `surface`/`surface-dark`, …), sin persistirlo en `localStorage`.
- [ ] Copy en español rioplatense con voseo, consistente con el resto del
      sistema.
- [ ] Una acción destructiva confirma con un modal (`@headlessui/react` en
      React), no con `window.confirm()`.

## Cuando el manual no cubre algo

El propio manual lo dice: para espaciados, formularios y accesibilidad remite
a criterio general de UX/UI y a `ui.shadcn.com/docs/components` como
referencia. Orden de precedencia:

1. ¿Ya existe un patrón igual en una pantalla de portal-hospital o de
   quirofanohu? Copiá esa forma.
2. Si no existe, mirá shadcn/ui como referencia de espaciado y estructura.
3. Como último recurso, decidí con criterio de UX/UI general — pero
   documentalo (agregá el token al preset de `hu-kit` o el componente a
   `hu-kit/componentes`, no lo dejes suelto e inline) para que la próxima
   pantalla lo herede en vez de reinventarlo.

## Instalar esta skill en un sistema nuevo

Este archivo vive en el repo `hu-kit` (fuente de verdad, versionado aparte).
Se instala con `hu-kit/instalar.ps1`, que la copia a las skills de usuario
(`%USERPROFILE%\.claude\skills\`), sin versionarla en ningún proyecto. Lo que
sí entra en cada proyecto es la dependencia al paquete, con sus estilos y sus
componentes, que es donde la marca se cumple. Ver el `README.md` de `hu-kit`.
