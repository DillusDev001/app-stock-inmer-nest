import { Module } from '@nestjs/common';
import { PrendaService } from './prenda.service';
import { PrendaController } from './prenda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prenda } from './entities/prenda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prenda])],
  controllers: [PrendaController],
  providers: [PrendaService],
})
export class PrendaModule {}
