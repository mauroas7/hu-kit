# hu-kit

Fuente de verdad versionada de las convenciones que comparten los sistemas del
Hospital Universitario. Trae tres cosas:

- **`estilos/`, la marca como código** — un preset de Tailwind, los estilos
  base y las fuentes, que cada sistema instala como dependencia npm fijada a un
  tag. Es lo que hace que los sistemas se vean iguales sin copiarse valores.
  Uso, versiones y decisiones en [`estilos/README.md`](estilos/README.md); qué
  trae cada versión, en [`CHANGELOG.md`](CHANGELOG.md).
- **`componentes/`, los componentes de React** que comparten los sistemas,
  en el mismo paquete (`hu-kit/componentes`). Ver *Componentes*, abajo.
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
    análisis ya hecho en `quirofanohu/docs/analisis/convenciones-portal.md`.

## Qué se versiona dónde

Las skills son configuración de Claude Code de quien programa: **no se
versionan en los proyectos**. Cada proyecto ignora `CLAUDE.md` y `.claude/` en
su `.gitignore`, y cada quien instala las skills en su usuario.

El paquete sí entra en cada proyecto, pero como dependencia en su
`package.json` (`github:mauroas7/hu-kit#vX.Y.Z`), nunca como archivos copiados.
Trae sólo `estilos/` y `componentes/`: las skills no llegan al proyecto.

Lo que sí se versiona en cada proyecto es **la regla**: como documentación en
su `docs/` y, cuando se puede, como test. `portal-hospital` dejó sus reglas sólo
en `CLAUDE.md` locales y el costo quedó documentado en
`quirofanohu/docs/analisis/convenciones-portal.md`: esas reglas no existían para
nadie que clonara el proyecto. La documentación y los tests resuelven eso sin
obligar a nadie a usar Claude.

## Componentes

```jsx
import { Boton, Input, PanelAutenticacion } from 'hu-kit/componentes';
```

| Componente | Qué es |
|---|---|
| `PanelAutenticacion` | La pantalla de ingreso, copiada del login del portal de pacientes. La página le pasa los textos y el formulario |
| `Boton` | Las dos formas del manual (`confirmacion`, `grupo`), las variantes de color y los tamaños, `ingreso` incluido |
| `Campo`, `claseControl` | La etiqueta, la ayuda y el error de un campo, y la clase del control. Variantes `normal` e `ingreso` |
| `Input`, `PasswordInput`, `Textarea` | El campo de texto, el de contraseña con el ojito y el de varias líneas |
| `Select` | El desplegable; recibe un mapa plano `{ valor: etiqueta }` |
| `Checkbox`, `claseCasilla` | La casilla, y su clase para una casilla o un radio sueltos |
| `SelectorFecha` | El único calendario: habla `YYYY-MM-DD`, nunca un `type="date"` del navegador |
| `Tarjeta`, `marcoTarjeta` | El contenedor de contenido con su cabecera, y el marco para lo que no es una tarjeta con cabecera |
| `Estado` | La píldora de estado, por tono (`exito`, `error`, `aviso`, `info`, `neutro`) |
| `EstadoVacio` | Lo que se muestra cuando una lista o un paso no tienen nada |
| `Alerta` | El aviso en el flujo de la pantalla, por tipo |
| `Rotulo` | El texto chico en mayúsculas que nombra lo que sigue |
| `Metrica` | El número grande de un panel, con su etiqueta y su detalle |
| `Paginador` | La paginación de un listado, a partir del paginador de Laravel |
| `encabezadoTabla`, `cuerpoTabla`, `renglonTabla` | Las clases de una tabla de datos |
| `Modal` | El diálogo para un formulario corto |
| `ModalConfirmar`, `useConfirmacion` | La confirmación de una acción destructiva y su estado |
| `Icono` | Material Symbols Outlined; `relleno` para la sección activa |
| `ApplicationLogo` | El isologotipo, con el archivo que corresponde a cada fondo |
| `ThemeProvider`, `useTheme`, `ThemeToggle` | El modo claro/oscuro, sin persistir; el sistema monta el provider en `app.jsx` |
| `ErrorBoundary` | La pantalla de error en vez de una página en blanco; envuelve la app en `app.jsx` |
| `aFecha`, `fechaCompleta`, `fechaIso` | Las fechas que usa `SelectorFecha`: leer una fecha sin correrse de día, mostrarla y volver a `YYYY-MM-DD` |

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

Para probar en un sistema un cambio todavía sin publicar (`npm pack`, ver
`estilos/README.md`), Vite se arranca con `npx vite --force`: si no, sigue
sirviendo los componentes que tenía pre-empaquetados. Con el tag publicado no
hace falta, porque el cambio del lock lo obliga a rearmarlos.

El stack de los sistemas es Laravel + Inertia 2 + React 18 + Tailwind 3. Lo que
es propio de un sistema —su menú, sus pantallas, su dominio— no va acá.

## Instalar o actualizar las skills

```powershell
C:\laragon\www\hu-kit\instalar.ps1
```

Las copia a `%USERPROFILE%\.claude\skills\`, donde Claude Code las encuentra en
cualquier sistema del hospital. Cuando cambie algo acá, se vuelve a correr el
mismo comando: no se propaga solo. Con `-Destino <proyecto>` las copia a
`.claude/skills/` de ese proyecto, que tiene que estar en su `.gitignore`.

## Sobre el PDF del manual

El Manual de Marca HU original (10 páginas) vive en
`portal-hospital/docs/manuales/Manual de Marca HU.pdf`, fuera de ese repo
(está en su `.gitignore`). No se copió acá para no duplicar un binario de
~1.2MB en un segundo repo — `skills/marca-hu/references/` ya tiene todo lo que
dice el manual transcripto y con ejemplos de código, así que no hace falta
abrir el PDF para trabajar con esto. Si el manual cambia alguna vez, el lugar
donde actualizar es acá.

## Qué falta

- **portal-hospital todavía no usa `estilos/`**: tiene su `tailwind.config.js`
  propio, con los valores de antes de la `v1.0.0` y sin los tonos de contraste.
  Adoptarlo es instalar la dependencia, cargar el preset y borrar lo que el
  paquete ya trae.
- **El marco de la app** (`AppLayout`, la barra lateral, el menú de la cuenta,
  los avisos del servidor) sigue en `quirofanohu/resources/js/Components/UI/`:
  depende de las rutas y del menú de ese sistema, y para mudarlo el menú tiene
  que entrar como prop.

Fuera de eso, si un sistema nuevo revela una convención que no
está acá (una regla de arquitectura, un patrón de marca), el lugar para
agregarla es este repo, no el `CLAUDE.md` personal de nadie — así el
próximo sistema la hereda también.
