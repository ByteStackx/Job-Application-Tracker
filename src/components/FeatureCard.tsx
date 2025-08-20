import React from 'react';
import { Text } from './Text';
import styles from '../styles/FeatureCard.module.css';

export type FeatureCardProps = {
  iconLink: string;
  heading: string;
  text: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ iconLink, heading, text }) => {
  return (
    <div className={styles['feature-card']}>
      <img className={styles.icon} src={iconLink} />
      <div className={styles.content}>
        <Text variant='h4'>{heading}</Text>
        <Text variant='p'>{text}</Text>
      </div>
    </div>
  );
}
