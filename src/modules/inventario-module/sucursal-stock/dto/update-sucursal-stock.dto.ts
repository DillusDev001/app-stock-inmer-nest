import { PartialType } from '@nestjs/swagger';
import { SucursalStockDto } from './sucursal-stock.dto';

export class UpdateSucursalStockDto extends PartialType(SucursalStockDto) {

    cod_prenda: string;
    talla: string;
    id_sucursal: number;
    cantidad: number;
    fec_mod: string;
    user_mod: string;

}
