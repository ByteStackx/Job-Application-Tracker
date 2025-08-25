import React from "react";
import styles from "../styles/Registration.module.css"; // use same CSS as form

type TextInputProps = {
  id?: string;
  value?: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
  label?: string;
  error?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  type?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  id,
  value,
  onChange,
  style,
  label,
  error,
  name,
  className,
  placeholder,
  type = "text",
}) => {
  return (
    <div className={styles['input-container']} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        id={id}
        style={style}
        value={value}
        onChange={onChange}
        className={`input ${className ?? ""}`}
        placeholder={placeholder}
      />
      {error && <span className={`${styles.status} ${styles.error}`}>{error}</span>}
    </div>
  );
};
