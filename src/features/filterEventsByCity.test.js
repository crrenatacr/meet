import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import mockData from '../mock-data';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

const filterEventsByCity = (events, city) => {
  return events.filter((event) => event.location === city);
};

defineFeature(feature, (test) => {
  // Scenario 1:
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    given('user hasn’t searched for any city', () => {
      // No specific action needed for this step
    });

    let AppComponent;

    when('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    then('the user should see the list of all upcoming events.', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  // Scenario 2: 
  test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
    let AppComponent;

    given('the main page is open', () => {
      AppComponent = render(<App />);
    });

    let CitySearchDOM;
    when('user starts typing in the city textbox', async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      const citySearchInput = within(CitySearchDOM).queryByRole('textbox');  
      await user.type(citySearchInput, "Berlin");
    });

    then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
      const citySearchInput = within(CitySearchDOM).queryByRole('textbox');
      const typedCity = citySearchInput.value; 
      const events = filterEventsByCity(mockData, typedCity);
      const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(2); 
    });
  });

  // Scenario 3: 
  test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
    let AppComponent;
    let AppDOM; 
    let CitySearchDOM;
    let citySearchInput;

    given('user was typing “Berlin” in the city textbox', async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      citySearchInput = within(CitySearchDOM).queryByRole('textbox');  
      await user.type(citySearchInput, "Berlin");
    });

    let suggestionListItems;
    and('the list of suggested cities is showing', () => {
      suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
      expect(suggestionListItems).toHaveLength(2); // Ajustado para refletir o número de sugestões esperado
    });

    when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
      const user = userEvent.setup();
      await user.click(suggestionListItems[0]);
    });

    then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      expect(citySearchInput.value).toBe('Berlin, Germany');
    });

    and('the user should receive a list of upcoming events in that city', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      const allEvents = await getEvents();

      // filtering the list of all events down to events located in Berlin
      const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value);
      expect(EventListItems).toHaveLength(berlinEvents.length);
    });
  });
});
