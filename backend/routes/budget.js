import express from 'express';
import Budget from '../models/Budget.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const budget = await Budget.findOne({ userId: req.params.userId });
    res.json(budget);
  } catch (err) {
    console.error('GET Budget Error:', err);
    res.status(500).json({ message: 'Server Error fetching budget' });
  }
});

router.post('/:userId', async (req, res) => {
  const { income, cards, savings } = req.body;
  try {
    let budget = await Budget.findOne({ userId: req.params.userId });

    if (budget) {
      budget.income = income;
      budget.cards = cards;
      budget.savings = savings;
    } else {
      budget = new Budget({
        userId: req.params.userId,
        income,
        cards,
        savings,
      });
    }

    await budget.save();
    res.json(budget);
  } catch (err) {
    console.error('POST Budget Save Error:', err);
    res.status(500).json({ message: 'Server Error saving budget' });
  }
});

export default router;
