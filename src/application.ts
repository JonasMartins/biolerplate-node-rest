import express, { Request, Response } from "express";
import { PostController } from "./controllers/post.controller";
import { intializeDB } from "./database/index.database";
import cors from "cors";

export default class Application {
    private app: express.Application;
    private postController: PostController;

    constructor() {
        this.app = express();
    }

    public connect = async (): Promise<void> => {
        await intializeDB();
    };

    public init = async (): Promise<void> => {
        this.postController = new PostController();

        var corsOptions = {
            origin: process.env.DEV_FRONT_URL,
            credentials: true, // <-- REQUIRED backend setting
        };

        this.app.use(cors(corsOptions));

        this.app.set("port", process.env.PORT || 3000);

        this.app.listen(this.app.get("port"), () => {
            console.log(`Server running at ${this.app.get("port")} port.`);
        });
    };

    public routes() {
        this.app.use("/api/posts/", this.postController.router);
        this.app.get("/", (req: Request, res: Response) => {
            res.send("Hello World");
        });
    }
}
