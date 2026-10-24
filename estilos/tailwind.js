import forms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme.js';
import { colores } from './tokens.js';

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

            // Los valores y su porqué, en `tokens.js`.
            colors: colores,

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
