// Описание модели User
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm"

import hashPassword from "../utils/hashPassword";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 300})
    fullName: string;

    @Column({type: 'varchar', length: 300})
    email: string;

    @Column({type: 'varchar', length: 150})
    password: string;

    @Column({type: 'varchar', length: 10})
    userType: 'STUDENT' | 'TEACHER';

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = hashPassword(this.password)
    }
}
