Feature: Specify Number of Events

    Scenario: 32 events are shown by default when the user hasn’t specified a number
        Given event app is displayed
        And user has not specified the number of events to display
        When user opens the app
        Then number of displayed events should be 32 by default

    Scenario: User can change the number of events displayed
        Given event app is displayed
        And user has loaded the list of events
        When user specifies a number of events to display
        Then app should display the specified number of events, up to 36


