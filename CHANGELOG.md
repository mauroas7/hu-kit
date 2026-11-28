# Cambios

Qué trae cada versión de hu-kit, la más nueva arriba. Cómo se numeran y cómo
se publica una, en [`estilos/README.md`](estilos/README.md#versiones).

## v2.1.0 — 2026-11-28

- `MarcoPortal`, para el portal de un sistema que se entra desde otro (el de
  quirofanohu, desde portal-hospital):
  - una miga con `externo: true` es un `<a>` común, sin visita de Inertia;
  - `volver`, `{ href, etiqueta, externo }`: en el celular, una flecha de 44 px
    a la izquierda de la cabecera; el botón del menú pasa a la derecha;
  - sin `navegacion`, el logo de la cabecera se ve en todos los anchos (enlace
    al `inicio`, si lo hay) y `conTema` pone «Modo oscuro» en el menú de la
    cuenta.
- `MenuDeUsuario` suma `conTema`: el interruptor «Modo oscuro» antes de cerrar
  sesión.

Qué hacer al adoptarla: nada; sin las props nuevas, todo se ve igual.

## v2.0.0 — 2026-11-28

- Sale lo que v1.19.0 dejó obsoleto:
  - `Boton` y `claseBoton` pierden `tamano="portal"` (táctil en mayúscula). Un
    `portal` que quede cae en `normal`: 42 px y no 44.
  - `Tarjeta` pierde `icono`, que desde v1.19.0 no se mostraba.
- Siguen igual el `tamano="portal"` de `SeccionesDelMenu` (la fila del panel
  del paciente) y el de `Alerta`: son otras props.

Qué hacer al adoptarla: si se hizo lo de v1.19.0, nada. Si no,
`tamano="portal"` → `tactil` en cada `Boton`, `SelectorDeArchivo` y
`claseBoton`, y sacar el `icono` de cada `Tarjeta`.

## v1.22.0 — 2026-11-28

- `MenuDeUsuario` deja `@headlessui/react`: es una divulgación (botón con
  `aria-expanded` y una lista de enlaces, sin `role="menu"`). Mismas props y
  mismo aspecto. Las flechas recorren los ítems, Escape cierra y devuelve el
  foco al botón; elegir un ítem, el clic afuera y Tab hacia afuera lo cierran.
  El `Menu` de Headless UI traía floating-ui al chunk de los marcos: en el
  portal, ≈90 kB menos en la carga inicial.

Qué hacer al adoptarla: nada de código; revisar el menú de usuario con teclado.

## v1.21.1 — 2026-11-28

- `package.json` declara `"sideEffects": ["**/*.css"]`: sólo los `.css` hacen
  algo al importarse, así que el bundler descarta las piezas de
  `hu-kit/componentes` que una página no usa. Sin esto, el portal metía
  `react-day-picker` (≈80 kB) en su chunk de entrada porque `app.jsx` importa
  `ErrorBoundary` y `ThemeProvider` del barrel.

Qué hacer al adoptarla: nada.

## v1.21.0 — 2026-11-27

- `Alerta`: prop `urgente` (por defecto, `true` para `error` y `aviso`); en
  `false` el rol es `status` y el lector de pantalla no se interrumpe, para un
  sistema caído que se informa al cargar. Prop `icono`, que reemplaza el del
  tipo (`cloud_off` para un sistema que no respondió).

Qué hacer al adoptarla: nada; las dos props son opcionales.

## v1.20.0 — 2026-11-27

- `MarcoPortal`: prop `lateral`, una columna a la derecha del contenido, a todo
  su alto y fuera del margen del `main`, para las novedades del inicio del
  portal. Con `barraInferior`, el `pie` deja `pb-20` en el celular y su final ya
  no queda debajo de la barra fija.

Qué hacer al adoptarla: nada; `lateral` es opcional.

## v1.19.0 — 2026-11-27

- `Boton`: `cargando` y `textoCargando` (gira `progress_activity`, con
  `aria-busy`, sin atenuar y sin cambiar de ancho); `tamano="icono"` pasa a 44
  × 44; foco con anillo dorado (`ring-secondary`); transición sólo de color, en
  150 ms; en oscuro, `primario` suma un borde `white/15`. `tamano="portal"`
  queda obsoleto.
- Preset: las animaciones del sistema, `animate-fade-in` (sólo opacidad, 150
  ms), `fade-in-lento`, `fade-out`, `escala-in`, `paso-adelante`, `paso-atras`,
  `aviso-in`, `menu-in` y `barra-tiempo`.
- `MarcoPortal`: prop `migas` (la ruta de la cabecera, con enlace y 44 px);
  `conTema` pasa a ser el interruptor «Modo oscuro» al final de la navegación y
  del menú del celular; cabecera sólo con borde, de 73 px como la zona del logo;
  el menú del celular entra animado, con el fondo quieto y la `barraInferior`
  oculta.
- `SeccionesDelMenu` `tamano="portal"`: la fila del panel (ícono en un círculo
  de 36 px, activa como tarjeta elevada, rótulo de grupo con `titulo`). Ítem
  nuevo `externo`, para una sección que sale a otro sistema.
- `MenuDeUsuario`: el botón muestra nombre y `rol` (si lo hay) en tipo oración;
  `detalle` va sólo dentro del menú; ítems de 44 px; «Cerrar sesión» en
  `red-700`, sin mayúscula.
- `AvisoFlotante`: sale con fundido; `useAviso()` dispara un aviso desde el
  cliente.
- Nuevos: `CabeceraSeccion`, `FechaChip`, `SeparadorDeMes` y `Calendario`.
- `Tarjeta`: cabecera de 61 px con el título en un `Rotulo`; `icono` deja de
  mostrarse. `SelectorDeVista`: opciones de 44 px, a lo ancho en el celular.
  `Buscador`: texto en 600, botón de borrar de 44 px y prop `ancho`. `EstadoVacio`: props
  `ilustracion` y `accion`. `encabezadoTabla` sobre `canvas`.
- `Modal`: props `rotulo` y `pie`; título `font-black uppercase` en hasta dos
  renglones; la X es un `Boton` de 44 px; al cerrar se desvanece.
- `ModalConfirmar`: props `rotulo`, `children`, `textoCancelar` y
  `textoProcesando`; pie en dos columnas, `contorno` y `peligro`, con la
  destructiva `cargando`. `useConfirmacion` pasa los textos nuevos.
- `SelectorFecha` toma las celdas de `Calendario`: 44 px y semana desde el
  lunes.
- `Campo` y `Checkbox`: el borde de error pasa a `red-700`.
- `PanelAutenticacion`: el rótulo del panel pasa a `white/70`.
- `npx hu-kit instalar`: conecta un Laravel recién creado con Breeze React al
  sistema de diseño (su documentación llega en una versión siguiente).
- Nada deja de andar: ninguna prop cambia de significado, sólo se suman. Lo
  que sale va en v2.0.0: `tamano="portal"` de `Boton` y `icono` de `Tarjeta`.
- Quien sube lo ve distinto: los botones (foco dorado, ícono de 44 px), las
  tarjetas, el marco del paciente, el menú de usuario, los modales, el
  calendario y el error de los campos en `red-700`. Al subir, se vuelve a
  correr `instalar.ps1` (la skill `marca-hu` cambia).

### Qué hacer al adoptarla

Para portal-hospital y quirofanohu:

- `tamano="portal"` → `tactil` en cada `Boton` (y en `SelectorDeArchivo`).
- Sacar el `icono` de cada `Tarjeta`.
- `migas` en lugar de una ruta propia en la cabecera de `MarcoPortal` (en
  quirofanohu, el `Ruta` propio).
- `conTema` es ahora el interruptor del panel: sacar el botón de tema que el
  sistema haya puesto en la cabecera.
- El DNI del paciente va como `detalle` del usuario, y el `rol` sólo cuando lo
  hay.
- Un aviso disparado en el cliente, con `useAviso()`.
- `ModalConfirmar` con `rotulo` y `children` para el cuerpo, y
  `textoProcesando` para lo que dice mientras corre la acción.

## v1.18.0 — 2026-11-26

- `MarcoPortal`: el panel se rediseña en tres zonas en una columna
  fija a todo el alto (logo, `accion`, `navegacion`) donde sólo la navegación se
  desplaza. El logo baja a `w-36` y su línea queda a la par de la de la cabecera;
  el fondo es un degradado de `primary` con un brillo; la `accion` pasa a
  `rounded-2xl` con sombra y foco propio. En oscuro el panel es `surface-dark`
  con borde, no `primary`.
- `MarcoPortal`, prop nueva `pieDelPanel`: una zona fija abajo del panel (y al
  final del menú del celular) para lo que tiene que verse siempre.
- Qué hacer al adoptarla: pasar «Contacto y ayuda» a `pieDelPanel` y rearmar las
  filas de la `navegacion` con la anatomía nueva
  (`skills/marca-hu/references/componentes.md`, «Marco del paciente»).

## v1.17.0 — 2026-11-24

- `MarcoPortal`, el marco del paciente: el mismo armado de borde a borde que
  `MarcoApp` (panel `bg-primary` a todo el alto, unión recta, sin tarjeta ni
  marco azul alrededor). Lo que lo distingue es lo que lleva el panel: la
  `accion` destacada (dorada, con texto `primary`), la `navegacion` (un nodo) y
  ítems de 48 px. Además: `encabezado`, `pie` (franja clara dentro de la
  columna del contenido), `barraInferior` (fija en el celular) y `conTema`.
  Sin `navegacion` no hay panel ni botón de menú.
- `SeccionesDelMenu`: el menú de secciones de `MarcoApp`, ahora suelto. Un ítem
  puede llevar `onClick` en lugar de `href`, y `tamano="portal"` lo hace de 48
  px. Sirve para armar la `navegacion` de `MarcoPortal`.
- `useSoloClaro()`: mientras una pantalla está montada, el tema es claro aunque
  el estado diga oscuro. `PanelAutenticacion` lo usa y pierde sus `dark:`: el
  ingreso va siempre en claro, también con una sesión abierta (una pantalla de
  confirmar contraseña, por ejemplo). El modo oscuro queda para los dashboards
  del paciente y del personal.
- `MarcoApp` y `MarcoPortal`: un primer enlace «Saltar al contenido» que sólo se
  ve con el teclado; al abrir el menú del celular el foco entra al primer ítem,
  Escape lo cierra y el foco vuelve al botón que lo abrió; mientras está
  abierto el contenido no responde (`inert`).
- `MarcoApp`: los ítems del menú y los botones de abrir y cerrar miden 44 px
  como mínimo (antes, 40 y 24).
- `Solapas`: la raya de la solapa activa pasa a `secondary-dark` en claro
  (el dorado daba 2,4:1 sobre blanco; ahora cumple 3:1). En oscuro sigue
  dorada.
- Nada deja de andar: ninguna prop cambia de nombre ni de valor.
- Quien sube lo ve distinto: los ítems del menú de `MarcoApp` crecen unos 4 px,
  la raya de las solapas es más oscura y el ingreso ya no se pone oscuro.

## v1.16.0 — 2026-11-06

- `institucional` suma `horarioCallCenter` («De lunes a viernes, de 8 a 20
  hs»): el horario del Call Center, que atiende el WhatsApp de turnos y el
  teléfono.
- `institucional.telefono` se escribe «261 564 4000», agrupado como el
  WhatsApp («261 205 3408»): al lado, uno de los dos se veía mal escrito.
- Nada deja de andar: el número es el mismo. Un enlace `tel:` armado con el
  teléfono tiene que quitar los espacios en lugar del guion.

## v1.15.0 — 2026-11-04

- `MarcoApp`: la flecha de «Volver» flotaba entre el título y el subtítulo y
  quedaba separada del título. Ahora va pegada al título, a la altura de su
  renglón, con el glifo sobre el borde izquierdo del contenido. `volver`
  acepta además `{ href, onClick, etiqueta }`: la etiqueta es lo que leen el
  lector de pantalla y el `title` (por defecto, «Volver»).
- `Solapas`: «Acciones» pesaba más que la navegación y quedaba 4 px más arriba
  que el texto de las solapas. Ahora las solapas son una barra con el marco de
  las tarjetas, con `alFinal` centrado en ella; las inactivas pasan de
  `brandText-muted` a `brandText` (contraste 7:1) y ya no bajan de renglón desde
  `sm`: siempre se deslizan de costado.
- Nada deja de andar: las props de hoy siguen valiendo.
- Quien usa `Solapas` ve la barra distinta (marco, alto y color); conviene
  revisar el espacio que deja alrededor.

## v1.14.1 — 2026-11-04

- El toast (`AvisoFlotante`, también como `Flash`) se dibuja colgado de
  `<body>`. Dentro de `MarcoApp` y de la tarjeta del ingreso la animación de
  entrada lo encerraba: caía al final de la página o se cortaba. Ahora aparece
  en la ventana en toda pantalla.
- El lector de pantalla anuncia cada aviso al llegar, también después de
  cambiar de página y cuando el mismo mensaje llega dos veces; cerrar uno ya no
  vuelve a anunciar los otros.
- `contornoSobrePrimario` trae el fondo `white/10` y un hover `white/20` que se
  ve.
- `Alerta` `tamano="portal"` amplía su descripción, y la skill `marca-hu` suma
  la regla de los avisos: al subir, se vuelve a correr `instalar.ps1`.
- Nada deja de andar: ningún nombre ni prop cambia.
- Para quien sube desde antes de v1.12.0: los mensajes de `flash` dejan de ir
  arriba del contenido y pasan al toast, abajo a la derecha; conviene revisar
  las pantallas con una barra fija abajo.

## v1.14.0 — 2026-11-04

- El subtítulo del encabezado de `MarcoApp` pasa de `text-xs` en
  `brandText-muted` a `text-sm` en `brandText` (7:1 sobre blanco; en oscuro,
  `brandText-dark`): es lo que dice de qué se trata la pantalla, y se leía
  chico y tenue. Cambia en todo sistema que lo use; el encabezado crece unos
  4 px.
- Nada deja de andar: las props no cambian de nombre ni de valor.

## v1.13.0 — 2026-11-04

- `MarcoApp` suma `volver` (un href, o una función) y `estado` (un nodo junto
  al título): una ficha de detalle ya no necesita la franja de «Volver» y el
  estado entre el encabezado y las solapas.
- `Solapas` suma `alFinal`: lo que va a la derecha de la fila, sobre la misma
  raya. Con él la fila va en un solo renglón que se desliza en todos los anchos.
- `MenuDeAcciones` suma `texto`: desde 1366 px el botón dice «Acciones» con una
  flecha; debajo quedan los tres puntos.
- El ejemplo «Pedido 1048» del catálogo usa el patrón nuevo. La skill
  `marca-hu` cambia: al subir, se vuelve a correr `instalar.ps1`.
- Nada deja de andar: lo que ya se usaba no cambia de nombre ni de valor.

## v1.12.0 — 2026-11-04

- El aviso de `flash` pasa a ser un toast: una tarjeta por tipo (máximo 3) con
  título y detalle, botón para cerrarla, barra de tiempo en el éxito y la info, y
  pausa con el puntero, el foco o la pestaña oculta. Éxito e info se van a los
  5 s; error y aviso quedan hasta cerrarlos. Cada mensaje de `flash` puede ser
  un string o `{ titulo, detalle }`.
- `Flash` queda como alias de `AvisoFlotante`: dibuja el mismo toast.
- `Alerta` suma `tamano`: `equipo` (el de siempre) o `portal`, con texto base y
  más aire. También en el catálogo y en la skill `marca-hu`: al subir, se vuelve
  a correr `instalar.ps1`.
- Nada deja de andar: lo que ya se usaba no cambia de nombre ni de valor; un
  `flash` con strings se ve en el toast nuevo.

## v1.11.0 — 2026-11-03

- Los estilos base ya no dejan una palabra sola en el último renglón de un
  párrafo, un ítem o una etiqueta (`text-wrap: pretty`), y parten parejos los
  títulos de más de un renglón (`balance`). Cambia en todo sistema que los use;
  cualquier utilidad le gana a la regla.
- `Boton` suma la variante `contornoSobrePrimario`, para una acción secundaria
  dentro de un bloque `primary`. También en el catálogo y en la skill
  `marca-hu`: al subir, se vuelve a correr `instalar.ps1`.
- Nada deja de andar: lo que ya se usaba no cambia de nombre ni de valor.

## v1.10.0 — 2026-10-25

- Los anchos `lectura` y `formulario` de `MarcoApp` arrancan a la izquierda,
  alineados con el título de la cabecera, en vez de centrarse: al pasar de un
  listado a un formulario el contenido ya no salta. Conservan su tope (1152 y
  768 px). Cambia en todo sistema que los use.
- Nada deja de andar: los nombres de los anchos no cambian.

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
