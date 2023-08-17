const express = require('express');
const app = express.Router();
const customerService = require('../services/customer');
const schema = require('../validation/customer');
const {validate} = require('../validation/customer');


app.get('/', async (req, res) => {
    try {
        const allCustomers = await customerService.getAllCustomers();
        res.status(200).send(allCustomers);
    }catch(error){
        res.status(404).send(error.message);
    }
});

app.get('/:id', async (req, res) => {
    try {
        const customer = await customerService.getCustomerByID(req);
        res.status(200).send(customer);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/',  async (req, res)  => {
    try {
        const {error} = validate(schema.customerSchema, req);
        if (error) return res.status(400).send(error.details[0].message);
        const newCustomer = await customerService.saveCustomer(req);
        res.status(200).send(newCustomer);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = app;