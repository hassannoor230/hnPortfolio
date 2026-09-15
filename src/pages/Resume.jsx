import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSettings } from '../contexts/SettingsContext'
import { Container, GoldLine, SectionLabel, SectionTitle, EmptyState } from '../components/UI'
import api from '../lib/api'
import SEO from '../components/SEO'
import { Download, FileText } from 'lucide-react'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>{children}</motion.div>
}

export default function Resume() {
  const { settings } = useSettings()
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/resume')
        if (active) setResume(res.data.data || null)
      } catch {} finally { if (active) setLoading(false) }
    }
    load()
    return () => { active = false }
  }, [])

  const handleDownload = () => {
    if (resume?.fileUrl) {
      api.post(`/resume/${resume._id}/download`).catch(() => {})
      window.open(resume.fileUrl, '_blank')
    }
  }

  return (
    <section id="resume" style={{ padding: '160px 0', background: 'var(--bg-2)', position: 'relative' }}>
      <SEO title="Resume — Hassan Noor" />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
      <Container>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <GoldLine />
            <SectionLabel>Curriculum Vitae</SectionLabel>
          </div>
          <SectionTitle>Resume</SectionTitle>
        </FadeIn>

        {loading ? (
          <div style={{ marginTop: '80px', height: '400px', background: 'var(--surface)', animation: 'shimmer 1.5s infinite' }} />
        ) : !resume ? (
          <div style={{ marginTop: '80px' }}>
            <EmptyState title="Resume not available" description="Resume will be uploaded from the admin panel." />
          </div>
        ) : (
          <FadeIn delay={0.2}>
            <div style={{ marginTop: '60px', background: 'var(--surface)', border: '1px solid var(--border)', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>
              <FileText size={48} color="var(--gold)" />
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--text)', marginBottom: '8px' }}>{resume.title || 'Resume'}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
                  {resume.fileName && `${resume.fileName} • ${(resume.fileSize / 1024).toFixed(0)} KB`}
                </p>
              </div>
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: 'var(--gold)', border: 'none', color: 'var(--bg)',
                  padding: '16px 48px', fontFamily: 'var(--font-body)', fontSize: '12px',
                  letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                data-cursor="Download CV"
              >
                <Download size={16} />Download Resume
              </motion.button>
            </div>
          </FadeIn>
        )}
      </Container>
    </section>
  )
}
