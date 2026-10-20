# Tipografía, íconos e ilustraciones

## Tipografía: Montserrat, y sólo tres pesos

El manual define exactamente tres variantes: **black (900)**, **semibold
(600)** y **regular (400)**. No hay un cuarto peso.

Los tres pesos los carga `hu-kit/estilos.css` (con `@fontsource/montserrat`) y
la familia la fija el preset: un sistema que usa el paquete no declara nada.
Un sistema que todavía no lo usa (portal-hospital) los importa a mano:

```css
@import '@fontsource/montserrat/400.css';
@import '@fontsource/montserrat/600.css';
@import '@fontsource/montserrat/900.css';
```

**Autohospedada siempre.** Nunca apuntar a `fonts.googleapis.com`: portal-
hospital la sirve local por diseño, y depender del CDN de Google es justo el
tipo de cosa que se cae dentro de la red del hospital.

**Nunca `font-bold` ni `font-medium`.** Esos pesos (700/500) no están
cargados — sólo 400/600/900 — así que el navegador los resuelve a 900 y 400
respectivamente. El código dice una cosa (`font-bold` = "semi-énfasis") y la
pantalla muestra otra (negrita completa). Usá siempre `font-normal` /
`font-semibold` / `font-black`.

**Títulos cortos van en mayúscula**, para jerarquizar — es literal del
manual ("en títulos cortos se pueden utilizar todas las letras en mayúscula
para mayor jerarquización"). La clase la trae `hu-kit/estilos.css`:

```css
.titulo-corto {
    @apply font-black uppercase tracking-wide;
}
```

Usalo para etiquetas cortas (2-4 palabras: "TÍTULOS CORTOS", nombres de
sección, badges de estado destacados) y botones. Un título largo o una oración
no van en mayúscula sostenida — el manual distingue "títulos cortos" de
"títulos largos/palabras importantes" (semibold, sin mayúscula forzada) y
"texto" (regular). **Tampoco los nombres de cosas** —un procedimiento, un
documento, un paso—: en mayúscula sostenida se leen más lento, y es justo lo
que el paciente necesita leer bien.

## Tamaños mínimos

- **Ningún texto de menos de 12 px** (`text-xs`). Los rótulos chicos en
  mayúscula espaciada (`text-[10px] tracking-[0.3em]`) son el caso que más se
  repite y el primero en volverse ilegible: van a `text-xs` con
  `tracking-[0.15em]`. La única excepción es `PanelAutenticacion`, que copia el
  login del portal tal cual (ver `componentes.md`).
- **En pantallas que se usan con el dedo** (los portales de pacientes), todo lo
  que se toca mide **44 px** de alto como mínimo, y el cuerpo de texto va a
  16 px (`text-base`).

## Íconos: Google Material Symbols

El manual pide explícitamente los íconos de `fonts.google.com/icons`, e
intercalar **trazo** y **relleno** según si la sección está activa. No dice
cuál de las tres variantes de la familia usar (Outlined, Rounded, Sharp): la
del hospital es **Outlined**, para todos los sistemas. Es la de
portal-hospital, la referencia de marca, y quirofanohu pasó de Rounded a
Outlined al adoptar el paquete. Dos sistemas del mismo hospital con íconos de terminación distinta
se notan al ponerlos uno al lado del otro. Nunca Rounded ni Sharp, ni
mezcladas.

`hu-kit/estilos.css` declara la fuente y las clases `material-symbols-outlined`
y `material-symbols-outlined.relleno` (el eje `FILL`). En React, `Icono` de
`hu-kit/componentes` las pone: `<Icono nombre="event" relleno />`.

Regla de uso: **la sección/ítem de navegación en el que estás parado usa
`FILL 1` (relleno); el resto, `FILL 0` (trazo).** No es decorativo — es la
única señal visual de "dónde estoy" en el sidebar/nav.

**Autohospedá la fuente de íconos completa, igual que la tipografía.** El
paquete trae la fuente variable entera (`hu-kit/estilos/fuentes/`, con los ejes
`opsz`, `wght`, `FILL`, `GRAD`) y Vite la empaqueta con el build;
portal-hospital la tiene copiada en su `resources/fonts/`. El motivo es el
mismo que para Montserrat: el CDN de Google filtra la IP
del paciente en cada carga, y si la red del hospital lo bloquea, los íconos
caen al nombre en texto plano (`calendar_add_on` en vez del glifo).

**Evitá el subset con lista de nombres.** Es la alternativa (pedirle a Google
sólo los íconos que usás, vía un parámetro `icon_names` en el `<link>`), y
tiene un costo feo: cada ícono nuevo hay que usarlo **y** declararlo en esa
lista, y si te olvidás del segundo paso el ícono no se rompe con un error —
se dibuja como texto, un fallo que sólo se ve mirando la pantalla.
El paquete trae todos los íconos: no hay lista que mantener.

## Ilustraciones

Cuando una pantalla pide una ilustración (estado vacío, onboarding, landing),
el manual fija una fuente y unos filtros exactos:

- Sitio: **storyset.com**
- Estilo (`Styles`): **Pana**
- Color (`Color`): **celeste default**
- Fondo (`Background`): **simple**

El buscador de Storyset a veces no encuentra resultados en español que sí
existen en inglés — buscá el término en inglés, o navegá por categoría en vez
de buscar texto libre, antes de asumir que no hay ilustración para ese
concepto.
