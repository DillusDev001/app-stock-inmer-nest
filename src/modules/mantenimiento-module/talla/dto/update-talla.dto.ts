import { PartialType } from '@nestjs/swagger';
import { TallaDto } from './talla.dto';

export class UpdateTallaDto extends PartialType(TallaDto) {

    id_talla: number;
    talla: string;
    fec_mod: string;
    user_mod: string;

}