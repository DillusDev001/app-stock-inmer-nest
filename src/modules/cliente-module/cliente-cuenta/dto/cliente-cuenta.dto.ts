import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ClienteCuentaDto {

    @ApiProperty()
    id_cliente: number;

    @ApiProperty()
    @IsNotEmpty()
    monto: number;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}
