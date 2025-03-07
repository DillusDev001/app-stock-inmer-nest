import { Module } from '@nestjs/common';
import { ClienteCuentaHistorialService } from './cliente-cuenta-historial.service';
import { ClienteCuentaHistorialController } from './cliente-cuenta-historial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteCuentaHistorial } from './entities/cliente-cuenta-historial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteCuentaHistorial])],
  controllers: [ClienteCuentaHistorialController],
  providers: [ClienteCuentaHistorialService],
})
export class ClienteCuentaHistorialModule {}
