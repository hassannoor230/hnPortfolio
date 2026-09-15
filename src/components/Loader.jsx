import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.6 }}
      style={{
        position: 'fixed', inset: 0, background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 99999, flexDirection: 'column', gap: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-display)', fontSize: '64px', fontWeight: 600,
          color: 'var(--gold)', letterSpacing: '-2px', lineHeight: 1,
        }}
      >
        HN
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.6 }}
        style={{
          fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '4px',
          textTransform: 'uppercase', color: 'var(--text-dim)',
        }}
      >
        Loading Experience
      </motion.p>
    </motion.div>
  )
}