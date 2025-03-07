import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class OperacionSaldoHistorialDto {

    @ApiProperty()
    id_historial: number;
    
    @ApiProperty()
    @IsNotEmpty()
    cod_operacion: string;

    @ApiProperty()
    @IsNotEmpty()
    monto: number;

    @ApiProperty()
    fec_pago: string;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

}
