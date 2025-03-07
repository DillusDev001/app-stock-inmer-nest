export const routeOperacionCreateMultiple = {
	route: '[POST].../v1/operacion/multiple',
	title: 'Create Multiple Operacion'
};

export const routeOperacionCreate = {
	route: '[POST].../v1/operacion',
	title: 'Create Operacion'
};

export const routeOperacionFindOne = {
	route: '[GET].../v1/operacion/:cod_operacion',
	title: 'Find One Operacion'
};

export const routeOperacionFindAll = {
	route: '[GET].../v1/operacion',
	title: 'Find All Operacion'
};

export const routeOperacionFindBy = {
	route: '[GET].../v1/operacion/find-by/:attribute/:value/:orderBy',
	title: 'Find By Operacion Attribute & Value'
};

export const routeOperacionUpdate = {
	route: '[PATCH].../v1/operacion/:cod_operacion',
	title: 'Update Operacion'
};

export const routeOperacionRemove = {
	route: '[DELETE].../v1/operacion/:cod_operacion',
	title: 'Remove Operacion'
};