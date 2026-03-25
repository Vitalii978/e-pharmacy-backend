const { Schema, model } = require('mongoose');

const dashboardSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    amount: {
      type: String,
      required: [true, 'Amount is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['Income', 'Expense', 'Error'],
      required: [true, 'Type is required'],
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Dashboard = model('dashboard', dashboardSchema);

module.exports = { Dashboard };
