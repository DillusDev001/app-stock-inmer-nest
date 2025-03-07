import { PartialType } from '@nestjs/swagger';
import { OperacionDetalleDto } from './operacion-detalle.dto';

export class UpdateOperacionDetalleDto extends PartialType(OperacionDetalleDto) {

    cod_operacion: string;
    cod_prenda: string;
    talla: string;
    sec: number;
    cantidad: number;
    precio_unitario: number;
    sub_total: number;
    fec_mod: string;
    user_mod: string;

}
