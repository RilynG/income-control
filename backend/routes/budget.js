import express from 'express';
import jwt from 'jsonwebtoken';
import Budget from '../models/Budget.js';

const router = express.Router();

// Middleware to authenticate user via JWT
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

// Get budget for logged-in user
router.get('/budget', authenticate, async (req, res) => {
  try {
    const budget = await Budget.findOne({ userId: req.user.id });
    if (!budget) return res.status(404).json({ message: 'No budget found' });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Save or update budget for logged-in user
router.post('/budget', authenticate, async (req, res) => {
  try {
    const { income, bills, creditCards, savingsGoals } = req.body;

    let budget = await Budget.findOne({ userId: req.user.id });

    if (budget) {
      // Update existing budget
      budget.income = income;
      budget.bills = bills;
      budget.creditCards = creditCards;
      budget.savingsGoals = savingsGoals;
      await budget.save();
      return res.json({ message: 'Budget updated' });
    }

    // Create new budget document
    budget = new Budget({
      userId: req.user.id,
      income,
      bills,
      creditCards,
      savingsGoals,
    });
    await budget.save();
    res.status(201).json({ message: 'Budget saved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
