import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setSelectedLocation }) => {
  // Defining state variables: query, suggestions, and showSuggestions
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState(""); // State for the input field value
  const [suggestions, setSuggestions] = useState([]); // State for the filtered location suggestions

  // Update suggestions when allLocations prop changes
  useEffect(() => {
    setSuggestions(allLocations); // Initialize suggestions with allLocations
  }, [allLocations]); // Dependency array ensures this runs whenever allLocations changes

  // Function to handle input field changes and update suggestions
  const handleInputChanged = (event) => {
    const value = event.target.value; // Get current value of the input field
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          // Filter locations that match the input value
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];

    setQuery(value); // Update the query state to the current input value
    setSuggestions(filteredLocations); // Update the suggestions state with the filtered locations
    console.log("Updated suggestions:", filteredLocations); // Log filtered suggestions for debugging
  };

  // Function to handle suggestion item clicks
  const handleItemClicked = (event) => {
    const value = event.target.textContent; // Get the text of the clicked suggestion
    setQuery(value); // Set the query to the clicked suggestion
    setShowSuggestions(false); // Hide the suggestions list
    setSelectedLocation(value === "See all cities" ? "all" : value);
  };

  return (
    <div id="city-search" data-testid="city-search">
      {/* Added data-testid for testing */}
      {/* Input field for city search */}
      <input
        id="city-search-input"
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query} // Controlled component, value is tied to query state
        onFocus={() => setShowSuggestions(true)} // Show suggestions when input is focused
        onChange={handleInputChanged} // Handle input changes
      />
      {/* Conditional rendering of the suggestions list */}
      {showSuggestions && (
        <ul className="suggestions">
          {/* Map through suggestions and create a list item for each suggestion */}
          {suggestions.map((suggestion) => (
            <li onClick={handleItemClicked} key={suggestion}>
              {suggestion}
            </li>
          ))}
          {/* Add a hardcoded "See all cities" list item at the end */}
          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
