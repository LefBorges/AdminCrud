import { NextFunction, Request, Response } from "express";
import { CourseResult, UserResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors/app.error";

const checkCurseOrUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { userId, courseId } = req.params;

    const queryUserResult: UserResult = await client.query(`SELECT * FROM "users" WHERE "id" = $1`, [userId]);

    const queryCourseResult: CourseResult = await client.query(`SELECT * FROM "courses" WHERE "id" = $1`, [courseId]);

    if(queryUserResult.rows.length === 0 || queryCourseResult.rows.length === 0){
        throw new AppError("User/course not found", 404)
    }

    return next()
}

export default checkCurseOrUserId;