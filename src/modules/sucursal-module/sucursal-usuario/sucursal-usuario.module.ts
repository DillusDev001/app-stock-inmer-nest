import { Module } from '@nestjs/common';
import { SucursalUsuarioService } from './sucursal-usuario.service';
import { SucursalUsuarioController } from './sucursal-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucursalUsuario } from './entities/sucursal-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SucursalUsuario])],
  controllers: [SucursalUsuarioController],
  providers: [SucursalUsuarioService],
})
export class SucursalUsuarioModule {}
