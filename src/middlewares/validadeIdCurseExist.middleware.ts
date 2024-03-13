import { NextFunction, Response, Request } from "express";
import { CourseResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors/app.error";

const validateCurseIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> =>{
    const {courseId} = req.params;

    const query: CourseResult = await client.query(
        'SELECT * "courses" FROM WHERE "id"= $1'
    );

    if(query.rowCount === 0){
        throw new AppError("No course found", 404)
    }

    res.locals = {...res.locals, course: query.rows[0]}

    return next()
}

export default validateCurseIdExist;