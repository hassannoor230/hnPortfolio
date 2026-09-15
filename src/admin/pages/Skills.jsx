import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminCRUD } from '../hooks/useCRUD'
import { AdminToolbar, AdminPagination } from '../components/Table'
import { LoadingSpinner, EmptyState } from '../../components/UI'
import { Trash2, Edit, X } from 'lucide-react'

const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Design', 'Mobile', 'Other']

export default function SkillsAdmin() {
  const {
    items, loading, item, modalOpen, submitting,
    search, setSearch, page, setPage, meta,
    fetchItems, openCreate, openEdit, closeModal, save, remove,
  } = useAdminCRUD('/admin/skills', { pageSize: 100 })

  useEffect(() => { fetchItems() }, [])

  const [form, setForm] = useState({})

  useEffect(() => {
    if (item) {
      setForm({ name: item.name || '', category: item.category || 'Other', level: item.level || 80, icon: item.icon || '', displayOrder: item.displayOrder || 0, visible: item.visible !== false })
    } else {
      setForm({ name: '', category: 'Other', level: 80, icon: '', displayOrder: 0, visible: true })
    }
  }, [item])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) || 0 : value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await save({ ...form, level: parseInt(form.level) || 0, displayOrder: parseInt(form.displayOrder) || 0 })
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed')
    }
  }

  return (
    <>
      <AdminToolbar title="Skills" description="Manage technical skills" search={search} setSearch={setSearch} onAdd={openCreate} total={meta.total} />

      {loading ? <LoadingSpinner /> : items.length === 0 ? (
        <EmptyState title="No skills" description="Add your first skill to get started." />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>#</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Category</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Level</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s, i) => (
                <tr key={s._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)' }}>{(page - 1) * 100 + i + 1}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)' }}>{s.name}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-dim)' }}>{s.category}</td>
                  <td style={{ padding: '12px 16px' }}><div style={{ width: '60px', height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}><div style={{ width: `${s.level || 80}%`, height: '100%', background: 'var(--gold)' }} /></div></td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button onClick={() => openEdit(s)} style={{ padding: '6px 10px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-dim)', borderRadius: '4px', cursor: 'pointer' }} data-cursor="Edit"><Edit size={14} /></button>
                    <button onClick={async () => { if (window.confirm('Delete this skill?')) await remove(s._id) }} style={{ padding: '6px 10px', background: 'transparent', border: '1px solid var(--border)', color: '#B07A7A', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }} data-cursor="Delete"><Trash2 size={14} /></button>
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
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="modal-content" style={{ maxWidth: '500px', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text)' }}>{item ? 'Edit Skill' : 'Add Skill'}</h2>
                <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }} data-cursor="Close"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Name *</label>
                  <input name="name" value={form.name || ''} onChange={handleChange} required style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Category</label>
                  <select name="category" value={form.category || 'Other'} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none', cursor: 'pointer' }}>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '10px', letterSpacing: '2px', text-transform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Level (%)</label>
                  <input type="number" name="level" value={form.level || 80} onChange={handleChange} min="0" max="100" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Icon</label>
                  <input name="icon" value={form.icon || ''} onChange={handleChange} placeholder="e.g. react, nodejs" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
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

