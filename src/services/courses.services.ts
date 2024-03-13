import format from "pg-format";
import { Course, CourseCreate, CourseResult, CourseRetrive } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors/app.error";

const create = async (payload: CourseCreate): Promise<Course> =>{
    const query: string = format (
        'INSERT INTO "courses" (%I)VALUES (%L)RETURNING *',
        Object.keys(payload),
        Object.values(payload)
    )

    const result: CourseResult = await client.query(query);

    const course = result.rows[0];

    return course;
};

const adduserCourse = async(
    idUser: string,
    idCourse: string 
): Promise<{message: string}> =>{

    const payload = {
        userId: idUser,
        courseId: idCourse
    }

    const query: string  = `INSERT INTO "userCourses" (%I) VALUES (%L) RETURNING *;`;

    const queryFormat: string = format(
        query, 
        Object.keys(payload), 
        Object.values(payload)
    )

    await client.query(queryFormat)

    return {"message": "User successfully vinculed to course"}
}

const reatriveAllCourses = async (): Promise<CourseRetrive> =>{
    const query: CourseResult = await client.query('SELECT * FROM "courses"');

    return query.rows;
}

const retriveAllUserCourse = async (idCourse: string) =>{
    const query: string = `
    SELECT
        u.id "userId",
        u.name "userName",
        c.id "courseId",
        c.name "courseName",
        c.description "courseDescription",
        uc.active "userActiveInCourse"
    FROM "courses" c
    JOIN "userCourses" uc
        ON c.id = uc."courseId"
    JOIN "users" u
        ON u.id = uc."userId"
    WHERE c.id = $1;`

    const result = await client.query(query, [idCourse]);

    if(!result.rowCount){
        throw new AppError("No course found", 404);
    }

    return result.rows;
}

const destroy = async (idUser: string, idCourse: string) =>{
    const query: string =
    'UPDATE "userCourses" SET "active" = false WHERE "courseId" = $1 AND "userId" = $2';

    const result = await client.query(query, [idCourse, idUser]);

    return result;
}

export default {create, destroy, adduserCourse, retriveAllUserCourse, reatriveAllCourses};
