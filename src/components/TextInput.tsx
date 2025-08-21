import React from "react";
import styles from "../styles/TextInput.module.css";

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
}) => {
  return (
    <div className={styles['input-container']}>
      <label htmlFor={id} className={styles['input-label']}>
        {label}
      </label>
      <input
        name={name}
        type="text"
        id={id}
        style={style}
        value={value}
        onChange={onChange}
        className={`input ${className ?? ""}`}
        placeholder={placeholder} 
      />
      {error && <span className={styles['input-error']}>{error}</span>}
    </div>
  );
};