import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Works', to: '/works' },
  { label: 'Skills', to: '/skills' },
  { label: 'Experience', to: '/experience' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 40px', height: '72px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(8,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, border: '1px solid var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600,
            color: 'var(--gold)', letterSpacing: '1px',
          }}>H</div>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 500,
            color: 'var(--text)', letterSpacing: '2px', textTransform: 'uppercase',
          }}>Hassan Noor</span>
        </Link>

        <ul style={{ display: 'flex', gap: '36px', listStyle: 'none', alignItems: 'center' }} className="desktop-nav">
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to} style={{ textDecoration: 'none' }}>
                <span style={{
                  color: location.pathname === link.to ? 'var(--gold)' : 'var(--text-dim)',
                  fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '2px',
                  textTransform: 'uppercase', position: 'relative', paddingBottom: '4px',
                  transition: 'color 0.2s', display: 'inline-block',
                }}>
                  {link.label}
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0, height: '1px',
                    background: 'var(--gold)', width: location.pathname === link.to ? '100%' : '0%',
                    transition: 'width 0.25s ease',
                  }} />
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact" style={{ textDecoration: 'none' }} data-cursor="Hire Me">
              <span style={{
                border: '1px solid var(--gold)', background: 'transparent', color: 'var(--gold)',
                padding: '8px 22px', fontFamily: 'var(--font-body)', fontSize: '12px',
                letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-block',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--bg)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)' }}
              >Hire Me</span>
            </Link>
          </li>
        </ul>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', padding: '8px', display: 'none', flexDirection: 'column', gap: '6px' }}
          aria-label="Menu"
          data-cursor="Menu"
        >
          {menuOpen ? <X size={22} color="var(--gold)" /> : <Menu size={22} color="var(--gold)" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', top: '72px', left: 0, right: 0,
              background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(24px)',
              borderBottom: '1px solid var(--border)', padding: '40px', zIndex: 999,
              display: 'flex', flexDirection: 'column', gap: '8px',
            }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={link.to} style={{ textDecoration: 'none' }} data-cursor={link.label}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--text)',
                    cursor: 'pointer', letterSpacing: '2px', padding: '12px 0',
                    borderLeft: `2px solid ${location.pathname === link.to ? 'var(--gold)' : 'transparent'}`,
                    paddingLeft: '16px',
                  }}>
                    {link.label}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          nav { padding: 0 20px !important; }
        }
      `}</style>
    </>
  )
}