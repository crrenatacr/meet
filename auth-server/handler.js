'use strict';

// Importing Google APIs library
const { google } = require("googleapis");
const calendar = google.calendar("v3");

// Scopes required to access public calendar events with read-only permission
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];

// Extracting configuration variables from environment variables
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ["https://crrenatacr.github.io/meet/"];

// Creating the OAuth2 client with credentials and redirect URI
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

// Function that generates the authentication URL for Google OAuth2
module.exports.getAuthURL = async () => {
  /**
   *
   * Scopes array is passed to the `scope` option. 
   *
   */
  // Generating the authentication URL with the required scope
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  // Returning the authentication URL in JSON format
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Enabling CORS
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

// Function that generates the Access Token
module.exports.getAccessToken = async (event) => {
  // Decode the authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);
  
  return new Promise((resolve, reject) => {
    /**
     * Exchange the authorization code for an access token with a “callback” after the exchange.
     * The callback here is an arrow function with the results as parameters: “error” and “response”.
     */
    
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        // Reject the promise if there is an error
        return reject(error);
      }
      // Resolve the promise with the response if successful
      return resolve(response);
    });
  })
    .then((results) => {
      // Respond with the OAuth token
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Enabling CORS
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // Handle errors if the promise is rejected
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};

// Function that retrieves calendar events
module.exports.getCalendarEvents = async (event) => {
  // Decode the access token extracted from the URL query
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  
  // Loads the user credentials and sets the access token as credentials in the OAuth2 client
  oAuth2Client.setCredentials({ access_token });
 // Load the calendar
  return new Promise((resolve, reject) => {
    // List calendar events using the Google Calendar API
    calendar.events.list(
      {
        calendarId: CALENDAR_ID, // The ID of the calendar to access
        auth: oAuth2Client, // OAuth2 client used for authentication
        timeMin: new Date().toISOString(), // Fetch events starting from the current time
        singleEvents: true, // Expands recurring events into single instances
        orderBy: "startTime", // Orders events by start time
      },
      (error, response) => {
        if (error) {
          // Reject the promise if there is an error
          return reject(error);
        }
          // Resolve the promise with the response if successful
          return resolve(response);
        }
    );
  })
    .then((results) => {
      // Respond with with OAuth token and the list of events formatted for the Meet app
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Enabling CORS
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(results.data.items),
      };
    })
    .catch((error) => {
      // Handle errors if the promise is rejected
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
