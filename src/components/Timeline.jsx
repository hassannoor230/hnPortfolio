import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../lib/api'

export default function Timeline({ items: itemsProp }) {
  const [items, setItems] = useState(itemsProp || [])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (itemsProp) {
      setItems(itemsProp)
    } else {
      setLoading(true)
      let active = true
      const load = async () => {
        try {
          const res = await api.get('/experience')
          if (active) setItems(res.data.data || [])
        } catch {
          if (active) setItems([])
        } finally {
          if (active) setLoading(false)
        }
      }
      load()
      return () => { active = false }
    }
  }, [itemsProp])

  if (loading) {
    return <div className="caption text-muted">Loading experience...</div>
  }

  if (items.length === 0) {
    return <div className="caption text-muted">Experience will be added through the admin panel.</div>
  }

  return (
    <div className="timeline">
      {items.map((item, i) => (
        <motion.div
          key={item._id}
          className="timeline-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <div className="timeline-date label text-accent">
            {item.startDate} — {item.current ? 'Present' : (item.endDate || '—')}
          </div>
          <div className="timeline-content">
            <h3 className="title-strong text-primary">{item.position}</h3>
            <div className="body text-dim" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {item.company}
            </div>
            {item.technologies && item.technologies.length > 0 && (
              <div className="flex-gap" style={{ gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                {item.technologies.map(tech => (
                  <span key={tech} className="caption text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {item.description && (
              <p className="body text-dim" style={{ fontSize: '0.85rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                {item.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
