import { motion } from 'framer-motion'

export default function AmbientBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '15%', left: '8%', width: '500px', height: '500px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)',
        }}
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '10%', right: '5%', width: '600px', height: '600px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        mask: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)',
      }} />
    </div>
  )
}