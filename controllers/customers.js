const { Customer } = require('../models/customer');
const { HttpError, ctrlWrapper } = require('../utilits');

const getAllCustomers = async (req, res) => {
  const { query } = req.query;

  let customers;

  if (query) {
    customers = await Customer.find({
      name: { $regex: query, $options: 'i' },
    });
  } else {
    customers = await Customer.find();
  }

  res.json(customers);
};

const getCustomerById = async (req, res) => {
  const { _id } = req.params;

  const customer = await Customer.findById(_id);

  if (!customer) {
    throw HttpError(404, 'Customer not found');
  }

  res.json(customer);
};

const createCustomer = async (req, res) => {
  const { email } = req.body;

  const existingCustomer = await Customer.findOne({ email });

  if (existingCustomer) {
    throw HttpError(409, 'Customer with this email already exists');
  }

  const customer = await Customer.create(req.body);

  res.status(201).json(customer);
};

const updateCustomer = async (req, res) => {
  const { _id } = req.params;
  const { email } = req.body;

  const customer = await Customer.findById(_id);

  if (!customer) {
    throw HttpError(404, 'Customer not found');
  }

  if (email) {
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer && existingCustomer._id.toString() !== _id) {
      throw HttpError(409, 'Customer with this email already exists');
    }
  }

  const updatedCustomer = await Customer.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json(updatedCustomer);
};

const deleteCustomer = async (req, res) => {
  const { _id } = req.params;

  const deletedCustomer = await Customer.findByIdAndDelete(_id);

  if (!deletedCustomer) {
    throw HttpError(404, 'Customer not found');
  }

  res.json({ message: 'Customer deleted successfully' });
};

module.exports = {
  getAllCustomers: ctrlWrapper(getAllCustomers),
  getCustomerById: ctrlWrapper(getCustomerById),
  createCustomer: ctrlWrapper(createCustomer),
  updateCustomer: ctrlWrapper(updateCustomer),
  deleteCustomer: ctrlWrapper(deleteCustomer),
};
