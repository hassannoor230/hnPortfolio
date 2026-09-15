import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Button({
  children, to, href, variant = 'primary', size = 'medium',
  onClick, className = '', disabled = false, ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-body font-medium tracking-[0.15em] text-[0.75rem] text-transform-uppercase transition-[background,border,color] duration-300'
  const variants = {
    primary: 'bg-accent text-bg hover:bg-accent-light',
    secondary: 'border border-border text-text-dim hover:border-border-strong hover:text-text',
    ghost: 'text-text-dim hover:text-text',
  }
  const sizes = {
    small: 'px-6 py-3',
    medium: 'px-8 py-4',
    large: 'px-12 py-5',
  }
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`

  if (to) {
    return <Link to={to} className={cls} {...props}>{children}</Link>
  }
  if (href) {
    return <a href={href} className={cls} {...props}>{children}</a>
  }
  return <button onClick={onClick} className={cls} disabled={disabled} {...props}>{children}</button>
}

export function MagneticButton({ children, to, variant = 'primary', className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`btn btn--${variant} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
