import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TallaDto {

    @ApiProperty()
    id_talla: number;

    @ApiProperty()
    @IsNotEmpty()
    talla: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}