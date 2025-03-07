import { Entity, PrimaryColumn, Column, UpdateDateColumn } from "typeorm";

@Entity()
export class Operacion {

    @PrimaryColumn()
    cod_operacion: string;
    
    @Column()
    id_cliente: number;
    
    @Column()
    user_proforma: string;
    
    @Column()
    fec_proforma: string;
    
    @Column()
    user_venta: string;
    
    @Column()
    fec_venta: string;
    
    @Column()
    nro_factura: string;
    
    @Column()
    observacion: string;
    
    @Column()
    ciudad_envio: string;
    
    @Column('decimal', { precision: 10, scale: 2 })
    precio_total: number;
    
    @Column('decimal', { precision: 10, scale: 2 })
    descuento: number;
    
    @Column('decimal', { precision: 10, scale: 2 })
    precio_pagar: number;
    
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fec_mod: string;
    
    @Column()
    user_mod: string;
    
    @Column()
    estado: string;
    

}
