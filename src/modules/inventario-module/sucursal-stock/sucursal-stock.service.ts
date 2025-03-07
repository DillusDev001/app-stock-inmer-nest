import { Injectable } from '@nestjs/common';
import { SucursalStockDto } from './dto/sucursal-stock.dto';
import { UpdateSucursalStockDto } from './dto/update-sucursal-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SucursalStock } from './entities/sucursal-stock.entity';
import { PrendaService } from 'src/modules/prenda-module/prenda/prenda.service';
import { ServiceResult } from 'src/common/interfaces/service.result';

@Injectable()
export class SucursalStockService {

    constructor(
        @InjectRepository(SucursalStock) private sucursalStockRepository: Repository<SucursalStock>,
        private prendaService: PrendaService
    ) { }

    async createMultiple(array: SucursalStockDto[]): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.sucursalStockRepository
            .createQueryBuilder()
            .insert()
            .into(SucursalStock)
            .values(array)
            .execute();

        const rows = result.raw.affectedRows;

        serviceResult.boolean = rows > 0 ? true : false;
        serviceResult.message = rows > 0 ? rows + ' Sucursal Stock agregado(s).' : 'No se han agregado Sucursal Stock.';
        serviceResult.number = rows;

        return serviceResult;
    }

    async create(sucursalStockDto: SucursalStockDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const busqueda = await this.findOne(sucursalStockDto.cod_prenda, sucursalStockDto.talla, sucursalStockDto.id_sucursal);

        if (!busqueda.boolean) {

            const object = this.sucursalStockRepository.create(sucursalStockDto);
            await this.sucursalStockRepository.save(object);

            serviceResult.boolean = true;
            serviceResult.message = 'Sucursal Stock se ha agregado correctamente.';
            serviceResult.number = 1;

        } else {
            serviceResult.message = busqueda.message;
            serviceResult.object = busqueda.object
        }

        return serviceResult;
    }

    async findOne(cod_prenda: string, talla: string, id_sucursal: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.sucursalStockRepository.findOne({ where: { cod_prenda, talla, id_sucursal } });

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

        console.log('atributo: ', attribute, 'orderBy', orderBy);

        const orderCondition = { [attribute]: orderBy };
        const result = await this.sucursalStockRepository.find({ order: orderCondition });
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

        const result = await this.sucursalStockRepository
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

    async update(cod_prenda: string, talla: string, id_sucursal: number, updateSucursalStockDto: UpdateSucursalStockDto): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.sucursalStockRepository.update({ cod_prenda, talla, id_sucursal }, updateSucursalStockDto);

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = 'Se ha actualizado correctamente.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

    async remove(cod_prenda: string, talla: string, id_sucursal: number): Promise<ServiceResult> {
        let serviceResult = { boolean: false, message: '', number: 0, object: null, data: null } as ServiceResult;

        const result = await this.sucursalStockRepository.delete({ cod_prenda, talla, id_sucursal });

        serviceResult.boolean = result.affected === 1 ? true : false;
        serviceResult.message = result.affected === 1 ? 'Se ha eliminado correctamente.' : 'No se ha encontrado el SucursalStock.';
        serviceResult.number = result.affected;

        return serviceResult;
    }

}
