import { PartialType } from '@nestjs/swagger';
import { SucursalDto } from './sucursal.dto';

export class UpdateSucursalDto extends PartialType(SucursalDto) {

    id_sucursal: number;
    Nombre: string;
    direccion: string;
    fec_mod: string;
    user_mod: string;

}