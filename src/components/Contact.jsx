import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

// ─── EmailJS Config ───────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_h62545q'
const EMAILJS_TEMPLATE_ID = 'template_89n47xm'
const EMAILJS_PUBLIC_KEY = 'pMstZyz5dgvhLrVwF'
// ─────────────────────────────────────────────────────────────

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

export default function Contact() {
  const formRef = useRef(null)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('loading')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--bg-3)',
    border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 0,
    color: 'var(--text)',
    padding: '16px 20px',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    marginBottom: '16px',
  }

  return (
    <section id="contact" style={{ padding: '140px 0', background: 'var(--bg-2)', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
      }} />

      {/* Background text */}
      <div style={{
        position: 'absolute',
        bottom: '60px',
        right: '-20px',
        fontFamily: 'var(--font-display)',
        fontSize: '180px',
        fontWeight: 700,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(201,168,76,0.05)',
        userSelect: 'none',
        pointerEvents: 'none',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}>CONTACT</div>

      <div className="container" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '80px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ display: 'block', width: '48px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
              Get In Touch
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            color: 'var(--text)',
            lineHeight: 1.05,
            letterSpacing: '-1px',
          }}>
            Let's Create<br />
            <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'transparent', WebkitTextStroke: '1px rgba(201,168,76,0.6)' }}>
              Something Extraordinary
            </span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', alignItems: 'start' }}>

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              lineHeight: 1.9,
              color: 'var(--text-dim)',
              marginBottom: '48px',
            }}>
              Have a project in mind, or just want to say hello? 
              I'd love to hear from you. Let's build something 
              remarkable together.
            </p>

            <div style={{ marginBottom: '56px' }}>
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px 0',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>
                    {info.label}
                  </span>
                  {info.href ? (
                    <a
                      href={info.href}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '18px',
                        color: 'var(--text)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text)'}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--text)' }}>
                      {info.value}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              <p style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
                Follow Me
              </p>
              <div style={{ display: 'flex', gap: '20px' }}>
                {socialLinks.map(link => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ color: 'var(--gold)', y: -2 }}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      letterSpacing: '1px',
                      color: 'var(--text-dim)',
                      textDecoration: 'none',
                      display: 'inline-block',
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <form ref={formRef} onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '0' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                    Your Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Hassan Noor"
                    required
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    required
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '160px' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02, background: '#E8C97A' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  background: 'var(--gold)',
                  border: 'none',
                  color: 'var(--bg)',
                  padding: '18px 40px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  opacity: status === 'loading' ? 0.7 : 1,
                  marginTop: '8px',
                }}
              >
                {status === 'loading' ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid var(--bg)', borderTopColor: 'transparent', borderRadius: '50%' }}
                    />
                    Sending...
                  </>
                ) : 'Send Message →'}
              </motion.button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: '16px',
                    padding: '16px 20px',
                    background: 'rgba(139, 157, 119, 0.1)',
                    border: '1px solid rgba(139, 157, 119, 0.3)',
                    color: '#8B9D77',
                    fontSize: '13px',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '1px',
                  }}
                >
                  ✓ Your message has been sent! I'll get back to you shortly.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: '16px',
                    padding: '16px 20px',
                    background: 'rgba(176, 122, 122, 0.1)',
                    border: '1px solid rgba(176, 122, 122, 0.3)',
                    color: '#B07A7A',
                    fontSize: '13px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  ✗ Something went wrong. Please check EmailJS configuration or try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* ─── Responsive CSS ─── */}
      <style>{`

        /* Large screens */
        @media (max-width: 1200px){
          #contact { padding:120px 20px !important; }
          #contact .container { padding:0 20px; }
          #contact > div:nth-child(2){ font-size:140px !important; right:-10px !important; }
        }

        /* Tablet */
        @media (max-width: 992px){
          #contact { padding:100px 20px !important; }
          #contact .container > div:last-child{ grid-template-columns:1fr !important; gap:60px !important; }
          #contact > div:nth-child(2){ font-size:120px !important; right:-10px !important; }
        }

        /* Mobile */
        @media (max-width: 768px){
          #contact { padding:90px 16px !important; }
          #contact .container{ padding:0 10px; }
          #contact .container > div:last-child{ grid-template-columns:1fr !important; gap:48px !important; }
          #contact form > div:first-child{ grid-template-columns:1fr !important; }
          #contact textarea{ min-height:140px !important; }
          #contact > div:nth-child(2){ font-size:90px !important; bottom:20px !important; right:-10px !important; }
        }

        /* Small phones */
        @media (max-width: 480px){
          #contact{ padding:80px 14px !important; }
          #contact h2{ font-size:32px !important; }
          #contact > div:nth-child(2){ display:none; }
          #contact button{ padding:16px 20px !important; font-size:11px !important; }
        }

      `}</style>
    </section>
  )
}