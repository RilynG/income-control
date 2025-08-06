import React, { useState } from 'react';

const Income = ({ onIncomeSubmit }) => {
  const [income, setIncome] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedIncome = parseFloat(income);

    if (!isNaN(parsedIncome)) {
      onIncomeSubmit(parsedIncome);
      setIncome('');
    } else {
      alert('Please enter a valid number.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <label className="block text-gray-700 font-semibold mb-2">Enter your income:</label>
      <input
        type="number"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="e.g. 5000"
      />
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Save Income
      </button>
    </form>
  );
};

export default Income;
