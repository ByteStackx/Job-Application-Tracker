import React from 'react'
import { FeatureCard, type FeatureCardProps } from '../components/FeatureCard'
import styles from '../styles/FeatureContainer.module.css'

type FeaturesContainerProps = {
  features: FeatureCardProps[]
}

export const FeaturesContainer: React.FC<FeaturesContainerProps> = ({ features }) => {
  return (
    <div className={styles['features-container']}>
        {
            features && features.length > 0 && features.map((feature) => (
                <FeatureCard
                    key={feature.heading}
                    iconLink={feature.iconLink}
                    heading={feature.heading}
                    text={feature.text}
                />
            ))
        }
    </div>
  )
}
