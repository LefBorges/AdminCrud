import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app.error';
import { verify } from 'jsonwebtoken';

const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void =>{
    let authorization = req.headers.authorization;
    if(!authorization) throw new AppError("Missing bearer token", 401)

    try{
        const token = authorization.split(" ")[1];    

        const decoded = verify(token, process.env.SECRET_KEY!); 

        res.locals = {...res.locals,decoded};

        return next()
    }
    catch(err){
        throw new AppError("Invalid token", 401)
    }
}

export default verifyToken;