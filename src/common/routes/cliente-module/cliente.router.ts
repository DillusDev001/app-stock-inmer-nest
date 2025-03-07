export const routeClienteCreateMultiple = {
	route: '[POST].../v1/cliente/multiple',
	title: 'Create Multiple Cliente'
};

export const routeClienteCreate = {
	route: '[POST].../v1/cliente',
	title: 'Create Cliente'
};

export const routeClienteFindOne = {
	route: '[GET].../v1/cliente/:id_cliente',
	title: 'Find One Cliente'
};

export const routeClienteFindAll = {
	route: '[GET].../v1/cliente',
	title: 'Find All Cliente'
};

export const routeClienteFindBy = {
	route: '[GET].../v1/cliente/find-by/:attribute/:value/:orderBy',
	title: 'Find By Cliente Attribute & Value'
};

export const routeClienteUpdate = {
	route: '[PATCH].../v1/cliente/:id_cliente',
	title: 'Update Cliente'
};

export const routeClienteRemove = {
	route: '[DELETE].../v1/cliente/:id_cliente',
	title: 'Remove Cliente'
};