import { createContext, useContext } from 'react';
import { DayButton, DayPicker } from 'react-day-picker';
import { es } from 'react-day-picker/locale';
import { claseBoton } from './Boton.jsx';
import Icono from './Icono.jsx';
import Rotulo from './Rotulo.jsx';
import { aFecha, fechaCompleta, fechaIso } from './fechas.js';

const FLECHA_DEL_MES = `${claseBoton({ variante: 'fantasma', forma: 'grupo', tamano: 'icono' })} aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:active:scale-100`;

const DIAS_CORTOS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
const DIAS_LARGOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

/**
 * Lo que `SelectorFecha` comparte con el calendario: la semana desde el lunes,
 * las flechas, las celdas de 44 px y cada día con su fecha larga y `aria-pressed`.
 */
export const propsDelCalendario = {
    locale: es,
    weekStartsOn: 1,
    classNames: {
        months: 'relative',
        month_caption: 'flex h-11 items-center justify-center',
        caption_label: 'flex items-center gap-0.5 text-sm font-black uppercase tracking-wider text-primary dark:text-gray-100',
        nav: 'absolute inset-x-0 top-0 flex justify-between',
        button_previous: FLECHA_DEL_MES,
        button_next: FLECHA_DEL_MES,
        month_grid: 'mt-2 w-full table-fixed border-collapse',
        weekday: 'pb-1 text-xs font-semibold text-brandText-muted dark:text-brandText-mutedDark',
        day: 'p-0.5',
        day_button: 'flex h-11 w-full items-center justify-center rounded-xl text-sm tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
    },
    components: { Chevron: Flecha, DayButton: Dia },
    formatters: { formatWeekdayName: (fecha) => DIAS_CORTOS[fecha.getDay()] },
    labels: {
        labelPrevious: () => 'Mes anterior',
        labelNext: () => 'Mes siguiente',
        labelDayButton: (fecha) => fechaCompleta(fecha),
    },
};

// La agenda dibuja algo en cada día: celdas más altas, pegadas y con borde.
const CLASES_AGENDA = {
    ...propsDelCalendario.classNames,
    month_caption: 'flex h-[3.75rem] items-center justify-center border-b border-gray-100 dark:border-gray-800',
    caption_label: 'text-base font-black uppercase tracking-wider text-primary dark:text-gray-100',
    nav: 'absolute inset-x-0 top-0 flex justify-between px-3 py-2',
    month_grid: 'w-full table-fixed border-collapse',
    weekdays: 'border-b border-gray-100 bg-canvas dark:border-gray-800 dark:bg-canvas-dark',
    weekday: 'py-2 font-normal',
    day: 'border-b border-r border-gray-100 p-0 align-top dark:border-gray-800',
    hidden: 'bg-canvas/50 dark:bg-canvas-dark/40',
    day_button: 'relative flex min-h-[4.5rem] w-full flex-col items-start gap-1 p-2 text-left transition-colors hover:bg-primary-faint/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary dark:hover:bg-white/5',
};

const ContenidoDelDia = createContext(null);

/**
 * El calendario siempre abierto: el día del turnero o el mes de la agenda.
 * `disponible(fecha)` marca los días que se pueden elegir; sin ella, todos.
 * `contenidoDelDia(fecha)` lo pasa a la forma de la agenda, con eso en cada día.
 * `mes` y `onCambiarMes` lo controlan desde afuera; si no, arranca en `mesInicial`.
 */
export default function Calendario({
    valor = '',
    onElegir,
    disponible = null,
    sinPasado = false,
    mes = undefined,
    onCambiarMes = undefined,
    mesInicial = undefined,
    contenidoDelDia = null,
    etiqueta = undefined,
}) {
    const elegida = aFecha(valor);
    const hoy = new Date();
    const deshabilitados = [sinPasado && { before: hoy }, disponible && ((fecha) => ! disponible(fecha))].filter(Boolean);

    return (
        <ContenidoDelDia.Provider value={contenidoDelDia}>
            <DayPicker
                {...propsDelCalendario}
                mode="single"
                required
                aria-label={etiqueta}
                selected={elegida ?? undefined}
                onSelect={(dia) => onElegir(fechaIso(dia))}
                month={mes}
                onMonthChange={onCambiarMes}
                defaultMonth={mesInicial ?? elegida ?? undefined}
                startMonth={sinPasado ? hoy : undefined}
                disabled={deshabilitados.length ? deshabilitados : undefined}
                modifiers={disponible ? { disponible } : undefined}
                className={contenidoDelDia ? 'w-full' : 'w-full max-w-sm'}
                classNames={contenidoDelDia ? CLASES_AGENDA : propsDelCalendario.classNames}
                components={contenidoDelDia ? { ...propsDelCalendario.components, DayButton: DiaDeAgenda, Weekday: DiaDeLaSemana } : propsDelCalendario.components}
                formatters={contenidoDelDia ? { formatWeekdayName: (fecha) => DIAS_LARGOS[fecha.getDay()] } : propsDelCalendario.formatters}
            />
        </ContenidoDelDia.Provider>
    );
}

const CHEVRONES = { left: 'chevron_left', right: 'chevron_right', up: 'expand_less', down: 'expand_more' };

// Abajo y arriba son los de los desplegables de mes y año de `SelectorFecha`.
function Flecha({ orientation = 'down' }) {
    return <Icono nombre={CHEVRONES[orientation]} className={orientation === 'down' || orientation === 'up' ? 'text-lg' : 'text-[22px] leading-none'} />;
}

function Dia({ modifiers, className, ...props }) {
    return <DayButton {...props} modifiers={modifiers} aria-pressed={!! modifiers.selected} className={`${className} ${claseDelDia(modifiers)}`} />;
}

// El anillo de hoy no va en el elegido: ahí el relleno ya lo distingue.
function claseDelDia(modifiers) {
    // El peso va en cada caso y no en la base: `font-semibold` le gana a `font-normal` por el orden del CSS.
    if (modifiers.selected) return 'bg-primary font-semibold text-white dark:bg-white dark:text-primary';
    if (modifiers.disabled) return 'cursor-not-allowed font-normal text-gray-500 dark:text-gray-400';

    const hoy = modifiers.today ? 'ring-1 ring-inset ring-secondary' : '';

    return modifiers.disponible
        ? `${hoy} bg-primary-faint font-semibold text-primary hover:bg-primary-soft dark:bg-primary/30 dark:text-gray-100`
        : `${hoy} font-semibold text-primary hover:bg-primary-faint dark:text-gray-100 dark:hover:bg-primary/30`;
}

function DiaDeAgenda({ day, modifiers, className, children, ...props }) {
    const contenidoDelDia = useContext(ContenidoDelDia);
    const marca = modifiers.selected
        ? 'bg-primary-faint ring-2 ring-inset ring-primary dark:bg-primary/30'
        : modifiers.today
          ? 'ring-1 ring-inset ring-secondary'
          : '';
    const colorDelNumero = modifiers.disabled ? 'text-brandText-muted dark:text-brandText-mutedDark' : 'text-primary dark:text-gray-100';

    // Sin `aria-label`: el nombre del botón es la fecha larga más lo que muestra el día («3 libres»).
    return (
        <DayButton {...props} aria-label={undefined} day={day} modifiers={modifiers} aria-pressed={!! modifiers.selected} className={`${className} ${marca}`}>
            <span aria-hidden="true" className={`text-sm font-semibold tabular-nums ${colorDelNumero}`}>{children}</span>
            <span className="sr-only">{fechaCompleta(day.date)}</span>
            {contenidoDelDia(day.date)}
        </DayButton>
    );
}

function DiaDeLaSemana({ children, ...props }) {
    return (
        <th {...props}>
            <Rotulo>{children}</Rotulo>
        </th>
    );
}
