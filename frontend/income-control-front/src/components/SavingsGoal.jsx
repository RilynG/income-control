import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { FiPlus, FiX } from 'react-icons/fi';

const circleRadius = 50;
const circleCircumference = 2 * Math.PI * circleRadius;

const SavingsGoal = ({ savings, onSavingsUpdate, onIncomeAdjust }) => {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleCreateGoal = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(goalAmount);
    if (!goalName.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Enter a valid goal name and amount.');
      return;
    }

    const newGoal = {
      id: nanoid(),
      goalName: goalName.trim(),
      goalAmount: parsedAmount,
      currentSaved: 0,
    };

    onSavingsUpdate([...savings, newGoal]);
    setGoalName('');
    setGoalAmount('');
    setShowAddForm(false);
  };

  const handleAddToGoal = (goalId, amount) => {
    if (onIncomeAdjust) {
      onIncomeAdjust(amount);
    }

    onSavingsUpdate(
      savings.map((goal) =>
        goal.id === goalId
          ? { ...goal, currentSaved: Math.min(goal.currentSaved + amount, goal.goalAmount) }
          : goal
      )
    );
  };

  const handleDeleteGoal = (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      onSavingsUpdate(savings.filter((goal) => goal.id !== goalId));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Savings Goals</h2>
        <button
          onClick={() => setShowAddForm((prev) => !prev)}
          className="text-red-600 hover:text-red-800 transition text-2xl"
        >
          {showAddForm ? <FiX /> : <FiPlus />}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreateGoal} className="mb-4 flex gap-2">
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="Goal Name"
            className="border p-2 rounded flex-grow"
          />
          <input
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            placeholder="Amount"
            className="border p-2 rounded w-28"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 rounded"
          >
            Create
          </button>
        </form>
      )}

      {savings.length === 0 ? (
        <p className="text-gray-500 italic">No savings goals added yet.</p>
      ) : (
        savings.map((goal) => {
          const progressPercent = Math.min((goal.currentSaved / goal.goalAmount) * 100, 100);
          const strokeDashoffset = circleCircumference * (1 - progressPercent / 100);

          return (
            <div key={goal.id} className="p-4 bg-white rounded shadow">
              <div className="flex items-center gap-6">
                {/* Progress Circle */}
                <svg width={80} height={80} viewBox="0 0 120 120" className="flex-shrink-0">
                  <circle
                    cx="60" cy="60" r={circleRadius}
                    stroke="#e5e7eb" strokeWidth="10" fill="none"
                  />
                  <circle
                    cx="60" cy="60" r={circleRadius}
                    stroke="#22c55e" strokeWidth="10" fill="none"
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                  <text
                    x="60" y="65" textAnchor="middle"
                    fontSize="16" fill="#16a34a" fontWeight="bold"
                  >
                    {Math.round(progressPercent)}%
                  </text>
                </svg>

                {/* Goal Info */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold mb-1">{goal.goalName}</h3>
                  <p className="mb-2">
                    Saved: ${goal.currentSaved.toFixed(2)} / ${goal.goalAmount.toFixed(2)}
                  </p>
                  <input
                    type="number"
                    placeholder="Add amount"
                    className="border p-2 rounded w-full"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const amount = parseFloat(e.target.value);
                        if (!isNaN(amount) && amount > 0) {
                          handleAddToGoal(goal.id, amount);
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="mt-2 text-red-500 hover:underline"
                  >
                    Delete Goal
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SavingsGoal;
