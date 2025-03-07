import { Entity, Column, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sucursal {

    @PrimaryGeneratedColumn()
    id_sucursal: number;

    @Column()
    Nombre: string;

    @Column()
    direccion: string;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fec_mod: string;

    @Column()
    user_mod: string;

}