import { Injectable } from '@nestjs/common';
import { TallaDto } from './dto/talla.dto';
import { UpdateTallaDto } from './dto/update-talla.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Talla } from './entities/talla.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class TallaService {

    constructor(@InjectRepository(Talla) private tallaRepository: Repository<Talla>) { }

    async createMultiple(array: TallaDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.tallaRepository
            .createQueryBuilder()
            .insert()
            .into(Talla)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Talla(s) agregado(s).' : 'No se han agregado Talla.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(tallaDto: TallaDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const object = this.tallaRepository.create(tallaDto);
        await this.tallaRepository.save(object);

        serviceResult.boolean = true;
        serviceResult.message = 'Talla se ha agregado correctamente.';
        serviceResult.number = 1;

        return serviceResult;
    }

    async findOne(id_talla: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.tallaRepository.findOne({ where: { id_talla } });

        if (result) {
            serviceResult.boolean = true;
            serviceResult.message = 'Existe una talla.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe talla.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.tallaRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Talla(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.tallaRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Talla(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(id_talla: number, updateTallaDto: UpdateTallaDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.tallaRepository.update(id_talla, updateTallaDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = 'Se ha actualizado correctamente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(id_talla: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.tallaRepository.delete(id_talla);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Talla.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}