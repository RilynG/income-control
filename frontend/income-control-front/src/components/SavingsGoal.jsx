import React, { useState } from 'react';

const circleRadius = 50;
const circleCircumference = 2 * Math.PI * circleRadius;

const SavingsGoal = () => {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [savedGoals, setSavedGoals] = useState([]);

  const handleCreateGoal = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(goalAmount);
    if (!goalName || isNaN(parsedAmount)) return;

    const newGoal = {
      id: Date.now(),
      name: goalName,
      target: parsedAmount,
      current: 0,
    };

    setSavedGoals([...savedGoals, newGoal]);
    setGoalName('');
    setGoalAmount('');
  };

  const handleAddToGoal = (goalId, amount) => {
    setSavedGoals(prev =>
      prev.map(goal =>
        goal.id === goalId
          ? { ...goal, current: Math.min(goal.current + amount, goal.target) }
          : goal
      )
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Savings Goals</h2>

      <form onSubmit={handleCreateGoal} className="mb-6 flex gap-2">
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

      {savedGoals.map((goal) => {
        const progressPercent = Math.min((goal.current / goal.target) * 100, 100);
        const strokeDashoffset = circleCircumference * (1 - progressPercent / 100);

        return (
          <div key={goal.id} className="mb-6 p-4 border rounded shadow flex items-center gap-6">
            {/* Circular Progress */}
            <svg
              width={120}
              height={120}
              viewBox="0 0 120 120"
              className="flex-shrink-0"
            >
              <circle
                cx="60"
                cy="60"
                r={circleRadius}
                stroke="#e5e7eb" // Tailwind gray-200
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r={circleRadius}
                stroke="#22c55e" // Tailwind green-500
                strokeWidth="10"
                fill="none"
                strokeDasharray={circleCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
              <text
                x="60"
                y="65"
                textAnchor="middle"
                fontSize="20"
                fill="#16a34a" // Tailwind green-600
                fontWeight="bold"
              >
                {Math.round(progressPercent)}%
              </text>
            </svg>

            {/* Goal Info */}
            <div className="flex-grow">
              <h3 className="text-lg font-bold mb-1">{goal.name}</h3>
              <p className="mb-2">
                Saved: ${goal.current.toFixed(2)} / ${goal.target.toFixed(2)}
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SavingsGoal;
