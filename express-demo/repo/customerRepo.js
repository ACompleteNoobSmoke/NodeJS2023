const Customer = require('../model/customer');


//Get Methods
const allCustomers = async () => await Customer.find();
const getCustomerbyID = async (id) => await Customer.findById(id);
const getCustomerbyName = async (customerName) => await Customer.find({name: customerName});

//Save Methods
const saveCustomer = async (newCustomer) => {
    const customer = new Customer(newCustomer);
    const result = await customer.save();
    return result;
}

//Exist Methods
const ifCustomerExistsID = async (id) => await Customer.find({_id: id}).count();
const ifCustomerExistsName = async (customerName) => await Customer.find({name: customerName}).count();

//Update Methods
const updateCustomer = async (id, updateObject) => await Customer.findByIdAndUpdate(id, updateObject, {new: true});

//Delete Method
const deleteCustomerbyID = async (id) => await Customer.findByIdAndDelete(id);
const deleteCustomerbyName = async (customerName) => await Customer.findOneAndDelete({name: customerName});

module.exports = {
    allCustomers: allCustomers,
    getCustomerbyID : getCustomerbyID,
    getCustomerbyName : getCustomerbyName,
    saveCustomer : saveCustomer,
    ifCustomerExistsID : ifCustomerExistsID,
    ifCustomerExistsName : ifCustomerExistsName,
    updateCustomer : updateCustomer,
    deleteCustomerbyID : deleteCustomerbyID,
    deleteCustomerbyName : deleteCustomerbyName
}


