import { useState } from "react";
// import { toast } from 'react-toastify'
import styles from "./Searchbar.module.css";
import PropTypes from "prop-types";

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState("");

  function inputChange(evt) {
    setValue(evt.target.value.toLowerCase());
    // console.log(evt.target.value);
  }

  function formSubmit(evt) {
    evt.preventDefault();

    if (value.trim() === "") {
      alert("ENTER Query");
      // toast.error('Wow so easy!');
      return;
    }

    onSubmit(value);
    setValue("");
  }

  return (
    <form className={styles.SearchForm} onSubmit={formSubmit}>
      <button type="submit" className={styles["SearchForm-button"]}>
        <span className={styles["SearchForm-button-label"]}>Search</span>
      </button>

      <input
        className={styles["SearchForm-input"]}
        type="text"
        value={value}
        onChange={inputChange}
        autoComplete="off"
        autoFocus
        placeholder="Search movie"
      />
    </form>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
