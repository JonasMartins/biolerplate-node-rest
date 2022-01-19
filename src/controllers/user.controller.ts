import { Router, Request, Response, NextFunction } from "express";
import { User } from "./../database/entity/User.entity";
import { UserService } from "./../services/user.service";
import argon2 from "argon2";

export class UserController {
    public router: Router;
    private userService: UserService;
    public cookieLife: number = 1000 * 60 * 60 * 24 * 4;

    constructor() {
        this.router = Router();
        this.userService = new UserService();
        this.routes();
    }

    public index = async (req: Request, res: Response, next: NextFunction) => {
        const users = await this.userService.index();
        return res.status(200).send(users).json();
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
            const user = await this.userService.getById(id);

            if (user === undefined) {
                return res.send(404).send("Not Found");
            }
            return res.status(200).send(user);
        } catch (error) {
            console.error(error.stack);
            return res.status(500).send("Server Error");
        }
    };

    private hashPassword = async (password: string): Promise<string> => {
        return await argon2.hash(password);
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const user = req["body"] as User;
        if (!user) {
            return res.status(400).send("Bad Request");
        }
        const emailAlreadyTaken = await this.userService.findByEmail(
            user.email
        );
        if (emailAlreadyTaken) {
            return res.status(400).send("email already taken");
        }

        try {
            user.password = await this.hashPassword(user.password);
            const newUser = await this.userService.create(user);
            return res.status(201).send(newUser);
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
            const user = req["body"] as User;

            if (!user) {
                return res.status(404).send("Could not found user");
            }
            await this.userService.update(user, id);
            return res.status(200).send("User Updated");
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
            await this.userService.delete(id);
            return res.status(200).send("User Deleted");
        } catch (error) {
            console.error(error.stack);
            return res.status(500).send("Server Error");
        }
    };

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        req.session.destroy(() => {});
        // resets also the cookie value
        res.cookie(process.env.COOKIE_NAME!, "", {
            httpOnly: true,
            maxAge: this.cookieLife,
        });

        return res.status(200).send("Logout!");
    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        if (req.session.userId) {
            return res.status(200).send("already logged");
        }

        const email = req["body"]["email"];
        const password = req["body"]["password"];

        if (!email || !password) {
            return res.status(400).send("Bad Request");
        }

        const user = await this.userService.getByEmail(email);

        if (!user) {
            return res.status(404).send("User not found");
        }

        const validPass = await argon2.verify(user.password, password);

        if (!validPass) {
            return res.status(400).send("Wrong password");
        }

        req.session.userId = user.id;
        res.cookie(process.env.COOKIE_NAME!, req.sessionID, {
            httpOnly: true,
            maxAge: this.cookieLife,
        });

        return res.status(200).send("User logged!");
    };

    public routes() {
        this.router.post("/login", this.login);
        this.router.post("/logout", this.logout);
        this.router.get("/", this.index);
        this.router.get("/:id", this.getById);
        this.router.post("/create", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
