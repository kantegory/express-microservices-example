// Описание модели Queue
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Queue extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date'})
    date: string;

    @Column({type: 'varchar', length: 300})
    subject: string;

    @Column({type: 'numeric'})
    maxStudents: number;
}
