const jsonwebtoken = require('jsonwebtoken')
const {JWT_SECRET_KEY}= process.env

function tokenGenerator(payload) {
    return new Promise((resolve, reject) => {
        try {
            const token = jsonwebtoken.sign(payload, JWT_SECRET_KEY, { expiresIn: '3d' })
            resolve(token)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {tokenGenerator}