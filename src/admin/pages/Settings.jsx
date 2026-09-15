import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '../api'
import { AdminToolbar } from '../components/Table'
import { LoadingSpinner } from '../../components/UI'
import { Save } from 'lucide-react'

export default function SettingsAdmin() {
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let active = true
    const fetch = async () => {
      try {
        const res = await api.get('/admin/settings')
        if (active) {
          const s = res.data.data || {}
          setForm({
            siteName: s.siteName || '',
            headline: s.headline || '',
            bio: s.bio || '',
            email: s.email || '',
            location: s.location || '',
            phone: s.contact?.phone || '',
            profileImage: s.profileImage || '',
            github: s.socials?.github || '',
            linkedin: s.socials?.linkedin || '',
            instagram: s.socials?.instagram || '',
            twitter: s.socials?.twitter || '',
            seoTitle: s.seo?.title || '',
            seoDescription: s.seo?.description || '',
            googleTagId: s.analytics?.googleTagId || '',
          })
        }
      } catch {
        if (active) setForm(null)
      } finally {
        if (active) setLoading(false)
      }
    }
    fetch()
    return () => { active = false }
  }, [])

  if (loading) return <LoadingSpinner />
  if (!form) return <div className="caption text-muted">Failed to load settings.</div>

  const handleChange = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.put('/admin/settings', {
        siteName: form.siteName,
        headline: form.headline,
        bio: form.bio,
        email: form.email,
        location: form.location,
        contact: { phone: form.phone },
        profileImage: form.profileImage,
        socials: {
          github: form.github,
          linkedin: form.linkedin,
          instagram: form.instagram,
          twitter: form.twitter,
        },
        seo: {
          title: form.seoTitle,
          description: form.seoDescription,
        },
        analytics: {
          googleTagId: form.googleTagId,
        },
      })
      alert('Settings saved successfully')
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <AdminToolbar title="Settings" description="Site-wide configuration" />
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}
      >
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Site Name *</label>
          <input name="siteName" value={form.siteName || ''} onChange={handleChange} required style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Headline</label>
          <input name="headline" value={form.headline || ''} onChange={handleChange} placeholder="MERN Stack Developer" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Email *</label>
          <input name="email" type="email" value={form.email || ''} onChange={handleChange} required style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Phone</label>
          <input name="phone" value={form.phone || ''} onChange={handleChange} placeholder="+1 555 000 0000" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Location</label>
          <input name="location" value={form.location || ''} onChange={handleChange} placeholder="Pakistan" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Profile Image URL</label>
          <input name="profileImage" value={form.profileImage || ''} onChange={handleChange} placeholder="https://..." style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>GitHub</label>
          <input name="github" value={form.github || ''} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>LinkedIn</label>
          <input name="linkedin" value={form.linkedin || ''} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Instagram</label>
          <input name="instagram" value={form.instagram || ''} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Twitter</label>
          <input name="twitter" value={form.twitter || ''} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div style={{ gridColumn: '1 / -1' }}><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Bio</label>
          <textarea name="bio" value={form.bio || ''} onChange={handleChange} rows={4} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none', resize: 'vertical' }} /></div>
        <div style={{ gridColumn: '1 / -1' }}><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>SEO Title</label>
          <input name="seoTitle" value={form.seoTitle || ''} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div style={{ gridColumn: '1 / -1' }}><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>SEO Description</label>
          <textarea name="seoDescription" value={form.seoDescription || ''} onChange={handleChange} rows={3} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none', resize: 'vertical' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Google Tag ID</label>
          <input name="googleTagId" value={form.googleTagId || ''} onChange={handleChange} placeholder="G-XXXXXXXXXX" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={submitting} style={{ padding: '12px 24px', background: 'var(--gold)', border: 'none', color: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }} data-cursor="Save"><Save size={14} />{submitting ? 'Saving...' : 'Save Settings'}</button>
        </div>
      </motion.form>
    </>
  )
}
