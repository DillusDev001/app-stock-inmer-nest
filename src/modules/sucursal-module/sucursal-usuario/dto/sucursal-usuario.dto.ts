import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SucursalUsuarioDto {

    @ApiProperty()
    @IsNotEmpty()
    id_sucursal: number;

    @ApiProperty()
    @IsNotEmpty()
    usuario: string;

    @ApiProperty()
    @IsNotEmpty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}