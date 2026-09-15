import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminCRUD } from '../hooks/useCRUD'
import { AdminToolbar, AdminPagination } from '../components/Table'
import api from '../api'
import { LoadingSpinner, EmptyState } from '../../components/UI'
import { Trash2, Edit, X, Calendar } from 'lucide-react'

export default function ExperienceAdmin() {
  const {
    items, loading, item, modalOpen, submitting,
    search, setSearch, page, setPage, meta,
    fetchItems, openCreate, closeModal, save, remove,
  } = useAdminCRUD('/admin/experience', { pageSize: 50 })

  useEffect(() => { fetchItems() }, [])

  const [form, setForm] = useState({})

  useEffect(() => {
    if (item) {
      setForm({
        company: item.company || '', position: item.position || '',
        description: item.description || '', startDate: item.startDate || '',
        endDate: item.endDate || '', current: item.current || false,
        technologies: item.technologies || [], displayOrder: item.displayOrder || 0,
        visible: item.visible !== false,
      })
    } else {
      setForm({ company: '', position: '', description: '', startDate: '', endDate: '', current: false, technologies: [], displayOrder: 0, visible: true })
    }
  }, [item])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) || 0 : value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await save({ ...form, technologies: (form.technologies || []).filter(Boolean), displayOrder: parseInt(form.displayOrder) || 0 })
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed')
    }
  }

  const handleTechInput = e => {
    const tech = e.target.value
    setForm(p => ({ ...p, technologies: tech ? tech.split(',').map(s => s.trim()).filter(Boolean) : [] }))
  }

  return (
    <>
      <AdminToolbar
        title="Experience" description="Manage professional experience"
        search={search} setSearch={setSearch} onAdd={openCreate} total={meta.total}
      />

      {loading ? <LoadingSpinner /> : items.length === 0 ? (
        <EmptyState title="No experience entries" description="Add your first experience entry to get started." />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>#</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Company</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Position</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Period</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((e, i) => (
                <tr key={e._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)' }}>{(page - 1) * 50 + i + 1}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)' }}>{e.company}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-dim)' }}>{e.position}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-dim)' }}>{e.startDate} — {e.current ? 'Present' : e.endDate}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', padding: '4px 8px', borderRadius: '4px', background: e.visible ? 'rgba(139,157,119,0.2)' : 'rgba(176,122,122,0.2)', color: e.visible ? '#8B9D77' : '#B07A7A' }}>
                      {e.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button onClick={() => openCreate(e)} style={{ padding: '6px 10px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-dim)', borderRadius: '4px', cursor: 'pointer' }} data-cursor="Edit"><Edit size={14} /></button>
                    <button onClick={async () => { if (window.confirm('Delete this experience?')) await remove(e._id) }} style={{ padding: '6px 10px', background: 'transparent', border: '1px solid var(--border)', color: '#B07A7A', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }} data-cursor="Delete"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AdminPagination page={page} setPage={setPage} meta={meta} />

      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="modal-content" style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text)' }}>{item ? 'Edit Experience' : 'Add Experience'}</h2>
                <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }} data-cursor="Close"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Company *</label>
                    <input name="company" value={form.company || ''} onChange={handleChange} required style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Position *</label>
                    <input name="position" value={form.position || ''} onChange={handleChange} required style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Start Date</label>
                    <input name="startDate" value={form.startDate || ''} onChange={handleChange} placeholder="2022-01" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={14} style={{ opacity: 0.5 }} />End Date
                      </div>
                    </label>
                    <input name="endDate" value={form.endDate || ''} onChange={handleChange} disabled={form.current} placeholder="YYYY-MM (leave empty if current)" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-dim)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none', cursor: form.current ? 'not-allowed' : 'text' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)' }}>
                    <input type="checkbox" name="current" checked={form.current || false} onChange={handleChange} style={{ margin: 0 }} />
                    Currently working here
                  </label>
                </div>

                <div>
                  <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Description</label>
                  <textarea name="description" value={form.description || ''} onChange={handleChange} rows={4} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none', resize: 'vertical' }} />
                </div>

                <div>
                  <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Technologies (comma separated)</label>
                  <input value={(form.technologies || []).join(', ')} onChange={handleTechInput} placeholder="React, Node.js, AWS" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Display Order</label>
                    <input type="number" name="displayOrder" value={form.displayOrder || 0} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)' }}>
                      <input type="checkbox" name="visible" checked={form.visible !== false} onChange={handleChange} style={{ margin: 0 }} />
                      Visible on site
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button type="button" onClick={closeModal} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-dim)', fontFamily: 'var(--font-body)', fontSize: '11px', cursor: 'pointer' }} data-cursor="Cancel">Cancel</button>
                  <button type="submit" disabled={submitting} style={{ padding: '12px 24px', background: 'var(--gold)', border: 'none', color: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }} data-cursor="Save">{submitting ? 'Saving...' : 'Save'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
