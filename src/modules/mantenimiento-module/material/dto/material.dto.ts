import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class MaterialDto {

    @ApiProperty()
    id_material: number;

    @ApiProperty()
    @IsNotEmpty()
    material: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}
