import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { SucursalUsuarioService } from './sucursal-usuario.service';
import { SucursalUsuarioDto } from './dto/sucursal-usuario.dto';
import { UpdateSucursalUsuarioDto } from './dto/update-sucursal-usuario.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/common/interfaces/api.result';
import { routeSucursalUsuarioCreate, routeSucursalUsuarioCreateMultiple, routeSucursalUsuarioFindAll, routeSucursalUsuarioFindBy, routeSucursalUsuarioFindOne, routeSucursalUsuarioRemove, routeSucursalUsuarioUpdate } from 'src/common/routes/sucursal-module/sucursal-usuario.router';

@ApiTags('sucursal-usuario')
@Controller('sucursal-usuario')
export class SucursalUsuarioController {

  constructor(private readonly sucursalUsuarioService: SucursalUsuarioService) { }

  @Post('/multiple')
  async createMultiple(@Body() array: SucursalUsuarioDto[]): Promise<ApiResult> {
    let apiResult = { title: routeSucursalUsuarioCreateMultiple.title, route: routeSucursalUsuarioCreateMultiple.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalUsuarioService.createMultiple(array);

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
  async create(@Body() sucursalUsuarioDto: SucursalUsuarioDto): Promise<ApiResult> {
    let apiResult = { title: routeSucursalUsuarioCreate.title, route: routeSucursalUsuarioCreate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalUsuarioService.create(sucursalUsuarioDto);

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

  @Get(':id_sucursal/:usuario')
  async findOne(@Param('id_sucursal') id_sucursal: number, @Param('usuario') usuario: string): Promise<ApiResult> {
    let apiResult = { title: routeSucursalUsuarioFindOne.title, route: routeSucursalUsuarioFindOne.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalUsuarioService.findOne(id_sucursal, usuario);

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
    let apiResult = { title: routeSucursalUsuarioFindAll.title, route: routeSucursalUsuarioFindAll.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalUsuarioService.findAll(attribute, orderBy as 'ASC' | 'DESC');

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
    let apiResult = { title: routeSucursalUsuarioFindBy.title, route: routeSucursalUsuarioFindBy.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalUsuarioService.findBy(attribute, value, orderBy as 'ASC' | 'DESC');

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

  @Patch(':id_sucursal/:usuario')
  async update(@Param('id_sucursal') id_sucursal: number, @Param('usuario') usuario: string, @Body() updateSucursalUsuarioDto: UpdateSucursalUsuarioDto): Promise<ApiResult> {
    let apiResult = { title: routeSucursalUsuarioUpdate.title, route: routeSucursalUsuarioUpdate.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalUsuarioService.update(id_sucursal, usuario, updateSucursalUsuarioDto);

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

  @Delete(':id_sucursal/:usuario')
  async remove(@Param('id_sucursal') id_sucursal: number, @Param('usuario') usuario: string): Promise<ApiResult> {
    let apiResult = { title: routeSucursalUsuarioRemove.title, route: routeSucursalUsuarioRemove.route, status: 'error', code: 0, message: '', boolean: false, rows: 0, data: null } as ApiResult;

    try {
      const result = await this.sucursalUsuarioService.remove(id_sucursal, usuario);

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
