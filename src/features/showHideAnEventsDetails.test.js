import { render, waitFor, within, screen } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import Event from '../components/Event';

// Load the Gherkin feature file
const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

// Define tests based on the scenarios from the Gherkin file
defineFeature(feature, (test) => {

  // Scenario 1: An event element is collapsed by default
  test('An event element is collapsed by default', ({ given, when, then }) => {    
    let AppDOM;

    // Given user is on the app and the events are loaded
    given('user has loaded the list of events', () => {
      AppDOM = render(<App />).container.firstChild;  // Render the main App component                                                                                         
    });

    // When the app displays the list of events
    when('user views the list of events', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');  // Locate the event list in the DOM
      await waitFor(() => {
        const EventListItem = within(EventListDOM).getAllByRole('listitem');  // Get all event items
        expect(EventListItem).toHaveLength(32);  // Assuming there are 36 events to display
      });
    });

    // Then the event details should be collapsed by default
    then('event details should be collapsed by default', () => {
      const eventDetails = screen.queryByText(/About the event:/i);  // Check for event details section
      expect(eventDetails).not.toBeInTheDocument();  // Ensure event details are not visible
    });
  });
  
  // Scenario 2: User can expand an event to see details
  test('User can expand an event to see details', ({ given, when, then }) => {
    let EventComponent;
    let allEvents;

    // Given the app is loaded and event details are initially hidden
    given('user has loaded the list of events', async () => {
      allEvents = await getEvents();  // Fetch the events data
      EventComponent = render(<Event event={allEvents[0]} />);  // Render the Event component with one event
      expect(screen.queryByText(/About the event:/i)).not.toBeInTheDocument();  // Ensure details are hidden initially
    });

    // When the user clicks the expand button to show details
    when('user clicks on the expand button of an event', async () => {
      const user = userEvent.setup();
      const showDetails = screen.getByText('Show details');  // Locate the "Show Details" button
      await user.click(showDetails);  // Simulate user clicking the button
    });

    // Then the event details should be displayed
    then('event details should be displayed', () => {
      const eventDetails = screen.getByText(/About the event:/i);  // Check for event details section
      expect(eventDetails).toBeInTheDocument();  // Ensure details are now visible
    });
  });
  
  // Scenario 3: User can collapse an event to hide details
  test('User can collapse an event to hide details', ({ given, when, then }) => {
    let EventComponent;
    let allEvents;

    // Given the event details are expanded and visible
    given('user has expanded the details of an event', async () => {
      allEvents = await getEvents();  // Fetch the events data
      EventComponent = render(<Event event={allEvents[0]} />);  // Render the Event component
      const user = userEvent.setup();
      const showDetails = screen.getByText('Show details');  // Expand the event details
      await user.click(showDetails);
      expect(screen.getByText(/About the event:/i)).toBeInTheDocument();  // Ensure details are visible
    });

    // When the user clicks the collapse button to hide details
    when('user clicks on the collapse button of the event', async () => {
      const user = userEvent.setup();
      const hideDetails = screen.getByText('Hide details');  // Locate the "Hide Details" button
      await user.click(hideDetails);  // Simulate user clicking the button
    });

    // Then the event details should be hidden
    then('event details should be hidden', () => {
      const eventDetails = screen.queryByText(/About the event:/i);  // Check for event details section
      expect(eventDetails).not.toBeInTheDocument();  // Ensure details are no longer visible
    });
  });
});
