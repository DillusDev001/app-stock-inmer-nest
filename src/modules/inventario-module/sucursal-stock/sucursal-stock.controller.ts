import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { SucursalStockService } from './sucursal-stock.service';
import { SucursalStockDto } from './dto/sucursal-stock.dto';
import { UpdateSucursalStockDto } from './dto/update-sucursal-stock.dto';
import { ApiResult } from 'src/common/interfaces/api.result';
import { routeSucursalStockCreate, routeSucursalStockCreateMultiple, routeSucursalStockFindAll, routeSucursalStockFindBy, routeSucursalStockFindOne, routeSucursalStockRemove, routeSucursalStockUpdate } from 'src/common/routes/inventario-module/sucursal-stock.router';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sucursal-stock')
@Controller('sucursal-stock')
export class SucursalStockController {

  constructor(private readonly sucursalStockService: SucursalStockService) { }

  @Post('/multiple')
  async createMultiple(@Body() array: SucursalStockDto[]): Promise<ApiResult> {
    let apiResult = { title: routeSucursalStockCreateMultiple.title, route: routeSucursalStockCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalStockService.createMultiple(array);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
        apiResult.rows = result.number
      } else {
        apiResult.code = HttpStatus.BAD_REQUEST;
        apiResult.message = result.message;
      }
    } catch (error) {
      apiResult.code = error.status;
      apiResult.message = error;
    }

    return apiResult;
  }

  @Post()
  async create(@Body() sucursalStockDto: SucursalStockDto): Promise<ApiResult> {
    let apiResult = { title: routeSucursalStockCreate.title, route: routeSucursalStockCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalStockService.create(sucursalStockDto);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
      } else {
        apiResult.code = HttpStatus.BAD_REQUEST;
        apiResult.message = result.message;
        apiResult.data = [result.object]
      }
    } catch (error) {
      apiResult.code = error.status;
      apiResult.message = error;
    }

    return apiResult;
  }

  @Get('find-one')
  async findOne(@Query() query: { cod_prenda: string, talla: string, id_sucursal: number }): Promise<ApiResult> {
    let apiResult = { title: routeSucursalStockFindOne.title, route: routeSucursalStockFindOne.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalStockService.findOne(query.cod_prenda, query.talla, query.id_sucursal);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
        apiResult.rows = result.number;
        apiResult.data = [result.object]
      } else {
        apiResult.code = HttpStatus.BAD_REQUEST;
        apiResult.message = result.message;
      }
    } catch (error) {
      apiResult.code = error.status;
      apiResult.message = error;
    }

    return apiResult;
  }

  @Get('/all/:attribute/:orderBy')
  async findAll(@Param('attribute') attribute: string, @Param('orderBy') orderBy: string): Promise<ApiResult> {
    let apiResult = { title: routeSucursalStockFindAll.title, route: routeSucursalStockFindAll.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalStockService.findAll(attribute, orderBy as 'ASC' | 'DESC');

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
        apiResult.rows = result.number;
        apiResult.data = result.data;
      } else {
        apiResult.code = HttpStatus.BAD_REQUEST;
        apiResult.message = result.message;
      }
    } catch (error) {
      apiResult.code = error.status;
      apiResult.message = error;
    }

    return apiResult;
  }

  @Get('/find-by/:attribute/:value/:orderBy')
  async findBy(@Param('attribute') attribute: string, @Param('value') value: string, @Param('orderBy') orderBy: string): Promise<ApiResult> {
    let apiResult = { title: routeSucursalStockFindBy.title, route: routeSucursalStockFindBy.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalStockService.findBy(attribute, value, orderBy as 'ASC' | 'DESC');

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
        apiResult.rows = result.number;
        apiResult.data = result.data;
      } else {
        apiResult.code = HttpStatus.BAD_REQUEST;
        apiResult.message = result.message;
      }
    } catch (error) {
      apiResult.code = error.status;
      apiResult.message = error;
    }

    return apiResult;
  }

  @Patch(':cod_prenda/:talla/:id_sucursal')
  async update(@Param('cod_prenda') cod_prenda: string, @Param('talla') talla: string, @Param('id_sucursal') id_sucursal: number, @Body() updateSucursalStockDto: UpdateSucursalStockDto): Promise<ApiResult> {
    let apiResult = { title: routeSucursalStockUpdate.title, route: routeSucursalStockUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalStockService.update(cod_prenda, talla, id_sucursal, updateSucursalStockDto);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
      } else {
        apiResult.code = HttpStatus.BAD_REQUEST;
        apiResult.message = result.message;
      }
    } catch (error) {
      apiResult.code = error.status;
      apiResult.message = error;
    }

    return apiResult;
  }

  @Delete(':cod_prenda/:talla/:id_sucursal')
  async remove(@Param('cod_prenda') cod_prenda: string, @Param('talla') talla: string, @Param('id_sucursal') id_sucursal: number): Promise<ApiResult> {
    let apiResult = { title: routeSucursalStockRemove.title, route: routeSucursalStockRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalStockService.remove(cod_prenda, talla, id_sucursal);

      if (result.boolean) {
        apiResult.status = 'correct';
        apiResult.code = HttpStatus.OK;
        apiResult.message = result.message;
        apiResult.boolean = true;
        apiResult.data = [result.object]
      } else {
        apiResult.code = HttpStatus.BAD_REQUEST;
        apiResult.message = result.message;
      }
    } catch (error) {
      apiResult.code = error.status;
      apiResult.message = error;
    }

    return apiResult;
  }

}
