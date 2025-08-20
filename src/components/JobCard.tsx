import React from 'react';
import styles from '../styles/JobCard.module.css';
import { Text } from './Text';

export type JobCardProps = {
  id: number;
  company: string;
  role: string;
  status: 'Applied' | 'Interviewed' | 'Rejected';
  dateApplied: string;
  extraDetails?: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  company,
  role,
  status,
  dateApplied,
  extraDetails,
}) => {
  // Choose color class based on status
  const statusClass =
    status === 'Rejected'
      ? styles.rejected
      : status === 'Interviewed'
      ? styles.interviewed
      : styles.applied;

  return (
    <div className={styles.card}>
      <Text variant="h2" className={styles.company}>{company}</Text>
      <Text variant="h3" className={styles.role}>{role}</Text>
      <Text variant="p" className={`${styles.status} ${statusClass}`}>
        Status: {status}
      </Text>
      <Text variant="p" className={styles.date}>Applied on: {dateApplied}</Text>
      {extraDetails && <Text variant="p" className={styles.details}>{extraDetails}</Text>}
    </div>
  );
};
