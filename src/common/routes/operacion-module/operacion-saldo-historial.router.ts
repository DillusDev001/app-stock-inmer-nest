export const routeOperacionSaldoHistorialCreateMultiple = {
	route: '[POST].../v1/operacion-saldo-historial/multiple',
	title: 'Create Multiple OperacionSaldoHistorial'
};

export const routeOperacionSaldoHistorialCreate = {
	route: '[POST].../v1/operacion-saldo-historial',
	title: 'Create OperacionSaldoHistorial'
};

export const routeOperacionSaldoHistorialFindOne = {
	route: '[GET].../v1/operacion-saldo-historial/:id_historial/:cod_operacion',
	title: 'Find One OperacionSaldoHistorial'
};

export const routeOperacionSaldoHistorialFindAll = {
	route: '[GET].../v1/operacion-saldo-historial',
	title: 'Find All OperacionSaldoHistorial'
};

export const routeOperacionSaldoHistorialFindBy = {
	route: '[GET].../v1/operacion-saldo-historial/find-by/:attribute/:value/:orderBy',
	title: 'Find By OperacionSaldoHistorial Attribute & Value'
};

export const routeOperacionSaldoHistorialUpdate = {
	route: '[PATCH].../v1/operacion-saldo-historial/:id_historial/:cod_operacion',
	title: 'Update OperacionSaldoHistorial'
};

export const routeOperacionSaldoHistorialRemove = {
	route: '[DELETE].../v1/operacion-saldo-historial/:id_historial/:cod_operacion',
	title: 'Remove OperacionSaldoHistorial'
};