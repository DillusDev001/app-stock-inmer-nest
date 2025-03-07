import { PartialType } from '@nestjs/swagger';
import { OperacionPagoDto } from './operacion-pago.dto';

export class UpdateOperacionPagoDto extends PartialType(OperacionPagoDto) {

    cod_operacion: string;
    sec_pago: number;
    metodo_pago: string;
    monto: number;
    info: string;
    url_imagen: string;
    fec_mod: string;
    user_mod: string;

}
