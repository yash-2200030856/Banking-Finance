import React, { useState } from 'react';

const TransactionForm = ({ handleTransaction, senderUsername }) => {
  const [receiverAccountNumber, setReceiverAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [receiverUsername, setReceiverUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountValue = parseInt(amount, 10);
    handleTransaction(senderUsername, receiverAccountNumber, amountValue, receiverUsername);
  };

  return (
    <div>
      <h2>Payments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Receiver Bank Account Number"
          value={receiverAccountNumber}
          onChange={(e) => setReceiverAccountNumber(e.target.value)}
        />
        <input
          type="int"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
};

export default TransactionForm;
