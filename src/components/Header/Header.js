import styles from "./Header.module.css";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <header className={styles.Header}>
      <Navigation />
    </header>
  );
}
