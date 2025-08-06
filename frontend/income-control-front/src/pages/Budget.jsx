import React, { useState, useEffect } from 'react';
import Overview from '../components/Overview';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreditCardTracker from '../components/CreditCardTracker';
import SavingsGoal from '../components/SavingsGoal';

const Budget = () => {
  const [income, setIncome] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load budget from backend on mount
  useEffect(() => {
    const fetchBudget = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to load your budget.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/budget', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to load budget');

        const data = await res.json();

        // Set income and cards from saved data (handle empty case)
        setIncome(data.income ?? 0);
        setCards(data.creditCards ?? []);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
  }, []);

  // Save budget to backend whenever income or cards change
  useEffect(() => {
    const saveBudget = async () => {
      const token = localStorage.getItem('token');
      if (!token) return; // skip if not logged in

      try {
        await fetch('http://localhost:5000/api/budget', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            income,
            creditCards: cards,
            bills: [],        // you can add bills if you have them
            savingsGoals: [], // pass savings goals too if you have them
          }),
        });
      } catch (err) {
        console.error('Failed to save budget:', err);
      }
    };

    // Save when income or cards change (debounce or throttle if needed)
    saveBudget();
  }, [income, cards]);

  const handleIncomeSubmit = (amount) => {
    setIncome((prevIncome) => prevIncome + amount);
  };

  const handleCardsUpdate = (updatedCards) => {
    setCards(updatedCards);
  };

  const totalExpenses = cards.reduce((sum, card) => sum + card.minPayment, 0);
  const remaining = income - totalExpenses;

  if (loading) return <div>Loading your budget...</div>;

  return (
    <div>
      <Header />

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {error && <div className="text-red-600 font-bold mb-4">{error}</div>}

        {/* Overview Module (full width) */}
        <Overview
          income={income}
          expenses={totalExpenses}
          remaining={remaining}
          onIncomeSubmit={handleIncomeSubmit}
        />

        {/* Below Overview: 2-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Credit Card Tracker */}
          <div className="w-full lg:w-1/2 bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2">Credit Card Tracker</h2>
            <CreditCardTracker onCardsUpdate={handleCardsUpdate} cards={cards} />
          </div>

          {/* Right Column: Savings Goal Tracker */}
          <div className="w-full lg:w-1/2 bg-white p-4 shadow rounded">
            <SavingsGoal />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Budget;
