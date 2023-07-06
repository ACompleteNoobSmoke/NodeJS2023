const Joi = require('joi');


const foodSchema = Joi.object({
    item: Joi.string().min(3).required()
});

const inRangeValidation = (foodID, database) => foodID in database;


const foodValidation = (req) => foodSchema.validate(req.body);

module.exports = {
    foodValidation : foodValidation,
    inRangeValidation: inRangeValidation
}