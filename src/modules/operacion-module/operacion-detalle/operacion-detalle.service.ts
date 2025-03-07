import { Injectable } from '@nestjs/common';
import { OperacionDetalleDto } from './dto/operacion-detalle.dto';
import { UpdateOperacionDetalleDto } from './dto/update-operacion-detalle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperacionDetalle } from './entities/operacion-detalle.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class OperacionDetalleService {

    constructor(@InjectRepository(OperacionDetalle) private operacionDetalleRepository: Repository<OperacionDetalle>) { }

    async createMultiple(array: OperacionDetalleDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionDetalleRepository
            .createQueryBuilder()
            .insert()
            .into(OperacionDetalle)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Detalle(s) agregado(s).' : 'No se han agregado Operación.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(operacionDetalleDto: OperacionDetalleDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        //const busqueda = await this.findOne(operacionDetalleDto.cod_operacion);

        const object = this.operacionDetalleRepository.create(operacionDetalleDto);
        await this.operacionDetalleRepository.save(object);

        serviceResult.boolean = true;
        serviceResult.message = 'Detalle se ha agregado correctamente.';
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

        const result = await this.operacionDetalleRepository.find({ where: { cod_operacion }, order: { sec: 'ASC' } });

        const count = result.length;

        if (result) {
            serviceResult.boolean = count > 0 ? true : false;
            serviceResult.message = count + ' Detalles(s) encontrado(s).';
            serviceResult.number = count;
            serviceResult.data = count > 0 ? result : null;
        } else {
            serviceResult.message = 'No existe Detalle.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.operacionDetalleRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Detalles(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionDetalleRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Detalle(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(cod_operacion: string, cod_prenda: string, updateOperacionDetalleDto: UpdateOperacionDetalleDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionDetalleRepository.update({ cod_operacion, cod_prenda }, updateOperacionDetalleDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = 'Se ha actualizado correctamente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(cod_operacion: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.operacionDetalleRepository.delete({ cod_operacion });

        serviceResult.boolean = result.affected > 0 ? true : false;
        serviceResult.message = result.affected > 0 ? 'Se han eliminado correctamente.' : 'No se ha encontrado el Operación.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}
