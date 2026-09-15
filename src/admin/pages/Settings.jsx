import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAdminCRUD } from '../hooks/useCRUD'
import { AdminToolbar } from '../components/Table'
import { LoadingSpinner } from '../../components/UI'
import { Save, RefreshCw } from 'lucide-react'

export default function SettingsAdmin() {
  const { items, loading, save } = useAdminCRUD('/admin/settings', { pageSize: 1 })

  useEffect(() => { fetchSettings() }, [])

  const [form, setForm] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function fetchSettings() {
    if (!items.length) return
    const s = items[0]
    setForm({
      siteTitle: s.siteTitle || '', tagline: s.tagline || '',
      email: s.email || '', phone: s.phone || '', location: s.location || '',
      bio: s.bio || '', avatar: s.avatar || '', linkedin: s.linkedin || '', github: s.github || '', twitter: s.twitter || '',
      resume: s.resume || '',
    })
  }

  useEffect(() => { fetchSettings() }, [items])

  if (loading) return <LoadingSpinner />

  const handleChange = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await save(form)
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
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Site Title *</label>
          <input name="siteTitle" value={form.siteTitle || ''} onChange={handleChange} required style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Tagline</label>
          <input name="tagline" value={form.tagline || ''} onChange={handleChange} placeholder="Full-stack Developer & Designer" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Email *</label>
          <input name="email" type="email" value={form.email || ''} onChange={handleChange} required style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Phone</label>
          <input name="phone" value={form.phone || ''} onChange={handleChange} placeholder="+1 555 000 0000" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Location</label>
          <input name="location" value={form.location || ''} onChange={handleChange} placeholder="San Francisco, CA" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Avatar URL</label>
          <input name="avatar" value={form.avatar || ''} onChange={handleChange} placeholder="https://..." style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>LinkedIn</label>
          <input name="linkedin" value={form.linkedin || ''} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>GitHub</label>
          <input name="github" value={form.github || ''} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Twitter</label>
          <input name="twitter" value={form.twitter || ''} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Resume URL</label>
          <input name="resume" value={form.resume || ''} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
        <div style={{ gridColumn: '1 / -1' }}><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Bio</label>
          <textarea name="bio" value={form.bio || ''} onChange={handleChange} rows={4} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none', resize: 'vertical' }} /></div>
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={submitting} style={{ padding: '12px 24px', background: 'var(--gold)', border: 'none', color: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }} data-cursor="Save"><Save size={14} />{submitting ? 'Saving...' : 'Save Settings'}</button>
        </div>
      </motion.form>
    </>
  )
}


