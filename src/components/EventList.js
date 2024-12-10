import React from 'react'; // Importing React
import Event from "./Event"; // Importing the Event component

const EventList = ({ events }) => {
  return (
    <ul id="event-list" className="event-list" aria-label="event list"> {/* Add aria-label for accessibility */}
      {events ? (
        events.map(event => <Event key={event.id} event={event} />) // Map through events and render Event component for each
      ) : (
        null // If there are no events, render nothing
      )}
    </ul>
  );
}

export default EventList; // Exporting the EventList component
