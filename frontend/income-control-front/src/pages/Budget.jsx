import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Overview from '../components/Overview';
import CreditCardTracker from '../components/CreditCardTracker';
import SavingsGoal from '../components/SavingsGoal';

const Budget = () => {
  const navigate = useNavigate();

  const storedUserRaw = localStorage.getItem('user');
  let userId = null;

  if (storedUserRaw) {
    try {
      const storedUser = JSON.parse(storedUserRaw);
      userId = storedUser?._id || null;
    } catch (err) {
      console.error('Failed to parse stored user:', err);
    }
  }

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  const [income, setIncome] = useState(0);
  const [cards, setCards] = useState([]);
  const [savings, setSavings] = useState([]);

  // Fetch budget on mount
  useEffect(() => {
    if (!userId) return;

    const fetchBudget = async () => {
      try {
        const res = await axios.get(`/api/budget/${userId}`);
        if (res.data) {
          setIncome(res.data.income || 0);
          setCards(res.data.cards || []);
          setSavings(Array.isArray(res.data.savings) ? res.data.savings : []);
        }
      } catch (err) {
        console.error('Failed to fetch budget:', err);
      }
    };

    fetchBudget();
  }, [userId]);

  const handleSaveBudget = async () => {
    try {
      await axios.post(`/api/budget/${userId}`, {
        income,
        cards,
        savings
      });
      alert('Budget saved successfully!');
    } catch (err) {
      console.error('Failed to save budget:', err);
      alert('Failed to save budget. Check console for details.');
    }
  };

  const handleIncomeSubmit = (amount) => {
    setIncome((prev) => prev + amount);
  };

  const handleIncomeAdjustment = (amount) => {
    setIncome((prev) => prev - amount);
  };

  const totalExpenses = cards.reduce((sum, card) => sum + (card.minPayment || 0), 0);
  const remaining = income - totalExpenses;

  if (!userId) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Overview
        income={income}
        expenses={totalExpenses}
        remaining={remaining}
        onIncomeSubmit={handleIncomeSubmit}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 bg-white p-4 shadow rounded">
          <CreditCardTracker cards={cards} onCardsUpdate={setCards} onIncomeAdjust={handleIncomeAdjustment} />
        </div>

        <div className="w-full lg:w-1/2 bg-white p-4 shadow rounded">
          <SavingsGoal savings={savings} onSavingsUpdate={setSavings} onIncomeAdjust={handleIncomeAdjustment}/>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleSaveBudget}
          className="bg-red-800 text-white font-bold py-2 px-6 rounded-md hover:bg-red-900 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Budget;
