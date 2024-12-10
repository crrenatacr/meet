import { render, screen, waitFor } from '@testing-library/react'; // Import testing utilities
import userEvent from '@testing-library/user-event'; // Import userEvent for simulating user actions
import NumberOfEvents from '../components/NumberOfEvents'; // Import the NumberOfEvents component
import App from '../App'; // Ensure that App is imported correctly

describe('<NumberOfEvents /> component', () => {
  // Test to ensure the input has the role of "textbox"
  test('contains an element with role "textbox"', () => {
    render(<NumberOfEvents currentNOE={32} setCurrentNOE={() => {}} />); // Render the component
    expect(screen.getByRole('textbox')).toBeInTheDocument(); // Check if there's an input with the textbox role
  });

  // Test to ensure the default value of the input field is 32
  test('default value of input is 32', () => {
    render(<NumberOfEvents currentNOE={32} setCurrentNOE={() => {}} />); // Render the component
    const input = screen.getByRole('textbox'); // Get the input element with the role "textbox"
    expect(input.value).toBe('32'); // Ensure the default value is 32
  });

  // Test to ensure the value of the input changes when the user types
  test('input value changes when user types', async () => {
    const user = userEvent.setup(); // Setup user event simulation
    render(<NumberOfEvents currentNOE={32} setCurrentNOE={() => {}} />); // Render the component
    const input = screen.getByRole('textbox'); // Get the input element with the role "textbox"

    // Simulate typing: delete the current value and replace with '10'
    await user.type(input, '{backspace}{backspace}10');
    expect(input.value).toBe('10'); // Check if the value was updated to '10'
  });
});

// Integration test between App, NumberOfEvents, and EventList
describe('Integration test between App, NumberOfEvents, and EventList', () => {
  test('User can change the number of events displayed', async () => {
    // Render the App component
    render(<App />);

    // Find the input field for the number of events (using the test id)
    const NumberOfEventsInput = screen.getByTestId('number-of-events');

    // Ensure the default value is 32
    expect(NumberOfEventsInput).toHaveValue('32'); // Check that it is a string

    // Simulate changing the number of events to 10 (clearing the "32" first)
    await userEvent.clear(NumberOfEventsInput); // Clear the input first
    await userEvent.type(NumberOfEventsInput, '10');

    // Check if the input value has changed to 10
    expect(NumberOfEventsInput).toHaveValue('10');

    // Wait for the event list to be updated accordingly
    await waitFor(() => {
      const eventListItems = screen.getAllByRole('listitem'); // Assuming events are rendered as <li> elements
      expect(eventListItems.length).toBe(10); // Ensure the number of rendered events matches the input
    });
  });
});
