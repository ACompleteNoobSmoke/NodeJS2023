const CustomerRepo = require('../repo/customerRepo');


const getAllCustomers = async () => await CustomerRepo.allCustomers();

const getCustomerByID = async (req) => {
    const id = req.params.id;
    return await CustomerRepo.getCustomerbyID(id)
};

const getCustomerByName = async (req) => {
    const {name} = req.body;
    return await CustomerRepo.getCustomerbyName(name);
} 
const saveCustomer = async (req) => {
    const {name, phone, isGold} = req.body;
    const exists = await ifCustomerExistsName(name);
    if (exists) return 'Customer Already Exists In Database';
    const customerObject = {
        name: name,
        phone: phone,
        isGold: isGold
    }
    return await CustomerRepo.saveCustomer(customerObject);
}

const updateCustomer = async (req) => {
    
}

const ifCustomerExistsID = async (id) => await CustomerRepo.ifCustomerExistsID(id);

const ifCustomerExistsName = async (name) => {
    const count = await CustomerRepo.ifCustomerExistsName(name);
    return count > 0
}

module.exports = {
    getAllCustomers : getAllCustomers,
    getCustomerByID : getCustomerByID,
    getCustomerByName : getCustomerByName,
    saveCustomer : saveCustomer
}