import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSettings } from '../contexts/SettingsContext'

export default function Footer() {
  const year = new Date().getFullYear()
  const { settings } = useSettings()
  const socials = settings?.socials || {}
  const activeSocials = Object.entries(socials).filter(([_, v]) => v)

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Works', to: '/works' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <footer style={{
      background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '80px 0 40px',
    }}>
      <div className="container">
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          flexWrap: 'wrap', gap: '48px', marginBottom: '64px',
        }}>
          <div style={{ maxWidth: '320px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 600,
                color: 'var(--text)', letterSpacing: '-0.5px', marginBottom: '12px',
              }}>{settings?.siteName || 'Hassan Noor'}</div>
            </Link>
            <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.8, letterSpacing: '0.5px' }}>
              {settings?.bio || 'Building premium digital experiences with attention to detail.'}
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s', display: 'inline-block' }}
                    onMouseEnter={e => (e.target.style.color = 'var(--gold)')}
                    onMouseLeave={e => (e.target.style.color = 'var(--text-dim)')}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>Connect</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {settings?.email && (
                <li><a href={`mailto:${settings.email}`} style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target.style.color = 'var(--gold)')} onMouseLeave={e => (e.target.style.color = 'var(--text-dim')}
                >{settings.email}</a></li>
              )}
              {settings?.location && <li><span style={{ color: 'var(--text-dim)', fontSize: '14px' }}>{settings.location}</span></li>}
              {settings?.availability && <li><span style={{ color: 'var(--gold)', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>{settings.availability}</span></li>}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>Social</h4>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {activeSocials.map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.target.style.color = 'var(--text-dim)')}
                  data-cursor={key}
                >{key}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '40px', borderTop: '1px solid rgba(201,169,110,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', letterSpacing: '1px' }}>
            &copy; {year} {settings?.siteName || 'Hassan Noor'}. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', letterSpacing: '1px' }}>
            Designed &amp; Developed with attention to detail.
          </p>
        </div>
      </div>
    </footer>
  )
}
