# Services e integraciones externas

## Cuándo se crea un service, y cuándo no

Un service existe cuando pasa al menos una de estas dos cosas:

1. **Hay I/O que no es la base de datos local** (una API del hospital, otra
   base directa).
2. **Un proceso tiene más de un borde que lo invoca.** Ejemplo real de
   portal-hospital: el alta de un paciente la usan tanto el registro web como
   un comando de consola, y ambos tienen que guardar exactamente lo mismo — si
   cada camino armara su propio `Model::create()`, terminarían divergiendo.

**Si ninguna de las dos aplica, no adelantes un service vacío.** El default
para una lectura Eloquent simple es controller → modelo directo. Un service
que sólo envuelve una consulta sin agregar nada es una capa de más.

## Una clase por sistema externo

Nombrada por el sistema, no por lo que devuelve (`AlephooService`,
`OptimiService` — no `EstudiosService` cuando en realidad sólo habla con un
sistema). **El sistema externo no sale del service**: nadie fuera de él conoce
el shape de la respuesta, sus códigos de estado ni sus nombres de campo. El
service traduce con un método privado (`normalizar()`) al shape que espera el
resto de la app.

## La fábrica del cliente HTTP

```php
private function client(): PendingRequest
{
    return Http::withToken(config('services.sistema.token'))
        ->timeout(15)
        ->baseUrl(rtrim(config('services.sistema.base_url'), '/'));
}
```

Todo método público pasa por esa fábrica — nunca arma el cliente HTTP inline
en cada método. Es la forma que terminó adoptando portal-hospital después de
tener 11 llamadas casi idénticas repetidas en 6 archivos, la mitad sin
`timeout()`, y ninguna con manejo de fallo consistente.

**Timeout siempre.** Una API sin `timeout()` que se cuelga, cuelga la
pantalla completa. No hay excusa para omitirlo desde el primer service.

## El contrato `null` / `[]`

Todo método público que consulta algo que puede fallar declara en el docblock
qué significa cada resultado:

```php
/** `null` si no se pudo consultar · `[]` si la persona no tiene datos. */
public function getDatosByDni(string $dni): ?array
```

**Esto vale incluso sin ninguna integración externa** — para cualquier
consulta que agregue datos de varias fuentes locales (un panel que suma
cirugías, materiales y hemoderivados) es la misma trampa: sin la distinción,
una lista incompleta se ve idéntica a una completa, y quien la lee concluye
que algo no existe cuando en realidad no se pudo traer.

## Degradar, o fallar visible — no es la misma respuesta en todos los sistemas

Portal-hospital degrada agresivamente: ante un fallo devuelve `[]`/`null`, lo
loguea, y el paciente ve el portal sin esa sección, nunca un 500. Tiene
sentido ahí porque es de cara al público y necesita seguir funcionando incluso
sin la red del hospital.

**Eso no se traslada sin pensar.** Un sistema operativo interno —turnos de
quirófano, stock de materiales, autorizaciones de obra social— puede preferir
fallar visible (un error claro) antes que mostrar un panel incompleto sin
avisar, porque de ese panel puede depender una decisión operativa real. Lo que
**sí es universal, sin excepción**:

> **Un sistema caído se avisa. Nunca se silencia como si no tuviera datos.**

Si tu servicio devuelve `{ datos, fallaron }` (o el equivalente), el llamador
tiene que mostrar el aviso, no sólo los datos que sí llegaron.

## Los permisos fallan cerrado — sin excepción, a diferencia de lo anterior

Degradar aplica a **mostrar** datos, no a **decidir de quién son**. Si no se
puede verificar que un recurso pertenece a quien lo pide, la respuesta es que
no — nunca un valor por defecto permisivo "por las dudas de que la consulta
haya fallado". Portal-hospital lo hace bien en el alta de pacientes: si no
puede validar el documento contra el sistema externo, no crea la cuenta, punto.

## Autorización contra un sistema que no autentica

Cuando el sistema externo no exige credenciales ni verifica identidad, la
autorización se construye del lado de acá: **se busca el recurso dentro del
conjunto que le pertenece al usuario logueado, nunca comparando un ID que
vino del navegador o del request**. El DNI o el identificador de búsqueda
sale siempre de `auth()->user()`, nunca de un parámetro. Ésta es, en
términos generales, la respuesta a IDOR (`/recurso/{id}/...` donde cambiar
el `{id}` a mano no debería servir de nada) en cualquier endpoint que exponga
un recurso propio de un usuario.

## Credenciales y config

- **`config()`, nunca `env()` fuera de `config/`.** Con la config cacheada en
  producción, `env()` devuelve `null`.
- El patrón son tres archivos por integración: `.env.example` (la variable,
  sin valor, con un comentario de qué sistema es), `config/services.php` (el
  bloque agrupado por sistema), y el service leyendo
  `config('services.sistema.clave')`.
- **Ninguna IP, host o URL de infraestructura real en el código de la
  aplicación** — ni siquiera como default de un `config/database.php`. Un
  default vacío que falla claro es preferible a uno que hace parecer
  configurada una app que no lo está, y que además publica topología de red
  interna en el repo.
- Una integración que todavía no es definitiva (un proveedor "provisorio", un
  endpoint que se sabe que va a cambiar) lo dice en tres lugares a la vez: el
  comentario en el código, `config/services.php` y `.env.example`. Ese triple
  marcado es la única forma en que el aviso llega a quien clona el proyecto.

## Patrón útil: interfaz + implementación intercambiable

Cuando se sabe que una integración va a existir pero todavía no está lista
(la API del hospital para un dato que hoy se carga a mano o desde un espejo
local), declarar una interfaz con el contrato final y una implementación
provisoria que lo cumple sin la integración real:

```php
interface Pacientes
{
    public function sincronizar(?string $documento = null): int;
    public function disponible(): bool; // falla cerrado: ante la duda, false
}
```

El día que la integración exista, se agrega `PacientesApi implements
Pacientes` y nada del resto de la app se entera del cambio — el contrato ya
estaba fijado. Es más barato que escribir el service "provisorio" sin
interfaz y tener que tocar a todos sus llamadores cuando llegue la versión
real.

## Sincronización agendada

Cuando el dato externo es catálogo (no se consulta en vivo en cada pantalla),
se sincroniza a la base local por un comando agendado (`Schedule::command(...)
->dailyAt(...)`), y el resto de la app lee siempre local. El comando es una
cáscara delgada sobre el service, y respeta el mismo contrato `null`/`[]`: si
la sincronización falla, no se toca la caché existente — mejor un catálogo
viejo que una sección vacía.
