import { DeleteResult, getConnection, UpdateResult } from "typeorm";
import { PostRepository } from "./../repository/post.repository";
import { Post } from "./../database/entity/Post.entity";

export class PostService {
    private postRepository: PostRepository;
    constructor() {
        this.postRepository =
            getConnection().getCustomRepository(PostRepository);
    }

    public index = async (): Promise<Post[]> => {
        const posts = await this.postRepository.find();
        return posts;
    };

    public getById = async (id: string): Promise<Post | undefined> => {
        const post = await this.postRepository.findOne({ id: id });
        return post;
    };
    public create = async (post: Post): Promise<Post> => {
        const newPost = await this.postRepository.save(post);
        return newPost;
    };
    public update = async (post: Post, id: string): Promise<UpdateResult> => {
        const updatedPost = await this.postRepository.update(id, post);
        return updatedPost;
    };
    public delete = async (id: string): Promise<DeleteResult> => {
        const deletedPost = await this.postRepository.delete(id);
        return deletedPost;
    };
}
