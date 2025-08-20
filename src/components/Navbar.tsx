import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import { Text } from './Text';

type NavLink = {
  label: string;
  to: string;
};

type NavbarProps = {
  links?: NavLink[];
};

export const Navbar: React.FC<NavbarProps> = ({ links = [] }) => {
  return (
    <nav className={styles.nav}>
      <Text variant="h2" className={styles.brand} style={{ margin: 0, padding: 0 }}>
        Job Dashboard
      </Text>
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.to} to={link.to} className={styles.link}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
