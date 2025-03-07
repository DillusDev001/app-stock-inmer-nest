import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { OperacionSaldoHistorialService } from './operacion-saldo-historial.service';
import { OperacionSaldoHistorialDto } from './dto/operacion-saldo-historial.dto';
import { UpdateOperacionSaldoHistorialDto } from './dto/update-operacion-saldo-historial.dto';
import { ApiResult } from 'src/common/interfaces/api.result';
import { routeOperacionSaldoHistorialCreateMultiple, routeOperacionSaldoHistorialCreate, routeOperacionSaldoHistorialFindOne, routeOperacionSaldoHistorialFindAll, routeOperacionSaldoHistorialFindBy, routeOperacionSaldoHistorialUpdate, routeOperacionSaldoHistorialRemove } from 'src/common/routes/operacion-module/operacion-saldo-historial.router';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('operacion-saldo-historial')
@Controller('operacion-saldo-historial')
export class OperacionSaldoHistorialController {

  constructor(private readonly operacionSaldoHistorialService: OperacionSaldoHistorialService) { }

  @Post('/multiple')
  async createMultiple(@Body() array: OperacionSaldoHistorialDto[]): Promise<ApiResult> {
    let apiResult = { title: routeOperacionSaldoHistorialCreateMultiple.title, route: routeOperacionSaldoHistorialCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.operacionSaldoHistorialService.createMultiple(array);

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
  async create(@Body() operacionSaldoHistorialDto: OperacionSaldoHistorialDto): Promise<ApiResult> {
    let apiResult = { title: routeOperacionSaldoHistorialCreate.title, route: routeOperacionSaldoHistorialCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.operacionSaldoHistorialService.create(operacionSaldoHistorialDto);

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

  @Get(':id_historial/:cod_operacion')
  async findOne(@Param('id_historial') id_historial: number, @Param('cod_operacion') cod_operacion: string): Promise<ApiResult> {
    let apiResult = { title: routeOperacionSaldoHistorialFindOne.title, route: routeOperacionSaldoHistorialFindOne.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.operacionSaldoHistorialService.findOne(id_historial, cod_operacion);

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
    let apiResult = { title: routeOperacionSaldoHistorialFindAll.title, route: routeOperacionSaldoHistorialFindAll.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.operacionSaldoHistorialService.findAll(attribute, orderBy as 'ASC' | 'DESC');

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
    let apiResult = { title: routeOperacionSaldoHistorialFindBy.title, route: routeOperacionSaldoHistorialFindBy.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.operacionSaldoHistorialService.findBy(attribute, value, orderBy as 'ASC' | 'DESC');

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

  @Patch(':id_historial/:cod_operacion')
  async update(@Param('id_historial') id_historial: number, @Param('cod_operacion') cod_operacion: string, @Body() updateOperacionSaldoHistorialDto: UpdateOperacionSaldoHistorialDto): Promise<ApiResult> {
    let apiResult = { title: routeOperacionSaldoHistorialUpdate.title, route: routeOperacionSaldoHistorialUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.operacionSaldoHistorialService.update(id_historial, cod_operacion, updateOperacionSaldoHistorialDto);

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

  @Delete(':id_historial/:cod_operacion')
  async remove(@Param('id_historial') id_historial: number, @Param('cod_operacion') cod_operacion: string): Promise<ApiResult> {
    let apiResult = { title: routeOperacionSaldoHistorialRemove.title, route: routeOperacionSaldoHistorialRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.operacionSaldoHistorialService.remove(id_historial, cod_operacion);

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
