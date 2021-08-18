import Loader from "react-loader-spinner";
import { Component } from "react";
import styles from "./Loader.module.css";

class Loading extends Component {
  //other logic
  render() {
    return (
      <Loader
        className={styles.Loading}
        type="Puff"
        color="#00BFFF"
        height={300}
        width={300}
        // timeout={3000} //3 secs
      />
    );
  }
}

export default Loading;
