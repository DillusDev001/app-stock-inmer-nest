import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class OperacionPagoDto {

    @ApiProperty()
    @IsNotEmpty()
    cod_operacion: string;

    @ApiProperty()
    @IsNotEmpty()
    sec_pago: number;

    @ApiProperty()
    @IsNotEmpty()
    metodo_pago: string;

    @ApiProperty()
    @IsNotEmpty()
    monto: number;
    
    @ApiProperty()
    info: string;
    
    @ApiProperty()
    url_imagen: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}
