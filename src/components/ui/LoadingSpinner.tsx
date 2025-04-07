import { JSX } from "react";
import styles from "../../styles/loadingspinner.module.css";

export function LoadingSpinner(): JSX.Element {
    return (
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
      </div>
    );
} 