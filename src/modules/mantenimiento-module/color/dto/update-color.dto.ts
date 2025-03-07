import { PartialType } from '@nestjs/swagger';
import { ColorDto } from './color.dto';

export class UpdateColorDto extends PartialType(ColorDto) {

    id_color: number;
    color: string;
    codigo: string;
    fec_mod: string;
    user_mod: string;

}