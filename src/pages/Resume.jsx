import { useEffect, useState } from 'react'
import { useSettings } from '../contexts/SettingsContext'
import api from '../lib/api'
import SEO from '../components/SEO'
import { GoldLine, SectionLabel, FadeIn } from '../components/SectionHeading'
import { Download, FileText, Calendar } from 'lucide-react'

export default function Resume() {
  const { settings } = useSettings()
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/resume')
        if (active) {
          const data = res.data?.data
          if (data) setResume(data)
        }
      } catch { if (active) setResume(null) }
      finally { if (active) setLoading(false) }
    }
    load()
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (resume && resume._id) {
      api.post(`/resume/${resume._id}/download`).catch(() => {})
    }
  }, [resume])

  if (loading) {
    return (
      <>
        <SEO title="Resume | Hassan Noor" description="Professional resume" />
        <div className="container" style={{ paddingTop: '6rem' }}>Loading...</div>
      </>
    )
  }

  return (
    <>
      <SEO title="Resume | Hassan Noor" description="Professional resume and experience" />

      <section style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <div className="flex-between mb-6" style={{ gap: '1rem' }}>
              <GoldLine />
              <SectionLabel>Resume</SectionLabel>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="display-strong" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>
              {settings?.siteName || 'Hassan Noor'}
            </h1>
            <p className="body text-dim" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
              {settings?.headline || 'MERN Stack Developer'}
            </p>
          </FadeIn>

          {resume && resume.fileUrl ? (
            <FadeIn delay={0.2}>
              <div className="resume-download" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
                <div className="flex-center" style={{ gap: '1rem', marginBottom: '1.5rem', flexDirection: 'column' }}>
                  <FileText size={48} color="var(--accent)" />
                  <div>
                    <h3 className="title-strong text-primary">{resume.title || 'Download Resume'}</h3>
                  </div>
                </div>
                <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer" download>
                  <button className="btn btn--primary">
                    <Download size={16} /> Download Resume (PDF)
                  </button>
                </a>
                <div className="caption text-dim" style={{ marginTop: '1rem' }}>
                  You can also <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer" className="text-accent">view it online</a>.
                </div>
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={0.2}>
              <div className="caption text-muted" style={{ textAlign: 'center', padding: '3rem' }}>
                Resume is not yet available. Please check back later or contact via email.
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.3}>
            <div style={{ marginTop: '3rem', padding: '2rem 0', borderTop: '1px solid var(--border)' }}>
              <div className="flex-between" style={{ gap: '1rem', flexWrap: 'wrap' }}>
                {settings?.email && (
                  <div className="flex-gap" style={{ gap: '0.5rem', alignItems: 'center' }}>
                    <Calendar size={16} color="var(--accent)" />
                    <span className="caption text-dim">{settings.email}</span>
                  </div>
                )}
                {settings?.location && (
                  <div className="flex-gap" style={{ gap: '0.5rem', alignItems: 'center' }}>
                    <Calendar size={16} color="var(--accent)" />
                    <span className="caption text-dim">{settings.location}</span>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
