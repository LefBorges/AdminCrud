import { z } from "zod";
import  {userSchema, createUserSchema, returnUserSchema, retriveUserSchema}  from "../schemas/user.schemas";
import { QueryResult } from "pg";

type User = z.infer<typeof userSchema>;
type UserCreate = z.infer<typeof createUserSchema>;
type UserRetrive = z.infer<typeof retriveUserSchema>;
type UserResult = QueryResult<User>;
type UserReturn = z.infer<typeof returnUserSchema>;

export { User, UserCreate, UserRetrive, UserResult, UserReturn };