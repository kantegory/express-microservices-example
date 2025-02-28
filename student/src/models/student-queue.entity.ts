// Описание модели StudentQueue
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { Student } from "./student.entity";

@Entity()
export class StudentQueue extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student)
    student: Student

    @Column({type: 'varchar', length: 100})
    task: string;

    @Column({type: 'varchar', length: 200})
    link: string;

    @Column({type: 'bool'})
    isPass: boolean;

    @Column({type: 'integer'})
    order: number;

    @Column({type: 'varchar', length: 10})
    queueId: string;
}
