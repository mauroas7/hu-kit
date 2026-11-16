import { usePage } from '@inertiajs/react';
import { MarcoApp, rutaActiva } from 'hu-kit/componentes';
import { SISTEMA } from '@/sistema';

// El menú es de cada sistema: hu-kit sólo lo dibuja.
const SECCIONES = [
    { etiqueta: 'Tablero', icono: 'monitoring', ruta: 'dashboard' },
];

export default function AppLayout({ titulo, subtitulo = null, children }) {
    const { usuario } = usePage().props.auth;

    const secciones = SECCIONES.map((seccion) => ({
        ...seccion,
        href: route(seccion.ruta),
        activa: rutaActiva(seccion.ruta),
    }));

    return (
        <MarcoApp
            titulo={titulo}
            subtitulo={subtitulo}
            secciones={secciones}
            inicio={route('dashboard')}
            sistema={SISTEMA}
            usuario={usuario && { nombre: usuario.nombre, email: usuario.email }}
            enlaces={[{ etiqueta: 'Mi cuenta', icono: 'manage_accounts', href: route('profile.edit') }]}
            salir={route('logout')}
        >
            {children}
        </MarcoApp>
    );
}
