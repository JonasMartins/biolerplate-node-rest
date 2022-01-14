"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const express_1 = require("express");
const post_service_1 = require("./../services/post.service");
class PostController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(this.postService.index());
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(this.postService.create());
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(this.postService.update());
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(this.postService.delete());
        });
        this.router = (0, express_1.Router)();
        this.postService = new post_service_1.PostService();
        this.routes();
    }
    routes() {
        this.router.get("/", this.index);
        this.router.post("/create", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.PostController = PostController;
