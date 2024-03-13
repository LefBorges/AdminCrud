import { Request, Response } from "express";
import { UserRetrive, UserReturn } from "../interfaces";
import userService from "../services/user.service";

const create = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await userService.create(req.body);
    return res.status(201).json(user)
};

const reatriveCourse = async (req: Request, res: Response): Promise<Response> => {
    const reatriveCourse = await userService.reatriveCourseUser(req.params.id);

    return res.status(200).json(reatriveCourse)
}

const retrive = async (req: Request, res: Response): Promise<Response> => {
   const {admin} = res.locals.decoded

   const users:UserRetrive = await userService.retrive(admin);

    return res.status(200).json(users)
};

export default {create, retrive, reatriveCourse}
