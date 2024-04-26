import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RequireLogin from './RequireLogin';
import { Paper, Typography } from '@mui/material';

function Account({ loggedIn, handleLogout }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
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
      setUserInfo(data.userInfo);
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  };

  return (
    <RequireLogin loggedIn={loggedIn}>
      <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Account">Account</Link></li>
            <li><Link to="/Transactions">Transactions</Link></li>
            <li><Link to="/LinkAccountNumber">Link Account Number</Link></li>
            <li><Link to="/History">Transaction History</Link></li>
            <li><Link to="/PayBills">Pay Bills</Link></li>
            {loggedIn ? (
              <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
            {!loggedIn && <li><Link to="/signup">Register</Link></li>}
          </ul>
        </nav>
        <header className="Account Page">
          <Typography variant="h5" component="h2"><b>Accounts Page</b></Typography>
          {userInfo && (
            <div>
              <Typography variant="body1">Username: {userInfo.username}</Typography>
              <Typography variant="body1">Email: {userInfo.email}</Typography>
              <Typography variant="body1">Phone Number: {userInfo.phoneNumber}</Typography>
              <Typography variant="body1">Date of Birth: {userInfo.dateOfBirth}</Typography>
              <Typography variant="body1">Account Number: {userInfo.accountNumber}</Typography>
              <Typography variant="body1">Balance: {userInfo.balance}</Typography>
            </div>
          )}
        </header>
      </Paper>
    </RequireLogin>
  );
}

export default Account;
