import { z } from "zod";

const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50),
    email: z.string().email().max(50).nonempty(),
    password: z.string().min(4).max(120),
    admin: z.boolean().default(false),
});

const createUserSchema = userSchema.omit({id:true})

const returnUserSchema = userSchema.omit({password:true})

const retriveUserSchema = returnUserSchema.array()

export { userSchema, createUserSchema, returnUserSchema, retriveUserSchema};