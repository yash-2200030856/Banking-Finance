import React from 'react';
import { Redirect } from 'react-router-dom';

const RequireLogin = ({ loggedIn, children }) => {
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return <>{children}</>;
}

export default RequireLogin;