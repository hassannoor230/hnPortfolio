import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import SEO from '../components/SEO'
import { GoldLine, SectionLabel, FadeIn } from '../components/SectionHeading'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/testimonials')
        if (active) {
          const items = res.data.data || []
          setTestimonials(items.filter(t => t.visible !== false))
          if (items.length > 0) setSelected(items[0])
        }
      } catch { if (active) setTestimonials([]) }
      finally { if (active) setLoading(false) }
    }
    load()
    return () => { active = false }
  }, [])

  if (loading || testimonials.length === 0) {
    return (
      <>
        <SEO title="Testimonials | Hassan Noor" description="Client testimonials" />
        <section style={{ padding: '6rem 0' }}>
          <div className="container">
            <FadeIn>
              <div className="flex-between mb-6" style={{ gap: '1rem' }}>
                <GoldLine />
                <SectionLabel>Testimonials</SectionLabel>
              </div>
            </FadeIn>
            <h1 className="display-strong" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '2rem' }}>
              What Clients Say
            </h1>
            <p className="body text-dim">
              {loading ? 'Loading testimonials...' : 'No testimonials available yet. Check back soon!'}
            </p>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO title="Testimonials | Hassan Noor" description="Client testimonials" />

      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <FadeIn>
            <div className="flex-between mb-6" style={{ gap: '1rem' }}>
              <GoldLine />
              <SectionLabel>Social Proof</SectionLabel>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="display-strong" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '2rem' }}>
              Client Testimonials
            </h1>
          </FadeIn>

          <div className="grid" style={{ gridTemplateColumns: '1fr 400px', gap: '4rem' }}>
            {/* Featured Testimonial */}
            <FadeIn delay={0.2}>
              <div className="testimonial-featured" style={{ padding: '2rem 0' }}>
                {selected && (
                  <>
                    <div className="label text-accent mb-3">
                      {Array.from({ length: selected.rating || 5 }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <blockquote className="title-strong" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.3, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                      "{selected.review}"
                    </blockquote>
                    <div>
                      <div className="body text-primary" style={{ fontWeight: 500 }}>{selected.clientName}</div>
                      <div className="caption text-dim">{selected.position}</div>
                      {selected.company && (
                        <div className="caption text-dim">{selected.company}</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </FadeIn>

            {/* List */}
            <FadeIn delay={0.3}>
              <div className="testimonial-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '600px', overflowY: 'auto' }}>
                {testimonials.map((t) => (
                  <button
                    key={t._id}
                    onClick={() => setSelected(t)}
                    className="testimonial-item"
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--border)',
                      background: selected?._id === t._id ? 'var(--accent-soft)' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div className="flex-gap" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <span key={i} style={{ color: i < (t.rating || 0) ? 'var(--accent)' : 'var(--text-muted)', fontSize: '0.75rem' }}>★</span>
                      ))}
                    </div>
                    <div className="caption text-primary" style={{ fontWeight: 500 }}>{t.clientName}</div>
                    <div className="caption text-dim">{t.position} {t.company && `— ${t.company}`}</div>
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
