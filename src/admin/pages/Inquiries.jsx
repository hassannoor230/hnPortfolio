import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminCRUD } from '../hooks/useCRUD'
import { AdminToolbar, AdminPagination } from '../components/Table'
import { LoadingSpinner, EmptyState } from '../../components/UI'
import { Trash2, Eye, X, ExternalLink } from 'lucide-react'

export default function InquiriesAdmin() {
  const {
    items, loading, item, modalOpen,
    search, setSearch, page, setPage, meta,
    fetchItems, openEdit, closeModal, remove,
  } = useAdminCRUD('/admin/inquiries', { pageSize: 20 })

  useEffect(() => { fetchItems() }, [])

  return (
    <>
      <AdminToolbar title="Inquiries" description="Contact form submissions" search={search} setSearch={setSearch} total={meta.total} />

      {loading ? <LoadingSpinner /> : items.length === 0 ? (
        <EmptyState title="No inquiries" description="Your contact form submissions will appear here." />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Subject</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Date</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((e) => (
                <tr key={e._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)' }}>{e.name}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-dim)' }}>{e.email}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-dim)' }}>{e.subject || ''}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-dim)' }}>{new Date(e.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button onClick={() => openEdit(e)} style={{ padding: '6px 10px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-dim)', borderRadius: '4px', cursor: 'pointer' }} data-cursor="View"><Eye size={14} /></button>
                    <a href={`mailto:${e.email}?subject=${encodeURIComponent(e.subject || '')}`} style={{ padding: '6px 10px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-dim)', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', cursor: 'pointer', marginLeft: '8px' }} data-cursor="Reply"><ExternalLink size={14} /></a>
                    <button onClick={async () => { if (window.confirm('Delete this inquiry?')) await remove(e._id) }} style={{ padding: '6px 10px', background: 'transparent', border: '1px solid var(--border)', color: '#B07A7A', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }} data-cursor="Delete"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AdminPagination page={page} setPage={setPage} meta={meta} />

      <AnimatePresence>
        {modalOpen && item && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="modal-content" style={{ maxWidth: '600px', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text)' }}>Inquiry Details</h2>
                <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }} data-cursor="Close"><X size={20} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Name</label>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)' }}>{item.name}</p></div>
                <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Email</label>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-dim)' }}>{item.email}</p></div>
                <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Subject</label>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-dim)' }}>{item.subject || 'N/A'}</p></div>
                <div><label style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-body)', display: 'block' }}>Message</label>
                  <div style={{ padding: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', whiteSpace: 'pre-wrap', margin: 0 }}>{item.message}</p>
                  </div></div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <a href={`mailto:${item.email}?subject=${encodeURIComponent(item.subject || '')}`} style={{ padding: '10px 20px', background: 'var(--gold)', border: 'none', color: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '1px', textDecoration: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }} data-cursor="Reply"><ExternalLink size={14} /> Reply</a>
                  <button onClick={closeModal} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-dim)', fontFamily: 'var(--font-body)', fontSize: '12px', cursor: 'pointer' }} data-cursor="Close">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


