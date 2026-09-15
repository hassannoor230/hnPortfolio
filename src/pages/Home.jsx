import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSettings } from '../contexts/SettingsContext'
import { useScrollReveal } from '../hooks/scroll'
import { MagneticButton, StatNumber, GoldLine, SectionLabel } from './UI'
import { ChevronDown, ArrowRight } from 'lucide-react'
import api from '../lib/api'

export default function Home() {
  const { settings } = useSettings()
  const [projects, setProjects] = useState([])
  const [stats, setStats] = useState({ totalProjects: 0, featuredProjects: 0, resumeDownloads: 0 })
  const ref = useRef(null)
  useScrollReveal()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const [projRes, analyticsRes] = await Promise.all([
          api.get('/projects?limit=6&featured=true'),
          api.get('/analytics/projects'),
        ])
        if (active) {
          setProjects(projRes.data.data || [])
          setStats(analyticsRes.data?.data ? {
            totalProjects: 0, featuredProjects: projRes.data.meta?.total || 0, resumeDownloads: 0,
          } : stats)
        }
      } catch {}
    }
    load()
    return () => { active = false }
  }, [])

  const headline = settings?.headline || 'MERN Stack Developer'
  const name = settings?.siteName || 'Hassan Noor'

  return (
    <section id="home" ref={ref} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <motion.div style={{ y, opacity }} className="container" css={{ width: '100%' }}>
        <div style={{ maxWidth: '950px', paddingTop: '120px', paddingBottom: '80px' }}>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}
          >
            <GoldLine />
            <SectionLabel>Available for new projects</SectionLabel>
          </motion.div>

          <div style={{ overflow: 'hidden', marginBottom: '4px' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(64px, 11vw, 160px)',
                fontWeight: 600, lineHeight: 0.9, color: 'var(--text)', letterSpacing: '-3px',
              }}
            >
              {name.split(' ')[0]}
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '48px' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(64px, 11vw, 160px)',
                fontWeight: 300, fontStyle: 'italic', lineHeight: 0.9,
                color: 'transparent', WebkitTextStroke: '1px rgba(201,169,110,0.65)',
                letterSpacing: '-3px',
              }}
            >
              {name.split(' ')[1] || name}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '17px', fontWeight: 300,
              color: 'var(--text-dim)', maxWidth: '520px', lineHeight: 1.8, marginBottom: '60px',
            }}
          >
            {settings?.bio || 'I build high-performance, scalable web applications with a focus on clean design, technical precision, and user experience.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
          >
            <Link to="/works" data-cursor="View Work">
              <MagneticButton variant="primary">View Selected Work <ArrowRight size={16} /></MagneticButton>
            </Link>
            <Link to="/contact" data-cursor="Get In Touch">
              <MagneticButton variant="ghost">Let's Work Together</MagneticButton>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{
              display: 'flex', gap: '64px', marginTop: '100px', paddingTop: '52px',
              borderTop: '1px solid var(--border)', flexWrap: 'wrap',
            }}
          >
            <StatNumber value={stats.featuredProjects || '0+'} label="Featured Projects" />
            <StatNumber value="5+" label="Years Experience" />
            <StatNumber value="30+" label="Happy Clients" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--text-dim)',
        }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ width: '1px', height: '60px', background: 'linear-gradient(var(--gold), transparent)' }}
        />
      </motion.div>
    </section>
  )
}