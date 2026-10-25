import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import Icono from './Icono.jsx';

/**
 * Lo que dejó el servidor con `->with('exito', …)`, flotando abajo, para las
 * pantallas donde un aviso arriba de todo no se vería (una subida a mitad de
 * página). El éxito se va solo a los 5 s; un error queda hasta que se cierra.
 * `className` lo ubica, por ejemplo sobre una barra inferior fija.
 */
export default function AvisoFlotante({ className = 'inset-x-3 bottom-6 lg:inset-x-auto lg:right-6' }) {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(true);
    const exito = flash?.exito;
    const error = flash?.error ?? flash?.aviso;

    // Cada visita trae su `flash`: el mismo mensaje dos veces seguidas vuelve a aparecer.
    useEffect(() => {
        setVisible(true);
        if (! exito || error) return undefined;

        const temporizador = setTimeout(() => setVisible(false), 5000);

        return () => clearTimeout(temporizador);
    }, [flash]);

    const mensaje = visible ? (error ?? exito) : null;
    const caja = mensaje && (
        <p
            className={`flex max-w-md animate-fade-in items-center gap-3 rounded-2xl px-5 py-4 text-base font-semibold text-white shadow-2xl ${
                error ? 'bg-red-700' : 'bg-emerald-700'
            }`}
        >
            <Icono nombre={error ? 'error' : 'check_circle'} className="text-2xl" relleno />
            <span className="flex-1">{mensaje}</span>
            <button
                type="button"
                onClick={() => setVisible(false)}
                aria-label="Cerrar el aviso"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-white/15"
            >
                <Icono nombre="close" className="text-xl" />
            </button>
        </p>
    );

    // El `status` está montado antes que el éxito: uno que aparece ya escrito no lo
    // anuncian todos los lectores. Un `alert`, en cambio, se anuncia al aparecer.
    return (
        <div className={`fixed z-toast flex justify-center ${className}`}>
            <div role="status">{! error && caja}</div>
            {error && caja && <div role="alert">{caja}</div>}
        </div>
    );
}
