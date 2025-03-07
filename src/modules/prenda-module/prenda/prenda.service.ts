import { Injectable } from '@nestjs/common';
import { PrendaDto } from './dto/prenda.dto';
import { UpdatePrendaDto } from './dto/update-prenda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prenda } from './entities/prenda.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class PrendaService {

    constructor(@InjectRepository(Prenda) private prendaRepository: Repository<Prenda>) { }

    async createMultiple(array: PrendaDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.prendaRepository
            .createQueryBuilder()
            .insert()
            .into(Prenda)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Prenda(s) agregado(s).' : 'No se han agregado Prenda.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(prendaDto: PrendaDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const busqueda = await this.findOne(prendaDto.cod_prenda);

        if (!busqueda.boolean) {

            const object = this.prendaRepository.create(prendaDto);
            await this.prendaRepository.save(object);

            serviceResult.boolean = true;
            serviceResult.message = 'Prenda se ha agregado correctamente.';
            serviceResult.number = 1;

        } else {
            serviceResult.message = busqueda.message;
            serviceResult.object = busqueda.object
        }

        return serviceResult;
    }

    async findOne(cod_prenda: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.prendaRepository.findOne({ where: { cod_prenda } });

        if (result) {
            serviceResult.boolean = true;
            serviceResult.message = 'Existe un prenda.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe prenda.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.prendaRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Prenda(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.prendaRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Prenda(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(ci: string, updatePrendaDto: UpdatePrendaDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.prendaRepository.update(ci, updatePrendaDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = 'Se ha actualizado correctamente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(ci: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.prendaRepository.delete(ci);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Prenda.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}
