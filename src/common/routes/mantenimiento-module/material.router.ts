export const routeMaterialCreateMultiple = {
	route: '[POST].../v1/material/multiple',
	title: 'Create Multiple Material'
};

export const routeMaterialCreate = {
	route: '[POST].../v1/material',
	title: 'Create Material'
};

export const routeMaterialFindOne = {
	route: '[GET].../v1/material/:id_material',
	title: 'Find One Material'
};

export const routeMaterialFindAll = {
	route: '[GET].../v1/material',
	title: 'Find All Material'
};

export const routeMaterialFindBy = {
	route: '[GET].../v1/material/find-by/:attribute/:value/:orderBy',
	title: 'Find By Material Attribute & Value'
};

export const routeMaterialUpdate = {
	route: '[PATCH].../v1/material/:id_material',
	title: 'Update Material'
};

export const routeMaterialRemove = {
	route: '[DELETE].../v1/material/:id_material',
	title: 'Remove Material'
};