# Comentarios

Es la convención más original que produjo portal-hospital, y la que su propio
código viola sistemáticamente — precisamente porque la regla y el test que la
verifica nunca se subieron al repo. No repitas ese error: la regla (en
`docs/comentarios.md`) y su test se versionan desde el primer commit de un
sistema nuevo.

## La idea de fondo

Un comentario describe **el código que está ahí, en presente**, para alguien
que abre el archivo por primera vez y no conoce ninguna versión anterior. Lo
que no le sirve a ese lector, sobra. **Límite: 4 líneas de prosa por
comentario.**

## Las cuatro formas — y sólo estas cuatro

| Forma | Largo | Cuándo |
|---|---|---|
| **Rótulo** | 1 línea | Qué es una clase, un módulo o una función cuyo nombre no alcanza. La forma más común; la primera que hay que intentar. |
| **Contrafáctico** | 1–2 líneas | El código parece un error y no lo es. Dice qué pasa **sin** esa línea. |
| **TODO** | 1 línea | Lo que falta. El único comentario que puede hablar de algo que no está en el código. |
| **Docblock** | tags | `@throws`, `@return array<string, Turno>` cuando la firma no lo dice ya. Sin descripción que repita el nombre del método. |

```php
/** Ingreso publicado por el laboratorio ("VALIDADO Y DISPONIBLE"). */   // rótulo
// Sin normalizar el documento, el mismo paciente entra dos veces.        // contrafáctico
// TODO: falta el envío al backend; la vista ya arma el payload.         // pendiente
```

Si ninguna de las cuatro encaja, lo más probable es que el comentario no haga
falta. El default es no escribirlo.

## El contrafáctico va en presente

Es la distinción que más se escapa: el contrafáctico **sí** es descripción —
"sin este chequeo, el turno queda duplicado" explica por qué existe la línea,
en presente. Lo que no va es la misma idea en pasado ("sin esto el turno
**quedaba** duplicado"), que convierte la explicación en una anécdota del
arreglo en vez de una razón vigente.

## Lo que no va, nunca

- **Historia.** "Antes devolvía otra cosa", "el flujo anterior hacía X",
  "se reemplaza el día que haya otra fuente". Eso es trabajo del mensaje de
  commit — git guarda el pasado, el archivo guarda el presente. La prueba: si
  al sacar la frase no se pierde nada para quien nunca vio la versión
  anterior, era historia.
- **Alegato.** El comentario dice qué hace el código, no defiende la decisión
  contra alternativas que nadie propuso.
- **Banners** (`// =====`, `///////`, `// 1. MÉTODO PARA X`). No dicen nada.
- **Código comentado.** Si no corre, se borra.
- **Segunda persona o anécdota** ("como en el controller anterior"). El
  archivo no le habla a nadie en particular.

## Cómo se mide el límite

Cuenta el comentario **entero**: un docblock partido en párrafos con `*`
vacíos es un solo comentario de N líneas, no varios cortos. Las anotaciones
(`@param`) y los delimitadores no suman; sólo una línea de código o un
renglón en blanco cierran el bloque.

**Si el porqué no entra en 4 líneas, no va en el código: va en el documento
de la zona, en `docs/`.** Ahí se lee entero y en contexto; repartido en
docblocks se duplica y queda desincronizado con el tiempo. El código enlaza:
*"ver `docs/datos-de-prueba.md`"*. Nunca a un `CLAUDE.md`: no se versiona, así
que para quien clona el enlace apunta a la nada.

## Protegelo con un test

La regla completa (con este límite y la lista de lo prohibido) se verifica
automáticamente contando comentarios y buscando patrones de banner — ver
`tests-y-verificacion.md`. Sin ese test, esta convención se cumple mientras
alguien se acuerde de leerla, y deja de cumplirse en la primera fecha de
entrega apurada.
