import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PrendaTallaDto {

    @ApiProperty()
    @IsNotEmpty()
    cod_prenda: string;

    @ApiProperty()
    @IsNotEmpty()
    talla: string;

    @ApiProperty()
    @IsNotEmpty()
    cantidad: number;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}
