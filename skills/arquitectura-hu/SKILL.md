---
name: arquitectura-hu
description: Aplica las convenciones de backend de los sistemas del Hospital Universitario (capas Controller→Service→I/O, cómo se escribe un service, manejo de errores y logging, modelos y migraciones, validación, nombres, comentarios, tests) a cualquier sistema del hospital — portal-hospital, quirofanohu/StartMed, o uno nuevo. Usar SIEMPRE que se escriba o revise un controller, un service, un modelo, una migración, una ruta, una regla de validación, manejo de errores de una integración externa, o un test en un proyecto de este hospital — incluso si el pedido no menciona "arquitectura" o "convenciones" explícitamente (ej. "agregá el endpoint para cancelar una cirugía", "creá el modelo de Material", "por qué falla este test", "cómo integro la API del hospital"). No aplica a proyectos que no sean del Hospital Universitario, ni a decisiones puramente de frontend (ver la skill `marca-hu` para eso).
---

# Arquitectura de backend — Hospital Universitario

Esta skill generaliza lo que **portal-hospital** (el sistema con más años y más
integraciones externas del hospital) hace bien en su backend, más el trabajo
de destilación ya hecho para quirofanohu en
`quirofanohu/docs/analisis/convenciones-portal.md` (63 convenciones evaluadas
una por una: adoptar, adaptar o descartar). No repitas ese trabajo de análisis
— ya está hecho y verificado contra el código real. Esta skill lo empaqueta
para que un sistema nuevo lo herede desde el día uno, en vez de tener que
redescubrirlo leyendo 1500 líneas de análisis.

## El invariante central

```
Controller → Service → (HTTP externo | DB externa)
```

Un controller **valida, delega y arma la respuesta**. Nunca sale a la red ni
consulta datos por su cuenta (`Http::`, `DB::table()`, `DB::connection()`);
`DB::transaction()` sí, que no es consultar sino delimitar una escritura. Un
service nunca recibe un `Request`. Esto no es una
convención de estilo: **se verifica con un test de arquitectura** (ver
`references/tests-y-verificacion.md`) que falla si se viola. Una convención
sin test que la verifique se erosiona sola — es la lección más repetida en el
análisis de portal-hospital: la mayoría de sus reglas están bien escritas y
mal cumplidas, precisamente porque el test y el documento que las definen
nunca se subieron al repo.

**La primera decisión en cualquier sistema nuevo: esto se versiona.** Las
reglas como documentación en `docs/` y los tests de arquitectura, dentro del
repo del proyecto. Lo que es configuración de un agente (`CLAUDE.md`,
`.claude/`, estas skills) es personal y va en el `.gitignore`: una regla que
vive sólo ahí no existe para quien clona.

## Qué leer según lo que estés por tocar

| Vas a... | Leé |
|---|---|
| Escribir o revisar un controller, decidir si algo va en Policy/Gate o `abort_unless` | `references/capas-y-controllers.md` |
| Crear un service, integrar un sistema externo, decidir si degradar o fallar | `references/servicios-e-integraciones.md` |
| Loguear un fallo, decidir qué mensaje llega al usuario | `references/manejo-de-errores-y-logging.md` |
| Escribir un modelo o una migración | `references/modelos-y-datos.md` |
| Validar un formulario, nombrar algo (clase, método, ruta, columna) | `references/validacion-y-nombres.md` |
| Escribir un comentario | `references/comentarios.md` |
| Escribir un test, o proteger una convención con uno | `references/tests-y-verificacion.md` |

## Checklist antes de dar por terminado un módulo de backend

- [ ] Ningún controller sale a la red ni consulta datos por su cuenta
      (`Http::`, `DB::table()`, `DB::connection()`): eso vive en un service.
      `DB::transaction()` sí va en el controller — delimitar una escritura no
      es acceso a datos.
- [ ] Todo service que puede fallar parcialmente declara en el docblock su
      contrato: `null` si no se pudo consultar, `[]` si no hay datos.
- [ ] Un permiso que no se puede verificar **responde que no** — nunca
      "degradar" hacia adentro de una decisión de autorización.
- [ ] La autorización sobre un recurso ajeno se resuelve buscándolo **dentro
      del conjunto que le pertenece al usuario logueado**, nunca comparando
      un ID que vino del navegador.
- [ ] Ninguna credencial, host ni IP vive fuera de `.env` /
      `config()` — y ningún `config/*.php` tiene un default que apunte a
      infraestructura real.
- [ ] `$table` explícito en todo modelo de dominio en español.
- [ ] Toda convención nueva que valga la pena repetir tiene, o va a tener, un
      test — y ese test está versionado.

## Qué no copiar de portal-hospital tal cual

Portal-hospital es la mejor referencia de backend del hospital, pero tiene
deuda conocida y decisiones que no generalizan. No arrastres esto a un sistema
nuevo sin pensarlo:

- **`verify => false` en llamadas HTTP** — es del entorno de red del hospital.
  Sólo tiene sentido si tu sistema pega contra otro sistema interno con el
  mismo problema de certificados, y siempre con el comentario que explica por
  qué (si no, alguien lo "arregla" y rompe la integración).
- **Infraestructura hardcodeada como default en `config/database.php`**
  (host, base, usuario de una conexión externa) — publica topología de red
  interna en el repo y hace que la app parezca configurada con el `.env`
  vacío. El default de una conexión externa es vacío, y falla claro si falta.
- **`routes/api.php` con rutas sin `auth` "porque son de sólo lectura"** — dos
  quedaron así en portal-hospital y es la última deuda de seguridad que le
  queda. Si tu sistema no tiene necesidad real de un archivo de rutas sin
  sesión, no lo crees.
- **Modelos anémicos (cero scopes, cero accessors)** — funciona en
  portal-hospital porque casi no tiene datos locales. Un sistema con datos de
  dominio reales (turnos, cirugías, materiales) necesita scopes (`vigente()`,
  `delCirujano()`) y accessors desde el principio; la ausencia de esa capa no
  es una convención a imitar, es una consecuencia de que el portal no la
  necesitaba.
- **Degradar en silencio ante cualquier fallo** — matizalo. Portal-hospital
  degrada porque es de cara al paciente y tiene que seguir mostrándose sin
  red. Un sistema operativo interno (turnos de quirófano, stock de
  materiales) puede preferir fallar visible antes que mostrar un panel
  incompleto sin decirlo. Lo que **no** se negocia en ningún caso: un sistema
  caído se avisa, nunca se silencia como si no tuviera datos.

## Instalar esta skill en un sistema nuevo

Igual que `marca-hu`: `hu-kit/instalar.ps1` la copia a las skills de usuario
(`%USERPROFILE%\.claude\skills\`), sin versionarla en ningún proyecto. Ver el
`README.md` de `hu-kit`.
