import React from 'react';
import { Link } from 'react-router-dom';
import RequireLogin from './RequireLogin';
import TransactionForm from './TransactionForm';
import { Paper, Typography } from '@mui/material';
import LinkAccountNumber from './LinkAccountNumber';

const LinkBankAccountForm = ({ loggedIn, handleLogout }) => {
  
  return (
    <RequireLogin loggedIn={loggedIn}>
      <div className="App">
        <nav className="navbar">
        </nav>
        <header className="Transactions Page">
          <h1>Transactions Page</h1>
          <LinkAccountNumber loggedIn={loggedIn} />
        </header>
      </div>
    </RequireLogin>
  );
};

export default LinkBankAccountForm;
