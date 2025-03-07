export const routeClienteCuentaHistorialCreateMultiple = {
	route: '[POST].../v1/cliente-cuenta-historial/multiple',
	title: 'Create Multiple ClienteCuentaHistorial'
};

export const routeClienteCuentaHistorialCreate = {
	route: '[POST].../v1/cliente-cuenta-historial',
	title: 'Create ClienteCuentaHistorial'
};

export const routeClienteCuentaHistorialFindOne = {
	route: '[GET].../v1/cliente-cuenta-historial/:id_historial/:id_cliente',
	title: 'Find One ClienteCuentaHistorial'
};

export const routeClienteCuentaHistorialFindAll = {
	route: '[GET].../v1/cliente-cuenta-historial',
	title: 'Find All ClienteCuentaHistorial'
};

export const routeClienteCuentaHistorialFindBy = {
	route: '[GET].../v1/cliente-cuenta-historial/find-by/:attribute/:value/:orderBy',
	title: 'Find By ClienteCuentaHistorial Attribute & Value'
};

export const routeClienteCuentaHistorialUpdate = {
	route: '[PATCH].../v1/cliente-cuenta-historial/:id_historial/:id_cliente',
	title: 'Update ClienteCuentaHistorial'
};

export const routeClienteCuentaHistorialRemove = {
	route: '[DELETE].../v1/cliente-cuenta-historial/:id_historial/:id_cliente',
	title: 'Remove ClienteCuentaHistorial'
};