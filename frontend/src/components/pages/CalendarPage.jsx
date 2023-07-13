import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../routes/AuthProvider';

function CalendarPage () {
  const decodedToken = useContext(AuthContext);

  return (
    <>
    <h1>kak</h1>
    <h1>{decodedToken.userId}</h1>
    </>
  );
}

export default CalendarPage;