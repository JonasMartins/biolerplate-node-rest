"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./controllers/post.controller");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.configuration();
        this.postController = new post_controller_1.PostController();
        this.routes();
    }
    configuration() {
        this.app.set("port", process.env.PORT || 3000);
    }
    routes() {
        this.app.use("/api/posts/", this.postController.router);
        this.app.get("/", (req, res) => {
            res.send("Hello World");
        });
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server running at ${this.app.get("port")} port.`);
        });
    }
}
const server = new Server();
server.start();
