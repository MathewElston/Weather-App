import React from "react";
import { useState } from "react";

interface Props {
  onClick(value: string): void;
}

const SearchBar = ({ onClick }: Props) => {
  const [location, setLocation] = useState("");
  const handleButtonClick = () => {
    location ? onClick(location) : location;
  };

  return (
    <div className="input-group mb-3 ">
      <input
        type="text"
        className="form-control"
        placeholder="City or Zipcode..."
        aria-label="location"
        aria-describedby="button-addon2"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
        onClick={handleButtonClick}
      >
        Get Weather
      </button>
    </div>
  );
};

export default SearchBar;
