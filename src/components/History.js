import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RequireLogin from './RequireLogin';

const History = ({ loggedIn, handleLogout }) => { 
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loggedIn) {
      fetchTransactionHistory();
    }
  }, [loggedIn]);

  const fetchTransactionHistory = async () => {
    try {
      const response = await fetch(`http://localhost:8081/History?username=${loggedIn.username}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      const data = await response.json();
      setTransactionHistory(data.transactionHistory || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

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
          <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>
      <div className="transaction-history-box">
      <h1><b><i><u>Transaction</u></i></b> <b><i><u>History</u></i></b></h1>
      {loading ? (
        <p>Loading transaction history...</p>
      ) : (
        <ul>
          {transactionHistory.map((transaction, index) => (
            <li key={index}>
              Sender: {transaction.senderUsername}, Receiver Account Number: {transaction.receiverAccountNumber}, Amount: {transaction.amount}
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default History;
