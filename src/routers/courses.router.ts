import { Router } from "express";
import courseControler from "../controllers/course.controler";
import middleware from "../middlewares";
import { createCourseSchema } from "../schemas";

const coursesRouter : Router = Router();

coursesRouter.post("", middleware.verifyToken, middleware.validateAdmin, middleware.validateBodyMiddleware(createCourseSchema), courseControler.create);
coursesRouter.post("/:courseId/users/:userId", middleware.verifyToken, middleware.verifyUserPermission, middleware.checkIdCurseOrUser, courseControler.addToCourse);
coursesRouter.get("", courseControler.reatriveAllCourses)
coursesRouter.get("/:courseId/users", middleware.verifyToken, middleware.validateAdmin, courseControler.reatriveAllUserEnrollatedCourse);
coursesRouter.delete("/:courseId/users/:userId", middleware.verifyToken, middleware.validateAdmin, middleware.checkIdCurseOrUser, courseControler.destroy);


export default coursesRouter;