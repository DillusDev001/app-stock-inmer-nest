import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PrendaDto {

    @ApiProperty()
    @IsNotEmpty()
    cod_prenda: string;

    @ApiProperty()
    @IsNotEmpty()
    color: string;

    @ApiProperty()
    @IsNotEmpty()
    categoria: string;

    @ApiProperty()
    @IsNotEmpty()
    material: string;

    @IsNotEmpty()
    @ApiProperty()
    descripcion: string

    @ApiProperty()
    @IsNotEmpty()
    pre_unitario: number;

    @ApiProperty()
    @IsNotEmpty()
    pre_mayor: number;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}
