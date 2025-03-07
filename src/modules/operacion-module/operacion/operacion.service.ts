import { Injectable } from '@nestjs/common';
import { OperacionDto } from './dto/operacion.dto';
import { UpdateOperacionDto } from './dto/update-operacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operacion } from './entities/operacion.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';
import { ClienteService } from 'src/modules/cliente-module/cliente/cliente.service';

@Injectable()
export class OperacionService {

    constructor(
        @InjectRepository(Operacion) private operacionRepository: Repository<Operacion>,
        private clienteService: ClienteService
    ) { }

    async createMultiple(array: OperacionDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionRepository
            .createQueryBuilder()
            .insert()
            .into(Operacion)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Operacion(s) agregado(s).' : 'No se han agregado Operacion.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(operacionDto: OperacionDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const busqueda = await this.findOne(operacionDto.cod_operacion);

        if (!busqueda.boolean) {

            const object = this.operacionRepository.create(operacionDto);
            await this.operacionRepository.save(object);

            serviceResult.boolean = true;
            serviceResult.message = 'Operacion se ha agregado correctamente.';
            serviceResult.number = 1;

        } else {
            serviceResult.message = busqueda.message;
            serviceResult.object = busqueda.object
        }

        return serviceResult;
    }

    async findOne(cod_operacion: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionRepository.findOne({ where: { cod_operacion } });

        if (result) {
            const personaResult = await this.clienteService.findOne(result.id_cliente);

            if (personaResult.boolean) {
                result['cliente'] = personaResult.object
            } else {
                result['cliente'] = null
            }

            serviceResult.boolean = true;
            serviceResult.message = 'Usuario encontrado.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe operacion.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };
        const result = await this.operacionRepository.find({ order: orderCondition });
        const count = result.length;

        if (count > 0) {
            const updatedResult = await Promise.all(
                result.map(async (item) => {
                    const resultCliente = await this.clienteService.findOne(item.id_cliente);
                    item['cliente'] = resultCliente.boolean ? resultCliente.object : null;
                    return item; // Devuelve el item actualizado
                })
            );

            serviceResult.data = updatedResult;
        }

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Operacion(es) encontrado(s).';
        serviceResult.number = count;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        if (count > 0) {
            const updatedResult = await Promise.all(
                result.map(async (item) => {
                    const resultCliente = await this.clienteService.findOne(item.id_cliente);
                    item['cliente'] = resultCliente.boolean ? resultCliente.object : null;
                    return item; // Devuelve el item actualizado
                })
            );

            serviceResult.data = updatedResult;
        }

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Operacion(s) encontrado(s).';
        serviceResult.number = count;

        return serviceResult;
    }

    async update(ci: string, updateOperacionDto: UpdateOperacionDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionRepository.update(ci, updateOperacionDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha actualizado correctamente.' : 'No se ha encontrado el Operacion.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(ci: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionRepository.delete(ci);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Operacion.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}
