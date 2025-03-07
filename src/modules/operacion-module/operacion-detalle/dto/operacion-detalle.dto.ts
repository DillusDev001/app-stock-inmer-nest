import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class OperacionDetalleDto {

    @ApiProperty()
    @IsNotEmpty()
    cod_operacion: string;

    @ApiProperty()
    @IsNotEmpty()
    cod_prenda: string;
    
    @ApiProperty()
    @IsNotEmpty()
    talla: string;

    @ApiProperty()
    @IsNotEmpty()
    sec: number;

    @ApiProperty()
    @IsNotEmpty()
    cantidad: number;

    @ApiProperty()
    @IsNotEmpty()
    precio_unitario: number;

    @ApiProperty()
    @IsNotEmpty()
    sub_total: number;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}
