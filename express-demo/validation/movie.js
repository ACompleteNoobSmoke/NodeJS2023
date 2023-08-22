const Joi = require('joi');

const titleSchema = Joi.object({
    title: Joi.string().min(5).max(255).required(), 
})

const genreIDSchema = Joi.object({
    title: Joi.string().required(),
})

const numberInStockSchema = Joi.object({
    numberInStock: Joi.number().min(0).max(255).required(),
})

const dailyRentalRateSchema = Joi.object({
    dailyRentalRate: Joi.number().min(0).max(255).required()
})

const movieSchema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    genreID: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required()
})

const validate = (schema, req) => schema.validate(req.body);




module.exports = {
    movieSchema : movieSchema,
    titleSchema : titleSchema,
    genreIDSchema : genreIDSchema,
    numberInStockSchema : numberInStockSchema,
    dailyRentalRateSchema : dailyRentalRateSchema,
    movieValidate : validate
}