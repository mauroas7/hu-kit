# Componentes

## Botones — la regla del radio

El manual distingue dos formas de botón por el **contexto de la acción**, no
por su color:

| Tipo | Radio | Cuándo | Ejemplos |
|---|---|---|---|
| **Confirmación** | `rounded-full` (máximo posible) | Envía un formulario o cierra/confirma una acción | `type="submit"`, "Guardar", "Confirmar turno", "Cerrar" de un modal |
| **Conjunto de botones** | `rounded-xl` (~12px) | Navega, selecciona o alterna entre varias opciones | pestañas del dashboard, menús, calendario, acciones de fila en una tabla |

Regla práctica: **si es `type="submit"`, va `rounded-full`.** Y siempre con
estado hover — el manual lo pide explícitamente para el botón secundario
("cambiar de tono al hacer hover"), y en la práctica se aplica a todos.

**En React no se arma: se importa** `Boton` de `hu-kit/componentes`, que trae
las dos formas, las variantes y los tamaños. Lo esencial de lo que tiene
adentro, para Blade o para entender qué hace; la fuente es
`hu-kit/componentes/Boton.jsx`, que además trae los pares `dark:`:

```js
// Todas las variantes llevan borde, transparente si no se ve: así un botón
// mide lo mismo que un campo y se alinea con él en la fila. El anillo de foco
// reemplaza al contorno de `estilos.css`.
const BASE =
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap border transition-colors duration-150 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100';

const FORMAS = {
    confirmacion: 'rounded-full', // default
    grupo: 'rounded-xl',
};

const VARIANTES = {
    primario: 'border-transparent bg-primary text-white hover:bg-primary-light dark:border-white/15', // default
    secundario: 'border-transparent bg-secondary text-primary hover:bg-secondary-light',
    exito: 'border-transparent bg-emerald-700 text-white hover:bg-emerald-800',
    peligro: 'border-transparent bg-red-700 text-white hover:bg-red-800',
    contorno: 'border-primary text-primary hover:bg-primary-faint',
    contornoPeligro: 'border-red-700 text-red-700 hover:bg-red-50',
    contornoExito: 'border-emerald-700 text-emerald-700 hover:bg-emerald-50',
    fantasma: 'border-transparent text-brandText hover:bg-brandText-soft/50',
    fantasmaPeligro: 'border-transparent text-red-700 hover:bg-red-50',
    fantasmaExito: 'border-transparent text-emerald-700 hover:bg-emerald-50',
    suave: 'border-gray-200 bg-canvas text-primary hover:bg-gray-100', // la acción de fila
    contornoSobrePrimario: 'border-white/40 bg-white/10 text-white hover:bg-white/20', // lo secundario sobre `primary`
};

// El tamaño trae el relleno, el texto y el alto del ícono: por eso va con la
// prop `tamano` y no con `className`.
const TAMANOS = {
    normal: 'px-5 py-2.5 text-sm font-semibold', // default, 42 px como un campo
    tactil: 'min-h-11 px-5 py-2.5 text-sm font-semibold',
    compacto: 'px-3 py-1 text-xs font-semibold',
    icono: 'size-11 text-sm font-semibold', // 44 × 44, ícono de 22 px
    iconoCompacto: 'p-1 text-xs font-semibold',
    ingreso: 'px-5 py-[15px] text-sm font-black uppercase tracking-[0.15em] shadow-lg shadow-primary/20',
};
```

Con `href` es un `<Link>` de Inertia, y con `href` y `externo`, un `<a>` común
(una descarga, un PDF): por `<Link>`, Inertia corta con su modal de error. Un
enlace que no puede ser un `Boton` (porque lo dibuja otra pieza) lleva las
mismas clases con `claseBoton({ variante, forma, tamano })`.

Los dos botones de color **aclaran** en hover (`primary` → `primary-light`,
`secondary` → `secondary-light`), que es el "cambiar el botón al hacer hover"
del manual. El dorado lleva texto `primary` y no blanco: blanco sobre
`secondary` da 2,4:1 y `primary` da 5,1:1 (ver el contraste en `colores.md`).

## Sistema de botones

Todo en tipo oración: ningún botón va en mayúscula. El peso lo da la
intención, no el lugar. Una sola acción llena por pantalla o por modal.

| Nivel | Variante | Para qué | Ejemplos |
|---|---|---|---|
| Principal | `primario` | La acción que cierra la tarea | Continuar, Confirmar turno, Guardar |
| Marca | `secundario` | La acción más frecuente del sistema y la principal sobre `primary` | Nuevo turno |
| De fila | `suave` | Lo que se repite en cada fila o tarjeta | Descargar PDF, Pedir turno de una tarjeta |
| Secundaria | `contorno` (`contornoSobrePrimario` sobre azul) | Navega o sale, una vez por pantalla; la salida de un modal destructivo | Ver mis turnos, Mantener turno |
| Terciaria | `fantasma` | Salir sin hacer nada | Volver, la X de un modal |
| Destructiva, disparador | `fantasmaPeligro` | Abre la confirmación | Cancelar de cada fila |
| Destructiva, confirmación | `peligro` | Sólo en el modal que confirma | Sí, cancelar turno |
| Enlace | texto `text-sm font-semibold text-primary` con flecha | Ver más | Ver todos |

- **Tamaño**: en pantallas que se usan con el dedo, todo es `tactil` (44 px de
  alto); la X y las flechas, `icono` (44 × 44). Nada mide menos de 44 px de
  alto. `normal` (42 px, como un campo) queda para las pantallas del personal;
  `compacto` e `iconoCompacto`, para dentro de una tabla densa. El envío del
  ingreso es `ingreso`, la única excepción en mayúscula.
- **Forma**: `confirmacion` en pies de modal y formularios; `grupo` en filas,
  tarjetas, paneles y cabeceras.
- **Íconos**: `icono` va adelante. `arrow_forward` va sólo al final de
  «Continuar» y de un enlace. Un botón sólo con ícono lleva `aria-label`.
- **Foco**: anillo dorado, `ring-2 ring-secondary ring-offset-2`. El aire del
  anillo es `primary` en `secundario` y `contornoSobrePrimario` (van sobre
  azul) y `surface-dark` en oscuro. En oscuro, `primario` suma un borde
  `white/15`: el azul casi no se separa de `surface-dark`.
- **Cargando no se atenúa**: con `opacity-50`, «Descargando…» no llega a 4,5:1.
  `cargando` muestra `progress_activity` girando y `textoCargando` (en
  gerundio), con `aria-busy` y `aria-disabled`, y anula el clic. Las dos
  etiquetas ocupan la misma celda: pasale `textoCargando` siempre, no sólo
  mientras carga, y el botón no cambia de ancho.
- **Deshabilitado** (`disabled`) va con `opacity-50`. Si no es obvio por qué,
  al lado (abajo en el celular) un `text-xs text-gray-500` con
  `aria-live="polite"` dice qué falta.
- **Etiquetas**: verbo y objeto. En cancelar, «Mantener turno» y «Sí, cancelar
  turno», nunca «Sí» y «No».
- **Celular**: los pies de modal van a lo ancho, apilados con la principal
  arriba; en una fila, cada botón `flex-1`.

## Tarjetas (cards)

En React se importa `Tarjeta` de `hu-kit/componentes` (y `marcoTarjeta` para
lo que lleva el mismo marco sin ser una tarjeta con cabecera). Lo que tiene
adentro (`hu-kit/componentes/Tarjeta.jsx`, sin los pares `dark:`):

```
<section class="rounded-2xl border border-brandText-soft/70 bg-white shadow-sm">
  <header class="flex min-h-[61px] flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-brandText-soft/70 px-5 py-2">
    <div class="flex min-w-0 items-center gap-2">
      <h2 class="text-xs font-semibold uppercase tracking-widest text-brandText-muted">Título</h2>  <!-- Rotulo como="h2" -->
      <!-- contador: un Estado -->
    </div>
    <!-- acciones a la derecha -->
  </header>
  <div class="px-5 py-4">
    <!-- contenido -->
  </div>
</section>
```

`rounded-2xl`, borde sutil en `brandText-soft` (o su equivalente al 70% de
opacidad), `shadow-sm` — no sombras más marcadas. La cabecera mide 61 px con o
sin botones, así dos tarjetas vecinas quedan a la par. El título es un
`Rotulo` y va sin ícono.

## Cabecera de sección

`CabeceraSeccion` es el título de una pantalla:

- `titulo` en un `h1 text-2xl font-black uppercase tracking-tight text-primary`,
  que corta una palabra larga sin espacios (`[overflow-wrap:anywhere]`) antes
  de salirse;
- `estado`, opcional, un nodo junto al título (un `Estado`), en un renglón que
  se parte si no entra (`flex flex-wrap items-center gap-x-3 gap-y-1`);
- `mayuscula={false}` saca la mayúscula: es para una ficha, cuyo título es un
  nombre («Juan Pérez»), y el manual no quiere mayúscula en nombres;
- debajo, un filete dorado de 3 × 40 px (`h-[3px] w-10 bg-secondary`), decorativo;
- `subtitulo` opcional en `text-sm text-brandText`: un texto o un nodo con
  íconos en línea;
- `children` a la derecha en escritorio y debajo en el celular: un
  `SelectorDeVista`, un `Buscador` o un botón. `Buscador` toma su ancho de
  `ancho` (por ejemplo `'w-full lg:w-80'`), mide 44 px de alto y su botón de
  borrar también.

Deja `mb-4` hasta lo que sigue. Un título por pantalla: dentro de una tarjeta,
el título es la cabecera de la `Tarjeta`.

## Chip de fecha y separador de mes

- **`FechaChip`**: el mini calendario de una fila, 48 px, con la franja del
  mes en `bg-secondary text-primary` y el día debajo. `pasado` lo apaga (franja
  gris), para lo que ya ocurrió. Es `aria-hidden`: la fila lleva la fecha en
  texto al lado, que es lo que lee el lector de pantalla.
- **`SeparadorDeMes`**: el renglón que abre cada mes en un listado agrupado,
  una franja `bg-canvas/60` con borde abajo, un punto dorado de 6 px y el mes
  en un `Rotulo`. `como="li"` si va dentro de una lista.
- El encabezado de una tabla (`encabezadoTabla`) va sobre `bg-canvas`, con
  `px-5 py-3`.

## Badges / estados

Pastilla `rounded-full` con anillo interior, tono por significado. En React es
`Estado` de `hu-kit/componentes` (paleta completa en `colores.md`):

```
inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs
font-semibold ring-1 ring-inset
```

## z-index — una sola escala para todo lo que compite por estar encima

```js
zIndex: {
    dropdown: '40',
    modal: '100',
    flotante: '110', // un panel anclado (un calendario) que puede abrirse dentro de un modal
    toast: '200',
},
```

La trae el preset de `hu-kit`. No inventes un número suelto (`z-[9999]`,
`z-50` arbitrario) para un menú, modal o toast nuevo — usá uno de éstos. Esto **no** reemplaza los `z-10`/`z-20` locales que dan
elevación dentro de una tarjeta o un header: esos no compiten con nada fuera
de su propio contenedor.

## Marco de la app

En React es `MarcoApp` de `hu-kit/componentes`, envuelto en un `AppLayout` de
cada sistema que le pasa lo suyo ya resuelto: las `secciones` del menú
filtradas por rol, con su `href` (`route()`) y si están `activa`
(`rutaActiva`), el `usuario`, los `enlaces` de su menú y la ruta de `salir`.
Las páginas usan sólo ese `AppLayout`, con `titulo`, `subtitulo` y `ancho`
(`completo`, `lectura` o `formulario`). Un ejemplo completo está en la guía de
`hu-kit` («El puente: el AppLayout de cada sistema», en `catalogo/guia.html`) y
en `sistemabienes/resources/js/Components/UI/AppLayout.jsx`.

Lo que fija, para Blade o para revisar una pantalla:

- Se arma como el *Marco del paciente* (abajo), con un diferencial: el panel es
  `primary-dark` liso, sin el degradado ni el brillo del portal. El paciente
  recibe calidez; el equipo, una herramienta. Es la misma marca, con distinta
  densidad y distinto adorno.
- Panel `w-64`, fijo en escritorio (una columna `sticky top-0 flex h-screen
  flex-col`), en cuatro zonas:
  - el logo blanco `w-36`, enlace al `inicio`, en `border-b border-white/10 px-6
    py-3` con `min-h-12`: 73 px, a la par de la cabecera;
  - el `sistema` en dos niveles, `px-6 pb-1 pt-5`: el nombre en `text-sm
    font-semibold text-white` y la bajada en `text-xs text-white/70`;
  - las secciones (`px-3 py-4`), la única zona que se desplaza;
  - fijo abajo, «Modo oscuro» (`shrink-0 border-t border-white/10 px-3 py-3`),
    una fila como las secciones, `role="switch"` con `aria-checked`: con un
    menú largo no se esconde.
- Cada sección: `min-h-11 rounded-xl px-3 py-2.5 text-sm`, `text-white/70` y
  `hover:bg-white/5`; la activa, `bg-white/10 font-semibold text-white`, con el
  ícono relleno y una raya dorada `h-5 w-1 bg-secondary` a la derecha. Un
  `titulo` abre un grupo con una línea y un rótulo `text-xs uppercase
  tracking-widest`. Una sección sin `href` va atenuada (`text-white/35`). El
  ancho `w-64` y las filas de 44 px se quedan: el menú del personal es largo y
  tiene grupos.
- Cabecera `sticky top-0 z-dropdown`, blanca (`surface-dark` en oscuro), con
  `border-b`, `px-4 py-3 sm:px-6` e interior `min-h-12`: 73 px. No lleva el
  título ni el botón de tema.
  - A la izquierda, en escritorio, **`volver`** (un href, una función o
    `{ href | onClick, etiqueta }`): un botón de 44 px con la flecha y la
    etiqueta (por defecto «Volver») en `text-sm font-semibold text-primary`.
    En el celular, sólo la flecha; la etiqueta queda para el lector de
    pantalla. Va en todos los anchos porque en el personal volver conserva los
    filtros y el historial, y una miga no puede hacer eso.
  - Sin `volver`, a la izquierda va el botón del menú del celular (`bg-canvas`,
    `menu` o `close`); con `volver`, pasa a la derecha, antes de la cuenta.
  - Al centro, en escritorio, las **`migas`**, sólo si la página las pasa
    (`[{ etiqueta, href | onClick }]`, como en el portal). No hay migas
    derivadas del menú: «← Cirugías ›» al lado de la flecha hacía creer que la
    flecha llevaba a Cirugías. En el celular, el logo a color, centrado en la
    cabecera aunque haya dos botones a la derecha.
  - A la derecha, el menú de la cuenta (*Menú de usuario*, abajo).
- El contenido (`p-4 sm:p-6`, el mismo margen que la cabecera, así la flecha y
  el título quedan alineados) entra con `animate-fade-in`, monta el toast
  `Flash` (alias de `AvisoFlotante`) y arranca con una `CabeceraSeccion` con el
  `titulo`, el `subtitulo` y el `estado`. Las secciones van en mayúscula; una
  ficha (la que lleva `volver`), sin mayúscula.
- En el celular, el panel pasa a un desplegable que cuelga de la cabecera
  (`animate-menu-in`, `bg-primary-dark`), con el sistema, las secciones y
  «Modo oscuro». Debajo, un fondo `bg-primary-dark/50` oscurece el contenido y
  cierra el menú al tocarlo. Elegir un ítem lo cierra.
- Accesibilidad: el primer enlace es «Saltar al contenido» (`main#contenido`,
  visible sólo con foco). Con el menú del celular abierto, el foco entra al
  primer ítem, Escape lo cierra y el foco vuelve al botón que lo abrió; el
  `main` queda `inert` y el fondo no se desplaza. Los botones miden 44 px. El
  foco es dorado sobre el panel.

## Marco del paciente

En React es `MarcoPortal` de `hu-kit/componentes`, para el portal de pacientes y
cualquier pantalla con sesión de un paciente. Se arma igual que el marco del
personal; lo que distingue al paciente es el adorno y lo que lleva el panel: el
degradado de `primary` acompaña, y el panel liso del personal es una
herramienta.

- Panel `w-72` a todo el alto, unión recta con el contenido (sin tarjeta, sombra
  ni marco azul alrededor), en un degradado de `primary` a `primary-dark` con un
  brillo decorativo (`bg-glow-white`). La columna interior es `sticky top-0 flex
  h-screen flex-col` y tiene tres zonas: el logo blanco (`w-36`, a la par de la
  cabecera), la `accion` y la `navegacion`; sólo la navegación se desplaza
  (`overflow-y-auto`). `pieDelPanel` (un nodo) es una zona fija abajo, con
  `border-t border-white/10`: para «Contacto y ayuda», que tiene que verse
  siempre aunque la lista sea larga.
- La `accion` destacada (la que el paciente más hace: «Pedir turno») es un
  botón dorado de ancho completo, `rounded-2xl bg-secondary text-primary`
  (5,1:1), de 48 px, con un brillo interno y una sombra.
- La `navegacion` se arma con `SeccionesDelMenu tamano="portal"` (*Fila del
  panel*, abajo). Un ítem puede ser un botón (`onClick`) si sólo cambia lo que
  se muestra.
- Sobre el panel, el texto llega a 4,5:1: dorado sobre la fila activa
  (`white/10`) no alcanza, ahí el texto va en blanco. Todo lo que el sistema
  ponga sobre el azul (pasos, estados) usa `white` y `white/80`, no `gray`.
- Cabecera blanca, no fija (al bajar se va y el panel queda), sólo con
  `border-b`, sin sombra. Mide 73 px, lo mismo que la zona del logo del panel
  (`min-h-12`, el alto del logo, más `py-3` y el borde). A la izquierda van las
  `migas`; a la derecha, el menú de usuario. `encabezado`, un nodo, reemplaza
  a las migas; sin ninguno de los dos, la cabecera muestra `titulo`.
- **`migas`**: `[{ etiqueta, href | onClick }]`, la ruta hasta la pantalla
  («Inicio › Cartilla médica › Cardiología»). Cada una mide 44 px de alto y
  lleva de vuelta, menos la última, que va en `font-semibold text-primary` con
  `aria-current="page"`. Se ven desde `lg`; en el celular, en su lugar, el logo
  centrado. Una miga `externo` (el inicio de otro sistema, como «Portal de
  Pacientes» en el portal de quirofanohu) es un `<a>` común, no un `<Link>`.
- **`volver`**, `{ href, etiqueta, externo }`: en el celular, donde no hay
  migas, una flecha `arrow_back` de 44 px a la izquierda de la cabecera, con
  `aria-label={etiqueta}`. Con ella, el botón del menú pasa a la derecha, antes
  de la cuenta.
- **Sin `navegacion`** no hay panel ni botón de menú: el logo de la cabecera se
  ve en todos los anchos, delante de las migas, y con `inicio` es un enlace
  fuera del teclado, como el del panel.
- En el celular el panel pasa a un desplegable azul que cuelga de la cabecera
  (`animate-menu-in`), con la `accion` arriba; elegir un ítem lo cierra.
  Debajo, un fondo `bg-primary-dark/50` oscurece el contenido y cierra el menú
  al tocarlo. Abierto, el fondo no se desplaza, el contenido queda `inert` y la
  `barraInferior` se oculta. Cerrado, la `barraInferior` (la acción principal,
  siempre a mano) queda fija abajo y deja `pb-28` al contenido y `pb-20` al
  `pie`, para que su final no quede debajo de la barra.
- **`lateral`**: una columna a la derecha del contenido, a todo su alto y fuera
  del margen del `main` (las novedades del inicio del portal). La columna se
  oculta y fija su ancho con sus propias clases (`hidden w-80 xl:flex`); con el
  menú del celular abierto queda `inert`, como el contenido.
- **`conTema`** suma el interruptor «Modo oscuro» al final de la navegación del
  panel (con `mt-auto`, dentro de lo que se desplaza) y del menú del celular:
  una fila como las del panel, `role="switch"` con `aria-checked`, y una
  perilla que se desliza en 200 ms. No hay botón de tema en la cabecera de
  ninguno de los dos marcos. Sin
  panel, el interruptor va en el menú de la cuenta (abajo). Sólo en el
  dashboard con sesión. En oscuro el panel pasa a `surface-dark` con
  `border-white/10`, igual que la cabecera. Ver `modo-oscuro.md`.
- El `pie` es una franja clara (`bg-white`, `dark:bg-surface-dark`) dentro de la
  columna del contenido, nunca `primary`: con el panel azul al costado, un pie
  azul dibujaría una «L».

### Fila del panel

`SeccionesDelMenu tamano="portal"` la dibuja; las clases van acá para quien
arme una propia. Con `tamano="app"` (el de `MarcoApp`) no cambia.

- Fila: `group relative flex min-h-12 w-full items-center gap-3 rounded-2xl px-2
  py-2 text-left text-base leading-snug transition-colors duration-200
  motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-inset focus-visible:ring-secondary`, más el estado.
- Inactiva: `text-white/80 hover:bg-white/5 hover:text-white`.
- Activa (tarjeta elevada): `bg-gradient-to-b from-white/15 to-white/5
  font-semibold text-white ring-1 ring-inset ring-white/10
  shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_12px_28px_-14px_rgba(0,0,0,0.7)]`.
- Círculo del ícono, de 36 px: `flex size-9 shrink-0 items-center justify-center
  rounded-full`. Activo: `bg-white text-primary
  shadow-[0_2px_8px_-2px_rgba(0,0,0,0.5)]` con el ícono relleno. Inactivo:
  `bg-white/5 text-white/85 ring-1 ring-inset ring-white/15`. El ícono es
  `text-xl`.
- Rótulo de grupo: el ítem que lleva `titulo` abre un grupo con un `h2 px-2
  pb-2 pt-6 text-xs font-semibold uppercase tracking-[0.15em] text-white/60`
  (`pt-1` si es el primero).
- Ítem **`externo`**: el nombre del sistema al que sale (`'QuirofanoHU'`), con
  su `href`. Es un `<a>` común, no un `<Link>`, con `open_in_new` al final
  (`text-white/60`) y «(abre QuirofanoHU)» en `sr-only`.
- Un ítem sin `href` ni `onClick` queda atenuado (`text-white/35`): todavía no
  tiene pantalla.
- El texto de la fila no se corta (`min-w-0`, sin `truncate`): pasa a un segundo
  renglón.
- El círculo activo es blanco y no dorado porque el dorado sobre el panel queda
  para la acción principal y para «te toca» (el disco del paso pendiente en
  quirofanohu).

### Menú de usuario

`MenuDeUsuario`, en la cabecera de los dos marcos:

- El botón muestra el nombre (`text-sm font-semibold text-primary`) y, debajo,
  el `rol` en `text-xs text-brandText-muted`, sólo si lo hay; al lado, la
  inicial en un cuadrado `size-11 rounded-xl bg-primary`. En el celular, sólo la
  inicial.
- El menú abre con nombre, `detalle` y correo arriba. `detalle` (el DNI del
  paciente) va sólo ahí, nunca en el botón. El paciente no lleva `rol`.
- Ítems de 44 px, `rounded-xl text-sm font-semibold text-brandText`, con el
  ícono en el mismo color. Con `conTema`, «Modo oscuro» va después de los
  enlaces: un ítem igual, `role="switch"` con `aria-checked` y la perilla a la
  derecha (`primary` prendida, `gray-500` apagada, 3:1 sobre blanco); elegirlo
  no cierra el menú. «Cerrar sesión» va al final, separado por una raya,
  en `red-700` con `logout`, sin mayúscula. Con `salir` en null no aparece.

## Avisos: estado o evento

- Un **estado** (algo que sigue siendo cierto) va en el flujo de la pantalla,
  con `Alerta`: «Cirugía cancelada» en la ficha, el resultado de comprobar la
  disponibilidad.
- Un sistema externo que no respondió es un estado: `Alerta tipo="aviso"
  urgente={false} icono="cloud_off"`, con el nombre del sistema en negrita
  («No pudimos consultar Laboratorio.») y qué significa («Lo que ves puede estar
  incompleto.»). `urgente={false}`: se informa al cargar, no responde a nada que
  se acabe de hacer, y no interrumpe al lector de pantalla.
- Un **evento** (algo que acaba de pasar) es el toast: lo que el controlador
  deja en `flash` (`exito`, `error`, `aviso`, `info`). `MarcoApp` y
  `MarcoPortal` ya lo montan (`AvisoFlotante`, que `Flash` también nombra); una
  página no lo monta.
- Lo que pasa sin ir al servidor se avisa con `useAviso()`: devuelve
  `avisar(tipo, mensaje)`, que llega al `AvisoFlotante` montado.
- El mensaje es un string (una línea) o `{ titulo, detalle }`. El detalle va
  sólo cuando hay una consecuencia que contar.
- Éxito e info se van solos a los 5 s, con una barra que se vacía; se frenan
  con el puntero, el foco o la pestaña oculta. Error y aviso quedan hasta
  cerrarlos. Por eso un mensaje con una instrucción es un `aviso`, y su título
  dice el problema: título «Cirugía cancelada, pero el mail no salió», detalle
  «El cirujano había pedido cancelarla: avisale por otro medio. …».
- Entra subiendo con fundido (`animate-aviso-in`) y sale con fundido
  (`animate-fade-out`).
- Dentro del toast no hay acciones: sólo el botón de cerrar. Se ven tres a la
  vez como mucho, el más urgente arriba.
- El cartel de estado que responde a lo que se acaba de hacer (enviar un
  cuestionario, comprobar la disponibilidad) es una `Alerta tamano="portal"` y
  la vista baja hasta él. Si junto a él aparece un error de lo mismo, el error
  va primero y del mismo tamaño.
- El toast cuelga de `<body>`: ninguna animación ni `overflow` de la pantalla
  lo encierra.

## Solapas, selector de vista y menú de acciones

- **`Solapas`**: una barra con el marco de las tarjetas con las partes de la
  pantalla; la activa lleva `border-b-2 border-secondary-dark` (`border-secondary`
  en oscuro: el dorado sobre blanco da 2,4:1), texto `primary` e
  ícono relleno, y las otras `brandText`. Con `href`, cada solapa reemplaza a
  la anterior en el historial: «Volver» sale de la pantalla, no recorre las
  solapas. Van siempre en un renglón que se desliza de costado, con la activa
  a la vista. Con `alFinal` (lo que va a la derecha, en la misma barra, centrado)
  la barra es como la cabecera de una tarjeta.
- **`SelectorDeVista`**: opciones pegadas en una caja `rounded-xl border p-1`.
  Cada opción mide 44 px de alto (`min-h-11`), en `text-sm font-semibold`; la
  elegida, `bg-primary text-white` (en oscuro, blanca con texto `primary`), las
  otras `brandText` con hover `canvas`. Sólo cambia el color. En el celular la
  caja va a lo ancho y las opciones se reparten, en `text-xs px-3`. Para ver lo
  mismo de otra forma (Mes / Semana / Día), no para navegar a otra cosa.
- **`MenuDeAcciones`**: los tres puntos en un cuadrado del alto de un control
  (`size-control rounded-xl border`), y un panel anclado que flota (`anchor`,
  `z-flotante`), así una tabla con scroll no lo recorta. Las acciones van como
  `ItemDeMenu`; `peligro` las pinta de rojo y `separado` las aparta con una raya.
  Lo que se hace seguido va como `Boton` al lado, no escondido acá. Con `texto`
  el botón dice «Acciones» con una flecha desde 1366 px (debajo, los tres
  puntos); `etiqueta` debe contener ese texto (WCAG 2.5.3).
- **Pantallas de detalle (una ficha)**: volver va en la cabecera del marco, y
  el estado, junto al título; las acciones, en «Acciones» al final de las
  solapas; nada de una franja entre el título y las solapas. Lo que se hace siempre puede ir
  como botón; lo que se hace poco, en el menú.

## Lista vacía

`EstadoVacio` conserva la forma de la tarjeta con datos. Con `enTarjeta` va en
el lugar de la lista, centrado, con `py-10`: la figura, el `titulo` en `text-base
font-semibold` y `children` como texto. La figura es el círculo con `icono` o,
con `ilustracion`, la ruta de un SVG (se carga diferida). `accion` es el botón
que llena el vacío («Pedir un turno»), debajo del texto.

## Calendario

`Calendario` es el calendario siempre abierto, sobre react-day-picker; habla
`YYYY-MM-DD`, como `SelectorFecha`, que toma las mismas celdas.

- La semana arranca el lunes. Cada día es una celda de 44 px con
  `aria-pressed` y su fecha larga como nombre.
- `disponible(fecha)` marca lo que se puede elegir, en `bg-primary-faint`; lo
  demás queda deshabilitado en `text-gray-500 font-normal`. El elegido, `bg-primary
  text-white` (en oscuro, blanco con texto `primary`); hoy, con un anillo dorado.
- `sinPasado` no deja ir a meses pasados. Las flechas del mes son `Boton
  fantasma tamano="icono"`.
- `contenidoDelDia(fecha)` lo pasa a la forma de la agenda: celdas más altas,
  con lo que devuelve dentro («2 libres»), que se lee junto con la fecha.
- No trae marco: lo pone quien lo usa (una `Tarjeta`, el paso de un modal).

## Archivos

`SelectorDeArchivo` es un `Boton` (`forma="grupo"`, `tamano="tactil"` o el que
se le pase) que en computadora abre el explorador y en el celular ofrece «Sacar una foto» o
«Elegir un archivo». `useSubidaDeArchivo` sube de a uno con `router.post` y
`forceFormData`, y da el progreso para una `BarraDeProgreso` (`role=
"progressbar"`) y el error de la fila que la pidió.

## Campos con error

El control con error lleva borde `red-700` (`red-400` en oscuro), también la
casilla; el mensaje va debajo, en `text-xs font-semibold text-red-700`, con el
ícono `error` adelante. `Campo` lo arma.

## Layout de pantallas de autenticación

El login del portal de pacientes (`portal-hospital/resources/js/Pages/Auth/Login.jsx`)
es el modelo de todos los sistemas. **En React no se arma: se usa
`PanelAutenticacion` de `hu-kit/componentes`**, que lo copia medido contra el
portal. La página le pasa sólo los textos y el formulario:

```jsx
<PanelAutenticacion
    tituloPestana="Ingresar"
    nombre={<>Quirofano<br />HU</>}
    bajada="Programación de quirófanos, autorizaciones, …"
    rotulo="Hospital Universitario"
    titulo="Iniciar sesión"
    subtitulo="Accedé con tu usuario del hospital."
>
    <form>
        <Input variante="ingreso" … />
        <Campo variante="ingreso" …><PasswordInput variante="ingreso" … /></Campo>
        <Boton tamano="ingreso" className="w-full">Ingresar</Boton>
    </form>
</PanelAutenticacion>
```

Lo que el componente fija, para Blade o para revisar una pantalla:

- Contenedor `min-h-screen` sobre `canvas`; tarjeta central `max-w-[1000px]
  min-h-[600px] rounded-3xl shadow-2xl`.
- Panel izquierdo `bg-primary p-12`, oculto en mobile (`hidden md:flex md:w-2/5`):
  - los círculos difusos `bg-glow-white` (`h-80 w-80`, `-right-20 -top-20`) y
    `bg-glow-secondary` (`h-40 w-40`, `-right-10 top-20`);
  - el logo blanco a `mb-12 -ml-[5%] h-auto w-4/5 opacity-95`: el margen
    negativo compensa el aire del SVG, y el dibujo arranca alineado con el
    nombre;
  - el nombre del sistema en dos renglones, `font-black uppercase
    leading-tight tracking-tight text-white`, a 48 px desde `xl` (36 px en
    `lg`, 30 px debajo): más angosto, una palabra de nueve letras no entra;
  - una bajada `text-sm font-semibold leading-relaxed text-blue-100/75`;
  - abajo, una raya `h-1 w-8 rounded-full bg-white` y un rótulo `text-[10px]
    font-semibold uppercase tracking-[0.2em] text-white/70`.
- Panel derecho (`md:w-3/5`, `p-8 lg:p-12`), con la columna en `max-w-md`; en
  mobile, el logo de uso diario a `w-32` arriba:
  - la columna mide `md:min-h-[445px]`, el alto del formulario del portal, y el
    contenido arranca arriba: el título cae a la misma altura que en el portal
    aunque el formulario sea más corto;
  - título `mb-2 text-3xl font-black tracking-tight text-primary` y subtítulo
    `text-sm font-semibold text-brandText`, con `mb-10` hasta el formulario;
  - etiquetas `text-[11px] font-black uppercase tracking-widest
    text-brandText`, a 8 px del campo (`Campo variante="ingreso"`, con su
    `<label for>`);
  - campos `rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm
    font-semibold text-primary placeholder:text-gray-400
    focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10`;
  - el botón `tamano="ingreso"`: 52 px de alto, `font-black uppercase
    tracking-[0.15em]` con `shadow-lg shadow-primary/20`;
  - los enlaces secundarios (registrarse, recuperar la clave, ir a otro
    ingreso) en dorado: `font-semibold text-secondary-dark hover:underline`.

Este panel es la única excepción a las reglas de tamaño y contraste
(`estilos/README.md`, *La excepción: el panel de ingreso*): el rótulo de 10 px,
las etiquetas de 11 px y el placeholder y el ojito en `gray-400` son los del
portal. Lo único que no se copia es el enlace en `text-secondary`, que sobre
blanco da 2,4:1.

## Modales

`Modal` es el diálogo para un formulario corto, sobre `@headlessui/react`:

- Panel `rounded-2xl` de hasta `90vh`; el cuerpo se desplaza, la cabecera y el
  pie no.
- Cabecera `px-6 py-4 border-b`: `rotulo` opcional arriba (un `Rotulo`), el
  título en `text-base sm:text-lg font-black uppercase`, en hasta dos renglones
  (sin cortar), y la X, un `Boton fantasma tamano="icono"`. Títulos cortos:
  «Ya tenés turno»; el detalle va en el cuerpo.
- `pie`, un nodo con los botones: `px-6 py-4 border-t`, apilados en el celular
  con el último arriba, en fila a la derecha desde `sm`.
- El fondo es `primary/60` (`black/80` en oscuro). Al abrir, fundido y escala
  95 → 100 en 200 ms; al cerrar, sólo fundido en 150 ms: el contenido sigue
  dibujado hasta que se va.

## Confirmar una acción destructiva

Nunca `window.confirm()`. Un modal con `@headlessui/react`
(`Dialog`/`DialogBackdrop`/`DialogPanel`/`DialogTitle`, v2) — trae portal,
focus trap, scroll lock y cierre por Escape/click-afuera resueltos. No
reimplementar nada de eso a mano. En React es `ModalConfirmar` más el hook
`useConfirmacion`, los dos de `hu-kit/componentes`: un solo estado por modal,
y el dato en `null` ya significa cerrado.

```jsx
const { confirmar, props } = useConfirmacion();

confirmar({
    titulo: '¿Cancelar el turno?',
    rotulo: 'Cancelar turno',
    detalle: 'El horario queda libre para otro paciente.',
    textoAceptar: 'Sí, cancelar turno',
    textoCancelar: 'Mantener turno',
    textoProcesando: 'Cancelando…',
    accion: (router) => router.patch(route('turnos.cancelar', turno)),
});

<ModalConfirmar {...props} />
```

- `max-w-lg`, con la cabecera de `Modal`; el `rotulo` va en `red-700`.
- El cuerpo es `detalle` (un texto) y, si hace falta más, `children` (lo que
  se cancela, por ejemplo).
- El pie, en dos columnas iguales desde `sm`: `contorno` con `textoCancelar` y
  `peligro` con `textoAceptar`, los dos `confirmacion` y `tactil`. En el
  celular, apilados con la destructiva arriba.
- Mientras corre la acción, la destructiva queda `cargando` con
  `textoProcesando` (por defecto, «Confirmando…»).
- Al cerrarse, el diálogo se desvanece con los textos del último pedido, no
  vacío.

En Blade el equivalente es un `<dialog>` nativo montado una sola vez a nivel
de layout, con cada disparador declarando su copia en atributos `data-*`.

## Animaciones

Las trae el preset de `hu-kit` (`estilos/tailwind.js`):

| Utilidad | Qué hace | Tiempo | Dónde |
|---|---|---|---|
| `animate-fade-in` | Fundido, sólo opacidad | 150 ms (`-lento`, 200 ms) | El contenido al cambiar de sección |
| `animate-fade-out` | Fundido de salida | 150 ms | La salida del aviso |
| `animate-escala-in` | Fundido y escala 95 → 100 | 200 ms | El panel de un modal propio |
| `animate-paso-adelante`, `animate-paso-atras` | Fundido y 16 px desde la derecha o la izquierda | 200 ms | Un paso de un asistente, según la dirección |
| `animate-aviso-in` | Fundido subiendo 8 px | 200 ms | La entrada del aviso |
| `animate-menu-in` | Fundido bajando 4 px | 150 ms | Los menús desplegables |
| `animate-barra-tiempo` | `scaleX` de 1 a 0, lineal | 5 s | Una barra de tiempo |

- Sólo `opacity`, `transform` y color; nunca alto ni ancho. Nada pasa de
  200 ms, salvo una barra que marca un tiempo.
- El hover cambia sólo el color o el fondo (150 ms); un botón apretado,
  `active:scale-98`.
- **El tiempo del aviso va en JS**, con pausa por puntero y foco, no atado al
  fin de una animación: con «reducir movimiento» las animaciones duran 0,01 ms
  y el aviso se cerraría al instante.
- `estilos.css` apaga todas con «reducir movimiento»: no hace falta un
  `motion-reduce:` por pieza.
- Afuera: `animate-ping`, `hover:-translate-*` y el zoom de imágenes.

## Rendimiento

Para cualquier sistema:

- Lo pesado y lo que no se ve al entrar se carga diferido (`lazy()`): un área
  que usa un solo rol, un modal grande, un catálogo de datos.
- Las imágenes bajo el pliegue llevan `loading="lazy"` y `decoding="async"`, y
  su `aspect-ratio`, para que no empujen al cargar.
- Una sola copia de React, Inertia y Headless UI: las pone el sistema, y
  hu-kit las pide como `peerDependencies`.
- Lo que el marco monta en todas las pantallas no usa `Menu`, `Popover`,
  `Listbox` ni `Combobox` de Headless UI: traen floating-ui aunque no usen
  `anchor`. Por eso `MenuDeUsuario` es un botón con `aria-expanded`.
- Montserrat sólo en 400, 600 y 900, y un solo archivo de íconos, el de hu-kit.
- Un esqueleto mide y pinta lo mismo que lo que reemplaza: si no, la pantalla
  salta al llegar los datos (CLS).

## Logo

Nunca un `<img src="...">` a mano — un solo componente (`ApplicationLogo` de
`hu-kit/componentes`, que trae los SVG) que sabe qué archivo corresponde a cada
fondo:

- **Isologotipo de uso diario** (a color) — pantallas, web, cartelería. Es el
  default.
- **Variante blanca** — sobre `primary` o cualquier fondo oscuro.
- **Isologotipo institucional** (con la firma "Dra. María Victoria Gómez de
  Erice") — **sólo** para documentos formales (PDFs, membretes). Nunca en
  pantalla. Si armás el componente de logo de un sistema nuevo, ni siquiera
  expongas esta variante como prop disponible para pantalla — que sólo la use
  el generador de PDF.
