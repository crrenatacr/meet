# Meet App

## Introduction 

The Meet App is a user-friendly serverless, progressive web application (PWA) designed with React using a test-driven development (TDD) technique to offer features that enhance the user experience, to find events in the desired areas. The application uses the Google Calendar API to fetch upcoming events.

## Key Features
- Filter Events by City
- Show/Hide Event Details
- Specify Number of Events
- Use the App When Offline
- Add an App Shortcut to the Home Screen
- Display Charts Visualizing Event Details

## Technical Requirements
- React application
- TDD technique
- Google Calendar API and OAuth2 authentication
- Serverless functions (AWS Lambda preferred)
- Code hosted on GitHub
- Compatibility with latest versions of Chrome, Firefox, Safari, Edge, Opera, and IE11
- Responsive design, including including mobile and tablet (widths of 1920px and 320px)
- Lighthouse’s PWA compliance and offline functionality
- Deploy on GitHub Pages
- OOP alert system approach to show information to the
user
- Data visualization
- 90%+ test coverage
- Online performance monitoring

## User Stories & Scenarios

### Filter Events by City: 

**Scenario 1 :** When user hasn’t searched for a specific city, show upcoming events from all cities.
    
1. Given user hasn’t searched for any city,
2. When user opens the app,
3. Then user should see a list of upcoming events.

**Scenario 2 :** User should see a list of suggestions when they search for a city.

1. Given the main page is open,
2. When user starts typing in the city textbox,
3. Then user should receive a list of suggested cities.

**Scenario 3 :** User can select a city from the suggested list.

 1. Given user sees a list of suggested cities,
 2. When user selects a city from the list,
 3. Then their city should be changed to that city AND the user should receive a list of upcoming events in that city.

**Scenario 4 :** No events available for the selected city.

1. Given user selects a city with no upcoming events,
2. When user clicks the "Filter" button,
3. Then user should see a message indicating that no events are available for that city.


### Show/Hide Event Details

As a user, I should be able to show/hide event details so that I can see more/less information about an event.

**Scenario 1 :** An event element is collapsed by default.

1. Given user sees a list of events,
2. When user clicks the "Show details" button for an event,
3. Then user should see the details for that event.


**Scenario 2 :** User can collapse an event to hide details

1. Given the details for an event are being displayed,
2. When user clicks the "Hide Details" button,
3. Then that event details should be hidden.


### Specify Number of Events

As a user, I should be able to specify the amount of events that will be displayed in the app.

**Scenario 1 :**  When user hasn’t specified a number, 32 events are shown by default.

1. Given user has not set a specific number of events to display,
2. When the application loads,
3. Then user should see a list of 32 events by default.

**Scenario 2 :** User can change the number of events displayed.

1. Given user is on the main page,
2. When user types a number of events to display,
3. Then user should see only that amount of events listed.

### Use the App When Offline

As a user, I should be able to use the app when offline so that I can see the events I viewed the last time I was online.

**Scenario 1 :** Show cached data when offline.

1. Given user has previously loaded event data while online,
2. When user is offline,
3. Then the app should display the cached event data.

**Scenario 2 :** Show error when user changes search settings (city, number of events).

1. Given user is offline,
2. When user tries new search,
3. Then usershould see an error message indicating that an internet connection is necessary.

### Add an App Shortcut to the Home Screen

As a user, I should be able to add an app shortcut to the home screen so that I can easily access the app.

1. Given I am using the app on a mobile device,
2. When I choose to add the app to the home screen,
3. Then I should see a shortcut icon for the app on my home screen.

### Display Charts Visualizing Event Details

As a user, I should be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

**Scenario 1:** Show a chart with the number of upcoming events in each city.

1. Given I am on the main page,
2. When I view the event details,
3. Then I should see charts visualizing event data.









## Setup and Installation
1. Clone the repository:
   
   git clone https://github.com/crrenatacr/meet
   cd meet
