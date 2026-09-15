import { useEffect, useState } from 'react'
import { useSettings } from '../contexts/SettingsContext'
import api from '../lib/api'
import SEO from '../components/SEO'
import { GoldLine, SectionLabel, FadeIn } from '../components/SectionHeading'
import Timeline from '../components/Timeline'

export default function Experience() {
  const [experience, setExperience] = useState([])
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)
  const { settings } = useSettings()

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const [expRes, eduRes] = await Promise.all([
          api.get('/experience'),
          api.get('/education'),
        ])
        if (active) {
          setExperience(expRes.data?.data || [])
          setEducation(eduRes.data?.data || [])
        }
      } catch {} finally { if (active) setLoading(false) }
    }
    load()
    return () => { active = false }
  }, [])

  if (loading) return <div className="container" style={{ paddingTop: '6rem' }}>Loading...</div>

  return (
    <>
      <SEO title="Experience | Hassan Noor" description="Professional experience timeline" />

      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <FadeIn>
            <div className="flex-between mb-6" style={{ gap: '1rem' }}>
              <GoldLine />
              <SectionLabel>Experience</SectionLabel>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="display-strong" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>
              Professional Journey
            </h1>
          </FadeIn>

          <div style={{ marginTop: '3rem' }}>
            <Timeline items={experience} />
          </div>
        </div>
      </section>

      {education.length > 0 && (
        <section style={{ padding: '6rem 0' }}>
          <div className="container">
            <FadeIn>
              <h2 className="title-strong" style={{ marginBottom: '2rem', fontSize: '2rem' }}>Education</h2>
            </FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {education.map((edu) => (
                <FadeIn key={edu._id}>
                  <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                    <div className="flex-between" style={{ gap: '1rem', flexWrap: 'wrap' }}>
                      <div>
                        <h3 className="title-strong" style={{ fontSize: '1.1rem' }}>{edu.degree}</h3>
                        <div className="caption text-dim">{edu.institute}</div>
                        {edu.description && <p className="body text-dim" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{edu.description}</p>}
                      </div>
                      <div className="caption text-dim">{edu.year}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
