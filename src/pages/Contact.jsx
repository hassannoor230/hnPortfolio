import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSettings } from '../contexts/SettingsContext'
import api from '../lib/api'
import SEO from '../components/SEO'
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
          if (items.length > 0) setResume(items.find((r) => r.active) || items[0])
        }
      } catch {
        if (active) setResume(null)
      }
    }
    load()
    return () => { active = false }
  }, [])

  return (
    <>
      <SEO title="Contact | Hassan Noor" description="Get in touch" />

      <section className="page-shell">
        <div className="container contact-grid">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="contact-copy">
            <span className="section-tag">Let&apos;s build</span>
            <h1 className="page-title">Something meaningful.</h1>
            <p className="page-copy">
              I&apos;m available for select product, brand, and web experiences. Reach out for a premium website, MVP, or polished digital refresh.
            </p>

            <div className="contact-list">
              {settings?.email && (
                <a href={`mailto:${settings.email}`} data-cursor="Email">
                  <Mail size={18} />
                  <span>{settings.email}</span>
                </a>
              )}
              {settings?.contact?.phone && (
                <div>
                  <Phone size={18} />
                  <span>{settings.contact.phone}</span>
                </div>
              )}
              {settings?.location && (
                <div>
                  <MapPin size={18} />
                  <span>{settings.location}</span>
                </div>
              )}
            </div>

            {settings?.socials && (
              <div className="social-row compact">
                {settings.socials.github && (
                  <a href={settings.socials.github} target="_blank" rel="noreferrer" data-cursor="GitHub">
                    <Github size={16} />
                  </a>
                )}
                {settings.socials.linkedin && (
                  <a href={settings.socials.linkedin} target="_blank" rel="noreferrer" data-cursor="LinkedIn">
                    <Linkedin size={16} />
                  </a>
                )}
              </div>
            )}

            {resume && resume.file && (
              <a href={resume.file} target="_blank" rel="noreferrer" className="btn btn--secondary" download>
                Download Resume
              </a>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="contact-form-panel">
            <h2>Send a Message</h2>
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  )
}
