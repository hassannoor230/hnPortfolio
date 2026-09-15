import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Work', to: '/works' },
  { label: 'About', to: '/about' },
  { label: 'Skills', to: '/skills' },
  { label: 'Experience', to: '/experience' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const bgStyle = {
    backgroundColor: scrolled ? 'rgba(8, 8, 8, 0.85)' : 'transparent',
    backdropFilter: scrolled ? 'blur(10px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : 'transparent',
  }

  return (
    <nav className="navbar" style={bgStyle}>
      <div className="container navbar-inner" style={{ height: '4rem' }}>
        <Link to="/" className="nav-logo display-strong" style={{ fontSize: '1.5rem' }}>
          HN
        </Link>

        <div className="navbar-desktop">
          <div className="flex-gap" style={{ gap: '2rem' }}>
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="nav-link label"
                style={{ color: 'var(--text-dim)', lineHeight: 1 }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link to="/contact" className="btn btn--primary">
            Let&apos;s Talk
          </Link>
        </div>

        <button
          className="navbar-mobile-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="navbar-mobile"
          >
            <div className="navbar-mobile-inner">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                >
                  <Link
                    to={link.to}
                    className="nav-mobile-link display-strong"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
