import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSettings } from '../contexts/SettingsContext'
import { useScrollReveal, SectionLabel, GoldLine, FadeIn } from '../components/SectionHeading'
import Button from '../components/Button'
import ProjectCard from '../components/ProjectCard'
import api from '../lib/api'
import SEO from '../components/SEO'
import { ArrowRight } from 'lucide-react'

const filters = ['All', 'Full Stack', 'Frontend', 'Backend', 'Design', 'Web3', 'Mobile']

export default function Works() {
  const [projects, setProjects] = useState([])
  const [active, setActive] = useState('All')
  const [loading, setLoading] = useState(true)
  const { settings } = useSettings()

  useEffect(() => {
    let activeFlag = true
    const load = async () => {
      try {
        const res = await api.get('/projects?limit=50')
        if (activeFlag) setProjects(res.data.data || [])
      } catch {} finally { if (activeFlag) setLoading(false) }
    }
    load()
    return () => { activeFlag = false }
  }, [])

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <>
      <SEO title="Work | Hassan Noor" description={settings?.seo?.description || "Portfolio of Hassan Noor, MERN Stack Developer."} />

      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <FadeIn>
            <div className="flex-between mb-6" style={{ gap: '1rem' }}>
              <GoldLine />
              <SectionLabel>Selected Work</SectionLabel>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="display-strong" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.05, marginBottom: '1rem' }}>
              Selected Projects
            </h1>
            <p className="body text-dim" style={{ maxWidth: '600px', marginBottom: '3rem', fontSize: '1.1rem' }}>
              A curated selection of projects spanning full-stack development, performance optimization, and user experience.
            </p>
          </FadeIn>

          {/* Filters */}
          <div className="flex-gap" style={{ gap: '1.5rem', marginBottom: '3rem', flexWrap: 'wrap', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className="label"
                style={{
                  color: active === filter ? 'var(--accent)' : 'var(--text-dim)',
                  borderBottom: active === filter ? '1px solid var(--accent)' : 'transparent',
                  padding: '0.5rem 0',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects */}
          {loading ? (
            <div className="caption text-muted">Loading projects...</div>
          ) : filtered.length === 0 ? (
            <div className="caption text-muted">No projects found.</div>
          ) : (
            <div>
              {filtered.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
