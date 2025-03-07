export const routeSucursalUsuarioCreateMultiple = {
	route: '[POST].../v1/sucursal-usuario/multiple',
	title: 'Create Multiple SucursalUsuario'
};

export const routeSucursalUsuarioCreate = {
	route: '[POST].../v1/sucursal-usuario',
	title: 'Create SucursalUsuario'
};

export const routeSucursalUsuarioFindOne = {
	route: '[GET].../v1/sucursal-usuario/:id_sucursal/:usuario',
	title: 'Find One SucursalUsuario'
};

export const routeSucursalUsuarioFindAll = {
	route: '[GET].../v1/sucursal-usuario',
	title: 'Find All SucursalUsuario'
};

export const routeSucursalUsuarioFindBy = {
	route: '[GET].../v1/sucursal-usuario/find-by/:attribute/:value/:orderBy',
	title: 'Find By SucursalUsuario Attribute & Value'
};

export const routeSucursalUsuarioUpdate = {
	route: '[PATCH].../v1/sucursal-usuario/:id_sucursal/:usuario',
	title: 'Update SucursalUsuario'
};

export const routeSucursalUsuarioRemove = {
	route: '[DELETE].../v1/sucursal-usuario/:id_sucursal/:usuario',
	title: 'Remove SucursalUsuario'
};