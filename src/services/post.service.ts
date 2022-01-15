import { getConnection } from "typeorm";
import { PostRepository } from "./../repository/post.repository";

export class PostService {
    private postRepository: PostRepository;
    constructor() {
        this.postRepository =
            getConnection().getCustomRepository(PostRepository);
    }

    public index = async () => {
        const posts = await this.postRepository.find();
        return posts;
    };
    public create = () => {};
    public update = () => {};
    public delete = () => {};
}
