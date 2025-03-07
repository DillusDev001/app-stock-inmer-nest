import { Injectable } from '@nestjs/common';
import { CategoriaDto } from './dto/categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class CategoriaService {

    constructor(@InjectRepository(Categoria) private categoriaRepository: Repository<Categoria>) { }

    async createMultiple(array: CategoriaDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.categoriaRepository
            .createQueryBuilder()
            .insert()
            .into(Categoria)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Categoria(s) agregado(s).' : 'No se han agregado Categoria.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(categoriaDto: CategoriaDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const object = this.categoriaRepository.create(categoriaDto);
        await this.categoriaRepository.save(object);

        serviceResult.boolean = true;
        serviceResult.message = 'Categoria se ha agregado correctamente.';
        serviceResult.number = 1;

        return serviceResult;
    }

    async findOne(id_categoria: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.categoriaRepository.findOne({ where: { id_categoria } });

        if (result) {
            serviceResult.boolean = true;
            serviceResult.message = 'Existe una categoria.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe categoria.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };

        const result = await this.categoriaRepository.find({ order: orderCondition });

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Categoria(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.categoriaRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Categoria(s) encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(id_categoria: number, updateCategoriaDto: UpdateCategoriaDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.categoriaRepository.update(id_categoria, updateCategoriaDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = 'Se ha actualizado correctamente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(id_categoria: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.categoriaRepository.delete(id_categoria);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Categoria.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}
