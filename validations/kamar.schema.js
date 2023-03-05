const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {
    nomor: Joi.number(),
    id_tipe: Joi.number(),
}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdateKamarSchema: ValidateSchema(UpdateSchema),
    CreateKamarSchema: ValidateSchema(CreateSchema)
}

