import mongoose from 'mongoose';

const paymentHistorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String }, // 'Interest' or 'Payment'
}, { _id: false });

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  minPayment: { type: Number, required: true },
  apr: { type: Number, required: true },
  dueDate: { type: Number, required: true },
  lastInterestApplied: { type: String, default: null },
  paymentHistory: { type: [paymentHistorySchema], default: [] },
}, { _id: false });

// 🔥 Make Savings an ARRAY of goals
const savingsGoalSchema = new mongoose.Schema({
  id: { type: String, required: true },
  goalName: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  currentSaved: { type: Number, required: true },
}, { _id: false });

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  income: { type: Number, required: true },
  cards: { type: [cardSchema], default: [] },
  savings: { type: [savingsGoalSchema], default: [] },  // <-- ARRAY now!
}, { timestamps: true });

export default mongoose.model('Budget', budgetSchema);
