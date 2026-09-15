import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useScrollReveal } from '../hooks/scroll'
import { Container, SectionLabel, SectionTitle, GoldLine, Tag, EmptyState, LoadingSpinner } from '../components/UI'
import api from '../lib/api'

const filters = ['All', 'Full Stack', 'Frontend', 'Backend', 'Design', 'Web3', 'Mobile', 'Other']

export default function Works() {
  const [projects, setProjects] = useState([])
  const [active, setActive] = useState('All')
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useScrollReveal()

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
    <section id="works" style={{ padding: '160px 0 120px', background: 'var(--bg)' }}>
      <Container>
        <div ref={ref} style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <GoldLine />
            <SectionLabel>Selected Work</SectionLabel>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <SectionTitle>Case studies &amp; projects</SectionTitle>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {filters.map((f) => (
                <button key={f} onClick={() => setActive(f)} style={{
                  padding: '8px 16px', border: '1px solid', borderColor: active === f ? 'var(--gold)' : 'var(--border)',
                  background: active === f ? 'var(--gold)' : 'transparent', color: active === f ? 'var(--bg)' : 'var(--text-dim)',
                  fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>{f}</button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ height: '120px', background: 'var(--surface)', animation: 'shimmer 1.5s infinite' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={null} title="No projects yet" description="Projects will appear here once added through the admin panel." />
        ) : (
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '30px', alignItems: 'center', padding: '28px 0', borderTop: '1px solid var(--border)' }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--text-muted)' }}>{String(i + 1).padStart(2, '0')}</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', minWidth: 0 }}>
                  <Link to={`/projects/${project.slug}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                    <div style={{ width: '90px', height: '90px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                      {project.thumbnail ? (
                        <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s var(--ease)' }} />
                      ) : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '11px' }}>No image</div>}
                    </div>
                  </Link>
                  <div style={{ minWidth: 0 }}>
                    <Link to={`/projects/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.5vw, 30px)', color: 'var(--text)', transition: 'color 0.2s', lineHeight: 1.2 }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text)'}>{project.title}                    </h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '6px', maxWidth: '560px', lineHeight: 1.6 }}>{project.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                      {(project.technologies || []).slice(0, 4).map((t) => <Tag key={t}>{t}</Tag>)}
                    </div>
                  </Link>
                </div>
              </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '6px' }}>{project.year || '—'}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>{project.category}</div>
                  <Link to={`/projects/${project.slug}`} data-cursor="View Project" style={{ textDecoration: 'none' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text)', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text)'}>
                      View Project →
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </Container>
    </section>
  )
}