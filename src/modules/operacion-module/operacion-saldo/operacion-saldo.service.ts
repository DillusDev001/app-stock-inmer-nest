import { Injectable } from '@nestjs/common';
import { OperacionSaldoDto } from './dto/operacion-saldo.dto';
import { UpdateOperacionSaldoDto } from './dto/update-operacion-saldo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperacionSaldo } from './entities/operacion-saldo.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class OperacionSaldoService {

    constructor(@InjectRepository(OperacionSaldo) private operacionSaldoRepository: Repository<OperacionSaldo>) { }

    async createMultiple(array: OperacionSaldoDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionSaldoRepository
            .createQueryBuilder()
            .insert()
            .into(OperacionSaldo)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Saldo(s) agregado(s).' : 'No se han agregado Saldo(s).';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(operacionSaldoDto: OperacionSaldoDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const busqueda = await this.findOne(operacionSaldoDto.cod_operacion);

        if (!busqueda.boolean) {

            const object = this.operacionSaldoRepository.create(operacionSaldoDto);
            await this.operacionSaldoRepository.save(object);

            serviceResult.boolean = true;
            serviceResult.message = 'Saldo se ha agregado correctamente.';
            serviceResult.number = 1;

        } else {
            serviceResult.message = busqueda.message;
            serviceResult.object = busqueda.object
        }

        return serviceResult;
    }

    async findOne(cod_operacion: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionSaldoRepository.findOne({ where: { cod_operacion } });

        if (result) {
            serviceResult.boolean = true;
            serviceResult.message = 'Existe un Saldo para: ' + cod_operacion + '.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe Saldo.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.operacionSaldoRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Saldo(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionSaldoRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Saldo(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(cod_operacion: string, updateOperacionSaldoDto: UpdateOperacionSaldoDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionSaldoRepository.update(cod_operacion, updateOperacionSaldoDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha actualizado correctamente.' : 'No se ha encontrado el OperacionSaldo.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(cod_operacion: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionSaldoRepository.delete(cod_operacion);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el OperacionSaldo.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}
