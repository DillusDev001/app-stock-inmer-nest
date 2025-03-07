import { Module } from '@nestjs/common';
import { OperacionService } from './operacion.service';
import { OperacionController } from './operacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operacion } from './entities/operacion.entity';
import { Cliente } from 'src/modules/cliente-module/cliente/entities/cliente.entity';
import { ClienteService } from 'src/modules/cliente-module/cliente/cliente.service';

@Module({
  imports: [TypeOrmModule.forFeature([Operacion]), TypeOrmModule.forFeature([Cliente])],
  controllers: [OperacionController],
  providers: [OperacionService, ClienteService],
})
export class OperacionModule {}
