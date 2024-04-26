import React, { useState } from 'react';
import LinkAccountNumber from './LinkAccountNumber';
import Transactions from './Transactions';

function ParentComponent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogout = () => {

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      <LinkAccountNumber loggedIn={loggedIn} handleLogout={handleLogout} />
    </div>
  );
  };

  return (
    <Transactions handleLogout={handleLogout} />
  );
}

export default ParentComponent;