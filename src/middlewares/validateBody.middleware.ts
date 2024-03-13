import { NextFunction, Response, Request } from "express";
import { ZodTypeAny } from "zod";

const validateBodyMiddleware = (schema: ZodTypeAny) => 
( req: Request, res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);

    return next();
}

export default validateBodyMiddleware;