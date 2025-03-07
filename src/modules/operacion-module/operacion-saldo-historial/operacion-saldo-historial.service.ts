import { Injectable } from '@nestjs/common';
import { OperacionSaldoHistorialDto } from './dto/operacion-saldo-historial.dto';
import { UpdateOperacionSaldoHistorialDto } from './dto/update-operacion-saldo-historial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperacionSaldoHistorial } from './entities/operacion-saldo-historial.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class OperacionSaldoHistorialService {

    constructor(@InjectRepository(OperacionSaldoHistorial) private operacionSaldoHistorialRepository: Repository<OperacionSaldoHistorial>) { }

    async createMultiple(array: OperacionSaldoHistorialDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionSaldoHistorialRepository
            .createQueryBuilder()
            .insert()
            .into(OperacionSaldoHistorial)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Movimiento(s) agregado(s).' : 'No se han agregado Movimientos.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(operacionSaldoHistorialDto: OperacionSaldoHistorialDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const newObj = this.operacionSaldoHistorialRepository.create(operacionSaldoHistorialDto);
        await this.operacionSaldoHistorialRepository.save(newObj);

        serviceResult.boolean = true;
        serviceResult.message = 'Movimiento agregado correctamente.';
        serviceResult.number = 1;
        serviceResult.object = newObj;

        return serviceResult;
    }

    async findOne(id_historial: number, cod_operacion: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionSaldoHistorialRepository.findOne({ where: { id_historial, cod_operacion } });

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

        const result = await this.operacionSaldoHistorialRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Movimiento(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionSaldoHistorialRepository
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

    async update(id_historial: number, cod_operacion: string, updateOperacionSaldoHistorialDto: UpdateOperacionSaldoHistorialDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionSaldoHistorialRepository.update({ id_historial, cod_operacion }, updateOperacionSaldoHistorialDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Item actualizado correctamente.' : 'Item no encontrado.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(id_historial: number, cod_operacion: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionSaldoHistorialRepository.delete({ id_historial, cod_operacion });

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Item eliminado correctamente.' : 'Item no encontrado.';
        serviceResult.number = result.affected;
        serviceResult.object = result.affected === 1 ? result : null;

        return serviceResult;
    }

}
