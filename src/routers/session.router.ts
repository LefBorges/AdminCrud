import { Router } from "express";
import middlewares from "../middlewares";
import { sessionCreate } from "../schemas";
import sessionControler from "../controllers/session.controler";

const sessionRouter: Router = Router();

sessionRouter.post("", middlewares.validateBodyMiddleware(sessionCreate),sessionControler.create);

export default sessionRouter;