import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { ErrorBoundary, ThemeProvider } from 'hu-kit/componentes';
import { colores } from 'hu-kit/tokens';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ErrorBoundary>
                <ThemeProvider usuarioInicial={props.initialPage.props.auth?.usuario?.id ?? null}>
                    <App {...props} />
                </ThemeProvider>
            </ErrorBoundary>,
        );
    },
    progress: {
        color: colores.secondary.DEFAULT,
    },
});
