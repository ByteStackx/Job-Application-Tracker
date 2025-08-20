import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { FeaturesContainer } from '../containers/FeaturesContainer'
import add from '../assets/add.png'
import edit from '../assets/edit.png'
import deleteIcon from '../assets/delete.png'
import filter from '../assets/filter.png'
import sort from '../assets/sort.png'
import search from '../assets/search.png'
import styles from '../styles/LandingPage.module.css'
import Footer from '../components/Footer'

export const LandingPage = () => {
    const [features, setFeatures] = useState([
        {
            iconLink: add,
            heading: 'Add Jobs Easily',
            text: 'Track applications with details like company, role, status, date applied, and notes.',
        },
        {
            iconLink: edit,
            heading: 'Update Anytime',
            text: 'Edit job information whenever you need.',
        },
        {
            iconLink: deleteIcon,
            heading: 'Delete with One Click',
            text: 'Remove old or irrelevant applications effortlessly.',
        },
        {
            iconLink: filter,
            heading: 'Filter by Status',
            text: 'Quickly narrow down your applications by job status.',
        },
        {
            iconLink: sort,
            heading: 'Sort by Date',
            text: 'View applications in ascending or descending order.',
        },
        {
            iconLink: search,
            heading: 'Powerful Search',
            text: 'Search by company or role with results reflected in the URL for easy sharing.',
        }
    ])

    return (
    <div className={styles['landing-page']}>
        <Navbar />
        <div className={styles['page-content']}>
            <h1>Welcome to the Job Application Tracker</h1>
            <p>Track your job applications efficiently and effectively.</p>
            <FeaturesContainer features={features} />
        </div>
        <Footer />
    </div>
  )
}
