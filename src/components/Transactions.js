import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RequireLogin from './RequireLogin';
import TransactionForm from './TransactionForm';
import { Paper, Typography } from '@mui/material';

const Transactions = ({ loggedIn, handleLogout }) => {
  const [History, setHistory] = useState({});
  const [loading, setLoading] = useState(true);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`http://localhost:8081/History?username=${loggedIn.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setHistory(data.userInfo);
      setTransactionHistory(data.transactionHistory || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching account information:', error);
    }
  };

  const handleTransaction = async (senderUsername, receiverAccountNumber, amount, receiverUsername) => {
    try {
      const response = await fetch('http://localhost:8081/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ senderUsername, receiverAccountNumber, amount, receiverUsername }),
      });
      const data = await response.json();
      console.log(data.message);
      fetchHistory();
    } catch (error) {
      console.error('Error performing transaction:', error);
    }
  };

  return (
    <RequireLogin loggedIn={loggedIn}>
      <div className="App">
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
        <header className="Transactions Page">
        
          <h1><u><b><i>Transactions</i></b></u> <u><b><i>Page</i></b></u></h1>
        
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <TransactionForm handleTransaction={handleTransaction} senderUsername={loggedIn.username} />
              <p>Current Balance: {History.balance}</p>
            </>
          )}
        </header>
        
      </div>
    </RequireLogin>
  );
};

export default Transactions;
