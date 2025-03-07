import { PartialType } from '@nestjs/swagger';
import { MaterialDto } from './material.dto';

export class UpdateMaterialDto extends PartialType(MaterialDto) {

    id_material: number;
    material: string;
    fec_mod: string;
    user_mod: string;

}
