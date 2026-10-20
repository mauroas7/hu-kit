# Validación y nombres

## Validación

**Inline vs. FormRequest — las dos formas son válidas.** El criterio para
pasar a un `FormRequest` es concreto: cuando las mismas reglas se repiten
entre `store` y `update`, o cuando la validación necesita lógica propia
(autorización, normalización previa) que no entra cómodo en el método del
controller.

**Reglas como array, no como string con pipes**, salvo el caso más simple. La
forma array es la única que soporta `Rule::` y una regex que en sí misma
contenga comas o pipes:

```php
$reglas = [
    'documento' => ['required', 'string', 'max:15', 'regex:/^[0-9A-Za-z]+$/'],
];

if (!$request->filled('recurso_existente_id')) {
    $reglas['tipo'] = ['required', 'in:archivo,video'];
}

$request->validate($reglas);
```

**Normalizar antes de validar** (`trim`, `strtoupper` sobre un documento, por
ejemplo) con `$request->merge([...])`, y repetir la misma normalización del
lado del service si ese service puede recibir el dato desde otro llamador
(un comando de consola, una importación) que no pasó por el controller — no
es duplicación inútil, es que el service no confía en quien lo llama.

**Mensaje deliberadamente ambiguo cuando distinguir filtra información.**
Si un formulario público permite buscar por documento o identificador, "no
existe" y "los datos no coinciden" tienen que compartir el mismo mensaje —
si fueran distintos, alguien podría usar el formulario para averiguar qué
identificadores están dados de alta en el sistema, probando al azar. Ver
`tono-y-copy.md` de la skill `marca-hu` para el criterio completo de cuándo
un mensaje debe ser específico y cuándo debe ser ambiguo.

## Nombres

**Dominio en español, sufijos de framework en inglés** —
`Cirugia`, `CirugiaService`, `CirugiaRequest`, `CirugiaException`— porque el
sufijo pertenece al framework, no al dominio del hospital.

**Métodos nuevos, enteramente en español.** Portal-hospital arrastra una
mezcla histórica (`getEstudiosByPersonaId()` conviviendo con `buscarEstudios
()`) porque sus métodos públicos viejos no se podían romper sin tocar a todos
los llamadores. Un sistema que arranca de cero no tiene esa excusa: español
entero, incluidos los métodos públicos (`buscarPorQuirofano()`, no
`getByQuirofano()`).

**Rutas con nombre jerárquico `recurso.accion`**
(`cirugias.materiales.buscar`, `estudios.laboratorio.pdf`), siempre —
es lo único que hace una ruta testeable por `route()` en vez de por URL
literal, y evita colisiones de nombre entre módulos.

**`whereNumber('id')` o un `where()` con la expresión exacta** en todo
parámetro de ruta con un formato conocido (un ID numérico, una fecha
`YYYY-MM-DD`) — rechaza de entrada lo que no matchea, en vez de dejar que
llegue al controller y falle ahí.

**Las fechas: depende del stack.**

En **Blade**, el par `fecha` / `fecha_iso`: `fecha` es el texto ya formateado
en español para mostrar (`$fecha->locale('es')->isoFormat('D [de] MMMM,
YYYY')`) y `fecha_iso` es `$fecha->toDateString()`, para ordenar o comparar.
Sin el segundo no se pueden comparar fechas de dos orígenes distintos sin
volver a parsear el texto formateado.

En **React/Inertia, una sola fecha y en ISO 8601 con huso**
(`toIso8601String()`), nunca formateada. El formato es decisión de la pantalla
y lo resuelve un helper del front (`utils/fechas.js`); mandarla ya escrita
obliga a agregar un campo por cada forma de mostrarla, y el par `fecha` /
`fecha_iso` es exactamente eso con dos. Ver `quirofanohu`, `Caso::paraFila()`.

**`APP_LOCALE=es`**, no `en` con `->locale('es')` repetido a mano en cada
lugar que arma una fecha — es un ajuste de una línea que ahorra repetirlo en
cada service.
