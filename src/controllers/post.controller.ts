import { Router, Request, Response } from "express";
import { PostService } from "./../services/post.service";

export class PostController {
    public router: Router;
    private postService: PostService;

    constructor() {
        this.router = Router();
        this.postService = new PostService();
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        res.send(this.postService.index());
    };

    public create = async (req: Request, res: Response) => {
        res.send(this.postService.create());
    };

    public update = async (req: Request, res: Response) => {
        res.send(this.postService.update());
    };

    public delete = async (req: Request, res: Response) => {
        res.send(this.postService.delete());
    };

    public routes() {
        this.router.get("/", this.index);
        this.router.post("/create", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
