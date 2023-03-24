const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
// const LogRequest = require('@middlewares/log-request')

const { findAll } = require('@controllers/detail.controller')
// const { UpdateKamarSchema, CreateKamarSchema } = require('@validations/kamar.schema')

// const { LoggerMiddleware } = new LogRequest('avail_ROUTE')

Router
    .use(AuthGuard)
    // .post('/', CreateKamarSchema, create)
    // .patch('/:id', UpdateKamarSchema, update)
    .get('/', findAll)
    // .get('/:id', findById)
    // .delete('/:id', remove)

module.exports = { Router, route: '/detail' }