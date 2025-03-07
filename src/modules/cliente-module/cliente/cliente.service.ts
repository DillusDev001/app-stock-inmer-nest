import { Injectable } from '@nestjs/common';
import { ClienteDto } from './dto/cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class ClienteService {

    constructor(@InjectRepository(Cliente) private clienteRepository: Repository<Cliente>) { }

    async createMultiple(array: ClienteDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteRepository
            .createQueryBuilder()
            .insert()
            .into(Cliente)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Cliente(s) agregado(s).' : 'No se han agregado Cliente.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(clienteDto: ClienteDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const busqueda = await this.findBy('ci', clienteDto.ci, 'ASC');

        if (!busqueda.boolean) {

            const object = this.clienteRepository.create(clienteDto);
            await this.clienteRepository.save(object);

            serviceResult.boolean = true;
            serviceResult.message = 'Cliente se ha agregado correctamente.';
            serviceResult.number = 1;

        } else {
            serviceResult.message = busqueda.message;
            serviceResult.object = busqueda.object
        }

        return serviceResult;
    }

    async findOne(id_cliente: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteRepository.findOne({ where: { id_cliente } });

        if (result) {
            serviceResult.boolean = true;
            serviceResult.message = 'Existe un cliente.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe cliente.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.clienteRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Cliente(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Cliente(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(ci: string, updateClienteDto: UpdateClienteDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteRepository.update(ci, updateClienteDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = 'Se ha actualizado correctamente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(ci: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.clienteRepository.delete(ci);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Cliente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}
