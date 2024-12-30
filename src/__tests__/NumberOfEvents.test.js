import { render, screen } from '@testing-library/react'; // Import testing utilities
import userEvent from '@testing-library/user-event'; // Import userEvent for simulating user actions
import NumberOfEvents from '../components/NumberOfEvents'; // Import the NumberOfEvents component

describe('<NumberOfEvents /> component', () => {
  // Test to ensure the input has the role of "textbox"
  test('contains an element with role "textbox"', () => {
    render(
      <NumberOfEvents
        currentNOE={32}
        setCurrentNOE={() => {}}
        setErrorAlert={() => {}}
      />
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  // Test to ensure the default value of the input field is 32
  test('default value of input is 32', () => {
    render(
      <NumberOfEvents
        currentNOE={32}
        setCurrentNOE={() => {}}
        setErrorAlert={() => {}}
      />
    );
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('32');
  });

  // Test to ensure the value of the input changes when the user types
  test('input value changes when user types', async () => {
    const setErrorAlert = jest.fn(); // Mock function for setErrorAlert
    const setCurrentNOE = jest.fn(); // Mock function for setCurrentNOE

    const user = userEvent.setup();
    render(
      <NumberOfEvents
        currentNOE={32}
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />
    );

    const input = screen.getByRole('textbox');

    // Simulate typing: delete the current value and replace with '10'
    await user.clear(input);
    await user.type(input, '10');

    // Verify the value of the input is updated
    expect(input.value).toBe('10');
    // Verify that setCurrentNOE was called with the correct value
    expect(setCurrentNOE).toHaveBeenCalledWith(10);
  });
});
