import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    onSubmit(inputValue);
    setInputValue(""); // Очистка після сабміту
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search images..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
