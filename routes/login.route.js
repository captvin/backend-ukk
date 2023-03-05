const Router = require('express').Router()
// const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { login } = require('@controllers/login.controller')
// const { UpdateUserSchema, CreateUserSchema } = require('@validations/login.schema')

const { LoggerMiddleware } = new LogRequest('LOGIN_ROUTE')

Router
    // .use(LoggerMiddleware, AuthGuard)
    // .get('/', findAll)
    // .get('/:id', findById)
    // .post('/', CreateUserSchema, create)
    // .patch('/:id', UpdateUserSchema, update)
    // .delete('/:id', remove)
    .post('/', login)

module.exports = { Router, route: '/login' }