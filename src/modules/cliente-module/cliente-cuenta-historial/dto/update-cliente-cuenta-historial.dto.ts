import { PartialType } from '@nestjs/swagger';
import { ClienteCuentaHistorialDto } from './cliente-cuenta-historial.dto';

export class UpdateClienteCuentaHistorialDto extends PartialType(ClienteCuentaHistorialDto) {

    id_historial: number;
    id_cliente: number;
    tipo: string;
    metodo_cuenta: string;
    monto: number;
    fec_mod: string;
    user_mod: string;

}
