# hu-kit

Fuente de verdad versionada de las convenciones que comparten los sistemas del
Hospital Universitario. Trae tres cosas:

- **`estilos/`, la marca como código** — un preset de Tailwind, los estilos
  base y las fuentes, que cada sistema instala como dependencia npm fijada a un
  tag. Es lo que hace que los sistemas se vean iguales sin copiarse valores.
  Uso, versiones y decisiones en [`estilos/README.md`](estilos/README.md); qué
  trae cada versión, en [`CHANGELOG.md`](CHANGELOG.md).
- **`componentes/`, los componentes de React** que comparten los sistemas,
  en el mismo paquete (`hu-kit/componentes`), con el marco de la app incluido.
  Ver *Componentes*, abajo; se ven armados en el catálogo (*Catálogo y guía*).
- **Dos skills de [Claude Code](https://claude.com/claude-code)**, para quien
  programa con Claude:

  - **`skills/marca-hu/`** — el Manual de Marca HU (colores, tipografía,
    botones, íconos, tono de la copy) destilado en una skill, con ejemplos
    reales sacados de `portal-hospital` (la implementación más fiel al manual) y
    de `quirofanohu/StartMed`.
  - **`skills/arquitectura-hu/`** — convenciones de backend (capas
    Controller→Service→I/O, cómo se escribe un service, manejo de errores y
    logging, modelos y migraciones, validación, nombres, comentarios, tests de
    arquitectura), generalizadas a partir del backend de `portal-hospital` y del
    análisis ya hecho en quirofanohu, que ese repo ya no tiene en `docs/` y se
    recupera con `git show d8d24d5:docs/analisis/convenciones-portal.md`.

## Qué se versiona dónde

Las skills son configuración de Claude Code de quien programa: **no se
versionan en los proyectos**. Cada proyecto ignora `CLAUDE.md` y `.claude/` en
su `.gitignore`, y cada quien instala las skills en su usuario.

El paquete sí entra en cada proyecto, pero como dependencia en su
`package.json` (`github:mauroas7/hu-kit#vX.Y.Z`), nunca como archivos copiados.
Trae sólo `estilos/` y `componentes/`: las skills no llegan al proyecto.

Lo que sí se versiona en cada proyecto es **la regla**: como documentación en
su `docs/` y, cuando se puede, como test. `portal-hospital` dejó sus reglas sólo
en `CLAUDE.md` locales y el costo quedó documentado en el análisis de
quirofanohu (`git show d8d24d5:docs/analisis/convenciones-portal.md` en ese
repo): esas reglas no existían para nadie que clonara el proyecto. La documentación y los tests resuelven eso sin
obligar a nadie a usar Claude.

## Componentes

```jsx
import { Boton, Input, PanelAutenticacion } from 'hu-kit/componentes';
```

| Componente | Qué es |
|---|---|
| `MarcoApp` | El marco de toda pantalla con sesión: barra lateral, encabezado, menú de la cuenta y `Flash`. Recibe todo resuelto (`secciones` con `href` y `activa`, `usuario`, `enlaces`, `salir`): cada sistema lo envuelve en su `AppLayout` (ver *Lo que pide el sistema*) |
| `MenuDeUsuario` | El menú de la cuenta del encabezado, suelto para otro marco: nombre, `detalle` (o `rol`), los `enlaces` y cerrar sesión (`salir`; en null, sin salida) |
| `rutaActiva`, `rutaActual` | En qué ruta de Ziggy se está: un patrón terminado en `.` es un prefijo. Para marcar la sección `activa` del menú |
| `PanelAutenticacion` | La pantalla de ingreso, copiada del login del portal de pacientes. La página le pasa los textos y el formulario |
| `Boton`, `claseBoton` | Las dos formas del manual (`confirmacion`, `grupo`), las variantes de color y los tamaños, `portal` e `ingreso` incluidos; `claseBoton` da sus clases para un enlace que no puede ser un `Boton` |
| `Campo`, `claseControl`, `descritoPor` | La etiqueta, la ayuda y el error de un campo, la clase del control y su `aria-describedby`, para un control propio adentro de `Campo`. Variantes `normal` e `ingreso` |
| `Input`, `PasswordInput`, `Textarea` | El campo de texto, el de contraseña con el ojito y el de varias líneas |
| `Select` | El desplegable; recibe pares `[valor, etiqueta]` en el orden en que se muestran. Un mapa `{ valor: etiqueta }` con claves numéricas, como el de un `pluck('nombre', 'id')`, se muestra ordenado por clave |
| `Checkbox`, `claseCasilla` | La casilla, y su clase para una casilla o un radio sueltos |
| `SelectorFecha` | El único calendario: habla `YYYY-MM-DD`, nunca un `type="date"` del navegador |
| `Buscador` | El campo de búsqueda con lupa y botón para borrar. `onChange` recibe el texto, como `SelectorFecha` |
| `Tarjeta`, `marcoTarjeta` | El contenedor de contenido con su cabecera, y el marco para lo que no es una tarjeta con cabecera |
| `Estado` | La píldora de estado, por tono (`exito`, `error`, `aviso`, `info`, `neutro`) |
| `EstadoVacio` | Lo que se muestra cuando una lista o un paso no tienen nada |
| `Cargando` | Lo que se muestra mientras llega algo; `enTarjeta` ocupa el lugar de una lista, también como `fallback` de un `<Deferred>` |
| `Alerta` | El aviso en el flujo de la pantalla, por tipo. `error` y `aviso` interrumpen al lector de pantalla (`alert`); `exito` e `info`, no (`status`) |
| `Flash` | Los mensajes de `flash` que dejó el controlador, como `Alerta`. `MarcoApp` ya lo trae |
| `AvisoFlotante` | El mismo `flash`, flotando abajo: el éxito se va solo a los 5 s, un error queda hasta que se cierra |
| `Rotulo` | El texto chico en mayúsculas que nombra lo que sigue; `tono="texto"` para el portal de pacientes |
| `Dato` | Un dato de una ficha: el rótulo arriba y el valor, o `siFalta` atenuado |
| `Metrica` | El número grande de un panel, con su etiqueta y su detalle |
| `Paginador` | La paginación de un listado, a partir del paginador de Laravel |
| `encabezadoTabla`, `cuerpoTabla`, `renglonTabla` | Las clases de una tabla de datos |
| `Solapas` | Las partes de una pantalla larga. Con `href`, cada solapa reemplaza a la anterior en el historial; con `onClick`, cambia sin visitar |
| `SelectorDeVista` | Opciones pegadas para ver lo mismo de otra forma (Mes / Semana / Día), con las mismas `opciones` que `Solapas` |
| `MenuDeAcciones`, `ItemDeMenu` | Las acciones que no entran como botón, detrás de los tres puntos. El panel flota anclado: una tabla con scroll no lo recorta |
| `Modal` | El diálogo para un formulario corto |
| `ModalConfirmar`, `useConfirmacion` | La confirmación de una acción destructiva y su estado |
| `SelectorDeArchivo` | El botón para elegir un archivo; en el celular ofrece también sacar una foto |
| `useSubidaDeArchivo` | Una subida por vez con Inertia, con su progreso y el error de la fila que la pidió |
| `BarraDeProgreso` | Cuánto lleva algo que tarda, de 0 a 100 |
| `Icono` | Material Symbols Outlined; `relleno` para la sección activa |
| `ApplicationLogo` | El isologotipo, con el archivo que corresponde a cada fondo |
| `ThemeProvider`, `useTheme`, `ThemeToggle` | El modo claro/oscuro, sin persistir; el sistema monta el provider en `app.jsx`. Vuelve a claro cuando cambia el usuario, que lee de cada página con `usuarioDe` (por defecto, `auth.usuario.id`) |
| `ErrorBoundary` | La pantalla de error en vez de una página en blanco; envuelve la app en `app.jsx`. `onError(error, info)` le avisa al sistema, para registrarlo en su backend |
| `aFecha`, `fechaCompleta`, `fechaIso` | Las fechas que usa `SelectorFecha`: leer una fecha sin correrse de día, mostrarla y volver a `YYYY-MM-DD` |
| `institucional` | Los datos de contacto del hospital: dirección, teléfono, correo y WhatsApp de turnos. Si cambia uno, se publica una versión |

Y fuera de los componentes, `hu-kit/tokens` exporta los `colores` del preset para
lo que no lee clases, como la barra de progreso de Inertia
(`colores.secondary.DEFAULT`).

Viajan como código fuente (`.jsx`) y los compila el Vite del sistema, en el
build y en desarrollo. Lo que pide el sistema que los usa:

- **`content` de Tailwind** incluye
  `'./node_modules/hu-kit/componentes/**/*.{js,jsx}'`. Sin esa línea, Tailwind
  no ve las clases de los componentes y no las genera: un ícono, por ejemplo,
  sale como el texto de su nombre.
- **React, Inertia, Headless UI y `react-day-picker`** los pone el sistema
  (`peerDependencies`): el paquete no trae los suyos, así que hay una sola copia
  y los hooks y contextos funcionan.
- **El plugin `@tailwindcss/forms` ya viene en el preset**: el sistema no lo
  agrega en su config, o se registra dos veces.
- **El backend comparte `auth.usuario` y `flash`** desde
  `HandleInertiaRequests::share()`: `auth.usuario` con su `id` (lo lee el tema),
  y `flash` con `exito`, `error`, `aviso` e `info` (los leen `Flash` y
  `AvisoFlotante`).
- **Un `AppLayout` propio sobre `MarcoApp`.** El marco no conoce el menú, los
  roles ni las rutas de nadie. El sistema le pasa sus secciones con el `href`
  ya armado con `route()` y `activa` con `rutaActiva`, el usuario, «Mi cuenta» y
  la ruta de salida, y sus páginas usan sólo ese `AppLayout`. Un ejemplo
  completo, en la guía (`docs/guia-hu-kit.pdf`) y en
  `sistemabienes/resources/js/Components/UI/AppLayout.jsx`.

Para probar en un sistema un cambio todavía sin publicar (`npm pack`, ver
`estilos/README.md`), Vite se arranca con `npx vite --force`: si no, sigue
sirviendo los componentes que tenía pre-empaquetados. Con el tag publicado no
hace falta, porque el cambio del lock lo obliga a rearmarlos.

El stack de los sistemas es Laravel + Inertia 2 + React 18 + Tailwind 3. Lo que
es propio de un sistema —su menú, sus pantallas, su dominio— no va acá.

## Catálogo y guía

**El catálogo** (`catalogo/`) es una página que muestra armadas todas las piezas,
en claro y en oscuro, más las pantallas de un sistema inventado, «Pedidos HU»:
un tablero, un listado, un formulario, un detalle y el ingreso. No tiene
servidor: la página de Inertia se arma en el navegador y cada visita cambia de
sección sin pedir nada. Sirve para mirar qué hay antes de armar una pantalla y
para probar un cambio sin instalarlo en un sistema.

```bash
npm install
npm run catalogo
```

Con `?seccion=listado&tema=oscuro` se abre directo una sección y un tema. No
llega a los sistemas: `files` publica sólo `estilos/` y `componentes/`.

**La guía** (`docs/guia-hu-kit.pdf`) es para el equipo, sin Claude de por
medio: qué es cada pieza, cómo se ve un sistema del hospital, cómo se arranca
uno nuevo y cómo se acopla hu-kit a uno que ya existe. La fuente es
`catalogo/guia.html`, y las capturas salen del catálogo. Cuando cambia una
pieza, se regenera:

```bash
npm run guia
```

Compila el catálogo, lo levanta, saca las capturas con Edge sin ventana e
imprime la guía. Otro navegador basado en Chromium sirve igual, con su ruta en la
variable `NAVEGADOR`.

## Instalar o actualizar las skills

```powershell
C:\laragon\www\hu-kit\instalar.ps1
```

Las copia a `%USERPROFILE%\.claude\skills\`, donde Claude Code las encuentra en
cualquier sistema del hospital. Cuando cambie algo acá, se vuelve a correr el
mismo comando: no se propaga solo. Con `-Destino <proyecto>` las copia a
`.claude/skills/` de ese proyecto, que tiene que estar en su `.gitignore`.

## Sobre el PDF del manual

El Manual de Marca HU original (10 páginas) vive en el repo privado
`hu-referencias`, en `manual-de-marca/`: este repo es público y el manual es un
documento interno del hospital. `skills/marca-hu/references/` ya tiene todo lo
que dice el manual transcripto y con ejemplos de código, así que no hace falta
abrir el PDF para trabajar con esto. Si el manual cambia alguna vez, se
reemplaza en `hu-referencias` y se actualiza acá lo que cambie.

## Qué falta

- **portal-hospital todavía no usa `estilos/`**: tiene su `tailwind.config.js`
  propio, con los valores de antes de la `v1.0.0` y sin los tonos de contraste.
  Adoptarlo es instalar la dependencia, cargar el preset y borrar lo que el
  paquete ya trae.
- **La plantilla, `hu-plantilla`**: un sistema vacío con hu-kit ya montado,
  login, roles, tests de convenciones y `docs/`, para copiar al arrancar un
  sistema nuevo. Qué va a traer y cómo se va a usar, en la guía.

Fuera de eso, si un sistema nuevo revela una convención que no
está acá (una regla de arquitectura, un patrón de marca), el lugar para
agregarla es este repo, no el `CLAUDE.md` personal de nadie — así el
próximo sistema la hereda también.
