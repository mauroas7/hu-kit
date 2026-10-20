# Modelos y datos

Portal-hospital casi no tiene datos locales (7 modelos anémicos: `$table`,
`$fillable`, `$casts`, relaciones — nada más), así que en esta capa aporta
poco por imitación directa y mucho por **los errores medidos en el prototipo
de un sistema con datos reales**, que sí valen para cualquier sistema nuevo
del hospital.

## Lo que sí se copia de portal-hospital

**`$table` explícito en todo modelo de dominio en español.**

```php
class Especialidad extends Model
{
    protected $table = 'especialidades';
}
```

Laravel pluraliza en inglés; un modelo en español (`Material`, `Profilaxis`,
`Hemoderivado`) va a fallar la convención automática tarde o temprano.
Declarar `$table` siempre es más barato que descubrir cuál falla.

**`casts()` como método, no como propiedad** (Laravel 11+):

```php
protected function casts(): array
{
    return [
        'fecha_hora' => 'datetime',
        'rol' => Rol::class, // castear el enum acá, no comparar contra literales
    ];
}
```

**Relaciones N:N con el pivot y ambas claves explícitas**, no confiando en
que Laravel adivine los nombres:

```php
return $this->belongsToMany(Medico::class, 'especialidad_medico', 'especialidad_id', 'medico_id');
```

**Migraciones incrementales.** Nunca editar una migración que ya corrió en
algún ambiente — un cambio de esquema es una migración nueva
(`add_columna_to_tabla_table`).

**Si en algún momento hay un sistema externo de por medio**: separar `id`
(autoincremental local) de `id_original` (el ID en el sistema externo, con
`unique()`), y usar siempre `id_original` en todo lo que viaje hacia afuera.
Confundirlos hace que una operación se ejecute contra el recurso equivocado
del sistema externo.

## Lo que NO se copia — son ausencias de portal, no convenciones

Portal-hospital tiene **cero scopes, cero accessors, cero observers, cero
`DB::transaction()` y cero Policies** (medido sobre `app/`). Funciona
porque casi no escribe ni tiene reglas de negocio locales. Un sistema con
datos de dominio reales (estados con vigencia por fecha, precios versionados,
consentimientos firmados) sí necesita:

- **Scopes** para las consultas que se repiten con la misma condición
  (`vigente()`, `delCirujano($id)`) en vez de repetir el `where()` en cada
  controller.
- **Accessors** cuando un valor derivado se calcula igual en más de un lugar.
- **Policies** para autorización a nivel de recurso ("¿esta cirugía es de
  este cirujano?") — ver `capas-y-controllers.md`.
- **Transacciones** (`DB::transaction()`) en toda escritura que toque más de
  una tabla y tenga que quedar consistente entre sí.

## Los errores medidos en el prototipo — no los repitas

Esta lista sale de medir un esquema real de 72 tablas construido sin estas
reglas, así que no son hipotéticos:

- **Casi ningún `unique()`.** Sin él, la clave natural del dominio (un
  documento, un código) puede duplicarse sin que la base lo impida.
- **Casi ningún índice compuesto** sobre las columnas que sí se filtran juntas
  en la consulta más caliente del sistema (por ejemplo, "el registro vigente
  de este proceso": `WHERE id_proceso = ? AND fecha_fin IS NULL`).
- **Columnas lógicamente obligatorias declaradas `nullable()`** — si el
  dominio dice que un dato siempre existe, la columna es `NOT NULL`; dejarla
  nullable "por las dudas" traslada el chequeo de integridad a cada lugar que
  la lee.
- **Sin `timestamps`.** Sin `created_at`/`updated_at` no hay forma de
  responder "quién creó esto y cuándo" sin construir una tabla de auditoría
  aparte a mano.
- **Nombres de columna que repiten el nombre de la tabla** (`cirugia.
  cirugia_fecha_hora` en vez de `cirugia.fecha_hora`) — además de ser
  redundante, en MySQL puede empujar un identificador compuesto más allá del
  límite de 64 caracteres.

Usar `timestamps`, `unique()` reales, índices compuestos sobre lo que
realmente se filtra junto, y `NOT NULL` donde el dominio dice obligatorio,
desde la primera migración de cada tabla — no como una limpieza posterior.
