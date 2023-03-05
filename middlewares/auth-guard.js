const jwt = require('jsonwebtoken')
const Abilities = require('@utils/ability')
const { Forbidden, Unauthorized } = require('http-errors')
const { ErrorHandler } = require('@middlewares/error-handler')

require('dotenv').config()
var { JWT_SECRET_KEY } = process.env

module.exports = function (req, res, next) {
    var token = req.headers.authorization
    if (token == undefined || null) {
        // ErrorHandler(Unauthorized(), req, res)
        const user = {
            id: 0 ,
            role: "guest"
        }
        const abilities = Abilities(user.id, user.role)
        req.user = {
            ...user,
            abilities
        }
        next()
    }
    else {
        token = token.slice(7)
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if (error) {
                ErrorHandler(Forbidden(), req, res)
            } else {
                const user = payload
                
                const abilities = Abilities(user.id, user.role)
                req.user = {
                    ...user,
                    abilities
                }
                next()
            }
        })
    }
}