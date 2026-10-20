import { forwardRef, useState } from 'react';
import Icono from './Icono.jsx';

// El ojito de 'ingreso' es el del login del portal de pacientes.
const OJO = {
    normal: 'text-gray-500 dark:text-gray-400',
    ingreso: 'text-gray-400 dark:text-gray-500',
};

/**
 * Campo de contraseña con botón para mostrar/ocultar lo que se está tipeando.
 *
 * Se le pasa la misma clase que a cualquier input del formulario; el componente
 * agrega el espacio del botón y la tipografía de los puntitos cuando está
 * oculta (al mostrarla, el tracking ancho se saca para que se lea bien).
 */
export default forwardRef(function PasswordInput(
    { className = '', wrapperClassName = '', placeholder = '••••••••', variante = 'normal', ...props },
    ref,
) {
    const [visible, setVisible] = useState(false);

    const tipografia = visible ? 'tracking-normal' : 'font-black tracking-widest';

    return (
        <div className={`relative ${wrapperClassName}`}>
            <input
                {...props}
                ref={ref}
                placeholder={placeholder}
                type={visible ? 'text' : 'password'}
                className={`${className} ${tipografia} pr-12 placeholder:font-semibold placeholder:tracking-[5px] [&::-ms-reveal]:appearance-none [&::-ms-reveal]:!hidden [&::-ms-clear]:!hidden`}
            />

            <button
                type="button"
                onClick={() => setVisible((estaVisible) => !estaVisible)}
                aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                aria-pressed={visible}
                title={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className={`absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl ${OJO[variante] ?? OJO.normal} transition-colors hover:text-primary focus:outline-none focus-visible:text-primary`}
            >
                <Icono nombre={visible ? 'visibility_off' : 'visibility'} className="text-[20px]" />
            </button>
        </div>
    );
});
