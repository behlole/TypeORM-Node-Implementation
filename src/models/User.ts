import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('usersTable')
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    username: string
}

export default User;