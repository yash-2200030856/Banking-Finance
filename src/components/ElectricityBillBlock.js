import React, { useState } from 'react';

const ElectricityBillBlock = () => {
  const [consumerNumber, setConsumerNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    console.log('Electricity Bill Payment:', consumerNumber, 'Amount:', amount);
    setConsumerNumber('');
    setAmount('');
    setShowPaymentForm(false);
  };

  return (
    <div className="bill-block" onClick={() => setShowPaymentForm(true)}>
      <h2>Electricity Bill Payment</h2>
      {showPaymentForm && (
        <form onSubmit={handlePayment}>
          <input
            type="text"
            placeholder="Consumer Number"
            value={consumerNumber}
            onChange={(e) => setConsumerNumber(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="submit">Pay Now</button>
        </form>
      )}
    </div>
  );
};

export default ElectricityBillBlock;