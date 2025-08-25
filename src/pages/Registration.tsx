import React, { useState } from "react";
import styles from "../styles/Registration.module.css";
import { Text } from "../components/Text";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../components/TextInput";

export const Registration: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    setEmailError("");
    setPasswordError("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password cannot be empty.");
      valid = false;
    }

    if (!valid) return;

    const newUser = { username: email, password };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error("Failed to save user");

      setStatusMessage("Registration successful!");
      setEmail("");
      setPassword("");

      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      console.error(error);
      setStatusMessage("Error registering user.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <Text variant="h1" className={styles.title}>
          Register
        </Text>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            error={emailError}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>

        {statusMessage && (
        <Text
          variant="p"
          className={`${styles.status} ${statusMessage.includes('success') ? styles.success : styles.error}`}
        >
          {statusMessage}
        </Text>
      )}
      </div>
    </div>
  );
};
