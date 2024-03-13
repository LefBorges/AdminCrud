import errorHandlerMiddleware from "./errorHandler.middlewares"
import validateBodyMiddleware from "./validateBody.middleware"
import validateEmailExist from "./validateEmailExist.middleware"
import verifyToken from "./validateToken.middleware"
import verifyUserPermission from "./verifyUserPermission.middleware"
import validadeUserIdExisty from "./validadeUserIdExisty.middleware"
import validateCurseIdExist from "./validadeIdCurseExist.middleware"
import validateAdmin from "./validadeAdmin.middleware"
import validateIdBodyExist from "./validadeIdBody.middleware"
import checkIdCurseOrUser from "./checkIdCurseOrUser.middlware"

export default { verifyToken, checkIdCurseOrUser, errorHandlerMiddleware, validateBodyMiddleware, validateEmailExist ,verifyUserPermission, validadeUserIdExisty, validateCurseIdExist, validateAdmin, validateIdBodyExist }