export const routeOperacionPagoCreateMultiple = {
	route: '[POST].../v1/operacion-pago/multiple',
	title: 'Create Multiple OperacionPago'
};

export const routeOperacionPagoCreate = {
	route: '[POST].../v1/operacion-pago',
	title: 'Create OperacionPago'
};

export const routeOperacionPagoFindOne = {
	route: '[GET].../v1/operacion-pago/:cod_operacion/:sec_pago',
	title: 'Find One OperacionPago'
};

export const routeOperacionPagoFindAll = {
	route: '[GET].../v1/operacion-pago',
	title: 'Find All OperacionPago'
};

export const routeOperacionPagoFindBy = {
	route: '[GET].../v1/operacion-pago/find-by/:attribute/:value/:orderBy',
	title: 'Find By OperacionPago Attribute & Value'
};

export const routeOperacionPagoUpdate = {
	route: '[PATCH].../v1/operacion-pago/:cod_operacion/:sec_pago',
	title: 'Update OperacionPago'
};

export const routeOperacionPagoRemove = {
	route: '[DELETE].../v1/operacion-pago/:cod_operacion/:sec_pago',
	title: 'Remove OperacionPago'
};