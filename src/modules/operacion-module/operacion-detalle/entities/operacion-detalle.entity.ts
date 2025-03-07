import { Entity, PrimaryColumn, Column, UpdateDateColumn } from "typeorm";

@Entity()
export class OperacionDetalle {

    @PrimaryColumn()
    cod_operacion: string;

    @PrimaryColumn()
    cod_prenda: string;
    
    @PrimaryColumn()
    talla: string;

    @Column()
    sec: number;

    @Column()
    cantidad: number;

    @Column('decimal', { precision: 10, scale: 2 })
    precio_unitario: number;

    @Column('decimal', { precision: 10, scale: 2 })
    sub_total: number;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fec_mod: string;

    @Column()
    user_mod: string;

}
