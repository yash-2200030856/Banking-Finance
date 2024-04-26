import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from './logo.png';

function Home({ loggedIn, handleLogout }) {
  const [showDescription, setShowDescription] = useState(false);
  const history = useHistory();

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const redirectToLogin = () => {
    history.push('/login');
  };

  return (
    <div className="App">
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
      <header className="Home Page">
        <div className="logo-container" onClick={redirectToLogin} onMouseEnter={() => setShowDescription(true)} onMouseLeave={() => setShowDescription(false)}>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="description-container">
          {showDescription && (
            <><p><i>This bank belongs to Yashwanth, Leela, bharath.</i></p><p><i>They are the founders of the YLB bank.</i></p></> 
          )}
        </div>
        <h1><b><i>YOUR LEGACY BANK</i></b></h1>
        <ul>
        {loggedIn ? (
            <>
              <li>Welcome {loggedIn.username}</li>
            </>
          ) : (
            <>
            </>
          )}
        </ul>
      </header>
    </div>
  );
}

export default Home;