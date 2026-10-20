# Manejo de errores y logging

## Niveles

| Nivel | Cuándo |
|---|---|
| `Log::error` | Excepción atrapada, fallo de conexión o de base de datos |
| `Log::warning` | El sistema respondió, pero con error o con un dato inutilizable |
| `Log::info` | **Sólo procesos que corren sin nadie mirando**: un comando agendado que necesita dejar constancia de que corrió y con qué resultado |
| — (nada) | Operación normal dentro de una request. Si el usuario está viendo la pantalla, el resultado ya se lo dice la pantalla |

La distinción importa: en portal-hospital los únicos `Log::info` del proyecto
están en el service de sincronización del catálogo, que corre por cron a las
8:30 sin nadie presente — ahí el log es la única forma de saber después si
corrió. En el camino de una request, en cambio, un `Log::info` por operación
normal sólo agrega ruido que después esconde los errores de verdad.

## Formato del mensaje

`Clase@metodo - contexto: detalle`, con los datos estructurados como segundo
argumento, nunca concatenados dentro del string:

```php
Log::warning('OptimiService@buscarEstudios - HTTP ' . $response->status(),
    ['dni' => $dni]);
```

## La regla de oro: el detalle va al log, nunca al navegador

```php
// El mensaje de una excepción de base de datos trae host, base y usuario.
Log::error('BuscarEstudios: ' . $e->getMessage());
```

Al usuario le llega un texto genérico, en español, escrito para él —
`'No se pudo consultar el sistema de laboratorio.'`— nunca el mensaje crudo de
la excepción ni un stack trace.

## Sin reintentos por defecto

Ninguna integración de portal-hospital reintenta (`->retry()`) — ante un fallo
se degrada (o se falla visible, según el sistema; ver
`servicios-e-integraciones.md`) y se avisa. Es una decisión implícita ahí, así
que hacela explícita en un sistema nuevo: si una integración sí necesita
reintentos (por ejemplo, un envío de correo con un consentimiento), decilo en
el código con un comentario, porque el default del resto del proyecto es no
reintentar.

## Cobertura real, no la documentada

La regla "degradar y loguear" vale poco si sólo está escrita: en
portal-hospital, varios services devuelven `null`/`[]` **sin loguear nada**,
así que cuando una sección aparece vacía no hay forma de saber si el sistema
externo falló o si de verdad no hay datos. Cuando agregues un `catch`,
preguntate siempre si además hace falta un `Log::` — un `catch` que sólo hace
`continue` sin loguear es indistinguible de un bug silencioso.

## Infraestructura de logging: el piso, no el techo

`config/logging.php` sin modificar (canal `stack` a un único archivo) es
aceptable para un sistema chico, pero un sistema con auditoría real
—turnos, cirugías, movimientos de stock— necesita más que eso desde temprano:
un handler de excepciones que no deje pasar un 500 sin registro, y
posiblemente un canal por integración si hay más de una. No asumas que el
stock de Laravel alcanza sólo porque alcanzó en portal-hospital — ahí alcanza
porque casi no hay nada que auditar.
