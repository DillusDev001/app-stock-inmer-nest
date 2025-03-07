import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class OperacionDto {

    @ApiProperty()
    @IsNotEmpty()
    cod_operacion: string;

    @ApiProperty()
    @IsNotEmpty()
    id_cliente: number;

    @ApiProperty()
    user_proforma: string;

    @ApiProperty()
    fec_proforma: string;

    @ApiProperty()
    user_venta: string;

    @ApiProperty()
    fec_venta: string;

    @ApiProperty()
    nro_factura: string;

    @ApiProperty()
    observacion: string;

    @ApiProperty()
    @IsNotEmpty()
    ciudad_envio: string;

    @ApiProperty()
    @IsNotEmpty()
    precio_total: number;

    @ApiProperty()
    @IsNotEmpty()
    descuento: number;

    @ApiProperty()
    @IsNotEmpty()
    precio_pagar: number;

    @ApiProperty()
    fec_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    user_mod: string;

    @ApiProperty()
    @IsNotEmpty()
    estado: string;


}
