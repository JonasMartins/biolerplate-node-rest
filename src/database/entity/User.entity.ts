import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "./Base.entity";
import { Post } from "./Post.entity";

interface userBody {
    name: string;
    email: string;
    password: string;
}

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

    @OneToMany(() => Post, (post) => post.creator, {
        nullable: true,
        onDelete: "CASCADE",
    })
    public posts: Post[];

    constructor(body?: userBody) {
        super();
        if (body) {
            this.name = body.name;
            this.email = body.email;
            this.password = body.password;
        }
    }
}
