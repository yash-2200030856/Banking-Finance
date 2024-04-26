import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function LinkAccountNumber({ loggedIn, handleLogout }) {
  const [accountNumber, setAccountNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/linkBankAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountNumber, username: loggedIn.username }),
      });
      const data = await response.json();
      setMessage(data.message);
      console.log(data.message);
    } catch (error) {
      console.error('Error linking bank account:', error);
      setMessage('Error linking bank account. Please try again later.');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Account">Account</Link></li>
          <li><Link to="/Transactions">Transactions</Link></li>
          <li><Link to="/LinkAccountNumber">Link Account Number</Link></li>
          <li><Link to="/History">Transaction History</Link></li>
          <li><Link to="/PayBills">Pay Bills</Link></li>
          {loggedIn ? (
            <>
              <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Register</Link></li>
            </>
          )}
        </ul>
      </nav>

      <h2>Link Bank Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Account Number:
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </label>
        <button type="submit">Link Account</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LinkAccountNumber;

