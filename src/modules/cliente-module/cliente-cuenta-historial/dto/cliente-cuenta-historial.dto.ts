import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ClienteCuentaHistorialDto {

    @ApiProperty()
    id_historial: number;

    @ApiProperty()
    @IsNotEmpty()
    id_cliente: number;

    @ApiProperty()
    @IsNotEmpty()
    tipo: string;

    @ApiProperty()
    @IsNotEmpty()
    metodo_cuenta: string;

    @ApiProperty()
    @IsNotEmpty()
    monto: number;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}
