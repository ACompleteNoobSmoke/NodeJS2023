const Joi = require('joi');

const validate = (schema, req) => schema.validate(req.body);


const customerSchema = Joi.object({
            name: Joi.string().min(3).required(),
            isGold: Joi.boolean().required(),
            phone: Joi.string().length(12)
});


const nameSchema = Joi.object({
    name: Joi.string().min(3).required()
})

const phoneNumberSchema = Joi.object({
    phone: Joi.string().length(12)
})

const isGoldSchema = Joi.object({
    isGold: Joi.boolean().required
});



module.exports = {
    customerSchema : customerSchema,
    nameSchema : nameSchema,
    phoneNumberSchema : phoneNumberSchema,
    isGoldSchema : isGoldSchema,
    validate : validate
}



