import './catalogo.css';

import { createInertiaApp, router } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary, ThemeProvider } from '../componentes/index.js';
import Catalogo from './Catalogo.jsx';
import { USUARIO, flashDe } from './datos.js';

const parametros = new URLSearchParams(window.location.search);
const seccionInicial = parametros.get('seccion') ?? 'inicio';

/*
 * No hay servidor: la página de Inertia se arma acá y cada visita se cancela
 * y se resuelve en el navegador con `router.push`, que cambia la sección sin
 * pedir nada. Así los `Link` de los componentes andan como en un sistema.
 */
router.on('before', (evento) => {
    evento.preventDefault();

    const { url, method } = evento.detail.visit;
    const seccion = url.searchParams.get('seccion');

    if (method !== 'get' || ! seccion) return;

    router.push({
        url: `${url.pathname}${url.search}`,
        props: (actuales) => ({ ...actuales, seccion, flash: flashDe(seccion) }),
    });
});

createInertiaApp({
    page: {
        component: 'Catalogo',
        props: { auth: { usuario: USUARIO }, seccion: seccionInicial, flash: flashDe(seccionInicial), errors: {} },
        url: `${window.location.pathname}${window.location.search}`,
        version: null,
        encryptHistory: false,
        clearHistory: false,
    },
    title: (titulo) => (titulo ? `${titulo} · Catálogo hu-kit` : 'Catálogo hu-kit'),
    resolve: () => Catalogo,
    setup({ el, App, props }) {
        createRoot(el).render(
            <ErrorBoundary>
                <ThemeProvider usuarioInicial={USUARIO.id}>
                    <App {...props} />
                </ThemeProvider>
            </ErrorBoundary>,
        );
    },
    progress: false,
});
