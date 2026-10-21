# Estilos de hu-kit

La marca del Hospital Universitario como código: un **preset de Tailwind**, los
**estilos base** y las **fuentes**. Los sistemas del hospital la instalan como
dependencia y dejan de copiarse valores entre sí.

Antes de este paquete, cada sistema tenía su `tailwind.config.js` copiado del
otro, y en pocos meses ya diferían en tonos, capas, animación y hasta en la
familia de íconos. Con el paquete no pueden separarse: el valor está en un solo
lugar.

## Qué trae

| Archivo | Qué es |
|---|---|
| `tailwind.js` | Preset de Tailwind 3: colores, Montserrat, capas (`z-dropdown`, `z-modal`, `z-flotante`, `z-toast`), `animate-fade-in`, `scale-98`, los degradés `bg-glow-white` y `bg-glow-secondary` del panel de ingreso, los espaciados `etiqueta` y `control` de `Campo`, el plugin `@tailwindcss/forms`, `darkMode: 'class'` y `hover` sólo con puntero |
| `estilos.css` | Montserrat 400/600/900, Material Symbols Outlined, el anillo de foco, `.titulo-corto` y el apagado de movimiento con `prefers-reduced-motion` |
| `fuentes/` | Material Symbols Outlined, la fuente variable completa, de Google; su licencia (Apache 2.0) en `fuentes/LICENSE` |

Lo que es propio de un sistema (los espaciados de sus componentes, sus plugins,
su `content`) se queda en el config del sistema, no acá. Los espaciados y el
plugin de los componentes de `hu-kit/componentes` sí van acá: los componentes
los dan por hechos.

## Cómo se usa

```bash
npm install github:mauroas7/hu-kit#vX.Y.Z    # el último tag, en CHANGELOG.md
```

```js
// tailwind.config.js
import huKit from 'hu-kit/tailwind';

export default {
    presets: [huKit],
    content: ['./resources/js/**/*.{js,jsx}'],
    theme: { extend: { /* sólo lo propio del sistema */ } },
};
```

```css
/* resources/css/app.css: antes de las directivas */
@import 'hu-kit/estilos.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Los íconos se dibujan con la clase `material-symbols-outlined` (y `relleno` para
la sección activa). En React, mejor un componente `Icono` que la ponga.

## Versiones

El repo es público: `npm install` lo baja de GitHub sin credenciales. Con el
lock ya resuelto, `npm ci` lo trae por https y no necesita ni git.

Cada sistema fija un tag, y un cambio de marca le llega cuando sube el tag en
su `package.json`, no solo. Así un cambio acá nunca rompe a un sistema sin que
alguien lo pruebe.

- Un cambio que no altera lo que se ve (un comentario, una capa nueva) sube el
  último número: `v1.0.1`.
- Un token o una clase nuevos suben el del medio: `v1.1.0`.
- Cambiar o sacar un valor que ya existe —un color, un peso, una familia de
  íconos— sube el primero: `v2.0.0`. Cada sistema lo adopta revisando sus
  pantallas.

Qué trae cada versión: [`CHANGELOG.md`](../CHANGELOG.md).

Para probar un cambio antes de publicar el tag, sin dejar rastro en el
proyecto:

```bash
npm pack --pack-destination <carpeta temporal>          # desde hu-kit
npm install <carpeta temporal>/hu-kit-X.Y.Z.tgz         # desde el sistema
```

Antes del commit del sistema, la dependencia vuelve a apuntar al tag.

### Publicar una versión

1. `version` en `package.json` pasa al número nuevo.
2. La versión se anota arriba de todo en `CHANGELOG.md`.
3. Commit, y tag anotado con el mismo número: `git tag -a vX.Y.Z -m vX.Y.Z`.
4. `git push origin main vX.Y.Z`.
5. Si cambiaron las skills, se vuelve a correr `instalar.ps1`.
6. En cada sistema: `npm install hu-kit@github:mauroas7/hu-kit#vX.Y.Z`, build,
   tests y commit. Cambiar el tag a mano y correr `npm install` no alcanza: con
   una dependencia de git, npm deja en el lock el commit que ya tenía.

**Un tag publicado no se mueve ni se borra, y `main` no se reescribe.** El lock
de cada sistema guarda el commit exacto que resolvió el tag: si ese commit
desaparece de GitHub, `npm ci` falla en esa versión del sistema, y con ella la
vuelta atrás en producción. Un error en una versión publicada se arregla
publicando la siguiente.

## Decisiones

### Contraste: todo texto llega a 4,5:1 (WCAG AA)

Medido con axe-core sobre 16 pantallas de quirofanohu, había 190 elementos con
contraste insuficiente, y salían casi todos de cuatro colores. La corrección se
hizo en el valor del token, no en cada pantalla:

| Token | Antes | Ahora | Contraste sobre blanco |
|---|---|---|---|
| `secondary-dark` | `#AB8850` (3,3:1) | `#85693E` | 5,1:1 (4,6:1 sobre los fondos claros) |
| `brandText-muted` | `#8B8B8D` (3,4:1) | `#6D6D6F` | 5,2:1 (4,6:1 sobre los fondos claros) |

Y cuatro reglas para el resto:

- **El dorado del manual (`secondary`) es texto sólo sobre `primary`** (5,1:1).
  Sobre blanco no llega a 2,4:1 en ningún tamaño: como texto sobre fondo claro
  va `secondary-dark`.
- **Un botón con fondo `secondary` lleva texto `primary`** (5,1:1), no blanco
  (2,4:1). El hover aclara a `secondary-light`.
- **Sobre `primary`, el blanco translúcido arranca en `white/70`** (6,7:1);
  `white/40` da 3,2:1.
- **Los grises de Tailwind para texto arrancan en `gray-500`** (4,8:1);
  `gray-400` da 2,5:1. Vale también para los `placeholder:`.

`secondary-dark` y `brandText-muted` no llegan sobre `primary-soft` (4,0:1):
ahí el texto va en `primary` o `brandText`.

### Contraste en modo oscuro

Los tonos para texto sobre fondo claro no sirven sobre `canvas-dark` ni
`surface-dark`: `brandText-muted` y `secondary-dark` dan 3,4–3,6:1, y
`gray-500`, 3,8:1. Cada uno tiene su par fijo:

| Claro | Oscuro | Sobre `surface-dark` |
|---|---|---|
| `text-brandText-muted` | `dark:text-brandText-mutedDark` | 7,3:1 |
| `text-secondary-dark` | `dark:text-secondary` | 7,8:1 |
| `text-primary` | `dark:text-gray-100` | más de 15:1 |

### Foco

El anillo `primary-light` se ve sobre fondos claros (9,7:1 sobre blanco), pero
no sobre `primary` (1,3:1) ni en modo oscuro (1,8:1). Ahí pasa a `secondary`,
que da 5,1:1 sobre `primary` y 7,8:1 sobre `surface-dark`; un indicador de foco
pide 3:1.

### Tamaños

- **Ningún texto de menos de 12 px** (`text-xs`). Los rótulos chicos en
  mayúsculas, el lugar donde más se rompía esto, van a 12 px con menos
  espaciado.
- **Todo lo que se toca mide 44 px de alto como mínimo** en las pantallas que
  se usan con el dedo (los portales de pacientes).

### La excepción: el panel de ingreso

`PanelAutenticacion` copia tal cual el login del portal de pacientes, el modelo
de todos los sistemas, y ahí no rigen las reglas de tamaño y contraste de arriba:
el rótulo de abajo va a 10 px en `blue-100/50` (3,6:1), las etiquetas a 11 px,
y el placeholder y el ojito de la contraseña en `gray-400`. Lo único que no se
copia es el enlace en dorado, que va en `secondary-dark` y no en `secondary`
(2,4:1 sobre blanco). Fuera de ese panel, las reglas valen sin excepción.

### Íconos: Material Symbols Outlined

El manual pide Material Symbols, pero no dice cuál de las tres familias.
portal-hospital usaba Outlined y quirofanohu Rounded; uno al lado del otro, las
terminaciones se notan. Se eligió **Outlined** por ser la del portal, que es la
referencia de marca del hospital.

### Hover sólo con puntero

`future.hoverOnlyWhenSupported`: Tailwind envuelve los `hover:` en
`@media (hover: hover) and (pointer: fine)`. En una pantalla táctil el hover
queda pegado después de tocar —un subrayado, un fondo— hasta que se toca otra
cosa.

### Mayúsculas

El manual permite mayúsculas «en títulos cortos». Van en el título de una
pantalla, en los rótulos de dos o tres palabras y en los botones. **No** en
nombres de cosas (un procedimiento, un documento, un paso) ni en oraciones:
en mayúscula sostenida se leen más lento.
