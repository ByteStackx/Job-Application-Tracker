import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import { Text } from '../components/Text';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setStatusMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/users?email=${email}&password=${password}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setStatusMessage('Invalid email or password.');
      } else {
        setStatusMessage('Login successful!');

        localStorage.setItem('user', JSON.stringify(data[0]));

        setEmail('');
        setPassword('');

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
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="your@email.com"
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
