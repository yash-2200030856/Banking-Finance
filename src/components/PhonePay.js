import React, { useState } from 'react';

const PhonePay = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleRecharge = (e) => {
    e.preventDefault();
    console.log('Phone Recharge:', phoneNumber, 'Amount:', amount);
    setPhoneNumber('');
    setAmount('');
    setShowPaymentForm(false);
  };

  return (
    <div className="bill-block" onClick={() => setShowPaymentForm(true)}>
      <h2>Phone Recharge</h2>
      {showPaymentForm && (
        <form onSubmit={handleRecharge}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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

export default PhonePay;
