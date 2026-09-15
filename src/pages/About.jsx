import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSettings } from '../contexts/SettingsContext'
import api from '../lib/api'
import SEO from '../components/SEO'
import { GoldLine, SectionLabel, FadeIn } from '../components/SectionHeading'
import Timeline from '../components/Timeline'
import { ExternalLink, Github } from 'lucide-react'

export default function About() {
  const { settings } = useSettings()
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [education, setEducation] = useState([])

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const [skillsRes, expRes, eduRes] = await Promise.all([
          api.get('/skills'),
          api.get('/experience'),
          api.get('/education'),
        ])
        if (active) {
          setSkills(skillsRes.data.data || [])
          setExperience(expRes.data || [])
          setEducation(eduRes.data || [])
        }
      } catch {}
    }
    load()
    return () => { active = false }
  }, [])

  const name = settings?.siteName || 'Hassan Noor'
  const bio = settings?.bio || 'I build high-performance, scalable web applications with a focus on clean design and user experience.'

  return (
    <>
      <SEO title="About | Hassan Noor" description="About Hassan Noor - MERN Stack Developer" />

      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          {/* Header */}
          <FadeIn>
            <div className="flex-between mb-6" style={{ gap: '1rem' }}>
              <GoldLine />
              <SectionLabel>About</SectionLabel>
            </div>
            <h1 className="display-strong" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>
              {name}
            </h1>
          </FadeIn>

          {/* Editorial Layout */}
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '3rem' }}>
            {/* Large Statement */}
            <FadeIn delay={0.1}>
              <div>
                <p className="display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1.2, color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
                  {bio}
                </p>

                {settings?.socials && (
                  <div className="flex-gap" style={{ gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                    {settings.socials.github && (
                      <a href={settings.socials.github} target="_blank" rel="noopener noreferrer" className="flex-gap" style={{ gap: '0.5rem', color: 'var(--text-dim)', textDecoration: 'none' }} data-cursor="GitHub">
                        <Github size={16} /> GitHub
                      </a>
                    )}
                    {settings.socials.linkedin && (
                      <a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex-gap" style={{ gap: '0.5rem', color: 'var(--text-dim)', textDecoration: 'none' }} data-cursor="LinkedIn">
                        <ExternalLink size={16} /> LinkedIn
                      </a>
                    )}
                    {settings.email && (
                      <a href={`mailto:${settings.email}`} className="flex-gap" style={{ gap: '0.5rem', color: 'var(--text-dim)', textDecoration: 'none' }} data-cursor="Email">
                        <ExternalLink size={16} /> {settings.email}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Experience */}
            <FadeIn delay={0.2}>
              <div>
                <h2 className="title-strong" style={{ marginBottom: '2rem', fontSize: '1.75rem' }}>Experience</h2>
                <Timeline items={experience} />
              </div>
            </FadeIn>
          </div>

          {/* Skills Preview */}
          <div style={{ marginTop: '4rem' }}>
            <FadeIn delay={0.3}>
              <h2 className="title-strong" style={{ marginBottom: '2rem', fontSize: '1.75rem' }}>Skills & Expertise</h2>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex-gap" style={{ gap: '1rem', flexWrap: 'wrap' }}>
                {skills.slice(0, 12).map((skill, i) => (
                  <motion.span
                    key={skill._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="body"
                    style={{
                      color: 'var(--text)',
                      padding: '0.4rem 0.85rem',
                      border: '1px solid var(--border)',
                      fontSize: '0.85rem',
                    }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginTop: '4rem' }}>
              <FadeIn delay={0.5}>
                <h2 className="title-strong" style={{ marginBottom: '2rem', fontSize: '1.75rem' }}>Education</h2>
              </FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {education.map((edu) => (
                  <FadeIn key={edu._id} delay={0.6}>
                    <div>
                      <div className="flex-between" style={{ gap: '1rem', flexWrap: 'wrap' }}>
                        <div>
                          <h3 className="title-strong" style={{ fontSize: '1.1rem' }}>{edu.degree}</h3>
                          <div className="caption text-dim">{edu.institute}</div>
                        </div>
                        <div className="caption text-dim">{edu.year}</div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
