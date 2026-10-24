/*
 * Arma la guía en PDF: compila el catálogo, lo levanta, le saca las capturas
 * con Edge sin ventana y después imprime `guia.html` a `docs/guia-hu-kit.pdf`.
 * Se corre con `npm run guia`. Otro navegador basado en Chromium sirve igual:
 * su ruta va en la variable NAVEGADOR.
 */
import { execFile } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { build, preview } from 'vite';

const ejecutar = promisify(execFile);

const NAVEGADOR = process.env.NAVEGADOR ?? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const CONFIG = fileURLToPath(new URL('../vite.config.js', import.meta.url));
const CAPTURAS = fileURLToPath(new URL('../dist/capturas/', import.meta.url));
const PDF = fileURLToPath(new URL('../../docs/guia-hu-kit.pdf', import.meta.url));

// Cada captura es una sección del catálogo; las de piezas son largas y se sacan más altas.
const ANCHO = 1440;
const CAPTURAS_DE_LA_GUIA = [
    ['ingreso', 'seccion=ingreso'],
    ['tablero', 'seccion=tablero'],
    ['listado', 'seccion=listado'],
    ['formulario', 'seccion=formulario', 1000],
    ['detalle', 'seccion=detalle'],
    ['confirmacion', 'seccion=detalle&abrir=cancelar'],
    ['avisos', 'seccion=avisos'],
    ['listado-oscuro', 'seccion=listado&tema=oscuro'],
    ['detalle-oscuro', 'seccion=detalle&tema=oscuro'],
    // Chromium no abre ventanas de menos de 500 px: es un celular grande, pero ya es la vista de celular.
    ['celular', 'seccion=listado', 900, 500],
    ['inicio', 'seccion=inicio', 1100],
    ['botones', 'seccion=botones', 1200],
    ['campos', 'seccion=campos', 1500],
    ['contenido', 'seccion=contenido', 2300],
    ['navegacion', 'seccion=navegacion'],
    ['archivos', 'seccion=archivos'],
];

async function capturar(perfil, url, archivo, alto, ancho) {
    await ejecutar(NAVEGADOR, [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--no-first-run',
        `--user-data-dir=${perfil}`,
        `--window-size=${ancho},${alto}`,
        // Deja terminar las animaciones de entrada antes de sacar la foto; el aviso flotante de éxito se va a los 5 s.
        '--virtual-time-budget=3000',
        `--screenshot=${archivo}`,
        url,
    ]);
}

async function imprimir(perfil, url, archivo) {
    await ejecutar(NAVEGADOR, [
        '--headless=new',
        '--disable-gpu',
        '--no-first-run',
        `--user-data-dir=${perfil}`,
        '--no-pdf-header-footer',
        '--virtual-time-budget=5000',
        `--print-to-pdf=${archivo}`,
        url,
    ]);
}

await build({ configFile: CONFIG, logLevel: 'warn' });

const servidor = await preview({ configFile: CONFIG, preview: { port: 4179 }, logLevel: 'warn' });
const base = servidor.resolvedUrls.local[0];
const perfil = mkdtempSync(join(tmpdir(), 'hu-kit-guia-'));

try {
    mkdirSync(CAPTURAS, { recursive: true });

    for (const [nombre, consulta, alto = 900, ancho = ANCHO] of CAPTURAS_DE_LA_GUIA) {
        await capturar(perfil, `${base}?${consulta}`, join(CAPTURAS, `${nombre}.png`), alto, ancho);
        console.log(`captura: ${nombre}`);
    }

    mkdirSync(fileURLToPath(new URL('../../docs/', import.meta.url)), { recursive: true });
    await imprimir(perfil, `${base}guia.html`, PDF);
    console.log(`PDF: ${PDF}`);
} finally {
    await new Promise((listo) => servidor.httpServer.close(listo));
    rmSync(perfil, { recursive: true, force: true });
}
