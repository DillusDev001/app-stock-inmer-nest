import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { TokenService } from './common/services/token.service';
import { UsuarioModule } from './modules/usuario-module/usuario/usuario.module';
import { SucursalModule } from './modules/sucursal-module/sucursal/sucursal.module';
import { SucursalUsuarioModule } from './modules/sucursal-module/sucursal-usuario/sucursal-usuario.module';
import { ColorModule } from './modules/mantenimiento-module/color/color.module';
import { TallaModule } from './modules/mantenimiento-module/talla/talla.module';
import { CategoriaModule } from './modules/mantenimiento-module/categoria/categoria.module';
import { MaterialModule } from './modules/mantenimiento-module/material/material.module';
import { PrendaModule } from './modules/prenda-module/prenda/prenda.module';
import { PrendaTallaModule } from './modules/inventario-module/prenda-talla/prenda-talla.module';
import { SucursalStockModule } from './modules/inventario-module/sucursal-stock/sucursal-stock.module';
import { ClienteModule } from './modules/cliente-module/cliente/cliente.module';
import { ClienteCuentaModule } from './modules/cliente-module/cliente-cuenta/cliente-cuenta.module';
import { ClienteCuentaHistorialModule } from './modules/cliente-module/cliente-cuenta-historial/cliente-cuenta-historial.module';
import { OperacionModule } from './modules/operacion-module/operacion/operacion.module';
import { OperacionDetalleModule } from './modules/operacion-module/operacion-detalle/operacion-detalle.module';
import { OperacionPagoModule } from './modules/operacion-module/operacion-pago/operacion-pago.module';
import { OperacionSaldoModule } from './modules/operacion-module/operacion-saldo/operacion-saldo.module';
import { OperacionSaldoHistorialModule } from './modules/operacion-module/operacion-saldo-historial/operacion-saldo-historial.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }), // para evitar el error en http://localhost:3000
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.PORT_MYSQL),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,

      autoLoadEntities: true,
      dropSchema: false,
      synchronize: false,
      logging: false, // Desactiva logs en producción para mejorar rendimiento
    }), 
    UsuarioModule, 
    SucursalModule, SucursalUsuarioModule, 
    ColorModule, TallaModule, CategoriaModule, MaterialModule, 
    PrendaModule, PrendaTallaModule, 
    SucursalStockModule, 
    ClienteModule, ClienteCuentaModule, ClienteCuentaHistorialModule, 
    OperacionModule, OperacionDetalleModule, OperacionPagoModule, OperacionSaldoModule, OperacionSaldoHistorialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
