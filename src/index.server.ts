import express, { Request, Response } from "express";
import { PostController } from "./controllers/post.controller";
import { intializeDB } from "./database/index.database";
import cors from "cors";

class Server {
    private app: express.Application;
    private postController: PostController;

    constructor() {
        this.app = express();
        this.configuration();
        this.postController = new PostController();
        this.routes();
    }

    public connect = async (): Promise<void> => {
        await intializeDB();
    };

    public configuration() {
        var corsOptions = {
            origin: process.env.DEV_FRONT_URL,
            credentials: true, // <-- REQUIRED backend setting
        };

        this.app.use(cors(corsOptions));

        this.app.set("port", process.env.PORT || 3000);
    }

    public routes() {
        this.app.use("/api/posts/", this.postController.router);
        this.app.get("/", (req: Request, res: Response) => {
            res.send("Hello World");
        });
    }

    public start() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server running at ${this.app.get("port")} port.`);
        });
    }
}

const server = new Server();
server.connect();
server.start();
