import { Module } from '@nestjs/common';
import { OperacionSaldoHistorialService } from './operacion-saldo-historial.service';
import { OperacionSaldoHistorialController } from './operacion-saldo-historial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperacionSaldoHistorial } from './entities/operacion-saldo-historial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperacionSaldoHistorial])],
  controllers: [OperacionSaldoHistorialController],
  providers: [OperacionSaldoHistorialService],
})
export class OperacionSaldoHistorialModule {}
