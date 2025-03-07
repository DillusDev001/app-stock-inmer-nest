export const routePrendaCreateMultiple = {
	route: '[POST].../v1/prenda/multiple',
	title: 'Create Multiple Prenda'
};

export const routePrendaCreate = {
	route: '[POST].../v1/prenda',
	title: 'Create Prenda'
};

export const routePrendaFindOne = {
	route: '[GET].../v1/prenda/:cod_prenda',
	title: 'Find One Prenda'
};

export const routePrendaFindAll = {
	route: '[GET].../v1/prenda',
	title: 'Find All Prenda'
};

export const routePrendaFindBy = {
	route: '[GET].../v1/prenda/find-by/:attribute/:value/:orderBy',
	title: 'Find By Prenda Attribute & Value'
};

export const routePrendaUpdate = {
	route: '[PATCH].../v1/prenda/:cod_prenda',
	title: 'Update Prenda'
};

export const routePrendaRemove = {
	route: '[DELETE].../v1/prenda/:cod_prenda',
	title: 'Remove Prenda'
};