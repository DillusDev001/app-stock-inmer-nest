import { Injectable } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';
import { Usuario } from './entities/usuario.entity';
import { HashService } from 'src/common/services/hash.service';
import { TokenService } from 'src/common/services/token.service';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
        private hashService: HashService,
        private tokenService: TokenService,
    ) { }

    async createMultiple(array: UsuarioDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        for (const element of array) {
            element.password = await this.hashService.hashText(element.password);
            element.pregunta = await this.hashService.hashText(element.pregunta);
            element.respuesta = await this.hashService.hashText(element.respuesta);
        }

        const result = await this.usuarioRepository
            .createQueryBuilder()
            .insert()
            .into(Usuario)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Usuario(s) agregado(s).' : 'No se han agregado Usuario.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(usuarioDto: UsuarioDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const usuario = usuarioDto.usuario;

        // Verificar si usuario es unico
        const busquedaUsuario = await this.usuarioRepository.findOne({ where: { usuario } });

        if (!busquedaUsuario) {
            usuarioDto.password = await this.hashService.hashText(usuarioDto.password);
            usuarioDto.pregunta = await this.hashService.hashText(usuarioDto.pregunta);
            usuarioDto.respuesta = await this.hashService.hashText(usuarioDto.respuesta);

            const object = this.usuarioRepository.create(usuarioDto);
            await this.usuarioRepository.save(object);

            serviceResult.boolean = true;
            serviceResult.message = 'Autenticación se ha agregado correctamente.';
            serviceResult.number = 1;
        } else {
            serviceResult.message = 'Ya existe un usuario.';
        }

        return serviceResult;
    }

    async findOne(usuario: string, password: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.usuarioRepository.findOne({ where: { usuario } });

        if (result) {
            const compare = await this.hashService.compareTexts(password, result.password);

            if (compare) {
                const objSend = this.tokenService.generateToken({ Usuario: result });

                serviceResult.boolean = true;
                serviceResult.message = (result.nombres + ' ' + result.apellidos) + ' bienvenido al sistema.';
                serviceResult.number = 1;
                serviceResult.object = objSend;

            } else {
                serviceResult.message = 'Usuario y/o contraseña son incorrectos.';
            }
        } else {
            serviceResult.message = 'Usuario y/o contraseña son incorrectos.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.usuarioRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Usuario(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(usuario: string, updateUsuarioDto: UpdateUsuarioDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.usuarioRepository.update(usuario, updateUsuarioDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha modificado correctamente.' : 'No se ha modificado.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async updatePassword(usuario: string, updateUsuarioDto: UpdateUsuarioDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const resultUsuario = await this.usuarioRepository.findOne({ where: { usuario } })

        if (resultUsuario) {
            const comparePregunta = await this.hashService.compareTexts(updateUsuarioDto.pregunta, resultUsuario.pregunta);
            const compareRespuesta = await this.hashService.compareTexts(updateUsuarioDto.respuesta, resultUsuario.respuesta);

            if (comparePregunta && compareRespuesta) {
                updateUsuarioDto.password = await this.hashService.hashText(updateUsuarioDto.password);

                const result = await this.usuarioRepository.update(usuario, { password: updateUsuarioDto.password });

                serviceResult.boolean = result.affected === 1 ? true : false;
                serviceResult.message = result.affected === 1 ? 'Se ha modificado correctamente.' : 'No se ha modificado.';
                serviceResult.number = result.affected;
            }
        } else {
            serviceResult.boolean = false;
            serviceResult.message = 'No se ha encontrado al usuario: ' + usuario;
            return serviceResult;
        }

        return serviceResult;
    }

    async remove(usuario: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.usuarioRepository.delete(usuario);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Usuario.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}
