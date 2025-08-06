import React, { useState, useEffect } from 'react';
import { FiPlus, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const CreditCardTracker = ({ onCardsUpdate }) => {
  const [cards, setCards] = useState([]);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [form, setForm] = useState({
    name: '',
    balance: '',
    minPayment: '',
    interestRate: '',
    dueDate: '',
  });
  const [paymentInputs, setPaymentInputs] = useState({});

  useEffect(() => {
    onCardsUpdate(cards);
  }, [cards, onCardsUpdate]);

  const handleAddCard = (e) => {
    e.preventDefault();
    const newCard = {
      id: Date.now(),
      name: form.name.trim(),
      balance: parseFloat(form.balance),
      minPayment: parseFloat(form.minPayment),
      interestRate: (parseFloat(form.interestRate) / 100) / 12,
      dueDate: parseInt(form.dueDate, 10),
      lastInterestApplied: null,
      paymentHistory: [],
    };

    if (
      !newCard.name ||
      isNaN(newCard.balance) ||
      isNaN(newCard.minPayment) ||
      isNaN(newCard.interestRate) ||
      isNaN(newCard.dueDate) ||
      newCard.dueDate < 1 ||
      newCard.dueDate > 31
    ) {
      alert('Please fill all fields with valid numbers (due date between 1-31)');
      return;
    }

    setCards((prev) => [...prev, newCard]);
    setForm({
      name: '',
      balance: '',
      minPayment: '',
      interestRate: '',
      dueDate: '',
    });
    setShowAddCardForm(false);
  };

  const handlePayment = (cardId, amount) => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          const paymentAmount = Math.min(amount, card.balance);
          const newBalance = card.balance - paymentAmount;
          const newPaymentHistory = [
            ...card.paymentHistory,
            { date: new Date().toISOString(), amount: paymentAmount },
          ];
          return { ...card, balance: newBalance, paymentHistory: newPaymentHistory };
        }
        return card;
      })
    );
    setPaymentInputs((prev) => ({ ...prev, [cardId]: '' }));
  };

  const applyInterestIfDue = () => {
    const now = new Date();
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (!card.dueDate) return card;

        const today = now.getDate();
        const dueDate = card.dueDate;
        const lastApplied = card.lastInterestApplied ? new Date(card.lastInterestApplied) : null;

        if (
          today >= dueDate &&
          (
            !lastApplied ||
            lastApplied.getFullYear() !== now.getFullYear() ||
            lastApplied.getMonth() !== now.getMonth()
          )
        ) {
          const interestAmount = card.balance * card.interestRate;
          const newBalance = card.balance + interestAmount;
          return {
            ...card,
            balance: newBalance,
            lastInterestApplied: now.toISOString(),
          };
        }
        return card;
      })
    );
    alert('Interest applied where due!');
  };

  const toggleCardExpanded = (cardId) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6 relative">
      <h2 className="text-lg font-bold mb-4 flex justify-between items-center">
        Credit Card Tracker

        <button
          onClick={() => setShowAddCardForm((show) => !show)}
          aria-label={showAddCardForm ? 'Hide Add Card Form' : 'Show Add Card Form'}
          className="text-red-600 hover:text-red-800 transition text-2xl focus:outline-none"
          title={showAddCardForm ? 'Hide Add Card Form' : 'Show Add Card Form'}
        >
          {showAddCardForm ? <FiX /> : <FiPlus />}
        </button>
      </h2>

      {showAddCardForm && (
        <form onSubmit={handleAddCard} className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Card Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Balance"
            value={form.balance}
            onChange={(e) => setForm({ ...form, balance: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Min Payment"
            value={form.minPayment}
            onChange={(e) => setForm({ ...form, minPayment: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Interest Rate (%)"
            value={form.interestRate}
            onChange={(e) => setForm({ ...form, interestRate: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            min="1"
            max="31"
            placeholder="Due Date (day)"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-red-600 text-white rounded px-4 py-2 md:col-span-5 hover:bg-red-700 transition"
          >
            Add Card
          </button>
        </form>
      )}

      {cards.length === 0 && <p>No credit cards added yet.</p>}

      <ul>
        {cards.map((card) => {
          const isExpanded = expandedCards.has(card.id);
          return (
            <li
              key={card.id}
              className="border p-5 mb-6 rounded-lg shadow-sm select-none bg-white"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleCardExpanded(card.id)}
                aria-expanded={isExpanded}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleCardExpanded(card.id);
                  }
                }}
              >
                {/* Card name on top */}
                <h3 className="font-bold text-xl">{card.name}</h3>

                {/* Chevron */}
                <div className="text-red-600 text-2xl ml-4">
                  {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                </div>
              </div>

              {/* Info grid below name */}
              <div className="grid grid-cols-3 gap-x-8 text-center text-gray-700 mt-3 select-text">
                <div>
                  <div className="font-semibold mb-1">Balance</div>
                  <div>${card.balance.toFixed(2)}</div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Min Payment</div>
                  <div>${card.minPayment.toFixed(2)}</div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Due Date</div>
                  <div>Day {card.dueDate} of each month</div>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-5 border-t pt-4 text-gray-700 select-text">
                  <p>
                    <strong>Interest Rate (monthly):</strong>{' '}
                    {(card.interestRate * 100).toFixed(2)}%
                  </p>
                  <p>
                    <strong>Last Interest Applied:</strong>{' '}
                    {card.lastInterestApplied
                      ? new Date(card.lastInterestApplied).toLocaleDateString()
                      : 'Never'}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handlePayment(card.id, card.minPayment)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                    >
                      Made Min Payment
                    </button>

                    <input
                      type="number"
                      step="0.01"
                      placeholder="Custom Payment"
                      value={paymentInputs[card.id] || ''}
                      onChange={(e) =>
                        setPaymentInputs((prev) => ({
                          ...prev,
                          [card.id]: e.target.value,
                        }))
                      }
                      className="border p-2 rounded w-36"
                    />
                    <button
                      onClick={() => {
                        const val = parseFloat(paymentInputs[card.id]);
                        if (!isNaN(val) && val > 0) handlePayment(card.id, val);
                        else alert('Enter a valid custom payment amount.');
                      }}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Pay Custom Amount
                    </button>
                  </div>

                  {card.paymentHistory.length > 0 && (
                    <details className="mt-5">
                      <summary className="cursor-pointer font-semibold">Payment History</summary>
                      <ul className="text-sm mt-2 max-h-40 overflow-auto">
                        {card.paymentHistory.map((payment, i) => (
                          <li key={i}>
                            {new Date(payment.date).toLocaleDateString()} - $
                            {payment.amount.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <button
        onClick={applyInterestIfDue}
        className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
      >
        Apply Monthly Interest to All Cards (if due)
      </button>
    </div>
  );
};

export default CreditCardTracker;
