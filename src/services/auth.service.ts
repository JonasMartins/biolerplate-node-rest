import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl !== "/api/user/login" && !req.session.userId) {
        return res.status(401).send("You must be logged to reach this route.");
    } else {
        return next();
    }
};
