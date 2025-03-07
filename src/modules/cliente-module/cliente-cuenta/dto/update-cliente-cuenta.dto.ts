import { PartialType } from '@nestjs/swagger';
import { ClienteCuentaDto } from './cliente-cuenta.dto';

export class UpdateClienteCuentaDto extends PartialType(ClienteCuentaDto) {

    id_cliente: number;
    monto: number;
    fec_mod: string;
    user_mod: string;

}
