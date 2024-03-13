import format from "pg-format";
import { UserCreate, UserResult, UserRetrive, UserReturn } from "../interfaces";
import { client } from "../database";
import { hashSync } from "bcryptjs";
import { returnUserSchema, retriveUserSchema} from "../schemas";
import { AppError } from "../errors/app.error";

const create = async (payload: UserCreate): Promise<UserReturn> =>{
    payload.password = hashSync(payload.password, 10);

    const query: string = format(
        'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    );
    
    const result: UserResult = await client.query(query);

    const userNew = result.rows[0];

    return returnUserSchema.parse(userNew);
}

const retrive = async (admin:boolean): Promise<UserRetrive> => {
    if(!admin){
        throw new AppError("Insufficient permission", 403)
    }

    const query: UserResult = await client.query('SELECT * FROM "users"');

    const result = query.rows;
    
    const UserReturn = retriveUserSchema.parse(result);

    return UserReturn;
}

const reatriveCourseUser = async (userId: string) => {
    const query: string = `
    SELECT
        c.id "courseId",
        c.name "courseName",
        c.description "courseDescription",
        uc.active "userActiveInCourse",
        u.id "userId",
        u.name "userName"
    FROM "users" u
    JOIN "userCourses" uc
        ON u.id = uc."userId"
    JOIN "courses" c
        ON c.id = uc."courseId"
    WHERE u.id = $1;
    `

    const result = await client.query(query, [userId]);

    if(!result.rowCount){
        throw new AppError("No course found", 404);
    }

    return result.rows;
}   

export default { create, retrive, reatriveCourseUser };