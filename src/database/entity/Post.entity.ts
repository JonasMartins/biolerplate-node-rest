import { Entity, Column, ManyToOne, JoinTable } from "typeorm";
import { Base } from "./Base.entity";
import { User } from "./User.entity";

@Entity()
export class Post extends Base {
    @Column()
    public body!: string;

    @ManyToOne(() => User, (user) => user.posts, {
        nullable: true,
        onDelete: "CASCADE",
    })
    @JoinTable()
    public creator!: User;
}
