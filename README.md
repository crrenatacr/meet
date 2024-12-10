# Meet App

## Objective
To build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

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
- Responsive design
- PWA compliance and offline functionality
- Deploy on GitHub Pages
- OOP alert system
- Data visualization
- 90%+ test coverage
- Online performance monitoring

## User Stories
### 1. Filter Events by City
As a user, I should be able to filter events by city so that I can see events in my chosen location.

### 2. Show/Hide Event Details
As a user, I should be able to show or hide event details so that I can get more information about an event without leaving the main view.

### 3. Specify Number of Events
As a user, I should be able to specify the number of events I want to see so that I can control the amount of information displayed.

### 4. Use the App When Offline
As a user, I should be able to use the app when offline so that I can access event information even without an internet connection.

### 5. Add an App Shortcut to the Home Screen
As a user, I should be able to add an app shortcut to the home screen so that I can easily access the app.

### 6. Display Charts Visualizing Event Details
As a user, I should be able to see charts visualizing event details so that I can get a quick overview of event data.

## Scenarios
### 1. Filter Events by City
Given I am on the main page,
When I select a city from the dropdown,
Then I should see a list of events in that city.

### 2. Show/Hide Event Details
Given I see a list of events,
When I click the "Show details" button for an event,
Then I should see the details for that event.

### 3. Specify Number of Events
Given I am on the main page,
When I select a number of events to display,
Then I should see only that number of events listed.

### 4. Use the App When Offline
Given I am using the app,
When I lose internet connection,
Then I should still be able to see previously loaded events.

### 5. Add an App Shortcut to the Home Screen
Given I am using the app on a mobile device,
When I choose to add the app to the home screen,
Then I should see a shortcut icon for the app on my home screen.

### 6. Display Charts Visualizing Event Details
Given I am on the main page,
When I view the event details,
Then I should see charts visualizing event data.

## Setup and Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/meet-app.git
   cd meet-app
