# Tests y verificación

## La idea que atraviesa todo esto

Una convención sin un test que la verifique se cumple por disciplina, y la
disciplina se rompe en la primera entrega apurada. Portal-hospital es la
prueba en vivo: sus reglas de capas, de comentarios y de manejo de errores
están bien escritas y sistemáticamente violadas, porque el test que las
verificaría nunca se subió al repo — vivía sólo en la máquina de quien
programa. **Para un sistema nuevo, esto se invierte: si es una convención,
tiene un test, y el test se versiona.**

## Pest, no PHPUnit por clases

```php
test('un paciente no puede cancelar el turno de otro', function () {
    // …
});
```

`RefreshDatabase` aplicado una sola vez a todo `Feature` desde `tests/Pest.php`
— no repetirlo archivo por archivo.

## Los tests nunca tocan sistemas externos reales

`phpunit.xml` fuerza una base en memoria y ninguna conexión externa está
disponible al correr tests. Un test que consulte un sistema real pasa sólo en
una máquina con la red y las credenciales puestas, y falla en cualquier otra —
es el peor tipo de test porque miente sobre qué tan verde está la suite. Todo
lo externo se mockea: `Http::fake()` para las APIs, el service correspondiente
resuelto desde el contenedor cuando la dependencia es una conexión de base de
datos directa.

## El test de arquitectura — la pieza más valiosa de todo esto

Tres reglas, ningún acceso a base ni a red:

```php
// tests/Unit/ArchTest.php
arch('los controllers no consultan datos ni salen a la red')
    ->expect('App\Http\Controllers')
    ->not->toUse('Illuminate\Support\Facades\Http')
    ->ignoring([
        // Deuda ya existente al momento de escribir la regla.
        // Esta lista SÓLO puede achicarse, nunca crecer.
    ]);

arch('los services no dependen de la capa HTTP de entrada')
    ->expect(['App\Services', 'App\Cirugias']) // las carpetas de servicios DE ESTE proyecto
    ->not->toUse([
        'App\Http\Controllers',
        'Illuminate\Http\Request',
    ]);

arch('los modelos no dependen de las capas de arriba')
    ->expect('App\Models')
    ->not->toUse(['App\Http', 'App\Services', 'App\Cirugias']);
```

**Ojo con `DB` en los controllers.** La regla es que un controller no
**consulta** —`DB::table()`, `DB::connection()`, `DB::select()`—, no que no
pueda nombrar la fachada: `DB::transaction()` en un controller es correcto y
frecuente, porque delimitar una escritura que toca varias tablas es una
decisión del borde, no acceso a datos. Un `->not->toUse
('Illuminate\Support\Facades\DB')` a secas prohibe las dos cosas y arranca
en rojo en cualquier proyecto que escriba de verdad. Si querés cubrir también
las consultas, la distinción es por método y no por importación, así que no
sale con `toUse()`: hace falta leer los archivos.

**Si el proyecto no usa Pest**, la misma idea entra en un test de PHPUnit sin
dependencias nuevas: recorrer los `.php` de cada carpeta y buscar las cadenas
prohibidas. Es más tosco que `arch()` y permite justamente la distinción por
método que `toUse()` no hace. Implementación de referencia:
`quirofanohu/tests/Unit/ArquitecturaTest.php` — seis reglas: tres de capas
(los controladores no hacen entrada/salida externa, los services no conocen la
capa de entrada, los modelos no dependen de las de arriba) y tres que encierran
la integración de sólo lectura con Alephoo (el cliente expone sólo `get`, no
escribe, y es el único que lee sus credenciales).

**Verificá que el test pueda fallar.** Un test de arquitectura que nunca vio
una infracción puede estar mirando la carpeta equivocada y nadie se entera:
rompé una regla a propósito una vez, confirmá que falla, y revertí.

**El mecanismo de la lista `ignoring()` que sólo puede achicarse es lo que
convierte esto en una herramienta y no en un obstáculo.** Un archivo viejo que
todavía viola la regla se nombra ahí, explícitamente, en vez de resolverse
apagando el test o reescribiendo la regla para que lo tolere. Si el test falla
por una clase **nueva**, la respuesta es corregir esa clase — nunca agregarla
al `ignoring()`.

Sumale una regla propia de cada proyecto a medida que aparezcan capas nuevas
— por ejemplo, en un sistema que reemplaza datos de prueba por datos reales
módulo a módulo: `arch('los controllers ya migrados no usan la capa de
datos de prueba')->expect('App\Http\Controllers\Cirugias')->not->toUse
('App\Demo')`.

## Verificar que una vista y su ruta piden el mismo rol

Un error que no aparece solo: una pantalla puede mostrar un botón a un rol
que después recibe 403 al usar la acción detrás, si el guard de la vista y el
middleware `rol:` de su ruta se desincronizan con el tiempo. Un smoke test que
recorra cada rol contra cada ruta GET y sólo mire el código de estado **no lo
detecta** (un 403 es una respuesta "válida" para ese chequeo). Si el proyecto
tiene esta clase de guardas repartidas entre vista y ruta, vale la pena un
test dedicado que compare ambas listas de roles para una acción, no sólo que
la pantalla cargue.

## El test de comentarios

Cuenta los comentarios del proyecto y falla si alguno supera el límite de 4
líneas de prosa, o si matchea un patrón de banner (`// ===`, `///////`, líneas
numeradas tipo `// 1. …`). El detalle completo de qué cuenta y qué no está en
`comentarios.md` — la regla y el test tienen que coincidir exactamente o uno
de los dos queda mintiendo.

## Regla general para saber si algo necesita test

Si la conversación sobre una convención usa la palabra "siempre" o "nunca"
("los controllers *nunca* usan `DB::` directo", "un permiso *siempre* falla
cerrado"), esa frase es candidata a un `arch()` test o a un test funcional que
la verifique. Si no se puede expresar como un test, probablemente es una
guía de estilo, no un invariante — y está bien que viva sólo en el documento
de la zona, en `docs/`.
