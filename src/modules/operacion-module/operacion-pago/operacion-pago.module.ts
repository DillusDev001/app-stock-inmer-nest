import { Module } from '@nestjs/common';
import { OperacionPagoService } from './operacion-pago.service';
import { OperacionPagoController } from './operacion-pago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperacionPago } from './entities/operacion-pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperacionPago])],
  controllers: [OperacionPagoController],
  providers: [OperacionPagoService],
})
export class OperacionPagoModule { }
