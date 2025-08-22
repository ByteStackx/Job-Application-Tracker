import React from "react";
import styles from "../styles/SortBar.module.css";

type SortBarProps = {
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

export const SortBar: React.FC<SortBarProps> = ({ sortOrder, setSortOrder }) => {
  return (
    <div className={styles.sortWrapper}>
      <label className={styles.label}>Sort:</label>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className={styles.select}
      >
        <option value="">None</option>
        <option value="asc">Most Recent</option>
        <option value="desc">Oldest</option>
      </select>
    </div>
  );
};
