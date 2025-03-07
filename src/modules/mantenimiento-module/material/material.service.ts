import { Injectable } from '@nestjs/common';
import { MaterialDto } from './dto/material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class MaterialService {

    constructor(@InjectRepository(Material) private materialRepository: Repository<Material>) { }

    async createMultiple(array: MaterialDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.materialRepository
            .createQueryBuilder()
            .insert()
            .into(Material)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Material(s) agregado(s).' : 'No se han agregado Material.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(materialDto: MaterialDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const object = this.materialRepository.create(materialDto);
        await this.materialRepository.save(object);

        serviceResult.boolean = true;
        serviceResult.message = 'Material se ha agregado correctamente.';
        serviceResult.number = 1;

        return serviceResult;
    }

    async findOne(id_material: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.materialRepository.findOne({ where: { id_material } });

        if (result) {
            serviceResult.boolean = true;
            serviceResult.message = 'Existe una material.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe material.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.materialRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Material(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.materialRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Material(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(id_material: number, updateMaterialDto: UpdateMaterialDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.materialRepository.update(id_material, updateMaterialDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = 'Se ha actualizado correctamente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(id_material: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.materialRepository.delete(id_material);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Material.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}
