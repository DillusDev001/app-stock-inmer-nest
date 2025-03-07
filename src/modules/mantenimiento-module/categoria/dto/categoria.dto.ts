import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CategoriaDto {

    @ApiProperty()
    id_categoria: number;

    @ApiProperty()
    @IsNotEmpty()
    categoria: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}
