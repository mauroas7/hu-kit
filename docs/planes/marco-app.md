# Plan — `MarcoApp`: el marco del personal habla el idioma del portal

**Objetivo:** que las pantallas del personal compartan el lenguaje del portal
del paciente, con un diferencial propio del equipo: el portal acompaña y el
marco del personal es una herramienta sobria. Ninguna página cambia: sale como
hu-kit v2.2.0, y quirofanohu sólo sube de versión.

La comparación visual que cerró las decisiones (hoy, portal, sintonía, A′ y A″)
está en un artifact privado del usuario: «Marco del personal».

## Decisiones

- **El título pasa a `CabeceraSeccion`, arriba del contenido, con las mismas
  props** (`titulo`, `subtitulo`, `estado`). Así ningún sistema toca sus
  páginas, y la versión es menor (v2.2.0). `<Head>` sigue tomando `titulo`.
- **Las fichas van sin mayúscula.** Si la pantalla lleva `volver`, su título es
  un nombre («Juan Pérez», «Editar usuario ana@hu.ar»), y el manual no quiere
  mayúscula en nombres de cosas (`estilos/README.md`, «Mayúsculas»). Las
  secciones siguen en mayúscula.
- **Diferencial del equipo (variante A″): panel `primary-dark` liso**, sin el
  degradado ni el brillo del portal. El paciente recibe calidez; el equipo, una
  herramienta. Es el patrón de los sistemas de salud con dos caras: la misma
  marca, con distinta densidad y distinto adorno.
- **El sistema va bajo el logo, en dos niveles**: el nombre en blanco y la
  bajada más chica. Se lee como el nombre del producto. El bloque de `sistema`
  del pie desaparece.
- **Sin migas derivadas.** En el personal, las migas sólo aparecían en las
  fichas, al lado de una flecha que vuelve al historial: «← Cirugías ›» hacía
  creer que la flecha llevaba a Cirugías. `migas` queda como prop opcional,
  para la página que quiera pasar niveles a mano.
- **`volver` va en la cabecera, con su etiqueta visible** en escritorio
  («← Volver a usuarios»; por defecto, «Volver») y sólo la flecha en el
  celular. Va en todos los anchos, porque en el personal volver conserva los
  filtros y el historial, y una miga no puede hacer eso. Con `volver`, el botón
  del menú del celular pasa a la derecha.
- **«Modo oscuro» va fijo al pie del panel y al final del menú del celular**,
  fuera de lo que se desplaza: con un menú largo no se esconde. El
  `ThemeToggle` sale de la cabecera, pero sigue exportado para no romper a
  nadie. Siempre aparece, sin prop: hoy el botón ya aparece siempre.
- **La cabecera sigue fija** (`sticky`), de 73 px, a la par de la zona del logo.
  Cabecera y contenido llevan el mismo margen, 24 px en escritorio, para que la
  flecha y el título queden alineados.
- **El menú del celular cuelga de la cabecera, animado, con un fondo que
  oscurece el contenido y lo cierra al tocarlo**. Lo mismo para `MarcoPortal`,
  donde hoy tocar afuera no hace nada.
- **El foco dorado también sobre `primary-dark`.** `estilos.css` pasa el
  anillo a dorado sólo bajo `.bg-primary`, y sobre `primary-dark` quedaría azul
  sobre azul. Arregla también el panel del portal, cuyo contenedor es
  `bg-primary-dark`.
- **Se mantienen el ancho `w-64` y las filas `tamano="app"` de 44 px**, con la
  raya dorada: el menú del personal es largo y tiene grupos.
- **Se comparte lo que es igual en los dos marcos y significa lo mismo.**
  `Migas` e `InterruptorTema` salen de `MarcoPortal` a archivos propios, que no
  se exportan. El bloqueo del scroll con el menú abierto pasa a
  `useMenuLateral`. `BotonVolver` de `MarcoApp` no se comparte: acepta una
  función, y el `Volver` del portal no.
- **Descartadas:** el rol a la vista (B), el panel plegable a íconos (C), el
  buscador en la cabecera y el panel claro (D).
- **sistemabienes queda fuera de este plan.** Está en v1.15.0, y subir trae la
  v2.0.0, que pide sacar el `icono` de 14 `Tarjeta`, y todo el rediseño de
  v1.19. Va en un plan propio.

## Unidades

### U1 — hu-kit: piezas compartidas y arreglos que no cambian el armado

- `componentes/CabeceraSeccion.jsx`:
  - prop `estado`: un nodo junto al `h1`, en una fila que se parte
    (`flex flex-wrap items-center gap-x-3 gap-y-1`; el `h1` con `min-w-0`);
  - prop `mayuscula = true`: en `false`, saca `uppercase` del `h1`;
  - el `h1` corta las palabras largas (`[overflow-wrap:anywhere]`);
  - el `subtitulo` puede ser un nodo: la ficha de cirugía pasa uno con íconos.
- `componentes/Migas.jsx` (nuevo): la función `Migas` de `MarcoPortal`, tal
  cual.
- `componentes/InterruptorTema.jsx` (nuevo): el de `MarcoPortal`, con
  `tamano = 'portal'`, que es la fila de hoy.
  - Con `'app'`, una fila como las de `SeccionesDelMenu` app: `min-h-11
    rounded-xl px-3 py-2.5 text-sm text-white/70 hover:bg-white/5
    hover:text-white`, el ícono `dark_mode` en `text-xl` sin círculo y la misma
    perilla a la derecha.
  - En los dos tamaños, `role="switch"` y `aria-checked`.
- `componentes/useMenuLateral.js`: suma el efecto que pone
  `document.documentElement.style.overflow = 'hidden'` mientras el menú está
  abierto, que hoy vive en `MarcoPortal`.
- `componentes/MarcoPortal.jsx`:
  - importa `Migas` e `InterruptorTema`, y deja de tener el efecto del scroll;
  - con el menú del celular abierto, un fondo `bg-primary-dark/50` bajo la
    cabecera (`lg:hidden`) que cubre el contenido y lo cierra al tocarlo.
- `estilos/estilos.css`: la regla del foco dorado pasa a
  `:where(.dark, .bg-primary, .bg-primary-dark)`.
- Reglas: `marca-hu` (`componentes.md`: «Cabecera de sección», «Marco del
  paciente», «Fila del panel»), contraste y foco de `estilos/README.md`. Sin
  `export` nuevo en `index.js`.
- Revisar en el catálogo (`npm run catalogo`):
  - el portal se ve igual que antes: migas, «Modo oscuro» en el panel y en el
    menú del celular, y el fondo quieto con el menú abierto;
  - en el celular, con el menú abierto, el contenido se oscurece, y tocarlo
    cierra el menú;
  - con Tab, el foco se ve dorado sobre el panel del portal;
  - `CabeceraSeccion` sin las props nuevas se ve igual, y con un título largo
    sin espacios no se sale a 375 px.
- Estado: pendiente

### U2 — hu-kit: el `MarcoApp` nuevo

`componentes/MarcoApp.jsx`: las props de hoy, más `migas` (opcional,
`[{ etiqueta, href | onClick }]`, como en el portal).

- **Panel de escritorio** (`hidden lg:block`, `w-64`, con
  `dark:border-r dark:border-white/10`): una columna
  `sticky top-0 flex h-screen flex-col`, `bg-primary-dark dark:bg-surface-dark`,
  sin degradado ni brillo. Tiene cuatro zonas:
  - el logo: `border-b border-white/10 px-6 py-3`, `min-h-12`, logo blanco
    `w-36`, `Link` a `inicio`;
  - el sistema, en `px-6 pb-1 pt-5`: `sistema.nombre` en
    `text-sm font-semibold text-white` y `sistema.bajada` en
    `text-xs text-white/70`;
  - `SeccionesDelMenu` app, la única zona que se desplaza (`px-3 py-4`);
  - fijo abajo, `InterruptorTema tamano="app"`, en
    `shrink-0 border-t border-white/10 px-3 py-3`.
- **Cabecera:** `sticky top-0 z-dropdown`, blanca (`dark:bg-surface-dark`),
  `border-b border-gray-100 dark:border-gray-800`, `px-4 py-3 sm:px-6`, interior
  `min-h-12`: 73 px.
  - A la izquierda, en escritorio: `volver` como botón de 44 px con flecha y
    etiqueta (`etiqueta ?? 'Volver'`, `text-sm font-semibold text-primary`).
  - A la izquierda, en el celular: sólo la flecha, con `aria-label`. Sin
    `volver`, el botón del menú (`lg:hidden`, con el aspecto del portal:
    `bg-canvas`, y `menu` o `close` según esté abierto).
  - Al centro, en escritorio: `Migas`, sólo si llegan.
  - Al centro, en el celular: el logo a color, centrado de verdad (`absolute
    left-1/2 -translate-x-1/2`, `pointer-events-none`), aunque haya dos botones
    a la derecha.
  - A la derecha: el botón del menú, si `volver` le ocupó la izquierda, y
    `MenuDeUsuario`. Salen el `ThemeToggle` y su separador.
- **Celular:** el cajón lateral y su fondo se reemplazan por el desplegable del
  portal, dentro de la cabecera (`absolute inset-x-0 top-full
  max-h-[calc(100dvh-73px)] animate-menu-in overflow-y-auto`,
  `bg-primary-dark dark:bg-surface-dark`).
  - Lleva el sistema en dos niveles, `SeccionesDelMenu` e `InterruptorTema
    tamano="app"`.
  - Debajo, el mismo fondo de U1, que cierra el menú al tocarlo.
  - Elegir un ítem lo cierra. Abierto, `main` queda `inert` y el fondo,
    quieto.
- **Contenido:** `main` con `p-4 sm:p-6` y `animate-fade-in`. Adentro, en el
  contenedor de `ancho`, va
  `<CabeceraSeccion titulo subtitulo estado mayuscula={! volver} />` antes de
  `children`.
- Se mantienen «Saltar al contenido», el foco al abrir y cerrar el menú
  (`useMenuLateral`) y `AvisoFlotante`.
- El comentario del componente se actualiza: el sistema bajo el logo, el tema
  al pie, volver con etiqueta y `migas`.
- Reglas: `marca-hu` (`componentes.md`, «Marco de la app» y «Marco del
  paciente»; `modo-oscuro.md`), contraste de `estilos/README.md`, 44 px para
  todo lo que se toca.
- Revisar en el catálogo (el tablero de ejemplo y «Detalle»), en claro, en
  oscuro y a 375 px, contra la variante A″ del artifact:
  - la línea de la cabecera coincide con la de la zona del logo (73 px);
  - la flecha y el título quedan alineados a 24 px;
  - una ficha muestra «← Volver…» a la izquierda de la cabecera (en el
    celular, sólo la flecha) y su título sin mayúscula;
  - una sección muestra su título en mayúscula con el filete dorado, y
    `subtitulo` y `estado` junto al título;
  - «Modo oscuro» queda fijo al pie del panel con el menú más largo, y alterna;
  - en oscuro, el panel y la cabecera son `surface-dark` con borde;
  - en el celular, el logo queda centrado, el menú cuelga animado, el contenido
    se oscurece y tocarlo cierra el menú;
  - con teclado, el foco se ve dorado sobre el panel, y Escape cierra el menú y
    devuelve el foco al botón.
- Estado: pendiente

### U3 — hu-kit: documentación y v2.2.0

- `CHANGELOG.md`, la entrada v2.2.0:
  - lo de U1 y U2;
  - «Qué hacer al adoptarla: nada de código. Revisar las pantallas del
    personal: el título baja al contenido, el tema pasa al pie del panel y
    volver muestra su etiqueta.»
- `package.json`: `version` 2.2.0.
- `README.md`: las filas de `MarcoApp` (panel, sistema bajo el logo, tema,
  volver con etiqueta, `migas`, título con `CabeceraSeccion`) y de
  `CabeceraSeccion` (`estado`, `mayuscula`).
- `skills/marca-hu/references/componentes.md`:
  - «Marco de la app» se reescribe con el armado nuevo y con el porqué del
    diferencial (panel liso del equipo y panel en degradado del paciente);
  - «Cabecera de sección» suma `estado`, `mayuscula` y el corte de palabras
    largas;
  - «Marco del paciente» suma el fondo del menú del celular, y aclara que no
    hay botón de tema en la cabecera de ninguno de los dos marcos.
- `skills/marca-hu/references/modo-oscuro.md`: «El panel azul es el mismo en
  los dos modos y en los dos marcos» ya estaba mal desde v1.18. En oscuro, los
  dos paneles pasan a `surface-dark` con borde.
- `estilos/README.md`, «Foco»: el dorado vale también sobre `primary-dark`.
- `skills/marca-hu/SKILL.md`, sólo si nombra el `ThemeToggle` de la cabecera.
- `npm run guia`, que regenera `docs/guia-hu-kit.pdf`: el marco sale en la
  guía.
- Después del commit publica el usuario: tag `v2.2.0`, push y `instalar.ps1`,
  porque la skill cambió (`estilos/README.md`, «Publicar una versión»).
- Revisar: la guía regenerada muestra el marco nuevo.
- Estado: pendiente

### U4 — quirofanohu adopta v2.2.0, y se borra este plan

Son dos commits, porque son dos repos: uno en quirofanohu y otro en hu-kit, que
sólo borra este archivo.

- quirofanohu, en una rama propia (`test` está protegida):
  - `npm install hu-kit@github:mauroas7/hu-kit#v2.2.0`, que cambia
    `package.json` y `package-lock.json`;
  - `resources/js/Pages/Cirugias/Show.jsx`: el comentario del subtítulo nombra
    el `line-clamp-2` del marco, que ya no existe;
  - `docs/frontend.md`, cuatro cambios:
    - «El título de una pantalla»: en el marco del equipo es la
      `CabeceraSeccion` que pone `AppLayout`, sin mayúscula en las fichas;
    - «Volver»: va en la cabecera, a la izquierda, con su etiqueta visible en
      escritorio;
    - «La ficha de una cirugía»: hoy dice «la flecha va en el renglón del
      título, pegada a él», y ahora va en la cabecera;
    - donde se nombre el botón de tema, pasa a «Modo oscuro» al pie del panel.
  - `AppLayout.jsx` no cambia: las props son las mismas.
- hu-kit: se borra `docs/planes/marco-app.md`.
- Reglas: `docs/frontend.md` de quirofanohu.
- Revisar (`revisor-visual`, en claro, en oscuro y a 375 px):
  - Tablero, Agenda, Cirugías, Usuarios y un formulario de Catálogos;
  - la ficha de cirugía: «← Volver» con el historial, el paciente sin
    mayúscula, documento, edad y estado junto al nombre, y el subtítulo con
    la fecha y «faltan» en un renglón a 1366;
  - la ficha de un paciente: «← Volver al listado» conserva la búsqueda;
  - `SinAcceso`, el usuario sin rol: el panel sin secciones;
  - la vista previa del portal, dentro del marco del equipo.
- Verificación: `powershell -File ~/.claude/scripts/verificar.ps1` y
  `npm run build`.
- Estado: pendiente

## Verificación del plan entero

- hu-kit no tiene tests: U1 a U3 se prueban en el catálogo (`npm run catalogo`
  y `npm run catalogo:build`) y con `revisor-visual` sobre su URL.
- Antes de publicar el tag, U2 puede probarse en quirofanohu con `npm pack` (ver
  «Versiones» en `estilos/README.md`), sin commitear el `.tgz`.
- U4: `verificar.ps1`, `npm run build` y la lista de `Revisar:`.

## Fuera de alcance

- sistemabienes: adoptar v2.x y el marco nuevo, en un plan propio, porque antes
  tiene que pasar por la v2.0.0.
- El portal tiene el mismo logo descentrado en el celular con `volver` y el
  «Modo oscuro» dentro de lo que se desplaza. Su menú es corto y ya tiene un
  pie fijo, así que no urge.
- `SeccionesDelMenu.jsx`: el ícono `open_in_new` del ítem `externo` va en
  `text-white/60`, y la regla del panel pide `white/70`. Es decorativo, pero
  conviene revisarlo.
