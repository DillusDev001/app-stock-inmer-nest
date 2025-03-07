import { PartialType } from '@nestjs/swagger';
import { UsuarioDto } from './usuario.dto';

export class UpdateUsuarioDto extends PartialType(UsuarioDto) {

    usuario: string;
    password: string;
    nombres: string;
    apellidos: string;
    celular: string;
    pregunta: string;
    respuesta: string;
    rol: string;
    fec_mod: string;
    user_mod: string;
    estado: number;

}