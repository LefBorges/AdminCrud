import { z } from "zod";

const courseSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    description: z.string(),
});

const createCourseSchema = courseSchema.omit({id:true});
const retriveCourseSchema = courseSchema.array()

export { courseSchema, createCourseSchema, retriveCourseSchema };