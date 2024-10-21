import { useEffect, useState, useCallback } from 'react'; // Import React hooks
import CitySearch from './components/CitySearch'; // Import CitySearch component
import EventList from './components/EventList'; // Import EventList component
import NumberOfEvents from './components/NumberOfEvents'; // Import NumberOfEvents component
import { extractLocations, getEvents } from './api'; // Import the API function to fetch events
import './App.css'; // Import the main CSS file for styling

// Main application component
const App = () => {
  // State to store the list of events fetched from the API
  const [events, setEvents] = useState([]); // Initially an empty array of events
  
  // State to store the current number of events to display, default is 32
  const [currentNOE, setCurrentNOE] = useState(32); // Default number of events to show is 32

  // State to store all locations extracted from events
  const [allLocations, setAllLocations] = useState([]); // Initially an empty array for all locations

  const [selectedLocation, setSelectedLocation] = useState("all");

  /**
   * Function to fetch events data from the API.
   * This function will fetch all events and then set the events to display based on currentNOE.
   */
  const fetchData = useCallback(async () => {
    const allEvents = await getEvents(); // Fetch all events from the API
    setEvents(allEvents.slice(0, currentNOE)); // Set the events to display based on currentNOE
    setAllLocations(extractLocations(allEvents)); // Extract and set all locations from the fetched events
  }, [currentNOE]); // The function depends on 'currentNOE', so it will re-run when it changes

  /**
   * useEffect hook to call fetchData when the component is mounted or when 'currentNOE' changes.
   * This ensures that the list of events and locations is fetched either on mount or when the user changes the number of events to display.
   */
  useEffect(() => {
    fetchData(); // Call fetchData to get the initial set of events and locations
  }, [fetchData]); // Dependency array includes 'fetchData' to avoid the linting warning

  const updateEvents = (location, inputNumber) => {
    getEvents().then((events) => {
        const locationEvents =
            location === "all"
                ? events
                : events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, inputNumber);
        setEvents(eventsToShow);
        setSelectedLocation(location);
        setCurrentNOE(inputNumber);
    });
};

useEffect(() => {
    updateEvents(selectedLocation, currentNOE);
}, [selectedLocation, currentNOE]);

  return (
    <div className="App">
      {/* Welcome message and instructions for the user */}
      <h1>Welcome to Meet App</h1>
      <p>Find the best events in your city!</p>
      <p>Use the dropdown to select a city and choose how many events you want to see.</p>

      {/* Render the CitySearch component, passing allLocations to filter suggestions */}
      <CitySearch allLocations={allLocations} setSelectedLocation={setSelectedLocation}/>

      {/* Render the NumberOfEvents component, passing the current number of events and the setter */}
      <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />

      {/* Render the EventList component, passing the list of fetched events */}
      <EventList events={events} />
    </div>
  );
};

export default App;
