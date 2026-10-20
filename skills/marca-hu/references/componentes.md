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
las dos formas, las variantes y los tamaños. Esto es lo que tiene adentro
(`hu-kit/componentes/Boton.jsx`, sin los pares `dark:`), para Blade o para
entender qué hace:

```js
const BASE =
    'inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50';

const FORMAS = {
    confirmacion: 'rounded-full', // default
    grupo: 'rounded-xl',
};

const VARIANTES = {
    primario: 'bg-primary text-white hover:bg-primary-light',
    secundario: 'bg-secondary text-primary hover:bg-secondary-light',
    contorno: 'border border-primary text-primary hover:bg-primary-faint',
    fantasma: 'text-brandText hover:bg-brandText-soft/50',
    peligro: 'bg-red-700 text-white hover:bg-red-800',
};
```

Los dos botones de color **aclaran** en hover (`primary` → `primary-light`,
`secondary` → `secondary-light`), que es el "cambiar el botón al hacer hover"
del manual. El dorado lleva texto `primary` y no blanco: blanco sobre
`secondary` da 2,4:1 y `primary` da 5,1:1 (ver el contraste en `colores.md`).

En las pantallas que se usan con el dedo (los portales de pacientes), el botón
mide 44 px de alto como mínimo: es un tamaño propio (`tamano="tactil"`), no un
`min-h-*` desde afuera. El botón ancho en mayúsculas del login es
`tamano="ingreso"` (ver *Layout de pantallas de autenticación*).

## Tarjetas (cards)

En React se importa `Tarjeta` de `hu-kit/componentes` (y `marcoTarjeta` para
lo que lleva el mismo marco sin ser una tarjeta con cabecera). Lo que tiene
adentro (`hu-kit/componentes/Tarjeta.jsx`, sin los pares `dark:`) —
cabecera opcional con ícono y acciones, cuerpo con padding uniforme:

```
<section class="rounded-2xl border border-brandText-soft/70 bg-surface shadow-sm">
  <header class="flex items-center justify-between gap-4 border-b border-brandText-soft/70 px-5 py-4">
    <h2 class="flex items-center gap-2 text-sm font-semibold text-primary">
      <!-- ícono relleno, texto primary -->
    </h2>
    <!-- acciones a la derecha -->
  </header>
  <div class="px-5 py-4">
    <!-- contenido -->
  </div>
</section>
```

`rounded-2xl`, borde sutil en `brandText-soft` (o su equivalente al 70% de
opacidad), `shadow-sm` — no sombras más marcadas. El título de la cabecera es
`primary` en `font-semibold` (no `font-black`: eso es para títulos cortos de
página, no para cabeceras de tarjeta).

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
    font-semibold uppercase tracking-[0.2em] text-blue-100/50`.
- Panel derecho (`md:w-3/5`, `p-8 lg:p-12`), con la columna en `max-w-md`; en
  mobile, el logo de uso diario a `w-32` arriba:
  - la columna mide `md:min-h-[445px]`, el alto del formulario del portal, y el
    contenido arranca arriba: el título cae a la misma altura que en el portal
    aunque el formulario sea más corto;
  - título `mb-2 text-3xl font-black tracking-tight text-primary` y subtítulo
    `text-sm font-semibold text-brandText`, con `mb-10` hasta el formulario;
  - etiquetas `text-[11px] font-black uppercase tracking-widest
    text-brandText`, a 8 px del campo (`Campo variante="ingreso"`);
  - campos `rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm
    font-semibold text-primary placeholder:text-gray-400
    focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10`;
  - el botón `tamano="ingreso"`: 52 px de alto, `font-black uppercase
    tracking-[0.15em]` con `shadow-lg shadow-primary/20`;
  - los enlaces secundarios (registrarse, recuperar la clave, ir a otro
    ingreso) en dorado: `font-semibold text-secondary-dark hover:underline`.

Este panel es la única excepción a las reglas de tamaño y contraste
(`estilos/README.md`, *La excepción: el panel de ingreso*): el rótulo de 10 px
en `blue-100/50` (3,6:1), las etiquetas de 11 px y el placeholder y el ojito en
`gray-400` son los del portal. Lo único que no se copia es el enlace en
`text-secondary`, que sobre blanco da 2,4:1.

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
    titulo: 'Cancelar la cirugía',
    detalle: 'El quirófano queda libre.',
    accion: (router) => router.patch(route('cirugias.cancelar', cirugia)),
});

<ModalConfirmar {...props} />
```

En Blade el equivalente es un `<dialog>` nativo montado una sola vez a nivel
de layout, con cada disparador declarando su copia en atributos `data-*`.

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
