# Colores

## Los tres colores del manual (no negociables)

| Token | Hex | Pantone | Qué es |
|---|---|---|---|
| `primary` | `#003764` | 2955 C | Color principal |
| `secondary` | `#C7A36E` | 465 M | Color secundario |
| `brandText` | `#59595b` | — | Gris del texto del logotipo |

Estos tres valores **no se tocan**. Todo lo demás de la paleta (variantes
`dark`/`light`/`soft`/`faint`, `canvas`, `surface`) es derivado de UI, amparado
en la cláusula del propio manual: *"lo más óptimo es utilizar los colores
institucionales, pero en casos especiales se puede adaptar a un color
distinto"*. Un tono derivado nuevo se agrega con nombre al preset de `hu-kit`
— nunca como valor arbitrario en una clase, ni en el config de un solo sistema.

## Paleta completa

La paleta es la del preset de `hu-kit` (los valores, en `hu-kit/estilos/tokens.js`;
para JavaScript, `import { colores } from 'hu-kit/tokens'`): no se
copia a cada sistema, se instala. Éstos son sus valores; para cambiar uno o
agregar un tono, se cambia ahí y se publica un tag nuevo.

```js
colors: {
    primary: {
        DEFAULT: '#003764', // ★ MANUAL — Pantone 2955 C
        dark: '#00284A',    // hover / active sobre fondo claro
        light: '#0B457F',   // hover del botón primario; anillo de foco
        soft: '#D8E3ED',    // fondo de estado sobre canvas
        faint: '#EEF3F8',   // fondo de sección, hover de botón contorno
        bright: '#5B8CC2',  // relleno en modo oscuro: 5,3:1 sobre `surface-dark`
    },
    secondary: {
        DEFAULT: '#C7A36E', // ★ MANUAL — Pantone 465 M. Como texto, sólo sobre `primary`.
        light: '#D4B07B',   // el manual pide cambio de tono en hover
        dark: '#85693E',    // el dorado para texto sobre fondo claro
        faint: '#F8F2E8',   // fondo de estado dorado
    },
    brandText: {
        DEFAULT: '#59595b', // ★ MANUAL — gris del texto del logotipo
        dark: '#D1D5DB',    // texto en modo oscuro
        muted: '#6D6D6F',   // texto secundario
        mutedDark: '#9CA3AF', // texto secundario en modo oscuro
        soft: '#D7D7D8',    // bordes y separadores
    },
    canvas:  { DEFAULT: '#F4F7F9', dark: '#001A33' }, // fondo neutro de la app
    surface: { DEFAULT: '#FFFFFF', dark: '#001526' }, // tarjetas y modales; en oscuro, más profundo que canvas
},
```

`secondary-dark` y `brandText-muted` eran `#AB8850` y `#8B8B8D` hasta la
`v1.0.0` del paquete: los dos quedaban por debajo de 4,5:1 sobre blanco.
portal-hospital todavía tiene su config propio con los valores de antes y sin
los tonos `soft`/`faint`; cuando adopte el paquete, los recibe.

## Contraste

Todo texto llega a **4,5:1** sobre su fondo (WCAG AA). Medidos:

| Color de texto | Sobre | Contraste | |
|---|---|---|---|
| `secondary` | blanco | 2,4:1 | ✗ nunca como texto sobre claro |
| `secondary` | `primary` | 5,1:1 | ✓ el dorado sobre el azul |
| `secondary-dark` | blanco / `canvas` / `*-faint` | 5,1 / 4,8 / 4,6:1 | ✓ el dorado sobre claro |
| `brandText-muted` | blanco / `canvas` / `*-faint` | 5,2 / 4,8 / 4,6:1 | ✓ texto secundario |
| `secondary-dark`, `brandText-muted` | `primary-soft` | 4,0:1 | ✗ ahí el texto va en `primary` o `brandText` |
| `brandText-muted` | `surface-dark` / `canvas-dark` | 3,6 / 3,4:1 | ✗ en oscuro va `brandText-mutedDark` (7,3:1) |
| `secondary-dark` | `surface-dark` / `canvas-dark` | 3,6 / 3,4:1 | ✗ en oscuro va `secondary` (7,8:1) |
| `gray-400` | blanco | 2,5:1 | ✗ ni en `placeholder:` |
| `gray-500` | blanco | 4,8:1 | ✓ el gris de Tailwind más claro para texto |
| `white/40` | `primary` | 3,2:1 | ✗ |
| `white/70` | `primary` | 6,7:1 | ✓ el blanco translúcido más claro sobre el azul |
| blanco | `secondary` | 2,4:1 | ✗ por eso el botón dorado lleva texto `primary` |
| `primary` | `secondary` | 5,1:1 | ✓ |

Bajar la opacidad de un bloque entero (`opacity-40` en un día de otro mes,
un paso deshabilitado) baja el contraste de todo lo de adentro. Para atenuar,
cambiá el fondo o pasá el texto a `brandText-muted`, que sí llega.

## Reglas de uso

- **Todo color en el markup es un token del config o una clase estándar de
  Tailwind** (`red-800`, `emerald-50`, `gray-500`, …) para estados que el
  manual no cubre (error, éxito, aviso). Nunca `bg-[#...]` / `text-[#...]`.
- **`secondary` cambia de tono en hover.** Es un pedido explícito del manual
  ("si es posible cambiar el botón al hacer hover sobre él"): el botón dorado
  aclara a `secondary-light`, con texto `primary` en los dos estados.
- **Los estados semánticos** (éxito, error, aviso, info, neutro) no forman
  parte del manual — usá la escala estándar de Tailwind para éxito/error
  (`emerald-*`, `red-*`), los tokens `primary`/`secondary` en su variante
  `faint` para info/aviso, y `canvas` para neutro. En React ya están en
  `Estado` de `hu-kit/componentes` (`hu-kit/componentes/Estado.jsx`, acá sin
  los pares `dark:`):

  ```
  exito:  bg-emerald-50 text-emerald-800 ring-emerald-600/20
  error:  bg-red-50 text-red-800 ring-red-600/20
  aviso:  bg-secondary-faint text-secondary-dark ring-secondary/30
  info:   bg-primary-faint text-primary ring-primary/20
  neutro: bg-canvas text-brandText ring-brandText/20
  ```

## Nombres a evitar: `hu-azul` / `hu-dorado` / `hu-gris`

quirofanohu usó ese prefijo en su etapa Blade y ya lo borró. El nombre
correcto es `primary` / `secondary` / `brandText` / `canvas` / `surface`, igual
en portal-hospital y en quirofanohu.

## Modo oscuro

`darkMode: 'class'` (lo fija el preset) con los pares fijos ya declarados arriba
(`canvas`/`canvas-dark`, `surface`/`surface-dark`, `brandText`/`brandText-dark`).
El comportamiento del toggle (por qué no se persiste, un solo estado
compartido) está en `references/modo-oscuro.md` — no es un tema de paleta sino
de dónde vive el estado.
