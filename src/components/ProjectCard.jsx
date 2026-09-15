import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProjectCard({ project, index = 0 }) {
  const layout = index % 3
  const isImageRight = layout === 1

  return (
    <Link to={`/projects/${project.slug}`} className="project-card-link">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="project-card"
      >
        <div className={`project-card-inner ${isImageRight ? 'image-right' : ''}`}>
          <div className="project-image-container">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="project-image"
                loading="lazy"
              />
            ) : (
              <div className="project-placeholder">No image</div>
            )}
          </div>

          <div className="project-content">
            <div className="label text-accent mb-2">{project.category}</div>
            <h3 className="title-strong text-primary mb-2">{project.title}</h3>
            <p className="body text-dim mb-3" style={{ fontSize: '0.9rem' }}>
              {project.description}
            </p>

            {project.technologies && project.technologies.length > 0 && (
              <div className="flex-gap gap-1" style={{ flexWrap: 'wrap', marginTop: '1rem' }}>
                {project.technologies.slice(0, 4).map(tech => (
                  <span key={tech} className="caption text-muted" style={{ backgroundColor: 'var(--surface)', padding: '0.25rem 0.75rem', borderRadius: '0' }}>
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-3 flex-between">
              <span className="caption text-dim">{project.year || '—'}</span>
              <span className="caption text-accent">View Project →</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
