import { Router } from "express";
import middlewares from "../middlewares";
import { createUserSchema } from "../schemas";
import { userControler } from "../controllers";

const userRouter : Router = Router();

userRouter.post("", middlewares.validateBodyMiddleware(createUserSchema), middlewares.validateEmailExist, userControler.create)

userRouter.get("", middlewares.verifyToken, userControler.retrive)

userRouter.get("/:id/courses", middlewares.verifyToken, middlewares.verifyUserPermission, middlewares.validadeUserIdExisty, userControler.reatriveCourse)

export default userRouter;