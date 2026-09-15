import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container, GoldLine, SectionLabel, SectionTitle, EmptyState } from '../components/UI'
import api from '../lib/api'
import SEO from '../components/SEO'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>
      {children}
    </motion.div>
  )
}

export default function Experience() {
  const [experience, setExperience] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/experience')
        if (active) setExperience(res.data.data || [])
      } catch {} finally { if (active) setLoading(false) }
    }
    load()
    return () => { active = false }
  }, [])

  return (
    <section id="experience" style={{ padding: '160px 0', background: 'var(--bg)', position: 'relative' }}>
      <SEO title="Experience — Hassan Noor" />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
      <Container>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <GoldLine />
            <SectionLabel>Career Timeline</SectionLabel>
          </div>
          <SectionTitle>Professional Experience</SectionTitle>
        </FadeIn>

        {loading ? (
          <div style={{ marginTop: '80px' }}>
            {[1,2,3].map(i => <div key={i} style={{ height: '140px', background: 'var(--surface)', marginBottom: '24px', animation: 'shimmer 1.5s infinite' }} />)}
          </div>
        ) : experience.length === 0 ? (
          <EmptyState title="No experience yet" description="Experience details will be updated from the admin panel." />
        ) : (
          <div style={{ marginTop: '80px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '12px', top: 0, bottom: '0', width: '1px', background: 'var(--border)' }} />
            {experience.map((item, i) => (
              <FadeIn key={item._id} delay={i * 0.1}>
                <div style={{ position: 'relative', paddingLeft: '40px', padding: '32px 0 32px 44px', borderBottom: i === experience.length - 1 ? 'none' : '1px solid var(--border)' }}>
                  <div style={{ position: 'absolute', left: '6px', top: '16px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--gold)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.5vw, 28px)', color: 'var(--text)', lineHeight: 1.1 }}>{item.position}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', whiteSpace: 'nowrap' }}>{item.startDate || ''} — {item.current ? 'Present' : (item.endDate || '')}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-dim)', marginBottom: '16px' }}>{item.company}</div>
                  {item.description && <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: '16px' }}>{item.description}</p>}
                  {item.technologies && item.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {item.technologies.map(t => <span key={t} style={{ fontSize: '11px', letterSpacing: '1px', color: 'var(--text-dim)', padding: '4px 12px', border: '1px solid var(--border)' }}>{t}</span>)}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
