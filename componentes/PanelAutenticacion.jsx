import { Head } from '@inertiajs/react';
import ApplicationLogo from './ApplicationLogo.jsx';

/**
 * La pantalla de autenticación de todos los sistemas, copiada del login del
 * portal de pacientes: a la izquierda el panel azul con el nombre del sistema,
 * a la derecha el título y el formulario (`children`). Medidas y porqué, en
 * `skills/marca-hu/references/componentes.md`.
 */
export default function PanelAutenticacion({ tituloPestana, nombre, bajada, rotulo, titulo, subtitulo = null, children }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-canvas p-4 font-sans antialiased dark:bg-canvas-dark lg:p-8">
            <Head title={tituloPestana} />

            <div className="flex min-h-[600px] w-full max-w-[1000px] animate-fade-in flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-surface-dark md:flex-row">
                <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 dark:bg-primary-dark md:flex md:w-2/5">
                    <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-glow-white"></div>
                    <div className="absolute -right-10 top-20 h-40 w-40 rounded-full bg-glow-secondary"></div>

                    <div className="relative z-10 mt-4">
                        {/* El margen negativo compensa el aire del SVG: el dibujo arranca alineado con el nombre. */}
                        <ApplicationLogo variante="blanco" className="mb-12 -ml-[5%] h-auto w-4/5 opacity-95" />
                        {/* 48 px recién desde xl: más angosto, una palabra de nueve letras no entra en el panel. */}
                        <h2 className="mb-4 text-3xl font-black uppercase leading-tight tracking-tight text-white lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight">
                            {nombre}
                        </h2>
                        <p className="pr-4 text-sm font-semibold leading-relaxed text-blue-100/75">{bajada}</p>
                    </div>

                    <div className="relative z-10">
                        <div className="mb-3 h-1 w-8 rounded-full bg-white"></div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-100/50">{rotulo}</p>
                    </div>
                </div>

                <div className="relative flex w-full flex-col items-center justify-center p-8 md:w-3/5 lg:p-12">
                    {/* El alto del formulario del portal: con él, el título cae a la misma altura aunque el formulario sea más corto. */}
                    <div className="w-full max-w-md md:min-h-[445px]">
                        <div className="mb-8 flex justify-center md:hidden">
                            <ApplicationLogo className="h-auto w-32" />
                        </div>

                        <div className="mb-10">
                            <h1 className="mb-2 text-3xl font-black tracking-tight text-primary dark:text-gray-100">{titulo}</h1>
                            {subtitulo && (
                                <p className="text-sm font-semibold text-brandText dark:text-brandText-dark">{subtitulo}</p>
                            )}
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
