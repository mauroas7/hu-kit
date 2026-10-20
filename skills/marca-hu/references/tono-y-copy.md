# Tono y copy

El manual no dicta un tono de voz explícito, pero los dos sistemas reales
convergen en el mismo registro — seguilo en vez de inventar uno nuevo.

## Español rioplatense, voseo

Toda la copy de portal-hospital usa **voseo**, no tuteo ni "usted": *"desde
aquí **podés** administrar…"*, *"¿Todavía no **tenés** cuenta?"*, *"**hacé**
clic ahí para confirmarlo"*. Es consistente en las 40+ pantallas del portal.
Un sistema nuevo del hospital escribe su copy igual — nunca "puedes", "tienes"
ni "usted".

## Directo, informal-profesional

Frases cortas, imperativo directo para las acciones ("Guardar", "Confirmar
turno", no "Proceder a guardar los cambios"). El registro es cercano pero no
casual — es un sistema de salud, no una app de consumo: sin emojis, sin
signos de exclamación decorativos, sin humor.

## Términos de dominio en español, sin traducir

`Turno`, `Especialidad`, `Médico`, `Quirófano`, `Cirugía` — el nombre del
dominio va en español y no se angliza ni se abrevia en la UI, aunque el código
interno use nombres en inglés en algún punto de integración externa.

## Mensajes de error: cuándo ser preciso y cuándo ser ambiguo a propósito

Regla real del portal, no un capricho de estilo: **un mensaje de error puede
filtrar información** si distingue casos que no debería distinguir. Ejemplo
citado en el propio código (`RegistroPacienteException`): al verificar un DNI,
"no existe esa persona" y "los datos no coinciden" **comparten el mismo
mensaje** a propósito — si fueran distintos, alguien podría usar el formulario
para averiguar qué documentos están registrados en el hospital, probando al
azar.

La pregunta a hacerse antes de escribir un mensaje de error específico: *¿esta
distinción le sirve al usuario legítimo, o sólo le sirve a alguien que está
probando datos ajenos?* Si es lo segundo, un mensaje genérico es la opción
correcta, no una omisión.

Para todo lo demás (validación de formulario, estado de una integración
caída), el mensaje sí debe ser específico y accionable: "No pudimos consultar
tus estudios de laboratorio en este momento" es mejor que "Ocurrió un error" —
la ambigüedad se reserva para lo que protege datos de otra persona, no para
ocultar fallos propios del sistema.
