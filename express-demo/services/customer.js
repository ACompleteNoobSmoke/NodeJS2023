const CustomerRepo = require('../repo/customerRepo');


const getAllCustomers = async () => await CustomerRepo.allCustomers();

const getCustomerByID = async (req) => {
    const id = req.params.id;
    return await CustomerRepo.getCustomerbyID(id)
};

const getCustomerByName = async (req) => {
    const {name} = req.body;
    return await CustomerRepo.getCustomerbyName(name);
};

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
};

const updateCustomer = async (req) => {
    const id = req.params.id;
    const {name, phone, isGold} = req.body;
    return await CustomerRepo.updateCustomer(id, {
        name: name, 
        phone: phone, 
        isGold: isGold
    });
}

const updateName = async (req) => {
    const id = req.params.id;
    const name = req.body.name;
    return await CustomerRepo.updateCustomer(id, {name: name});
}

const updateIsGold = async (req) => {
    const id = req.params.id;
    const isGold = req.body.isGold;
    return await CustomerRepo.updateCustomer(id, {isGold: isGold});
}

const updatePhone = async (req) => {
    const id = req.params.id;
    const phone = req.body.phone;
    return await CustomerRepo.updateCustomer(id, {phone: phone});
}

const deleteCustomerbyID = async (req) => {
    const id = req.params.id;
    const exists = await ifCustomerExistsID(id);
    if (!exists || exists <= 0) return {statusCode: 404, message: 'ID Does Not Exist'};
    const customer = await CustomerRepo.deleteCustomerbyID(id);
    return {statusCode: 200, message: customer};
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
    saveCustomer : saveCustomer,
    updateName : updateName,
    updateIsGold : updateIsGold,
    updatePhone : updatePhone,
    updateCustomer : updateCustomer,
    deleteCustomerbyID : deleteCustomerbyID
}