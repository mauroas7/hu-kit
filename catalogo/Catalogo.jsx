import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { MarcoApp, useTheme } from '../componentes/index.js';
import { href } from './datos.js';
import Archivos from './secciones/Archivos.jsx';
import Avisos from './secciones/Avisos.jsx';
import Botones from './secciones/Botones.jsx';
import Campos from './secciones/Campos.jsx';
import Contenido from './secciones/Contenido.jsx';
import Inicio from './secciones/Inicio.jsx';
import Modales from './secciones/Modales.jsx';
import Navegacion from './secciones/Navegacion.jsx';
import Detalle from './ejemplos/Detalle.jsx';
import Formulario from './ejemplos/Formulario.jsx';
import Ingreso from './ejemplos/Ingreso.jsx';
import Listado from './ejemplos/Listado.jsx';
import Tablero from './ejemplos/Tablero.jsx';

/** Las piezas, agrupadas como en el menú del catálogo. */
export const PIEZAS = [
    { clave: 'inicio', etiqueta: 'Qué es esto', icono: 'home', vista: Inicio, titulo: 'Catálogo', subtitulo: 'Todas las piezas de hu-kit, en claro y en oscuro' },
    { clave: 'botones', etiqueta: 'Botones', icono: 'smart_button', vista: Botones },
    { clave: 'campos', etiqueta: 'Campos', icono: 'edit_note', vista: Campos },
    { clave: 'contenido', etiqueta: 'Contenido', icono: 'dashboard', vista: Contenido },
    { clave: 'navegacion', etiqueta: 'Navegación', icono: 'tab', vista: Navegacion },
    { clave: 'avisos', etiqueta: 'Avisos', icono: 'notifications', vista: Avisos },
    { clave: 'modales', etiqueta: 'Modales', icono: 'web_asset', vista: Modales },
    { clave: 'archivos', etiqueta: 'Archivos', icono: 'upload_file', vista: Archivos },
];

/** Las pantallas de un sistema inventado, «Pedidos HU», armadas sólo con piezas de hu-kit. */
export const EJEMPLOS = [
    { clave: 'tablero', etiqueta: 'Tablero', icono: 'monitoring', vista: Tablero, subtitulo: 'Cómo vienen los pedidos este mes' },
    { clave: 'listado', etiqueta: 'Pedidos', icono: 'list_alt', vista: Listado, subtitulo: 'Los pedidos de insumos de todas las áreas' },
    { clave: 'formulario', etiqueta: 'Nuevo pedido', icono: 'add_box', vista: Formulario, ancho: 'formulario' },
    { clave: 'detalle', etiqueta: 'Pedido 1048', icono: 'description', vista: Detalle, ancho: 'lectura', enMenu: false, activaEn: 'listado' },
];

const ENLACES = [{ etiqueta: 'Mi cuenta', icono: 'manage_accounts', href: href('inicio') }];

const USUARIO_DEL_MARCO = (usuario) => ({ nombre: usuario.nombre, email: usuario.email, rol: usuario.rolEtiqueta });

const comoSeccion = (actual) => (item) => ({
    etiqueta: item.etiqueta,
    icono: item.icono,
    href: href(item.clave),
    activa: actual.clave === item.clave || actual.activaEn === item.clave,
});

/** `?tema=oscuro` abre el catálogo en oscuro, para capturarlo sin tocar nada. */
function useTemaDeLaUrl() {
    const { theme, alternar } = useTheme();

    useEffect(() => {
        if (new URLSearchParams(window.location.search).get('tema') === 'oscuro' && theme !== 'dark') alternar();
    }, []);
}

export default function Catalogo() {
    const { auth, seccion } = usePage().props;
    useTemaDeLaUrl();

    if (seccion === 'ingreso') return <Ingreso />;

    const ejemplo = EJEMPLOS.find((item) => item.clave === seccion);
    const actual = ejemplo ?? PIEZAS.find((item) => item.clave === seccion) ?? PIEZAS[0];
    const Vista = actual.vista;

    // Una pantalla de ejemplo se ve como un sistema de verdad: su menú es el de «Pedidos HU».
    const secciones = ejemplo
        ? [
              ...EJEMPLOS.filter((item) => item.enMenu !== false).map(comoSeccion(actual)),
              { etiqueta: 'Volver al catálogo', icono: 'arrow_back', href: href('inicio'), titulo: 'Catálogo' },
          ]
        : [
              ...PIEZAS.map(comoSeccion(actual)),
              ...EJEMPLOS.filter((item) => item.enMenu !== false).map((item, indice) => ({
                  ...comoSeccion(actual)(item),
                  titulo: indice === 0 ? 'Pantallas de ejemplo' : undefined,
              })),
              { etiqueta: 'Ingreso', icono: 'login', href: href('ingreso') },
          ];

    return (
        <MarcoApp
            titulo={actual.titulo ?? actual.etiqueta}
            subtitulo={actual.subtitulo ?? null}
            ancho={actual.ancho ?? 'completo'}
            secciones={secciones}
            inicio={href(ejemplo ? 'tablero' : 'inicio')}
            sistema={ejemplo ? { nombre: 'Pedidos HU', bajada: 'Un sistema de ejemplo' } : { nombre: 'hu-kit', bajada: 'Catálogo de piezas' }}
            usuario={USUARIO_DEL_MARCO(auth.usuario)}
            enlaces={ENLACES}
            salir="?salir"
        >
            <Vista />
        </MarcoApp>
    );
}
