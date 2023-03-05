const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {
    password: {
        password: Joi.string().min(8).message("Password should contains minimum of 8 characters")
    },
    
    user:{
        nama: Joi.string(),
        // image: Joi.string(),
        email: Joi.string(),
        username: Joi.string(),
        role: Joi.string().valid('admin','resepsionis')
    }
    

}

const mergedSchema = {...schema.user, ...schema.password}
const UpdateSchema = Joi.object(schema.user)
const CreateSchema = Joi.object(mergedSchema).fork(Object.keys(mergedSchema), field => field.required())
const ChangePassSchema = Joi.object(schema.password).fork(['password'], field => field.required())

module.exports = {
    UpdateUserSchema: ValidateSchema(UpdateSchema),
    CreateUserSchema: ValidateSchema(CreateSchema),
    ChangePassSchema: ValidateSchema(ChangePassSchema)
}