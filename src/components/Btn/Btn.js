import PropTypes from "prop-types";
import styles from "./Btn.module.css";

export default function Btn({ onClick }) {
  return (
    <button type="button" className={styles.Btn} onClick={onClick}>
      Go back
    </button>
  );
}

Btn.propTypes = {
  onClick: PropTypes.func,
};
