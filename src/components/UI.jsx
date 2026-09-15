import { motion } from 'framer-motion'

export function GoldLine({ className = '' }) {
  return <span className={`gold-line ${className}`} />
}

export function SectionLabel({ children, className = '' }) {
  return (
    <span style={{
      fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px',
      textTransform: 'uppercase', color: 'var(--gold)',
    }} className={className}>{children}</span>
  )
}

export function SectionTitle({ children, className = '' }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 72px)',
      fontWeight: 600, color: 'var(--text)', lineHeight: 1.05,
      letterSpacing: '-1px', maxWidth: '900px',
    }} className={className}>{children}</h2>
  )
}

export function Container({ children, className = '' }) {
  return <div className={`container ${className}`}>{children}</div>
}

export function MagneticButton({ children, to, variant = 'primary', className = '', ...props }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '3px',
    textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer',
    border: 'none', transition: 'all 0.25s var(--ease)',
    padding: variant === 'primary' ? '16px 40px' : '16px 40px',
  }
  const styles = variant === 'primary'
    ? { background: 'var(--gold)', color: 'var(--bg)' }
    : { background: 'transparent', color: 'var(--text)', border: '1px solid var(--border-strong)' }

  const inner = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{ ...base, ...styles }}
      data-cursor={children?.toString()?.includes('Work') ? 'View Work' : 'Get In Touch'}
      {...props}
    >
      {children}
    </motion.span>
  )

  return to ? (
    <a href={to} style={{ textDecoration: 'none' }} data-cursor="Link">{inner}</a>
  ) : inner
}

export function StatNumber({ value, label, className = '' }) {
  return (
    <div className={className}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)',
        fontWeight: 600, color: 'var(--gold)', lineHeight: 1, marginBottom: '8px',
      }}>{value}</div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '2px',
        textTransform: 'uppercase', color: 'var(--text-dim)',
      }}>{label}</div>
    </div>
  )
}

export function Tag({ children, className = '' }) {
  return (
    <span style={{
      padding: '6px 14px', border: '1px solid var(--border-strong)', background: 'var(--surface)',
      fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-dim)',
      letterSpacing: '0.5px',
    }} className={className}>{children}</span>
  )
}

export function GoldDivider({ className = '' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className={className}>
      <span style={{ width: '48px', height: '1px', background: 'var(--gold)' }} />
      <span style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
    </div>
  )
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
      {Icon && <div style={{ marginBottom: '16px', opacity: 0.4 }}><Icon size={32} /></div>}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text-dim)', marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontSize: '14px', marginBottom: action ? '24px' : 0 }}>{description}</p>
      {action}
    </div>
  )
}

export function Skeleton({ className = '', style = {} }) {
  return (
    <div className={className} style={{
      background: 'linear-gradient(90deg, var(--surface) 25%, var(--surface-2) 50%, var(--surface) 75%)',
      backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite',
      borderRadius: 'var(--radius)', ...style,
    }} />
  )
}

export function LoadingSpinner() {
  return (
    <div style={{ display: 'inline-block', width: '24px', height: '24px', border: '2px solid var(--border-strong)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
  )
}

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}