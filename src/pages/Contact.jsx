import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container, GoldLine, SectionLabel, SectionTitle, Tag } from '../components/UI'
import api from '../lib/api'
import SEO from '../components/SEO'
import useAnalytics from '../hooks/useAnalytics'

const contactInfo = [
  { label: 'Email', value: 'hassannoor2309@gmail.com', href: 'mailto:hassannoor2309@gmail.com' },
  { label: 'Location', value: 'Pakistan', href: null },
  { label: 'Availability', value: 'Open to Work', href: null },
]

const socialLinks = [
  { name: 'GITHUB', url: 'https://github.com/hassannoor230' },
  { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/hassan-noor-509794325/' },
  { name: 'INSTAGRAM', url: 'https://instagram.com/rana_hassannoor' },
]

export default function ContactPage() {
  useAnalytics()
  const formRef = useRef(null)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', projectType: '', budget: '', timeline: '' })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await api.post('/inquiries', form)
      if (res.data.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '', projectType: '', budget: '', timeline: '' })
      }
    } catch (err) {
      setStatus('error')
      if (err.response?.data?.errors) {
        const fieldErrors = {}
        err.response.data.errors.forEach(e => { fieldErrors[e.field] = e.message })
        setErrors(fieldErrors)
      }
    }
  }

  const inputStyle = {
    width: '100%', background: 'var(--bg-3)', border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 0, color: 'var(--text)', padding: '16px 20px', fontFamily: 'var(--font-body)',
    fontSize: '14px', outline: 'none', transition: 'border-color 0.2s', marginBottom: '4px',
  }
  const errorStyle = { color: '#B07A7A', fontSize: '11px', fontFamily: 'var(--font-body)', letterSpacing: '1px', marginBottom: '12px' }

  return (
    <section id="contact" style={{ padding: '140px 0', background: 'var(--bg-2)', position: 'relative' }}>
      <SEO title="Contact — Hassan Noor" description="Let's build something extraordinary together." />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
      <div style={{ position: 'absolute', bottom: '60px', right: '-20px', fontFamily: 'var(--font-display)', fontSize: '180px', fontWeight: 700, color: 'transparent', WebkitTextStroke: '1px rgba(201,169,110,0.05)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1, whiteSpace: 'nowrap' }}>CONTACT</div>

      <Container ref={sectionRef}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <GoldLine />
            <SectionLabel>Get In Touch</SectionLabel>
          </div>
          <SectionTitle>Let's Create<br /><span style={{ fontWeight: 300, fontStyle: 'italic', color: 'transparent', WebkitTextStroke: '1px rgba(201,169,110,0.6)' }}>Something Extraordinary</span></SectionTitle>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, lineHeight: 1.9, color: 'var(--text-dim)', marginBottom: '48px' }}>
              Have a project in mind, or just want to say hello? I'd love to hear from you. Let's build something remarkable together.
            </p>

            <div style={{ marginBottom: '56px' }}>
              {contactInfo.map((info, i) => (
                <motion.div key={info.label} initial={{ opacity: 0, x: -15 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }} style={{ display: 'flex', flexDirection: 'column', padding: '20px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>{info.label}</span>
                  {info.href ? (
                    <a href={info.href} style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--text)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--text)'}>{info.value}</a>
                  ) : (
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--text)' }}>{info.value}</span>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}>
              <p style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>Follow Me</p>
              <div style={{ display: 'flex', gap: '20px' }}>
                {socialLinks.map(link => (
                  <motion.a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" whileHover={{ color: 'var(--gold)', y: -2 }} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '1px', color: 'var(--text-dim)', textDecoration: 'none', display: 'inline-block', transition: 'color 0.2s' }} data-cursor={link.name}>{link.name}</motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>Your Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Hassan Noor" required style={{ ...inputStyle, borderColor: errors.name ? 'rgba(176,122,122,0.5)' : 'rgba(201,168,76,0.2)' }} onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = errors.name ? 'rgba(176,122,122,0.5)' : 'rgba(201,168,76,0.2)'} />
                  {errors.name && <div style={errorStyle}>{errors.name}</div>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="hello@example.com" required style={{ ...inputStyle, borderColor: errors.email ? 'rgba(176,122,122,0.5)' : 'rgba(201,168,76,0.2)' }} onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = errors.email ? 'rgba(176,122,122,0.5)' : 'rgba(201,168,76,0.2)'} />
                  {errors.email && <div style={errorStyle}>{errors.email}</div>}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Project Inquiry" style={inputStyle} onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>Project Type</label>
                  <input name="projectType" value={form.projectType} onChange={handleChange} placeholder="e.g. E-commerce" style={inputStyle} onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>Budget</label>
                  <input name="budget" value={form.budget} onChange={handleChange} placeholder="$5,000 - $10,000" style={inputStyle} onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>Timeline</label>
                <input name="timeline" value={form.timeline} onChange={handleChange} placeholder="e.g. 2-3 months" style={inputStyle} onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." rows={6} required style={{ ...inputStyle, resize: 'vertical', minHeight: '160px', borderColor: errors.message ? 'rgba(176,122,122,0.5)' : 'rgba(201,168,76,0.2)' }} onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'} onBlur={e => e.target.style.borderColor = errors.message ? 'rgba(176,122,122,0.5)' : 'rgba(201,168,76,0.2)'} />
                {errors.message && <div style={errorStyle}>{errors.message}</div>}
              </div>

              <motion.button type="submit" disabled={status === 'loading'} whileHover={{ scale: 1.02, background: '#E8C97A' }} whileTap={{ scale: 0.98 }} style={{ width: '100%', background: 'var(--gold)', border: 'none', color: 'var(--bg)', padding: '18px 40px', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', opacity: status === 'loading' ? 0.7 : 1, marginTop: '8px' }} data-cursor="Send Message">
                {status === 'loading' ? (
                  <>
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid var(--bg)', borderTopColor: 'transparent', borderRadius: '50%' }} />
                    Sending...
                  </>
                ) : 'Send Message →'}
              </motion.button>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(139, 157, 119, 0.1)', border: '1px solid rgba(139, 157, 119, 0.3)', color: '#8B9D77', fontSize: '13px', fontFamily: 'var(--font-body)', letterSpacing: '1px' }}>
                  Your message has been sent! I'll get back to you shortly.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(176, 122, 122, 0.1)', border: '1px solid rgba(176, 122, 122, 0.3)', color: '#B07A7A', fontSize: '13px', fontFamily: 'var(--font-body)' }}>
                  Something went wrong. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
