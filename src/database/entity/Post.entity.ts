import { Entity, Column, ManyToOne, JoinTable } from "typeorm";
import { Base } from "./Base.entity";
import { User } from "./User.entity";

interface postBody {
    body: string;
    creator_id: string;
}

@Entity()
export class Post extends Base {
    public creator_id: string;

    @Column()
    public body!: string;

    @ManyToOne(() => User, (user) => user.posts, {
        nullable: true,
        onDelete: "CASCADE",
    })
    @JoinTable()
    public creator!: User;

    constructor(body: postBody) {
        super();
        if (body) {
            this.body = body.body;
            this.creator_id = body.creator_id;
        }
    }
}
