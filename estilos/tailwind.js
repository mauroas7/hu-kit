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

            // Las animaciones del sistema: sólo opacidad y transform, nada de más de
            // 200 ms (la barra del aviso marca su tiempo). Con `both` una animación
            // con transform deja aplicado su último cuadro, `matrix(1, 0, 0, 1, 0, 0)`
            // y no `none`: encierra a los `fixed` de adentro. Por eso `fade-in` es
            // sólo opacidad y el aviso va por un portal.
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                // El panel de un modal.
                'escala-in': {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'none' },
                },
                // Un paso del turnero: avanzar entra desde la derecha; volver, desde la izquierda.
                'paso-adelante': {
                    '0%': { opacity: '0', transform: 'translateX(16px)' },
                    '100%': { opacity: '1', transform: 'none' },
                },
                'paso-atras': {
                    '0%': { opacity: '0', transform: 'translateX(-16px)' },
                    '100%': { opacity: '1', transform: 'none' },
                },
                'aviso-in': {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'none' },
                },
                // Los menús desplegables: el del celular y el de perfil.
                'menu-in': {
                    '0%': { opacity: '0', transform: 'translateY(-4px)' },
                    '100%': { opacity: '1', transform: 'none' },
                },
                // La barra del tiempo del aviso. Es sólo la vista: el cierre lo cuenta JS,
                // porque con «reducir movimiento» la animación dura 0,01 ms.
                'barra-tiempo': {
                    '0%': { transform: 'scaleX(1)' },
                    '100%': { transform: 'scaleX(0)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 150ms ease-out both',
                'fade-in-lento': 'fade-in 200ms ease-out both',
                'fade-out': 'fade-out 150ms ease-in both',
                'escala-in': 'escala-in 200ms ease-out both',
                'paso-adelante': 'paso-adelante 200ms ease-out both',
                'paso-atras': 'paso-atras 200ms ease-out both',
                'aviso-in': 'aviso-in 200ms ease-out both',
                'menu-in': 'menu-in 150ms ease-out both',
                'barra-tiempo': 'barra-tiempo 5s linear both',
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
