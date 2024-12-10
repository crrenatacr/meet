import { render, screen } from '@testing-library/react'; 
import userEvent from '@testing-library/user-event'; 
import Event from '../components/Event'; 
import mockData from '../mock-data'; 

describe('Event Component', () => {
  const event = mockData[0]; // Get the first event from mock data

  test('renders event title correctly', () => {
    render(<Event event={event} />); // Render the Event component with the event prop
    expect(screen.getByText(event.summary)).toBeInTheDocument(); // Check if the event title is in the document
  });

  test('renders event start time correctly', () => {
    // Format the start time to a readable string using the event's timezone
    const startTime = new Date(event.start.dateTime).toLocaleString("en-US", {
      timeZone: event.start.timeZone,
    });

    // Format the end time to a readable string using the event's timezone
    const endTime = new Date(event.end.dateTime).toLocaleString("en-US", {
      timeZone: event.end.timeZone,
    });

    // Combine the start and end times into a single string
    const time = `${startTime} - ${endTime}`;

    render(<Event event={event} />); // Render the Event component with the event prop
    expect(screen.getByText(time)).toBeInTheDocument(); // Check if the combined time is in the document
  });

  test('renders event location correctly', () => {
    render(<Event event={event} />); // Render the Event component with the event prop
    expect(screen.getByText(event.location)).toBeInTheDocument(); // Check if the event location is in the document
  });

  test('renders event details button with the title "Show details"', () => {
    render(<Event event={event} />); // Render the Event component with the event prop
    expect(screen.getByText('Show details')).toBeInTheDocument(); // Check if the "Show details" button is in the document
  });

  test("by default, event's details section should be hidden", () => {
    render(<Event event={event} />); // Render the Event component with the event prop
    expect(screen.queryByText('About the event:')).not.toBeInTheDocument(); // Check that details are hidden initially
  });

  test("shows details section when user clicks on 'Show details' button", async () => {
    render(<Event event={event} />); // Render the Event component with the event prop
    await userEvent.click(screen.getByText('Show details')); // Simulate clicking the "Show details" button
    expect(screen.getByText('About the event:')).toBeInTheDocument(); // Check if details are displayed
  });

  test("hides details section when user clicks on 'Hide details' button", async () => {
    render(<Event event={event} />); // Render the Event component with the event prop
    await userEvent.click(screen.getByText('Show details')); // Simulate clicking the "Show details" button
    await userEvent.click(screen.getByText('Hide details')); // Simulate clicking the "Hide details" button
    expect(screen.queryByText('About the event:')).not.toBeInTheDocument(); // Check that details are hidden
  });
});
