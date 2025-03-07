import { Entity, PrimaryColumn, Column, UpdateDateColumn } from "typeorm";

@Entity()
export class PrendaTalla {

    @PrimaryColumn()
    cod_prenda: string;

    @PrimaryColumn()
    talla: string;

    @Column()
    cantidad: number;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fec_mod: string;

    @Column()
    user_mod: string;

}
