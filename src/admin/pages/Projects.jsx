import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminCRUD } from '../hooks/useCRUD'
import { AdminToolbar, AdminPagination } from '../components/Table'
import api from '../api'
import { LoadingSpinner, EmptyState, Tag } from '../../components/UI'
import { Trash2, Edit, X, Upload } from 'lucide-react'

const categories = ['Full Stack', 'Frontend', 'Backend', 'Design', 'Web3', 'Mobile', 'Other']

export default function ProjectsAdmin() {
  const {
    items, loading, item, modalOpen, submitting,
    search, setSearch, page, setPage, meta,
    fetchItems, openCreate, openEdit, closeModal, save, remove,
  } = useAdminCRUD('/admin/projects', { pageSize: 50 })

  useEffect(() => { fetchItems() }, [])

  const [form, setForm] = useState(item ? { ...item } : {})
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (item) {
      setForm({
        title: item.title || '', slug: item.slug || '', description: item.description || '',
        category: item.category || '', year: item.year || '', technologies: item.technologies || [],
        thumbnail: item.thumbnail || '', gallery: item.gallery || [],
        githubUrl: item.githubUrl || '', liveUrl: item.liveUrl || '',
        featured: item.featured || false, published: item.published !== false,
        displayOrder: item.displayOrder || 0,
      })
    } else {
      setForm({ title: '', slug: '', description: '', category: '', year: '', technologies: [], thumbnail: '', gallery: [], githubUrl: '', liveUrl: '', featured: false, published: true, displayOrder: 0 })
    }
  }, [item])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setForm(p => ({ ...p, thumbnail: res.data.data.url }))
    } catch {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        technologies: (form.technologies || []).filter(Boolean),
        gallery: (form.gallery || []),
      }
      await save(payload)
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed')
    }
  }

  const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

  return (
    <>
      <AdminToolbar
        title="Projects" description="Manage your portfolio projects"
        search={search} setSearch={setSearch} onAdd={openCreate} total={meta.total}
      />

      {loading ? <LoadingSpinner /> : items.length === 0 ? (
        <EmptyState title="No projects" description="Add your first project to get started." />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>#</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Project</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Category</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Year</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p, i) => (
                <tr key={p._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)' }}>{(page - 1) * 50 + i + 1}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--text)' }}>{p.title}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-muted)' }}>{p.slug}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-dim)' }}>{p.category}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-dim)' }}>{p.year}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', padding: '4px 8px', borderRadius: '4px', background: p.published ? 'rgba(139,157,119,0.2)' : 'rgba(176,122,122,0.2)', color: p.published ? '#8B9D77' : '#B07A7A' }}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                    {p.featured && <Tag style={{ marginLeft: '6px', fontSize: '10px' }}>Featured</Tag>}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button onClick={() => openEdit(p)} style={{ padding: '6px 10px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-dim)', borderRadius: '4px', cursor: 'pointer' }} data-cursor="Edit"><Edit size={14} /></button>
                    <button onClick={async () => { if (window.confirm('Delete this project?')) await remove(p._id) }} style={{ padding: '6px 10px', background: 'transparent', border: '1px solid var(--border)', color: '#B07A7A', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }} data-cursor="Delete"><Trash2 size={14} /></button>
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
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="modal-content" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text)' }}>{item ? 'Edit Project' : 'Add Project'}</h2>
                <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }} data-cursor="Close"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Title *</label>
                    <input name="title" value={form.title || ''} onChange={e => { handleChange(e); setForm(p => ({ ...p, slug: slugify(e.target.value) })) }} required style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Slug *</label>
                    <input name="slug" value={form.slug || ''} onChange={handleChange} required style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Category</label>
                    <select name="category" value={form.category || ''} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none', cursor: 'pointer' }}>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Year</label>
                    <input name="year" value={form.year || ''} onChange={handleChange} placeholder="2024" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Description *</label>
                  <textarea name="description" value={form.description || ''} onChange={handleChange} required rows={4} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none', resize: 'vertical' }} />
                </div>

                <div>
                  <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Technologies (comma separated)</label>
                  <input value={(form.technologies || []).join(', ')} onChange={e => setForm(p => ({ ...p, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} placeholder="React, Node.js, MongoDB" style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>GitHub URL</label>
                    <input name="githubUrl" value={form.githubUrl || ''} onChange={handleChange} placeholder="https://github.com/..." style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Live URL</label>
                    <input name="liveUrl" value={form.liveUrl || ''} onChange={handleChange} placeholder="https://..." style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Thumbnail Image</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'var(--bg-3)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '11px', cursor: 'pointer' }} data-cursor="Upload">
                      <Upload size={14} />{uploading ? 'Uploading...' : 'Choose Image'}
                      <input type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} hidden />
                    </label>
                    {form.thumbnail && <img src={form.thumbnail} alt="thumbnail" style={{ width: '60px', height: '40px', objectFit: 'cover', border: '1px solid var(--border)' }} />}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)' }}>
                      <input type="checkbox" name="featured" checked={form.featured || false} onChange={handleChange} style={{ margin: 0 }} />
                      Featured
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)' }}>
                      <input type="checkbox" name="published" checked={form.published !== false} onChange={handleChange} style={{ margin: 0 }} />
                      Published
                    </label>
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Display Order</label>
                    <input type="number" name="displayOrder" value={form.displayOrder || 0} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button type="button" onClick={closeModal} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-dim)', fontFamily: 'var(--font-body)', fontSize: '11px', cursor: 'pointer' }} data-cursor="Cancel">Cancel</button>
                  <button type="submit" disabled={submitting} style={{ padding: '12px 24px', background: 'var(--gold)', border: 'none', color: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }} data-cursor="Save">{submitting ? 'Saving...' : 'Save Project'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
