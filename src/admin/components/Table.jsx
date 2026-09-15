import { motion } from 'framer-motion'
import { LoadingSpinner, EmptyState } from '../../components/UI'
import { Search, ChevronLeft, ChevronRight, Trash2, Edit, Plus } from 'lucide-react'

export function AdminToolbar({
  title, description, searchPlaceholder = 'Search...',
  search, setSearch, onAdd, total = 0,
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>{title}</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-dim)' }}>{description}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text" placeholder={searchPlaceholder} value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            style={{
              padding: '8px 24px 8px 36px', background: 'var(--surface)', border: '1px solid var(--border)',
              color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '13px', outline: 'none',
              transition: 'border-color 0.2s', width: '220px',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--gold)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onAdd} style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px',
          background: 'var(--gold)', border: 'none', color: 'var(--bg)',
          fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px',
          textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
        }} data-cursor="Add New">
          <Plus size={14} />Add New
        </motion.button>
      </div>
    </div>
  )
}

export function AdminPagination({ page, setPage, meta }) {
  if (!meta || meta.pages <= 1) return null
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '32px', padding: '20px 0', borderTop: '1px solid var(--border)' }}>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} style={{
        padding: '6px 16px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-dim)',
        fontFamily: 'var(--font-body)', fontSize: '11px', cursor: page <= 1 ? 'not-allowed' : 'pointer', opacity: page <= 1 ? 0.5 : 1,
      }}><ChevronLeft size={14} /></motion.button>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-dim)' }}>Page {page} of {meta.pages}</span>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setPage(p => Math.min(meta.pages, p + 1))} disabled={page >= meta.pages} style={{
        padding: '6px 16px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-dim)',
        fontFamily: 'var(--font-body)', fontSize: '11px', cursor: page >= meta.pages ? 'not-allowed' : 'pointer', opacity: page >= meta.pages ? 0.5 : 1,
      }}><ChevronRight size={14} /></motion.button>
    </div>
  )
}

export function ActionButton({ onClick, icon: Icon, label, color = 'var(--text-dim)' }) {
  return (
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClick} style={{
      padding: '6px 10px', background: 'transparent', border: '1px solid var(--border)',
      color, borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s', fontSize: '11px',
      display: 'inline-flex', alignItems: 'center', gap: '4px',
    }}>
      <Icon size={12} />{label}
    </motion.button>
  )
}
