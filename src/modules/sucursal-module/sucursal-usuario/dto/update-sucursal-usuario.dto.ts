import { PartialType } from '@nestjs/swagger';
import { SucursalUsuarioDto } from './sucursal-usuario.dto';

export class UpdateSucursalUsuarioDto extends PartialType(SucursalUsuarioDto) {

    id_sucursal: number;
    usuario: string;
    fec_mod: string;
    user_mod: string;

}