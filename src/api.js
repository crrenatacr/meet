import mockData from './mock-data';
import NProgress from 'nprogress';

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

// This function retrieves the access token from localStorage and checks if it's valid
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  // If there's no valid token, remove it from localStorage and try to get a new one
  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");

    if (!code) {
      // Redirect to the auth URL if no code is found in the URL
      const response = await fetch(
        'https://h6lktfu534.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url' // Updated auth URL
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl); // Redirect the user to the auth URL
    }
    return code && getToken(code); // If code is found, exchange it for a token
  }
  return accessToken; // Return the valid access token
};

// Function to verify the access token
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result; // Return the token validation result
};

/**
 *
 * This function will fetch the list of all events
 */
export const getEvents = async () => {
  NProgress.start();
  // Check if running on localhost and return mock data
  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  }

  const token = await getAccessToken(); // Check for an access token

  if (token) {
    removeQuery(); // Remove query from the URL
    const url = `https://h6lktfu534.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`; // Construct the API endpoint using template literals
    const response = await fetch(url); // Fetch events from the API
    const result = await response.json(); // Parse the JSON response
    console.log(result)
    if (result) {
      NProgress.done();
      localStorage.setItem("lastEvents", JSON.stringify(result)); // Save events to localStorage for offline use
      return result; // Return events from the result
    } else {
      NProgress.done();
      return null;
    }
  }
};

// Function to extract unique locations from the list of events
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

// Function to remove the query parameters from the URL
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl); // Update the URL without the query
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl); // Update the URL without the query
  }
};

// Function to get the token from the code
const getToken = async (code) => {
  const  encodeCode = encodeURIComponent(code);
  const response = await fetch(
    `https://h6lktfu534.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`,
    
  ); // Use template literals for URL
  console.log('response: ', response);
 const { access_token } = await response.json(); // Destructure access_token from response
 access_token && localStorage.setItem("access_token", access_token); // Store access token if it exists

 return access_token; // Return the access token
};
