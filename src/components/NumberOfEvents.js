import React, { useState } from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(currentNOE);

  const handleInputChange = (event) => {
    const value = event.target.value; 
    const numValue = Number(value);

    setNumberOfEvents(value); 

    if (isNaN(numValue) || numValue <= 0) {
      setErrorAlert("Please enter a valid number greater than 0.");
    } else if (numValue > 99) {
      setErrorAlert("Only a maximum of 99 is allowed.");
    } else {
      setErrorAlert(""); 
      setCurrentNOE(numValue); 
    }
  };

  return (
    <div>
      <input
        type="text"
        id="number-of-events"
        data-testid="number-of-events"
        value={numberOfEvents}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
