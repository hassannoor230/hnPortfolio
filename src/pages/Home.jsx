import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSettings } from '../contexts/SettingsContext'
import api from '../lib/api'
import { FadeIn, GoldLine, SectionLabel, StatNumber } from '../components/SectionHeading'
import Button from '../components/Button'
import ProjectCard from '../components/ProjectCard'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function Home() {
  const { settings } = useSettings()
  const [projects, setProjects] = useState([])
  const [stats, setStats] = useState({ totalProjects: 0, featuredProjects: 0 })
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/projects?featured=true&limit=4')
        if (active) setProjects(res.data.data || [])
        if (active) setStats({
          featuredProjects: res.data.meta?.total || 0,
          totalProjects: res.data.meta?.total || 0,
        })
      } catch {}
    }
    load()
    return () => { active = false }
  }, [])

  const name = settings?.siteName || 'Hassan Noor'
  const headline = settings?.headline || 'MERN Stack Developer'
  const bio = settings?.bio || 'I build high-performance, scalable web applications with a focus on clean design and user experience.'
  const firstName = name.split(' ')[0] || 'Hassan'
  const lastName = name.split(' ').slice(1).join(' ') || 'Noor'

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div style={{ y, opacity, maxWidth: '900px' }} className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-between mb-5"
            style={{ gap: '1rem' }}
          >
            <GoldLine />
            <SectionLabel>{settings?.availability || 'Available for new projects'}</SectionLabel>
          </motion.div>

          <div className="hero-headline">
            <motion.h1
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="display-strong"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 8rem)', lineHeight: 1, marginBottom: '0.25rem' }}
            >
              {firstName}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="display"
              style={{
                fontSize: 'clamp(3.5rem, 11vw, 8rem)',
                lineHeight: 1,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(201, 169, 110, 0.2)',
                marginBottom: '1rem',
              }}
            >
              {lastName}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="body text-dim"
            style={{ maxWidth: '520px', marginBottom: '2.5rem', fontSize: '1.1rem' }}
          >
            {bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex-gap"
            style={{ gap: '1.5rem', flexWrap: 'wrap' }}
          >
            <Link to="/works">
              <Button variant="primary" size="large">
                View Selected Work <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" size="large">
                Let's Work Together
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="hero-scroll"
          style={{ position: 'absolute', bottom: '4rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
        >
          <span className="label text-muted">Scroll</span>
          <motion.div
            animate={{ height: ['0px', '24px', '0px'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', background: 'linear-gradient(var(--accent), transparent)' }}
          />
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{ padding: '4rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '2rem' }}>
            <StatNumber value={stats.featuredProjects} label="Projects Delivered" />
            <StatNumber value={headline} label="Specialization" />
            <StatNumber value={stats.totalProjects} label="Years Building" />
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <FadeIn>
            <div className="flex-between mb-6" style={{ gap: '1rem' }}>
              <GoldLine />
              <SectionLabel>Selected Work</SectionLabel>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="display-strong" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '3rem' }}>
              Featured Projects
            </h2>
          </FadeIn>
          <div>
            {projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
          {projects.length === 0 && (
            <div className="caption text-muted" style={{ textAlign: 'center', padding: '3rem 0' }}>
              Projects will appear here once added through the admin panel.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
