import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  income: { type: Number, default: 0 },
  bills: [
    {
      name: String,
      amount: Number,
    },
  ],
  creditCards: [
    {
      name: String,
      balance: Number,
      minPayment: Number,
      interestRate: Number,
      dueDate: Number,
    },
  ],
  savingsGoals: [
    {
      name: String,
      targetAmount: Number,
      currentAmount: Number,
    },
  ],
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
