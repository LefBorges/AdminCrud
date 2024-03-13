import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error";
import { CourseResult} from "../interfaces";
import { client } from "../database";

const validateIdBodyExist = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const {courseId} = req.body;

    const query: CourseResult = await client.query(
        'SELECT * "courses" FROM WHERE "id"= $1'
        [courseId]
    );

    if(query.rowCount === 0){
        throw new AppError("User/Course not found", 404)
    }

    res.locals = {...res.locals, course: query.rows[0]}

    return next()
}

export default validateIdBodyExist;