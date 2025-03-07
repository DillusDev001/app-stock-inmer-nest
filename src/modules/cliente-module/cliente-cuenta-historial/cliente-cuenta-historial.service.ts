import { Injectable } from '@nestjs/common';
import { ClienteCuentaHistorialDto } from './dto/cliente-cuenta-historial.dto';
import { UpdateClienteCuentaHistorialDto } from './dto/update-cliente-cuenta-historial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteCuentaHistorial } from './entities/cliente-cuenta-historial.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class ClienteCuentaHistorialService {

    constructor(@InjectRepository(ClienteCuentaHistorial) private clienteCuentaHistorialRepository: Repository<ClienteCuentaHistorial>) { }

    async createMultiple(array: ClienteCuentaHistorialDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteCuentaHistorialRepository
            .createQueryBuilder()
            .insert()
            .into(ClienteCuentaHistorial)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' ClienteCuentaHistorial(s) agregado(s).' : 'No se han agregado ClienteCuentaHistorial.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(clienteCuentaHistorialDto: ClienteCuentaHistorialDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const newObj = this.clienteCuentaHistorialRepository.create(clienteCuentaHistorialDto);
        await this.clienteCuentaHistorialRepository.save(newObj);

        serviceResult.boolean = true;
        serviceResult.message = 'Movimiento agregado correctamente.';
        serviceResult.number = 1;
        serviceResult.object = newObj;

        return serviceResult;
    }

    async findOne(id_historial: number, id_cliente: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteCuentaHistorialRepository.findOne({ where: { id_historial, id_cliente } });

        if (result) {
            serviceResult.boolean = true;
            serviceResult.message = 'Existe un movimiento.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe movimiento.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.clienteCuentaHistorialRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Movimiento(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteCuentaHistorialRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Movimiento(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(id_historial: number, id_cliente: number, updateClienteCuentaHistorialDto: UpdateClienteCuentaHistorialDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteCuentaHistorialRepository.update({ id_historial, id_cliente }, updateClienteCuentaHistorialDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Item actualizado correctamente.' : 'Item no encontrado.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(id_historial: number, id_cliente: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteCuentaHistorialRepository.delete({ id_historial, id_cliente });

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Item eliminado correctamente.' : 'Item no encontrado.';
        serviceResult.number = result.affected;
        serviceResult.object = result.affected === 1 ? result : null;

        return serviceResult;
    }

}
