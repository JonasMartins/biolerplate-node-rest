import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BaseEntity,
    Column,
} from "typeorm";
import { v4 } from "uuid";

export abstract class Base extends BaseEntity {
    @Column(() => String)
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column()
    @CreateDateColumn()
    public createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt!: Date;

    @BeforeInsert()
    addId() {
        this.id = v4();
    }
}
