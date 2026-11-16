# Plan — `npx hu-kit instalar`: un sistema nuevo del HU con un comando

**Objetivo:** que un dev que arranca un sistema del HU sobre un Laravel 12 con
Breeze React recién instalado corra `npx hu-kit instalar` y quede todo
resuelto: ingreso, registro, recuperación de contraseña, tablero, perfil, marco,
estilos y modo oscuro. Después, simular el flujo desde cero con «Farmacia HU»
en `C:\laragon\www\farmacia-hu`, con los comandos listos para Cmder.

## Decisiones

- **Un comando del paquete npm, no `hu:install` ni `hu-plantilla`.** Vive en el
  mismo tag que los componentes: una sola cosa que versionar. `hu-plantilla`
  sale de «Qué falta» y de la guía; roles y tests de convenciones quedan
  anotados como lo que el instalador no trae.
- **Breeze pone el backend; hu-kit reemplaza todo lo que se ve.** Las 6
  pantallas de Auth, el dashboard y Profile (Edit + 3 parciales) pasan a
  hu-kit; `/` redirige a `/dashboard` (sin sesión, el middleware lleva al
  ingreso); se borran `Welcome.jsx`, los dos Layouts y los 12 `Components/` de
  Breeze, que quedan sin uso. Ninguna pantalla de Breeze queda a la vista.
- **Nombre y bajada: `--nombre` y `--bajada`, y si faltan los pregunta.** Se
  escriben en `resources/js/sistema.js` (lo leen el marco y las pantallas de
  ingreso: tres o más archivos, por eso un archivo propio) y en `APP_NAME` del
  `.env` (el título de la pestaña).
- **Sólo módulos de Node, sin dependencias nuevas** (`fs`, `path`,
  `readline/promises`, `child_process`). Un solo archivo,
  `bin/hu-kit.js`; las plantillas en `instalador/`, con las rutas del proyecto
  destino (`instalador/resources/js/Pages/Auth/Login.jsx`, …).
- **Se niega a correr fuera de un Breeze React:** pide `artisan`,
  `laravel/breeze` en `composer.json` y `resources/js/app.jsx`. Correrlo dos
  veces deja lo mismo.
- **Instala `react-day-picker` si falta** (`npm install react-day-picker`):
  hu-kit lo pide y Breeze no lo trae.
- **Al final:** `php artisan view:clear` (`copy`/`copyFile` conservan la fecha y
  Laravel seguiría con la vista compilada), borra `public/hot` (si existe,
  Laravel le pide todo a Vite) y `npm run build`. Va diciendo cada paso, como
  `conectar.bat`.
- **El tablero de la plantilla es de arranque, no el de Farmacia:** la fila de
  `Metrica` y la tabla de pedidos inventados de la demo no sirven a otro
  sistema. Va una `Tarjeta` de bienvenida con `EstadoVacio` que dice dónde
  armar la primera pantalla.
- **`<body>` de `app.blade.php`:** `min-h-full bg-canvas font-sans
  text-brandText antialiased dark:bg-canvas-dark dark:text-brandText-dark`. El
  README lo documenta (hoy no lo dice nadie).
- **Es v1.17.0** (algo nuevo, nada deja de andar). El borde de los controles,
  U7 de `docs/planes/auditoria.md`, pasa a v1.18.0; la viñeta de U6 sobre el
  comando de `guia.html:297` desaparece, porque U3 de este plan reescribe esa
  sección. Las dos cosas se anotan en `auditoria.md` en el commit de U3.
- **`ExampleTest`:** con `/` redirigiendo, el `assertStatus(200)` de Laravel
  falla. El instalador reemplaza esa línea por `assertRedirect('/dashboard')`
  (es la misma línea con PHPUnit y con Pest).

## Lo que no se toca

- El backend de Breeze: controllers, rutas de `auth.php`, requests, tests de
  Auth y de Profile.
- Los componentes de hu-kit: el instalador sólo usa exports que ya existen.

## U1 — El comando y las pantallas que ya probó la demo

**Estado:** hecha

**Qué cambia:**
- `bin/hu-kit.js`: `#!/usr/bin/env node`, subcomando `instalar` (otro, o
  ninguno: imprime el uso). Chequeo de Breeze, nombre y bajada, copia de
  plantillas, `sistema.js`, `APP_NAME`, `react-day-picker`, `view:clear`,
  `public/hot`, `npm run build`. En Windows `spawnSync(..., { shell: true })`
  para `npm` y `php`. `sistema.js` se escribe con `JSON.stringify` (comillas en
  el nombre).
- `package.json`: `"bin": { "hu-kit": "bin/hu-kit.js" }`; `files` suma `bin/`
  e `instalador/`.
- `instalador/`: las 8 de `C:\laragon\www\farmacia-demo\demo\hu-kit\`
  (`tailwind.config.js`, `app.css`, `app.blade.php`, `app.jsx`,
  `HandleInertiaRequests.php`, `AppLayout.jsx`, `Dashboard.jsx`, `Login.jsx`)
  más `Register.jsx`, nuevo. Generalizadas: `AppLayout` y `Login` leen
  `sistema.js`; `AppLayout` sin el `rol: 'Farmacia'`; `Login` con los enlaces a
  «¿Olvidaste tu contraseña?» y a registrarse; `Register` con
  `PanelAutenticacion`, `Input`, `PasswordInput` y `descritoPor(id, error,
  ayuda)` (el error es el segundo argumento).

**Reglas:** `marca-hu` (copy, componentes), comentarios sólo del porqué.

**Revisar** (en `farmacia-demo`, ver Verificación): el ingreso y el registro
del HU en claro y oscuro; registrar un usuario lleva al tablero; el nombre y la
bajada del panel azul son los pasados por flag; la pestaña dice el nombre.

## U2 — El resto de Breeze

**Estado:** pendiente

**Qué cambia:**
- `instalador/`: `ForgotPassword`, `ResetPassword`, `ConfirmPassword` y
  `VerifyEmail` con `PanelAutenticacion`; `Profile/Edit.jsx` con `AppLayout` y
  sus tres parciales con `Tarjeta`, `Input`, `PasswordInput`, `Boton` y
  `ModalConfirmar` (borrar la cuenta). Mismos props que manda el
  `ProfileController` de Breeze (`mustVerifyEmail`, `status`).
- `instalador/routes/web.php`: el de Breeze sin la ruta de `Welcome`, con
  `Route::redirect('/', '/dashboard')`.
- `bin/hu-kit.js`: borra `Pages/Welcome.jsx`, `Layouts/AuthenticatedLayout.jsx`,
  `Layouts/GuestLayout.jsx` y `resources/js/Components/` de Breeze; ajusta
  `tests/Feature/ExampleTest.php`.

**Revisar:** «Mi cuenta» abre el perfil dentro del marco del HU; cambiar el
nombre muestra el toast; el modal de borrar la cuenta; «¿Olvidaste tu
contraseña?» y su pantalla; `/` sin sesión cae en el ingreso; ninguna
pantalla con el logo de Laravel; `php artisan test` verde.

## U3 — Documentación, guía y v1.17.0

**Estado:** pendiente

**Qué cambia:**
- `README.md`: sección «Arrancar un sistema nuevo» con los comandos, qué
  reemplaza y qué borra el instalador, la clase del `<body>`, y lo que no trae
  (roles, tests de convenciones); «Qué falta» pierde `hu-plantilla`; la línea
  de la plantilla PDF deja de nombrarla. «Qué se versiona dónde»: el paquete
  trae también `bin/` e `instalador/`.
- `catalogo/guia.html`, sección 4 «Arrancar Farmacia HU»: los dos bloques
  (hu-plantilla y el camino largo) pasan a uno, con los comandos del instalador
  y `#vX.Y.Z`. Las otras menciones de `hu-plantilla` (`:90`, `:511`) pasan a
  «el instalador». PDF regenerado con `npm run guia`.
- `CHANGELOG.md`: v1.17.0.
- `package.json`: `version` 1.17.0.
- `docs/planes/auditoria.md`: U7 pasa a v1.18.0; U6 pierde la viñeta de `:297`.

**Revisar:** en el PDF, la sección 4 entra en su página y los comandos son los
de la simulación; ningún `hu-plantilla` queda en README ni guía.

**Después del commit (Mauro):** tag `v1.17.0` y push (los comandos van en la
propuesta de commit).

## U4 — Simulación desde cero con «Farmacia HU»

**Estado:** pendiente

**Antes:** v1.17.0 publicada. Se borra `C:\laragon\www\farmacia-demo` (antes,
U1 ya copió sus plantillas a hu-kit).

**Comandos, de a uno, en Cmder** (los pasa la sesión, los corre Mauro):

```
cd C:\laragon\www
composer create-project "laravel/laravel:^12.0" farmacia-hu
cd farmacia-hu
composer require laravel/breeze --dev
php artisan breeze:install react
npm install hu-kit@github:mauroas7/hu-kit#v1.17.0
npx hu-kit instalar --nombre "Farmacia HU" --bajada "Pedidos y stock de farmacia."
php artisan db:seed
```

Laragon › Recargar, para que aparezca `farmacia-hu.localhost`.

**Qué cambia en hu-kit:** se borra este plan (`docs/planes/instalador.md`).

**Revisar** (`revisor-visual`, en `http://farmacia-hu.localhost`): ingreso con
`test@example.com` / `password`; registro de un usuario nuevo; tablero; modo
oscuro con la luna, y que sobrevive a F5; perfil; `/` sin sesión.

## Verificación

- U1 y U2, antes del tag, en `farmacia-demo`: `demo\volver`, después `npm pack`
  en hu-kit e `npm install <ruta>\hu-kit-1.17.0.tgz` en `farmacia-demo` (prueba
  `bin` y `files` como los va a ver un sistema), y
  `npx hu-kit instalar --nombre "Farmacia HU" --bajada "…"`. Luego
  `php artisan test` y `revisor-visual` con el `Revisar:` de la unidad.
  Correrlo una segunda vez: mismo resultado.
- Correrlo en una carpeta sin Breeze: se niega con un mensaje claro y no
  escribe nada.
- U3: `npm run catalogo:build` y `npm run guia` sin errores.
- U4: la simulación de arriba, de punta a punta.
