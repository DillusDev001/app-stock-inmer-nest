import { Module } from '@nestjs/common';
import { OperacionDetalleService } from './operacion-detalle.service';
import { OperacionDetalleController } from './operacion-detalle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperacionDetalle } from './entities/operacion-detalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperacionDetalle])],
  controllers: [OperacionDetalleController],
  providers: [OperacionDetalleService],
})
export class OperacionDetalleModule { }
