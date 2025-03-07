export const routeClienteCuentaCreateMultiple = {
	route: '[POST].../v1/cliente-cuenta/multiple',
	title: 'Create Multiple ClienteCuenta'
};

export const routeClienteCuentaCreate = {
	route: '[POST].../v1/cliente-cuenta',
	title: 'Create ClienteCuenta'
};

export const routeClienteCuentaFindOne = {
	route: '[GET].../v1/cliente-cuenta/:id_cliente',
	title: 'Find One ClienteCuenta'
};

export const routeClienteCuentaFindAll = {
	route: '[GET].../v1/cliente-cuenta',
	title: 'Find All ClienteCuenta'
};

export const routeClienteCuentaFindBy = {
	route: '[GET].../v1/cliente-cuenta/find-by/:attribute/:value/:orderBy',
	title: 'Find By ClienteCuenta Attribute & Value'
};

export const routeClienteCuentaUpdate = {
	route: '[PATCH].../v1/cliente-cuenta/:id_cliente',
	title: 'Update ClienteCuenta'
};

export const routeClienteCuentaRemove = {
	route: '[DELETE].../v1/cliente-cuenta/:id_cliente',
	title: 'Remove ClienteCuenta'
};