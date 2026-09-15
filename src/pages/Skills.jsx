import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container, SectionLabel, SectionTitle, GoldLine, Tag, EmptyState } from '../UI'
import api from '../../lib/api'
import SEO from '../SEO'

function FadeIn({ children, delay = 0, y = 30 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>
      {children}
    </motion.div>
  )
}

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/skills')
        if (active) setSkills(res.data.data || [])
      } catch {} finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [])

  const grouped = {}
  skills.filter(s => s.visible).forEach(s => {
    if (!grouped[s.category]) grouped[s.category] = []
    grouped[s.category].push(s)
  })

  const categories = Object.keys(grouped).sort()

  return (
    <section id="skills" style={{ padding: '160px 0', background: 'var(--bg-2)', position: 'relative' }}>
      <SEO title="Skills — Hassan Noor" />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
      <Container>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <GoldLine />
            <SectionLabel>Technical Expertise</SectionLabel>
          </div>
          <SectionTitle>Skills &amp; Technologies</SectionTitle>
        </FadeIn>

        {loading ? (
          <div style={{ marginTop: '80px' }}>
            {[1, 2, 3].map(i => <div key={i} style={{ height: '120px', background: 'var(--surface)', marginBottom: '24px', animation: 'shimmer 1.5s infinite' }} />)}
          </div>
        ) : categories.length === 0 ? (
          <EmptyState title="No skills yet" description="Skills will be updated from the admin panel." />
        ) : (
          <div style={{ marginTop: '80px' }}>
            {categories.map(category => (
              <FadeIn key={category} delay={0.2}>
                <div style={{ marginBottom: '48px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>{category}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
                    {grouped[category].map(skill => (
                      <div key={skill._id} style={{ padding: '16px', border: '1px solid var(--border)', background: 'var(--surface)', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '8px' }}>{skill.name}</div>
                        <div style={{ height: '4px', background: 'var(--bg)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: `${skill.level || 80}%`, height: '100%', background: 'var(--gold)' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
