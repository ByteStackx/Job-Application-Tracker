import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NotFound.module.css";

export const NotFound: React.FC = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className={styles.link}>Back to Home</Link>
    </div>
  );
};
