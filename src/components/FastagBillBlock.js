import React, { useState } from 'react';

const FastagBillBlock = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    console.log('Fastag Bill Payment:', vehicleNumber, 'Amount:', amount);
    setVehicleNumber('');
    setAmount('');
    setShowPaymentForm(false);
  };

  return (
    <div className="bill-block" onClick={() => setShowPaymentForm(true)}>
      <h2>Fastag Bill Payment</h2>
      {showPaymentForm && (
        <form onSubmit={handlePayment}>
          <input
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
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

export default FastagBillBlock;