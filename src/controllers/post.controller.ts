import { Router, Request, Response, NextFunction } from "express";
import { Post } from "./../database/entity/Post.entity";
import { PostService } from "./../services/post.service";

export class PostController {
    public router: Router;
    private postService: PostService;

    constructor() {
        this.router = Router();
        this.postService = new PostService();
        this.routes();
    }

    public index = async (req: Request, res: Response, next: NextFunction) => {
        const posts = await this.postService.index();
        return res.status(200).send(posts).json();
    };

    public getById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (!req["params"]["id"]) {
            return res.status(400).send("Bad Request");
        }

        try {
            const id = req["params"]["id"];
            const post = await this.postService.getById(id);

            if (post === undefined) {
                return res.send(404).send("Not Found");
            }
            return res.status(200).send(post);
        } catch (error) {
            console.error(error.stack);
            return res.status(500).send("Server Error");
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        if (!req["body"]) {
            return res.status(400).send("Bad Request");
        }
        try {
            const post = req["body"] as Post;
            const newPost = await this.postService.create(post);
            return res.status(201).send(newPost);
        } catch (error) {
            console.error(error.stack);
            return res.status(500).send("Server Error");
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        if (!req["params"]["id"] || !req["body"]) {
            return res.status(400).send("Bad Request");
        }

        try {
            const id = req["params"]["id"];
            const post = req["body"] as Post;

            if (!post) {
                return res.status(404).send("Could not found post");
            }
            await this.postService.update(post, id);
            return res.status(200).send("Post Updated");
        } catch (error) {
            console.error(error.stack);
            return res.status(500).send("Server Error");
        }
    };

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        if (!req["params"]["id"]) {
            return res.status(400).send("Bad Request");
        }
        try {
            const id = req["params"]["id"];
            await this.postService.delete(id);
            return res.status(200).send("Post Deleted");
        } catch (error) {
            console.error(error.stack);
            return res.status(500).send("Server Error");
        }
    };

    public routes() {
        this.router.get("/", this.index);
        this.router.get("/:id", this.getById);
        this.router.post("/create", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
