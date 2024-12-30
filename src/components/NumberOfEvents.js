import React, { useState } from 'react';

// Component to select the number of events
const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  // State to keep track of the number of events, defaulting to currentNOE
  const [numberOfEvents, setNumberOfEvents] = useState(currentNOE);

  // Handle input change
  const handleInputChange = (event) => {
    const value = event.target.value; // Get the new value from the input
    const numValue = Number(value); // Convert value to a number
    setNumberOfEvents(value); // Update state with new value

    let errorText = ""; // Initialize error message as empty
    // Validate the input value
    if (isNaN(numValue) || numValue <= 0) {
      errorText = "Please enter a valid number"; // Error if value is not a number or <= 0
    } else if (numValue > 99) {
      errorText = "Only a maximum of 99 is allowed"; // Error if value exceeds 99
    }
    setErrorAlert(errorText); // Update the error alert with the message
    if (!errorText) {
      setCurrentNOE(numValue); // Update the current number of events in parent component if valid
    }
  };

  return (
    <div>
      <input
        type="text" // Matches the role "textbox"
        id="number-of-events"
        data-testid="number-of-events" // Added data-testid for testing purposes
        value={numberOfEvents} // Bind the input value to the state
        onChange={handleInputChange} // Call handleInputChange on input change
        placeholder="Enter number of events" // Placeholder for better UX
        aria-label="Select number of events" // Accessibility improvement
      />
    </div>
  );
};

export default NumberOfEvents; // Export the component for use in other parts of the app.
