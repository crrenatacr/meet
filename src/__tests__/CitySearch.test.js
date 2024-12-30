import { render, screen, within, waitFor } from '@testing-library/react'; 
import userEvent from '@testing-library/user-event'; 
import CitySearch from '../components/CitySearch'; 
import { getEvents, extractLocations } from '../api';
import App from '../App';

describe('<CitySearch /> component', () => {
  let allLocations;
  const setSelectedLocation = jest.fn();
  const setInfoAlert = jest.fn();

  beforeEach(() => {
    allLocations = ['Berlin', 'Paris', 'Madrid'];
  });

  test('renders text input', () => {
    render(<CitySearch allLocations={allLocations} setSelectedLocation={setSelectedLocation} setInfoAlert={setInfoAlert} />);
    const cityTextBox = screen.getByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    render(<CitySearch allLocations={allLocations} setSelectedLocation={setSelectedLocation} setInfoAlert={setInfoAlert} />);
    const suggestionList = screen.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    render(<CitySearch allLocations={allLocations} setSelectedLocation={setSelectedLocation} setInfoAlert={setInfoAlert} />);

    const cityTextBox = screen.getByRole('textbox');
    await user.click(cityTextBox);
    const suggestionList = screen.getByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    render(<CitySearch allLocations={allLocations} setSelectedLocation={setSelectedLocation} setInfoAlert={setInfoAlert} />);

    const cityTextBox = screen.getByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    const suggestions = allLocations.filter(location =>
      location.toUpperCase().includes(cityTextBox.value.toUpperCase())
    );

    const suggestionListItems = screen.getAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    suggestions.forEach((suggestion, index) => {
      expect(suggestionListItems[index].textContent).toBe(suggestion);
    });
  });

  test('shows only "See all cities" suggestion when user types a non-existing city', async () => {
    const user = userEvent.setup();
    render(<CitySearch allLocations={allLocations} setSelectedLocation={setSelectedLocation} setInfoAlert={setInfoAlert} />);

    const cityTextBox = screen.getByRole('textbox');
    await user.type(cityTextBox, 'Paris, France');

    const suggestionListItems = screen.getAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(1);
    expect(suggestionListItems[0].textContent).toBe('See all cities');
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    render(<CitySearch allLocations={allLocations} setSelectedLocation={setSelectedLocation} setInfoAlert={setInfoAlert} />);

    const cityTextBox = screen.getByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    const BerlinSuggestion = screen.getAllByRole('listitem')[0];
    await user.click(BerlinSuggestion);

    expect(cityTextBox).toHaveValue(BerlinSuggestion.textContent);
  });
});

describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const CitySearchDOM = container.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    await waitFor(() => {
      const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
  });
});
