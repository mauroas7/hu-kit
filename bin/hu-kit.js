#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const plantillas = join(dirname(fileURLToPath(import.meta.url)), '..', 'instalador');
const proyecto = process.cwd();

const USO = `Uso: npx hu-kit instalar [--nombre "Farmacia HU"] [--bajada "Pedidos y stock."]

Convierte un Laravel 12 con Breeze React recién instalado en un sistema del HU.
Si faltan --nombre o --bajada, los pregunta.`;

function opcion(argumentos, nombre) {
    const i = argumentos.indexOf(`--${nombre}`);

    return i === -1 ? null : (argumentos[i + 1] ?? null);
}

async function preguntar(pregunta) {
    const consola = createInterface({ input: process.stdin, output: process.stdout });
    const respuesta = (await consola.question(pregunta)).trim();
    consola.close();

    return respuesta;
}

function fallar(mensaje) {
    console.error(`\n  ${mensaje}\n`);
    process.exit(1);
}

function paso(texto) {
    console.log(`  ${texto}`);
}

// En Windows npm y php son .cmd/.bat: sin shell no se encuentran.
function correr(comando, argumentos, salida = 'ignore') {
    const resultado = spawnSync(comando, argumentos, { cwd: proyecto, shell: process.platform === 'win32', stdio: salida });

    return resultado.status === 0;
}

function esBreezeReact() {
    const faltantes = [];

    if (!existsSync(join(proyecto, 'artisan'))) faltantes.push('artisan (no es un proyecto de Laravel)');
    if (!existsSync(join(proyecto, 'resources/js/app.jsx'))) faltantes.push('resources/js/app.jsx (no es Breeze con React)');

    const composer = join(proyecto, 'composer.json');
    if (!existsSync(composer) || !readFileSync(composer, 'utf8').includes('laravel/breeze')) {
        faltantes.push('laravel/breeze en composer.json');
    }

    return faltantes;
}

function archivosDe(carpeta) {
    return readdirSync(carpeta, { withFileTypes: true }).flatMap((entrada) => {
        const ruta = join(carpeta, entrada.name);

        return entrada.isDirectory() ? archivosDe(ruta) : [ruta];
    });
}

function escribirNombreEnEnv(nombre) {
    const ruta = join(proyecto, '.env');
    const linea = `APP_NAME="${nombre.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`;

    if (!existsSync(ruta)) {
        writeFileSync(ruta, `${linea}\n`);
        return;
    }

    const env = readFileSync(ruta, 'utf8');
    writeFileSync(ruta, /^APP_NAME=.*$/m.test(env) ? env.replace(/^APP_NAME=.*$/m, () => linea) : `${linea}\n${env}`);
}

async function instalar(argumentos) {
    const faltantes = esBreezeReact();
    if (faltantes.length > 0) {
        fallar(`Esto no es un Laravel con Breeze React. Falta: ${faltantes.join(', ')}.\n  Correr el comando en la carpeta del proyecto, después de php artisan breeze:install react.`);
    }

    const nombre = opcion(argumentos, 'nombre') ?? (await preguntar('  Nombre del sistema (ej. Farmacia HU): '));
    const bajada = opcion(argumentos, 'bajada') ?? (await preguntar('  Bajada, una frase para el panel azul: '));
    if (!nombre) fallar('El nombre del sistema no puede quedar vacío.');

    console.log(`\n  Conectando hu-kit a ${nombre}\n`);

    paso('1. Pantallas, marco, estilos y modo oscuro del HU');
    for (const origen of archivosDe(plantillas)) {
        const destino = join(proyecto, relative(plantillas, origen));
        mkdirSync(dirname(destino), { recursive: true });
        copyFileSync(origen, destino);
        paso(`   ${relative(plantillas, origen).replaceAll('\\', '/')}`);
    }

    paso('2. sistema.js y APP_NAME: el nombre y la bajada del sistema');
    writeFileSync(join(proyecto, 'resources/js/sistema.js'), `export const SISTEMA = ${JSON.stringify({ nombre, bajada }, null, 4)};\n`);
    escribirNombreEnEnv(nombre);

    const paquete = JSON.parse(readFileSync(join(proyecto, 'package.json'), 'utf8'));
    if (!paquete.dependencies?.['react-day-picker'] && !paquete.devDependencies?.['react-day-picker']) {
        paso('3. react-day-picker, que pide hu-kit');
        if (!correr('npm', ['install', 'react-day-picker'])) fallar('npm install react-day-picker falló: correrlo a mano para ver el error.');
    }

    // copyFile conserva la fecha del archivo: sin esto Laravel sigue con la vista compilada de Breeze.
    paso('4. Limpiando las vistas compiladas');
    correr('php', ['artisan', 'view:clear']);
    // Con public/hot (lo deja npm run dev), Laravel le pide todo a Vite en vez de usar lo compilado.
    rmSync(join(proyecto, 'public/hot'), { force: true });

    paso('5. Compilando...');
    if (!correr('npm', ['run', 'build'])) fallar('La compilación falló: correr npm run build para ver el error.');

    console.log('\n  Listo: recargar el navegador.\n');
}

const [comando, ...argumentos] = process.argv.slice(2);

if (comando === 'instalar') {
    await instalar(argumentos);
} else {
    console.log(USO);
    process.exit(comando ? 1 : 0);
}
