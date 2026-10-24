import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/*
 * El catálogo y la guía son dos páginas del mismo build. `base: './'` deja
 * abrir el build desde cualquier carpeta, como hace `guia/generar.mjs`.
 */
export default defineConfig({
    root: fileURLToPath(new URL('.', import.meta.url)),
    base: './',
    plugins: [react()],
    css: {
        postcss: fileURLToPath(new URL('.', import.meta.url)),
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        // Es una página local: un solo archivo de 600 kB no le cuesta nada a nadie.
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            input: {
                catalogo: fileURLToPath(new URL('index.html', import.meta.url)),
                guia: fileURLToPath(new URL('guia.html', import.meta.url)),
            },
        },
    },
});
