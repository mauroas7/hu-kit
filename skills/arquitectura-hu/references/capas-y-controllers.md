# Capas y controllers

## El invariante

```
Controller → Service → (HTTP externo | DB externa)
```

- Un controller **nunca** usa `Http::` ni `DB::connection()`/`DB::table()`
  directamente — `DB::transaction()` sí, que no es consultar sino delimitar
  una escritura de varias tablas. Si necesita datos de un sistema externo, el
  acceso vive en un service (`app/Services/`, o la carpeta de dominio que use
  el proyecto) y el controller lo recibe por **inyección en el constructor** (promoción: `public function __construct(private XService $x)
  {}` — es la forma dominante y la más reciente en portal-hospital).
- Un service **nunca** recibe un `Request`: recibe datos ya validados por el
  controller.
- Verificalo con un test de arquitectura, no con disciplina (detalle completo
  en `tests-y-verificacion.md`). Sin ese test, la regla se cumple mientras
  alguien se acuerde de ella y se rompe en el primer apuro — es exactamente lo
  que le pasó a portal-hospital con una integración nueva que metió una
  consulta a base externa directo en un service sin `try/catch`, violando tres
  reglas del propio proyecto en el mismo commit.

## Cómo responde un controller

| Qué devuelve | Cómo |
|---|---|
| Una pantalla completa | `Inertia::render('Pages/X', [...])` (stack React+Inertia) o `view('x', [...])` (Blade) |
| Datos para JS de esa misma pantalla | `response()->json([...])` |
| Error de validación | `ValidationException::withMessages([...])` — Inertia lo pone en la prop `errors`; Blade lo lee con `@error`/`$errors`. Es el mismo mecanismo en los dos casos |
| Error de estado del sistema | `abort_if(condición, 503\|404\|403, 'mensaje en español para el usuario')` |

Un controller de referencia (`EstudioInformadoController` en portal-hospital)
son 55 líneas y dos métodos: resuelve de dónde sale la identidad
(`auth()->user()`), qué código HTTP corresponde a cada resultado, y la forma
de la respuesta. Todo lo demás se delega. Si un controller crece más allá de
eso, casi siempre es porque le quedó lógica que debería estar en el service.

## Autorización

**Por rol**, cuando la pregunta es "¿puede este tipo de usuario entrar acá?":

- Un enum respaldado por slug (`App\Enums\Rol`, no un `string` suelto
  comparado contra literales en 16 archivos distintos — eso es exactamente lo
  que le pasó a portal-hospital) con un middleware parametrizado
  (`rol:cirujano,anestesista`), no uno hardcodeado a un solo rol
  (`is_admin`).
- `abort(403)`, nunca un redirect silencioso que oculta que hubo un rechazo.
- Guarda con nombre de intención cuando el middleware no alcanza (por ejemplo,
  una ruta compartida por dos roles pero un método que sólo uno debería
  llamar): un método privado como `soloMedicos()` que explica *por qué* existe
  el chequeo ahí, no un `if` suelto sin comentario.
- **Un solo punto de la aplicación resuelve un permiso que se consulta desde
  varios lugares.** Si "sobre qué recurso puede actuar este usuario" se
  responde en más de un método, alcanza con que uno se desactualice para abrir
  un agujero. Portal-hospital lo hace bien con
  `GrupoFamiliarService::personaGestionable()`: crear, cancelar y listar
  turnos de un familiar consultan ese único método.

**Por recurso**, cuando la pregunta es "¿esta cirugía/turno/material es de
este usuario en particular?" — algo que portal-hospital casi no necesita
(su backend local no tiene ese tipo de dato) pero que un sistema con datos
propios de dominio sí va a necesitar todo el tiempo. Ahí es donde entran
**Policies o Gates** de Laravel, no un chequeo manual repetido en cada
controller que toque ese recurso.

## FormRequest vs. validación inline

Las dos formas son válidas; el criterio para elegir FormRequest es concreto:
**cuando las mismas reglas se repiten entre `store` y `update`** (algo que en
un sistema con datos reales de dominio va a pasar seguido, a diferencia de
portal-hospital, que casi no escribe). Ver el detalle de cómo armar las reglas
en `validacion-y-nombres.md`.
