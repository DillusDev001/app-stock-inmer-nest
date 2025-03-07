import { Injectable } from '@nestjs/common';
import { ColorDto } from './dto/color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class ColorService {

    constructor(@InjectRepository(Color) private colorRepository: Repository<Color>) { }

    async createMultiple(array: ColorDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.colorRepository
            .createQueryBuilder()
            .insert()
            .into(Color)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Color(s) agregado(s).' : 'No se han agregado Color.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(colorDto: ColorDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const object = this.colorRepository.create(colorDto);
        await this.colorRepository.save(object);

        serviceResult.boolean = true;
        serviceResult.message = 'Color se ha agregado correctamente.';
        serviceResult.number = 1;

        return serviceResult;
    }

    async findOne(id_color: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.colorRepository.findOne({ where: { id_color } });

        if (result) {
            serviceResult.boolean = true;
            serviceResult.message = 'Existe un color.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe color.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.colorRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Color(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.colorRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Color(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(id_color: number, updateColorDto: UpdateColorDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.colorRepository.update(id_color, updateColorDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = 'Se ha actualizado correctamente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(id_color: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.colorRepository.delete(id_color);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Color.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}