import React, { useState, useEffect } from 'react';
import { getEvents, extractLocations } from '../api';
import CitySearch from '../components/CitySearch';
import NumberOfEvents from '../components/NumberOfEvents'; 
import EventList from '../components/EventList'; 
import { render, screen } from '@testing-library/react';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === "See all cities"
        ? allEvents
        : allEvents.filter(event => event.location === currentCity);
      
      setEvents(filteredEvents.slice(0, currentNOE));
      setAllLocations(extractLocations(allEvents));
    };

    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} /> {/* Agora usando setCurrentNOE */}
      <EventList events={events} />
    </div>
  );
}

describe('App Component', () => {
  test('renders App without crashing', () => {
    render(<App />); // Renders the App

    // Verifies if the search input is present
    const cityInput = screen.getByPlaceholderText(/search for a city/i);
    expect(cityInput).toBeInTheDocument(); 

    // Verifies if the input of event numbers is present
    const numberOfEventsInput = screen.getByTestId('number-of-events');
    expect(numberOfEventsInput).toBeInTheDocument(); 
  });
});

export default App;
