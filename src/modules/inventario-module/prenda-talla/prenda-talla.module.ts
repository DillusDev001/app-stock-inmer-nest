import { Module } from '@nestjs/common';
import { PrendaTallaService } from './prenda-talla.service';
import { PrendaTallaController } from './prenda-talla.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrendaTalla } from './entities/prenda-talla.entity';
import { Prenda } from 'src/modules/prenda-module/prenda/entities/prenda.entity';
import { PrendaService } from 'src/modules/prenda-module/prenda/prenda.service';

@Module({
  imports: [TypeOrmModule.forFeature([PrendaTalla]), TypeOrmModule.forFeature([Prenda])],
  controllers: [PrendaTallaController],
  providers: [PrendaTallaService, PrendaService],
})
export class PrendaTallaModule {}
