// La plantilla es HTML fijo con la marca; los colores y sus usos no se escriben a mano: salen de estilos/tokens.js.
import './catalogo.css';
import { colores } from '../estilos/tokens.js';
import fuente from '../estilos/tokens.js?raw';

// El «uso» de cada color es el comentario que tiene en tokens.js: el de la misma línea o, para canvas y surface, el del grupo.
const usos = {};
let grupo = null;
let delGrupo = [];

for (const linea of fuente.split('\n')) {
    const abre = linea.match(/^ {4}(\w+): \{/);
    const token = linea.match(/^ {8}(\w+): '#[0-9a-fA-F]{6}',(?:\s*\/\/\s*(.*))?/);
    const comentario = linea.match(/^ {4}\/\/\s?(.*)/);

    if (abre) {
        grupo = abre[1];
        usos[`${grupo}.DEFAULT`] = delGrupo.join(' ');
        delGrupo = [];
    } else if (comentario) {
        delGrupo.push(comentario[1]);
    } else if (token && token[2]) {
        usos[`${grupo}.${token[1]}`] = token[2];
    }
}

const limpiar = (texto = '') => {
    const corto = texto
        .replace(/^★ MANUAL — /, '')
        .replace(/^Pantone [\w ]+?(\.\s*|$)/, '')
        .replace(/`/g, '')
        .split(/:|\.(?:\s|$)/)[0]
        .trim();

    return corto.charAt(0).toUpperCase() + corto.slice(1);
};

const filas = Object.entries(colores).flatMap(([nombre, tonos]) =>
    Object.entries(tonos).map(([tono, valor]) => {
        const clave = `${nombre}.${tono}`;
        const manual = /MANUAL/.test(usos[clave] ?? '');
        const etiqueta = tono === 'DEFAULT' ? nombre : `${nombre}-${tono}`;
        const insignia = manual
            ? ' <span class="ml-1 rounded-full bg-secondary-faint px-2 py-0.5 text-xs font-semibold uppercase text-secondary-dark">Manual</span>'
            : '';

        return `<tr>
            <td class="w-16 py-1 pr-3"><div class="h-6 w-12 rounded-lg border border-brandText-soft" style="background:${valor}"></div></td>
            <td class="py-1.5 pr-3 font-semibold text-primary">${etiqueta}${insignia}</td>
            <td class="py-1.5 pr-3 font-mono text-xs">${valor.toUpperCase()}</td>
            <td class="py-1.5">${limpiar(usos[clave])}</td>
        </tr>`;
    }),
);

document.getElementById('colores').innerHTML = filas.join('');

document.querySelectorAll('[data-token]').forEach((marca) => {
    const [nombre, tono] = marca.dataset.token.split('.');
    marca.textContent = colores[nombre][tono].toUpperCase();
});
