import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';

const SignUpPage = ({ loggedIn, handleLogout }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const history = useHistory();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!validateUsername(username)) {
      setUsernameError('Invalid username.');
      alert('Invalid username.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email.');
      alert('Invalid email.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Invalid password. Password must be 8 Char above and contain special characters,numbers.');
      alert('Invalid password.');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError('Invalid phone number.');
      alert('Invalid phone number.');
      return;
    }

    if (!validateDateOfBirth(dateOfBirth)) {
      setDateOfBirthError('You must be 18 years or older.');
      alert('You must be 18 years or older to sign up.');
      return;
    }

    const newUser = {
      username: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth
    };

    fetch('http://localhost:8081/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(response => {
      if (response.ok) {
        console.log('Signup successful!');
        history.push('/login');
      } else {
        console.error('Signup failed.');
      }
    })
    .catch(error => {
      console.error('Error during signup:', error);
    });
  };

  const validateUsername = (username) => {
    return username.length >= 3;
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  const validateDateOfBirth = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 18);
    return dob <= minDate;
  };

  const clearError = (setError) => {
    setError('');
  };

  return (
    <div>
      <div className="signup-page">
      <div className="signup-container">
        <div className="signup-box">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => clearError(setUsernameError)}
              error={!!usernameError}
              helperText={usernameError}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => clearError(setEmailError)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => clearError(setPasswordError)}
              error={!!passwordError}
              helperText={passwordError}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onFocus={() => clearError(setPhoneNumberError)}
              error={!!phoneNumberError}
              helperText={phoneNumberError}
            />
            <TextField
              label="Date of Birth"
              variant="outlined"
              type="date"
              fullWidth
              margin="normal"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              onFocus={() => clearError(setDateOfBirthError)}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!dateOfBirthError}
              helperText={dateOfBirthError}
            />
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
            
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignUpPage;
