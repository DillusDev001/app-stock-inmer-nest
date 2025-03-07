import { Entity, PrimaryColumn, Column,  UpdateDateColumn } from "typeorm";

@Entity()
export class OperacionSaldo {

    @PrimaryColumn()
    cod_operacion: string;

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fec_mod: string;

    @Column()
    user_mod: string;

}
