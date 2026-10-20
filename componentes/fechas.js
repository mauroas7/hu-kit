const LOCALE = 'es-AR';

/**
 * El backend manda ISO 8601 con huso (`2026-09-18T08:30:00-03:00`), que el
 * navegador lee como local sin trampas.
 *
 * Una fecha sin hora sí tiene trampa: `new Date` la lee en UTC y en Argentina
 * muestra el día anterior, así que se le pega la hora antes de parsear.
 */
export function aFecha(valor) {
    if (! valor) return null;
    if (valor instanceof Date) return valor;

    const texto = /^\d{4}-\d{2}-\d{2}$/.test(valor) ? `${valor}T00:00:00` : valor;
    const fecha = new Date(texto);

    return Number.isNaN(fecha.getTime()) ? null : fecha;
}

/** viernes 19 de septiembre de 2026 */
export const fechaCompleta = (valor) => {
    const fecha = aFecha(valor);

    return fecha
        ? fecha.toLocaleDateString(LOCALE, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        : '--';
};

/** 2026-09-18, en hora local: `toISOString()` pasa a UTC y a la noche cambia el día. */
export const fechaIso = (fecha) => {
    const dos = (n) => String(n).padStart(2, '0');

    return `${fecha.getFullYear()}-${dos(fecha.getMonth() + 1)}-${dos(fecha.getDate())}`;
};
