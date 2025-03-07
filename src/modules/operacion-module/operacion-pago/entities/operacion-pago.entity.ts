import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class OperacionPago {

    @PrimaryColumn()
    cod_operacion: string;

    @PrimaryColumn()
    sec_pago: number;

    @Column()
    metodo_pago: string;
    
    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;
    
    @Column()
    info: string;

    @Column()
    url_imagen: string;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fec_mod: string;

    @Column()
    user_mod: string;

}
