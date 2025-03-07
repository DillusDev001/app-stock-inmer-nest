export const routeSucursalStockCreateMultiple = {
    route: '[POST].../v1/sucursal-stock/multiple',
    title: 'Create Multiple SucursalStock'
};

export const routeSucursalStockCreate = {
    route: '[POST].../v1/sucursal-stock',
    title: 'Create SucursalStock'
};

export const routeSucursalStockFindOne = {
    route: '[GET].../v1/sucursal-stock/:cod_prenda/:talla/:id_sucursal',
    title: 'Find One SucursalStock'
};

export const routeSucursalStockFindAll = {
    route: '[GET].../v1/sucursal-stock',
    title: 'Find All SucursalStock'
};

export const routeSucursalStockFindBy = {
    route: '[GET].../v1/sucursal-stock/find-by/:attribute/:value/:orderBy',
    title: 'Find By SucursalStock Attribute & Value'
};

export const routeSucursalStockUpdate = {
    route: '[PATCH].../v1/sucursal-stock/:cod_prenda/:talla/:id_sucursal',
    title: 'Update SucursalStock'
};

export const routeSucursalStockRemove = {
    route: '[DELETE].../v1/sucursal-stock/:cod_prenda/:talla/:id_sucursal',
    title: 'Remove SucursalStock'
};