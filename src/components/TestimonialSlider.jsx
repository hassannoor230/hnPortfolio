import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../lib/api'
import { Star } from 'lucide-react'

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/testimonials')
        if (active) {
          const items = res.data.data || []
          setTestimonials(items.filter(t => t.visible !== false))
        }
      } catch {
        if (active) setTestimonials([])
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [])

  if (loading) {
    return <div className="caption text-muted">Loading testimonials...</div>
  }

  if (testimonials.length === 0) {
    return null
  }

  const t = testimonials[current]

  return (
    <div className="testimonial-slider">
      <div className="testimonial-content">
        <div className="flex-gap" style={{ gap: '0.25rem', marginBottom: '1.5rem' }}>
          {Array.from({ length: t.rating || 5 }).map((_, i) => (
            <Star key={i} size={16} color="var(--accent)" fill="var(--accent)" />
          ))}
        </div>
        <blockquote className="title-strong text-primary" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1.2, fontStyle: 'italic', fontWeight: 300 }}>
          "{t.review}"
        </blockquote>
        <div className="mt-4">
          <div className="body text-primary" style={{ fontWeight: 500 }}>{t.clientName}</div>
          <div className="caption text-dim">{t.position && `— ${t.position}`}</div>
          {t.company && (
            <div className="caption text-dim">{t.company}</div>
          )}
        </div>
      </div>

      <div className="testimonial-nav mt-6 flex-between">
        <div className="caption text-dim">
          {current + 1} / {testimonials.length}
        </div>
        <div className="flex-gap" style={{ gap: '1rem' }}>
          <button
            onClick={() => setCurrent(c => (c === 0 ? testimonials.length - 1 : c - 1))}
            className="caption text-dim hover:text-accent"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={() => setCurrent(c => (c + 1) % testimonials.length)}
            className="caption text-dim hover:text-accent"
            aria-label="Next"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  )
}
