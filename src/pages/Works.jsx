import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSettings } from '../contexts/SettingsContext'
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
      } catch {
        if (activeFlag) setProjects([])
      } finally {
        if (activeFlag) setLoading(false)
      }
    }
    load()
    return () => { activeFlag = false }
  }, [])

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <SEO title="Work | Hassan Noor" description={settings?.seo?.description || 'Portfolio of Hassan Noor, MERN Stack Developer.'} />

      <section className="page-shell">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="section-tag">Selected work</span>
            <h1 className="page-title">Selected Projects</h1>
            <p className="page-copy">
              A curated selection of projects spanning full-stack engineering, performance optimization, and thoughtful product design.
            </p>
          </motion.div>

          <div className="filter-row">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-btn ${active === filter ? 'active' : ''}`}
                onClick={() => setActive(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="empty-state">Loading projects...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">No projects found.</div>
          ) : (
            <div className="project-list-wrap">
              {filtered.map((project, index) => (
                <motion.article
                  key={project._id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  className="portfolio-card"
                >
                  <div className="portfolio-media">
                    {project.thumbnail ? (
                      <img src={project.thumbnail} alt={project.title} loading="lazy" />
                    ) : (
                      <div className="project-placeholder">No preview available</div>
                    )}
                  </div>

                  <div className="portfolio-content">
                    <div className="project-meta">
                      <span>{project.category || 'Product Experience'}</span>
                      <span>{project.year || '2024'}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {(project.technologies || ['React', 'Node.js']).slice(0, 4).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="project-cta">
                      View project
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
