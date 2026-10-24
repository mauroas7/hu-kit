/** Datos inventados para el catálogo: un usuario y un sistema de ejemplo de pedidos de insumos. */

export const USUARIO = {
    id: 1,
    nombre: 'Ana Gómez',
    email: 'agomez@hospital.uncu.edu.ar',
    rolEtiqueta: 'Coordinación',
};

const FLASH = {
    avisos: {
        exito: 'Se guardó el pedido.',
        error: 'No se pudo enviar el correo de aviso. El pedido quedó guardado.',
        aviso: 'Hay dos pedidos sin revisar desde la semana pasada.',
        info: 'El sistema se va a actualizar el viernes a las 20 h.',
    },
    formulario: { exito: 'Se guardó el borrador del pedido.' },
};

/** Lo que el servidor dejaría en `flash` al llegar a cada sección. */
export const flashDe = (seccion) => FLASH[seccion] ?? {};

export const href = (seccion, extra = {}) => `?${new URLSearchParams({ seccion, ...extra })}`;

export const PEDIDOS = [
    { id: 1048, insumo: 'Guantes de látex talle M', area: 'Quirófano', cantidad: 40, fecha: '2026-10-22', estado: 'Pendiente' },
    { id: 1047, insumo: 'Jeringas de 10 ml', area: 'Guardia', cantidad: 200, fecha: '2026-10-21', estado: 'Aprobado' },
    { id: 1046, insumo: 'Gasas estériles 10×10', area: 'Internación', cantidad: 150, fecha: '2026-10-21', estado: 'Entregado' },
    { id: 1045, insumo: 'Alcohol en gel 500 ml', area: 'Consultorios', cantidad: 24, fecha: '2026-10-20', estado: 'Rechazado' },
    { id: 1044, insumo: 'Barbijos quirúrgicos', area: 'Quirófano', cantidad: 300, fecha: '2026-10-19', estado: 'Entregado' },
    { id: 1043, insumo: 'Catéter periférico 20G', area: 'Guardia', cantidad: 60, fecha: '2026-10-18', estado: 'Aprobado' },
];

export const TONO_ESTADO = {
    Pendiente: 'aviso',
    Aprobado: 'info',
    Entregado: 'exito',
    Rechazado: 'error',
};

/** El paginador como lo serializa Laravel, apuntando al listado de ejemplo. */
export const PAGINADOR = {
    current_page: 2,
    last_page: 5,
    from: 7,
    to: 12,
    total: 29,
    prev_page_url: href('listado', { page: 1 }),
    next_page_url: href('listado', { page: 3 }),
    links: [1, 2, 3, 4, 5].map((page) => ({ page, url: href('listado', { page }) })),
};
