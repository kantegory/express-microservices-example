// Описание модели Student
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 10})
    userId: string;

    @Column({type: 'varchar', length: 10})
    group: string;
}
