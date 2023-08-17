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

app.put('/update/customer/:id', async (req, res) => {
    try {
        const {error} = validate(schema.customerSchema, req);
        if (error) return res.status(400).send(error.details[0].message);
        const updatedCustomer = await customerService.updateCustomer(req);
        res.status(200).send(updatedCustomer);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

app.put('/update/name/:id', async (req, res) => {
    try {
        const {error} = validate(schema.nameSchema, req);
        if (error) return res.status(400).send(error.details[0].message);
        const updatedCustomer = await customerService.updateName(req);
        res.status(200).send(updatedCustomer);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

app.put('/update/phone/:id', async (req, res) => {
    try {
        const {error} = validate(schema.phoneNumberSchema, req);
        if (error) return res.status(400).send(error.details[0].message);
        const updatedCustomer = await customerService.updatePhone(req);
        res.status(200).send(updatedCustomer);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

app.put('/update/isgold/:id', async (req, res) => {
    try {
        const {error} = validate(schema.isGoldSchema, req);
        if (error) return res.status(400).send(error.details[0].message);
        const updatedCustomer = await customerService.updateIsGold(req);
        res.status(200).send(updatedCustomer);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const customer = await customerService.deleteCustomerbyID(req);
        const {statusCode, message} = customer;
        res.status(statusCode).send(message);
    } catch(error) {
        res.status(400).send(error.message);
    }
})

module.exports = app;