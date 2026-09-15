import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container, GoldLine, SectionLabel, SectionTitle, Tag, EmptyState } from '../components/UI'
import api from '../lib/api'
import SEO from '../components/SEO'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>{children}</motion.div>
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/testimonials')
        if (active) setTestimonials(res.data.data || [])
      } catch {} finally { if (active) setLoading(false) }
    }
    load()
    return () => { active = false }
  }, [])

  return (
    <section id="testimonials" style={{ padding: '160px 0', background: 'var(--bg-2)', position: 'relative' }}>
      <SEO title="Testimonials — Hassan Noor" />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
      <Container>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <GoldLine />
            <SectionLabel>Client Feedback</SectionLabel>
          </div>
          <SectionTitle>What Clients Say</SectionTitle>
        </FadeIn>

        {loading ? (
          <div style={{ marginTop: '80px' }}>
            {[1,2,3].map(i => <div key={i} style={{ height: '200px', background: 'var(--surface)', marginBottom: '24px', animation: 'shimmer 1.5s infinite' }} />)}
          </div>
        ) : testimonials.length === 0 ? (
          <EmptyState title="No testimonials yet" description="Testimonials will appear here once received." />
        ) : (
          <div style={{ marginTop: '80px' }}>
            {testimonials.map((t, i) => (
              <FadeIn key={t._id} delay={i * 0.1}>
                <div style={{ padding: '48px 0', borderBottom: i === testimonials.length - 1 ? 'none' : '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--surface)', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                      {t.clientImage ? <img src={t.clientImage} alt={t.clientName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : t.clientName?.charAt(0) || '?'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <blockquote style={{ fontFamily: 'var(--font-body)', fontSize: '17px', fontWeight: 300, lineHeight: 1.7, color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: '12px' }}>"{t.review}"</blockquote>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--text)' }}>{t.clientName}</span>
                        {t.position && <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-muted)' }}>— {t.position}</span>}
                        {t.company && <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-muted)' }}>— {t.company}</span>}
                        {t.rating && (
                          <div style={{ display: 'flex', gap: '2px', marginLeft: 'auto' }}>
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <span key={idx} style={{ fontFamily: 'var(--font-display)', fontSize: '12px', color: idx < t.rating ? 'var(--gold)' : 'var(--text-muted)' }}>★</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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
