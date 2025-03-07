import { PartialType } from '@nestjs/swagger';
import { OperacionSaldoDto } from './operacion-saldo.dto';

export class UpdateOperacionSaldoDto extends PartialType(OperacionSaldoDto) {

    cod_operacion: string;
    monto: number;
    fec_mod: string;
    user_mod: string;

}
