import forms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme.js';

/*
 * El preset de marca de los sistemas del Hospital Universitario. Cada sistema
 * lo carga con `presets: [huKit]` y agrega en su propio config sólo lo que es
 * suyo (contenido, plugins, espaciados de sus componentes). Las decisiones y
 * su porqué, en `estilos/README.md`.
 */
export default {
    darkMode: 'class',

    // Los campos de `hu-kit/componentes` están dibujados sobre su base.
    plugins: [forms],

    // En una pantalla táctil el hover queda pegado después de tocar.
    future: {
        hoverOnlyWhenSupported: true,
    },

    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },

            // Los tres ★ son los colores del Manual de Marca y no se tocan. El
            // resto son derivados de interfaz. Prohibido el color arbitrario
            // (bg-[#...]): si falta un tono, se agrega acá con nombre.
            colors: {
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
                // Tarjetas, modales y paneles sobre `canvas`. En oscuro va más
                // profundo que el canvas, no más claro.
                surface: {
                    DEFAULT: '#FFFFFF',
                    dark: '#001526',
                },
            },

            // Lo que compite por estar encima de todo. Los z-10/20 locales de una
            // tarjeta no van acá.
            zIndex: {
                dropdown: '40',
                modal: '100',
                // Un panel anclado (un calendario) que puede abrirse dentro de un modal.
                flotante: '110',
                toast: '200',
            },

            // Termina en `transform: none` para no dejar un `transform` vivo que
            // encierre a los `fixed` de adentro; `both` aplica el 0% durante un delay.
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'none' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.3s ease-out both',
            },

            // Los dos círculos difusos del panel azul de las pantallas de ingreso.
            // El dorado es `secondary` (#C7A36E) en rgba: un degradé no lee tokens.
            backgroundImage: {
                'glow-white': 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                'glow-secondary': 'radial-gradient(circle, rgba(199,163,110,0.20) 0%, transparent 70%)',
            },

            // El hundido de un botón al apretarlo: 95 se nota demasiado en uno ancho.
            scale: {
                98: '0.98',
            },

            // El alto de la etiqueta de `Campo` (renglón text-sm + space-y-1.5) y
            // el de un control. Con ellos, una acción en la fila de un campo se
            // alinea con el control; si la fila se parte, sólo desde el ancho en
            // que entra entera (`md:mt-etiqueta`).
            spacing: {
                etiqueta: '1.625rem',
                control: '2.625rem',
            },
        },
    },
};
