import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OperacionSaldoHistorial {

    @PrimaryGeneratedColumn()
    id_historial: number;

    @Column()
    cod_operacion: string;

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fec_pago: string;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fec_mod: string;

    @Column()
    user_mod: string;

}
