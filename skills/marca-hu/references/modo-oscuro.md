# Modo oscuro

No es parte del manual de marca — es una decisión de interfaz que
portal-hospital tomó y quirofanohu también sigue. Si tu sistema nuevo suma
modo oscuro, seguí este patrón; si no lo necesita, no hace falta implementarlo
sólo por consistencia.

## La razón de por qué no se persiste

**El tema no se guarda en `localStorage` ni sigue `prefers-color-scheme`.**
Las máquinas del hospital son compartidas entre pacientes o entre personal:
si el modo oscuro sobreviviera a la sesión, el paciente siguiente heredaría la
preferencia del anterior. La regla es:

- Vive en memoria (estado de React), no en almacenamiento persistente.
- Arranca siempre en modo claro.
- Se resetea cuando cambia el usuario autenticado.
- No hay script "anti-flicker" en el HTML base — no hay nada que leer antes de
  montar React, porque no hay preferencia guardada que restaurar.

## Un solo estado compartido

El toggle de tema es un `useContext` (`ThemeProvider` montado por encima de
`<App>`), no un `useState` local en cada componente que lo muestra. Si el
control de modo oscuro aparece en dos lugares de la pantalla (menú mobile y
desktop, por ejemplo), un estado por componente los desincroniza. En React,
`ThemeProvider` y `useTheme` vienen de `hu-kit/componentes`, con todo lo de
arriba ya resuelto: el sistema monta el provider en `app.jsx` y le pasa el id
del usuario (`usuarioInicial`). Como el provider va por encima de la app y el
login y el logout no recargan la página, el usuario lo lee además de cada
navegación de Inertia con `usuarioDe(pagina)`; por defecto,
`pagina.props.auth.usuario.id`. Un sistema que comparte el usuario con otro
nombre le pasa su propio `usuarioDe`.

## Pares fijos

| Claro | Oscuro |
|---|---|
| `canvas` | `canvas-dark` |
| `bg-white` / `surface` | `surface-dark` |
| `text-brandText` | `brandText-dark` |
| `text-brandText-muted` | `brandText-mutedDark` |
| `text-secondary-dark` | `text-secondary` |
| `text-primary` | `text-gray-100` |
| `focus:border-primary` | `focus:border-secondary` |
| `border-brandText-soft` | `border-gray-800` |

Los tonos de texto para fondo claro (`brandText-muted`, `secondary-dark`) dan
3,4–3,6:1 sobre los fondos oscuros: sin su par, el texto no llega a 4,5:1. El
anillo de foco pasa solo a dorado en oscuro y sobre `primary` (`estilos.css`).

No inventes un tono oscuro nuevo para un caso puntual — si falta un par,
agregalo al preset de `hu-kit` con nombre, como cualquier otro token.

## Lo que ya está sobre `primary` no lleva `dark:`

Un overlay semitransparente (`bg-white/10`) dibujado sobre un fondo `primary`
se ve igual en los dos modos, porque `primary` no cambia entre claro y
oscuro. Agregarle un `dark:` a ese elemento generalmente lo rompe (lo hace
desaparecer o cambia un contraste que ya estaba resuelto). Antes de agregar
`dark:` a algo, preguntate si el elemento está parado sobre un fondo que
realmente cambia entre modos, o sobre uno de marca que es fijo.

## Contenido que se queda en modo claro a propósito

Un bloque de contenido largo con su propia paleta de avisos internos (por
ejemplo, instrucciones de preparación para estudios médicos, con textos en
ámbar/rojo/verde pensados sobre fondo claro) puede quedar deliberadamente
fuera del modo oscuro si migrar esa paleta interna no aporta nada y sí agrega
riesgo de romper contrastes ya pensados. Es una excepción consciente, no un
olvido — si tomás esta decisión en un componente, dejá un comentario que lo
diga, para que nadie intente "completar" el dark mode ahí después sin saber
por qué se dejó afuera.
