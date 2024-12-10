import { render, within, waitFor, screen } from '@testing-library/react';
import { getEvents } from '../api';
import EventList from '../components/EventList';
import App from "../App";

describe("<EventList /> component", () => {
  test('has an element with "list" role', () => {
    // Pass an empty array as the events prop
    render(<EventList events={[]} />); // Render the EventList component with an empty events array
    const list = screen.getByRole("list"); // Get the element with role "list"
    expect(list).toBeInTheDocument(); // Check if the list is in the document
  });

  test("renders correct number of events", async () => {
    const allEvents = await getEvents(); // Fetch all events from the API
    render(<EventList events={allEvents} />); // Render the EventList component with the fetched events
    const listItems = screen.getAllByRole("listitem"); // Get all elements with role "listitem"
    expect(listItems).toHaveLength(allEvents.length); // Assert the number of list items matches the length of events
  });
});

describe("<EventList /> integration", () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    render(<App />); // Render the App component

    // Get the EventList by its role "list" without using the accessible name
    const EventListDOM = screen.getByRole('list'); // Find the list by role

    // Wait for the items to appear in the list and check the count
    await waitFor(() => {
      const EventListItems = within(EventListDOM).getAllByRole('listitem'); // Get all list items within the event list
      expect(EventListItems.length).toBe(32); // Assert that the number of list items matches the expected count
    });
  });
});
