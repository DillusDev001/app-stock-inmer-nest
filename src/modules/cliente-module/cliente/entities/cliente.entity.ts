import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn()
    id_cliente: number;

    @Column()
    cliente: string;

    @Column()
    ci: string;

    @Column()
    razon: string;

    @Column()
    nit: string;

    @Column()
    celular: string;

    @Column()
    ciudad: string;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fec_mod: string;

    @Column()
    user_mod: string;

}
