import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { Base } from "./Base.entity";
import { Post } from "./Post.entity";
import argon2 from "argon2";

@Entity()
export class User extends Base {
    @Column({ length: 100 })
    public name!: string;

    @Column({ length: 200 })
    public email!: string;

    @Column({ length: 200 })
    public password!: string;

    @Column({ nullable: true })
    public picture: string;

    @OneToMany(() => Post, (post) => post.creator)
    public posts: Post[];

    @BeforeInsert()
    async hashPassword() {
        const hashedPasswWord = await argon2.hash(this.password);
        this.password = hashedPasswWord;
    }
}
