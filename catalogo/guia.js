// La guía es HTML fijo: sólo necesita la marca (Montserrat, los colores del preset) y la tapa, que dice la versión y el mes en que se imprime.
import './catalogo.css';
import { version } from '../package.json';

const mes = new Date().toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
document.getElementById('version').textContent = `Versión ${version} · ${mes}`;
