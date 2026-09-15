import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams, useNavigate } from 'react-router-dom'
import api from '../lib/api'
import SEO from '../components/SEO'
import Button from '../components/Button'
import { GoldLine, SectionLabel, FadeIn } from '../components/SectionHeading'
import { ArrowLeft, Github, ExternalLink, Calendar, User } from 'lucide-react'

export default function Project() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get(`/projects/${slug}`)
        if (active) setProject(res.data.data)
      } catch (err) {
        if (active) setNotFound(true)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [slug])

  useEffect(() => {
    if (project) {
      api.post(`/projects/${slug}/views`).catch(() => {})
    }
  }, [project, slug])

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <div className="caption text-muted">Loading project...</div>
      </div>
    )
  }

  if (notFound || !project) {
    return (
      <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <h1 className="display-strong">Project not found</h1>
        <Link to="/works" className="mt-4 inline-block caption text-accent">
          ← Back to Work
        </Link>
      </div>
    )
  }

  return (
    <>
      <SEO title={project.title} description={project.description} />

      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <FadeIn>
            <Link to="/works" className="flex-gap caption text-dim hover:text-accent" style={{ gap: '0.5rem', marginBottom: '3rem' }}>
              <ArrowLeft size={14} /> Back to Work
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex-between mb-6" style={{ gap: '1rem' }}>
              <GoldLine />
              <SectionLabel>{project.category}</SectionLabel>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="display-strong" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>
              {project.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="body text-dim" style={{ maxWidth: '700px', marginBottom: '3rem', fontSize: '1.1rem' }}>
              {project.description}
            </p>
          </FadeIn>

          {/* Hero Image */}
          <FadeIn delay={0.4}>
            <div className="project-hero-image" style={{ marginBottom: '4rem' }}>
              {project.thumbnail ? (
                <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: 'auto', display: 'block' }} loading="eager" />
              ) : (
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No hero image
                </div>
              )}
            </div>
          </FadeIn>

          {/* Meta */}
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
            <FadeIn delay={0.5}>
              <div>
                <div className="label text-accent mb-2">Details</div>
                <div className="flex-gap" style={{ flexDirection: 'column', gap: '0.75rem' }}>
                  {project.year && (
                    <div className="flex-gap" style={{ gap: '0.5rem', alignItems: 'center' }}>
                      <Calendar size={16} color="var(--text-dim)" />
                      <span className="caption text-dim">{project.year}</span>
                    </div>
                  )}
                  {project.client && (
                    <div className="flex-gap" style={{ gap: '0.5rem', alignItems: 'center' }}>
                      <User size={16} color="var(--text-dim)" />
                      <span className="caption text-dim">{project.client}</span>
                    </div>
                  )}
                  {project.projectType && (
                    <div className="flex-gap" style={{ gap: '0.5rem', alignItems: 'center' }}>
                      <span className="caption text-dim">Type: {project.projectType}</span>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div>
                <div className="label text-accent mb-2">Links</div>
                <div className="flex-gap" style={{ flexDirection: 'column', gap: '0.75rem' }}>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-gap" style={{ gap: '0.5rem', color: 'var(--text-dim)', textDecoration: 'none' }}>
                      <ExternalLink size={16} /> Live Website
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-gap" style={{ gap: '0.5rem', color: 'var(--text-dim)', textDecoration: 'none' }}>
                      <Github size={16} /> GitHub Repository
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <FadeIn delay={0.7}>
              <div style={{ marginBottom: '4rem' }}>
                <div className="label text-accent mb-3">Technologies</div>
                <div className="flex-gap" style={{ gap: '0.75rem', flexWrap: 'wrap' }}>
                  {project.technologies.map(tech => (
                    <span key={tech} className="body" style={{ color: 'var(--text)', padding: '0.25rem 0.75rem', border: '1px solid var(--border)', fontSize: '0.85rem' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Problem */}
          {project.problem && (
            <FadeIn delay={0.8}>
              <div style={{ marginBottom: '3rem' }}>
                <div className="label text-accent mb-3">Challenge</div>
                <p className="body text-dim">{project.problem}</p>
              </div>
            </FadeIn>
          )}

          {/* Solution */}
          {project.solution && (
            <FadeIn delay={0.9}>
              <div style={{ marginBottom: '3rem' }}>
                <div className="label text-accent mb-3">Solution</div>
                <p className="body text-dim">{project.solution}</p>
              </div>
            </FadeIn>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <FadeIn delay={1}>
              <div style={{ marginBottom: '4rem' }}>
                <div className="label text-accent mb-3">Features</div>
                <ul className="flex-gap" style={{ flexDirection: 'column', gap: '0.5rem' }}>
                  {project.features.map((feature, i) => (
                    <li key={i} className="caption text-dim" style={{ listStyle: 'none' }}>
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <FadeIn delay={1.1}>
              <div style={{ marginBottom: '4rem' }}>
                <div className="label text-accent mb-3">Gallery</div>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  {project.gallery.map((img, i) => (
                    <img key={i} src={img} alt={`${project.title} gallery ${i + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Results */}
          {project.results && (
            <FadeIn delay={1.2}>
              <div style={{ marginBottom: '4rem' }}>
                <div className="label text-accent mb-3">Results</div>
                <p className="body text-dim">{project.results}</p>
              </div>
            </FadeIn>
          )}

          {/* CTA */}
          <FadeIn delay={1.3}>
            <div className="flex-between mt-6" style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 className="title-strong">Let's Discuss a Project</h3>
                <p className="body text-dim" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  Have a project in mind? Let's build something meaningful.
                </p>
              </div>
              <Link to="/contact">
                <Button variant="primary" size="medium">
                  Get In Touch <ExternalLink size={14} />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
