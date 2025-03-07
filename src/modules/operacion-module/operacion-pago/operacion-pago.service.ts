import { Injectable } from '@nestjs/common';
import { OperacionPagoDto } from './dto/operacion-pago.dto';
import { UpdateOperacionPagoDto } from './dto/update-operacion-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperacionPago } from './entities/operacion-pago.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class OperacionPagoService {

    constructor(@InjectRepository(OperacionPago) private operacionPagoRepository: Repository<OperacionPago>) { }

    async createMultiple(array: OperacionPagoDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionPagoRepository
            .createQueryBuilder()
            .insert()
            .into(OperacionPago)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' OperacionPago(s) agregado(s).' : 'No se han agregado OperacionPago.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(operacionPagoDto: OperacionPagoDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        //const busqueda = await this.findOne(operacionPagoDto.cod_operacion, operacionPagoDto.sec_pago);

        const object = this.operacionPagoRepository.create(operacionPagoDto);
        await this.operacionPagoRepository.save(object);

        serviceResult.boolean = true;
        serviceResult.message = 'OperacionPago se ha agregado correctamente.';
        serviceResult.number = 1;

        /*if (!busqueda.boolean) {

            

        } else {
            serviceResult.message = busqueda.message;
            serviceResult.object = busqueda.object
        }*/

        return serviceResult;
    }

    async findOne(cod_operacion: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionPagoRepository.find({ where: { cod_operacion }, order: { sec_pago: 'ASC' } });

        const count = result.length;

        if (result) {
            serviceResult.boolean = count > 0 ? true : false;
            serviceResult.message = count + ' pagos(s) encontrado(s).';
            serviceResult.number = count;
            serviceResult.data = count > 0 ? result : null;
        } else {
            serviceResult.message = 'No existe pagos.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.operacionPagoRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Pago(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionPagoRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Pago(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(cod_operacion: string, sec_pago: number, updateOperacionPagoDto: UpdateOperacionPagoDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionPagoRepository.update({ cod_operacion, sec_pago }, updateOperacionPagoDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha actualizado correctamente.' : 'No se ha encontrado el Pago.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(cod_operacion: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionPagoRepository.delete({ cod_operacion });

        serviceResult.boolean = result.affected > 0 ? true : false;
        serviceResult.message = result.affected > 0 ? 'Se han eliminado correctamente.' : 'No se ha encontrado el Pago.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}
