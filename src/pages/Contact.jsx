import { useEffect, useState } from 'react'
import { useSettings } from '../contexts/SettingsContext'
import api from '../lib/api'
import SEO from '../components/SEO'
import Button from '../components/Button'
import { GoldLine, SectionLabel, FadeIn } from '../components/SectionHeading'
import ContactForm from '../components/ContactForm'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'

export default function Contact() {
  const { settings } = useSettings()
  const [resume, setResume] = useState(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await api.get('/resume')
        if (active) {
          const items = res.data || []
          if (items.length > 0) setResume(items.find(r => r.active) || items[0])
        }
      } catch { if (active) setResume(null) }
    }
    load()
    return () => { active = false }
  }, [])

  return (
    <>
      <SEO title="Contact | Hassan Noor" description="Get in touch" />

      <section style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          {/* Header */}
          <FadeIn>
            <div className="flex-between mb-6" style={{ gap: '1rem' }}>
              <GoldLine />
              <SectionLabel>Get In Touch</SectionLabel>
            </div>
          </FadeIn>

          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            {/* Contact Info */}
            <FadeIn delay={0.1}>
              <div>
                <h1 className="display-strong" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                  Let's Build<br />Something Meaningful.
                </h1>
                <p className="body text-dim" style={{ maxWidth: '500px', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                  I'm available for new projects and collaborations. Fill out the form or reach out directly.
                </p>

                <div className="flex-gap" style={{ flexDirection: 'column', gap: '1.5rem' }}>
                  {settings?.email && (
                    <div className="flex-gap" style={{ gap: '1rem', alignItems: 'flex.start' }}>
                      <Mail size={20} color="var(--accent)" />
                      <a href={`mailto:${settings.email}`} className="body text-dim hover:text-accent" style={{ lineHeight: 1.5 }}>{settings.email}</a>
                    </div>
                  )}
                  {settings?.contact?.phone && (
                    <div className="flex-gap" style={{ gap: '1rem', alignItems: 'center' }}>
                      <Phone size={20} color="var(--accent)" />
                      <span className="body text-dim">{settings.contact.phone}</span>
                    </div>
                  )}
                  {settings?.location && (
                    <div className="flex-gap" style={{ gap: '1rem', alignItems: 'center' }}>
                      <MapPin size={20} color="var(--accent)" />
                      <span className="body text-dim">{settings.location}</span>
                    </div>
                  )}
                  {settings?.socials && (
                    <div className="flex-gap" style={{ gap: '1.5rem', marginTop: '0.5rem' }}>
                      {settings.socials.github && (
                        <a href={settings.socials.github} target="_blank" rel="noopener noreferrer" className="flex-center" style={{ width: '40px', height: '40px', border: '1px solid var(--border)', borderRadius: '0' }} aria-label="GitHub">
                          <Github size={16} />
                        </a>
                      )}
                      {settings.socials.linkedin && (
                        <a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex-center" style={{ width: '40px', height: '40px', border: '1px solid var(--border)', borderRadius: '0' }} aria-label="LinkedIn">
                          <Linkedin size={16} />
                        </a>
                      )}
                    </div>
                  )}
                  {resume && resume.file && (
                    <a href={resume.file} target="_blank" rel="noopener noreferrer" download>
                      <Button variant="secondary" size="small">
                        Download Resume
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={0.3}>
              <div>
                <h2 className="title-strong" style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
