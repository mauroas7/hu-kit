/*
 * Arma un PDF: compila el catálogo, lo levanta, le saca las capturas con Edge
 * sin ventana y después imprime el HTML. Sin argumento (o `guia`), imprime
 * `guia.html` a `docs/guia-hu-kit.pdf` (`npm run guia`); con `plantilla`,
 * `plantilla.html` a `docs/plantilla-hu.pdf` (`npm run plantilla`), y falla si
 * las páginas del PDF no son las hojas del HTML. Otro navegador basado en
 * Chromium sirve igual: su ruta va en la variable NAVEGADOR.
 */
import { execFile } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { build, preview } from 'vite';

const ejecutar = promisify(execFile);

const NAVEGADOR = process.env.NAVEGADOR ?? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const CONFIG = fileURLToPath(new URL('../vite.config.js', import.meta.url));
const CAPTURAS = fileURLToPath(new URL('../dist/capturas/', import.meta.url));
const DOCS = fileURLToPath(new URL('../../docs/', import.meta.url));

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

// El ingreso y el registro van en claro aunque la URL pida oscuro: se capturan sin `tema`.
const CAPTURAS_DE_LA_PLANTILLA = [
    ['ingreso', 'seccion=ingreso', 800],
    ['registro-1', 'seccion=registro&paso=1&resultado=sin-historia', 800],
    ['registro-2', 'seccion=registro&paso=2', 800],
    ['registro-3', 'seccion=registro&paso=3', 800],
    ['listado', 'seccion=listado'],
    ['listado-oscuro', 'seccion=listado&tema=oscuro'],
    ['listado-celular', 'seccion=listado', 900, 500],
    ['paciente', 'seccion=paciente'],
    ['paciente-oscuro', 'seccion=paciente&tema=oscuro'],
    ['paciente-celular', 'seccion=paciente', 900, 500],
    ['tablero', 'seccion=tablero'],
    ['detalle', 'seccion=detalle'],
    ['formulario', 'seccion=formulario', 1000],
    ['piezas', 'seccion=piezas', 825, 1000],
];

const MODOS = {
    guia: { capturas: CAPTURAS_DE_LA_GUIA, html: 'guia.html', pdf: 'guia-hu-kit.pdf' },
    plantilla: { capturas: CAPTURAS_DE_LA_PLANTILLA, html: 'plantilla.html', pdf: 'plantilla-hu.pdf' },
};

const modo = process.argv[2] ?? 'guia';
if (!MODOS[modo]) {
    console.error(`Modo desconocido: «${modo}». Usá «guia» o «plantilla».`);
    process.exit(1);
}
const { capturas: CAPTURAS_A_SACAR, html: HTML, pdf } = MODOS[modo];
const PDF = DOCS + pdf;

// Una hoja de la plantilla que no entra en una página se parte en dos: el PDF tendría más páginas que hojas.
function verificarHojas() {
    const hojas = readFileSync(fileURLToPath(new URL(`../${HTML}`, import.meta.url)), 'utf8').match(/<section class="hoja[ "]/g).length;
    // Edge guarda los objetos de página comprimidos: lo que se lee es el /Count del árbol de páginas, que no lo está.
    const paginas = Math.max(0, ...[...readFileSync(PDF).toString('latin1').matchAll(/\/Count (\d+)/g)].map((c) => Number(c[1])));

    if (paginas !== hojas) {
        throw new Error(`El PDF tiene ${paginas} páginas y ${HTML} tiene ${hojas} hojas: alguna hoja no entra en una página.`);
    }
    console.log(`Páginas: ${paginas}`);
}

// Edge devuelve el control antes de terminar de escribir: se espera a que el archivo exista y deje de crecer.
async function esperar(archivo) {
    let tamano = -1;

    for (let intento = 0; intento < 120; intento++) {
        await new Promise((listo) => setTimeout(listo, 500));
        const actual = existsSync(archivo) ? statSync(archivo).size : -1;
        if (actual > 0 && actual === tamano) return;
        tamano = actual;
    }

    throw new Error('El navegador no generó ' + archivo);
}

async function capturar(perfil, url, archivo, alto, ancho) {
    rmSync(archivo, { force: true });
    await ejecutar(NAVEGADOR, [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--no-first-run',
        `--user-data-dir=${perfil}`,
        `--window-size=${ancho},${alto}`,
        // Deja terminar las animaciones de entrada antes de sacar la foto; el toast de éxito se va a los 5 s, así que sigue a la vista a los 3 s de la captura.
        '--virtual-time-budget=3000',
        `--screenshot=${archivo}`,
        url,
    ]);
    await esperar(archivo);
}

async function imprimir(perfil, url, archivo) {
    rmSync(archivo, { force: true });
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
    await esperar(archivo);
}

await build({ configFile: CONFIG, logLevel: 'warn' });

const servidor = await preview({ configFile: CONFIG, preview: { port: 4179 }, logLevel: 'warn' });
const base = servidor.resolvedUrls.local[0];
const perfil = mkdtempSync(join(tmpdir(), 'hu-kit-guia-'));

try {
    mkdirSync(CAPTURAS, { recursive: true });

    for (const [nombre, consulta, alto = 900, ancho = ANCHO] of CAPTURAS_A_SACAR) {
        await capturar(perfil, `${base}?${consulta}`, join(CAPTURAS, `${nombre}.png`), alto, ancho);
        console.log(`captura: ${nombre}`);
    }

    mkdirSync(DOCS, { recursive: true });
    await imprimir(perfil, `${base}${HTML}`, PDF);
    console.log(`PDF: ${PDF}`);
    if (modo === 'plantilla') verificarHojas();
} finally {
    await new Promise((listo) => servidor.httpServer.close(listo));
    rmSync(perfil, { recursive: true, force: true, maxRetries: 10, retryDelay: 500 });
}
