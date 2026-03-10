// controllers/dashboard.js
// Собирает статистику для главной страницы

const { Customer } = require('../models/customer');
const { Product } = require('../models/product');
const { Supplier } = require('../models/supplier');
const { Dashboard } = require('../models/dashboard');
const { ctrlWrapper } = require('../utilits');

const getDashboardInfo = async (req, res) => {
  // 1. Получаем последних 5 клиентов (Recent customers)
  // .sort({ createdAt: -1 }) - сортируем по дате создания, от новых к старым
  // .limit(5) - берем только 5 записей
  const recentCustomers = await Customer.find()
    .sort({ createdAt: -1 })
    .limit(5);

  // 2. Получаем все доходы/расходы (Income/Expenses)
  const incomeExpenses = await Dashboard.find();

  // 3. Считаем количество всех клиентов
  const customersCount = await Customer.countDocuments();

  // 4. Считаем количество всех продуктов
  const productsCount = await Product.countDocuments();

  // 5. Считаем количество всех поставщиков
  const suppliersCount = await Supplier.countDocuments();

  // Отправляем всё одним объектом
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
