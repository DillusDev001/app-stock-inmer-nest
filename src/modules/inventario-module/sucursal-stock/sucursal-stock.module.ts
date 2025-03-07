import { Module } from '@nestjs/common';
import { SucursalStockService } from './sucursal-stock.service';
import { SucursalStockController } from './sucursal-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucursalStock } from './entities/sucursal-stock.entity';
import { Prenda } from 'src/modules/prenda-module/prenda/entities/prenda.entity';
import { PrendaService } from 'src/modules/prenda-module/prenda/prenda.service';

@Module({
  imports: [TypeOrmModule.forFeature([SucursalStock]), TypeOrmModule.forFeature([Prenda])],
  controllers: [SucursalStockController],
  providers: [SucursalStockService, PrendaService],
})
export class SucursalStockModule {}
