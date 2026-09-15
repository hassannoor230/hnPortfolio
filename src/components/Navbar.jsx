import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
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
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const bgStyle = {
    backgroundColor: scrolled ? 'rgba(7, 12, 22, 0.72)' : 'rgba(7, 12, 22, 0.18)',
    backdropFilter: scrolled ? 'blur(14px)' : 'blur(6px)',
    borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
  }

  return (
    <nav className="navbar" style={bgStyle}>
      <div className="container navbar-inner">
        <Link to="/" className="nav-logo" aria-label="Home">
          <span>HN</span>
        </Link>

        <div className="navbar-desktop">
          <div className="nav-panel">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <Link to="/contact" className="btn btn--primary nav-cta">
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
            animate={{ opacity: 1, height: 'calc(100vh - 72px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="navbar-mobile"
          >
            <div className="navbar-mobile-inner">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.08 }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `nav-mobile-link ${isActive ? 'active' : ''}`}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
