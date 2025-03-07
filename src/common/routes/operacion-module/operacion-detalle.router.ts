export const routeOperacionDetalleCreateMultiple = {
	route: '[POST].../v1/operacion-detalle/multiple',
	title: 'Create Multiple OperacionDetalle'
};

export const routeOperacionDetalleCreate = {
	route: '[POST].../v1/operacion-detalle',
	title: 'Create OperacionDetalle'
};

export const routeOperacionDetalleFindOne = {
	route: '[GET].../v1/operacion-detalle/:cod_operacion/:cod_producto',
	title: 'Find One OperacionDetalle'
};

export const routeOperacionDetalleFindAll = {
	route: '[GET].../v1/operacion-detalle',
	title: 'Find All OperacionDetalle'
};

export const routeOperacionDetalleFindBy = {
	route: '[GET].../v1/operacion-detalle/find-by/:attribute/:value/:orderBy',
	title: 'Find By OperacionDetalle Attribute & Value'
};

export const routeOperacionDetalleUpdate = {
	route: '[PATCH].../v1/operacion-detalle/:cod_operacion/:cod_producto',
	title: 'Update OperacionDetalle'
};

export const routeOperacionDetalleRemove = {
	route: '[DELETE].../v1/operacion-detalle/:cod_operacion/:cod_producto',
	title: 'Remove OperacionDetalle'
};