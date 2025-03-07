import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ClienteDto {

    @ApiProperty()
    id_cliente: number;

    @ApiProperty()
    @IsNotEmpty()
    cliente: string;

    @ApiProperty()
    @IsNotEmpty()
    ci: string;

    @ApiProperty()
    @IsNotEmpty()
    razon: string;

    @ApiProperty()
    @IsNotEmpty()
    nit: string;

    @ApiProperty()
    @IsNotEmpty()
    celular: string;

    @ApiProperty()
    @IsNotEmpty()
    ciudad: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}
