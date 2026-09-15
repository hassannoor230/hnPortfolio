import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../lib/api'
import { Send, Check, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' })
      return
    }
    setSubmitting(true)
    setStatus(null)
    try {
      const res = await api.post('/inquiries', form)
      if (res.data.success) {
        setStatus({ type: 'success', message: 'Message sent successfully. I will get back to you soon.' })
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ type: 'error', message: res.data.message || 'Something went wrong.' })
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to send message. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {status && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-gap"
          style={{
            gap: '0.75rem', padding: '1rem', marginBottom: '1.5rem',
            backgroundColor: status.type === 'success' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
            border: `1px solid ${status.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
            borderRadius: '0',
          }}
        >
          {status.type === 'success' ? <Check size={16} color="#22c55e" /> : <AlertCircle size={16} color="#ef4444" />}
          <span className="caption" style={{ color: status.type === 'success' ? '#22c55e' : '#ef4444' }}>
            {status.message}
          </span>
        </motion.div>
      )}

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <input
            type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange}
            required disabled={submitting}
            className="contact-input"
          />
        </div>
        <div>
          <input
            type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}
            required disabled={submitting}
            className="contact-input"
          />
        </div>
      </div>

      <div>
        <input
          type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange}
          disabled={submitting}
          className="contact-input"
        />
      </div>

      <div>
        <textarea
          name="message" placeholder="Message" value={form.message} onChange={handleChange}
          required disabled={submitting} rows={5}
          className="contact-input"
        />
      </div>

      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={{ opacity: submitting ? 0.7 : 1 }}
        className="btn btn--primary"
      >
        {submitting ? 'Sending...' : 'Send Message'}
        {!submitting && <Send size={14} />}
      </motion.button>
    </form>
  )
}
