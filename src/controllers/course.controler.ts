import { Request, Response } from "express";
import coursesServices from "../services/courses.services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const course = await coursesServices.create(req.body)
    return res.status(201).json(course)
}

const addToCourse = async (req: Request, res: Response): Promise<Response> => {
    const { courseId, userId } = req.params;

    const addToCourse = await coursesServices.adduserCourse(userId, courseId)

    return res.status(201).json(addToCourse)
}

const reatriveAllCourses = async (req: Request, res: Response): Promise<Response> => {
    const courses = await coursesServices.reatriveAllCourses()

    return res.status(200).json(courses)
}

const reatriveAllUserEnrollatedCourse = async (req: Request, res: Response): Promise<Response> => {
    const userEnrollted = await coursesServices.retriveAllUserCourse(
        req.params.courseId
    );

    return res.status(200).json(userEnrollted)
}

const destroy = async (req: Request, res: Response): Promise<Response> => {
    const {courseId, userId} = req.params;

    await coursesServices.destroy(courseId, userId)
    return res.status(204).json()
}

export default {create, addToCourse, reatriveAllCourses, reatriveAllUserEnrollatedCourse, destroy}