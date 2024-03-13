import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error";

const verifyUserPermission = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const {admin} = res.locals.decoded;

    if(admin) return next();

    if(!admin){
        throw new AppError("Insufficient permission", 403);
    } 

    return next();
}

export default verifyUserPermission;