import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

  // Scenario 1: 32 events are shown by default when the user hasn’t specified a number
  test('32 events are shown by default when the user hasn’t specified a number', ({ given, and, when, then }) => {
    
    let AppComponent;

    // Given the event app is displayed
    given('event app is displayed', () => {
      AppComponent = render(<App />);
    });

    // And the user has not specified the number of events to display
    and('user has not specified the number of events to display', () => {
      // No specific actions needed here, as the default behavior is assumed
    });

    // When the user opens the app
    when('user opens the app', () => {
      // The app is opened upon rendering
    });

    // Then the number of displayed events should be 32 by default
    then('number of displayed events should be 32 by default', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32); // Check that 32 events are displayed
      });
    });
  });

  // Scenario 2: User can change the number of events displayed
  test('User can change the number of events displayed', ({ given, and, when, then }) => {
    
    let AppComponent;

    // Given the event app is displayed
    given('event app is displayed', () => {
      AppComponent = render(<App />);
    });

    // And the user has loaded the list of events
    and('user has loaded the list of events', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32); // Ensure that the initial load shows 32 events
      });
    });

    // When the user specifies a number of events to display
    when('user specifies a number of events to display', async () => {
      const user = userEvent.setup();
      // Wait for the input to be available in the DOM
      const numberInput = await waitFor(() =>
        AppComponent.container.querySelector('#number-of-events')
      );
      
      // Simulate user interaction
      await user.clear(numberInput);  // Clear the input field
      await user.type(numberInput, '10');  // Specify 10 as the number of events to display
    });

    // Then the app should display the specified number of events, up to 36
    then('app should display the specified number of events, up to 36', async () => {
      const EventListDOM = AppComponent.container.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(10);  // Verify that 10 events are now displayed
      });
    });
  });
});
