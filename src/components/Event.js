import React, { useState } from 'react';

// Event component to display event details
const Event = ({ event }) => {
  // State to track whether event details are shown
  const [showDetails, setShowDetails] = useState(false);

  // Function to toggle the event details
  const toggleDetails = () => {
    setShowDetails(prevShowDetails => !prevShowDetails); // Use prev state to toggle
  };

  return (
    <li className="event">
      <h3 className="event-title">{event.summary}</h3>
      <p className="event-location">{event.location}</p>
      <p className="event-date">
        {/* Formatting the date to en-US to ensure consistent testing */}
        {new Date(event.start.dateTime).toLocaleString("en-US", {
          timeZone: event.start.timeZone,
        })} -{' '}
        {new Date(event.end.dateTime).toLocaleString("en-US", {
          timeZone: event.end.timeZone,
        })}
      </p>

      {/* Button to show/hide details */}
      <button className="details-btn" onClick={toggleDetails}>
        {showDetails ? 'Hide details' : 'Show details'}
      </button>

      {/* Show event details only if showDetails is true */}
      {showDetails && (
        <div className="event-details">
          <h4>About the event:</h4>
          <p className="event-description">{event.description}</p>
          <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
            See more details
          </a>
        </div>
      )}
    </li>
  );
};

export default Event;
