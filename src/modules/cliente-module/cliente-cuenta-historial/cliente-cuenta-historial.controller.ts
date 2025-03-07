import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ClienteCuentaHistorialService } from './cliente-cuenta-historial.service';
import { ClienteCuentaHistorialDto } from './dto/cliente-cuenta-historial.dto';
import { UpdateClienteCuentaHistorialDto } from './dto/update-cliente-cuenta-historial.dto';
import { ApiResult } from 'src/common/interfaces/api.result';
import { routeClienteCuentaHistorialCreateMultiple, routeClienteCuentaHistorialCreate, routeClienteCuentaHistorialFindOne, routeClienteCuentaHistorialFindAll, routeClienteCuentaHistorialFindBy, routeClienteCuentaHistorialUpdate, routeClienteCuentaHistorialRemove } from 'src/common/routes/cliente-module/cliente-cuenta-historial.router';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cliente-cuenta-historial')
@Controller('cliente-cuenta-historial')
export class ClienteCuentaHistorialController {

  constructor(private readonly clienteCuentaHistorialService: ClienteCuentaHistorialService) { }

  @Post('/multiple')
  async createMultiple(@Body() array: ClienteCuentaHistorialDto[]): Promise<ApiResult> {
    let apiResult = { title: routeClienteCuentaHistorialCreateMultiple.title, route: routeClienteCuentaHistorialCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.clienteCuentaHistorialService.createMultiple(array);

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
  async create(@Body() clienteCuentaHistorialDto: ClienteCuentaHistorialDto): Promise<ApiResult> {
    let apiResult = { title: routeClienteCuentaHistorialCreate.title, route: routeClienteCuentaHistorialCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.clienteCuentaHistorialService.create(clienteCuentaHistorialDto);

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

  @Get(':id_historial/:id_cliente')
  async findOne(@Param('id_historial') id_historial: number, @Param('id_cliente') id_cliente: number): Promise<ApiResult> {
    let apiResult = { title: routeClienteCuentaHistorialFindOne.title, route: routeClienteCuentaHistorialFindOne.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.clienteCuentaHistorialService.findOne(id_historial, id_cliente);

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
    let apiResult = { title: routeClienteCuentaHistorialFindAll.title, route: routeClienteCuentaHistorialFindAll.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.clienteCuentaHistorialService.findAll(attribute, orderBy as 'ASC' | 'DESC');

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
    let apiResult = { title: routeClienteCuentaHistorialFindBy.title, route: routeClienteCuentaHistorialFindBy.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.clienteCuentaHistorialService.findBy(attribute, value, orderBy as 'ASC' | 'DESC');

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

  @Patch(':id_historial/:id_cliente')
  async update(@Param('id_historial') id_historial: number, @Param('id_cliente') id_cliente: number, @Body() updateClienteCuentaHistorialDto: UpdateClienteCuentaHistorialDto): Promise<ApiResult> {
    let apiResult = { title: routeClienteCuentaHistorialUpdate.title, route: routeClienteCuentaHistorialUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.clienteCuentaHistorialService.update(id_historial, id_cliente, updateClienteCuentaHistorialDto);

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

  @Delete(':id_historial/:id_cliente')
  async remove(@Param('id_historial') id_historial: number, @Param('id_cliente') id_cliente: number): Promise<ApiResult> {
    let apiResult = { title: routeClienteCuentaHistorialRemove.title, route: routeClienteCuentaHistorialRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.clienteCuentaHistorialService.remove(id_historial, id_cliente);

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
