import React, { useState } from 'react';
import styles from '../styles/Registration.module.css';
import { Text } from '../components/Text';
import { useNavigate } from 'react-router-dom';

export const Registration: React.FC = () => {
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

    const newUser = { username, password };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error('Failed to save user');

      setStatusMessage('Registration successful!');
      setUsername('');
      setPassword('');

      // Redirect to login after 1 second
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      console.error(error);
      setStatusMessage('Error registering user.');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <Text variant="h1" className={styles.title}>Register</Text>
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
          <button type="submit" className={styles.button}>Register</button>
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
