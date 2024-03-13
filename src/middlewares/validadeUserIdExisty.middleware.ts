import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import { AppError } from "../errors/app.error";
import { UserResult } from "../interfaces";

const validateIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
):Promise<void> => {
    const { id } = req.params;

    const query: UserResult = await client.query(
        'SELECT * FROM "userCourses" WHERE "userId" = $1',
        [id]
    );

    if(query.rows.length === 0){
        throw new AppError("No course found", 404)
    }

    return next()
}

export default validateIdExist;