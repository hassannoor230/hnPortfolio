import { useEffect, useState } from 'react'
import { useSettings } from '../contexts/SettingsContext'
import api from '../lib/api'
import SEO from '../components/SEO'
import { GoldLine, SectionLabel, FadeIn } from '../components/SectionHeading'
import SkillGrid from '../components/SkillGrid'

export default function Skills() {
  const { settings } = useSettings()

  return (
    <>
      <SEO title="Skills | Hassan Noor" description="Technical skills and expertise" />

      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <FadeIn>
            <div className="flex-between mb-6" style={{ gap: '1rem' }}>
              <GoldLine />
              <SectionLabel>Skills</SectionLabel>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="display-strong" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>
              Technical Expertise
            </h1>
            <p className="body text-dim" style={{ maxWidth: '600px', marginBottom: '3rem', fontSize: '1.1rem' }}>
              Technologies I work with daily, organized by category.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <SkillGrid />
          </FadeIn>
        </div>
      </section>
    </>
  )
}
