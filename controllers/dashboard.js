const { Customer } = require('../models/customer');
const { Product } = require('../models/product');
const { Supplier } = require('../models/supplier');
const { Dashboard } = require('../models/dashboard');
const { ctrlWrapper } = require('../utilits');

const getDashboardInfo = async (req, res) => {
  const recentCustomers = await Customer.find()
    .sort({ createdAt: -1 })
    .limit(5);

  const incomeExpenses = await Dashboard.find();

  const customersCount = await Customer.countDocuments();

  const productsCount = await Product.countDocuments();

  const suppliersCount = await Supplier.countDocuments();

  res.json({
    customers: recentCustomers,
    dashboard: incomeExpenses,
    customersCount,
    productsCount,
    suppliersCount,
  });
};

module.exports = {
  getDashboardInfo: ctrlWrapper(getDashboardInfo),
};
