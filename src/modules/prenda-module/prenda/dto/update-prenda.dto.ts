import { PartialType } from '@nestjs/swagger';
import { PrendaDto } from './prenda.dto';

export class UpdatePrendaDto extends PartialType(PrendaDto) {

    cod_prenda: string;
    color: string;
    categoria: string;
    material: string;
    descripcion: string
    pre_unitario: number;
    pre_mayor: number;
    fec_mod: string;
    user_mod: string;

}