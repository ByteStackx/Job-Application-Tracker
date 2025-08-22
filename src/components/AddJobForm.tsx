import React, { useState } from 'react';
import styles from '../styles/AddJobForm.module.css';
import { Text } from './Text';
import { type JobCardProps } from './JobCard';

interface AddJobFormProps {
  setJobs: React.Dispatch<React.SetStateAction<JobCardProps[]>>;
  onSuccess: () => void; // 👈 new prop to close form
}

export const AddJobForm: React.FC<AddJobFormProps> = ({ setJobs, onSuccess }) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<'Applied' | 'Interviewed' | 'Rejected' | ''>('');
  const [dateApplied, setDateApplied] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role || !status || !dateApplied) {
      setMessage('Please fill in all required fields.');
      return;
    }

    const newJob = {
      company,
      role,
      status,
      dateApplied,
      extraDetails: additionalInfo,
    };

    try {
      const response = await fetch('http://localhost:3000/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) throw new Error('Failed to save job');

      const savedJob: JobCardProps = await response.json();
      setJobs(prev => [...prev, savedJob]);

      setMessage('Job added successfully!');

      setCompany('');
      setRole('');
      setStatus('');
      setDateApplied('');
      setAdditionalInfo('');

      // close form after short delay so user sees message briefly
      setTimeout(() => {
        onSuccess();
      }, 800);

    } catch (error) {
      console.error(error);
      setMessage('Error adding job.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Company
        <input value={company} onChange={(e) => setCompany(e.target.value)} />
      </label>
      <label>
        Role
        <input value={role} onChange={(e) => setRole(e.target.value)} />
      </label>
      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
          <option value="">Select status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </label>
      <label>
        Date Applied
        <input
          type="date"
          value={dateApplied}
          onChange={(e) => setDateApplied(e.target.value)}
        />
      </label>
      <label>
        Additional Information
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Any extra notes about this job..."
          rows={3}
        />
      </label>
      <button type="submit" className={styles.submitBtn}>Add Job</button>
      {message && (
        <Text
          variant="p"
          className={`${styles.status} ${
            message.includes('success') ? styles.success : styles.error
          }`}
        >
          {message}
        </Text>
      )}
    </form>
  );
};
