import { Injectable } from '@nestjs/common';
import { PrendaTallaDto } from './dto/prenda-talla.dto';
import { UpdatePrendaTallaDto } from './dto/update-prenda-talla.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrendaTalla } from './entities/prenda-talla.entity';
import { ServiceResult } from 'src/common/interfaces/service.result';
import { PrendaService } from 'src/modules/prenda-module/prenda/prenda.service';

@Injectable()
export class PrendaTallaService {

    constructor(
        @InjectRepository(PrendaTalla) private prendaTallaRepository: Repository<PrendaTalla>,
        private prendaService: PrendaService
    ) { }

    async createMultiple(array: PrendaTallaDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.prendaTallaRepository
            .createQueryBuilder()
            .insert()
            .into(PrendaTalla)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' PrendaTalla(s) agregado(s).' : 'No se han agregado PrendaTalla.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(prendaTallaDto: PrendaTallaDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const busqueda = await this.findOne(prendaTallaDto.cod_prenda, prendaTallaDto.talla);

        if (!busqueda.boolean) {

            const object = this.prendaTallaRepository.create(prendaTallaDto);
            await this.prendaTallaRepository.save(object);

            serviceResult.boolean = true;
            serviceResult.message = 'PrendaTalla se ha agregado correctamente.';
            serviceResult.number = 1;

        } else {
            serviceResult.message = busqueda.message;
            serviceResult.object = busqueda.object
        }

        return serviceResult;
    }

    async findOne(cod_prenda: string, talla: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.prendaTallaRepository.findOne({ where: { cod_prenda, talla } });

        if (result) {
            const prendaResult = await this.prendaService.findOne(cod_prenda);

            if (prendaResult) {
                result['prenda'] = prendaResult.object
            } else {
                result['prenda'] = null
            }

            serviceResult.boolean = true;
            serviceResult.message = 'Existe un prenda prenda : ' + cod_prenda + ', talla:' + talla + '.';
            serviceResult.number = 1;
            serviceResult.object = result
        } else {
            serviceResult.message = 'No existe prenda talla.';
        }

        return serviceResult;
    }

    async findAll(attribute: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const orderCondition = { [attribute]: orderBy };
        const result = await this.prendaTallaRepository.find({ order: orderCondition });
        const count = result.length;

        if (count > 0) {
            const updatedResult = await Promise.all(
                result.map(async (item) => {
                    const resultAsesor = await this.prendaService.findOne(item.cod_prenda);
                    item['prenda'] = resultAsesor.boolean ? resultAsesor.object : null;
                    return item; // Devuelve el item actualizado
                })
            );

            serviceResult.data = updatedResult;
        }

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Prenda Talla encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async findBy(attribute: string, value: string, orderBy: 'ASC' | 'DESC'): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.prendaTallaRepository
            .createQueryBuilder()
            .orderBy(attribute, orderBy)
            .where(attribute + ' like :value', { value: '%' + value + '%' })
            //.andWhere(estado = 1)
            .getMany()

        const count = result.length;

        if (count > 0) {
            const updatedResult = await Promise.all(
                result.map(async (item) => {
                    const resultAsesor = await this.prendaService.findOne(item.cod_prenda);
                    item['prenda'] = resultAsesor.boolean ? resultAsesor.object : null;
                    return item; // Devuelve el item actualizado
                })
            );

            serviceResult.data = updatedResult;
        }

        serviceResult.boolean = count > 0 ? true : false;
        serviceResult.message = count + ' Prenda Talla encontrado(s).';
        serviceResult.number = count;
        serviceResult.data = result;

        return serviceResult;
    }

    async update(cod_prenda: string, talla: string, updatePrendaTallaDto: UpdatePrendaTallaDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.prendaTallaRepository.update({ cod_prenda, talla }, updatePrendaTallaDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = 'Se ha actualizado correctamente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async removeAll(cod_prenda: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.prendaTallaRepository.delete({ cod_prenda });

        serviceResult.boolean = result.affected > 0 ? true : false;
        serviceResult.message = result.affected > 0 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el Prenda.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(cod_prenda: string, talla: string): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.prendaTallaRepository.delete({ cod_prenda, talla });

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el PrendaTalla.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}