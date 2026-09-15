import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../lib/api'

const skillCategories = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  Backend: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs'],
  Database: ['MongoDB', 'PostgreSQL', 'Redis', 'Mongoose'],
  Tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Webpack'],
}

export default function SkillGrid() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/skills')
        if (active) setSkills(res.data.data || [])
      } catch {
        if (active) setSkills([])
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [])

  const grouped = {}
  skills.forEach(skill => {
    const cat = skill.category || 'Other'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(skill)
  })

  const categories = Object.keys(grouped)

  return (
    <div className="skill-grid">
      {loading ? (
        <div className="caption text-muted">Loading skills...</div>
      ) : categories.length === 0 ? (
        <div className="caption text-muted">Skills will be added through the admin panel.</div>
      ) : (
        categories.map(cat => (
          <div key={cat} className="skill-category">
            <div className="label text-accent mb-3">{cat}</div>
            <div className="flex-gap" style={{ flexWrap: 'wrap', gap: '2rem' }}>
              {grouped[cat].map((skill, i) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="skill-item"
                >
                  <span className="body text-primary" style={{ fontWeight: 500 }}>
                    {skill.name}
                  </span>
                  {skill.level !== undefined && (
                    <span className="caption text-dim">
                      {skill.level}%
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
