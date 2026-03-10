// models/dashboard.js
// Модель для доходов и расходов (Income/Expenses)

const { Schema, model } = require('mongoose');

const dashboardSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    amount: {
      type: String,
      required: [true, 'Amount is required'],
    },
    type: {
      type: String,
      enum: ['Income', 'Expense', 'Error'], // только эти три значения
      required: [true, 'Type is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Dashboard = model('dashboard', dashboardSchema);

module.exports = { Dashboard };
