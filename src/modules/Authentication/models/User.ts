import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Book from "./Books";
import books from "./Books";

@Entity('usersTable')
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @OneToMany(()=>Book,(books)=>books.user)
    books:Book[]
}

export default User;