import { useState } from "react";

const SearchInput = ({ onSubmit, onCancel, searchedValue = "" }) => {
  const [inputValue, setInputValue] = useState(searchedValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") return;
    onSubmit(inputValue);
  };

  const handleCancel = () => {
    onCancel();
    setInputValue("");
  };

  return (
    <div className="container-fluid row mt-4">
      <form
        className="d-flex col-xs-12 col-sm-10 col-md-8 col-xxl-6 m-auto"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          data-testid="search-input"
        />
        <button
          className="btn btn-outline-primary"
          type="submit"
          disabled={inputValue.length === 0}
          data-testid="search-button"
        >
          Search
        </button>
        <button
          className="btn btn-outline-danger ms-2"
          onClick={handleCancel}
          disabled={inputValue.length === 0}
          data-testid="cancel-button"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
export default SearchInput;
