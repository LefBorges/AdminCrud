import { NextFunction, Request, Response, response } from "express";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";
import { AppError } from "./app.error";

const handlerError = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message
        })
    }
    if(err instanceof ZodError){
        return res.status(400).json(err.flatten().fieldErrors)
    }

    if(err instanceof JsonWebTokenError){
        return res.status(401).json({error: err.message})
    }

    console.error(err)

    return res.status(500).json({ menssage: 'Internal server error'})
}

export { handlerError };