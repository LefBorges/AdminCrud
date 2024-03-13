import "express-async-errors"
import express, { Application, json } from 'express'
import usersRouter from './routers/users.router'
import coursesRouter from './routers/courses.router'
import sessionRouter from './routers/session.router'
import { handlerError } from "./errors/handleError.error";

const app: Application = express()

app.use(json())

app.use('/users', usersRouter)

app.use('/login', sessionRouter)

app.use('/courses', coursesRouter)

app.use(handlerError)

export default app
