import { Entity, PrimaryColumn, Column, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryColumn()
    usuario: string;

    @Column()
    password: string;

    @Column()
    nombres: string;

    @Column()
    apellidos: string;

    @Column()
    celular: string;

    @Column()
    pregunta: string;

    @Column()
    respuesta: string;

    @Column()
    rol: string;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fec_mod: string;

    @Column()
    user_mod: string;

    @Column({ type: 'int', default: 1 })
    estado: number;

}