import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function GoldLine({ className = '' }) {
  return <span className={`gold-line ${className}`} />
}

export function SectionLabel({ children, className = '' }) {
  return (
    <span className={`label text-accent mb-2 inline-block ${className}`}>
      {children}
    </span>
  )
}

export function SectionHeading({
  label, title, align = 'left', className = '', labelClassName = ''
}) {
  return (
    <div className={`section-heading ${align === 'center' ? 'text-center' : ''} ${className}`}>
      {label && <SectionLabel className={labelClassName}>{label}</SectionLabel>}
      <h2 className="title-strong text-primary mb-4">
        {title}
      </h2>
    </div>
  )
}

export function useScrollReveal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return { ref, inView }
}

export function FadeIn({ children, delay = 0, y = 20, className = '' }) {
  const { ref, inView } = useScrollReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: inView ? 0 : y }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : y }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StatNumber({ value, label, className = '' }) {
  return (
    <div className={`stat-number ${className}`}>
      <div className="display-strong text-accent">{value}</div>
      <div className="caption text-dim">{label}</div>
    </div>
  )
}
