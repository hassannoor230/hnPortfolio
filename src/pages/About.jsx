import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSettings } from '../contexts/SettingsContext'
import api from '../lib/api'
import SEO from '../components/SEO'
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
      } catch {
        if (active) {
          setSkills([])
          setExperience([])
          setEducation([])
        }
      }
    }
    load()
    return () => { active = false }
  }, [])

  const name = settings?.siteName || 'Hassan Noor'
  const bio = settings?.bio || 'I build high-performance digital experiences that feel premium, intentional, and effortless for users.'

  return (
    <>
      <SEO title="About | Hassan Noor" description="About Hassan Noor - MERN Stack Developer" />

      <section className="page-shell">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="section-tag">About</span>
            <h1 className="page-title">{name}</h1>
          </motion.div>

          <div className="about-grid">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.8 }} className="about-story">
              <p>{bio}</p>
              <p>
                I work at the intersection of product thinking, polished frontend craft, and scalable MERN architecture — creating experiences that feel refined, clear, and conversion-first.
              </p>

              {settings?.socials && (
                <div className="social-row">
                  {settings.socials.github && (
                    <a href={settings.socials.github} target="_blank" rel="noopener noreferrer" data-cursor="GitHub">
                      <Github size={16} /> GitHub
                    </a>
                  )}
                  {settings.socials.linkedin && (
                    <a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="LinkedIn">
                      <ExternalLink size={16} /> LinkedIn
                    </a>
                  )}
                  {settings.email && (
                    <a href={`mailto:${settings.email}`} data-cursor="Email">
                      <ExternalLink size={16} /> {settings.email}
                    </a>
                  )}
                </div>
              )}
            </motion.div>

            <motion.aside initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.8 }} className="info-panel">
              <h3>Experience</h3>
              <div className="timeline-list">
                {experience.length === 0 ? (
                  <p className="muted-text">Experience details will appear here.</p>
                ) : (
                  experience.map((item) => (
                    <div key={item._id || item.title} className="timeline-item">
                      <span>{item.period || item.year || 'Present'}</span>
                      <div>
                        <strong>{item.title || item.role}</strong>
                        <p>{item.company || item.institute || 'Professional role'}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.aside>
          </div>

          <div className="skill-block">
            <h2>Core capabilities</h2>
            <div className="skills-grid">
              {skills.length === 0 ? (
                <span className="skill-pill">Skills coming soon</span>
              ) : (
                skills.slice(0, 12).map((skill, idx) => (
                  <motion.span
                    key={skill._id || skill.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03 }}
                    className="skill-pill"
                  >
                    {skill.name}
                  </motion.span>
                ))
              )}
            </div>
          </div>

          {education.length > 0 && (
            <div className="education-block">
              <h2>Education</h2>
              <div className="education-list">
                {education.map((edu) => (
                  <div key={edu._id || edu.degree} className="education-item">
                    <div>
                      <strong>{edu.degree}</strong>
                      <p>{edu.institute}</p>
                    </div>
                    <span>{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
