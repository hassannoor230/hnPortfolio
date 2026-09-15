import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Container, GoldLine, SectionLabel, Tag, LoadingSpinner, EmptyState } from '../components/UI'
import api from '../lib/api'
import SEO from '../components/SEO'
import { ArrowLeft, Github, ExternalLink, Calendar, User } from 'lucide-react'

function FadeIn({ children, delay = 0, y = 30 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>{children}</motion.div>
}

export default function Project() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get(`/projects/${slug}`)
        if (active) {
          setProject(res.data.data || null)
          api.post(`/projects/${slug}/views`).catch(() => {})
        }
      } catch {} finally { if (active) setLoading(false) }
    }
    load()
    return () => { active = false }
  }, [slug])

  if (loading) {
    return <section style={{ padding: '160px 0', background: 'var(--bg)' }}><Container><LoadingSpinner /></Container></section>
  }

  if (!project) {
    return (
      <section style={{ padding: '160px 0', background: 'var(--bg)' }}>
        <SEO title="Project Not Found" noindex />
        <Container>
          <div style={{ textAlign: 'center', padding: '80px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--text)', marginBottom: '16px' }}>Project Not Found</h2>
            <Link to="/works" style={{ color: 'var(--gold)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }} data-cursor="Back">← Back to Works</Link>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section style={{ padding: '160px 0', background: 'var(--bg)', position: 'relative' }}>
      <SEO title={`${project.title} — Hassan Noor`} description={project.description} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
      <Container>
        <FadeIn>
          <Link to="/works" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '40px' }} data-cursor="Back"><ArrowLeft size={16} />Back to Works</Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.05, letterSpacing: '-1px', marginBottom: '16px' }}>{project.title}</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
            <Tag>{project.category}</Tag>
            {project.year && <Tag>{project.year}</Tag>}
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{project.views || 0} views</span>
          </div>
        </FadeIn>

        {project.thumbnail && (
          <FadeIn delay={0.15}>
            <div style={{ aspectRatio: '21/9', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '48px', background: 'var(--surface)' }}>
              <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </div>
          </FadeIn>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          <div>
            <FadeIn delay={0.2}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, lineHeight: 1.8, color: 'var(--text-dim)', marginBottom: '32px' }}>{project.description}</p>
              {project.client && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
                  <User size={16} color="var(--text-dim)" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-dim)' }}><strong style={{ color: 'var(--text)' }}>Client:</strong> {project.client}</span>
                </div>
              )}
              {project.projectType && (
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-dim)', marginBottom: '16px' }}><strong style={{ color: 'var(--text)' }}>Type:</strong> {project.projectType}</div>
              )}
            </FadeIn>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <FadeIn delay={0.25}>
              {(project.githubUrl || project.liveUrl) && (
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {project.githubUrl && (
                    <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }} data-cursor="GitHub">
                      <Github size={16} />GitHub
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }} data-cursor="Live Demo">
                      <ExternalLink size={16} />Live Demo
                    </motion.a>
                  )}
                </div>
              )}
            </FadeIn>

            {project.technologies && project.technologies.length > 0 && (
              <FadeIn delay={0.3}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)' }}>Technologies</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.technologies.map(t => <Tag key={t}>{t}</Tag>)}
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>

        {(project.gallery && project.gallery.length > 0) && (
          <FadeIn delay={0.4}>
            <div style={{ marginTop: '80px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>Gallery</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {project.gallery.map((img, i) => (
                  <div key={i} style={{ aspectRatio: '16/9', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                    <img src={img} alt={`${project.title} gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {(project.problem || project.solution || project.features || project.results || project.process) && (
          <FadeIn delay={0.5}>
            <div style={{ marginTop: '80px' }}>
              {project.problem && (
                <div style={{ marginBottom: '48px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text)', marginBottom: '16px' }}>The Challenge</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, lineHeight: 1.8, color: 'var(--text-dim)' }}>{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div style={{ marginBottom: '48px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text)', marginBottom: '16px' }}>The Solution</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, lineHeight: 1.8, color: 'var(--text-dim)' }}>{project.solution}</p>
                </div>
              )}
              {project.features && project.features.length > 0 && (
                <div style={{ marginBottom: '48px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text)', marginBottom: '16px' }}>Key Features</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {project.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-dim)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {project.process && (
                <div style={{ marginBottom: '48px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text)', marginBottom: '16px' }}>Development Process</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, lineHeight: 1.8, color: 'var(--text-dim)' }}>{project.process}</p>
                </div>
              )}
              {project.results && (
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text)', marginBottom: '16px' }}>Results</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, lineHeight: 1.8, color: 'var(--text-dim)' }}>{project.results}</p>
                </div>
              )}
            </div>
          </FadeIn>
        )}
      </Container>
    </section>
  )
}
