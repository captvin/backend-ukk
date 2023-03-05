const { UnprocessableEntity } = require('http-errors')

function ValidateSchema(JoiObjectSchema) {
    return (req, res, next) => {
        const result = JoiObjectSchema.validate(req.body)
        if (result.error) {
            return next(UnprocessableEntity(result.error))
        }
        req.body = result.value
        next()
    }
}

module.exports = ValidateSchema