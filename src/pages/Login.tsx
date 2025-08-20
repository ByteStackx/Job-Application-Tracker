import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import { Text } from '../components/Text';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setStatusMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
      const data = await response.json();

      if (data.length === 0) {
        setStatusMessage('Invalid username or password.');
      } else {
        setStatusMessage('Login successful!');
        setUsername('');
        setPassword('');
        // Navigate to dashboard or home page
        navigate('/home'); 
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('Error logging in.');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <Text variant="h1" className={styles.title}>Login</Text>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.button}>Login</button>
        </form>
        {statusMessage && (
          <Text
            variant="p"
            className={`${styles.status} ${statusMessage.includes('successful') ? styles.success : styles.error}`}
          >
            {statusMessage}
          </Text>
        )}
      </div>
    </div>
  );
};
