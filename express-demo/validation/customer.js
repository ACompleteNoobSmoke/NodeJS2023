const Joi = require('joi');


const customerValidate = req => customerSchema.validate(req.body)


const customerSchema = Joi.object({
            name: Joi.string().min(3).required(),
            isGold: Joi.boolean().required(),
            phone: Joi.string().length(12)
});



module.exports = {
    customerValidate : customerValidate
}



