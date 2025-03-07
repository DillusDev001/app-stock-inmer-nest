import { Injectable } from '@nestjs/common';
import { SucursalUsuarioDto } from './dto/sucursal-usuario.dto';
import { UpdateSucursalUsuarioDto } from './dto/update-sucursal-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SucursalUsuario } from './entities/sucursal-usuario.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class SucursalUsuarioService {

    constructor(@InjectRepository(SucursalUsuario) private sucursalUsuarioRepository: Repository<SucursalUsuario>) { }

    async createMultiple(array: SucursalUsuarioDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.sucursalUsuarioRepository
            .createQueryBuilder()
            .insert()
            .into(SucursalUsuario)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Sucursal Usuario(s) agregado(s).' : 'No se han agregado SucursalUsuarios.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(sucursalUsuarioDto: SucursalUsuarioDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const busqueda = await this.findOne(sucursalUsuarioDto.id_sucursal, sucursalUsuarioDto.usuario);

        if (!busqueda.boolean) {

            const object = this.sucursalUsuarioRepository.create(sucursalUsuarioDto);
            await this.sucursalUsuarioRepository.save(object);

            serviceResult.boolean = true;
            serviceResult.message = 'Se ha agregado correctamente usuario a sucursal.';
            serviceResult.number = 1;

        } else {
            serviceResult.message = busqueda.message;
            serviceResult.object = busqueda.object
        }

        return serviceResult;
    }

    async findOne(id_sucursal: number, usuario: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.sucursalUsuarioRepository.findOne({ where: { id_sucursal, usuario } });

        if (result) {
            serviceResult.boolean = true;
            serviceResult.message = 'Existe el usuario en la sucursal.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe usuario en la sucursal.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.sucursalUsuarioRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' SucursalUsuario(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.sucursalUsuarioRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' SucursalUsuario(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(id_sucursal: number, usuario: string, updateSucursalUsuarioDto: UpdateSucursalUsuarioDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.sucursalUsuarioRepository.update({ id_sucursal, usuario }, updateSucursalUsuarioDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = 'Se ha actualizado correctamente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(id_sucursal: number, usuario: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.sucursalUsuarioRepository.delete({ id_sucursal, usuario });

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el SucursalUsuario.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}
