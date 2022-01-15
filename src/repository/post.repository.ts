import { Repository, EntityRepository } from "typeorm";
import { Post } from "./../database/entity/Post.entity";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}
