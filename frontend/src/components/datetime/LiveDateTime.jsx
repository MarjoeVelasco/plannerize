import React, { useState, useEffect } from 'react';

function LiveDateTime() {
  
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();

  return (
    <div>
      <h1>{formattedDate}</h1>
    </div>
  );
}

export default LiveDateTime;
