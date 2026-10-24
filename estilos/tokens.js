/*
 * Los colores de la marca, para el preset de Tailwind y para lo que no lee
 * clases, como la barra de progreso de Inertia:
 *     import { colores } from 'hu-kit/tokens';
 *
 * Los tres ★ son los colores del Manual de Marca y no se tocan. El resto son
 * derivados de interfaz. Prohibido el color arbitrario (bg-[#...]): si falta
 * un tono, se agrega acá con nombre.
 */
export const colores = {
    primary: {
        DEFAULT: '#003764', // ★ MANUAL — Pantone 2955 C
        dark: '#00284A',
        light: '#0B457F',
        soft: '#D8E3ED', // fondo de estado sobre canvas
        faint: '#EEF3F8', // fondo de sección
    },
    secondary: {
        DEFAULT: '#C7A36E', // ★ MANUAL — Pantone 465 M. Como texto, sólo sobre `primary`.
        light: '#D4B07B', // el manual pide cambio de tono en hover
        dark: '#85693E', // el dorado para texto sobre fondo claro: 4,6:1 o más, salvo sobre `primary-soft`
        faint: '#F8F2E8',
    },
    brandText: {
        DEFAULT: '#59595b', // ★ MANUAL — gris del texto del logotipo
        dark: '#D1D5DB', // texto en modo oscuro
        muted: '#6D6D6F', // texto secundario: 4,6:1 o más sobre los fondos claros, salvo `primary-soft` (4,0:1)
        mutedDark: '#9CA3AF', // texto secundario en modo oscuro: 7,3:1 sobre `surface-dark`
        soft: '#D7D7D8', // bordes y separadores
    },
    // Fondo neutro de la app.
    canvas: {
        DEFAULT: '#F4F7F9',
        dark: '#001A33',
    },
    // Tarjetas, modales y paneles sobre `canvas`. En oscuro va más profundo
    // que el canvas, no más claro.
    surface: {
        DEFAULT: '#FFFFFF',
        dark: '#001526',
    },
};
