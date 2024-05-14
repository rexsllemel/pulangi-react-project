import React, { useState, useEffect } from 'react';

function Clock() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  // Format date and time
  const formattedDateTime = currentDateTime.toLocaleString();

  return (
    <div>
      <p>{formattedDateTime}</p>
    </div>
  );
}

export default Clock;
