import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column()
    content: string
}