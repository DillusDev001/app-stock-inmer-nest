import { Injectable } from '@nestjs/common';
import { ClienteCuentaDto } from './dto/cliente-cuenta.dto';
import { UpdateClienteCuentaDto } from './dto/update-cliente-cuenta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteCuenta } from './entities/cliente-cuenta.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class ClienteCuentaService {

    constructor(@InjectRepository(ClienteCuenta) private clienteCuentaRepository: Repository<ClienteCuenta>) { }

    async createMultiple(array: ClienteCuentaDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteCuentaRepository
            .createQueryBuilder()
            .insert()
            .into(ClienteCuenta)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' ClienteCuenta(s) agregado(s).' : 'No se han agregado ClienteCuenta.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(clienteCuentaDto: ClienteCuentaDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const busqueda = await this.findOne(clienteCuentaDto.id_cliente);

        if (!busqueda.boolean) {

            const object = this.clienteCuentaRepository.create(clienteCuentaDto);
            await this.clienteCuentaRepository.save(object);

            serviceResult.boolean = true;
            serviceResult.message = 'ClienteCuenta se ha agregado correctamente.';
            serviceResult.number = 1;

        } else {
            serviceResult.message = busqueda.message;
            serviceResult.object = busqueda.object
        }

        return serviceResult;
    }

    async findOne(id_cliente: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteCuentaRepository.findOne({ where: { id_cliente } });

        if (result) {
            serviceResult.boolean = true;
            serviceResult.message = 'Existe un cliente cuenta.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe clienteCuenta.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.clienteCuentaRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' ClienteCuenta(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteCuentaRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' ClienteCuenta(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(id_cliente: number, updateClienteCuentaDto: UpdateClienteCuentaDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteCuentaRepository.update(id_cliente, updateClienteCuentaDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = 'Se ha actualizado correctamente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(id_cliente: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteCuentaRepository.delete(id_cliente);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el ClienteCuenta.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}
