import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ClienteCuentaHistorial {

    @PrimaryGeneratedColumn()
    id_historial: number;

    @Column()
    id_cliente: number;

    @Column()
    tipo: string;

    @Column()
    metodo_cuenta: string;

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fec_mod: string;

    @Column()
    user_mod: string;

}
