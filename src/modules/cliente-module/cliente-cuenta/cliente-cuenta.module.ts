import { Module } from '@nestjs/common';
import { ClienteCuentaService } from './cliente-cuenta.service';
import { ClienteCuentaController } from './cliente-cuenta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteCuenta } from './entities/cliente-cuenta.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ClienteCuenta])],
  controllers: [ClienteCuentaController],
  providers: [ClienteCuentaService],
})
export class ClienteCuentaModule { }
