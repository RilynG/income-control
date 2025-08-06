import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi'; // React Icons

const Overview = ({ income, expenses, remaining, onIncomeSubmit }) => {
  const [showInput, setShowInput] = useState(false);
  const [incomeInput, setIncomeInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(incomeInput);
    if (!isNaN(amount) && amount > 0) {
      onIncomeSubmit(amount);
      setIncomeInput('');
      setShowInput(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-center">Overview</h2>
        <button
          onClick={() => setShowInput(!showInput)}
          className="text-green-600 hover:text-green-800 text-2xl"
          title="Add Income"
        >
          <FiPlus />
        </button>
      </div>

      {showInput && (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
          <input
            type="number"
            placeholder="Enter income amount"
            className="flex-1 p-2 border rounded"
            value={incomeInput}
            onChange={(e) => setIncomeInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add
          </button>
        </form>
      )}

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1 bg-green-100 border-l-4 border-green-500 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold text-green-700">Total Balance</h3>
          <p className="text-xl font-bold text-green-900">${income.toFixed(2)}</p>
        </div>

        <div className="flex-1 bg-red-100 border-l-4 border-red-500 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold text-red-700">Expenses</h3>
          <p className="text-xl font-bold text-red-900">${expenses.toFixed(2)}</p>
        </div>

        <div className="flex-1 bg-blue-100 border-l-4 border-blue-500 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold text-blue-700">Remaining</h3>
          <p className="text-xl font-bold text-blue-900">${remaining.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
