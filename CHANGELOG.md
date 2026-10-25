# Cambios

Qué trae cada versión de hu-kit, la más nueva arriba. Cómo se numeran y cómo
se publica una, en [`estilos/README.md`](estilos/README.md#versiones).

## v1.9.0 — 2026-10-25

- `Solapas`, en el celular, van en un renglón que se desliza de costado, con la
  activa a la vista: antes partían en renglones antes del contenido. Desde `sm`,
  como antes. Cambia en todo sistema que las use.
- `Boton` suma el tamaño `portal` (táctil, en mayúsculas, el de los botones del
  portal de pacientes) y la variante `suave`, y `claseBoton()` da sus clases
  para un enlace que no puede ser un `Boton`.
- `SelectorDeArchivo` recibe `tamano` y `nombre` (lo que se sube, para el
  lector de pantalla).
- `Rotulo` suma `tono="texto"`, el gris del texto que piden los rótulos del
  portal.
- El token `primary-bright`, el azul para un relleno en modo oscuro (5,3:1
  sobre `surface-dark`), y su par en la skill `marca-hu`. Al subir, se vuelve
  a correr `instalar.ps1`.
- Nada deja de andar: lo que ya se usaba no cambia de nombre ni de valor.

## v1.8.3 — 2026-10-25

- El tag `v1.8.2` quedó apuntando por error al commit de la `v1.8.1`: no trae
  nada de lo de abajo. No se usa; un tag publicado no se mueve, así que esta
  versión es la que trae los cambios.
- `MarcoApp` en el celular: la barra lateral cerrada sale del orden del
  teclado (antes eran paradas invisibles antes del contenido), abierta se
  cierra con Escape, y el título y el subtítulo del encabezado ocupan hasta dos
  renglones en lugar de cortarse.
- `Flash` y `AvisoFlotante` dejan montada la región que lee el lector de
  pantalla y el mensaje llega después: un `status` que aparece ya escrito no
  lo anuncian todos. Sirve cuando la página sigue montada, como al volver de
  guardar a la misma pantalla.
- La flecha deshabilitada del `Paginador` tiene su tono en oscuro.
- En la skill `marca-hu`, el par oscuro de borde es `border-brandText-soft` →
  `border-gray-800`, el que usa el kit. Al subir, se vuelve a correr
  `instalar.ps1`.
- Nada cambia de API: los sistemas sólo suben el tag.

## v1.8.1 — 2026-10-24

- El tag `v1.8.0` quedó apuntando por error al commit de la `v1.7.0`: no trae
  nada de lo de abajo. No se usa; un tag publicado no se mueve, así que esta
  versión es la que trae los cambios.
- El marco de la app pasa al paquete: `MarcoApp` (barra lateral, encabezado,
  menú de la cuenta y avisos), `MenuDeUsuario`, `Flash` y `rutaActiva`. Recibe
  todo resuelto; cada sistema lo envuelve en su `AppLayout`.
- `ThemeProvider` vuelve a claro cuando cambia el usuario aunque la página no
  se recargue: lo lee de cada navegación con `usuarioDe` (por defecto,
  `auth.usuario.id`). Hasta acá, quien entraba después heredaba el modo oscuro.
- Piezas nuevas: `Solapas`, `SelectorDeVista`, `MenuDeAcciones` con
  `ItemDeMenu`, `AvisoFlotante`, `SelectorDeArchivo`, `useSubidaDeArchivo`,
  `BarraDeProgreso`, `Cargando`, `Dato` y `Buscador`.
- `institucional`, los datos de contacto del hospital, y `hu-kit/tokens`, los
  colores para lo que no lee clases.
- El catálogo (`npm run catalogo`) y la guía en PDF (`docs/guia-hu-kit.pdf`,
  `npm run guia`). No llegan a los sistemas.
- El Manual de Marca pasa a `hu-referencias`. Al subir, se vuelve a correr
  `instalar.ps1`.
- Al subir, en cada sistema:
  - su `AppLayout` pasa a ser un puente a `MarcoApp`, y se borran sus copias de
    `Nav`, `MenuDeUsuario`, `Flash` y de las ayudas de rutas (el ejemplo, en
    la guía y en `sistemabienes`);
  - el color de la barra de progreso de `app.jsx` sale de
    `colores.secondary.DEFAULT`.

## v1.7.0 — 2026-10-24

- `EstadoVacio` sola ocupa el ancho de su contenedor: con el tope de lectura
  que traía, en un monitor dejaba una banda vacía al lado. Quien la quiera
  angosta la envuelve en un ancho propio.

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
