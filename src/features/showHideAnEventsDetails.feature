Feature: Show/Hide An Events Details

    Scenario: An event element is collapsed by default
        Given user has loaded the list of events
        When user views the list of events
        Then event details should be collapsed by default

    Scenario: User can expand an event to see details
        Given user has loaded the list of events
        When user clicks on the expand button of an event
        Then event details should be displayed

    Scenario: User can collapse an event to hide details
        Given user has expanded the details of an event
        When user clicks on the collapse button of the event
        Then event details should be hidden



