# Cambios

Qué trae cada versión de hu-kit, la más nueva arriba. Cómo se numeran y cómo
se publica una, en [`estilos/README.md`](estilos/README.md#versiones).

## v1.6.0 — 2026-10-20

- `ErrorBoundary` acepta `onError(error, info)`, para que el sistema registre
  el error en su backend: hasta acá sólo quedaba en la consola del navegador.
- `Alerta` interrumpe al lector de pantalla sólo si es `error` o `aviso`
  (`role="alert"`); `exito` e `info` van como `role="status"`.
- La ayuda de un campo queda asociada al control con `aria-describedby`, igual
  que el error. `descritoPor()` arma ese atributo para un control propio
  adentro de `Campo`, como un `PasswordInput`.
- El `Boton` de la skill `marca-hu` se pone al día con el componente. Al subir,
  se vuelve a correr `instalar.ps1`.

## v1.5.0 — 2026-10-20

- `Select` recibe `opciones` como pares `[valor, etiqueta]`, en el orden en
  que se muestran. Un mapa `{ valor: etiqueta }` sigue funcionando, pero con
  claves numéricas se muestra ordenado por clave: un `pluck('nombre', 'id')`
  ordenado por nombre sale ordenado por id. Al subir, esos pasan a pares.
- En modo oscuro, el error de `Campo` y el asterisco de obligatorio van en
  `red-400` (6,7:1 sobre `surface-dark`); en `red-700` daban 2,9:1.
- `LICENSE`: el repo es público para que npm lo baje, pero su contenido no se
  licencia. La fuente de íconos trae el texto de su licencia, Apache 2.0.
- La skill `arquitectura-hu` enuncia las reglas de seguridad sin describir
  los sistemas que las incumplen. Al subir, se vuelve a correr `instalar.ps1`.

## v1.4.2 — 2026-10-20

- Los README dicen que el repo es público y explican cómo se publica una
  versión. Empieza este registro.
- Sin cambios en `estilos/` ni en `componentes/`: un sistema no tiene nada que
  revisar al subir.

## v1.4.1 — 2026-10-20

- El repo pasa a ser público, con la historia en un solo commit. El contenido
  es el de la v1.4.0, sin `referencias/`: la especificación de la API de
  Alephoo no es pública.
- Las versiones anteriores ya no se pueden instalar: sus commits no existen en
  GitHub.

## v1.4.0 — 2026-10-15

- Todos los componentes genéricos: tarjetas, estados, alertas, formularios,
  calendario, modales, paginador, tablas, tema y pantalla de error.

## v1.3.0 — 2026-10-15

- `hu-kit/componentes` exporta componentes de React: el login del portal como
  `PanelAutenticacion`, con `Boton`, `Campo`, `Input`, `PasswordInput`,
  `Icono`, el logo y el tema.
- El preset trae el plugin `@tailwindcss/forms`.

## v1.2.0 — 2026-10-15

- Los degradés del panel de ingreso pasan al preset.

## v1.1.0 — 2026-10-15

- Los textos atenuados y dorados tienen su par para el modo oscuro, y el foco
  es dorado sobre fondos oscuros.

## v1.0.0 — 2026-10-08

- La marca pasa a ser un paquete: el preset de Tailwind, los estilos base, las
  fuentes y los tonos de contraste. Hasta acá, hu-kit tenía sólo las skills.
