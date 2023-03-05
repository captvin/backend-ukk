const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {
    nama_tipe: Joi.string(),
    harga: Joi.number(),
    deskripsi: Joi.string()
    // image:  Joi.alternatives()
}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdateTipeSchema: ValidateSchema(UpdateSchema),
    CreateTipeSchema: ValidateSchema(CreateSchema)
}

