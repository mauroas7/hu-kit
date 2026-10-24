import { fileURLToPath } from 'node:url';
import huKit from '../estilos/tailwind.js';

const aqui = (ruta) => fileURLToPath(new URL(ruta, import.meta.url));

/** El mismo preset que instalan los sistemas, mirando los componentes del repo y no los de `node_modules`. */
export default {
    presets: [huKit],
    content: [aqui('./**/*.{html,js,jsx}'), aqui('../componentes/**/*.{js,jsx}'), `!${aqui('./dist/**')}`],
};
