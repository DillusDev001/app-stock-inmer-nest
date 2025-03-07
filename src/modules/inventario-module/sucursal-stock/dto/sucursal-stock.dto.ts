import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SucursalStockDto {

    @ApiProperty()
    @IsNotEmpty()
    cod_prenda: string;

    @ApiProperty()
    @IsNotEmpty()
    talla: string;

    @ApiProperty()
    @IsNotEmpty()
    id_sucursal: number;

    @ApiProperty()
    @IsNotEmpty()
    cantidad: number;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}
