import { PartialType } from '@nestjs/swagger';
import { CategoriaDto } from './categoria.dto';

export class UpdateCategoriaDto extends PartialType(CategoriaDto) {

    id_categoria: number;
    categoria: string;
    fec_mod: string;
    user_mod: string;
    
}
