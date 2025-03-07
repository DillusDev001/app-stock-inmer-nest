import { Entity, PrimaryColumn, Column, UpdateDateColumn } from "typeorm";

@Entity()
export class Prenda {

    @PrimaryColumn()
    cod_prenda: string;

    @Column()
    color: string;

    @Column()
    categoria: string;

    @Column()
    material: string;

    @Column({ type: 'varchar', length: 500 })
    descripcion: string;

    @Column('decimal', { precision: 10, scale: 2 })
    pre_unitario: number;

    @Column('decimal', { precision: 10, scale: 2 })
    pre_mayor: number;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fec_mod: string;

    @Column()
    user_mod: string;

}
