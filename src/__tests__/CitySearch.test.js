import { render, screen, within, waitFor } from '@testing-library/react'; // Import testing utilities
import userEvent from '@testing-library/user-event'; // Import userEvent for simulating user actions
import CitySearch from '../components/CitySearch'; // Import the CitySearch component
import { getEvents, extractLocations } from '../api';
import App from '../App'; // Import the App component for integration tests

describe('<CitySearch /> component', () => {
  let allLocations; // Variable to hold all location names
  setSelectedLocation = jest.fn();

  beforeEach(() => {
    allLocations = ['Berlin', 'Paris', 'Madrid']; // Sample locations
  });

  test('renders text input', () => {
    render(<CitySearch allLocations={allLocations} setSelectedLocation={setSelectedLocation}/>); // Render the component with locations
    const cityTextBox = screen.getByRole('textbox'); // Get the input element
    expect(cityTextBox).toBeInTheDocument(); // Check if the input is in the document
    expect(cityTextBox).toHaveClass('city'); // Verify the input has the correct class
  });

  test('suggestions list is hidden by default', () => {
    render(<CitySearch allLocations={allLocations} setSelectedLocation={setSelectedLocation}/>);
    const suggestionList = screen.queryByRole('list'); // Get the suggestion list
    expect(suggestionList).not.toBeInTheDocument(); // Check that it is not in the document
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup(); // Setup user event simulation
    render(<CitySearch allLocations={allLocations} setSelectedLocation={setSelectedLocation}/>);

    const cityTextBox = screen.getByRole('textbox');
    await user.click(cityTextBox); // Simulate click on the input
    const suggestionList = screen.getByRole('list'); // Check if the suggestion list is rendered
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions'); // Verify the class of the list
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    render(<CitySearch allLocations={allLocations} setSelectedLocation={setSelectedLocation}/>);

    const cityTextBox = screen.getByRole('textbox');
    await user.type(cityTextBox, "Berlin"); // Simulate typing "Berlin"

    const suggestions = allLocations.filter(location => 
      location.toUpperCase().includes(cityTextBox.value.toUpperCase())
    ); // Filter suggestions

    const suggestionListItems = screen.getAllByRole('listitem'); // Get all list items
    expect(suggestionListItems).toHaveLength(suggestions.length + 1); // Check length (+1 for "See all cities")
    suggestions.forEach((suggestion, index) => {
      expect(suggestionListItems[index].textContent).toBe(suggestion); // Verify each suggestion
    });
  });

  // New test to simulate user typing a city that doesn't exist
  test('shows only "See all cities" suggestion when user types a non-existing city', async () => {
    const user = userEvent.setup();
    render(<CitySearch allLocations={allLocations} setSelectedLocation={setSelectedLocation}/>);

    const cityTextBox = screen.getByRole('textbox');
    await user.type(cityTextBox, "Paris, France"); // Simulate typing a non-existing city

    const suggestionListItems = screen.getAllByRole('listitem'); // Get all list items
    expect(suggestionListItems).toHaveLength(1); // Check that there is only one suggestion
    expect(suggestionListItems[0].textContent).toBe("See all cities"); // Verify the suggestion is "See all cities"
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup(); // Setup for simulating user actions
    const allEvents = await getEvents(); // Fetch all events from the API
    allLocations = extractLocations(allEvents); // Extract unique locations from the events

    render(<CitySearch allLocations={allLocations} setSelectedLocation={setSelectedLocation}/>); // Render the CitySearch component with the fetched locations

    const cityTextBox = screen.getByRole('textbox'); // Get the text box by its role
    await user.type(cityTextBox, "Berlin"); // Simulate typing 'Berlin' in the textbox

    const BerlinGermanySuggestion = screen.getAllByRole('listitem')[0]; // Find the first suggestion
    await user.click(BerlinGermanySuggestion); // Simulate a click on the suggestion

    // Assert that the textbox value now matches the clicked suggestion's text
    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />); // Render the App component
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox); // Simulate clicking on the city text box

    const allEvents = await getEvents(); // Fetch all events
    const allLocations = extractLocations(allEvents); // Extract locations

    // Wait for the suggestions list to be populated with items
    await waitFor(() => {
      const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); // Get all suggestion items
      expect(suggestionListItems.length).toBe(allLocations.length + 1); // Check if the number of suggestions matches
    });
  });
});
