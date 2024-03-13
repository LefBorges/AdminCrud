import { z } from "zod";
import { courseSchema, createCourseSchema, retriveCourseSchema } from "../schemas";
import { QueryResult } from "pg";

type Course = z.infer<typeof courseSchema>;
type CourseCreate = z.infer<typeof createCourseSchema>;
type CourseRetrive = z.infer<typeof retriveCourseSchema>;
type CourseResult = QueryResult<Course>;

export { Course, CourseCreate, CourseRetrive, CourseResult };