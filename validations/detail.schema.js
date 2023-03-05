const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {
    id_paket: Joi.number(),
    qty: Joi.number().precision(3),
    total: Joi.number(),
    keterangan: Joi.string()
}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdateDetailSchema: ValidateSchema(UpdateSchema),
    CreateDetailSchema: ValidateSchema(CreateSchema)
}
