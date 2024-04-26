import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './popup.css';

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful');
        setLoggedIn({ username });
        history.push('/home');
      } else {
        setPopupMessage('Invalid username or password');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setPopupMessage('An error occurred during login. Please try again later.');
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleOkButtonClick = () => {
    setShowPopup(false);
    history.push('/signup');
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Register</Link></li>
        </ul>
      </nav>
      <div className="Login-page1">
      <div className="login-page">
        <div className="login-container">
        <h1>Enter Details to Login</h1>
          <div className="form-group">
            <label htmlFor="username"><b>Username:</b></label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password"><b>Password:</b></label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleLogin} className="login-btn">Login</button>
        </div>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <span className="popup-close" onClick={handlePopupClose}>X</span>
              <p>{popupMessage}</p>
              <button onClick={handleOkButtonClick}>OK</button>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default Login;
