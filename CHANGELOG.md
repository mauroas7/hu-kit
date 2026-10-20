# Cambios

Qué trae cada versión de hu-kit, la más nueva arriba. Cómo se numeran y cómo
se publica una, en [`estilos/README.md`](estilos/README.md#versiones).

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
