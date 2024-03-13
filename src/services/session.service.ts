import { sign } from "jsonwebtoken";
import { client } from "../database";
import { AppError } from "../errors/app.error";
import { SessionCreate, SessionReturn, UserResult, User } from "../interfaces";
import { compare } from "bcryptjs";

const create = async (payload: SessionCreate): Promise<SessionReturn> => {

    const query: UserResult = await client.query(
        'SELECT * FROM "users" WHERE "email" = $1;',
        [payload.email]
    )

    if(!query.rowCount){
        throw new AppError("Wrong email/password", 401)
    }

    const user: User = query. rows[0];

    const password = await compare(payload.password, user.password)

    if(!password){
        throw new AppError('Wrong email/password',401);
    }

    const token: string = sign(
        {email: user.email, admin: user.admin},
        process.env.SECRET_KEY!,
        {subject: user.id.toString(),expiresIn: process.env.EXPIRES_IN!}
    )

    return { token };
};

export default { create };