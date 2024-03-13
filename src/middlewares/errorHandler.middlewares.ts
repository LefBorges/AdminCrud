import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error";
import { ZodError } from "zod";

const errorHandlerMiddleware = async (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({message: err.message})
    }

    if( err instanceof ZodError){
        return res.status(400).json({message: err.flatten().fieldErrors})
    }
    console.log(err);
    return res.status(500).json({message: "Internal server error"})
};

export default errorHandlerMiddleware;