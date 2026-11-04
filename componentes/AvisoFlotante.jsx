import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePage } from '@inertiajs/react';
import Icono from './Icono.jsx';

// Del más urgente al menos; el tope evita que una página tape la pantalla con avisos.
const TIPOS = ['error', 'aviso', 'exito', 'info'];
const MAXIMO = 3;
const DURACION = 5000;

const ESTILOS = {
    exito: {
        icono: 'check',
        chip: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
        pista: 'bg-emerald-100 dark:bg-emerald-950',
        relleno: 'bg-emerald-700 dark:bg-emerald-300',
    },
    error: { icono: 'priority_high', chip: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' },
    aviso: { icono: 'warning', chip: 'bg-secondary-faint text-secondary-dark dark:bg-secondary/15 dark:text-secondary' },
    info: {
        icono: 'info',
        chip: 'bg-primary-soft text-primary dark:bg-primary/30 dark:text-gray-100',
        pista: 'bg-primary-soft dark:bg-primary/30',
        relleno: 'bg-primary dark:bg-primary-bright',
    },
};

// El éxito y la info pasan solos; un error o un aviso se quedan hasta que se cierran.
const TEMPORALES = ['exito', 'info'];
const URGENTES = ['error', 'aviso'];

// El servidor manda un string o `{ titulo, detalle }`; por dentro es siempre lo segundo.
const normalizar = (valor) => (typeof valor === 'string' ? { titulo: valor } : valor);
const leer = ({ titulo, detalle }) => [titulo, detalle].filter(Boolean).join('. ');

// Las dos regiones del lector de pantalla se crean una vez y quedan en <body>: las
// páginas remontan el marco en cada visita, y una región que nace ya escrita puede callarse.
let regiones = null;
function regionesDeAnuncio() {
    regiones ??= ['status', 'alert'].map((role) => {
        const region = document.createElement('div');
        region.setAttribute('role', role);
        region.className = 'sr-only';
        document.body.append(region);

        return region;
    });

    return regiones;
}

function Toast({ tipo, mensaje, onCerrar }) {
    const { icono, chip, pista, relleno } = ESTILOS[tipo];
    const temporal = TEMPORALES.includes(tipo);
    const tarjeta = useRef(null);
    const [progreso, setProgreso] = useState(1);

    // Un solo reloj que guarda cuánto resta, y corre sólo si no hay motivo de pausa:
    // el puntero o el foco sobre la tarjeta, o la pestaña oculta.
    useEffect(() => {
        if (! temporal) return undefined;

        const el = tarjeta.current;
        const motivos = new Set(document.hidden ? ['oculta'] : []);
        let resto = DURACION;
        let antes = null;
        let cuadro = 0;

        const paso = (ahora) => {
            resto -= antes === null ? 0 : ahora - antes;
            antes = ahora;
            setProgreso(Math.max(resto, 0) / DURACION);

            if (resto <= 0) return onCerrar(tipo);
            cuadro = requestAnimationFrame(paso);
        };
        const pausar = (motivo, activo) => {
            if (activo) motivos.add(motivo); else motivos.delete(motivo);

            cancelAnimationFrame(cuadro);
            antes = null;
            if (motivos.size === 0) cuadro = requestAnimationFrame(paso);
        };

        const entra = () => pausar('puntero', true);
        const sale = () => pausar('puntero', false);
        const enfoca = () => pausar('foco', true);
        const desenfoca = (evento) => pausar('foco', el.contains(evento.relatedTarget));
        const visibilidad = () => pausar('oculta', document.hidden);

        el.addEventListener('pointerenter', entra);
        el.addEventListener('pointerleave', sale);
        el.addEventListener('focusin', enfoca);
        el.addEventListener('focusout', desenfoca);
        document.addEventListener('visibilitychange', visibilidad);
        pausar('inicio', false);

        return () => {
            cancelAnimationFrame(cuadro);
            el.removeEventListener('pointerenter', entra);
            el.removeEventListener('pointerleave', sale);
            el.removeEventListener('focusin', enfoca);
            el.removeEventListener('focusout', desenfoca);
            document.removeEventListener('visibilitychange', visibilidad);
        };
    }, [temporal]);

    return (
        <div
            ref={tarjeta}
            onKeyDown={(evento) => evento.key === 'Escape' && onCerrar(tipo)}
            className="relative flex w-full max-w-md animate-fade-in items-start gap-3 overflow-hidden rounded-2xl border border-brandText-soft bg-surface py-3 pl-4 pr-1 shadow-2xl dark:border-gray-800 dark:bg-surface-dark"
        >
            <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${chip}`}>
                <Icono nombre={icono} className="text-xl" relleno />
            </span>

            <div className="min-w-0 flex-1 break-words pt-1.5 text-base">
                <p className="font-semibold text-primary dark:text-gray-100">{mensaje.titulo}</p>
                {mensaje.detalle && <p className="font-normal text-brandText dark:text-brandText-dark">{mensaje.detalle}</p>}
            </div>

            <button
                type="button"
                onClick={() => onCerrar(tipo)}
                aria-label="Cerrar el aviso"
                className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg hover:bg-brandText/10 dark:hover:bg-white/10"
            >
                <Icono nombre="close" className="text-xl" />
            </button>

            {temporal && (
                <div aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-1 ${pista}`}>
                    <div className={`h-full origin-left ${relleno}`} style={{ transform: `scaleX(${progreso})` }} />
                </div>
            )}
        </div>
    );
}

/**
 * Lo que dejó el servidor con `->with('exito', …)`, flotando abajo: una tarjeta
 * por tipo, con título y detalle opcional. `className` lo ubica, por ejemplo
 * sobre una barra inferior fija.
 */
export default function AvisoFlotante({ className = 'inset-x-3 bottom-6 lg:inset-x-auto lg:right-6' }) {
    const { flash } = usePage().props;
    const [visita, setVisita] = useState(0);
    const [cerrados, setCerrados] = useState([]);
    const [anterior, setAnterior] = useState(flash);
    const [anuncios, setAnuncios] = useState(null);

    useEffect(() => setAnuncios(regionesDeAnuncio()), []);

    // Cada visita trae su `flash`: el mismo mensaje dos veces seguidas vuelve a aparecer.
    // Se ajusta al renderizar y no en un efecto, para que la primera vez no se monte dos.
    if (flash !== anterior) {
        setAnterior(flash);
        setCerrados([]);
        setVisita((n) => n + 1);
    }

    const visibles = TIPOS.filter((tipo) => flash?.[tipo] && ! cerrados.includes(tipo))
        .slice(0, MAXIMO)
        .map((tipo) => [tipo, normalizar(flash[tipo])]);
    const llegados = TIPOS.filter((tipo) => flash?.[tipo]).map((tipo) => [tipo, normalizar(flash[tipo])]);
    const texto = (urgentes) => llegados.filter(([tipo]) => URGENTES.includes(tipo) === urgentes).map(([, mensaje]) => leer(mensaje)).join(' ');

    // Se anuncia todo lo que llegó, no lo que sigue visible: cerrar un toast no repite el resto.
    // La `key` hace que el mismo mensaje, al llegar otra vez, se vuelva a leer.
    // El toast cuelga de <body>: la animación de un ancestro lo encerraría (ver `tailwind.js`).
    return (
        <>
            {anuncios && createPortal(<span key={visita}>{texto(false)}</span>, anuncios[0])}
            {anuncios && createPortal(<span key={visita}>{texto(true)}</span>, anuncios[1])}

            {anuncios && visibles.length > 0 && createPortal(
                <div className={`fixed z-toast flex flex-col items-center gap-2 lg:items-end ${className}`}>
                    {visibles.map(([tipo, mensaje]) => (
                        <Toast key={`${visita}-${tipo}`} tipo={tipo} mensaje={mensaje} onCerrar={(cual) => setCerrados((c) => [...c, cual])} />
                    ))}
                </div>,
                document.body,
            )}
        </>
    );
}
