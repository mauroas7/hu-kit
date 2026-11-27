import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { DayPicker } from 'react-day-picker';
import { propsDelCalendario } from './Calendario.jsx';
import Campo, { claseControl, descritoPor } from './Campo.jsx';
import Icono from './Icono.jsx';
import { aFecha, fechaCompleta, fechaIso } from './fechas.js';

/**
 * El único calendario para elegir un día en todo el sistema, en vez del
 * `type="date"` del navegador: ése muestra día/mes o mes/día según el idioma
 * de la PC y no se puede estilar. `valor` y el `onChange` hablan `YYYY-MM-DD`;
 * `limpiable` deja borrarla (va '') y `conAnio` salta de año, para nacimientos.
 */

// Los desplegables de mes y año de `conAnio`; lo demás es del calendario.
const CLASES = {
    ...propsDelCalendario.classNames,
    root: 'w-[21rem] text-sm text-brandText dark:text-gray-100',
    dropdowns: 'flex items-center gap-3',
    dropdown_root: 'relative inline-flex items-center rounded-lg px-1 hover:bg-primary-faint dark:hover:bg-primary/30',
    dropdown: 'absolute inset-0 z-10 w-full cursor-pointer opacity-0',
};

export default function SelectorFecha({
    nombre,
    etiqueta = null,
    valor = '',
    onChange,
    desde = null,
    hasta = null,
    limpiable = false,
    conAnio = false,
    ayuda = null,
    error = null,
    requerido = false,
}) {
    const elegida = aFecha(valor);
    const minimo = aFecha(desde);
    const maximo = aFecha(hasta);

    const fueraDeRango = [minimo && { before: minimo }, maximo && { after: maximo }].filter(Boolean);

    return (
        <Campo id={nombre} etiqueta={etiqueta} ayuda={ayuda} error={error} requerido={requerido}>
            <Popover className="relative">
                <PopoverButton
                    id={nombre}
                    aria-invalid={error ? 'true' : undefined}
                    aria-describedby={descritoPor(nombre, error, ayuda)}
                    className={`${claseControl(!! error)} flex items-center gap-2 text-left`}
                >
                    <Icono nombre="calendar_month" className="text-lg leading-5 text-primary dark:text-gray-300" />
                    {elegida ? (
                        <span className="truncate first-letter:uppercase">{fechaCompleta(elegida)}</span>
                    ) : (
                        <span className="truncate text-brandText-muted dark:text-brandText-mutedDark">Elegí una fecha</span>
                    )}
                </PopoverButton>

                <PopoverPanel
                    transition
                    anchor={{ to: 'bottom start', gap: 8 }}
                    className="z-flotante rounded-2xl border border-brandText-soft/70 bg-white p-3 shadow-lg transition duration-150 ease-out data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:border-gray-800 dark:bg-surface-dark"
                >
                    {({ close }) => (
                        <>
                            <DayPicker
                                {...propsDelCalendario}
                                mode="single"
                                selected={elegida ?? undefined}
                                defaultMonth={elegida ?? (conAnio ? maximo : null) ?? undefined}
                                disabled={fueraDeRango.length ? fueraDeRango : undefined}
                                captionLayout={conAnio ? 'dropdown' : 'label'}
                                startMonth={conAnio ? (minimo ?? new Date(1900, 0)) : undefined}
                                endMonth={conAnio ? (maximo ?? new Date()) : undefined}
                                onSelect={(dia) => {
                                    if (! dia) return;
                                    onChange(fechaIso(dia));
                                    close();
                                }}
                                classNames={CLASES}
                            />

                            {limpiable && elegida && (
                                <div className="mt-2 flex justify-end border-t border-brandText-soft/60 pt-2 dark:border-gray-800">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onChange('');
                                            close();
                                        }}
                                        className="rounded-xl px-3 py-1.5 text-sm font-semibold text-primary hover:bg-primary-faint dark:text-gray-100 dark:hover:bg-primary/30"
                                    >
                                        Borrar fecha
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </PopoverPanel>
            </Popover>
        </Campo>
    );
}
