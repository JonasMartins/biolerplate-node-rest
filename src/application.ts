import express, { Request, Response } from "express";
import { PostController } from "./controllers/post.controller";
import { UserController } from "./controllers/user.controller";
import { intializeDB } from "./database/index.database";
import { Server } from "http";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { auth } from "./services/auth.service";

declare module "express-session" {
  interface SessionData {
    userId: string;
    userRole: string;
  }
}

export default class Application {
  public app: express.Application;
  public server: Server;
  private postController: PostController;
  private userController: UserController;
  public cookieLife: number = 1000 * 60 * 60 * 24 * 4; // four days

  constructor() {
    this.app = express();
  }

  public connect = async (): Promise<void> => {
    await intializeDB();
  };

  public init = async (): Promise<void> => {
    this.postController = new PostController();
    this.userController = new UserController();

    var corsOptions = {
      origin: process.env.DEV_FRONT_URL,
      credentials: true, // <-- REQUIRED backend setting
    };

    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors(corsOptions));
    this.app.use(
      session({
        name: process.env.COOKIE_NAME,
        store: new RedisStore({
          client: redis,
          disableTouch: true,
        }),
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        unset: "destroy",
      })
    );

    this.app.set("port", process.env.PORT || 3000);

    this.app.use(auth);
    this.server = this.app.listen(this.app.get("port"), () => {
      console.log(`Server running at ${this.app.get("port")} port.`);
    });
  };

  public routes() {
    this.app.use("/api/posts/", this.postController.router);
    this.app.use("/api/user/", this.userController.router);
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello World");
    });
  }
}
