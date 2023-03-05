const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, create, update, remove } = require('@controllers/kamar.controller')
const { UpdateKamarSchema, CreateKamarSchema } = require('@validations/kamar.schema')

const { LoggerMiddleware } = new LogRequest('KAMAR_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .post('/', CreateKamarSchema, create)
    .patch('/:id', UpdateKamarSchema, update)
    .get('/', findAll)
    .get('/:id', findById)
    .delete('/:id', remove)

module.exports = { Router, route: '/kamar' }