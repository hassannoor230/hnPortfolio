import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminCRUD } from '../hooks/useCRUD'
import { AdminToolbar } from '../components/Table'
import { LoadingSpinner, EmptyState } from '../../components/UI'
import { X, Download, Trash2 } from 'lucide-react'

export default function ResumeAdmin() {
  const {
    items, loading, item, modalOpen, submitting,
    search, setSearch, meta,
    fetchItems, openCreate, openEdit, closeModal, save, remove,
  } = useAdminCRUD('/admin/resume', { pageSize: 100 })

  useEffect(() => { fetchItems() }, [])
  const [form, setForm] = useState({})

  useEffect(() => {
    if (item) {
      setForm({
        file: item.file || '', label: item.label || 'Download Resume', displayOrder: item.displayOrder || 0,
      })
    } else {
      setForm({ file: '', label: 'Download Resume', displayOrder: 0 })
    }
  }, [item])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await save(form)
  }

  return (
    <>
      <AdminToolbar title="Resume" description="Manage resume / CV" search={search} setSearch={setSearch} onAdd={openCreate} total={meta.total} />

      {loading ? <LoadingSpinner /> : items.length === 0 ? (
        <EmptyState title="No resume configured" description="Upload your resume to make it available on your portfolio." />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Label</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>File</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((e) => (
                <tr key={e._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)' }}>{e.label}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-dim)' }}>
                    <a href={e.file} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Download size={14} />View file</a>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button onClick={() => openEdit(e)} style={{ padding: '6px 10px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-dim)', borderRadius: '4px', cursor: 'pointer' }} data-cursor="Edit"><span style={{ fontSize: '13px' }}>Edit</span></button>
                    <button onClick={async () => { if (window.confirm('Delete this resume?')) await remove(e._id) }} style={{ padding: '6px 10px', background: 'transparent', border: '1px solid var(--border)', color: '#B07A7A', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }} data-cursor="Delete"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="modal-content" style={{ maxWidth: '600px', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text)' }}>{item ? 'Edit Resume' : 'Add Resume'}</h2>
                <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }} data-cursor="Close"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Label</label>
                  <input name="label" value={form.label || ''} onChange={handleChange} placeholder="Download Resume" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
                <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>File URL</label>
                  <input name="file" value={form.file || ''} onChange={handleChange} placeholder="https://..." required style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
                <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font(--font-body)', display: 'block' }}>Display Order</label>
                  <input type="number" name="displayOrder" value={form.displayOrder || 0} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} /></div>
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


