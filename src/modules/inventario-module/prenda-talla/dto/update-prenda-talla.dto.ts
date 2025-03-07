import { PartialType } from '@nestjs/swagger';
import { PrendaTallaDto } from './prenda-talla.dto';

export class UpdatePrendaTallaDto extends PartialType(PrendaTallaDto) {

    cod_prenda: string;
    talla: string;
    cantidad: number;
    fec_mod: string;
    user_mod: string;

}
